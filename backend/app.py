# app.py

import os
import asyncio
import json
import re

from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
import openai
from dotenv import load_dotenv

from agents import set_default_openai_key, Runner
from app_agents.intent_agent import intent_agent
from app_agents.local_agent import local_agent
from app_agents.web_agent import web_agent
from app_agents.process_agent import process_agent
from app_agents.multas_agent import multas_agent
from app_agents.curp_agent import curp_agent
from voice_api import voice_routes  # Importamos las rutas de la API de voz

load_dotenv()
set_default_openai_key(os.getenv("OPENAI_API_KEY"))

def is_multa_comprobante(texto: str) -> bool:
    """
    Consulta a ChatGPT si el texto proporcionado corresponde
    a un comprobante de pago de multa de tránsito.
    Devuelve True o False.
    """
    prompt = f"""
Eres un asistente que detecta si un texto es el comprobante
de pago de una multa de tránsito en México.

Texto a analizar:
\"\"\"
{texto}
\"\"\"

Responde SOLO con "Sí" si es un comprobante de pago de multa,
o "No" si no lo es.
"""
    resp = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Eres un clasificador muy preciso."},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )
    answer = resp.choices[0].message.content.strip().lower()
    return answer.startswith("sí")

app = Flask(__name__)
app = Flask(__name__)
CORS(app,resources={r"/*":{"origins":"*"}})
app.register_blueprint(voice_routes)  # Registramos el blueprint de la API de voz
socketio = SocketIO(app, cors_allowed_origins="*")

def ensure_loop():
    """
    Asegura que el hilo actual tenga un event loop.
    """
    try:
        asyncio.get_running_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

@app.before_request
def before_request():
    # Este hook corre en el hilo principal de Flask, no en el de SocketIO
    ensure_loop()
    print(f"[{request.method}] {request.path}")

@socketio.on("connect")
def on_connect():
    print("Cliente conectado")
    # También podemos asegurar loop aquí si quisiéramos:
    ensure_loop()

@socketio.on("mensaje_usuario")
def handle_user_message(data):
    # 1) Aseguramos un event loop

    ensure_loop()

    # 2) Extraemos datos y guardamos user message
    session_id = data["session_id"]
    texto = data["texto"].strip()
    if "historial" not in app.config:
        app.config["historial"] = {}
    h = app.config["historial"].setdefault(session_id, [])
    h.append(f"User: {texto}")

    # 3) Ejecutamos intent_agent
    prompt_intent = "\n".join(h)
    result_intent = Runner.run_sync(intent_agent, prompt_intent)
    print("[DEBUG] IntentAgent output:", result_intent.final_output)
    respuesta = result_intent.final_output or ""

    if(is_multa_comprobante(result_intent.final_output)):
        print("[DEBUG] Es un comprobante de multa")
        emit("data",{'data':"si jala"},broadcast=True)
        emit("pago_multas", {
            "session_id": session_id,
            "comprobante": result_intent.final_output
        })
        print("[DEBUG] Emitiendo pago_multas")

    # 4) Limpieza de la respuesta
    respuesta = re.sub(r'\[([^\]]+)\]\(\S+\)', r'\1', respuesta)
    respuesta = re.sub(r'https?://\S+', '', respuesta)
    respuesta = re.sub(r'[\(\)]', '', respuesta)
    respuesta = respuesta.strip()

    # 5) Guardamos y emitimos la respuesta conversacional
    h.append(f"Agent: {respuesta}")
    emit("mensaje_agente", {
        "session_id": session_id,
        "texto": respuesta
    })
    print(f"[DEBUG] mensaje_agente: {respuesta}")

if __name__ == "__main__":
    # Aseguramos loop antes de arrancar
    ensure_loop()
    socketio.run(app, host="0.0.0.0", port=8000, debug=True)
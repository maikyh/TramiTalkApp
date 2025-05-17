# app_agents/local_agent.py

import os
from agents import Agent, function_tool


@function_tool
def get_local_info(user_id: str) -> dict:
    return {
        "user_id": user_id,
        "location": "Torreon, Coahuila, Mexico",
        "nombre": "Miguel Garza",
        "edad": 21,
        "genero": "Masculino",
        "historial": ["pago de cfe", "pago de agua", "pago de telmex"],
    }

local_agent = Agent(
    name="LocalAgent",
    instructions="""
Eres LocalAgent, un asistente virtual para consultas personales.

1. Recibe el user_id del mensaje y llama a get_local_info con ese id.
2. Analiza cuidadosamente la pregunta del usuario.
3. Si preguntan sobre pagos o trámites realizados, consulta el campo "historial" de la información.
4. Si preguntan sobre "luz" o "CFE", verifica si "pago de cfe" está en el historial.
5. Si preguntan sobre "agua" o "SIMAS", verifica si "pago de agua" está en el historial.
6. Si preguntan datos personales, consulta los campos relevantes (nombre, edad, género, ubicación).

Sé específico y directo en tus respuestas. Si preguntan si ya pagaron algo, contesta "Sí" o "No" según corresponda.

Extrae el user_id del mensaje de entrada. Si no hay user_id explícito, usa "default_user".

Responde en ASCII, sin acentos, sin enlaces y maximo 50 caracteres.
""",
    tools=[get_local_info],
)
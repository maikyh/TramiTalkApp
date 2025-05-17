import os
from flask import Blueprint, request, jsonify, Response
import requests
from dotenv import load_dotenv

load_dotenv()
ELEVEN_API_KEY = os.getenv("ELEVEN_LABS_API_KEY")

# Crear un Blueprint para las rutas de la API de voz
voice_routes = Blueprint('voice', __name__, url_prefix='/api')

@voice_routes.route('/test-api-key', methods=['GET'])
def test_api_key():
    """Endpoint para verificar si la API key está configurada"""
    if not ELEVEN_API_KEY:
        return jsonify({"status": "error", "message": "API key no configurada"}), 500
    else:
        return jsonify({"status": "ok", "message": "API key configurada correctamente"}), 200

@voice_routes.route('/text-to-speech', methods=['POST'])
def text_to_speech():
    """
    Convierte texto a voz usando la API de ElevenLabs.
    Espera un JSON con formato {"text": "texto a convertir"}
    """
    print("[TTS] Solicitud recibida")
    
    if not ELEVEN_API_KEY:
        print("[TTS ERROR] No se ha configurado la API key de ElevenLabs")
        return jsonify({"error": "No se ha configurado la API key de ElevenLabs"}), 500

    try:
        data = request.json
        if not data or 'text' not in data:
            print("[TTS ERROR] No se proporcionó texto para convertir")
            return jsonify({"error": "No se proporcionó texto para convertir"}), 400
        
        text = data['text']
        print(f"[TTS] Texto a convertir: '{text[:50]}...' ({len(text)} caracteres)")
        
        # ID de la voz en español
        voice_id = "CWManVshWk8Bl56jXHbN"  # Voz en español
        
        # Configuración para la generación de voz
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
        
        headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": ELEVEN_API_KEY
        }
        
        body = {
            "text": text,
            "model_id": "eleven_multilingual_v2",  # Modelo multilingüe para español
            "voice_settings": {
                "stability": 0.7,
                "similarity_boost": 0.75
            }
        }
        
        print(f"[TTS] Enviando solicitud a ElevenLabs: {url}")
        
        # Realizar la solicitud a ElevenLabs
        response = requests.post(url, json=body, headers=headers)
        
        print(f"[TTS] Respuesta recibida: {response.status_code}")
        
        if response.status_code != 200:
            print(f"[TTS ERROR] Error de la API de ElevenLabs: {response.text}")
            return jsonify({
                "error": "Error de la API de ElevenLabs",
                "details": response.text,
                "status_code": response.status_code
            }), response.status_code
        
        content_length = len(response.content)
        print(f"[TTS] Audio generado correctamente: {content_length} bytes")
        
        # Devolver el audio directamente
        return Response(
            response.content,
            mimetype="audio/mpeg"
        )
        
    except Exception as e:
        print(f"[TTS ERROR] Excepción: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
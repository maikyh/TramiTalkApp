# app_agents/intent_agent.py

from agents import Agent
from app_agents.local_agent import local_agent
from app_agents.web_agent import web_agent
from app_agents.process_agent import process_agent
from agents.extensions.handoff_prompt import prompt_with_handoff_instructions


intent_agent = Agent(
    name="IntentAgent",
    instructions=prompt_with_handoff_instructions(""" 
    Da la bienvenida y pregunta en que puedes ayudar **solo si no hay historial previo**.
    Eres el asistente virtual de una pagina de tramites y pagos de gobierno de Mexico. 
    
    Segun la intencion del usuario:
    
    1. Si el usuario busca informacion general o noticias, handoff to web_agent:
    
    2. Si el usuario necesita historial de pagos/tramites, informacion personal o del perfil, handoff to local_agent:
    
    3. Si el usuario quiere realizar un tramite, consulta o pago gubernamental (curp, multa), handoff to process_agent:
    
    Responde en ASCII, y maximo 50 caracteres.
    """),
    handoffs=[local_agent, web_agent, process_agent],
)
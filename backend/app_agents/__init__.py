# app_agents/__init__.py

from .web_agent import web_agent
from .local_agent import local_agent
from .intent_agent import intent_agent
from .process_agent import process_agent
from .curp_agent import curp_agent
from .multas_agent import multas_agent

__all__ = [
    "web_agent", 
    "local_agent", 
    "intent_agent", 
    "process_agent", 
    "curp_agent", 
    "multas_agent"
]
# app_agents/web_agent.py

from agents import Agent, WebSearchTool

web_agent = Agent(
    name="SearchAgent",
    instructions="""
Eres un agente de busqueda web. Llama a WebSearchTool con la query y resume resultados.
Responde en ASCII, sin acentos, sin enlaces y maximo 50 caracteres.
""",
    tools=[WebSearchTool()],
)

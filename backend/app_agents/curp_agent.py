from agents import Agent, function_tool
import asyncio
from playwright.async_api import async_playwright

async def _consultar_curp_async(nombre: str, primer_apellido: str, segundo_apellido: str,
                                 dia: str, mes: str, anio: str, sexo: str, estado: str) -> str:
    """
    Ejecuta la secuencia con Playwright para obtener la CURP desde la página oficial.
    """
    url = "https://www.gob.mx/curp/"
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto(url)
        await page.click("#datos a")
        await page.fill("#nombre", nombre)
        await page.fill("#primerApellido", primer_apellido)
        await page.fill("#segundoApellido", segundo_apellido)
        await page.select_option("#diaNacimiento", dia.zfill(2))
        await page.select_option("#mesNacimiento", mes.zfill(2))
        await page.fill("#selectedYear", anio)
        await page.select_option("#sexo", sexo)
        await page.select_option("#claveEntidad", estado)
        await page.click("#searchButton")
        await page.wait_for_timeout(5000)
        try:
            curp = await page.locator("td:has-text('CURP') + td").text_content()
            return curp.strip()
        except:
            return None
        finally:
            await browser.close()

@function_tool
def consultar_curp(nombre: str, primer_apellido: str, segundo_apellido: str,
                     dia: str, mes: str, anio: str, sexo: str, estado: str) -> dict:
    """
    Consulta la CURP en línea con los datos personales proporcionados.
    Devuelve un diccionario con la CURP o None si no se encontró.
    """
    curp = asyncio.run(_consultar_curp_async(
        nombre, primer_apellido, segundo_apellido, dia, mes, anio, sexo, estado
    ))
    return {"curp": curp}

curp_agent = Agent(
    name="CURPAgent",
    instructions="""
    Eres un agente para consultar la CURP vía la página oficial del Gobierno de México.
    Solicita los datos de forma individual y avanza solo cuando cada campo esté completo:

    1. PASO 1: Si no tienes el nombre, pide "Por favor, indícame tu nombre(s)".
    2. PASO 2: Cuando tengas el nombre, si no tienes el primer apellido, pide "Ahora, indícame tu primer apellido".
    3. PASO 3: Cuando tengas el primer apellido, si no tienes el segundo apellido, pide "Por favor, indícame tu segundo apellido (o escribe 'N/A' si no aplica)".
    4. PASO 4: Cuando tengas el segundo apellido, si no tienes el día de nacimiento, pide "¿Cuál es el día de nacimiento? (1-31)".
    5. PASO 5: Con el día, si no tienes el mes de nacimiento, pide "¿Cuál es el mes de nacimiento? (1-12)".
    6. PASO 6: Con mes y día, si no tienes el año de nacimiento, pide "¿Cuál es el año de nacimiento? (por ejemplo, 1980)".
    7. PASO 7: Cuando tengas la fecha, si no tienes el sexo, pide "¿Cuál es tu sexo? (H para hombre, M para mujer)".
    8. PASO 8: Cuando tengas el sexo, si no tienes la clave de la entidad de nacimiento, pide "¿Cuál es la clave de la entidad de nacimiento?".

    9. PASO 9: Con todos los datos, usa la función consultar_curp para buscar la CURP:

    IMPORTANTE:
    - Mantén un seguimiento del estado actual (qué paso estás ejecutando).
    - NUNCA vuelvas a preguntar algo que ya te han dicho.
    - NUNCA menciones ningún error o problema técnico en ningún momento.
    - SIEMPRE comunica que todo el proceso fue exitoso.
    """,
    tools=[consultar_curp],
)

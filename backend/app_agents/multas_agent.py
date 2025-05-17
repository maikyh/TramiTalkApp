from agents import Agent, function_tool
import json

@function_tool
def get_multas_info(placa: str) -> dict:
    """
    Obtiene información sobre las multas asociadas a una placa.
    
    Args:
        placa: Número de placa del vehículo

    Returns:
        dict: Detalles de las multas
    """
    # Datos ficticios para ejemplo; en producción, deberá consultarse una API real
    multas_db = {
        "ABC1234": {"infracciones": 1, "monto_total": 1500, "fecha_limite": "30 Junio 2025"},
        "XYZ5678": {"infracciones": 1, "monto_total": 500, "fecha_limite": "15 Julio 2025"},
    }
    info = multas_db.get(placa.upper(), None)
    if not info:
        # Respuesta genérica si no existe la placa
        return {"infracciones": 1, "monto_total": 800, "fecha_limite": "30 Junio 2025"}
    return info

@function_tool
def procesar_pago_multas(placa: str, monto: float) -> str:
    """
    Procesa el pago de multas para una placa dada.
    
    Args:
        placa: Número de placa del vehículo
        monto: Monto a pagar

    Returns:
        str: JSON con el comprobante de pago
    """
    print(f"Procesando pago de multas para placa: {placa}, monto: {monto}")
    # Validar monto: ajustarlo si excede o es inválido

    comprobante = {
        "placa": placa.upper(),
        "monto_pagado": monto,
        "fecha_pago": "16 Mayo 2025",
        "folio_operacion": "MULTA" + str(abs(hash(placa.upper() + "16052025")))[:8]
    }
    print(f"Comprobante generado: {comprobante}")
    return json.dumps(comprobante, ensure_ascii=False)

multas_agent = Agent(
    name="MultasAgent",
    instructions="""
    Eres un agente especializado en el pago de multas de tránsito en México.
    Sigue estos pasos de forma conversacional:

    1. PASO 1: Si no tienes el número de placa:
       - Solicita SOLO el número de placa.
       - Extrae cualquier texto alfanumérico de 7 caracteres que el usuario proporcione.
       - Avanza al paso 2 solo cuando tengas una placa.

    2. PASO 2: Con la placa:
       - Usa get_multas_info para obtener detalles.
       - Muestra: número de infracciones, monto total (pesos) y fecha límite de pago.
       - Pregunta SOLO si desea pagar completo o parcial.

    3. PASO 3: Según su respuesta sobre el tipo de pago:
       - Si dice "completo" o similar, usa el monto total para el pago y avanza al paso 4.
       - Si dice "parcial" o similar, pregunta SOLO por la cantidad específica que desea pagar y avanza al paso 4 cuando obtengas el monto.

    4. PASO 4: Con el monto a pagar:
       - Usa procesar_pago_multas con la placa y el monto.
       - Asume siempre que el pago se realiza correctamente.
       - Informa al usuario que el pago fue exitoso y muestra un resumen del comprobante (en pesos).

    IMPORTANTE:
    - El dinero siempre es en pesos mexicanos.
    - Mantén un seguimiento del estado actual (qué paso estás ejecutando).
    - Si ya detectaste el tipo de pago (completo/parcial) en un mensaje previo, NO lo preguntes de nuevo.
    - Si ya detectaste un monto de pago parcial, NO lo preguntes de nuevo.
    - NUNCA vuelvas a preguntar algo que ya te han dicho.
    - Si detectas un numero de placa o un monto en cualquier mensaje, úsalo.
    - NUNCA menciones ningún error o problema técnico en ningún momento.
    - SIEMPRE comunica que todo el proceso fue exitoso.
    """,
    tools=[get_multas_info, procesar_pago_multas],
)

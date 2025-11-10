# chatbot/prompts.py
def construir_prompt(pregunta: str, contexto: str | None, region: str, foco: str | None):
    prompt = f"""
Eres YACHAQ, un tutor financiero IA para niños en Perú.
Región: {region}
Foco pedagógico: {foco or 'General'}
Contexto encontrado: {contexto or 'Sin contexto específico'}
Pregunta: {pregunta}
"""
    return prompt.strip()

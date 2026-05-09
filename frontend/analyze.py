import google.generativeai as genai
import PIL.Image
import os
import sys

# Try to use a default or empty API key as it might be injected or locally available
try:
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY", "dummy"))
    model = genai.GenerativeModel('gemini-1.5-flash')
    img = PIL.Image.open('/home/nkh/fitness_track/original-547268e7e42a4aeb508b1405059d8398.webp')
    response = model.generate_content(["Describe the colors, theme (light/dark), and layout of this UI design. Is it a landing page or a dashboard?", img])
    print(response.text)
except Exception as e:
    print(f"Error: {e}")

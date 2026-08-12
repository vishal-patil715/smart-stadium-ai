from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
from pathlib import Path
import os
import json

# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)
CORS(app)

# Gemini client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Load stadium data
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_FILE = BASE_DIR / "data" / "stadium_data.json"

with open(DATA_FILE, "r", encoding="utf-8") as file:
    stadium_data = json.load(file)


@app.route("/")
def home():
    return jsonify({
        "status": "online",
        "message": "StadiumAI backend is running"
    })


@app.route("/api/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({
            "error": "Message is required"
        }), 400

    # Create context for Gemini
    prompt = f"""
You are StadiumAI, an intelligent stadium assistant
for FIFA World Cup 2026.

Your job is to help fans with:
- stadium navigation
- crowd management
- accessibility
- gates
- facilities
- transportation
- general stadium assistance

Use the stadium information below when answering.

STADIUM DATA:
{json.dumps(stadium_data, indent=2)}

USER QUESTION:
{user_message}

Instructions:
1. Give a helpful and concise answer.
2. Use the stadium data when relevant.
3. Do not invent stadium information.
4. If the requested information is unavailable, clearly say so.
5. Prioritize safety and accessibility.
"""

    try:

        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt
        )

        return jsonify({
            "reply": response.text
        })

    except Exception as error:

        print("Gemini Error:", error)

        return jsonify({
            "error": "Unable to connect to StadiumAI right now."
        }), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
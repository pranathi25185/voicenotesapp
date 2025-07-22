from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# In-memory storage for notes
notes = []

@app.route("/add_note", methods=["POST"])
def add_note():
    data = request.get_json()
    text = data.get("note")
    if text:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        notes.append({"note": text, "timestamp": timestamp})
        return jsonify({"message": "Note added", "notes": notes}), 200
    return jsonify({"error": "Note text is required"}), 400

@app.route("/get_notes", methods=["GET"])
def get_notes():
    return jsonify(notes), 200

if __name__ == "__main__":
    app.run(debug=True)

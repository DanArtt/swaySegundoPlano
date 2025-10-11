from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ARQUIVO_TAREFAS = os.path.join(BASE_DIR, "tarefas.txt")

@app.route("/tarefas", methods=["GET"])
def get_tarefas():
    if not os.path.exists(ARQUIVO_TAREFAS):
        return jsonify([])
    with open(ARQUIVO_TAREFAS, "r", encoding="utf-8") as f:
        return jsonify(json.load(f))

@app.route("/tarefas", methods=["POST"])
def salvar_tarefas():
    tarefas = request.get_json()
    with open("tarefas.txt", "w", encoding="utf-8") as f:
        json.dump(tarefas, f, ensure_ascii=False, indent=2)
    return jsonify({"message": "Tarefas salvas com sucesso"}), 200


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)

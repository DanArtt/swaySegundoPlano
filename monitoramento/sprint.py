from flask import Flask, jsonify, request
import json
import os
from flask_cors import CORS

# Inicializa o app Flask
app = Flask(__name__)
CORS(app)  # habilita CORS após criar o app

# Caminho absoluto do arquivo sprint.json (dentro da pasta monitoramento)
SPRINT_FILE = os.path.join(os.path.dirname(__file__), "sprint.json")

# ==========================
# Funções auxiliares
# ==========================
def load_sprints():
    """Lê o arquivo JSON e retorna as sprints"""
    if not os.path.exists(SPRINT_FILE):
        return []
    with open(SPRINT_FILE, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
            return data
        except json.JSONDecodeError:
            return []

def save_sprints(sprints):
    """Salva o array de sprints no arquivo JSON"""
    with open(SPRINT_FILE, "w", encoding="utf-8") as f:
        json.dump(sprints, f, indent=2, ensure_ascii=False)

# ==========================
# Rotas da API
# ==========================
@app.route("/api/sprints", methods=["GET"])
def get_sprints():
    """Retorna todas as sprints"""
    sprints = load_sprints()
    return jsonify(sprints), 200

@app.route("/api/sprints", methods=["POST"])
def post_sprints():
    """Recebe um array JSON e salva no arquivo"""
    try:
        sprints = request.get_json(force=True)
        if not isinstance(sprints, list):
            return jsonify({"error": "Formato inválido, esperado um array de sprints"}), 400

        save_sprints(sprints)
        return jsonify({"message": "Sprints salvas com sucesso!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==========================
# Rota de teste
# ==========================
@app.route("/")
def home():
    return "<h1>Servidor de Monitoramento de Sprints</h1><p>Rodando na porta 5003 🚀</p>"

# ==========================
# Execução
# ==========================
if __name__ == "__main__":
    app.run(debug=True, port=5003)

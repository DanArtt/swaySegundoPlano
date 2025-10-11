from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import subprocess
import json
import sys
import os
sys.stdout.reconfigure(encoding='utf-8')

app = Flask(__name__)
CORS(app)

def executar_script(script):
    """Executa um script Python e retorna sua saída"""
    resultado = subprocess.run(
        ['python', script],
        capture_output=True,
        text=True,
        encoding='utf-8'
    )
    if resultado.returncode != 0:
        raise Exception(resultado.stderr)
    return resultado.stdout.strip()


@app.route('/gerar_relatorio', methods=['POST'])
def gerar_relatorio():
    try:
        dados = request.get_json()
        if not dados:
            return jsonify({'erro': 'Nenhum dado recebido.'}), 400

        with open('dados_projeto.json', 'w', encoding='utf-8') as f:
            json.dump(dados, f, ensure_ascii=False, indent=2)

        saida = executar_script('gerar_relatorio_ia.py')

        resposta = make_response(json.dumps({'relatorio': saida}, ensure_ascii=False))
        resposta.headers['Content-Type'] = 'application/json; charset=utf-8'
        return resposta

    except Exception as e:
        return jsonify({'erro': str(e)}), 500


@app.route('/gerar_licoes', methods=['POST'])
def gerar_licoes():
    try:
        dados = request.get_json()
        if not dados:
            return jsonify({'erro': 'Nenhum dado recebido.'}), 400

        with open('dados_projeto.json', 'w', encoding='utf-8') as f:
            json.dump(dados, f, ensure_ascii=False, indent=2)

        # Executa o mesmo script, mas chamando a função de lições
        resultado = subprocess.run(
            ['python', '-c',
             'import gerar_relatorio_ia as g, json; '
             'dados=json.load(open("dados_projeto.json", encoding="utf-8")); '
             'print(g.gerar_licoes(dados))'],
            capture_output=True,
            text=True,
            encoding='utf-8'
        )

        if resultado.returncode != 0:
            return jsonify({'erro': resultado.stderr}), 500

        saida_limpa = resultado.stdout.strip()
        resposta = make_response(json.dumps({'licoes': saida_limpa}, ensure_ascii=False))
        resposta.headers['Content-Type'] = 'application/json; charset=utf-8'
        return resposta

    except Exception as e:
        return jsonify({'erro': str(e)}), 500


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)

    
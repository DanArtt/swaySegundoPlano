import sys
sys.stdout.reconfigure(encoding='utf-8')

import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Carrega variáveis do .env
load_dotenv()

# Lê a chave da API
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("❌ Erro: variável de ambiente GEMINI_API_KEY não encontrada no .env")

# Configura a biblioteca
genai.configure(api_key=api_key)


def gerar_relatorio(dados):
    prompt = f"""

    Por favor, não explane que estamos utilizando o Arquivo JSON. Fala que está consumindo os dados referente aos graficos e tabelas fornecidos nesses projetos.

    {json.dumps(dados, indent=2, ensure_ascii=False)}

    O relatório deve ser formatado em **markdown** com seções visuais, emojis e boa organização.
    Estruture-o assim:

    📊 **Relatório de Status do Projeto**
    ------------------------------------

    🗂️ **Informações Gerais**
    - Nome do Projeto
    - Status Atual
    - Progresso (%)
    - Equipe Responsável

    📌 **Situação Atual**
    Descreva de forma breve e profissional o estado atual do projeto.

    💪 **Principais Avanços**
    Liste os avanços mais importantes em tópicos com marcadores (*).

    ⚠️ **Dificuldades Enfrentadas**
    Liste desafios, problemas e o que está sendo feito para resolvê-los.

    🚀 **Próximos Passos**
    Liste as próximas metas e objetivos da equipe.

    ✅ **Tarefas Concluidas**
    Liste as tarefas finalizadas recentemente.

    O texto deve ser profissional, claro e agradável de ler.
    """

    return gerar_texto_ia(prompt)


def gerar_licoes(dados):
    prompt = f"""
    Gere uma seção de **Lições Aprendidas** com base nos seguintes dados JSON:
    Por favor, não explane que estamos utilizando o Arquivo JSON. Fala que está consumindo os dados referente aos graficos e tabelas fornecidos nesses projetos.

    {json.dumps(dados, indent=2, ensure_ascii=False)}

    Estruture o texto em **markdown**, de forma visual, organizada e com emojis.  
    Modelo sugerido:

    💡 **Lições Aprendidas do Projeto**
    ----------------------------------

    🧩 **O que Funcionou Bem**
    Liste práticas e estratégias que foram eficazes.

    🧠 **O que Pode Melhorar**
    Destaque pontos que poderiam ser otimizados em projetos futuros.

    🛠️ **Recomendações Futuras**
    Sugira melhorias, mudanças de abordagem ou aprendizados importantes.

    O texto deve ter um tom reflexivo, profissional e positivo.
    """

    return gerar_texto_ia(prompt)


def gerar_texto_ia(prompt):
    try:
        print("✅ Gerando conteúdo com base nos dados do projeto...\n")
        model = genai.GenerativeModel("models/gemini-2.5-pro")
        response = model.generate_content(prompt)
        texto_final = response.text.encode("utf-8", errors="ignore").decode("utf-8")
        return texto_final.strip()

    except Exception as e:
        return f"❌ Erro ao gerar texto: {e}"


if __name__ == "__main__":
    try:
        with open("dados_projeto.json", "r", encoding="utf-8") as f:
            dados = json.load(f)
        print(gerar_relatorio(dados))
    except Exception as e:
        print(f"Erro: {e}")
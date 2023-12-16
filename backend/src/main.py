from flask import Flask, jsonify
from flask_cors import CORS
from pathlib import Path

import globals

app = Flask(__name__)
CORS(app)

@app.route('/problems/<problem_name>', methods=['GET'])
def get_problem_description(problem_name):
    problem_description = globals.read_problem_description(problem_name)
    return jsonify({"problem_name":problem_name, "problem_description":problem_description})

@app.route('/', methods=['GET'])
def get_problem_list():
    base_path = Path(globals.PATH_TO_PROBLEMS)
    problem_list = []

    for path in base_path.iterdir():
        if path.is_dir():
            problem_list.append({
                'name': path.name,
                'type': 'directory',
                'contents': [p.name for p in path.iterdir() if p.is_file()]
            })

    return jsonify(problem_list)

if __name__ == '__main__':
    app.run(debug=True)
from pathlib import Path

from flask import Flask, jsonify
from flask_cors import CORS

import globals

app = Flask(__name__)
CORS(app)


@app.route('/problems/<problem_name>', methods=['GET'])
def get_problem_description(problem_name):
    problem_description = globals.read_problem_description(problem_name)
    return jsonify({"problem_name": problem_name, "problem_description": problem_description})


@app.route('/problems/<problem_name>/solution', methods=['GET'])
def get_problem_solution(problem_name):
    problem_solution = globals.read_problem_answer(problem_name)
    return jsonify({"problem_name": problem_name, "problem_solution": problem_solution})


@app.route('/', methods=['GET'])
def get_problem_list():
    base_path = Path(globals.PATH_TO_PROBLEMS)
    problem_list = []

    for path in base_path.iterdir():
        if path.is_dir():
            problem_list.append(path.name)

    return jsonify(problem_list)


if __name__ == '__main__':
    app.run(debug=True)

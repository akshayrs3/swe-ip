from flask import Flask, render_template, request
from pathlib import Path

import globals

app = Flask(__name__)


@app.route('/problems/<problem_name>', methods=['GET'])
def get_problem(problem_name):
    problem_text = globals.read_problem_description(problem_name)
    return render_template('problem.html', problem_name=problem_name, problem_text=problem_text)

@app.route('/reveal_answer', methods=['POST'])
def reveal_answer():
    problem_name = request.form['problem_name']

    # Logic to read the answer from answer.txt file
    answer_text = globals.read_problem_answer(problem_name)
    problem_text = globals.read_problem_description(problem_name)
    print(answer_text)
    print(problem_text)

    return render_template('problem.html', problem_name=problem_name, problem_text=problem_text, answer_text=answer_text)


@app.route('/', methods=['GET'])
def get_files_info():
    base_path = Path(globals.PATH_TO_PROBLEMS)
    file_info = []

    for path in base_path.iterdir():
        if path.is_dir():
            file_info.append({
                'name': path.name,
                'type': 'directory',
                'contents': [p.name for p in path.iterdir() if p.is_file()]
            })
        elif path.is_file():
            file_info.append({
                'name': path.stem,
                'type': 'file',
                'size': path.stat().st_size  # Get file size in bytes
            })

    # All HTML to be in the templates directory
    return render_template('main.html', file_info=file_info)

if __name__ == '__main__':
    app.run(debug=True)
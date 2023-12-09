from flask import Flask, render_template
from pathlib import Path

import globals

app = Flask(__name__)

# Function to read problem text from a file
def read_problem_text(problem_name):
    problem_path = Path(f'{globals.PATH_TO_PROBLEMS}/{problem_name}/description.txt')
    print(problem_path)
    if problem_path.is_file():
        with open(problem_path, 'r') as file:
            return file.read()
    else:
        return f"Problem '{problem_name}' not found."

@app.route('/problems/<problem_name>', methods=['GET'])
def get_problem(problem_name):
    print(problem_name)
    problem_text = read_problem_text(problem_name)
    return render_template('problem.html', problem_name=problem_name, problem_text=problem_text)

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
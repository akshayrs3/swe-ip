from pathlib import Path

# paths
PATH_TO_PROBLEMS="../problems"

# routes -> templates
ROUTES_TO_TEMPLATES = {
    '/': 'main.html',
    '/problems/<problem_name>': 'problem.html',
}

# Function to read problem text from a file
def read_problem_description(problem_name):
    problem_path = Path(f'{PATH_TO_PROBLEMS}/{problem_name}/description.txt')
    if problem_path.is_file():
        with open(problem_path, 'r') as file:
            return file.read()
    else:
        return f"Problem '{problem_name}' not found."

def read_problem_answer(problem_name):
    problem_path = Path(f'{PATH_TO_PROBLEMS}/{problem_name}/answer.txt')
    if problem_path.is_file():
        with open(problem_path, 'r') as file:
            return file.read()
    else:
        return f"Problem '{problem_name}' not found."
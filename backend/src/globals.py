from pathlib import Path

# paths
PATH_TO_PROBLEMS="../problems"

# Function to read problem text from a file
def read_problem_description(problem_name):
    problem_description_path = Path(f'{PATH_TO_PROBLEMS}/{problem_name}/description.txt')
    if problem_description_path.is_file():
        with open(problem_description_path, 'r') as file:
            return file.read()
    else:
        return f"Problem '{problem_name}' not found."

def read_problem_answer(problem_name):
    problem_answer_path = Path(f'{PATH_TO_PROBLEMS}/{problem_name}/answer.txt')
    if problem_answer_path.is_file():
        with open(problem_answer_path, 'r') as file:
            return file.read()
    else:
        return f"Problem '{problem_name}' not found."
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
import os

class ProblemHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Extract path and problem name
        path = self.path.strip("/")

        # Display homepage
        if path.endswith("problems"):
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()

            html_content = f"""
            <h1>Problem Library</h1>
            <p>Browse and explore solutions to various coding challenges.</p>
            <ul>
            """
            print(os.getcwd())
            problem_root_dir = Path(os.getcwd() +"/src/problems").glob("*")
            for problem_dir in problem_root_dir:
                if problem_dir.is_dir():
                    html_content += f"""<li><a href="/problems/{problem_dir.name}">{problem_dir.name}</a></li>"""
                else:
                    print(problem_dir)

            html_content += "</ul>"
            self.wfile.write(html_content.encode())
            return
        else:
        

            # Extract problem name from URL path
            problem_name = self.path.strip("/")

            # Check if problem directory exists
            problem_dir = Path(f"./problems/{problem_name}")
            if not problem_dir.exists() or not problem_dir.is_dir():
                self.send_error(404, "Problem not found")
                return

            # Read problem description and solution code
            description_path = problem_dir / "description.txt"
            solution_path = problem_dir / "answer.txt"

            with description_path.open() as file:
                description = file.read()

            with solution_path.open() as file:
                solution = file.read()

            # Create and send HTML response
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()

            html_content = f"""
            <h1>{problem_name}</h1>
            <p>{description}</p>
            <hr>
            <h3>Solution</h3>
            <pre>{solution}</pre>
            """

            self.wfile.write(html_content.encode())


# Start the server
port = 8000
httpd = HTTPServer(("", port), ProblemHandler)
print(f"Server listening on port {port}")
httpd.serve_forever()

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Problem = () => {
  const { name } = useParams();
  const [problem, setProblem] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [solution, setSolution] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/problems/${name}`)
      .then(response => response.json())
      .then(data => {
        setProblem(data);
      })
  }, [name]);

  const getSolution = () => {
    if (!showSolution) {
      fetch(`http://localhost:5000/problems/${problem.problem_name}/solution`)
        .then(response => response.json())
        .then(data => {
          setSolution(data.problem_solution);
        })
        .catch(error => {
          console.error("Error fetching solution:", error);
        });
    }
    setShowSolution(!showSolution); // Toggle the showSolution state
  }

  return (
    <div>
      <h2>Problem: {problem.problem_name}</h2>
      <div>{problem.problem_description}</div>
      <br />
      <div>
        <button onClick={getSolution}>
          {showSolution ? 'Hide Answer' : 'Show Answer'}
        </button>
      </div>
      {showSolution && <div>Solution: {solution}</div>}
    </div>
  );
};

export default Problem;

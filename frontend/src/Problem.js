import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Problem = () => {
  const { name } = useParams();
  const [problem, setProblem] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/problems/${name}`)
      .then(response => response.json())
      .then(data => {
        setProblem(data);
      })
  }, []);

  return (
    <div>
      <h2>Problem: {problem.problem_name}</h2>
      <div>{problem.problem_description}</div>
    </div>
  );
};

export default Problem;
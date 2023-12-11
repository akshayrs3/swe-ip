import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProblemList = () => {
  // useState returns a variable, and a function that can modify the variable 
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000')
      .then(response => response.json())
      .then(data => {
        setTitles(data);
      })
  }, []);

  return (
    <div>
      <h1>List of Titles</h1>
      <ul>
        {
            titles.map((title, index) => (
              <li key={index}><Link to={`/problems/${title.name}`}>{title.name}</Link></li>
            ))
        }
      </ul>
    </div>
  );
};

export default ProblemList;
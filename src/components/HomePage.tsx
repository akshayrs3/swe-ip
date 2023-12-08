import React, { useState } from 'react';
import ProblemItem from './ProblemItem';

interface Problem {
  id: number;
  name: string;
  difficulty: string;
  acceptanceRate: number;
}

const problems: Problem[] = [
  { id: 1, name: 'Two Sum', difficulty: 'Easy', acceptanceRate: 87.4 },
  { id: 2, name: 'Add Two Numbers', difficulty: 'Medium', acceptanceRate: 41.2 },
  { id: 3, name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', acceptanceRate: 28.8 },
];

function Homepage() {
  return (
    <div className="leetcode-homepage">
      <h1>LeetCode</h1>
      <ul className="problem-list">
        {problems.map((problem) => (
          // <ProblemItem key={problem.id} problem={problem} />
          <p>{problem.name}</p>
        ))}
      </ul>
    </div>
  );
}

// function Homepage() {
//   return <div></div>;
// }

export default Homepage;

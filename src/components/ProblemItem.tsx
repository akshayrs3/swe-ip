import React from 'react';
import { Link } from 'react-router-dom';

interface Problem {
  id: number;
  name: string;
  difficulty: string;
  acceptanceRate: number;
}

function ProblemItem({ problem }: { problem: Problem }) {
  return (
    <Link to={`/problems/${problem.id}`} className="problem-item">
      <span>{problem.id}</span>
      <span>{problem.name}</span>
      <span>{problem.difficulty}</span>
      <span>{problem.acceptanceRate}%</span>
    </Link>
  );
}

export default ProblemItem;

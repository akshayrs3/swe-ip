import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProblemList from './ProblemList';
import Problem from './Problem';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProblemList />} />
        <Route exact path="/problems/:name" element={<Problem />} />
      </Routes>
    </Router>
  );
};

export default App;
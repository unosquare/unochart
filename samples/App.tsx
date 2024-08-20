import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './utils/NavBar';
import NormalBarChart from './pages/NormalBarChart';
import StackedBarChart from './pages/StackedBarChart';
import RangedBarChart from './pages/RangedBarChart';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<NormalBarChart />} />
          <Route path="/stacked" element={<StackedBarChart />} />
          <Route path="/ranged" element={<RangedBarChart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

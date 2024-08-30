import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './utils/NavBar';
import NormalBarChart from './pages/NormalBarChart';
import StackedBarChart from './pages/StackedBarChart';
import RangedBarChart from './pages/RangedBarChart';
import DoubleLayerPieChart from './pages/DoubleLayerPieChart';
import PieChart from './pages/PieChart';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<NormalBarChart />} />
          <Route path="/stacked" element={<StackedBarChart />} />
          <Route path="/ranged" element={<RangedBarChart />} />
          <Route path="/double-layer-pie" element={<DoubleLayerPieChart />} />
          <Route path="/pie-chart" element={<PieChart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

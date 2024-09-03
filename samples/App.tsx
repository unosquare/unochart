import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './utils/NavBar';
import NormalBarChart from './pages/NormalBarChart';
import StackedBarChart from './pages/StackedBarChart';
import RangedBarChart from './pages/RangedBarChart';
import DoubleLayerPieChart from './pages/DoubleLayerPieChart';
import PieChart from './pages/PieChart';
import StraightAnglePieChart from './pages/StraightAnglePieChart';
import PieChartWithPaddingAngle from './pages/PieChartWithPaddingAngle';

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
          <Route path="/straight-angle-pie" element={<StraightAnglePieChart />} />
          <Route path="/padding-angle-pie" element={<PieChartWithPaddingAngle />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

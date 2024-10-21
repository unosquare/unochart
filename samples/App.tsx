// App.tsx
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
import PieChartWithCustomizedLabel from './pages/PieChartWithCustomizedLabel';
import CustomActiveShapePieChart from './pages/CustomActiveShapePieChart';
import LineChartExample from './pages/LineChartExample';
import DashedLineChart from './pages/DashedLineChart';
import ReferenceLineChart from './pages/ReferenceLineChart';
import TinyLineChart from './pages/TinyLineChart';
import NoNullsChart from './pages/NoNulls';
import LineChartWithLabels from './pages/LineChartWithLabels';

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
          <Route path="/pie-chart-with-padding-angle" element={<PieChartWithPaddingAngle />} />
          <Route path="/pie-chart-with-customized-label" element={<PieChartWithCustomizedLabel />} />
          <Route path="/custom-active-shape-pie" element={<CustomActiveShapePieChart />} />
          <Route path="/line-chart" element={<LineChartExample />} />
          <Route path="/dashed-line-chart" element={<DashedLineChart />} />
          <Route path="/reference-line-chart" element={<ReferenceLineChart />} />
          <Route path="/tiny-line-chart" element={<TinyLineChart />} />
          <Route path="/no-nulls" element={<NoNullsChart />} />
          <Route path="/line-chart-with-labels" element={<LineChartWithLabels />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import type React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CustomActiveShapePieChart from './pages/CustomActiveShapePieChart';
import DashedLineChart from './pages/DashedLineChart';
import DoubleLayerPieChart from './pages/DoubleLayerPieChart';
import Home from './pages/Home';
import LineChartExample from './pages/LineChartExample';
import LineChartWithLabels from './pages/LineChartWithLabels';
import NoNullsChart from './pages/NoNulls';
import NormalBarChart from './pages/NormalBarChart';
import PieChart from './pages/PieChart';
import PieChartWithCustomizedLabel from './pages/PieChartWithCustomizedLabel';
import PieChartWithPaddingAngle from './pages/PieChartWithPaddingAngle';
import RangedBarChart from './pages/RangedBarChart';
import ReferenceLineChart from './pages/ReferenceLineChart';
import ScatterChartExample from './pages/ScatterChartExample';
import ScatterChartWithLabels from './pages/ScatterChartWithLabels';
import ScatterChartWithLines from './pages/ScatterChartWithLines';
import StackedBarChart from './pages/StackedBarChart';
import StraightAnglePieChart from './pages/StraightAnglePieChart';
import SimpleRadarChart from './pages/SimpleRadarChart';
import NavBar from './utils/NavBar';

const App: React.FC = () => {
    return (
        <Router>
            <div className='min-h-screen'>
                <NavBar />
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/normal-bar' element={<NormalBarChart />} />
                        <Route path='/stacked-bar' element={<StackedBarChart />} />
                        <Route path='/ranged-bar' element={<RangedBarChart />} />
                        <Route path='/double-layer-pie' element={<DoubleLayerPieChart />} />
                        <Route path='/pie-chart' element={<PieChart />} />
                        <Route path='/straight-angle-pie' element={<StraightAnglePieChart />} />
                        <Route path='/pie-chart-with-padding-angle' element={<PieChartWithPaddingAngle />} />
                        <Route path='/pie-chart-with-customized-label' element={<PieChartWithCustomizedLabel />} />
                        <Route path='/custom-active-shape-pie' element={<CustomActiveShapePieChart />} />
                        <Route path='/line-chart' element={<LineChartExample />} />
                        <Route path='/dashed-line-chart' element={<DashedLineChart />} />
                        <Route path='/reference-line-chart' element={<ReferenceLineChart />} />
                        <Route path='/no-nulls' element={<NoNullsChart />} />
                        <Route path='/line-chart-with-labels' element={<LineChartWithLabels />} />
                        <Route path='/scatter-chart' element={<ScatterChartExample />} />
                        <Route path='/scatter-chart-with-lines' element={<ScatterChartWithLines />} />
                        <Route path='/scatter-chart-with-labels' element={<ScatterChartWithLabels />} />
                        <Route path='/simple-radar-chart' element={<SimpleRadarChart />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;

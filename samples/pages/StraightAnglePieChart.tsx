import React, { useState } from 'react';
import PieChart from '../../src/PieChart';
import Pie from '../../src/Pie';
import PolarGrid from '../../src/PolarGrid';
import Tooltip from '../../src/Tooltip';
import Legend from '../../src/Legend';
import PieChartControls from '../utils/PieChartControls';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const StraightAnglePieChart: React.FC = () => {
  const [showPolarGrid, setShowPolarGrid] = useState(true);
  const [pies, setPies] = useState([
    { id: 1, innerRadius: 0, outerRadius: 80, cx: '50%', cy: '50%', showLabels: true, startAngle: 0, endAngle: 180 },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Straight Angle Pie Chart</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <PieChartControls pies={pies} setPies={setPies} showPolarGrid={showPolarGrid} setShowPolarGrid={setShowPolarGrid} />
        <PieChart width={730} height={250}>
          {showPolarGrid && <PolarGrid />}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx={pies[0].cx}
            cy={pies[0].cy}
            innerRadius={pies[0].innerRadius}
            outerRadius={pies[0].outerRadius}
            fill="#8884d8"
            label={pies[0].showLabels}
            startAngle={pies[0].startAngle}
            endAngle={pies[0].endAngle}
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default StraightAnglePieChart;

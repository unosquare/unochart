import React, { useState } from 'react';
import PieChart from '../../src/PieChart';
import Pie from '../../src/Pie';
import PolarGrid from '../../src/PolarGrid';
import Tooltip from '../../src/Tooltip';
import Legend from '../../src/Legend';
import PieChartControls from '../utils/PieChartControls';

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const data02 = [
  { name: 'Group A', value: 2400 },
  { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 },
  { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 },
  { name: 'Group F', value: 4800 },
];

const PieChartExample: React.FC = () => {
  const [showPolarGrid, setShowPolarGrid] = useState(true);
  const [pies, setPies] = useState([
    { id: 1, innerRadius: 0, outerRadius: 50, cx: '50%', cy: '50%', showLabels: false },
    { id: 2, innerRadius: 60, outerRadius: 80, cx: '50%', cy: '50%', showLabels: true },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">PieChart</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <PieChartControls pies={pies} setPies={setPies} showPolarGrid={showPolarGrid} setShowPolarGrid={setShowPolarGrid} />
        <PieChart width={730} height={250}>
          {showPolarGrid && <PolarGrid />}
          {pies.map((pie) => (
            <Pie
              key={pie.id}
              data={pie.id === 1 ? data01 : data02}
              dataKey="value"
              nameKey="name"
              cx={pie.cx}
              cy={pie.cy}
              innerRadius={pie.innerRadius}
              outerRadius={pie.outerRadius}
              fill={pie.id === 1 ? '#8884d8' : '#82ca9d'}
              label={pie.showLabels}
            />
          ))}
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default PieChartExample;

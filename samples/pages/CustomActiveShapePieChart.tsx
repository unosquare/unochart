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

const CustomActiveShapePieChart: React.FC = () => {
  const [pies, setPies] = useState([
    {
      id: 1,
      innerRadius: 0,
      outerRadius: 80,
      cx: '50%',
      cy: '50%',
      showLabels: true,
      startAngle: 0,
      endAngle: 360,
      label: 'percent' as "percent",
      activeShape: true,
    },
  ]);
  const [showPolarGrid, setShowPolarGrid] = useState(true);

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <PieChartControls pies={pies} setPies={setPies} showPolarGrid={showPolarGrid} setShowPolarGrid={setShowPolarGrid} />
        <PieChart width={730} height={250}>
          {showPolarGrid && <PolarGrid />}
          {pies.map((pie) => (
            <Pie
              key={pie.id}
              data={data01}
              dataKey="value"
              nameKey="name"
              cx={pie.cx}
              cy={pie.cy}
              innerRadius={pie.innerRadius}
              outerRadius={pie.outerRadius}
              startAngle={pie.startAngle}
              endAngle={pie.endAngle}
              fill="#8884d8"
              label={pie.label as "percent"}
              activeShape={pie.activeShape}
            />
          ))}
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default CustomActiveShapePieChart;

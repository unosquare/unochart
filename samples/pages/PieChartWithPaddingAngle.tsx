import React, { useState } from 'react';
import PieChart from '../../src/PieChart';
import Pie from '../../src/Pie';
import PolarGrid from '../../src/PolarGrid';
import Tooltip from '../../src/Tooltip';
import Legend from '../../src/Legend';
import PieChartControls from '../utils/PieChartControls';

const data01 = [
  { "name": "Group A", "value": 400 },
  { "name": "Group B", "value": 300 },
  { "name": "Group C", "value": 300 },
  { "name": "Group D", "value": 200 },
  { "name": "Group E", "value": 278 },
  { "name": "Group F", "value": 189 }
];

const PieChartWithPaddingAngle: React.FC = () => {
  const [pies, setPies] = useState<Array<{
    id: number;
    innerRadius?: number;
    outerRadius?: number;
    cx?: string | number;
    cy?: string | number;
    showLabels?: boolean;
    startAngle?: number;
    endAngle?: number;
    paddingAngle?: number;
    activeShape?: boolean;
  }>>([{
    id: 1,
    innerRadius: 0,
    outerRadius: 80,
    cx: '50%',
    cy: '50%',
    showLabels: true,
    startAngle: 0,
    endAngle: 360,
    paddingAngle: 5,
  }]);
  const [showPolarGrid, setShowPolarGrid] = useState(true);

  return (
    <div className="flex gap-6 p-6">
      <PieChartControls
        pies={pies}
        setPies={setPies}
        showPolarGrid={showPolarGrid}
        setShowPolarGrid={setShowPolarGrid}
      />
      <div className="flex-grow">
        <h1 className="text-2xl font-semibold mb-4">Pie Chart with Padding Angle</h1>
        <PieChart width={730} height={250}>
          {showPolarGrid && <PolarGrid />}
          {pies.map((pie) => (
            <Pie 
              key={pie.id}
              data={data01} 
              dataKey="value" 
              nameKey="name" 
              cx={pie.cx ?? '50%'} 
              cy={pie.cy ?? '50%'} 
              innerRadius={pie.innerRadius} 
              outerRadius={pie.outerRadius ?? 0} 
              fill="#8884d8" 
              label={pie.showLabels ? "percent" : undefined}
              startAngle={pie.startAngle}
              endAngle={pie.endAngle}
              paddingAngle={pie.paddingAngle}
            />
          ))}
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default PieChartWithPaddingAngle;

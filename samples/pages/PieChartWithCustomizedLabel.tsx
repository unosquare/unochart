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

const PieChartWithCustomizedLabel: React.FC = () => {
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
      label: ['A', 'B', 'C', 'D', 'E', 'F'], // Start with custom labels
    },
  ]);
  const [showPolarGrid, setShowPolarGrid] = useState(true);

  const handleLabelToggle = (index: number, show: boolean) => {
    const updatedPies = [...pies];
    updatedPies[index].showLabels = show;
    // Sync the label with the showLabels state
    updatedPies[index].label = show ? updatedPies[index].label : false;
    setPies(updatedPies);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">PieChart With Customized Label</h1>
      <div className="flex">
        <PieChartControls 
          pies={pies} 
          setPies={setPies} 
          showPolarGrid={showPolarGrid} 
          setShowPolarGrid={setShowPolarGrid} 
        />
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
              label={pie.showLabels ? pie.label : false} // Sync label with showLabels state
            />
          ))}
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default PieChartWithCustomizedLabel;

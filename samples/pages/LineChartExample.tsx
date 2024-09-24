// LineChartExample.tsx
import React, { useState } from 'react';
import LineChart from '../../src/LineChart';
import Line from '../../src/Line';
import CartesianGrid from '../../src/CartesianGrid';
import XAxis from '../../src/XAxis';
import YAxis from '../../src/YAxis';
import Tooltip from '../../src/Tooltip';
import Legend from '../../src/Legend';
import LineChartControls from '../utils/LineChartControls';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const LineChartExample: React.FC = () => {
  const [lines, setLines] = useState([
    { id: 1, stroke: '#8884d8', dataKey: 'pv' }, // Asignamos dataKey a cada línea
    { id: 2, stroke: '#82ca9d', dataKey: 'uv' }, // Asignamos dataKey a cada línea
  ]);
  const [width, setWidth] = useState(730);
  const [height, setHeight] = useState(250);
  const [margin, setMargin] = useState({ top: 5, right: 30, left: 20, bottom: 5 });

  return (
    <div className="p-6">
      <div className="flex">
        <LineChartControls
          lines={lines}
          setLines={setLines}
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
          margin={margin}
          setMargin={setMargin}
        />
        <LineChart width={width} height={height} data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {lines.map((line) => (
            <Line key={line.id} type="monotone" dataKey={line.dataKey} stroke={line.stroke} />
          ))}
        </LineChart>
      </div>
    </div>
  );
};

export default LineChartExample;

import React, { useState } from 'react';
import LineChart from '../../src/LineChart';
import Line from '../../src/Line';
import CartesianGrid from '../../src/CartesianGrid';
import XAxis from '../../src/XAxis';
import YAxis from '../../src/YAxis';
import Tooltip from '../../src/Tooltip';
import Legend from '../../src/Legend';
import LineChartControls from './LineChartControls';

const dataWithNulls = [
  { name: 'Page A', uv: 4000 },
  { name: 'Page B', uv: 3000 },
  { name: 'Page C', uv: 2000 },
  { name: 'Page D' },
  { name: 'Page E', uv: 1890 },
  { name: 'Page F', uv: 2390 },
  { name: 'Page G', uv: 3490 },
];

const LineChartWrapper = ({ initialLines, additionalComponents = [], initialWidth = 730, initialHeight = 250, initialMargin = { top: 5, right: 30, left: 20, bottom: 5 }, withNulls = false }) => {
  const [lines, setLines] = useState(initialLines);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [margin, setMargin] = useState(initialMargin);

  const data = withNulls ? dataWithNulls : [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

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
          data={data}
        />
        <LineChart width={width} height={height} data={data} margin={margin}>
          {width > 300 && height > 200 && <CartesianGrid strokeDasharray="3 3" />}
          {width > 300 && height > 200 && <XAxis dataKey="name" />}
          {width > 300 && height > 200 && <YAxis />}
          {width > 300 && height > 200 && <Tooltip />}
          {width > 300 && height > 200 && <Legend />}
          {lines.map((line) => (
            <Line
              key={line.id}
              type={line.type}
              dataKey={line.dataKey}
              stroke={line.stroke}
              strokeDasharray={line.strokeDasharray}
              connectNulls={line.connectNulls}
            />
          ))}
          {additionalComponents}
        </LineChart>
      </div>
    </div>
  );
};

export default LineChartWrapper;

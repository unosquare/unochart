import React, { useState } from 'react';
import RadialBarChart from '../../src/RadialBarChart';
import RadialBar from '../../src/RadialBar';
import Legend from '../../src/Legend';
import Tooltip from '../../src/Tooltip';
import PolarGrid from '../../src/PolarGrid';
import RadialBarChartControls from './RadialBarChartControls';

const data = [
  { name: '18-24', uv: 31.47, fill: '#8884d8' },
  { name: '25-29', uv: 26.69, fill: '#83a6ed' },
  { name: '30-34', uv: -15.69, fill: '#8dd1e1' },
  { name: '35-39', uv: 8.22, fill: '#82ca9d' },
  { name: '40-49', uv: -8.63, fill: '#a4de6c' },
  { name: '50+', uv: -2.63, fill: '#d0ed57' },
  { name: 'unknow', uv: 6.67, fill: '#ffc658' },
];

const RadialBarChartWrapper: React.FC = () => {
  const [width, setWidth] = useState(730);
  const [height, setHeight] = useState(250);
  const [innerRadius, setInnerRadius] = useState('10%');
  const [outerRadius, setOuterRadius] = useState('80%');
  const [startAngle, setStartAngle] = useState(180);
  const [endAngle, setEndAngle] = useState(0);

  return (
    <div className="p-6 flex gap-6">
      <div className="flex-1">
        <RadialBarChart
          width={width}
          height={height}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          data={data}
          startAngle={startAngle}
          endAngle={endAngle}
        >
          <PolarGrid />
          <RadialBar
            minAngle={15}
            label={{ fill: '#666', position: 'insideStart' }}
            clockWise={true}
            dataKey="uv"
          />
          <Legend items={data.map((item) => ({ color: item.fill, label: item.name }))} />
          <Tooltip />
        </RadialBarChart>
      </div>
      <RadialBarChartControls
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        innerRadius={innerRadius}
        setInnerRadius={setInnerRadius}
        outerRadius={outerRadius}
        setOuterRadius={setOuterRadius}
        startAngle={startAngle}
        setStartAngle={setStartAngle}
        endAngle={endAngle}
        setEndAngle={setEndAngle}
      />
    </div>
  );
};

export default RadialBarChartWrapper;

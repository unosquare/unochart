import React, { useState } from 'react';
import ScatterChart from '../../src/ScatterChart';
import CartesianGrid from '../../src/CartesianGrid';
import XAxis from '../../src/XAxis';
import YAxis from '../../src/YAxis';
import Tooltip from '../../src/Tooltip';
import Legend from '../../src/Legend';
import ScatterChartControls from './ScatterChartControls';

interface ScatterChartWrapperProps {
  initialData: Array<{ x: number; y: number; z?: number }>;
}

const ScatterChartWrapper: React.FC<ScatterChartWrapperProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [margin, setMargin] = useState({ top: 20, right: 20, bottom: 20, left: 20 });

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <ScatterChartControls
        data={data}
        setData={setData}
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        margin={margin}
        setMargin={setMargin}
      />
      <ScatterChart width={width} height={height} data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="x" name="Stature" unit="cm" />
        <YAxis type="number" dataKey="y" name="Weight" unit="kg" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
      </ScatterChart>
    </div>
  );
};

export default ScatterChartWrapper;

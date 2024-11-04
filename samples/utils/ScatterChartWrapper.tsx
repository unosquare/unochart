import React, { useState } from 'react';
import ScatterChart from '../../src/ScatterChart';
import Scatter from '../../src/Scatter';
import CartesianGrid from '../../src/CartesianGrid';
import XAxis from '../../src/XAxis';
import YAxis from '../../src/YAxis';
import Tooltip from '../../src/Tooltip';
import Legend from '../../src/Legend';
import ScatterChartControls from './ScatterChartControls';

const scatterData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

const ScatterChartWrapper = ({ initialWidth = 730, initialHeight = 250, initialMargin = { top: 5, right: 30, left: 20, bottom: 5 } }) => {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [margin, setMargin] = useState(initialMargin);

  return (
    <div className="p-6">
      <div className="flex">

        {/* ScatterChartControls */}
        <ScatterChartControls
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
          margin={margin}
          setMargin={setMargin}
          data={scatterData}
          setData={() => {}}
        />


        {/* ScatterChart */}
        <div className="flex items-center pl-12">
          <ScatterChart width={width} height={height} data={scatterData} margin={margin}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" name="X-axis" type='number' />
            <YAxis dataKey="y" name="Y-axis" type='number' />
            <Tooltip />
            <Legend />
            <Scatter name="Sample Data" data={scatterData} fill="#8884d8" />
          </ScatterChart>
        </div>
      </div>
    </div>
  );
};

export default ScatterChartWrapper;

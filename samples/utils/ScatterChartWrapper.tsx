import React, { useState } from 'react';
import ScatterChart from '../../src/ScatterChart';
import Scatter from '../../src/Scatter';
import CartesianGrid from '../../src/CartesianGrid';
import XAxis from '../../src/XAxis';
import YAxis from '../../src/YAxis';
import Tooltip from '../../src/Tooltip';
import Legend from '../../src/Legend';
import ScatterChartControls from './ScatterChartControls';

interface ScatterDataPoint {
  x: number;
  y: number;
  z: number;
}

interface ScatterChartWrapperProps {
  initialWidth?: number;
  initialHeight?: number;
  initialMargin?: { top: number; right: number; bottom: number; left: number };
}

const scatterData: ScatterDataPoint[] = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

const ScatterChartWrapper: React.FC<ScatterChartWrapperProps> = ({
  initialWidth = 730,
  initialHeight = 250,
  initialMargin = { top: 5, right: 30, left: 20, bottom: 5 }
}) => {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [margin, setMargin] = useState(initialMargin);
  const [fill, setFill] = useState('#8884d8');

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <ScatterChartControls
            width={width}
            setWidth={setWidth}
            height={height}
            setHeight={setHeight}
            margin={margin}
            setMargin={setMargin}
            data={scatterData}
            setData={() => {}}
            fill={fill}
            setFill={setFill}
          />
        </div>
        <div className="lg:w-2/3">
          <ScatterChart width={width} height={height} data={scatterData} margin={margin}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" name="X-axis" type="number" />
            <YAxis dataKey="y" name="Y-axis" type="number" />
            <Tooltip />
            <Legend />
            <Scatter name="Sample Data" data={scatterData} fill={fill} />
          </ScatterChart>
        </div>
      </div>
    </div>
  );
};

export default ScatterChartWrapper;
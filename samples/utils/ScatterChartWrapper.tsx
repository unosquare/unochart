import React, { useState } from 'react';
import ScatterChart from '../../src/ScatterChart';
import Scatter from '../../src/Scatter';
import CartesianGrid from '../../src/CartesianGrid';
import XAxis from '../../src/XAxis';
import YAxis from '../../src/YAxis';
import Tooltip from '../../src/Tooltip';
import Legend from '../../src/Legend';
import ScatterChartControls from './ScatterChartControls';
import { SCATTER_DATA } from './constants';
import { ScatterChartWrapperProps } from './types';

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
            data={SCATTER_DATA}
            setData={() => {}}
            fill={fill}
            setFill={setFill}
          />
        </div>
        <div className="lg:w-2/3">
          <ScatterChart width={width} height={height} data={SCATTER_DATA} margin={margin}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" />
            <YAxis dataKey="y" type="number" />
            <Tooltip />
            <Legend />
            <Scatter data={SCATTER_DATA} fill={fill} />
          </ScatterChart>
        </div>
      </div>
    </div>
  );
};

export default ScatterChartWrapper;

import React, { useState } from 'react';
import LineChart from '../../src/LineChart';
import Line from '../../src/Line';
import CartesianGrid from '../../src/CartesianGrid';
import XAxis from '../../src/XAxis';
import YAxis from '../../src/YAxis';
import Tooltip from '../../src/Tooltip';
import Legend from '../../src/Legend';
import LineChartControls from './LineChartControls';
import { LINE_DATA, LINE_CONFIG, LINE_DATA_WITH_NULLS } from './constants';
import { LineChartWrapperProps, DataPoint } from './types';

const LineChartWrapper: React.FC<LineChartWrapperProps> = ({
  initialLines = LINE_CONFIG,
  additionalComponents = [],
  initialWidth = 730,
  initialHeight = 250,
  initialMargin = { top: 5, right: 30, left: 20, bottom: 5 },
  withNulls = false
}) => {
  const [lines, setLines] = useState(initialLines);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [margin, setMargin] = useState(initialMargin);

  const data: DataPoint[] = withNulls ? LINE_DATA_WITH_NULLS : LINE_DATA;

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
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
        </div>
        <div className="lg:w-2/3">
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
                label={line.label}
              />
            ))}
            {additionalComponents}
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default LineChartWrapper;
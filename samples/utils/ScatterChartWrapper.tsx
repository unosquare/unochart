import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScatterChart from '../../src/ScatterChart';
import Scatter from '../../src/Scatter';
import CartesianGrid from '../../src/CartesianGrid';
import XAxis from '../../src/XAxis';
import YAxis from '../../src/YAxis';
import Tooltip from '../../src/Tooltip';
import Legend from '../../src/Legend';
import ScatterChartControls from './ScatterChartControls';
import LabelList from '../../src/LabelList'; // Importar LabelList
import { SCATTER_DATA, NAV_SECTIONS } from './constants';
import { ScatterChartWrapperProps } from './types';

export default function ScatterChartWrapper({
  initialWidth = 730,
  initialHeight = 250,
  initialMargin = { top: 5, right: 30, left: 20, bottom: 5 },
  initialLine = false,
  initialLabels = false,
}: ScatterChartWrapperProps) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [margin, setMargin] = useState(initialMargin);
  const [fill, setFill] = useState('#8884d8');
  const [line, setLine] = useState(initialLine);
  const [labels, setLabels] = useState(initialLabels);

  const scatterChartTypes = NAV_SECTIONS.find((section) => section.category === 'Scatter Charts')?.items || [];

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Scatter Chart Types</h3>
            </div>
            <ul className="p-2">
              {scatterChartTypes.map((chart) => (
                <li key={chart.path}>
                  <Link
                    to={chart.path}
                    className={`block px-3 py-2 rounded-md text-sm ${
                      location.pathname === chart.path
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } transition-colors duration-200`}
                  >
                    {chart.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <ScatterChart width={width} height={height} data={SCATTER_DATA} margin={margin}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" type="number" />
              <YAxis dataKey="y" type="number" />
              <Tooltip />
              <Legend />
              <Scatter data={SCATTER_DATA} fill={fill} line={line}>
                {labels && <LabelList dataKey="x" />}
              </Scatter>
            </ScatterChart>
          </div>
        </div>

        <div className="w-80 shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
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
              line={line}
              setLine={setLine}
              labels={labels}
              setLabels={setLabels}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

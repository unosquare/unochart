import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AreaChart from '../../src/AreaChart';
import Area from '../../src/Area';
import XAxis from '../../src/XAxis';
import YAxis from '../../src/YAxis';
import Tooltip from '../../src/Tooltip';
import AreaChartControls from './AreaChartControls';
import { NAV_SECTIONS } from './constants';

const rangeData = [
  { day: '05-01', temperature: [-1, 10] },
  { day: '05-02', temperature: [2, 15] },
  { day: '05-03', temperature: [3, 12] },
  { day: '05-04', temperature: [4, 12] },
  { day: '05-05', temperature: [12, 16] },
  { day: '05-06', temperature: [5, 16] },
  { day: '05-07', temperature: [3, 12] },
  { day: '05-08', temperature: [0, 8] },
  { day: '05-09', temperature: [-3, 5] },
];

export default function AreaChartWrapper() {
  const [width, setWidth] = useState(730);
  const [height, setHeight] = useState(250);
  const [margin, setMargin] = useState({ top: 20, right: 20, bottom: 20, left: 20 });
  const [strokeColor, setStrokeColor] = useState('#8884d8');
  const [fillColor, setFillColor] = useState('#8884d8');
  const [showXAxis, setShowXAxis] = useState(true);
  const [showYAxis, setShowYAxis] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);

  const areaChartTypes = NAV_SECTIONS.find((section) => section.category === 'Area Charts')?.items || [];

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Area Chart Types</h3>
            </div>
            <ul className="p-2">
              {areaChartTypes.map((chart) => (
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
            <AreaChart width={width} height={height} data={rangeData} margin={margin}>
              {showXAxis && <XAxis dataKey="day" />}
              {showYAxis && <YAxis />}
              <Area dataKey="temperature" stroke={strokeColor} fill={fillColor} />
              {showTooltip && <Tooltip />}
            </AreaChart>
          </div>
        </div>

        <div className="w-80 shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <AreaChartControls
              width={width}
              setWidth={setWidth}
              height={height}
              setHeight={setHeight}
              margin={margin}
              setMargin={setMargin}
              showXAxis={showXAxis}
              setShowXAxis={setShowXAxis}
              showYAxis={showYAxis}
              setShowYAxis={setShowYAxis}
              showTooltip={showTooltip}
              setShowTooltip={setShowTooltip}
              strokeColor={strokeColor}
              setStrokeColor={setStrokeColor}
              fillColor={fillColor}
              setFillColor={setFillColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

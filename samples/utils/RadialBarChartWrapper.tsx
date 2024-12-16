import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RadialBarChart from '../../src/RadialBarChart';
import RadialBar from '../../src/RadialBar';
import Legend from '../../src/Legend';
import Tooltip from '../../src/Tooltip';
import PolarGrid from '../../src/PolarGrid';
import RadialBarChartControls from './RadialBarChartControls';
import { NAV_SECTIONS } from './constants';

const MOCK_DATA = [
  { name: '18-24', uv: 31.47, fill: '#8884d8' },
  { name: '25-29', uv: 26.69, fill: '#83a6ed' },
  { name: '30-34', uv: -15.69, fill: '#8dd1e1' },
  { name: '35-39', uv: 8.22, fill: '#82ca9d' },
  { name: '40-49', uv: -8.63, fill: '#a4de6c' },
  { name: '50+', uv: -2.63, fill: '#d0ed57' },
  { name: 'unknow', uv: 6.67, fill: '#ffc658' },
];

export default function RadialBarChartWrapper() {
  const [width, setWidth] = useState(730);
  const [height, setHeight] = useState(250);
  const [innerRadius, setInnerRadius] = useState('10%');
  const [outerRadius, setOuterRadius] = useState('80%');
  const [startAngle, setStartAngle] = useState(180);
  const [endAngle, setEndAngle] = useState(0);


  const radialBarChartTypes =
    NAV_SECTIONS.find((section) => section.category === 'Radial Bar Charts')?.items || [];

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Radial Bar Chart Types</h3>
            </div>
            <ul className="p-2">
              {radialBarChartTypes.map((chart) => (
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
            <RadialBarChart
              width={width}
              height={height}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              data={MOCK_DATA}
              startAngle={startAngle}
              endAngle={endAngle}
            >
              <PolarGrid />
              <RadialBar
                minAngle={15}
                clockWise={true}
                dataKey="uv"
                label={{ fill: '#666', position: 'insideStart' }}
              />
              <Legend items={MOCK_DATA.map((item) => ({ color: item.fill, label: item.name }))} />
              <Tooltip />
            </RadialBarChart>
          </div>
        </div>

        <div className="w-80 shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
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
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PieChart from '../../src/PieChart';
import Pie from '../../src/Pie';
import PolarGrid from '../../src/PolarGrid';
import Tooltip from '../../src/Tooltip';
import Legend from '../../src/Legend';
import PieChartControls from './PieChartControls';
import { PieData, PieChartWrapperProps } from './types';
import { NAV_SECTIONS } from './constants';

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

export default function PieChartWrapper({
  initialPies = [{ id: 1, innerRadius: 0, outerRadius: 80, cx: '50%', cy: '50%', showLabels: true }],
  initialShowPolarGrid = true,
  initialWidth = 730,
  initialHeight = 250,
  initialMargin = { top: 5, right: 30, left: 20, bottom: 5 }
}: PieChartWrapperProps) {
  const [pies, setPies] = useState<PieData[]>(initialPies);
  const [showPolarGrid, setShowPolarGrid] = useState(initialShowPolarGrid);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [margin, setMargin] = useState(initialMargin);

  const pieChartTypes = NAV_SECTIONS.find(section => section.category === 'Pie Charts')?.items || [];

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Pie Chart Types</h3>
            </div>
            <ul className="p-2">
              {pieChartTypes.map((chart) => (
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
            <PieChart width={width} height={height} margin={margin}>
              {showPolarGrid && <PolarGrid />}
              {pies.map((pie, index) => (
                <Pie
                  key={pie.id}
                  data={data01}
                  dataKey="value"
                  nameKey="name"
                  cx={pie.cx}
                  cy={pie.cy}
                  innerRadius={pie.innerRadius}
                  outerRadius={pie.outerRadius}
                  startAngle={pie.startAngle}
                  endAngle={pie.endAngle}
                  paddingAngle={pie.paddingAngle}
                  fill={pieColors[index % pieColors.length]}
                  label={pie.showLabels ? (pie.label || 'percent') : undefined}
                  activeShape={pie.activeShape}
                />
              ))}
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        <div className="w-80 shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <PieChartControls
              pies={pies}
              setPies={setPies}
              showPolarGrid={showPolarGrid}
              setShowPolarGrid={setShowPolarGrid}
              width={width}
              setWidth={setWidth}
              height={height}
              setHeight={setHeight}
              margin={margin}
              setMargin={setMargin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

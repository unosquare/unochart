import React, { useState } from 'react';

import ReactDOM from 'react-dom/client';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from '../src';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const App = () => {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [barCategoryGap, setBarCategoryGap] = useState('10%');
  const [barGap, setBarGap] = useState(4);
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');
  const [margin, setMargin] = useState({ top: 5, right: 5, bottom: 5, left: 5 });
  const [showXAxis, setShowXAxis] = useState(true);
  const [showYAxis, setShowYAxis] = useState(true);
  const [showCartesianGrid, setShowCartesianGrid] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showLegend, setShowLegend] = useState(true);

  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>, side: string) => {
    const value = parseInt(e.target.value, 10);
    setMargin(prevMargin => ({ ...prevMargin, [side]: value }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">BarChart Example</h1>
      <form className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label>
            Width:
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10))}
              className="ml-2 border rounded px-2 py-1"
            />
          </label>
        </div>
        <div>
          <label>
            Height:
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value, 10))}
              className="ml-2 border rounded px-2 py-1"
            />
          </label>
        </div>
        <div>
          <label>
            Bar Category Gap:
            <input
              type="text"
              value={barCategoryGap}
              onChange={(e) => setBarCategoryGap(e.target.value)}
              className="ml-2 border rounded px-2 py-1"
            />
          </label>
        </div>
        <div>
          <label>
            Bar Gap:
            <input
              type="number"
              value={barGap}
              onChange={(e) => setBarGap(parseInt(e.target.value, 10))}
              className="ml-2 border rounded px-2 py-1"
            />
          </label>
        </div>
        <div>
          <label>
            Layout:
            <select
              value={layout}
              onChange={(e) => setLayout(e.target.value as 'horizontal' | 'vertical')}
              className="ml-2 border rounded px-2 py-1"
            >
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Margin Top:
            <input
              type="number"
              value={margin.top}
              onChange={(e) => handleMarginChange(e, 'top')}
              className="ml-2 border rounded px-2 py-1"
            />
          </label>
        </div>
        <div>
          <label>
            Margin Right:
            <input
              type="number"
              value={margin.right}
              onChange={(e) => handleMarginChange(e, 'right')}
              className="ml-2 border rounded px-2 py-1"
            />
          </label>
        </div>
        <div>
          <label>
            Margin Bottom:
            <input
              type="number"
              value={margin.bottom}
              onChange={(e) => handleMarginChange(e, 'bottom')}
              className="ml-2 border rounded px-2 py-1"
            />
          </label>
        </div>
        <div>
          <label>
            Margin Left:
            <input
              type="number"
              value={margin.left}
              onChange={(e) => handleMarginChange(e, 'left')}
              className="ml-2 border rounded px-2 py-1"
            />
          </label>
        </div>
        <div>
          <label>
            Show X Axis:
            <input
              type="checkbox"
              checked={showXAxis}
              onChange={(e) => setShowXAxis(e.target.checked)}
              className="ml-2"
            />
          </label>
        </div>
        <div>
          <label>
            Show Y Axis:
            <input
              type="checkbox"
              checked={showYAxis}
              onChange={(e) => setShowYAxis(e.target.checked)}
              className="ml-2"
            />
          </label>
        </div>
        <div>
          <label>
            Show Cartesian Grid:
            <input
              type="checkbox"
              checked={showCartesianGrid}
              onChange={(e) => setShowCartesianGrid(e.target.checked)}
              className="ml-2"
            />
          </label>
        </div>
        <div>
          <label>
            Show Tooltip:
            <input
              type="checkbox"
              checked={showTooltip}
              onChange={(e) => setShowTooltip(e.target.checked)}
              className="ml-2"
            />
          </label>
        </div>
        <div>
          <label>
            Show Legend:
            <input
              type="checkbox"
              checked={showLegend}
              onChange={(e) => setShowLegend(e.target.checked)}
              className="ml-2"
            />
          </label>
        </div>
      </form>

      <BarChart
        data={data}
        width={width}
        height={height}
        margin={margin}
        barCategoryGap={barCategoryGap}
        barGap={barGap}
        layout={layout}
      >
        {showCartesianGrid && <CartesianGrid strokeDasharray="3 3" />}
        {showXAxis && <XAxis />}
        {showYAxis && <YAxis />}
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        <Bar dataKey="uv" fill="#8884d8" />
        <Bar dataKey="pv" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}

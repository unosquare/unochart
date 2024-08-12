import React, { useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from '../../src';
import BarChartControls from '../utils/BarChartControls';

const StackedBarChart = () => {
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

  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div>
      <BarChartControls
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        barCategoryGap={barCategoryGap}
        setBarCategoryGap={setBarCategoryGap}
        barGap={barGap}
        setBarGap={setBarGap}
        layout={layout}
        setLayout={setLayout}
        margin={margin}
        setMargin={setMargin}
        showXAxis={showXAxis}
        setShowXAxis={setShowXAxis}
        showYAxis={showYAxis}
        setShowYAxis={setShowYAxis}
        showCartesianGrid={showCartesianGrid}
        setShowCartesianGrid={setShowCartesianGrid}
        showTooltip={showTooltip}
        setShowTooltip={setShowTooltip}
        showLegend={showLegend}
        setShowLegend={setShowLegend}
      />
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
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
        <Bar dataKey="uv" stackId="b" fill="#ffc658" />
      </BarChart>
    </div>
  );
};

export default StackedBarChart;

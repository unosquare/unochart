import React from 'react';
import LineChartWrapper from '../utils/LineChartWrapper';

const DashedLineChart = () => {
  const initialLines = [
    { id: 1, stroke: '#8884d8', dataKey: 'pv', strokeDasharray: '5 5', type: 'linear' },
    { id: 2, stroke: '#82ca9d', dataKey: 'uv', strokeDasharray: '3 3', type: 'monotoneX' },
  ];

  return <LineChartWrapper initialLines={initialLines} />;
};

export default DashedLineChart;
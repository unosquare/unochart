import React from 'react';
import LineChartWrapper from '../utils/LineChartWrapper';

const LineChartExample = () => {
  const initialLines = [
    { id: 1, stroke: '#8884d8', dataKey: 'pv', type: 'monotone' },
    { id: 2, stroke: '#82ca9d', dataKey: 'uv', type: 'linear' },
  ];

  return <LineChartWrapper initialLines={initialLines} />;
};

export default LineChartExample;
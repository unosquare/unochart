import React from 'react';
import LineChartWrapper from '../utils/LineChartWrapper';

const TinyLineChart = () => {
  const initialLines = [
    { id: 1, stroke: '#8884d8', dataKey: 'pv', type: 'monotone' },
  ];

  return (
    <LineChartWrapper
      initialLines={initialLines}
      initialWidth={300}
      initialHeight={200}
      initialMargin={{
        top: 5,
        right: 5,
        left: 5,
        bottom: 5,
      }}
    />
  );
};

export default TinyLineChart;
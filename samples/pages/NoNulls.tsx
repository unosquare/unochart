import React from 'react';
import LineChartWrapper from '../utils/LineChartWrapper';

const NoNullsChart = () => {
  const initialLines = [
    { id: 1, stroke: '#8884d8', dataKey: 'uv', type: 'monotone', connectNulls: false },
  ];


  return (
    <div>
      <LineChartWrapper
        initialLines={initialLines}
        initialWidth={730}
        initialHeight={250}
        initialMargin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        withNulls={true}
      />
    </div>
  );
};

export default NoNullsChart;

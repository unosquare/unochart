import React from 'react';
import PieChartWrapper from '../utils/PieChartWrapper';

const PieChartExample: React.FC = () => {
  const initialPies = [
    { id: 1, innerRadius: 0, outerRadius: 50, cx: '50%', cy: '50%' },
    { id: 2, innerRadius: 60, outerRadius: 80, cx: '50%', cy: '50%', showLabels: true },
  ];

  return <PieChartWrapper initialPies={initialPies} />;
};

export default PieChartExample;

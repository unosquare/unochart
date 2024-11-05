import React from 'react';
import PieChartWrapper from '../utils/PieChartWrapper';

const PieChartWithPaddingAngle: React.FC = () => {
  const initialPies = [
    {
      id: 1,
      innerRadius: 0,
      outerRadius: 80,
      cx: '50%',
      cy: '50%',
      showLabels: true,
      startAngle: 0,
      endAngle: 360,
      paddingAngle: 5,
    },
  ];

  return <PieChartWrapper initialPies={initialPies} />;
};

export default PieChartWithPaddingAngle;

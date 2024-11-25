import type React from 'react';
import PieChartWrapper from '../utils/PieChartWrapper';

const PieChartWithCustomizedLabel: React.FC = () => {
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
            label: ['A', 'B', 'C', 'D', 'E', 'F'],
        },
    ];

    return <PieChartWrapper initialPies={initialPies} />;
};

export default PieChartWithCustomizedLabel;

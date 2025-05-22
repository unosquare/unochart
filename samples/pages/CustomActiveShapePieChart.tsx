import type React from 'react';
import PieChartWrapper from '../utils/PieChartWrapper';
import type { PieClickEvent } from '../utils/types';

const CustomActiveShapePieChart: React.FC = () => {
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
            activeShape: true,
        },
    ];

    const handleClick = (event: PieClickEvent) => {
        const { label, value } = event;
        console.log(`Clicked on ${label} with value ${value}`);
    };

    return <PieChartWrapper initialPies={initialPies} onClick={handleClick} />;
};

export default CustomActiveShapePieChart;

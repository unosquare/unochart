import type React from 'react';
import PieChartWrapper from '../utils/PieChartWrapper';
import type { PieClickEvent } from '../../src/Pie';

const PieChartExample: React.FC = () => {
    const initialPies = [{ id: 1, innerRadius: 0, outerRadius: 85, cx: '50%', cy: '50%', showLabels: true }];

    const handleClick = (event: PieClickEvent) => {
        const { label, value } = event;
        console.log(`Clicked on ${label} with value ${value}`);
    };

    return <PieChartWrapper initialPies={initialPies} onClick={handleClick} />;
};

export default PieChartExample;

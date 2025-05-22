import React from 'react';
import LineChartWrapper from '../utils/LineChartWrapper';
import type { LineConfig, LinePointClickEvent } from '../utils/types';

const LineChartExample = () => {
    const initialLines = [
        { id: 1, stroke: '#8884d8', dataKey: 'pv', type: 'monotone' },
        { id: 2, stroke: '#82ca9d', dataKey: 'uv', type: 'linear' },
    ];
    
    const handleClick = (event: LinePointClickEvent<LineConfig>) => {
        console.log(`Click on ${event.dataKey} with index: ${event.index} and value: ${event.value}`);
    };

    return <LineChartWrapper initialLines={initialLines} onClick={handleClick} />;
};

export default LineChartExample;

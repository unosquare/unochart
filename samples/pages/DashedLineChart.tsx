import React from 'react';
import LineChartWrapper from '../utils/LineChartWrapper';
import type { LinePointClickEvent, LineConfig } from '../utils/types';

const DashedLineChart = () => {
    const initialLines = [
        { id: 1, stroke: '#8884d8', dataKey: 'pv', strokeDasharray: '5 5', type: 'linear' },
        { id: 2, stroke: '#82ca9d', dataKey: 'uv', strokeDasharray: '3 3', type: 'monotoneX' },
    ];
    
    const handleClick = (event: LinePointClickEvent<LineConfig>) => {
        console.log(`Click on ${event.dataKey} with index: ${event.index} and value: ${event.value}`);
    };
    
    return <LineChartWrapper initialLines={initialLines} onClick={handleClick} />;
};

export default DashedLineChart;

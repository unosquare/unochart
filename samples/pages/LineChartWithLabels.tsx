// LineChartWithLabels.tsx
import React from 'react';
import LineChartWrapper from '../utils/LineChartWrapper';
import type { LinePointClickEvent, LineConfig } from '../utils/types';

const LineChartWithLabels = () => {
    const initialLines = [
        { id: 1, stroke: '#8884d8', dataKey: 'pv', type: 'monotone', label: true },
        { id: 2, stroke: '#82ca9d', dataKey: 'uv', type: 'monotone', label: true },
    ];
    
    const handleClick = (event: LinePointClickEvent<LineConfig>) => {
        console.log(`Click on ${event.dataKey} with index: ${event.index} and value: ${event.value}`);
    };

    return <LineChartWrapper initialLines={initialLines} onClick={handleClick} />;
};

export default LineChartWithLabels;

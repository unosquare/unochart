// LineChartWithLabels.tsx
import React from 'react';
import LineChartWrapper from '../utils/LineChartWrapper';

const LineChartWithLabels = () => {
    const initialLines = [
        { id: 1, stroke: '#8884d8', dataKey: 'pv', type: 'monotone', label: true },
        { id: 2, stroke: '#82ca9d', dataKey: 'uv', type: 'monotone', label: true },
    ];

    return <LineChartWrapper initialLines={initialLines} />;
};

export default LineChartWithLabels;

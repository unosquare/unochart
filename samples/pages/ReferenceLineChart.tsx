import React from 'react';
import ReferenceLine from '../../src/ReferenceLine';
import LineChartWrapper from '../utils/LineChartWrapper';

const ReferenceLineChart = () => {
    const initialLines = [
        { id: 1, stroke: '#8884d8', dataKey: 'pv', type: 'monotone' },
        { id: 2, stroke: '#82ca9d', dataKey: 'uv', type: 'monotone' },
    ];

    const additionalComponents = [
        <ReferenceLine key='refLine1' x='Page C' stroke='red' label='Max PV PAGE' />,
        <ReferenceLine key='refLine2' y={5800} label='Max' stroke='red' />,
    ];

    return (
        <LineChartWrapper
            initialLines={initialLines}
            additionalComponents={additionalComponents}
            initialWidth={730}
            initialHeight={250}
            initialMargin={{
                top: 20,
                right: 50,
                left: 20,
                bottom: 5,
            }}
        />
    );
};

export default ReferenceLineChart;

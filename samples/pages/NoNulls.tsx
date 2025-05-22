import React from 'react';
import LineChartWrapper from '../utils/LineChartWrapper';
import type { LinePointClickEvent, LineConfig } from '../utils/types';

const NoNullsChart = () => {
    const initialLines = [{ id: 1, stroke: '#8884d8', dataKey: 'uv', type: 'monotone', connectNulls: false }];

    const handleClick = (event: LinePointClickEvent<LineConfig>) => {
        console.log(`Click on ${event.dataKey} with index: ${event.index} and value: ${event.value}`);
    };

    return (
        <div>
            <LineChartWrapper
                initialLines={initialLines}
                initialWidth={730}
                initialHeight={250}
                initialMargin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                withNulls={true}
                onClick={handleClick}
            />
        </div>
    );
};

export default NoNullsChart;

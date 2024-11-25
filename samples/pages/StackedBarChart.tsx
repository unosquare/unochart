import type React from 'react';
import { Bar } from '../../src';
import BarChartWrapper from '../utils/BarChartWrapper';

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const StackedBarChart: React.FC = () => {
    return (
        <div>
            <BarChartWrapper data={data}>
                <Bar dataKey='pv' stackId='a' fill='#8884d8' />
                <Bar dataKey='amt' stackId='a' fill='#82ca9d' />
                <Bar dataKey='uv' stackId='b' fill='#ffc658' />
            </BarChartWrapper>
        </div>
    );
};

export default StackedBarChart;

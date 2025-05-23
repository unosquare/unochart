import type React from 'react';
import { Bar } from '../../src';
import BarChartWrapper from '../utils/BarChartWrapper';
import type { BarPointClickEvent } from '../../src/Bar';

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const NormalBarChart: React.FC = () => {

    const handleBarClick = (event: BarPointClickEvent<{ name: string; [key: string]: any }>) => {
        const { dataKey, value, name, entry } = event;
        console.log(`Clicked on ${name}: ${dataKey} = ${value}`, entry);
    };  
    
    return (
        <div>
            <BarChartWrapper data={data}>
                <Bar dataKey='pv' fill='#8884d8' onClick={handleBarClick}/>
                <Bar dataKey='amt' fill='#82ca9d' onClick={handleBarClick}/>
                <Bar dataKey='uv' fill='#ffc658' onClick={handleBarClick}/>
            </BarChartWrapper>
        </div>
    );
};

export default NormalBarChart;

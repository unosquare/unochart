import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartesianGrid from '../../src/CartesianGrid';
import Legend from '../../src/Legend';
import Line from '../../src/Line';
import LineChart from '../../src/LineChart';
import Tooltip from '../../src/Tooltip';
import XAxis from '../../src/XAxis';
import YAxis from '../../src/YAxis';
import LineChartControls from './LineChartControls';
import { LINE_CONFIG, LINE_DATA, LINE_DATA_WITH_NULLS, NAV_SECTIONS } from './constants';
import type { DataPoint, LineChartWrapperProps, LinePointClickEvent } from './types';

const LineChartWrapper: React.FC<LineChartWrapperProps> = ({
    initialLines = LINE_CONFIG,
    additionalComponents = [],
    initialWidth = 730,
    initialHeight = 250,
    initialMargin = { top: 5, right: 30, left: 20, bottom: 5 },
    withNulls = false,
    onClick,
}) => {
    const [lines, setLines] = useState(initialLines);
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [margin, setMargin] = useState(initialMargin);

    const data: DataPoint[] = withNulls ? LINE_DATA_WITH_NULLS : LINE_DATA;
    const lineChartTypes = NAV_SECTIONS.find((section) => section.category === 'Line Charts')?.items || [];

    return (
        <div className='p-6'>
            <div className='flex gap-6'>
                <div className='w-64 shrink-0'>
                    <div className='bg-white rounded-lg shadow-xs border border-gray-100'>
                        <div className='p-4 border-b border-gray-100'>
                            <h3 className='font-semibold text-gray-900'>Line Chart Types</h3>
                        </div>
                        <ul className='p-2'>
                            {lineChartTypes.map((chart) => (
                                <li key={chart.path}>
                                    <Link
                                        to={chart.path}
                                        className={`block px-3 py-2 rounded-md text-sm ${
                                            location.pathname === chart.path
                                                ? 'bg-blue-50 text-blue-600 font-medium'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        } transition-colors duration-200`}
                                    >
                                        {chart.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='flex-1 min-w-0'>
                    <div className='bg-white rounded-lg shadow-xs border border-gray-100 p-4'>
                        <LineChart width={width} height={height} data={data} margin={margin}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='name' />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {lines.map((line) => (
                                <Line
                                    key={line.id}
                                    type={line.type}
                                    dataKey={line.dataKey}
                                    stroke={line.stroke}
                                    strokeDasharray={line.strokeDasharray}
                                    connectNulls={line.connectNulls}
                                    label={line.label}
                                    onClick={onClick}
                                />
                            ))}
                            {additionalComponents}
                        </LineChart>
                    </div>
                </div>

                <div className='w-80 shrink-0'>
                    <div className='bg-white rounded-lg shadow-xs border border-gray-100'>
                        <LineChartControls
                            lines={lines}
                            setLines={setLines}
                            width={width}
                            setWidth={setWidth}
                            height={height}
                            setHeight={setHeight}
                            margin={margin}
                            setMargin={setMargin}
                            data={data}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LineChartWrapper;

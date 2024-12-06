import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RadarChart from '../../src/RadarChart';
import PolarGrid from '../../src/PolarGrid';
import PolarAngleAxis from '../../src/PolarAngleAxis';
import PolarRadiusAxis from '../../src/PolarRadiusAxis';
import Radar from '../../src/Radar';
import Legend from '../../src/Legend';
import Tooltip from '../../src/Tooltip';
import RadarChartControls from './RadarChartControls';
import { NAV_SECTIONS, RADAR_DATA } from './constants';
import type { RadarChartWrapperProps } from './types';

export default function RadarChartWrapper({
    data = RADAR_DATA,
    initialWidth = 730,
    initialHeight = 250,
    initialOuterRadius = 90,
}: RadarChartWrapperProps) {
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [outerRadius, setOuterRadius] = useState(initialOuterRadius);

    const radarChartTypes = NAV_SECTIONS.find((section) => section.category === 'Radar Charts')?.items || [];

    return (
        <div className='p-6'>
            <div className='flex gap-6'>
                <div className='w-64 shrink-0'>
                    <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
                        <div className='p-4 border-b border-gray-100'>
                            <h3 className='font-semibold text-gray-900'>Radar Chart Types</h3>
                        </div>
                        <ul className='p-2'>
                            {radarChartTypes.map((chart) => (
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
                    <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-4'>
                        <RadarChart data={data} width={width} height={height} outerRadius={outerRadius}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey='subject' />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} radius={outerRadius} />
                            <Radar name='Mike' dataKey='A' stroke='#8884d8' fill='#8884d8' fillOpacity={0.6} />
                            <Radar name='Lily' dataKey='B' stroke='#82ca9d' fill='#82ca9d' fillOpacity={0.6} />
                            <Legend />
                            <Tooltip />
                        </RadarChart>
                    </div>
                </div>

                <div className='w-80 shrink-0'>
                    <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
                        <RadarChartControls
                            width={width}
                            setWidth={setWidth}
                            height={height}
                            setHeight={setHeight}
                            outerRadius={outerRadius}
                            setOuterRadius={setOuterRadius}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import ChartControls from './ChartControls';

interface RadarChartControlsProps {
    width: number;
    setWidth: (value: number) => void;
    height: number;
    setHeight: (value: number) => void;
    outerRadius: number;
    setOuterRadius: (value: number) => void;
}

const RadarChartControls: React.FC<RadarChartControlsProps> = ({ outerRadius, setOuterRadius, ...props }) => {
    return (
        <div>
            <ChartControls {...props} />
            <div className='p-4 bg-gray-50 rounded-lg'>
                <label htmlFor='outerRadius' className='block text-sm font-medium text-gray-700 mb-1'>
                    Outer Radius
                </label>
                <input
                    id='outerRadius'
                    type='number'
                    value={outerRadius || 0}
                    onChange={(e) => setOuterRadius(Number(e.target.value) || 0)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                />
            </div>
        </div>
    );
};

export default RadarChartControls;

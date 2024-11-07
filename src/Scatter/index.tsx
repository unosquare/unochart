import React from 'react';

interface ScatterProps {
    data: Array<{ x: number; y: number; z?: number }>;
    xScale: (value: number) => number;
    yScale: (value: number) => number;
    fill?: string;
    hoveredPoint: number | null;
}

const Scatter: React.FC<ScatterProps> = ({ data, xScale, yScale, fill = 'blue', hoveredPoint }) => (
    <>
        {data.map((point, index) => (
            <circle
                key={index}
                cx={xScale(point.x)}
                cy={yScale(point.y)}
                r={hoveredPoint === index ? 7 : 5}
                fill={fill}
                opacity={hoveredPoint === null || hoveredPoint === index ? 1 : 0.5}
                className='transition-all duration-300 ease-in-out'
            />
        ))}
    </>
);

export default Scatter;

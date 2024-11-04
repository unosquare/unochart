import React from 'react';

interface ScatterProps {
    data: Array<{ x: number; y: number; z?: number }>;
    xScale: (value: number) => number;
    yScale: (value: number) => number;
    fill: string;
}

const Scatter: React.FC<ScatterProps> = ({ data, xScale, yScale, fill = 'blue' }) => {
    return (
        <>
            {data.map((point, index) => (
                <circle
                    key={index}
                    cx={xScale(point.x)}
                    cy={yScale(point.y)}
                    r={5}
                    fill={fill}
                />
            ))}
        </>
    );
};

export default Scatter;

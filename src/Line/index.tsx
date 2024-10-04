import React from 'react';
import * as d3Shape from 'd3-shape';

interface LineProps {
    data: Array<{ [key: string]: any }>;
    dataKey: string;
    stroke: string;
    strokeDasharray?: string;
    type?: 'basis' | 'basisClosed' | 'basisOpen' | 'bumpX' | 'bumpY' | 'bump' | 'linear' | 'linearClosed' | 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter';
    chartWidth: number;
    chartHeight: number;
    onMouseOver?: (event: React.MouseEvent, entry: { name: string; [key: string]: any }) => void;
    onMouseOut?: () => void;
}

const Line: React.FC<LineProps> = ({
    data = [],
    dataKey,
    stroke,
    strokeDasharray = '0',
    type = 'linear',
    chartWidth,
    chartHeight,
    onMouseOver = () => {},
    onMouseOut = () => {},
}) => {
    if (!data.length) return null;

    const maxValue = Math.max(...data.map((d) => d[dataKey]));

    const xScale = (index: number) => (index + 0.5) * (chartWidth / data.length);
    const yScale = (value: number) => chartHeight - (value / maxValue) * chartHeight;

    const lineGenerator = d3Shape.line()
        .x((d, index) => xScale(index))
        .y((d) => yScale((d as any)[dataKey]))
        .curve(d3Shape[`curve${type.charAt(0).toUpperCase() + type.slice(1)}`] || d3Shape.curveLinear);

    const path = lineGenerator(data as [number, number][]);

    return (
        <>
            <path
                d={path || ''}
                fill='none'
                stroke={stroke}
                strokeWidth={2}
                strokeDasharray={strokeDasharray}
                onMouseOver={(event) => onMouseOver(event, { name: dataKey })}
                onMouseOut={onMouseOut}
                style={{ transition: 'all 0.3s' }}
            />
            {data.map((entry, index) => {
                const x = xScale(index);
                const y = yScale(entry[dataKey]);
                return (
                    <circle
                        key={`point-${index}`}
                        cx={x}
                        cy={y}
                        r={4}
                        fill={stroke}
                        onMouseOver={(event) => onMouseOver(event, entry)}
                        onMouseOut={onMouseOut}
                    />
                );
            })}
        </>
    );
};

export default Line;

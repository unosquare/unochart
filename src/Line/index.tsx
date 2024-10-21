import React from 'react';
import * as d3Shape from 'd3-shape';

interface LineProps {
    data: Array<{ [key: string]: any }>;
    dataKey: string;
    stroke: string;
    strokeDasharray?: string;
    type?:
        | 'basis'
        | 'basisClosed'
        | 'basisOpen'
        | 'bumpX'
        | 'bumpY'
        | 'bump'
        | 'linear'
        | 'linearClosed'
        | 'natural'
        | 'monotoneX'
        | 'monotoneY'
        | 'monotone'
        | 'step'
        | 'stepBefore'
        | 'stepAfter';
    xScale: (value: number) => number;
    yScale: (value: number) => number;
    connectNulls?: boolean;
    onMouseOver?: (event: React.MouseEvent, entry: { name: string; [key: string]: any }) => void;
    onMouseOut?: () => void;
    label?: boolean;
}

const Line: React.FC<LineProps> = ({
    data = [],
    dataKey,
    stroke,
    strokeDasharray = '0',
    type = 'linear',
    xScale,
    yScale,
    connectNulls = false,
    onMouseOver = () => {},
    onMouseOut = () => {},
    label = false,
}) => {
    if (!data.length) return null;

    const processedData = data.map((d, index) => ({ ...d, index }));

    const lineGenerator = d3Shape
        .line()
        .defined((d: any) => d[dataKey] !== null && d[dataKey] !== undefined)
        .x((d: any) => xScale(d.index))
        .y((d: any) => {
            const value = d[dataKey];
            return value !== null && value !== undefined ? yScale(value) : yScale(0);
        })
        .curve((d3Shape as any)[`curve${type.charAt(0).toUpperCase() + type.slice(1)}`] || d3Shape.curveLinear);

    const renderPath = () => {
        if (connectNulls) {
            const filteredData = processedData.filter(lineGenerator.defined());
            return (
                <path
                    d={lineGenerator(filteredData) || ''}
                    fill='none'
                    stroke={stroke}
                    strokeWidth={2}
                    strokeDasharray={strokeDasharray}
                    style={{ transition: 'all 0.3s' }}
                />
            );
        } else {
            const segments: Array<{ [key: string]: any }> = [];
            let segment: Array<{ [key: string]: any }> = [];

            processedData.forEach((d) => {
                if (lineGenerator.defined()(d)) {
                    segment.push(d);
                } else if (segment.length) {
                    segments.push(segment);
                    segment = [];
                }
            });

            if (segment.length) {
                segments.push(segment);
            }

            return segments.map((segment, i) => (
                <path
                    key={`segment-${i}`}
                    d={lineGenerator(segment) || ''}
                    fill='none'
                    stroke={stroke}
                    strokeWidth={2}
                    strokeDasharray={strokeDasharray}
                    style={{ transition: 'all 0.3s' }}
                />
            ));
        }
    };

    return (
        <>
            {renderPath()}
            {processedData.map((entry, index) => {
                const value = entry[dataKey];
                if (value === null || value === undefined) return null;
                const x = xScale(entry.index);
                const y = yScale(value);
                if (y === null) return null;
                return (
                    <g key={`point-${index}`}>
                        <circle
                            cx={x}
                            cy={y}
                            r={4}
                            fill={stroke}
                            onMouseOver={(event) => onMouseOver(event, entry)}
                            onMouseOut={onMouseOut}
                        />
                        {label && (
                            <text x={x} y={y - 10} textAnchor='middle' fontSize={12} fill={stroke}>
                                {value}
                            </text>
                        )}
                    </g>
                );
            })}
        </>
    );
};

export default Line;

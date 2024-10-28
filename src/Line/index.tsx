import React from 'react';
import { createLineGenerator, renderPathSegments } from './utils';

interface LineProps<T> {
    data: Array<T>;
    dataKey: keyof T;
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
    onMouseOver?: (event: React.MouseEvent, entry: T) => void;
    onMouseOut?: () => void;
    label?: boolean;
}

const Line = <T,>({
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
}: LineProps<T>) => {
    if (!data.length) return null;

    const processedData = data.map((d, index) => ({ ...d, index }));
    const lineGenerator = createLineGenerator(type, xScale, yScale, dataKey as string);

    return (
        <>
            {renderPathSegments(lineGenerator, processedData, stroke, strokeDasharray, connectNulls)}
            {processedData.map((entry, index) => {
                const value = entry[dataKey];
                if (value === null || value === undefined) return null;
                const x = xScale(index);
                const y = yScale(Number(value));
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
                                {String(value)}
                            </text>
                        )}
                    </g>
                );
            })}
        </>
    );
};

export default Line;

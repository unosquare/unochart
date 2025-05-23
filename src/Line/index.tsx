import type React from 'react';
import { useMemo } from 'react';
import { createLineGenerator, renderPathSegments } from './utils';

export interface LinePointClickEvent<T> {
    event: React.MouseEvent<SVGGElement>;
    dataKey: keyof T;
    value: number;
    index: number;
    entry: T;
}

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
    onClick?: (event: LinePointClickEvent<T>) => void;
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
    onClick = () => {},
    label = false,
}: LineProps<T>) => {
    const processedData = useMemo(() => data.map((d, index) => ({ ...d, index })), [data]);
    const lineGenerator = useMemo(
        () => createLineGenerator(type, xScale, yScale, dataKey as string),
        [type, xScale, yScale, dataKey],
    );

    if (!data.length) return null;

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
                    <g key={`point-${entry[dataKey]}`} className='transition-all duration-300 ease-in-out'>
                        <circle
                            cx={x}
                            cy={y}
                            r={4}
                            fill={stroke}
                            onMouseOver={(event) => onMouseOver(event, entry)}
                            onMouseOut={onMouseOut}
                            onClick={(event) =>
                                onClick({
                                    event: event,
                                    dataKey: dataKey,
                                    value: Number(value),
                                    index: index,
                                    entry: entry,
                                })
                            }
                            className='hover:r-5 focus:r-5 transition-all duration-300 ease-in-out'
                        />
                        {label && (
                            <text
                                x={x}
                                y={y - 10}
                                textAnchor='middle'
                                fontSize={12}
                                fill={stroke}
                                className='opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'
                            >
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

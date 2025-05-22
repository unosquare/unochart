import type React from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { BarPointClickEvent } from '../../samples/utils/types';

interface BarProps {
    data?: Array<{ name: string; [key: string]: any }>;
    dataKey: string;
    fill: string;
    width?: number;
    height?: number;
    maxValue?: number;
    minValue?: number;
    layout?: 'horizontal' | 'vertical';
    barIndex?: number;
    totalBars?: number;
    barGap?: number;
    stackId?: string;
    accumulatedHeight?: number;
    stackIdPos?: number;
    onMouseOver?: (event: React.MouseEvent, entry: { name: string; [key: string]: any }) => void;
    onMouseOut?: () => void;
    onClick?: (event: BarPointClickEvent<{ name: string; [key: string]: any }>) => void;
}

const Bar: React.FC<BarProps> = ({
    data = [],
    dataKey,
    fill,
    width = 0,
    height = 0,
    maxValue = 0,
    minValue = 0,
    layout = 'horizontal',
    barIndex = 0,
    totalBars = 1,
    barGap = 0,
    stackId,
    accumulatedHeight = 0,
    stackIdPos = 0,
    onMouseOver = () => {},
    onMouseOut = () => {},
    onClick = () => {},
}) => (
    <g>
        {data.map((entry) => {
            const value = entry[dataKey];

            if (Array.isArray(value)) {
                const [minValueRange, maxValueRange] = value;

                if (layout === 'horizontal') {
                    const barHeight = ((maxValueRange - minValueRange) / (maxValue - minValue)) * height;
                    return (
                        <rect
                            key={uuidv4()}
                            x={stackIdPos * (width + barGap)}
                            y={
                                height -
                                ((maxValueRange - minValue) / (maxValue - minValue)) * height -
                                accumulatedHeight
                            }
                            width={width}
                            height={barHeight}
                            fill={fill}
                            className='transition-all duration-300 ease-in-out hover:opacity-80 hover:scale-105 hover:shadow-lg'
                            style={{ transformOrigin: 'bottom', pointerEvents: 'all', cursor: 'pointer' }}
                            onMouseOver={(event) => {
                                const { name, ...rest } = entry;
                                onMouseOver(event, { name, ...rest });
                            }}
                            onMouseOut={onMouseOut}
                            onClick={(e) => {
                                console.log("Bar Component: rect onClick triggered!", { e, dataKey, value: entry[dataKey], entry });
                                onClick({ event: e as React.MouseEvent<SVGRectElement>, dataKey, value: Number(value), name: entry.name, entry });
                            }}
                        />
                    );
                } else {
                    const barWidth = ((maxValueRange - minValueRange) / (maxValue - minValue)) * width;
                    return (
                        <rect
                            key={uuidv4()}
                            x={((minValueRange - minValue) / (maxValue - minValue)) * width + accumulatedHeight}
                            y={stackIdPos * (height + barGap)}
                            width={barWidth}
                            height={height}
                            fill={fill}
                            className='transition-all duration-300 ease-in-out hover:opacity-80 hover:scale-105 hover:shadow-lg'
                            style={{ transformOrigin: 'left', pointerEvents: 'all', cursor: 'pointer' }}
                            onMouseOver={(event) => {
                                const { name, ...rest } = entry;
                                onMouseOver(event, { name, ...rest });
                            }}
                            onMouseOut={onMouseOut}
                            onClick={(e) => {
                                console.log("Bar Component: rect onClick triggered!", { e, dataKey, value: entry[dataKey], entry });
                                onClick({ event: e as React.MouseEvent<SVGRectElement>, dataKey, value: Number(value), name: entry.name, entry });
                            }}
                        />
                    );
                }
            }

            const barHeight = (value / maxValue) * height;
            const barWidth = (value / maxValue) * width;

            return layout === 'horizontal' ? (
                <rect
                    key={uuidv4()}
                    x={stackIdPos * (width + barGap)}
                    y={height - barHeight - accumulatedHeight}
                    width={width}
                    height={barHeight}
                    fill={fill}
                    className='transition-all duration-300 ease-in-out hover:opacity-80 hover:scale-105 hover:shadow-lg'
                    style={{ transformOrigin: 'bottom', pointerEvents: 'all', cursor: 'pointer' }}
                    onMouseOver={(event) => {
                        const { name, ...rest } = entry;
                        onMouseOver(event, { name, ...rest });
                    }}
                    onMouseOut={onMouseOut}
                    onClick={(e) => {
                        console.log("Bar Component: rect onClick triggered!", { e, dataKey, value: entry[dataKey], entry });
                        onClick({ event: e as React.MouseEvent<SVGRectElement>, dataKey, value: Number(value), name: entry.name, entry });
                    }}
                />
            ) : (
                <rect
                    key={uuidv4()}
                    x={accumulatedHeight}
                    y={stackIdPos * (height + barGap)}
                    width={barWidth}
                    height={height}
                    fill={fill}
                    className='transition-all duration-300 ease-in-out hover:opacity-80 hover:scale-105 hover:shadow-lg'
                    style={{ transformOrigin: 'left', pointerEvents: 'all', cursor: 'pointer' }}
                    onMouseOver={(event) => {
                        const { name, ...rest } = entry;
                        onMouseOver(event, { name, ...rest });
                    }}
                    onMouseOut={onMouseOut}
                    onClick={(e) => {
                        console.log("Bar Component: rect onClick triggered!", { e, dataKey, value: entry[dataKey], entry });
                        onClick({ event: e as React.MouseEvent<SVGRectElement>, dataKey, value: Number(value), name: entry.name, entry });
                    }}
                />
            );
        })}
    </g>
);

export default Bar;

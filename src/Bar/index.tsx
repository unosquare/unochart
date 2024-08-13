import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface BarProps {
    data?: Array<{ name: string; [key: string]: any }>;
    dataKey: string;
    fill: string;
    width?: number;
    height?: number;
    maxValue?: number;
    layout?: 'horizontal' | 'vertical';
    barIndex?: number;
    totalBars?: number;
    barGap?: number;
    stackId?: string;
    accumulatedHeight?: number;
    stackIdPos?: number;
    onMouseOver?: (event: React.MouseEvent, entry: { name: string; [key: string]: any }) => void;
    onMouseOut?: () => void;
}

const Bar = ({
    data = [],
    dataKey,
    fill,
    width = 0,
    height = 0,
    maxValue = 0,
    layout = 'horizontal',
    barIndex = 0,
    totalBars = 1,
    barGap = 0,
    stackId,
    accumulatedHeight = 0,
    stackIdPos = 0,
    onMouseOver = () => {},
    onMouseOut = () => {},
}: BarProps) => (
    <g>
        {data.map((entry) => {
            const value = entry[dataKey];
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
                    onMouseOver={(event) => {
                        const { name, ...rest } = entry;
                        onMouseOver(event, { name, ...rest });
                    }}
                    onMouseOut={onMouseOut}
                />
            ) : (
                <rect
                    key={uuidv4()}
                    x={accumulatedHeight}
                    y={stackIdPos * (height + barGap)}
                    width={barWidth}
                    height={height}
                    fill={fill}
                    onMouseOver={(event) => {
                        const { name, ...rest } = entry;
                        onMouseOver(event, { name, ...rest });
                    }}
                    onMouseOut={onMouseOut}
                />
            );
        })}
    </g>
);

export default Bar;

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
    barGap = 0,
    onMouseOver = () => {},
    onMouseOut = () => {},
}: BarProps) => (
    <g>
        {data.map((entry) => {
            const barHeight = (entry[dataKey] / maxValue) * height;
            return layout === 'horizontal' ? (
                <rect
                    key={uuidv4()}
                    x={barIndex * (width + barGap)}
                    y={height - barHeight}
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
                    x={0}
                    y={barIndex * (height + barGap)}
                    width={(entry[dataKey] / maxValue) * width}
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

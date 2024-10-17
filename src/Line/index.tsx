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
    chartWidth: number;
    chartHeight: number;
    connectNulls?: boolean;
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
    connectNulls = false,
    onMouseOver = () => {},
    onMouseOut = () => {},
}) => {
    if (!data.length) return null;

    const validValues = data.map((d) => d[dataKey]).filter((value) => value !== undefined && value !== null);
    const maxValue = validValues.length ? Math.max(...validValues) : 0;

    const xScale = (index: number) => (index) * (chartWidth / (data.length - 1));
    const yScale = (value: number | null | undefined) => {
        if (value === null || value === undefined || isNaN(value)) return null;
        return chartHeight - (value / maxValue) * chartHeight;
    };

    // Create segments for the line when connectNulls is false
    const createLineSegments = () => {
        let currentSegment: any[] = [];
        const segments: any[][] = [];

        data.forEach((point, index) => {
            if (point[dataKey] !== null && point[dataKey] !== undefined) {
                currentSegment.push({ ...point, index });
            } else if (currentSegment.length > 0) {
                segments.push(currentSegment);
                currentSegment = [];
            }
        });

        if (currentSegment.length > 0) {
            segments.push(currentSegment);
        }

        return segments;
    };

    const lineGenerator = d3Shape
        .line()
        .defined((d: any) => d[dataKey] !== null && d[dataKey] !== undefined)
        .x((d: any) => xScale(d.index))
        .y((d: any) => {
            const value = d[dataKey];
            return value !== null && value !== undefined ? yScale(value) : null;
        })
        .curve(d3Shape[`curve${type.charAt(0).toUpperCase() + type.slice(1)}`] || d3Shape.curveLinear);

    const renderPath = () => {
        if (connectNulls) {
            // When connectNulls is true, filter out null values and connect remaining points
            const filteredData = data
                .map((d, index) => ({ ...d, index }))
                .filter((d) => d[dataKey] !== null && d[dataKey] !== undefined);
            return <path
                d={lineGenerator(filteredData) || ''}
                fill="none"
                stroke={stroke}
                strokeWidth={2}
                strokeDasharray={strokeDasharray}
                style={{ transition: 'all 0.3s' }}
            />;
        } else {
            // When connectNulls is false, create separate segments
            const segments = createLineSegments();
            return segments.map((segment, i) => (
                <path
                    key={`segment-${i}`}
                    d={lineGenerator(segment) || ''}
                    fill="none"
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
            {data.map((entry, index) => {
                if (entry[dataKey] === null || entry[dataKey] === undefined) return null;
                const x = xScale(index);
                const y = yScale(entry[dataKey]);
                if (y === null) return null;
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
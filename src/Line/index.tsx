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

    const xScale = (index: number) => (index + 0.5) * (chartWidth / data.length);
    const yScale = (value: number | null | undefined) => {
        if (value === null || value === undefined || isNaN(value)) return chartHeight; // Manejo de valores nulos o NaN
        return chartHeight - (value / maxValue) * chartHeight;
    };

    // Ajustamos la función de línea para que se generen correctamente las líneas con `connectNulls`
const lineGenerator = d3Shape
    .line()
    .defined((d: any) => d[dataKey] !== null && d[dataKey] !== undefined) // Define los puntos válidos
    .x((d, index) => xScale(index))
    .y((d) => {
        const scaledY = yScale((d as any)[dataKey]);
        return scaledY !== null ? scaledY : NaN; // Evita valores NaN
    })
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
                if (y === null) return null; // Si y es null, no renderizamos el punto.
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

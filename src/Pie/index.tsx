import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface PieProps {
    data: Array<{ name: string; value: number }>;
    dataKey: keyof { name: string; value: number };
    nameKey: string;
    cx: string | number;
    cy: string | number;
    innerRadius?: number;
    outerRadius: number;
    fill: string;
    label?: 'percent' | string[];
    startAngle?: number;
    endAngle?: number;
    paddingAngle?: number;
    activeShape?: boolean;
}

const Pie: React.FC<PieProps> = ({
    data,
    dataKey,
    nameKey,
    cx,
    cy,
    innerRadius = 0,
    outerRadius,
    fill,
    label = [],
    startAngle = 0,
    endAngle = 360,
    paddingAngle = 0,
    activeShape = false,
}) => {
    const computedCx = typeof cx === 'string' && cx.endsWith('%') ? (parseFloat(cx) / 100) * 730 : cx;
    const computedCy = typeof cy === 'string' && cy.endsWith('%') ? (parseFloat(cy) / 100) * 250 : cy;

    const totalValue = data.reduce((acc, item) => acc + (item[dataKey] as number), 0); // Ajuste aquí
    const angleRange = endAngle - startAngle;

    let currentAngle = startAngle + 180;

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <g transform={`translate(${computedCx}, ${computedCy})`}>
            {data.map((entry, index) => {
                const value = entry[dataKey] as number; // Ajuste aquí
                const angle = (value / totalValue) * angleRange - paddingAngle;
                const nextAngle = currentAngle + angle;
                const largeArcFlag = angle > 180 ? 1 : 0;

                const outerX = Math.cos((Math.PI / 180) * nextAngle) * outerRadius;
                const outerY = Math.sin((Math.PI / 180) * nextAngle) * outerRadius;
                const innerX = Math.cos((Math.PI / 180) * nextAngle) * innerRadius;
                const innerY = Math.sin((Math.PI / 180) * nextAngle) * innerRadius;

                const pathData = `
          M ${Math.cos((Math.PI / 180) * currentAngle) * innerRadius} ${Math.sin((Math.PI / 180) * currentAngle) * innerRadius}
          L ${Math.cos((Math.PI / 180) * currentAngle) * outerRadius} ${Math.sin((Math.PI / 180) * currentAngle) * outerRadius}
          A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerX} ${outerY}
          L ${innerX} ${innerY}
          A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${Math.cos((Math.PI / 180) * currentAngle) * innerRadius} ${Math.sin((Math.PI / 180) * currentAngle) * innerRadius}
          Z
        `;

                currentAngle = nextAngle + paddingAngle;

                let labelText = '';
                if (label === 'percent') {
                    labelText = `${((value / totalValue) * 100).toFixed(1)}%`;
                } else if (Array.isArray(label) && label[index]) {
                    labelText = label[index];
                } else {
                    labelText = `${value}`;
                }

                const isActive = activeShape && activeIndex === index;
                const adjustedOuterRadius = isActive ? outerRadius + 10 : outerRadius;

                return (
                    <g
                        key={uuidv4()}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        <path
                            d={pathData}
                            fill={fill}
                            stroke='#fff'
                            strokeWidth={1}
                            style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.2s' }}
                        />
                        {label && (
                            <text
                                x={Math.cos((Math.PI / 180) * (currentAngle - angle / 2)) * (adjustedOuterRadius + 10)}
                                y={Math.sin((Math.PI / 180) * (currentAngle - angle / 2)) * (adjustedOuterRadius + 10)}
                                textAnchor='middle'
                                dominantBaseline='middle'
                                fill={fill}
                                fontSize='10'
                            >
                                {labelText}
                            </text>
                        )}
                    </g>
                );
            })}
        </g>
    );
};

export default Pie;

import React from 'react';

interface PolarAngleAxisProps {
    cx: string | number;
    cy: string | number;
    ticks?: number[];
    stroke?: string;
}

const PolarAngleAxis: React.FC<PolarAngleAxisProps> = ({
    cx = '50%',
    cy = '50%',
    ticks = [0, 90, 180, 270],
    stroke = '#ccc',
}) => {
    const computedCx = typeof cx === 'string' && cx.endsWith('%') ? parseFloat(cx) / 100 * 730 : cx;
    const computedCy = typeof cy === 'string' && cy.endsWith('%') ? parseFloat(cy) / 100 * 250 : cy;

    return (
        <g transform={`translate(${computedCx}, ${computedCy})`} className="polar-angle-axis">
            {ticks.map((tick, index) => (
                <line
                    key={index}
                    x1="0"
                    y1="0"
                    x2={Math.cos((Math.PI / 180) * tick) * 100}
                    y2={Math.sin((Math.PI / 180) * tick) * 100}
                    stroke={stroke}
                />
            ))}
        </g>
    );
};

export default PolarAngleAxis;

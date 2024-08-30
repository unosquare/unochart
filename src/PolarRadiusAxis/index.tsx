import React from 'react';

interface PolarRadiusAxisProps {
    cx: string | number;
    cy: string | number;
    ticks?: number[];
    stroke?: string;
}

const PolarRadiusAxis: React.FC<PolarRadiusAxisProps> = ({
    cx = '50%',
    cy = '50%',
    ticks = [20, 40, 60, 80, 100],
    stroke = '#ccc',
}) => {
    const computedCx = typeof cx === 'string' && cx.endsWith('%') ? parseFloat(cx) / 100 * 730 : cx;
    const computedCy = typeof cy === 'string' && cy.endsWith('%') ? parseFloat(cy) / 100 * 250 : cy;

    return (
        <g transform={`translate(${computedCx}, ${computedCy})`} className="polar-radius-axis">
            {ticks.map((tick, index) => (
                <circle
                    key={index}
                    cx="0"
                    cy="0"
                    r={tick}
                    fill="none"
                    stroke={stroke}
                />
            ))}
        </g>
    );
};

export default PolarRadiusAxis;

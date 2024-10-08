import React from 'react';

interface PolarGridProps {
    cx: string | number;
    cy: string | number;
    radialLines?: number;
    concentricCircles?: number;
    stroke?: string;
}

const PolarGrid: React.FC<PolarGridProps> = ({
    cx = '50%',
    cy = '50%',
    radialLines = 8,
    concentricCircles = 4,
    stroke = '#ccc',
}) => {
    const computedCx = typeof cx === 'string' && cx.endsWith('%') ? (parseFloat(cx) / 100) * 730 : cx;
    const computedCy = typeof cy === 'string' && cy.endsWith('%') ? (parseFloat(cy) / 100) * 250 : cy;

    const radialAngles = Array.from({ length: radialLines }, (_, i) => (360 / radialLines) * i);
    const radiusSteps = Array.from({ length: concentricCircles }, (_, i) => (100 / concentricCircles) * (i + 1));

    return (
        <g transform={`translate(${computedCx}, ${computedCy})`} className='polar-grid'>
            {radialAngles.map((angle, index) => (
                <line
                    key={`line-${index}`}
                    x1='0'
                    y1='0'
                    x2={Math.cos((Math.PI / 180) * angle) * 100}
                    y2={Math.sin((Math.PI / 180) * angle) * 100}
                    stroke={stroke}
                />
            ))}
            {radiusSteps.map((radius, index) => (
                <circle key={`circle-${index}`} cx='0' cy='0' r={radius} fill='none' stroke={stroke} />
            ))}
        </g>
    );
};

export default PolarGrid;

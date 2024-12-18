import React from 'react';

interface RadialBarProps {
    data: Array<{ name: string; uv: number; fill: string }>;
    cx: number;
    cy: number;
    innerRadius: string | number;
    outerRadius: string | number;
    startAngle: number;
    endAngle: number;
    minAngle?: number;
    label?: { fill: string; position: string };
    dataKey: string;
    clockWise?: boolean;
}

const RadialBar: React.FC<RadialBarProps> = ({
    data,
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    minAngle = 15,
    label,
    clockWise = true,
    dataKey,
}) => {
    if (!data || !Array.isArray(data)) return null;

    const angleRange = clockWise ? startAngle - endAngle : endAngle - startAngle;
    const innerR = typeof innerRadius === 'string'
        ? (parseFloat(innerRadius) / 100) * Math.min(cx, cy)
        : +innerRadius;
    const outerR = typeof outerRadius === 'string'
        ? (parseFloat(outerRadius) / 100) * Math.min(cx, cy)
        : +outerRadius;
    const maxValue = Math.max(...data.map((d) => Math.abs(d[dataKey])));

    const calculatePath = (value: number, index: number) => {
        const sliceAngle = Math.max((Math.abs(value) / maxValue) * angleRange, minAngle);
        const barInnerR = innerR + ((outerR - innerR) / data.length) * index;
        const barOuterR = innerR + ((outerR - innerR) / data.length) * (index + 1);
        const endAngleDeg = value >= 0 ? startAngle - sliceAngle : startAngle + sliceAngle;
        const startRad = (startAngle / 180) * Math.PI;
        const endRad = (endAngleDeg / 180) * Math.PI;
        
        const outerX1 = barOuterR * Math.cos(startRad);
        const outerY1 = barOuterR * Math.sin(startRad);
        const outerX2 = barOuterR * Math.cos(endRad);
        const outerY2 = barOuterR * Math.sin(endRad);
        const innerX2 = barInnerR * Math.cos(endRad);
        const innerY2 = barInnerR * Math.sin(endRad);
        const innerX1 = barInnerR * Math.cos(startRad);
        const innerY1 = barInnerR * Math.sin(startRad);
        
        const largeArcFlag = sliceAngle > 180 ? 1 : 0;

        return `
            M ${outerX1},${outerY1}
            A ${barOuterR},${barOuterR} 0 ${largeArcFlag} ${value >= 0 ? 0 : 1} ${outerX2},${outerY2}
            L ${innerX2},${innerY2}
            A ${barInnerR},${barInnerR} 0 ${largeArcFlag} ${value >= 0 ? 1 : 0} ${innerX1},${innerY1}
            Z
        `;
    };

    return (
        <>
            {data.map((entry, index) => {
                const value = entry[dataKey];
                const pathD = calculatePath(value, index);
                const sliceAngle = Math.max((Math.abs(value) / maxValue) * angleRange, minAngle);
                const midAngleDeg = value >= 0
                    ? startAngle - sliceAngle / 2
                    : startAngle + sliceAngle / 2;
                const midAngleRad = (midAngleDeg / 180) * Math.PI;
                const barInnerR = innerR + ((outerR - innerR) / data.length) * index;
                const barOuterR = innerR + ((outerR - innerR) / data.length) * (index + 1);
                const labelRadius = (barInnerR + barOuterR) / 2;

                const barSize = barOuterR - barInnerR;
                const fontSize = Math.max(10, Math.min(14, barSize / 2));

                // Adjust label position to be inside the bar
                const labelX = labelRadius * Math.cos(midAngleRad);
                const labelY = labelRadius * Math.sin(midAngleRad);

                return (
                    <g 
                        key={`radial-bar-${index}`}
                        className="transition-all duration-500 ease-in-out"
                    >
                        <path
                            d={pathD}
                            fill={entry.fill}
                            className="transition-all duration-300 ease-in-out hover:opacity-80 hover:filter hover:brightness-110"
                            data-name={entry.name}
                            data-value={value}
                        >
                            <animate
                                attributeName="opacity"
                                from="0"
                                to="1"
                                dur="0.5s"
                                begin={`${index * 0.1}s`}
                                fill="freeze"
                            />
                        </path>
                        {label && (
                            <text
                                x={labelX}
                                y={labelY}
                                fill={label.fill}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="font-medium select-none transition-all duration-300 ease-in-out"
                                style={{
                                    fontSize: `${fontSize}px`,
                                    filter: 'drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.9))',
                                }}
                            >
                                {Math.abs(value).toFixed(2)}
                                <animate
                                    attributeName="opacity"
                                    from="0"
                                    to="1"
                                    dur="0.5s"
                                    begin={`${index * 0.1 + 0.2}s`}
                                    fill="freeze"
                                />
                            </text>
                        )}
                    </g>
                );
            })}
        </>
    );
};

export default RadialBar;


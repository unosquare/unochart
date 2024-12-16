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
  background?: boolean;
}

const RadialBar: React.FC<RadialBarProps> = ({
  data,
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  minAngle = 0,
  label,
  clockWise = true,
  dataKey,
}) => {
  const angleRange = clockWise ? startAngle - endAngle : endAngle - startAngle;

  const innerR = typeof innerRadius === 'string' ? parseFloat(innerRadius) / 100 * cx : +innerRadius;
  const outerR = typeof outerRadius === 'string' ? parseFloat(outerRadius) / 100 * cx : +outerRadius;

  const calculatePath = (value: number, index: number) => {
    const totalSum = Math.max(...data.map((d) => Math.abs(d[dataKey])));
    const angle = (value / totalSum) * angleRange;
    const start = ((startAngle / 180) * Math.PI);
    const end = ((startAngle - angle) / 180) * Math.PI;

    const radius = innerR + ((outerR - innerR) / data.length) * (index + 1);

    const x1 = radius * Math.cos(start);
    const y1 = radius * Math.sin(start);
    const x2 = radius * Math.cos(end);
    const y2 = radius * Math.sin(end);

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 0 ${x2} ${y2} L 0 0 Z`;
  };

  return (
    <>
      {data.map((entry, index) => {
        const path = calculatePath(entry[dataKey], index);
        return (
          <g key={`radial-bar-${index}`}>
            {label && (
              <text
                x={0}
                y={-((innerR + ((outerR - innerR) / data.length) * (index + 1)))}
                fill={label.fill}
                textAnchor="middle"
              >
                {entry[dataKey]}
              </text>
            )}
            <path d={path} fill={entry.fill} />
          </g>
        );
      })}
    </>
  );
};

export default RadialBar;

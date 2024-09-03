import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface PieProps {
  data: Array<{ name: string; value: number }>;
  dataKey: string;
  nameKey: string;
  cx: string | number;
  cy: string | number;
  innerRadius?: number;
  outerRadius: number;
  fill: string;
  label?: boolean;
  startAngle?: number;
  endAngle?: number;
  paddingAngle?: number;
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
  label = false,
  startAngle = 0,
  endAngle = 360,
  paddingAngle = 0,
}) => {
  const computedCx = typeof cx === 'string' && cx.endsWith('%') ? parseFloat(cx) / 100 * 730 : cx;
  const computedCy = typeof cy === 'string' && cy.endsWith('%') ? parseFloat(cy) / 100 * 250 : cy;

  const totalValue = data.reduce((acc, item) => acc + item[dataKey], 0);
  const angleRange = endAngle - startAngle;

  let currentAngle = startAngle + 180;

  return (
    <g transform={`translate(${computedCx}, ${computedCy})`}>
      {data.map((entry, index) => {
        const value = entry[dataKey];
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

        return (
          <g key={uuidv4()}>
            <path
              d={pathData}
              fill={fill}
              stroke="#fff"
              strokeWidth={1}
            />
            {label && (
              <text
                x={Math.cos((Math.PI / 180) * (currentAngle - angle / 2)) * (outerRadius + 10)}
                y={Math.sin((Math.PI / 180) * (currentAngle - angle / 2)) * (outerRadius + 10)}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={fill}
                fontSize="10"
              >
                {entry[dataKey]}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};

export default Pie;

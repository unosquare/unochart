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
}) => {
  // Convert cx and cy to numeric values if they are percentages
  const computedCx = typeof cx === 'string' && cx.endsWith('%') ? parseFloat(cx) / 100 * 730 : cx;
  const computedCy = typeof cy === 'string' && cy.endsWith('%') ? parseFloat(cy) / 100 * 250 : cy;

  const totalValue = data.reduce((acc, item) => acc + item[dataKey], 0);

  let startAngle = 0;

  return (
    <g transform={`translate(${computedCx}, ${computedCy})`}>
      {data.map((entry, index) => {
        const value = entry[dataKey];
        const angle = (value / totalValue) * 360;
        const endAngle = startAngle + angle;
        const largeArcFlag = angle > 180 ? 1 : 0;

        const outerX = Math.cos((Math.PI / 180) * endAngle) * outerRadius;
        const outerY = Math.sin((Math.PI / 180) * endAngle) * outerRadius;
        const innerX = Math.cos((Math.PI / 180) * endAngle) * innerRadius;
        const innerY = Math.sin((Math.PI / 180) * endAngle) * innerRadius;

        const pathData = `
          M ${Math.cos((Math.PI / 180) * startAngle) * innerRadius} ${Math.sin((Math.PI / 180) * startAngle) * innerRadius}
          L ${Math.cos((Math.PI / 180) * startAngle) * outerRadius} ${Math.sin((Math.PI / 180) * startAngle) * outerRadius}
          A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerX} ${outerY}
          L ${innerX} ${innerY}
          A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${Math.cos((Math.PI / 180) * startAngle) * innerRadius} ${Math.sin((Math.PI / 180) * startAngle) * innerRadius}
          Z
        `;

        startAngle = endAngle;

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
                x={Math.cos((Math.PI / 180) * (startAngle - angle / 2)) * (outerRadius + 10)}
                y={Math.sin((Math.PI / 180) * (startAngle - angle / 2)) * (outerRadius + 10)}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={fill}  // Usar el mismo color que el segmento del pie
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

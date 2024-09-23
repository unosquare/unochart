import React from 'react';

interface LineProps {
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  stroke: string;
  type?: 'monotone' | 'linear';
  chartWidth: number;  // Recibimos el ancho del gráfico
  chartHeight: number;  // Recibimos la altura del gráfico
  onMouseOver?: (event: React.MouseEvent, entry: { name: string; [key: string]: any }) => void;
  onMouseOut?: () => void;
}

const Line: React.FC<LineProps> = ({
  data = [],
  dataKey,
  stroke,
  type = 'linear',
  chartWidth,
  chartHeight,
  onMouseOver = () => {},
  onMouseOut = () => {},
}) => {
  if (!data.length) return null;

  const maxValue = Math.max(...data.map((d) => d[dataKey]));

  const points = data
    .map((entry, index) => {
      const x = (index + 0.5) * (chartWidth / data.length); // Centrado
      const y = chartHeight - (entry[dataKey] / maxValue) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <>
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        onMouseOver={(event) => onMouseOver(event, { name: dataKey })}
        onMouseOut={onMouseOut}
        style={{ transition: 'all 0.3s' }}
      />
      {data.map((entry, index) => {
        const x = (index + 0.5) * (chartWidth / data.length); // Centrado
        const y = chartHeight - (entry[dataKey] / maxValue) * chartHeight;
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

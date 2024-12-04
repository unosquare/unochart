import React from 'react';

interface RadarProps {
  name: string;
  dataKey: string;
  data: Array<{ [key: string]: any }>;
  stroke: string;
  fill: string;
  fillOpacity: number;
  radius?: number;
}

const Radar: React.FC<RadarProps> = ({
  name,
  dataKey,
  data,
  stroke,
  fill,
  fillOpacity,
  radius = 100,
}) => {
  const angleStep = 360 / data.length;

  // Calculate points for the radar shape
  const points = data.map((entry, index) => {
    const value = entry[dataKey];
    const angle = angleStep * index;
    const scaledRadius = (value / 150) * radius;  // Scale based on max value of 150
    const x = Math.cos((Math.PI / 180) * angle) * scaledRadius;
    const y = Math.sin((Math.PI / 180) * angle) * scaledRadius;
    return { x, y };
  });

  // Create SVG path
  const path = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x},${point.y}`)
    .join(' ') + ' Z';

  return (
    <g>
      <path
        d={path}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={2}
        className="transition-all duration-300 ease-in-out"
      />
      {points.map((point, index) => (
        <circle
          key={`radar-point-${index}`}
          cx={point.x}
          cy={point.y}
          r={3}
          fill={stroke}
          className="transition-all duration-300 ease-in-out"
        />
      ))}
    </g>
  );
};

export default Radar;


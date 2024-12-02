import React from 'react';

interface RadarProps {
  name: string;
  dataKey: string;
  data: Array<{ [key: string]: any }>;
  stroke: string;
  fill: string;
  fillOpacity: number;
  radius: number;
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
  const validRadius = isNaN(radius) ? 0 : radius;
  const angleStep = 360 / data.length;

  // Calcular las coordenadas para la serie de datos
  const points = data.map((entry, index) => {
    const value = entry[dataKey];
    const angle = angleStep * index;
    const x = Math.cos((Math.PI / 180) * angle) * (value / 150) * validRadius;  // Normalizando con 150 como max valor
    const y = Math.sin((Math.PI / 180) * angle) * (value / 150) * validRadius;
    return { x, y };
  });

  // Construir la ruta (path) del radar
  const path = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x},${point.y}`)
    .join(' ') + ' Z'; // Z cierra la ruta

  return (
    <g>
      {/* Radar área */}
      <path
        d={path}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={2}
        className="transition-all duration-300 ease-in-out"
      />
      {/* Radar bordes */}
      {points.map((point, index) => (
        <circle
          key={`radar-point-${index}`}
          cx={point.x}
          cy={point.y}
          r={3}
          fill={stroke}
        />
      ))}
    </g>
  );
};

export default Radar;

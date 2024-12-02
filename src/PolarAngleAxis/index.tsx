import React from 'react';

interface PolarAngleAxisProps {
  dataKey: string;
  data: Array<{ [key: string]: any }>;
  radius: number;
  angle?: number;
  fontSize?: number;
}

const PolarAngleAxis: React.FC<PolarAngleAxisProps> = ({
  dataKey,
  data,
  radius = 100,
  angle = 0,
  fontSize = 12,
}) => {
  const validRadius = isNaN(radius) ? 0 : radius;
  const angleStep = (360 / data.length);

  return (
    <>
      {data.map((entry, index) => {
        const angleOffset = angleStep * index + angle;
        const x = Math.cos((Math.PI / 180) * angleOffset) * validRadius;
        const y = Math.sin((Math.PI / 180) * angleOffset) * validRadius;

        return (
          <text
            key={`angle-axis-${index}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={fontSize}
            transform={`translate(${radius}, ${radius})`}
            className="transition-all duration-300 ease-in-out"
          >
            {entry[dataKey]}
          </text>
        );
      })}
    </>
  );
};

export default PolarAngleAxis;

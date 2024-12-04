import React from 'react';

interface PolarAngleAxisProps {
  dataKey: string;
  data: Array<{ [key: string]: any }>;
  radius?: number;
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
  const angleStep = (360 / data.length);

  return (
    <>
      {data.map((entry, index) => {
        const angleOffset = angleStep * index + angle;
        const x = Math.cos((Math.PI / 180) * angleOffset) * (radius + 20); // Add padding
        const y = Math.sin((Math.PI / 180) * angleOffset) * (radius + 20);

        // Calculate text anchor based on position
        const textAnchor = x > 0 ? "start" : x < 0 ? "end" : "middle";
        const dy = y > 0 ? "1em" : y < 0 ? "-0.5em" : "0.3em";

        return (
          <text
            key={`angle-axis-${index}`}
            x={x}
            y={y}
            textAnchor={textAnchor}
            dy={dy}
            fontSize={fontSize}
            className="transition-all duration-300 ease-in-out fill-gray-600"
          >
            {entry[dataKey]}
          </text>
        );
      })}
    </>
  );
};

export default PolarAngleAxis;


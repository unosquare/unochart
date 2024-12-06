import React from 'react';

interface PolarRadiusAxisProps {
  angle: number;
  domain: [number, number];
  radius: number;
}

const PolarRadiusAxis: React.FC<PolarRadiusAxisProps> = ({ angle = 0, domain = [0, 150], radius = 100 }) => {
  const validAngle = isNaN(angle) ? 0 : angle;
  const validRadius = isNaN(radius) ? 0 : radius;
  const [minValue, maxValue] = domain;
  const step = (maxValue - minValue) / 5;
  const ticks = Array.from({ length: 6 }, (_, i) => minValue + i * step);

  return (
    <>
      {ticks.map((tick, index) => {
        const radialLength = (tick - minValue) / (maxValue - minValue) * radius;
        const x1 = Math.cos((Math.PI / 180) * validAngle) * radialLength;
        const y1 = Math.sin((Math.PI / 180) * validAngle) * radialLength;
        const x2 = Math.cos((Math.PI / 180) * validAngle) * validRadius;
        const y2 = Math.sin((Math.PI / 180) * validAngle) * validRadius;

        return (
          <line
            key={`radius-axis-${index}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#ccc"
            strokeWidth={1}
          />
        );
      })}
    </>
  );
};

export default PolarRadiusAxis;

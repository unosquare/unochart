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
  // Rango total de ángulos
  const angleRange = clockWise ? startAngle - endAngle : endAngle - startAngle;

  // Convertimos innerRadius/outerRadius a número
  const innerR = typeof innerRadius === 'string'
    ? (parseFloat(innerRadius) / 100) * cx
    : +innerRadius;
  const outerR = typeof outerRadius === 'string'
    ? (parseFloat(outerRadius) / 100) * cx
    : +outerRadius;

  // Hallamos el valor máximo (en valor absoluto) para normalizar
  const maxValue = Math.max(...data.map((d) => Math.abs(d[dataKey])));

  const calculatePath = (value: number, index: number) => {
    // Ángulo en grados según el valor (usamos valor absoluto)
    const sliceAngle = (Math.abs(value) / maxValue) * angleRange;

    // Distintos radios para cada barra (anillos concéntricos)
    const barInnerR = innerR + ((outerR - innerR) / data.length) * index;
    const barOuterR = innerR + ((outerR - innerR) / data.length) * (index + 1);

    // Si el valor es negativo, invertimos la dirección sumando en lugar de restar
    let endAngleDeg: number;
    if (value >= 0) {
      endAngleDeg = startAngle - sliceAngle;
    } else {
      endAngleDeg = startAngle + sliceAngle;
    }

    const startRad = (startAngle / 180) * Math.PI;
    const endRad = (endAngleDeg / 180) * Math.PI;

    // Coordenadas arco externo
    const outerX1 = barOuterR * Math.cos(startRad);
    const outerY1 = barOuterR * Math.sin(startRad);
    const outerX2 = barOuterR * Math.cos(endRad);
    const outerY2 = barOuterR * Math.sin(endRad);

    // Coordenadas arco interno
    const innerX2 = barInnerR * Math.cos(endRad);
    const innerY2 = barInnerR * Math.sin(endRad);
    const innerX1 = barInnerR * Math.cos(startRad);
    const innerY1 = barInnerR * Math.sin(startRad);

    // largeArcFlag si excede 180
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

        // Calcular coordenadas para el label
        const sliceAngle = (Math.abs(value) / maxValue) * angleRange;
        const midAngleDeg = value >= 0
          ? startAngle - sliceAngle / 2
          : startAngle + sliceAngle / 2;
        const midAngleRad = (midAngleDeg / 180) * Math.PI;

        const barInnerR = innerR + ((outerR - innerR) / data.length) * index;
        const barOuterR = innerR + ((outerR - innerR) / data.length) * (index + 1);
        const labelRadius = barInnerR + (barOuterR - barInnerR) / 2;

        const labelX = labelRadius * Math.cos(midAngleRad);
        const labelY = labelRadius * Math.sin(midAngleRad);

        return (
          <g key={`radial-bar-${index}`}>
            {label && (
              <text
                x={labelX}
                y={labelY}
                fill={label.fill}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: '12px' }}
              >
                {value}
              </text>
            )}
            <path d={pathD} fill={entry.fill} />
          </g>
        );
      })}
    </>
  );
};

export default RadialBar;

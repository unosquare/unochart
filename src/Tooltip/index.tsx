import React from 'react';

interface TooltipProps {
  tooltipData: { name: string; values: { key: string; value: number, color: string }[] } | null;
  position: { x: number; y: number };
}

const Tooltip: React.FC<TooltipProps> = ({ tooltipData, position }) => {
  if (!tooltipData) return null;

  return (
    <div
      className="absolute bg-white p-2 shadow-lg"
      style={{ top: position.y + 10, left: position.x + 10 }}
    >
      <p>{tooltipData.name}</p>
      {tooltipData.values.map((val, index) => (
        <p key={index} style={{ color: val.color }}>
          {val.key} : {val.value}
        </p>
      ))}
    </div>
  );
};

export default Tooltip;

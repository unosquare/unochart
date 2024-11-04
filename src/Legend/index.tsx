import React from 'react';

interface LegendProps {
  items?: Array<{ color: string; label: string }>;
}

const Legend: React.FC<LegendProps> = ({ items = [] }) => {
  const validItems = items.filter((item) => item.label && item.color);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
      {validItems.map((item, index) => (
        <div key={`legend-item-${index}`} className="flex items-center" data-testid="legend-item">
          <div
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          <span className="text-sm font-medium text-gray-700">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
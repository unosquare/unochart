import React from 'react';

interface LegendProps {
  items?: Array<{ color: string; label: string }>;
}

const Legend: React.FC<LegendProps> = ({ items = [] }) => {
  return (
    <div className="flex justify-center mt-4">
      {items.map((item, index) => (
        <div key={`legend-${index}`} className="flex items-center mr-4">
          <div className="w-4 h-4" style={{ backgroundColor: item.color }} />
          <span className="ml-2">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

Legend.defaultProps = {
  items: [],
};

export default Legend;

import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface YAxisProps {
    data?: Array<{ [key: string]: any }>;
    height?: number;
    maxValue?: number;
    width?: number;
    layout?: 'horizontal' | 'vertical';
}

const YAxis: React.FC<YAxisProps> = ({ data = [], height = 0, maxValue = 0, width = 0, layout = 'horizontal' }) => (
    <g className='y-axis'>
        {layout === 'horizontal'
            ? new Array(6).fill(null).map((_, index) => {
                  const value = (maxValue / 5) * index;
                  return (
                      <text
                          key={uuidv4()}
                          x={-10}
                          y={height - (index * height) / 5}
                          textAnchor='end'
                          dominantBaseline='middle'
                      >
                          {value}
                      </text>
                  );
              })
            : data.map((entry, index) => (
                  <text
                      key={uuidv4()}
                      x={-10}
                      y={(index + 0.5) * (height / data.length)}
                      textAnchor='end'
                      dominantBaseline='middle'
                  >
                      {entry.name}
                  </text>
              ))}
    </g>
);

export default YAxis;

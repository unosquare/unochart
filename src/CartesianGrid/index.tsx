import React from 'react';

interface CartesianGridProps {
    width?: number;
    height?: number;
    strokeDasharray?: string;
    layout?: 'horizontal' | 'vertical';
}

const CartesianGrid: React.FC<CartesianGridProps> = ({
    width = 0,
    height = 0,
    strokeDasharray = '3 3',
    layout = 'horizontal',
}) => (
    <g className='cartesian-grid'>
        {layout === 'horizontal'
            ? new Array(6)
                  .fill(null)
                  .map((_, index) => (
                      <line
                          key={`hline-${index}`}
                          x1='0'
                          y1={(index * height) / 5}
                          x2={width}
                          y2={(index * height) / 5}
                          strokeDasharray={strokeDasharray}
                          stroke='grey'
                      />
                  ))
            : new Array(6)
                  .fill(null)
                  .map((_, index) => (
                      <line
                          key={`vline-${index}`}
                          x1={(index * width) / 5}
                          y1='0'
                          x2={(index * width) / 5}
                          y2={height}
                          strokeDasharray={strokeDasharray}
                          stroke='grey'
                      />
                  ))}
    </g>
);

export default CartesianGrid;

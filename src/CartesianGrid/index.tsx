import { v4 as uuidv4 } from 'uuid';

interface CartesianGridProps {
    width?: number;
    height?: number;
    strokeDasharray?: string;
    layout?: 'horizontal' | 'vertical';
}

const CartesianGrid = ({
    width = 0,
    height = 0,
    strokeDasharray = '3 3',
    layout = 'horizontal',
}: CartesianGridProps) => (
    <g className='cartesian-grid'>
        {layout === 'horizontal'
            ? new Array(6)
                  .fill(null)
                  .map((_, index) => (
                      <line
                          key={uuidv4()}
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
                          key={uuidv4()}
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

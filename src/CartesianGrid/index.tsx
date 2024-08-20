import { v4 as uuidv4 } from 'uuid';

interface CartesianGridProps {
    width?: number;
    height?: number;
    strokeDasharray?: string;
    maxValue?: number;
    minValue?: number;
    layout?: 'horizontal' | 'vertical';
}

const CartesianGrid = ({
    width = 0,
    height = 0,
    strokeDasharray = '3 3',
    maxValue = 0,
    minValue = 0,
    layout = 'horizontal',
}: CartesianGridProps) => {
    const numLines = minValue < 0 ? 11 : 6; // 5 lines for negative values, 5 for positive, and 1 for zero

    return (
        <g className='cartesian-grid'>
            {layout === 'horizontal'
                ? new Array(numLines)
                      .fill(null)
                      .map((_, index) => (
                          <line
                              key={uuidv4()}
                              x1='0'
                              y1={(index * height) / (numLines - 1)}
                              x2={width}
                              y2={(index * height) / (numLines - 1)}
                              strokeDasharray={strokeDasharray}
                              stroke='grey'
                          />
                      ))
                : new Array(numLines)
                      .fill(null)
                      .map((_, index) => (
                          <line
                              key={uuidv4()}
                              x1={(index * width) / (numLines - 1)}
                              y1='0'
                              x2={(index * width) / (numLines - 1)}
                              y2={height}
                              strokeDasharray={strokeDasharray}
                              stroke='grey'
                          />
                      ))}
        </g>
    );
};

export default CartesianGrid;

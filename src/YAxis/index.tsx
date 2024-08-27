import { v4 as uuidv4 } from 'uuid';

interface YAxisProps {
    data?: Array<{ [key: string]: any }>;
    height?: number;
    maxValue?: number;
    minValue?: number;
    width?: number;
    layout?: 'horizontal' | 'vertical';
}

const YAxis = ({ data = [], height = 0, width = 0, maxValue = 0, minValue = 0, layout = 'horizontal' }: YAxisProps) => {
    const positiveLines = 5;
    const negativeLines = minValue < 0 ? 5 : 0;
    const totalLines = minValue < 0 ? 10 : positiveLines;

    const positiveRange = maxValue / positiveLines;
    const negativeRange = minValue < 0 ? Math.abs(minValue) / negativeLines : 0;

    const formatValue = (value: number) => (value % 1 === 0 ? value.toString() : value.toFixed(2));

    return (
        <g className='y-axis'>
            {layout === 'horizontal' &&
                minValue < 0 &&
                // Render negative values
                new Array(negativeLines).fill(null).map((_, index) => {
                    const value = -negativeRange * (negativeLines - index);
                    return (
                        <text
                            key={uuidv4()}
                            x={-10}
                            y={height - (index * height) / totalLines}
                            textAnchor='end'
                            dominantBaseline='middle'
                        >
                            {formatValue(value)}
                        </text>
                    );
                })}

            {layout === 'horizontal' &&
                // Render positive values
                new Array(positiveLines + 1).fill(null).map((_, index) => {
                    const value = positiveRange * index;
                    return (
                        <text
                            key={uuidv4()}
                            x={-10}
                            y={height - ((index + negativeLines) * height) / totalLines}
                            textAnchor='end'
                            dominantBaseline='middle'
                        >
                            {formatValue(value)}
                        </text>
                    );
                })}

            {layout !== 'horizontal' &&
                data.map((entry, index) => (
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
};

export default YAxis;

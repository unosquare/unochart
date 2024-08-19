import { v4 as uuidv4 } from 'uuid';

interface XAxisProps {
    data?: Array<{ [key: string]: any }>;
    width?: number;
    height?: number;
    dataKey?: string;
    maxValue?: number;
    minValue?: number;
    layout?: 'horizontal' | 'vertical';
}

const XAxis = ({
    data = [],
    width = 0,
    height = 0,
    dataKey = 'name',
    maxValue = 0,
    minValue = 0,
    layout = 'horizontal',
}: XAxisProps) => {
    const numLines = minValue! < 0 ? 11 : 6; // 5 lines for negative values, 5 for positive, and 1 for zero
    const range = maxValue! - minValue!;

    return (
        <>
            {layout === 'horizontal' ? (
                <g className='x-axis'>
                    {data.map((entry, index) => (
                        <text
                            key={uuidv4()}
                            x={(index + 0.5) * (width / data.length)}
                            y={height}
                            textAnchor='middle'
                            dominantBaseline='hanging'
                        >
                            {entry[dataKey]}
                        </text>
                    ))}
                </g>
            ) : (
                <g className='x-axis'>
                    {new Array(numLines).fill(null).map((_, index) => {
                        const value = minValue + (range / (numLines - 1)) * index;
                        return (
                            <text
                                key={uuidv4()}
                                x={(index * width) / (numLines - 1)}
                                y={height + height * 0.02}
                                textAnchor='middle'
                                dominantBaseline='hanging'
                            >
                                {value.toFixed(2)}
                            </text>
                        );
                    })}
                </g>
            )}
        </>
    );
};

export default XAxis;

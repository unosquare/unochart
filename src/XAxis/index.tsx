import { v4 as uuidv4 } from 'uuid';

interface XAxisProps {
    data?: Array<{ [key: string]: any }>;
    width?: number;
    height?: number;
    dataKey?: string;
    maxValue?: number;
    minValue?: number;
    layout?: 'horizontal' | 'vertical';
    type?: 'monotone' | 'number';
}

const XAxis = ({
    data = [],
    width = 0,
    height = 0,
    dataKey = 'name',
    maxValue = 0,
    minValue = 0,
    layout = 'horizontal',
    type = 'monotone',
}: XAxisProps) => {
    const positiveLines = 5;
    const negativeLines = minValue < 0 ? 5 : 0;
    const totalLines = minValue < 0 ? 10 : positiveLines;

    const positiveRange = maxValue / positiveLines;
    const negativeRange = minValue < 0 ? Math.abs(minValue) / negativeLines : 0;

    const formatValue = (value: number) => (value % 1 === 0 ? value.toString() : value.toFixed(2));

    if (type === 'number') {
        return (
            <g className='x-axis'>
                {minValue < 0 &&
                    new Array(negativeLines).fill(null).map((_, index) => {
                        const value = -negativeRange * (negativeLines - index);
                        return (
                            <text
                                key={uuidv4()}
                                x={(index * width) / totalLines}
                                y={height}
                                textAnchor='middle'
                                dominantBaseline='hanging'
                            >
                                {formatValue(value)}
                            </text>
                        );
                    })}

                {new Array(positiveLines + 1).fill(null).map((_, index) => {
                    const value = positiveRange * index;
                    return (
                        <text
                            key={uuidv4()}
                            x={((index + negativeLines) * width) / totalLines}
                            y={height}
                            textAnchor='middle'
                            dominantBaseline='hanging'
                        >
                            {formatValue(value)}
                        </text>
                    );
                })}
            </g>
        );
    }

    return (
        <g className='x-axis'>
            {layout === 'horizontal' ? (

                data.map((entry, index) => (
                    <text
                        key={uuidv4()}
                        x={(index + 0.5) * (width / data.length)}
                        y={height}
                        textAnchor='middle'
                        dominantBaseline='hanging'
                    >
                        {entry[dataKey]}
                    </text>
                ))
            ) : (
                <>
                    {minValue < 0 &&
                        new Array(negativeLines).fill(null).map((_, index) => {
                            const value = -negativeRange * (negativeLines - index);
                            return (
                                <text
                                    key={uuidv4()}
                                    x={(index * width) / totalLines}
                                    y={height}
                                    textAnchor='middle'
                                    dominantBaseline='hanging'
                                >
                                    {formatValue(value)}
                                </text>
                            );
                        })}

                    {new Array(positiveLines + 1).fill(null).map((_, index) => {
                        const value = positiveRange * index;
                        return (
                            <text
                                key={uuidv4()}
                                x={((index + negativeLines) * width) / totalLines}
                                y={height}
                                textAnchor='middle'
                                dominantBaseline='hanging'
                            >
                                {formatValue(value)}
                            </text>
                        );
                    })}
                </>
            )}
        </g>
    );
};

export default XAxis;
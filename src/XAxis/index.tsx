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
    const positiveLines = 5;
    const negativeLines = minValue < 0 ? 5 : 0;
    const totalLines = minValue < 0 ? 10 : positiveLines;

    const positiveRange = maxValue / positiveLines;
    const negativeRange = minValue < 0 ? Math.abs(minValue) / negativeLines : 0;

    return (
        <g className='x-axis'>
            {layout === 'horizontal' ? (
                // Render axis for horizontal layout (categories)
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
                // Render axis for vertical layout (values)
                <>
                    {minValue < 0 &&
                        // Render negative values
                        new Array(negativeLines).fill(null).map((_, index) => {
                            const value = -negativeRange * (negativeLines - index);
                            return (
                                <text
                                    key={uuidv4()}
                                    x={(index * width) / totalLines}
                                    y={height + height * 0.02}
                                    textAnchor='middle'
                                    dominantBaseline='hanging'
                                >
                                    {value.toFixed(2)}
                                </text>
                            );
                        })}
                    
                    {new Array(positiveLines + 1).fill(null).map((_, index) => {
                        const value = positiveRange * index;
                        return (
                            <text
                                key={uuidv4()}
                                x={((index + negativeLines) * width) / totalLines}
                                y={height + height * 0.02}
                                textAnchor='middle'
                                dominantBaseline='hanging'
                            >
                                {value.toFixed(2)}
                            </text>
                        );
                    })}
                </>
            )}
        </g>
    );
};

export default XAxis;

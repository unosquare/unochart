import { v4 as uuidv4 } from 'uuid';

interface XAxisProps {
    data?: Array<{ [key: string]: any }>;
    width?: number;
    height?: number;
    dataKey?: string;
    maxValue?: number;
    layout?: 'horizontal' | 'vertical';
}

const XAxis = ({
    data = [],
    width = 0,
    height = 0,
    dataKey = 'name',
    maxValue = 0,
    layout = 'horizontal',
}: XAxisProps) => (
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
                {new Array(6).fill(null).map((_, index) => {
                    const value = (maxValue / 5) * index;
                    return (
                        <text
                            key={uuidv4()}
                            x={(index * width) / 5}
                            y={height + height * 0.02}
                            textAnchor='middle'
                            dominantBaseline='hanging'
                        >
                            {value}
                        </text>
                    );
                })}
            </g>
        )}
    </>
);

export default XAxis;

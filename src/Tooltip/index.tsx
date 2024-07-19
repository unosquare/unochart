import { v4 as uuidv4 } from 'uuid';

interface TooltipProps {
    tooltipData?: { name: string; values: { key: string; value: number; color: string }[] } | null;
    position?: { x: number; y: number };
}

const Tooltip = ({ tooltipData = null, position = { x: 0, y: 0 } }: TooltipProps) => {
    if (!tooltipData) return null;

    return (
        <div
            className='absolute bg-white p-2 shadow-lg rounded border border-gray-300'
            style={{
                top: position.y + 10,
                left: position.x + 10,
                transform: 'translate(-50%, -100%)',
                pointerEvents: 'none',
            }}
        >
            <p className='font-bold mb-1'>{tooltipData.name}</p>
            {tooltipData.values.map((value) => (
                <p key={uuidv4()} className='text-sm' style={{ color: value.color }}>
                    {value.key}: {value.value}
                </p>
            ))}
        </div>
    );
};

export default Tooltip;

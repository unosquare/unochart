import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface LegendProps {
    items?: Array<{ color: string; label: string }>;
}

const Legend: React.FC<LegendProps> = ({ items = [] }) => (
    <div className='flex justify-center '>
        {items.map((item) => (
            <div key={uuidv4()} className='flex items-center mr-4'>
                <div className='w-4 h-3' style={{ backgroundColor: item.color }} />
                <span className='ml-2'>{item.label}</span>
            </div>
        ))}
    </div>
);

export default Legend;

import React from 'react';
import type { PieChartControlsProps } from './types';

export default function PieChartControls({
    pies,
    setPies,
    showPolarGrid,
    setShowPolarGrid,
    width,
    setWidth,
    height,
    setHeight,
    margin,
    setMargin,
}: PieChartControlsProps) {
    const handlePieChange = <K extends keyof (typeof pies)[number]>(
        index: number,
        key: K,
        value: (typeof pies)[number][K],
    ) => {
        const updatedPies = [...pies];
        updatedPies[index][key] = value;
        setPies(updatedPies);
    };

    const handleLabelTypeChange = (index: number, labelType: string) => {
        const updatedPies = [...pies];
        if (labelType === 'percent') {
            updatedPies[index].label = 'percent';
        } else if (labelType === 'numbers') {
            updatedPies[index].label = 'numbers';
        } else if (labelType === 'custom') {
            updatedPies[index].label = [];
        } else {
            updatedPies[index].label = undefined; // Asignar undefined para "None"
        }
        setPies(updatedPies);
    };

    const handleCustomLabelChange = (index: number, value: string) => {
        const updatedPies = [...pies];
        updatedPies[index].label = value ? value.split(',') : [];
        setPies(updatedPies);
    };

    return (
        <div className='bg-white p-6 shadow-lg rounded-lg mb-5 max-w-md'>
            <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Pie Chart Settings</h2>
            <form className='space-y-6'>
                {setShowPolarGrid && (
                    <div className='space-y-2'>
                        <label className='flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-lg p-2 transition duration-300 ease-in-out cursor-pointer'>
                            <input
                                type='checkbox'
                                checked={showPolarGrid}
                                onChange={(e) => setShowPolarGrid?.(e.target.checked)}
                                className='form-checkbox h-5 w-5 text-blue-600 rounded transition duration-300 ease-in-out'
                            />
                            <span className='text-sm font-medium'>Show Polar Grid</span>
                        </label>
                    </div>
                )}
                {pies.map((pie, index) => (
                    <div key={pie.id} className='bg-gray-50 p-4 rounded-lg mb-4 shadow-sm'>
                        <h3 className='text-lg font-medium text-gray-800 mb-2'>Pie {index + 1} Settings</h3>
                        <div className='grid grid-cols-2 gap-4'>
                            {pie.innerRadius !== undefined && (
                                <div>
                                    <label
                                        htmlFor={`innerRadius-${index}`}
                                        className='block text-sm font-medium text-gray-700 mb-1'
                                    >
                                        Inner Radius
                                    </label>
                                    <input
                                        id={`innerRadius-${index}`}
                                        type='number'
                                        value={pie.innerRadius}
                                        onChange={(e) =>
                                            handlePieChange(index, 'innerRadius', Number.parseInt(e.target.value, 10))
                                        }
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out'
                                    />
                                </div>
                            )}
                            {pie.outerRadius !== undefined && (
                                <div>
                                    <label
                                        htmlFor={`outerRadius-${index}`}
                                        className='block text-sm font-medium text-gray-700 mb-1'
                                    >
                                        Outer Radius
                                    </label>
                                    <input
                                        id={`outerRadius-${index}`}
                                        type='number'
                                        value={pie.outerRadius}
                                        onChange={(e) =>
                                            handlePieChange(index, 'outerRadius', Number.parseInt(e.target.value, 10))
                                        }
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out'
                                    />
                                </div>
                            )}
                            {pie.showLabels !== undefined && (
                                <div className='col-span-2'>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Label Type</label>
                                    <select
                                        value={
                                            Array.isArray(pie.label)
                                                ? 'custom'
                                                : pie.label === 'percent'
                                                  ? 'percent'
                                                  : pie.label === 'numbers'
                                                    ? 'numbers'
                                                    : 'none'
                                        }
                                        onChange={(e) => handleLabelTypeChange(index, e.target.value)}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out'
                                    >
                                        <option value='none'>None</option>
                                        <option value='percent'>Percent</option>
                                        <option value='numbers'>Numbers</option>
                                        <option value='custom'>Custom Labels</option>
                                    </select>
                                </div>
                            )}
                            {Array.isArray(pie.label) && (
                                <div className='col-span-2'>
                                    <label
                                        htmlFor={`label-${index}`}
                                        className='block text-sm font-medium text-gray-700 mb-1'
                                    >
                                        Custom Labels (comma-separated)
                                    </label>
                                    <input
                                        id={`label-${index}`}
                                        type='text'
                                        value={pie.label.join(',')}
                                        placeholder='Comma-separated labels'
                                        onChange={(e) => handleCustomLabelChange(index, e.target.value)}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </form>
        </div>
    );
}

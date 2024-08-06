import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CartesianGrid from '../CartesianGrid';
import XAxis from '../XAxis';
import YAxis from '../YAxis';
import Tooltip from '../Tooltip';
import Legend from '../Legend';
import Bar from '../Bar';
import {
    ChartData,
    DEFAULT_BAR_CATEGORY_GAP,
    DEFAULT_BAR_GAP,
    DEFAULT_HEIGHT,
    DEFAULT_LAYOUT,
    DEFAULT_MARGIN,
    DEFAULT_WIDTH,
} from '../constants';
import { parseGap, roundMaxValue } from './utils';

interface BarChartProps {
    data: ChartData;
    width?: number;
    height?: number;
    children?: React.ReactNode;
    margin?: { top?: number; right?: number; bottom?: number; left?: number };
    barCategoryGap?: string | number;
    barGap?: string | number;
    layout?: 'horizontal' | 'vertical';
}

const BarChart = ({
    data,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    children,
    margin = { top: DEFAULT_MARGIN, right: DEFAULT_MARGIN, bottom: DEFAULT_MARGIN, left: DEFAULT_MARGIN },
    barCategoryGap = DEFAULT_BAR_CATEGORY_GAP,
    barGap = DEFAULT_BAR_GAP,
    layout = DEFAULT_LAYOUT,
}: BarChartProps) => {
    const [tooltipData, setTooltipData] = useState<{
        name: string;
        values: { key: string; value: number; color: string }[];
    } | null>(null);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [leftMargin, setLeftMargin] = useState(40);
    const [rightMargin, setRightMargin] = useState(margin.right ?? DEFAULT_MARGIN);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            const yAxisLabels = svgRef.current.querySelectorAll('.y-axis text');
            const maxWidth = Array.from(yAxisLabels).reduce((maxWidth, text) => {
                const width = (text as SVGTextElement).getBBox().width;
                return Math.max(maxWidth, width);
            }, 0);
            setLeftMargin(maxWidth + width * 0.025);
            setRightMargin(
                layout === 'vertical'
                    ? maxWidth + width * 0.1 + (margin.right ?? DEFAULT_MARGIN)
                    : (margin.right ?? DEFAULT_MARGIN),
            );
        }
    }, [data, layout, margin.right, width]);

    const maxValue = roundMaxValue(data);

    // Agrupar barComponents por stackId
    const barComponents = React.Children.toArray(children).filter(
        (child) => (child as React.ReactElement).type === Bar,
    );
    const groupedBarComponents: { [key: string]: React.ReactElement[] } = {};

    barComponents.forEach((child) => {
        const stackId = (child as React.ReactElement).props.stackId || 'default';
        if (!groupedBarComponents[stackId]) {
            groupedBarComponents[stackId] = [];
        }
        groupedBarComponents[stackId].push(child as React.ReactElement);
    });

    const xAxisComponent = React.Children.toArray(children).find(
        (child) => (child as React.ReactElement).type === XAxis,
    );
    const yAxisComponent = React.Children.toArray(children).find(
        (child) => (child as React.ReactElement).type === YAxis,
    );
    const cartesianGridComponent = React.Children.toArray(children).find(
        (child) => (child as React.ReactElement).type === CartesianGrid,
    );
    const legendComponent = React.Children.toArray(children).find(
        (child) => (child as React.ReactElement).type === Legend,
    );
    const tooltipComponent = React.Children.toArray(children).find(
        (child) => (child as React.ReactElement).type === Tooltip,
    );

    const legendItems = barComponents.map((child) => {
        if (React.isValidElement(child)) {
            return { color: child.props.fill, label: child.props.dataKey };
        }
        return { color: '', label: '' };
    });

    const handleMouseOver = (event: React.MouseEvent, entry: { name: string }) => {
        const values = barComponents
            .map((child) => {
                if (React.isValidElement(child)) {
                    const dataKey = child.props.dataKey;
                    const value = data.find((d) => d.name === entry.name)?.[dataKey] ?? 0;
                    return { key: dataKey, value, color: child.props.fill };
                }
                return null;
            })
            .filter((val) => val !== null);

        setTooltipData({ name: entry.name, values });
        const svgRect = svgRef.current?.getBoundingClientRect();
        if (svgRect) {
            setPosition({ x: event.clientX - svgRect.left, y: event.clientY - svgRect.top });
        }
    };

    const handleMouseOut = () => {
        setTooltipData(null);
    };

    const categoryGap = parseGap(
        barCategoryGap,
        layout === 'horizontal'
            ? width - (margin.left ?? DEFAULT_MARGIN) - rightMargin - leftMargin
            : height - (margin.top ?? DEFAULT_MARGIN) - (margin.bottom ?? DEFAULT_MARGIN),
    );
    const adjustedCategoryGap = categoryGap / data.length;
    const barZoneSize =
        layout === 'horizontal'
            ? (width - (margin.left ?? DEFAULT_MARGIN) - rightMargin - leftMargin) / data.length
            : (height - (margin.top ?? DEFAULT_MARGIN) - (margin.bottom ?? DEFAULT_MARGIN)) / data.length;
    const adjustedBarGap = parseGap(barGap, barZoneSize - adjustedCategoryGap);

    const barSize =
        (barZoneSize - adjustedCategoryGap - adjustedBarGap * (barComponents.length - 1)) / barComponents.length;

    const renderBars = (stackComponents: React.ReactElement[], entry: any) => {
        return stackComponents.map((child, barIndex) => {
            const totalBars = stackComponents.length;
            return React.cloneElement(child as React.ReactElement<any>, {
                data: [entry],
                width:
                    layout === 'horizontal'
                        ? barSize
                        : width - (margin.left ?? DEFAULT_MARGIN) - rightMargin,
                height:
                    layout === 'horizontal'
                        ? height - (margin.top ?? DEFAULT_MARGIN) - (margin.bottom ?? DEFAULT_MARGIN)
                        : barSize,
                maxValue,
                barIndex,
                totalBars,
                barGap: adjustedBarGap,
                layout,
                onMouseOver: (event: React.MouseEvent) => handleMouseOver(event, { name: entry.name }),
                onMouseOut: handleMouseOut,
            });
        });
    };

    return (
        <div
            className='relative inline-block'
            style={{
                margin: `${margin.top ?? DEFAULT_MARGIN}px ${margin.right ?? DEFAULT_MARGIN}px ${margin.bottom ?? DEFAULT_MARGIN}px ${margin.left ?? DEFAULT_MARGIN}px`,
            }}
        >
            <svg ref={svgRef} width={width} height={height + height * 0.1} className='border border-gray-300'>
                <g
                    transform={`translate(${(margin.left ?? DEFAULT_MARGIN) + leftMargin}, ${(margin.top ?? DEFAULT_MARGIN) + height * 0.025})`}
                >
                    {layout === 'horizontal' && (
                        <>
                            {yAxisComponent && (
                                <YAxis
                                    height={height - (margin.top ?? DEFAULT_MARGIN) - (margin.bottom ?? DEFAULT_MARGIN)}
                                    maxValue={maxValue}
                                    layout={layout}
                                />
                            )}
                            {cartesianGridComponent && (
                                <CartesianGrid
                                    width={width - (margin.left ?? DEFAULT_MARGIN) - rightMargin - leftMargin}
                                    height={height - (margin.top ?? DEFAULT_MARGIN) - (margin.bottom ?? DEFAULT_MARGIN)}
                                    layout={layout}
                                />
                            )}
                            {xAxisComponent && (
                                <XAxis
                                    data={data}
                                    width={width - (margin.left ?? DEFAULT_MARGIN) - rightMargin - leftMargin}
                                    height={height - (margin.top ?? DEFAULT_MARGIN) - (margin.bottom ?? DEFAULT_MARGIN)}
                                    dataKey='name'
                                    layout={layout}
                                />
                            )}
                        </>
                    )}
                    {layout === 'vertical' && (
                        <>
                            {xAxisComponent && (
                                <XAxis
                                    data={data}
                                    width={width - (margin.left ?? DEFAULT_MARGIN) - rightMargin}
                                    height={height - (margin.top ?? DEFAULT_MARGIN) - (margin.bottom ?? DEFAULT_MARGIN)}
                                    dataKey='name'
                                    maxValue={maxValue}
                                    layout={layout}
                                />
                            )}
                            {cartesianGridComponent && (
                                <CartesianGrid
                                    width={width - (margin.left ?? DEFAULT_MARGIN) - rightMargin}
                                    height={height - (margin.top ?? DEFAULT_MARGIN) - (margin.bottom ?? DEFAULT_MARGIN)}
                                    layout={layout}
                                />
                            )}
                            {yAxisComponent && (
                                <YAxis
                                    data={data}
                                    width={width - (margin.left ?? DEFAULT_MARGIN) - rightMargin}
                                    height={height - (margin.top ?? DEFAULT_MARGIN) - (margin.bottom ?? DEFAULT_MARGIN)}
                                    layout={layout}
                                />
                            )}
                        </>
                    )}
                    {data.map((entry, index) => (
                        <g
                            key={uuidv4()}
                            transform={
                                layout === 'horizontal'
                                    ? `translate(${index * barZoneSize + adjustedCategoryGap / 2}, 0)`
                                    : `translate(0, ${index * barZoneSize + adjustedCategoryGap / 2})`
                            }
                        >
                            {Object.values(groupedBarComponents).map((stackComponents) =>
                                renderBars(stackComponents, entry)
                            )}
                        </g>
                    ))}
                </g>
            </svg>
            {legendComponent && <Legend items={legendItems} />}
            {tooltipComponent && <Tooltip tooltipData={tooltipData} position={position} />}
        </div>
    );
};

export default BarChart;
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

    const hasStackedBars = React.Children.toArray(children).some(
        (child) => (child as React.ReactElement).props.stackId,
    );
    const maxValue = roundMaxValue(data, hasStackedBars);

    // Asignar un stackId único a cada Bar que no lo tenga
    const barComponents = React.Children.toArray(children).map((child) => {
        if ((child as React.ReactElement).type === Bar && !(child as React.ReactElement).props.stackId) {
            return React.cloneElement(child as React.ReactElement, { stackId: uuidv4() });
        }
        return child;
    });

    const groupedBarComponents: { [key: string]: React.ReactElement[] } = {};

    barComponents.forEach((child) => {
        if ((child as React.ReactElement).type === Bar) {
            const stackId = (child as React.ReactElement).props.stackId;
            if (!groupedBarComponents[stackId]) {
                groupedBarComponents[stackId] = [];
            }
            groupedBarComponents[stackId].push(child as React.ReactElement);
        }
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
            const barChild = child as React.ReactElement;
            return { color: barChild.props.fill, label: barChild.props.dataKey };
        }
        return { color: '', label: '' };
    });

    const handleMouseOver = (event: React.MouseEvent, entry: { name: string }) => {
        const values = barComponents
            .map((child) => {
                if (React.isValidElement(child)) {
                    const dataKey = (child as React.ReactElement).props.dataKey;
                    const value = data.find((d) => d.name === entry.name)?.[dataKey];
                    return value !== undefined
                        ? { key: dataKey, value, color: (child as React.ReactElement).props.fill }
                        : null;
                }
                return null;
            })
            .filter((val) => val !== null);

        // Actualizar el tooltip solo si los valores son válidos
        if (values.length > 0) {
            setTooltipData({ name: entry.name, values });
            const svgRect = svgRef.current?.getBoundingClientRect();
            if (svgRect) {
                setPosition({ x: event.clientX - svgRect.left, y: event.clientY - svgRect.top });
            }
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

    const totalGroups = data.length;
    const totalBars = Object.keys(groupedBarComponents).length;
    const barZoneSize =
        layout === 'horizontal'
            ? (width - (margin.left ?? DEFAULT_MARGIN) - rightMargin - leftMargin) / totalGroups
            : (height - (margin.top ?? DEFAULT_MARGIN) - (margin.bottom ?? DEFAULT_MARGIN)) / totalGroups;

    const adjustedCategoryGap = parseGap(barCategoryGap, barZoneSize);
    const barSize = (barZoneSize - adjustedCategoryGap) / totalBars;
    const adjustedBarGap = parseGap(barGap, barSize * totalBars);

    const stackIdPositions: { [key: string]: number } = {};
    let currentStackIdPos = 0;

    const renderBars = (stackComponents: React.ReactElement[], entry: any) => {
        let accumulatedHeight = 0;

        return stackComponents.map((child, barIndex) => {
            const stackId = child.props.stackId;
            const stackIdPos = stackIdPositions[stackId] ?? currentStackIdPos;
            if (!(stackId in stackIdPositions)) {
                stackIdPositions[stackId] = currentStackIdPos;
                currentStackIdPos++;
            }

            const barProps = {
                data: [entry],
                width:
                    layout === 'horizontal'
                        ? barSize - adjustedBarGap
                        : width - (margin.left ?? DEFAULT_MARGIN) - rightMargin,
                height:
                    layout === 'horizontal'
                        ? height - (margin.top ?? DEFAULT_MARGIN) - (margin.bottom ?? DEFAULT_MARGIN)
                        : barSize - adjustedBarGap,
                maxValue,
                barIndex,
                totalBars,
                barGap: adjustedBarGap,
                layout,
                accumulatedHeight,
                stackIdPos,
                onMouseOver: (event: React.MouseEvent) => handleMouseOver(event, { name: entry.name }),
                onMouseOut: handleMouseOut,
            };

            const renderedBar = React.cloneElement(child, barProps);

            if (layout === 'horizontal') {
                accumulatedHeight += (entry[child.props.dataKey] / maxValue) * barProps.height;
            } else {
                accumulatedHeight += (entry[child.props.dataKey] / maxValue) * barProps.width;
            }

            return renderedBar;
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
                    transform={`translate(${(margin.left ?? DEFAULT_MARGIN) + leftMargin}, ${
                        (margin.top ?? DEFAULT_MARGIN) + height * 0.025
                    })`}
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
                                renderBars(stackComponents, entry),
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

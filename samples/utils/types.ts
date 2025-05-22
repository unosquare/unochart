import type React from 'react';

export interface ScatterDataPoint {
    x: number;
    y: number;
    z: number;
}

export interface ScatterChartWrapperProps {
    initialWidth?: number;
    initialHeight?: number;
    initialMargin?: { top: number; right: number; bottom: number; left: number };
    initialLine?: boolean;
    initialLabels?: boolean;
}

export interface ScatterChartControlsProps {
    data: ScatterDataPoint[];
    setData: React.Dispatch<React.SetStateAction<ScatterDataPoint[]>>;
    width: number;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    margin: { top: number; right: number; bottom: number; left: number };
    setMargin: React.Dispatch<React.SetStateAction<{ top: number; right: number; bottom: number; left: number }>>;
    fill: string;
    setFill: React.Dispatch<React.SetStateAction<string>>;
}

export interface DataPoint {
    [key: string]: string | number;
}

export interface LineConfig {
    id: number;
    stroke: string;
    type: string;
    connectNulls: boolean;
    dataKey: string;
}

export interface LinePointClickEvent<T> {
    event: React.MouseEvent<SVGGElement>;
    dataKey: keyof T;
    value: number;
    index: number;
    entry: T;
}

export interface LineChartWrapperProps {
    initialLines: LineConfig[];
    additionalComponents?: React.ReactNode[];
    initialWidth?: number;
    initialHeight?: number;
    initialMargin?: { top: number; right: number; bottom: number; left: number };
    withNulls?: boolean;
    onClick?: (event: LinePointClickEvent<LineConfig>) => void;
}

export interface LineChartControlsProps {
    lines: LineConfig[];
    setLines: React.Dispatch<React.SetStateAction<LineConfig[]>>;
    width: number;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    margin: { top: number; right: number; bottom: number; left: number };
    setMargin: React.Dispatch<React.SetStateAction<{ top: number; right: number; bottom: number; left: number }>>;
    data: Array<any>;
}

export interface BarPointClickEvent<T> {
    event: React.MouseEvent<SVGRectElement>;
    dataKey: keyof T;
    value: number;
    name: string;
    entry: T;
}

export interface BarChartWrapperProps {
    data: DataPoint[];
    children: React.ReactNode;
    initialWidth?: number;
    initialHeight?: number;
    initialMargin?: { top: number; right: number; bottom: number; left: number };
    onClick?: (event: BarPointClickEvent<{ name: string; [key: string]: any }>) => void;
}

export interface BarChartControlsProps {
    width: number;
    height: number;
    barCategoryGap: string;
    barGap: number;
    layout: 'horizontal' | 'vertical';
    margin: { top: number; right: number; bottom: number; left: number };
    showXAxis: boolean;
    showYAxis: boolean;
    showCartesianGrid: boolean;
    showTooltip: boolean;
    showLegend: boolean;
    setWidth: (width: number) => void;
    setHeight: (height: number) => void;
    setBarCategoryGap: (gap: string) => void;
    setBarGap: (gap: number) => void;
    setLayout: (layout: 'horizontal' | 'vertical') => void;
    setMargin: (margin: { top: number; right: number; bottom: number; left: number }) => void;
    setShowXAxis: (show: boolean) => void;
    setShowYAxis: (show: boolean) => void;
    setShowCartesianGrid: (show: boolean) => void;
    setShowTooltip: (show: boolean) => void;
    setShowLegend: (show: boolean) => void;
}

export interface PieClickEvent {
    event: React.MouseEvent<SVGGElement>;
    percentage: string;
    label: string;
    value: number;
    entry: { name: string; value: number };
}

export interface PieData {
    id: number;
    innerRadius?: number;
    outerRadius?: number;
    cx?: string | number;
    cy?: string | number;
    showLabels?: boolean;
    startAngle?: number;
    endAngle?: number;
    activeShape?: boolean;
    label?: string | ((data: any) => string);
}

export interface PieChartWrapperProps {
    initialPies?: PieData[];
    initialShowPolarGrid?: boolean;
    initialWidth?: number;
    initialHeight?: number;
    onClick?: (event: PieClickEvent) => void;
}

export interface PieChartControlsProps {
    pies: PieData[];
    setPies: React.Dispatch<React.SetStateAction<PieData[]>>;
    showPolarGrid?: boolean;
    setShowPolarGrid?: (show: boolean) => void;
}

import React from 'react';

export interface ScatterDataPoint {
  x: number;
  y: number;
  z: number;
}

export interface ScatterChartWrapperProps {
  initialWidth?: number;
  initialHeight?: number;
  initialMargin?: { top: number; right: number; bottom: number; left: number };
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

export interface LineChartWrapperProps {
  initialLines: LineConfig[];
  additionalComponents?: React.ReactNode[];
  initialWidth?: number;
  initialHeight?: number;
  initialMargin?: { top: number; right: number; bottom: number; left: number };
  withNulls?: boolean;
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

export interface BarChartWrapperProps {
  data: DataPoint[];
  children: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number;
  initialMargin?: { top: number; right: number; bottom: number; left: number };
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
  }
  
  export interface PieChartControlsProps {
    pies: PieData[];
    setPies: React.Dispatch<React.SetStateAction<PieData[]>>;
    showPolarGrid?: boolean;
    setShowPolarGrid?: (show: boolean) => void;
  }
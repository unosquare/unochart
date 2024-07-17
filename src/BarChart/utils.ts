import { ChartData } from '../constants';

export const roundMaxValue = (data: ChartData): number => {
    const maxValue = Math.max(...data.map((d) => Math.max(...Object.values(d).filter((v) => typeof v === 'number'))));
    const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)));
    return Math.ceil(maxValue / magnitude) * magnitude;
};

export const parseGap = (gap: string | number, totalSize: number): number => {
    if (typeof gap === 'string' && gap.includes('%')) {
        return (parseFloat(gap) / 100) * totalSize;
    }
    return Number(gap);
};

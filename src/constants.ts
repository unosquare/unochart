export const DEFAULT_WIDTH = 400;
export const DEFAULT_HEIGHT = 300;
export const DEFAULT_MARGIN = 5;
export const DEFAULT_BAR_CATEGORY_GAP = '10%';
export const DEFAULT_BAR_GAP = 4;
export const DEFAULT_LAYOUT: 'horizontal' | 'vertical' = 'horizontal';

export type ChartData = Array<Record<string, any>>;

export const mockData = [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
];

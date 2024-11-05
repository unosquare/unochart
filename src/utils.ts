interface AxisConfig {
    positiveLines: number;
    negativeLines: number;
    totalLines: number;
    positiveRange: number;
    negativeRange: number;
}

export const calculateAxisConfig = (maxValue: number, minValue: number): AxisConfig => {
    const positiveLines = 5;
    const negativeLines = minValue < 0 ? 5 : 0;
    const totalLines = minValue < 0 ? 10 : positiveLines;

    return {
        positiveLines,
        negativeLines,
        totalLines,
        positiveRange: maxValue / positiveLines,
        negativeRange: minValue < 0 ? Math.abs(minValue) / negativeLines : 0,
    };
};

export const formatValue = (value: number): string => (value % 1 === 0 ? value.toString() : value.toFixed(2));

export const findMinValue = (data: Array<{ [key: string]: any }>): number =>
    Math.floor(
        Math.min(...data.map((d) => Math.min(...Object.values(d).map((v) => (typeof v === 'number' ? v : Infinity))))),
    );

export const roundMaxValue = (data: Array<{ [key: string]: any }>): { maxValue: number; minValue: number } => {
    const minValue = findMinValue(data);
    const maxValue = Math.max(
        ...data.map((d) => Math.max(...Object.values(d).map((v) => (typeof v === 'number' ? v : -Infinity)))),
    );

    const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)));
    const factor = maxValue / magnitude;

    let finalMaxValue;
    if (factor <= 1.5) {
        finalMaxValue = 1.5 * magnitude;
    } else if (factor <= 3) {
        finalMaxValue = 3 * magnitude;
    } else if (factor <= 7) {
        finalMaxValue = 7 * magnitude;
    } else {
        finalMaxValue = 10 * magnitude;
    }

    const finalMinValue = minValue < 0 ? -finalMaxValue : 0;

    return {
        maxValue: Math.ceil(finalMaxValue),
        minValue: finalMinValue,
    };
};

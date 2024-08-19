import { ChartData } from '../constants';

export const roundMaxValue = (data: ChartData, stacked: boolean = false): number => {
    let maxValue: number;

    if (stacked) {
        const stackedSums = data.map((d) =>
            Object.values(d).reduce((sum, value) => {
                if (typeof value === 'number') {
                    return sum + value;
                } else if (Array.isArray(value)) {
                    return sum + Math.max(...value); // Sumar el valor máximo del rango
                }
                return sum;
            }, 0),
        );
        maxValue = Math.max(...stackedSums);
    } else {
        maxValue = Math.max(
            ...data.map((d) =>
                Math.max(
                    ...Object.values(d).map((v) => {
                        if (typeof v === 'number') {
                            return v;
                        } else if (Array.isArray(v)) {
                            return Math.max(...v); // Usar el valor máximo del rango
                        }
                        return -Infinity; // Valor por defecto si no es ni número ni array
                    }),
                ),
            ),
        );
    }

    const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)));

    // Ajuste para redondeo más preciso
    const factor = maxValue / magnitude;

    if (factor <= 1.5) {
        maxValue = 1.5 * magnitude;
    } else if (factor <= 3) {
        maxValue = 3 * magnitude;
    } else if (factor <= 7) {
        maxValue = 7 * magnitude;
    } else {
        maxValue = 10 * magnitude;
    }

    return Math.ceil(maxValue);
};

export const parseGap = (gap: string | number, totalSize: number): number => {
    if (typeof gap === 'string' && gap.includes('%')) {
        return (parseFloat(gap) / 100) * totalSize;
    }
    return Number(gap);
};

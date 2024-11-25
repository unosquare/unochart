/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    coverageReporters: ['lcov', 'text'],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'mjs'],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.test.json',
            },
        ],
        '^.+\\.(js|jsx|mjs)$': [
            'babel-jest',
            {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                node: 'current',
                            },
                        },
                    ],
                    '@babel/preset-react',
                ],
            },
        ],
    },
    transformIgnorePatterns: [
        'node_modules/(?!(d3-shape|d3-path|internmap|d3-array|d3-color|d3-interpolate|d3-time|d3-time-format|d3-format|d3-scale)/)',
    ],
    testMatch: ['<rootDir>/src/**/*.spec.tsx', '<rootDir>/src/**/*.test.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest-setup.tsx'],
    moduleNameMapper: {
        '@tremor/react/dist/(.*)$': '<rootDir>/node_modules/@tremor/react/dist/$1.cjs',
    },
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    },
};

import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
    source: {
        entry: {
            index: './samples/index.tsx',
        },
    },
    html: {
        title: 'UnoChart Sample',
    },
    plugins: [pluginReact()],
});

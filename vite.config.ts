import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'GlobalDrag',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['@logicflow/core'],
      output: {
        globals: {
          '@logicflow/core': 'LogicFlow',
        },
      },
    },
  },
  plugins: [vue(), dts({ rollupTypes: true, tsconfigPath: './tsconfig.build.json' })],
});

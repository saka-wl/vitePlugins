
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['./src/index.ts'],
    bundle: true,
    splitting: true,
    outDir: 'dist',
    format: ['cjs', 'esm'],
    dts: true,
    shims: true,
    clean: true
});

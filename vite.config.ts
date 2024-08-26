
import { defineConfig } from "vite";
import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/watermark.ts'),
            name: 'Watermark',
            formats:['cjs', "umd"],
            fileName: 'watermark'
        }
    }
});
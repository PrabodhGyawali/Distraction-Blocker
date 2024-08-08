import { format } from "path";
import { defineConfig } from "vite";

export default defineConfig({
   build: {
    lib: {
        entry: 'scripts/youtube/main.js',
        name: 'MyBundle',
        fileName: (format) => 'yt-bundle.js'
    },
    rollupOptions: {
        output: {
            format: 'iife'
        }
    }
   } 
});
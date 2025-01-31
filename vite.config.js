import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Specify output directory for bundled files
    outDir: 'dist',
    
    // Clean the output directory before building
    emptyOutDir: true,
    
    // Configure the library build
    lib: {
      // Entry point is your main.js file
      entry: resolve(__dirname, 'scripts/youtube/main.js'),
      
      // Name of your library (used for IIFE global variable)
      name: 'YoutubeCleaner',
      
      // Output filename
      fileName: () => 'yt-bundle.js',
    },
    
    // Configure Rollup-specific options
    rollupOptions: {
      output: {
        // Use IIFE format for browser compatibility
        format: 'iife',
        
        // Ensure all imports are bundled into a single file
        inlineDynamicImports: true,
        
        // Prevent code splitting
        manualChunks: undefined,
        
        // Ensure proper global variable name
        extend: true
      }
    },
    
    // Development settings
    minify: process.env.NODE_ENV === 'production', // Only minify in production
    sourcemap: true, // Enable source maps for debugging
  }
});
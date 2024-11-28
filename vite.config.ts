import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/main.tsx',
      name: 'DryEyesAssessment',
      formats: ['iife'],
      fileName: () => 'index.js'
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        assetFileNames: 'index.[ext]'
      },
      external: ['react', 'react-dom'],
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});
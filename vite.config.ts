
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'sonner', '@radix-ui/react-carousel']
  },
  build: {
    // Optimize build output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [/^@radix-ui\//] // Use a regex pattern to match all @radix-ui subpackages
        }
      }
    }
  },
  css: {
    // Optimize CSS
    devSourcemap: false, // Disable sourcemaps in dev for better performance
  },
  // Enhance development experience
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
}));

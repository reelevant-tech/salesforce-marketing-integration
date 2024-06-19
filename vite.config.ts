import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build"
  },
  plugins: [
    react()
  ],
  resolve: {
    // rewrite antd less import to make it work
    alias: [{ find: /^~/, replacement: "" }]
  },
  css: {
    preprocessorOptions: {
      less: {
        // enable javascript within less for some dependencies
        javascriptEnabled: true
      }
    }
  },
  server: {
    port: 8085,
    strictPort: true,
    open: true,
    host: "0.0.0.0"
  }
})

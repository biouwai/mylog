// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 如果需要，可以配置别名
      // '@': '/src'
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
});

// vite.config.js
import { defineConfig } from "file:///home/kavia/workspace/code-generation/note-summary-app-28396-28405/notes_frontend/node_modules/vite/dist/node/index.js";
import blitsVitePlugins from "file:///home/kavia/workspace/code-generation/note-summary-app-28396-28405/notes_frontend/node_modules/@lightningjs/blits/vite/index.js";
var vite_config_default = defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: "/",
    // Set to your base path if you are deploying to a subdirectory (example: /myApp/)
    plugins: [...blitsVitePlugins],
    resolve: {
      mainFields: ["browser", "module", "jsnext:main", "jsnext"]
    },
    server: {
      host: "0.0.0.0",
      allowedHosts: [".kavia.ai"],
      port: 3e3,
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp"
      },
      fs: {
        allow: [".."]
      }
    },
    worker: {
      format: "es"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9rYXZpYS93b3Jrc3BhY2UvY29kZS1nZW5lcmF0aW9uL25vdGUtc3VtbWFyeS1hcHAtMjgzOTYtMjg0MDUvbm90ZXNfZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2thdmlhL3dvcmtzcGFjZS9jb2RlLWdlbmVyYXRpb24vbm90ZS1zdW1tYXJ5LWFwcC0yODM5Ni0yODQwNS9ub3Rlc19mcm9udGVuZC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9rYXZpYS93b3Jrc3BhY2UvY29kZS1nZW5lcmF0aW9uL25vdGUtc3VtbWFyeS1hcHAtMjgzOTYtMjg0MDUvbm90ZXNfZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjsvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlL2NsaWVudFwiIC8+XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgYmxpdHNWaXRlUGx1Z2lucyBmcm9tICdAbGlnaHRuaW5nanMvYmxpdHMvdml0ZSdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUsIHNzckJ1aWxkIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBiYXNlOiAnLycsIC8vIFNldCB0byB5b3VyIGJhc2UgcGF0aCBpZiB5b3UgYXJlIGRlcGxveWluZyB0byBhIHN1YmRpcmVjdG9yeSAoZXhhbXBsZTogL215QXBwLylcbiAgICBwbHVnaW5zOiBbLi4uYmxpdHNWaXRlUGx1Z2luc10sXG4gICAgcmVzb2x2ZToge1xuICAgICAgbWFpbkZpZWxkczogWydicm93c2VyJywgJ21vZHVsZScsICdqc25leHQ6bWFpbicsICdqc25leHQnXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogJzAuMC4wLjAnLFxuICAgICAgYWxsb3dlZEhvc3RzOiBbJy5rYXZpYS5haSddLFxuICAgICAgcG9ydDogMzAwMCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0Nyb3NzLU9yaWdpbi1PcGVuZXItUG9saWN5JzogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgJ0Nyb3NzLU9yaWdpbi1FbWJlZGRlci1Qb2xpY3knOiAncmVxdWlyZS1jb3JwJyxcbiAgICAgIH0sXG4gICAgICBmczoge1xuICAgICAgICBhbGxvdzogWycuLiddLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHdvcmtlcjoge1xuICAgICAgZm9ybWF0OiAnZXMnLFxuICAgIH0sXG4gIH1cbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUdBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sc0JBQXNCO0FBRTdCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxNQUFNLFNBQVMsTUFBTTtBQUMzRCxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUE7QUFBQSxJQUNOLFNBQVMsQ0FBQyxHQUFHLGdCQUFnQjtBQUFBLElBQzdCLFNBQVM7QUFBQSxNQUNQLFlBQVksQ0FBQyxXQUFXLFVBQVUsZUFBZSxRQUFRO0FBQUEsSUFDM0Q7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLGNBQWMsQ0FBQyxXQUFXO0FBQUEsTUFDMUIsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLFFBQ1AsOEJBQThCO0FBQUEsUUFDOUIsZ0NBQWdDO0FBQUEsTUFDbEM7QUFBQSxNQUNBLElBQUk7QUFBQSxRQUNGLE9BQU8sQ0FBQyxJQUFJO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLFFBQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

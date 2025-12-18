import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // 🔥 REQUIRED FOR GITHUB PAGES
  base: "/ShopMatrix/",   // 👈 MUST MATCH YOUR REPO NAME

  server: {
    host: "::",
    port: 5173,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

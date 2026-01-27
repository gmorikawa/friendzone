import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const PORT = 3000;

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
    ],
    preview: {
        port: PORT,
        strictPort: true,
    },
    server: {
        port: PORT,
        strictPort: true,
        host: true,
        origin: `http://0.0.0.0:${PORT}`,
        allowedHosts: [
            "friendzone.gmorikawa.dev"
        ],
    },
});

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/sangiyo/",
	build: {
		target: "es2022",
		rollupOptions: { input: ["src/data.json", "index.html"] },
		sourcemap: true,
	},
})

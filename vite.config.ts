/** @type {import('vite').UserConfig} */
import react from '@vitejs/plugin-react-swc';
import svgr from "vite-plugin-svgr";

export default {
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  build: {
    sourcemap: true,
  },
}

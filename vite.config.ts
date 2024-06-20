/** @type {import('vite').UserConfig} */
import react from '@vitejs/plugin-react-swc';

export default {
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  build: {
    sourcemap: true,
  },
}

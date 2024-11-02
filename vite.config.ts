/** @type {import('vite').UserConfig} */
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { homedir } from 'os';
import { resolve } from 'path';
import fs from 'fs';

const host =
  process.env.NODE_ENV === 'production' ? 'dayredi.com' : 'dayredi.test';

export default {
  plugins: [react(), svgr()],
  base: '/',
  server: detectServerConfig(host),
  test: {
    environment: 'jsdom',
    globals: true,
  },
  build: {
    sourcemap: true,
  },
};

function detectServerConfig(host: string) {
  console.debug('host', host);
  if (host === 'dayredi.test') {
    const keyPath = resolve(
      homedir(),
      `.config/valet/Certificates/${host}.key`,
    );
    const certificatePath = resolve(
      homedir(),
      `.config/valet/Certificates/${host}.crt`,
    );

    if (!fs.existsSync(keyPath)) {
      return {};
    }

    if (!fs.existsSync(certificatePath)) {
      return {};
    }

    return {
      hmr: { host },
      host,
      detectTls: host,
      https: {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certificatePath),
      },
    };
  }
}

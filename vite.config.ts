/** @type {import('vite').UserConfig} */
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { homedir } from 'os';
import { resolve } from 'path';
import fs from 'fs';

// If the env is production, we need to use the production host. Ex: dayredi.com
// If the env is development, we need to use the development host
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

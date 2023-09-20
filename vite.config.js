import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vitePluginRequire from "vite-plugin-react-require"
import requireTransform from 'vite-plugin-require-transform';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginRequire.default(),requireTransform({})],
})

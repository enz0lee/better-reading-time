import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Better Reading Time',
    permissions: ['storage'],
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
})

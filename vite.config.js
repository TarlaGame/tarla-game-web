import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: replace 'your-repo-name' with your actual GitHub repository name
// so that the site assets are served from the correct subpath on GitHub Pages.
export default defineConfig({
  base: '/',
  plugins: [react()]
})

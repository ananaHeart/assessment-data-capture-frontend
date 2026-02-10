import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // <--- Add this line!
  plugins: [react()],
  // --- ADD THIS SERVER OBJECT ---
  server: {
    open: true,
  },
  // -----------------------------
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: "/dictionary",
  	plugins: [react()],
	resolve: {
		alias: [
			{find:'component',replacement:'/src/component'}
		]
	}
})

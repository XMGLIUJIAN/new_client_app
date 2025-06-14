import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssRemToResponsivePixel from 'postcss-rem-to-responsive-pixel'
import postcssWeappTailwindcssRename from 'weapp-tailwindcss-webpack-plugin/postcss'
import vwt from 'weapp-tailwindcss-webpack-plugin/vite'
import uniRouter from 'unplugin-uni-router/vite'

const isH5 = process.env.UNI_PLATFORM === 'h5'
const isApp = process.env.UNI_PLATFORM === 'app'
const weappTailwindcssDisabled = isH5 || isApp

const postcssPlugin = [autoprefixer(), tailwindcss()]
if (!weappTailwindcssDisabled) {
	postcssPlugin.push(
		postcssRemToResponsivePixel({
			rootValue: 32,
			propList: ['*'],
			transformUnit: 'rpx'
		})
	)
	postcssPlugin.push(postcssWeappTailwindcssRename())
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [uni(), uniRouter(), weappTailwindcssDisabled ? undefined : vwt()],
	css: {
		postcss: {
			plugins: postcssPlugin
		}
	},
	server: {
		port: 8090,
		https: true,
		proxy: {
			"/api": {
				target: "https://h5www.ricerich.id/",
				// target: "https://aad7-202-150-3-203.ngrok-free.app/",
				changeOrigin: true,
				secure: true,
				rewrite: (path) => path.replace(/^\/api/, "api")
			},
			"/acts": {
				target: "https://h5www.ricerich.id/",
				changeOrigin: true,
				secure: true,
				rewrite: (path) => path.replace(/^\/api/, "acts")
			},
		}
	}
})

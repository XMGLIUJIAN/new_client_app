import { createSSRApp } from 'vue'
import App from './App.vue'
import plugins from './plugins'
import router from './router'
import './styles/index.scss'
import { setupMixin } from './mixins'
import toastPopup from './components/toastPopup/toastPopup.vue'
export function createApp() {
	const app = createSSRApp(App)
	setupMixin(app)
	app.component('toastPopup',toastPopup)
	app.use(plugins)
	app.use(router)
	return {
		app
	}
}
import { getUserCenter, getUserInfo, getLogCenter } from '@/api/user'
import { TOKEN_KEY } from '@/enums/constantEnums'
import cache from '@/utils/cache'
import { defineStore } from 'pinia'
import { getDeviceInfo } from '@/utils/util'

interface UserSate {
	userInfo : Record<string, any>
	token : string | null
	temToken : string | null
}
export const useUserStore = defineStore({
	id: 'userStore',
	state: () : UserSate => ({
		userInfo: {},
		token: cache.get(TOKEN_KEY) || null,
		temToken: null
	}),
	getters: {
		isLogin: (state) => !!state.token
	},
	actions: {
		async getUser() {
			const data = await getUserCenter({
				token: this.token || this.temToken
			})
			this.userInfo = data
		},
		async getUserInfo() {
			const data = await getUserInfo()
			this.userInfo = data
		},
		async getLogInfo() {
			const system = getDeviceInfo()
			await getLogCenter({loginMac: system.deviceId})
		},
		login(token : string) {
			this.token = token
			cache.set(TOKEN_KEY, token)
		},
		logout() {
			this.token = ''
			this.userInfo = {}
			cache.remove(TOKEN_KEY)
		}
	}
})
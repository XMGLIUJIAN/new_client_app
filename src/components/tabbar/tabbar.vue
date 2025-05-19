<template>
	<u-tabbar v-if="showTabbar" v-model="current" v-bind="tabbarStyle" :list="tabbarList" @change="handleChange"
		:hide-tab-bar="true"></u-tabbar>
</template>

<script lang="ts" setup>
	import { useAppStore } from '@/stores/app'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import { navigateTo } from '@/utils/util'
	import { computed, ref } from 'vue'
	const current = ref()
	const userStore = useUserStore()
	const { isLogin } = storeToRefs(userStore)
	const appStore = useAppStore()
	const tabbarList = computed(() => {
		return appStore.getTabbarConfig
			?.filter((item : any) => item.is_show == 1)
			.map((item : any) => {
				return {
					iconPath: item.unselected,
					selectedIconPath: item.selected,
					text: item.name,
					link: item.link,
					pagePath: item.link.path
				}
			})
	})
	const showTabbar = computed(() => {
		const currentPages = getCurrentPages()
		const currentPage = currentPages[currentPages.length - 1]
		const current = tabbarList.value.findIndex((item : any) => {
			return item.pagePath === '/' + currentPage.route
		})
		return current >= 0
	})

	const tabbarStyle = computed(() => ({
		activeColor: appStore.getStyleConfig.selected_color,
		inactiveColor: appStore.getStyleConfig.default_color
	}))

	const nativeTabbar = [
		'/pages/index/index',
		'/pages/run/run',
		'/pages/activity/activity',
		'/pages/team/team',
		'/pages/user/user'
	]

	// 路由白名单
	const nativeArr = [
		'/pages/index/index',
		'/pages/activity/activity',
		'/pages/user/user',
	]

	const handleChange = (index : number) => {
		const selectTab = tabbarList.value[index]
		const navigateType = nativeTabbar.includes(selectTab.link.path) ? 'switchTab' : 'reLaunch'
		isLogin.value ? navigateTo(selectTab.link, navigateType) : nativeArr.includes(selectTab.link.path) ? navigateTo(selectTab.link, navigateType) : navigateAuth('/pages/login/login')
	}
	const navigateAuth = (url : string) => {
		uni.navigateTo({
			url
		})
	}
</script>
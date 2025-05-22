<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="user">
			<view v-for="(item, index) in state.pages" :key="index">
				<template v-if="item.name == 'user-info'">
					<w-user-info :pageMeta="state.meta" :content="item.content" :styles="item.styles" :user="userInfo"
						:is-login="isLogin" :navColor="navColor" :scrollTop="scrollTop" />
				</template>
				<template v-if="item.name == 'my-service'">
					<w-my-service :content="item.content" :styles="item.styles" :is-login="isLogin" />
				</template>
			</view>
			<tabbar />
		</view>
		<toastPopup></toastPopup>
	</view>

</template>

<script setup lang="ts">
	import { getDecorate } from '@/api/shop'
	import { useUserStore } from '@/stores/user'
	import { onShow, onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { storeToRefs } from 'pinia'
	import { computed, reactive, ref } from 'vue'
	const scrollTop = ref<number>(0)
	const state = reactive<{
		meta : any[]
		pages : any[]
	}>({
		meta: [],
		pages: []
	})
	const getData = async () => {
		const data = await getDecorate({ id: 2 })
		state.meta = JSON.parse(data.meta)
		state.pages = JSON.parse(data.data)
	}
	const userStore = useUserStore()
	const { userInfo, isLogin } = storeToRefs(userStore)
	// 根页面样式
	const pageStyle = computed(() => {
		const { bg_type, bg_color, bg_image } = state.meta[0]?.content ?? {}
		if (bg_type != undefined) {
			return bg_type == 1 ? { 'background-color': bg_color } : { 'background-image': `url(${bg_image})` };
		} else {
			return ""
		}
	})
	const navColor = computed(() => {
		const { text_color } = state.meta[0]?.content ?? {}
		if (text_color == 2) {
			return '#000000';
		} else {
			return '#ffffff'
		}
	})
	onShow(() => {
		getData()
		userStore.getUser()
	})
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page {
		background: #F6F6F6 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.user {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
		}
	}
</style>
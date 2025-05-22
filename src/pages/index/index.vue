<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="415" src="@/static/images/page/indexGroup.png"></u-image>
		</view>
		<view class="index">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="false" :is-fixed="false" height="54" :border-bottom="false"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}">
					<view class="slot-wrap">
						<u-image width="227" height="54" src="@/static/images/icon/logoIcon.png"></u-image>
						<u-image width="50" height="50" src="@/static/images/icon/contact.png"></u-image>
					</view>
				</u-navbar>
			</u-sticky>
			<Notice></Notice>
			<InformasiAset></InformasiAset>
		</view>
		<tabbar />
	</view>
</template>

<script setup lang="ts">
	import { onLoad, onPageScroll } from "@dcloudio/uni-app"
	import { computed, reactive, ref, nextTick } from 'vue'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import InformasiAset from './component/informasiAset.vue'
	import Notice from './component/notice.vue'
	const userStore = useUserStore()
	const { userInfo, isLogin } = storeToRefs(userStore)
	const scrollTop = ref<any>(0)
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
	onLoad(()=>{
		userStore.getUser()
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

		.index {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.slot-wrap {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 0 40rpx;
			}
		}
	}
</style>
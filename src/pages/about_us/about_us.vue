<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="2567" src="@/static/images/page/about_us.png"></u-image>
		</view>
		<view class="rules">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :title-bold="true" title="TENTANG"
					:back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					:title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onPageScroll } from '@dcloudio/uni-app'
	const scrollTop = ref<number>(0)
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page {
		background: #F1F1F1 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.rules {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
		}
	}
</style>
<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="2712" src="@/static/images/page/team_rule.png"></u-image>
		</view>
		<view class="rules">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :title-bold="true" title="ATURAN TIM"
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
		background: #F0F0F0 !important;
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
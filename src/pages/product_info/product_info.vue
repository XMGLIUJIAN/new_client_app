<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="product_info">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false"
					 back-icon-color="#FFFFFF"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" title-color="#FFFFFF">
				</u-navbar>
			</u-sticky>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { formatNumber } from '@/utils/util'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	const scrollTop = ref<number>(0)
	const type = ref<number>(1)
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url: url
		})
	}
	onLoad((option)=>{
		type.value = option.type
	})
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page{
		background: #F0F0F0 !important;
	}
</style>
<style lang="scss" scoped>
	.container{
		position: relative;
		.product_info{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
		}
	}
</style>
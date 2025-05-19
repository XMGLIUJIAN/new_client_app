<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="498" src="@/static/images/pageStyle/imageGroupFour.png"></u-image>
		</view>
		<view class="rules">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :title-bold="true" title="TENTANG"
					back-icon-color="#1E1E1E" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="swiper mt-[40rpx] mx-[40rpx]" v-if="swiperArr.length">
				<u-swiper border-radius="20" height="385" :indicator-dots="swiperArr.length > 1" :list="swiperArr" mode="rect"
					indicator-pos="bottomRight"></u-swiper>
			</view>
			<view class="rule_con mt-[40rpx] pb-[40rpx] px-[40rpx]">
				<rich-text class="rich_text" :nodes="parseContent"></rich-text>
			</view>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { formatRichText } from '@/utils/util'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { aboutUsInfo } from '@/api/rule'
	const scrollTop = ref<number>(0)
	const parseContent = ref<String>('')
	const swiperArr = ref<Array<String | any>>([])
	const getdata = async () => {
		const data = await aboutUsInfo()
		parseContent.value = formatRichText(data.content) || data.content
		swiperArr.value = data.img_url
	}
	onLoad(() => {
		getdata()
	})
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page {
		background: #FFFFFF !important;
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
		.rich_text{
			word-break:break-all;
		}
	}
</style>
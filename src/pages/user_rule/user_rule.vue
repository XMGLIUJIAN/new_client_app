<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="498" src="@/static/images/pageStyle/imageGroupFive.png"></u-image>
		</view>
		<view class="rule">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :title-bold="true"
					:title="navBarTitle" back-icon-color="#1E1E1E"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="swiper mt-[40rpx] mx-[40rpx]" v-if="swiperArr.length">
				<u-swiper border-radius="20" height="385" :indicator-dots="swiperArr.length > 1" :list="swiperArr" mode="rect"
					indicator-pos="bottomRight"></u-swiper>
			</view>
			<view class="rule_con pt-[40rpx] pb-[40rpx] px-[40rpx]">
				<rich-text class="rich_text" :nodes="parseContent"></rich-text>
			</view>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { formatRichText } from '@/utils/util'
	import { investRuleInfo } from '@/api/rule'
	const navBarTitle = ref<String>('')
	const parseContent = ref<String>('')
	const scrollTop = ref<number>(0)
	const swiperArr = ref<Array<String | any>>([])
	const setNavBarTitle = (type : String) => {
		switch (type) {
			case "points":
				navBarTitle.value = 'ATURAN INVESTASI'
				getdata(6)
				break;
			case "exchange":
				navBarTitle.value = 'ATURAN PERTUKARAN'
				getdata(5)
				break;
			case "withdrawal":
				navBarTitle.value = 'ATURAN PENARIKAN'
				getdata(4)
				break;
		}
	}
	const getdata = async (active: Number | String) => {
		const data = await investRuleInfo({type: active})
		parseContent.value = formatRichText(data.content) || data.content
		swiperArr.value = data.img_url
	}
	onLoad((options : any) => {
		let type = options.type
		setNavBarTitle(type)
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

		.rule {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.rule_con {
				.rule_title {
					margin-bottom: 20rpx;
					font-family:  Arial;
					font-size: 32rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: left;
					color: #1E1E1E;
				}
				.rich_text{
					word-break:break-all;
				}
			}
		}
	}
</style>
<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="498" src="@/static/images/pageStyle/imageGroupFour.png"></u-image>
		</view>
		<view class="rules">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :title-bold="true" title="PERATURAN"
					back-icon-color="#1E1E1E" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="swiper mt-[40rpx] mx-[40rpx]">
				<u-swiper border-radius="20" height="385" :indicator-dots="swiperArr.length > 1" :list="swiperArr" mode="rect"
					indicator-pos="bottomRight"></u-swiper>
			</view>
			<view class="tabs_content mt-[20rpx] mb-[20rpx] mx-[40rpx]">
				<view class="tab_name" v-for="(item, index) in list" :key="index" @tap="change(item)">
					<view class="tab_title" :style="{color: item.type == active ? '#0067E0' : '#86A0C2'}">
						{{item.name}}
					</view>
				</view>
				<view class="tab_bottom"
					:style="{left: active == 1 ? '14%' :active == 2 ? '47%' :active == 3 ? '80%' : '100%'}">
				</view>
			</view>
			<view class="rule_con pb-[40rpx] px-[40rpx]">
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
	import { investRuleInfo } from '@/api/rule'
	const scrollTop = ref<number>(0)
	const parseContent = ref<String>('')
	const active = ref<Number | String>(1)
	const swiperArr = ref<Array<String | any>>([])
	const list = ref<Array<String | any>>([
		{type: 1,name: 'Investasi'},
		{type: 2,name: 'Undang'},
		{type: 3,name: 'Tim'},
	])
	const change = (row : any) => {
		active.value = row.type;
		getdata(row.type)
	}
	const getdata = async (active: Number | String) => {
		const data = await investRuleInfo({type: active})
		parseContent.value = formatRichText(data.content) || data.content
		swiperArr.value = data.img_url
	}
	onLoad((options : any) => {
		active.value = options.active || 1
		getdata(active.value)
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

			.tabs_content {
				display: flex;
				justify-content: space-between;
				text-align: center;
				padding: 20rpx 0;
				position: relative;
				background-color: #FFFFFF;

				.tab_name {
					flex: 1;

					.tab_title {
						font-family:  Arial;
						font-size: 32rpx;
						font-weight: 700;
						line-height: 48rpx;
						text-align: center;
					}
				}

				.tab_bottom {
					width: 40rpx;
					height: 5rpx;
					background: #0067E0;
					border-radius: 2.5rpx;
					position: absolute;
					bottom: 10rpx;
					transition: all 0.5s;
				}
			}
			.rich_text{
				word-break:break-all;
			}
		}
	}
</style>
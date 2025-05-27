<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="parse">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :title-bold="true"
					title="DETAIL PESAN" back-icon-color="#1E1E1E"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="swiper mt-[40rpx] mx-[40rpx]" v-if="swiperArr.length">
				<u-swiper border-radius="20" :indicator-dots="swiperArr.length > 1" height="385"  :list="swiperArr" mode="rect"
					indicator-pos="bottomRight"></u-swiper>
			</view>
			<view class="parse_con pt-[40rpx] pb-[40rpx] px-[40rpx]">
				<view class="parse_title">{{messageInfo.title}}</view>
				<view class="parse_info">
					<view class="info_name">{{messageInfo.subtitle}}</view>
					<view class="info_time">{{messageInfo.create_time}}</view>
				</view>
				<rich-text class="rich_text" :nodes="formatRichText(messageInfo.content) || messageInfo.content"></rich-text>
			</view>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { mesNotifiInfo } from '@/api/eventInfo'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { formatRichText } from '@/utils/util'
	const messageInfo = ref<any>({})
	const message_id = ref<Number>(0)
	const scrollTop = ref<number>(0)
	const swiperArr = ref<Array<String | any>>([])
	const parseContent = ref<String>('')
	const getdata = async () => {
		const data = await mesNotifiInfo({id: message_id.value})
		messageInfo.value = data
		swiperArr.value = data.img_url
	}
	onLoad((options: any) => {
		message_id.value = options.message_id
		getdata()
	})
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

		.parse {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.parse_con {
				.parse_title {
					font-family:  Arial;
					font-size: 40rpx;
					font-weight: 700;
					line-height: 60rpx;
					text-align: left;
					color: #1E1E1E;
				}

				.parse_info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 40rpx 0;

					.info_name {
						font-family:  Arial;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #999999;
					}

					.info_time {
						font-family:  Arial;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: right;
						color: #999999;
					}
				}
				.rich_text{
					word-break:break-all;
				}
			}
		}
	}
</style>
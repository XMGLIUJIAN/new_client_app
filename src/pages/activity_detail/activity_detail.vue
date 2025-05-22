<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="activity_detail">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :title-bold="true"
					title="INFORMASI PERISTIWA" back-icon-color="#1E1E1E"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="activity_con pt-[40rpx] pb-[40rpx] px-[40rpx]">
				<view class="activity_card mb-[20rpx]">
					<view class="activity_title">{{parseInfo.title}}</view>
					<view class="activity_info">
						<view class="info_name">{{parseInfo.author}}</view>
						<view class="info_time">{{parseInfo.create_time}}</view>
					</view>
				</view>
				<view class="activity_offer">{{parseInfo.summary}}</view>
				<rich-text class="rich_text" :nodes="formatRichText(parseInfo.content) || parseInfo.content"></rich-text>
			</view>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { formatRichText } from '@/utils/util'
	import { eventInfo } from '@/api/eventInfo'
	const scrollTop = ref<number>(0)
	const parseInfo = ref<any>({})
	const getdata = async (activity_id: String | Number) => {
		parseInfo.value =  await eventInfo({id: activity_id})
	}
	onLoad((options: any) => {
		getdata(options.activity_id)
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

		.activity_detail {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.activity_con {
				.activity_card {
					padding: 40rpx;
					background: #FFFFFF;
					box-shadow: 0  0 2rpx 0 #999999;
					border-radius: 18rpx;
					.activity_title {
						font-family:  Arial;
						font-size: 40rpx;
						font-weight: 700;
						line-height: 48rpx;
						text-align: left;
						color: #1E1E1E;
					}

					.activity_info {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 20rpx;

						.info_name {
							font-family:  Arial;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 48rpx;
							text-align: left;
							color: #999999;
						}

						.info_time {
							font-family:  Arial;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 48rpx;
							text-align: right;
							color: #999999;
						}
					}
				}


				.activity_offer {
					margin-bottom: 40rpx;
					padding: 24rpx;
					border-radius: 12rpx;
					background: #FFDFCD;
					font-family:  Arial;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 48rpx;
					text-align: left;
					color: #FF8138;
				}
				.rich_text{
					word-break:break-all;
				}
			}
		}
	}
</style>
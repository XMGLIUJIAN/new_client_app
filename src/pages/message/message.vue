<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="message">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :title-bold="true"
					title="PESAN PEMBERITAHUAN" back-icon-color="#1E1E1E"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="message_con pt-[20rpx] pb-[20rpx] px-[40rpx]">
				<view class="message_card" v-for="(item,index) in messageArr" :key="index"
					@tap="navigateTo('/pages/message/detail?type='+ item.type)">
					<view class="message_info">
						<u-image width="100" height="100" :src="item.icon" alt="" />
						<view class="card_info">
							<view class="card_left">
								<view class="card_title">{{item.title}}</view>
								<view class="card_text">{{item.subtitle}}</view>
								<view class="card_time">{{item.create_time}}</view>
							</view>
							<view class="card_right">
								<u-badge :absolute="false" bg-color="#EF0000" :overflow-count="99"
									:count="item.number"></u-badge>
							</view>
						</view>
					</view>
				</view>
				<view class="empty mt-[50rpx]" v-if="!messageArr.length">
					<u-empty text="Tidak ada kabar" mode="data" icon-color="#999999" color="#999999"></u-empty>
				</view>
			</view>
			<toastPopup></toastPopup>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { mesNotifiConf } from '@/api/eventInfo'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	const messageArr = ref<Array<any>>([])
	const scrollTop = ref<number>(0)
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url: url
		})
	}
	const getlist = async () => {
		const data = await mesNotifiConf()
		messageArr.value = data.lists
	}
	onLoad(() => {
		getlist()
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

		.message {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.message_con {
				.message_card {

					margin-bottom: 20rpx;
					padding: 20rpx;
					border-radius: 12rpx;
					background: #FFFFFF;

					.message_info {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						.card_info {
							display: flex;
							justify-content: space-between;
							margin-left: 20rpx;
							width: 80%;
							.card_left{
								.card_title {
									font-family:  Arial;
									font-size: 30rpx;
									font-weight: 700;
									line-height: 48rpx;
									text-align: left;
									color: #1E1E1E;
								}
								
								.card_text {
									font-family:  Arial;
									font-size: 24rpx;
									font-weight: 500;
									line-height: 40rpx;
									text-align: left;
									color: #999999;
								}
								.card_time {
									font-family:  Arial;
									font-size: 24rpx;
									font-weight: 500;
									line-height: 48rpx;
									text-align: left;
									color: #999999;
								}
							}
							.card_right {
								display: flex;
								flex-direction: column;
								justify-content: flex-end;
								align-items: center;
							}
						}
					}
				}
			}
		}
	}
</style>
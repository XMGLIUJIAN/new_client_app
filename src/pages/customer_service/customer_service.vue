<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="498" src="@/static/images/pageStyle/imageGroupFour.png"></u-image>
		</view>
		<view class="customer_service">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="CUSTOMER SERVICE" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="service_con">
				<view class="service_label">
					<view class="service_info">
						<u-image width="78" height="78" src="@/static/images/icon/whatsapp.png" alt="" />
						<view class="customer_info">
							<view class="customer_title">customer service</view>
							<view class="customer_text">WhatsApp Customer Service</view>
						</view>
					</view>
					<view class="connect" @tap="connect(serviceInfo.whatsapp)">Hubungi</view>
				</view>
				<view class="service_label">
					<view class="service_info">
						<u-image width="78" height="78" src="@/static/images/icon/telegram.png" alt="" />
						<view class="customer_info">
							<view class="customer_title">customer service</view>
							<view class="customer_text">Telegram Customer Service</view>
						</view>
					</view>
					<view class="connect" @tap="connect(serviceInfo.telegram)">Hubungi</view>
				</view>
			</view>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { customerServiceInfo } from '@/api/eventInfo'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { emitter } from '@/utils/emitter';
	const serviceInfo = ref<any>({})
	const scrollTop = ref<number>(0)
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const getInfo = async () => {
		const resdata = await customerServiceInfo()
		serviceInfo.value = resdata.data
		emitter.emit('gifType',{type: 1})
	}
	const connect = (link: any) => {
		// #ifdef APP
		plus.runtime.openURL(link)
		// #endif
		// #ifdef H5
		window.location.href = link
		// #endif
	}
	onLoad(() => {
		getInfo()
	})
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
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

		.customer_service {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.service_con {
				padding: 40rpx;

				.service_label {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20rpx;
					padding: 20rpx;
					border-radius: 24rpx;
					background: #FFFFFF;

					.service_info {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.customer_info {
							margin-left: 20rpx;

							.customer_title {
								margin-bottom: 10rpx;
								font-family:  Arial;
								font-size: 32rpx;
								font-weight: 700;
								line-height: 48rpx;
								text-align: left;
								color: #1E1E1E;
							}

							.customer_text {
								font-family:  Arial;
								font-size: 24rpx;
								font-weight: 400;
								line-height: 35rpx;
								text-align: left;
								color: #999999;
							}
						}
					}

					.connect {
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 12rpx 24rpx;
						border-radius: 10rpx;
						background: linear-gradient(270deg, #5693FF 0%, #0067E0 100%);
						font-family:  Arial;
						font-size: 30rpx;
						font-weight: 700;
						line-height: 45rpx;
						text-align: center;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
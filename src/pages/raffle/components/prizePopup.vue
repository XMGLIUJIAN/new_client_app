<template>
	<view class="popup">
		<view class="content">
			<view class="prize">
				<u-image width="572" height="680" src="@/static/images/raffle/raffle_prize.png"></u-image>
				<view class="core_area">
					<view class="title">
						<u-image width="288" height="77" src="@/static/images/raffle/Selamat.png"></u-image>
					</view>
					<view class="prize_box">
						<view class="prize_image">
							<u-image width="100" height="100" :src="prizeValue.prizeImage"></u-image>
						</view>
					</view>
					<view class="prize_title">{{prizeValue.prizeName}}</view>
					<view class="prize_txt">Hubungi Layanan Pelanggan untuk Klaim Sekarang!</view>
					<view class="prize_btn" @tap="confirmPopup">
						<u-image width="366" height="108" src="@/static/images/raffle/prize_btn.png"></u-image>
					</view>
				</view>
				<view class="cancel_btn" @tap="cancelPopup">
					<u-image width="68" height="68" src="@/static/images/raffle/cancel_btn.png"></u-image>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { formatNumber } from '@/utils/util'
	const props = defineProps({
		prizeValue: {
			type: Object,
			default: () => { }
		}
	})
	const emit = defineEmits(['confirm', 'cancel'])
	const confirmPopup = () => {
		emit('confirm')
	}
	const cancelPopup = () => {
		emit('cancel')
	}
</script>

<style lang="scss" scoped>
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		z-index: 999;

		.content {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;

			.prize {
				position: relative;
				width: 572rpx;
				border-radius: 20rpx;
				background: #FFFFFF;

				.core_area {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					padding: 40rpx;

					.title {
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.prize_box {
						display: flex;
						justify-content: center;
						align-items: center;
						margin: 40rpx 0;

						.prize_image {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 180rpx;
							height: 180rpx;
							background: linear-gradient(180deg, #FFFFFF 0%, #FFEDC4 100%);
							border: 2rpx solid #FFFFFF;
							border-radius: 10rpx;
						}
					}

					.prize_title {
						padding-top: 20rpx;
						font-family: Source Han Sans CN;
						font-weight: 700;
						font-size: 32rpx;
						line-height: 54rpx;
						text-align: center;
						color: #FFFFFF;
					}

					.prize_txt {
						font-family: Source Han Sans CN;
						font-weight: 400;
						font-size: 20rpx;
						line-height: 48rpx;
						text-align: center;
						color: #A0B2A2;
					}

					.prize_btn {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 20rpx;
					}
				}

				.cancel_btn {
					position: absolute;
					bottom: -100rpx;
					left: 50%;
					transform: translate(-50%, 0);
				}
			}
		}
	}
</style>
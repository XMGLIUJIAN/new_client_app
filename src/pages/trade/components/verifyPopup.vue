<template>
	<view class="popup">
		<view class="content">
			<view class="verify px-[40rpx] pt-[40rpx] pb-[40rpx]">
				<view class="tips mb-[40rpx]">Tips Transfer</view>
				<view class="explain">
					<text class="explain_text">Apakah Anda ingin mentransfer</text>
					<text class="explain_title">Saldo {{type}}</text>
				</view>
				<view class="info">
					<text class="number">{{formatNumber(number)}}</text>
					<text class="give">ke akun</text>
					<text class="account">{{userInfo.mobile}}</text>
				</view>
				<view class="user_info">
					<u-avatar :src="userInfo.avatar" :size="120"></u-avatar>
					<view class="nickname">{{userInfo.nickname}}</view>
				</view>
				<view class="btn mt-[50rpx]">
					<view class="confirm" @tap="Confirm">Konfirmasi</view>
					<view class="cancel" @tap="Cancel">Batal</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { formatNumber } from '@/utils/util'
	const emit = defineEmits(['confirm','cancel'])
	const props = defineProps({
		userInfo: {
			type: Object,
			default: () => {}  // 交易确认 success 交易成功 lose
		},
		type:{
			type: String,
			default: ''
		},
		number:{
			type: [Number,String],
			default: 0
		}
	})
	const Confirm = () => {
		emit('confirm')
	}
	const Cancel = () => {
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

			.verify {
				width: 586rpx;
				border-radius: 20rpx;
				background: linear-gradient(180deg, #EBF4FF 0%, #FFFFFF 100%);

				.tips {
					font-family:  Arial;
					font-size: 34rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: center;
					color: #333333;
				}

				.explain {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-family:  Arial;
					font-size: 24rpx;
					font-weight: 400;
					line-height: 48rpx;
					text-align: left;

					.explain_text {
						text-align: left;
						color: #666666;
					}

					.explain_title {
						text-align: right;
						color: #333333;
					}
				}

				.info {
					display: flex;
					justify-content: center;
					align-items: center;

					.number {
						font-family:  Arial;
						font-size: 36rpx;
						font-weight: 700;
						line-height: 48rpx;
						text-align: left;
						color: #1E4B2E;
					}

					.give {
						margin: 0 10rpx;
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 400;
						line-height: 48rpx;
						text-align: left;
						color: #999999;
					}

					.account {
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 700;
						line-height: 48rpx;
						text-align: left;
						color: #333333;
					}
				}
				.user_info{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-top: 20rpx;
					.nickname{
						margin-top: 20rpx;
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 600;
						line-height: 48rpx;
						text-align: left;
						color: #666666;
					}
				}
				.btn {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.confirm {
						width: 242rpx;
						height: 80rpx;
						border-radius: 12rpx;
						background: #81AF95;
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 80rpx;
						text-align: center;
						color: #FFFFFF;
					}

					.cancel {
						width: 242rpx;
						height: 80rpx;
						border-radius: 12rpx;
						background: #C3C6CB;
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 80rpx;
						text-align: center;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
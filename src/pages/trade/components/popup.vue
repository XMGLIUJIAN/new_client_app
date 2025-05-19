<template>
	<view class="popup">
		<view class="content">
			<view class="success px-[40rpx] pt-[40rpx] pb-[40rpx]" v-if="tradeType == 'success'">
				<view class="tips mb-[40rpx]">Pemberitahuan</view>
				<view class="status">
					<u-image width="140" height="140" src="@/static/images/icon/success.png" alt="" />
				</view>
				<view class="explain">Transfer transaction successful</view>
				<view class="btn mt-[20rpx]" @tap="confirm">Konfirmasi</view>
			</view>
			<view class="lose px-[40rpx] pt-[40rpx] pb-[40rpx]" v-if="tradeType == 'lose'">
				<view class="tips mb-[40rpx]">Pemberitahuan</view>
				<view class="status">
					<u-image width="140" height="140" src="@/static/images/icon/lose.png" alt="" />
				</view>
				<view class="explain">{{msg}}</view>
				<view class="btn mt-[20rpx]" @tap="cancel">Batal</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	const emit = defineEmits(['confirm','cancel'])
	const props = defineProps({
		tradeType: {
			type: String,
			default: 'verify'  // verify 交易确认 success 交易成功 lose
		},
		msg:{
			type: String,
			default: 'Transfer transaction failed'
		}
	})
	const confirm = () => {
		emit('confirm')
	}
	const cancel = () => {
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

			.success {
				width: 586rpx;
				border-radius: 20rpx;
				background: #FFFFFF;

				.tips {
					font-family:  Arial;
					font-size: 34rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: center;
					color: #333333;
				}
				.status{
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.explain{
					font-family:  Arial;
					font-size: 28rpx;
					font-weight: 400;
					line-height: 48rpx;
					text-align: center;
					color: #666666;
				}
				.btn{
					height: 80rpx;
					border-radius: 12rpx;
					background: #0067E0;
					font-family:  Arial;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 80rpx;
					color: #FFFFFF;
					text-align: center;
				}
			}

			.lose {
				width: 586rpx;
				border-radius: 20rpx;
				background: #FFFFFF;

				.tips {
					font-family:  Arial;
					font-size: 34rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: center;
					color: #333333;
				}
				.status{
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.explain{
					font-family:  Arial;
					font-size: 28rpx;
					font-weight: 400;
					line-height: 48rpx;
					text-align: center;
					color: #EF0000;
				}
				.btn{
					height: 80rpx;
					border-radius: 12rpx;
					background: #0067E0;
					font-family:  Arial;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 80rpx;
					color: #FFFFFF;
					text-align: center;
				}
			}
		}
	}
</style>
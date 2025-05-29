<template>
	<view class="popup">
		<view class="content">
			<view class="verify px-[40rpx] pt-[40rpx] pb-[40rpx]">
				<view class="tips mb-[40rpx]">Pemberitahuan</view>
				<view class="explain">
					<text class="explain_text">Apakah Anda yakin ingin keluar dari akun ini?</text>
				</view>
				<view class="btn mt-[50rpx]">
					<view class="confirm" @tap="confirmPopup">Konfirmasi</view>
					<view class="cancel" @tap="cancelPopup">Batal</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	const emit = defineEmits(['confirm', 'cancel']);
	const confirmPopup = () => {
		emit('confirm',false);
	}
	const cancelPopup = () => {
		emit('cancel',false);
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
				background: #FFFFFF;

				.tips {
					font-family:  Arial;
					font-size: 32rpx;
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
						color: #8B9098;
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
						background: #458060;
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
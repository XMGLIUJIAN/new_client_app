<template>
	<view class="popup">
		<view class="content">
			<view class="lose px-[20rpx] pt-[20rpx] pb-[20rpx]">
				<view class="tips mb-[40rpx]">Pemberitahuan</view>
				<view class="explain">
					<text>Masukkan Silahkan baca dan setuju</text>
				</view>
				<view class="explain">
					<router-navigate to="/pages/agreement/agreement?type=service">
						<text class="agreement">《Ketentuan layanan》</text>
					</router-navigate>
					<text>dan</text>
					<router-navigate to="/pages/agreement/agreement?type=privacy">
						<text class="agreement">《kebijakan Privasi》</text>
					</router-navigate>
				</view>
				<view class="btn mt-[50rpx]">
					<view class="confirm" @tap="confirmPopup">Konfirmasi</view>
					<view class="cancel" @tap="CancelPopup">Batal</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	const emit = defineEmits(['confirm', 'cancel'])
	
	const confirmPopup = () => {
		emit('confirm', false)
	}
	const CancelPopup = () => {
		emit('cancel', false)
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

			.lose {
				width: 640rpx;
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

				.status {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.explain {
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					font-family:  Arial;
					font-size: 24rpx;
					font-weight: 400;
					line-height: 48rpx;
					text-align: center;
					color: #1E1E1E;
					.agreement {
						color: #0067E0;
					}
				}
				
				.btn {
					display: flex;
					justify-content: space-between;
					align-items: center;
				
					.confirm {
						width: 250rpx;
						height: 80rpx;
						border-radius: 12rpx;
						background: #0067E0;
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 80rpx;
						text-align: center;
						color: #FFFFFF;
					}
				
					.cancel {
						width: 250rpx;
						height: 80rpx;
						border-radius: 12rpx;
						background: #E9E9E9;
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 80rpx;
						text-align: center;
						color: #333333;
					}
				}
			}
		}
	}
</style>
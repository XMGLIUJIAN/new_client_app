<template>
	<view class="popup">
		<view class="content">
			<view class="wait">
				<view class="status">
					<u-image width="413" height="356" src="@/static/images/product/wait.png"></u-image>
				</view>
				<view class="explain">
					<view class="explain_text">
						Kontrak ini hanya bisa dimiliki satu.
					</view>
					<view class="explain_text">
						Silakan cek kontrak lain.
					</view>
				</view>
				<view class="status mb-[20rpx]">
					<u-image width="80" height="80" src="@/static/images/product/hourglass.png"></u-image>
				</view>
				<view class="btn" @tap="cancelPopup">Saya Mengerti</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
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
		background: rgba(0, 0, 0, 0.6);
		z-index: 999;

		.content {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;

			.wait {
				position: relative;
				width: 575rpx;
				padding: 0 30rpx 50rpx 30rpx;
				background: #FFFFFF;
				border-radius: 12rpx;

				.tips {
					font-family: Arial;
					font-weight: 700;
					font-size: 36rpx;
					text-align: center;
					line-height: 48rpx;
					color: #1E4B2E;
				}

				.status {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.explain{
					.explain_text{
						font-family: Arial;
						font-weight: 700;
						font-size: 28rpx;
						line-height: 40rpx;
						text-align: center;
						color: #458060;
					}
				}

				.btn {
					height: 60rpx;
					border-radius: 12rpx;
					background: #458060;
					font-family: Arial;
					font-weight: 400;
					font-size: 32rpx;
					text-align: center;
					line-height: 60rpx;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
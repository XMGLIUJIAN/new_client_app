<template>
	<view class="popup">
		<view class="content">
			<view class="lose px-[40rpx] pt-[40rpx] pb-[40rpx]">
				<view class="tips mb-[40rpx]">Pemberitahuan</view>
				<view class="explain">Pengguna saat ini belum terdaftar, sedang menuju pendaftaran</view>
				<view class="btn mt-[50rpx]">
					<view class="confirm" @tap="confirmPopup">Konfirmasi</view>
					<view class="cancel" @tap="cancelPopup">Batal</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	const props = defineProps({
		msg: {
			type: String,
			default: ''  // success
		},
	})
	const emit = defineEmits(['confirm','cancel'])
	
	const confirmPopup = () => {
		emit('confirm');
	}
	const cancelPopup = () => {
		emit('cancel', false);
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
				width: 580rpx;
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
				.explain{
					font-family:  Arial;
					font-size: 24rpx;
					font-weight: 400;
					line-height: 48rpx;
					text-align: center;
					color: #8B9098;
				}
				.btn {
					display: flex;
					justify-content: center;
					align-items: center;
					.confirm {
						margin: 0 20rpx;
						width: 200rpx;
						height: 72rpx;
						border-radius: 12rpx;
						background: #81AF95;
						font-family:  Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 72rpx;
						text-align: center;
						color: #FFFFFF;
					}
				
					.cancel {
						margin: 0 20rpx;
						width: 200rpx;
						height: 72rpx;
						border-radius: 12rpx;
						background: #C3C6CB;
						font-family:  Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 72rpx;
						text-align: center;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
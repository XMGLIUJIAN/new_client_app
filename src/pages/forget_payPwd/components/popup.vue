<template>
	<view class="popup">
		<view class="content">
			<view class="lose px-[40rpx] pt-[40rpx] pb-[40rpx]">
				<view class="tips mb-[40rpx]">Pemberitahuan</view>
				<view class="explain">{{message}}</view>
				<view class="btn mt-[20rpx]" @tap="confirmPopup">Konfirmasi</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	const emit = defineEmits(['confirm']);
	const props = defineProps({
		message:{
			type: String,
			default: ''
		}
	})
	const confirmPopup = () => {
		emit('confirm',false);
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
					color: #1E1E1E;
				}
				.btn{
					height: 80rpx;
					border-radius: 12rpx;
					background: #E9E9E9;
					font-family:  Arial;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 80rpx;
					color: #1E1E1E;
					text-align: center;
				}
			}
		}
	}
</style>
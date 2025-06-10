<template>
	<view class="popup">
		<view class="content">
			<view class="lose">
				<view class="tips mb-[20rpx]">Investasi Gagal</view>
				<view class="explain mb-[40rpx]">
					<u-image width="443" height="358" src="@/static/images/product/lose.png"></u-image>
				</view>
				<view class="btn" @tap="cancelPopup">Batal</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	const emit = defineEmits(['confirm','cancel'])
	const cancelPopup = () => {
		emit('cancel')
	}
</script>

<style lang="scss" scoped>
	.popup{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.6);
		z-index: 999;
		.content{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			.lose{
				position: relative;
				width: 572rpx;
				padding: 20rpx;
				background: #FFFFFF;
				border-radius: 12rpx;
				.tips{
					font-family: Arial;
					font-weight: 700;
					font-size: 36rpx;
					text-align: center;
					line-height: 48rpx;
					color: #1E4B2E;
				}
				.explain{
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.btn{
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
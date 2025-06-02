<template>
	<view class="popup">
		<view class="content">
			<view class="prize" @tap="confirmPopup">
				<u-image width="572" height="844" src="@/static/images/raffle/raffle_prizePopup.png"></u-image>
				<view class="cancel_btn" @tap="cancelPopup">
					<u-image width="68" height="68" src="@/static/images/raffle/cancel_btn.png"></u-image>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	const emit = defineEmits(['confirm','cancel'])
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

			.prize {
				position: relative;
				width: 677rpx;
				border-radius: 20rpx;

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
<template>
	<view class="popup">
		<view class="content">
			<view class="prize" @tap="confirmPopup">
				<u-image width="624" height="1048" src="@/static/images/page/infoGroup.png"></u-image>
				<view class="cancel_btn" @tap="cancelPopup"></view>
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
				width: 624rpx;
				border-radius: 20rpx;

				.cancel_btn {
					position: absolute;
					bottom: 95rpx;
					left: 50%;
					width: 528rpx;
					height: 72rpx;
					transform: translate(-50%, 0);
				}
			}
		}
	}
</style>
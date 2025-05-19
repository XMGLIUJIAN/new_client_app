<template>
	<view class="popup" @tap="cancelPopup">
		<view class="content">
			<view class="contact">
				<view class="service_head">Hubungi Customer Service</view>
				<view class="service_label" @tap="confirmPopup(service.whatsapp)">
					<view class="service_info">
						<u-image width="50" height="50" src="@/static/images/icon/whatsapp.png" alt="" />
						<view class="service_name">WhatsApp service</view>
					</view>
					<u-icon name="arrow-right" color="#1E1E1E" size="28"></u-icon>
				</view>
				<view class="service_label" @tap="confirmPopup(service.telegram)">
					<view class="service_info">
						<u-image width="50" height="50" src="@/static/images/icon/telegram.png" alt="" />
						<view class="service_name">Telegram service</view>
					</view>
					<u-icon name="arrow-right" color="#1E1E1E" size="28"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	const props = defineProps({
		service:{
			type: Object,
			default: () => {}
		}
	})
	const emit = defineEmits(['confirm', 'cancel']);
	const confirmPopup = (link: string) => {
		emit('confirm', link);
	}
	const cancelPopup = () => {
		emit('cancel');
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
			.contact{
				width: 586rpx;
				padding: 40rpx;
				border-radius: 20rpx;
				background: linear-gradient(180deg, #AACCFF 0%, #E7F1FF 100%);
				.service_head{
					margin-bottom: 40rpx;
					font-family:  Arial;
					font-size: 34rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: center;
					color: #333333;
				}
				.service_label{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					padding: 20rpx 40rpx;
					border-radius: 24rpx;
					background: #F4F7FD;
					.service_info{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.service_name{
							margin-left: 20rpx;
							font-family:  Arial;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 45rpx;
							text-align: left;
							color: #1E1E1E;
						}
					}
				}
			}
		}
	}
</style>
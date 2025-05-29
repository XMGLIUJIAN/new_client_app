<template>
	<view class="popup" @tap="cancelPopup">
		<view class="content">
			<view class="contact">
				<view class="service_customer">
					<u-image width="76" height="76" src="@/static/images/icon/customer.png" alt="" />
				</view>
				<view class="service_head">Customer Service</view>
				<view class="service_tip">Bagaimana kami bisa membantumu</view>
				<view class="service_label" @tap="confirmPopup(service.whatsapp)">
					<view class="service_info">
						<u-image width="50" height="50" src="@/static/images/icon/whatsapp.png" alt="" />
						<view class="service_name">WhatsApp</view>
					</view>
					<u-icon name="arrow-right" color="#FFFFFF" size="24"></u-icon>
				</view>
				<view class="service_label" @tap="confirmPopup(service.telegram)">
					<view class="service_info">
						<u-image width="50" height="50" src="@/static/images/icon/telegram.png" alt="" />
						<view class="service_name">Telegram</view>
					</view>
					<u-icon name="arrow-right" color="#FFFFFF" size="24"></u-icon>
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
				width: 480rpx;
				padding: 40rpx;
				border-radius: 12rpx;
				background: #FFFFFF;
				.service_customer{
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.service_head{
					margin-top: 20rpx;
					font-family:  Arial;
					font-size: 24rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: center;
					color: #29593E;
				}
				.service_tip{
					margin-bottom: 30rpx;
					font-family: Arial;
					font-weight: 400;
					font-size: 20rpx;
					text-align: center;
					line-height: 40rpx;
					color: #8B9098;

				}
				.service_label{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					padding: 20rpx;
					border-radius: 8rpx;
					background: #1E4B2E;
					.service_info{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.service_name{
							margin-left: 20rpx;
							font-family:  Arial;
							font-size: 24rpx;
							font-weight: 500;
							line-height: 45rpx;
							text-align: left;
							color: #FFFFFF;
						}
					}
				}
			}
		}
	}
</style>
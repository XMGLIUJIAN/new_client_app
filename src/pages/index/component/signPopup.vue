<template>
	<view class="popup">
		<view class="content">
			<view class="success px-[40rpx] pt-[40rpx] pb-[40rpx]">
				<view class="tips mb-[40rpx]">Pemberitahuan</view>
				<view class="status">
					<u-image width="80" height="80" src="@/static/images/icon/success.png" alt="" />
				</view>
				<view class="explain_text">Masuk Sukses</view>
				<view class="explain_num">
					<u-image width="26" height="26" src="@/static/images/user/point.png" alt="" />
					<view class="points_num">+ {{formatNumber(integral)}}</view>
				</view>
				<view class="btn mt-[20rpx]" @tap="confirmPopup">selesai</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { formatNumber } from '@/utils/util'
	const emit = defineEmits(['confirm'])
	const props = defineProps({
		integral: {
			type: [Number, String],
			default: 0
		}
	})
	const confirmPopup = () => {
		emit('confirm')
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

			.success {
				width: 586rpx;
				border-radius: 20rpx;
				background: #FFFFFF;

				.tips {
					font-family: Arial;
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

				.explain_text {
					margin-right: 10rpx;
					font-family: Arial;
					font-size: 24rpx;
					font-weight: 400;
					line-height: 48rpx;
					text-align: center;
					color: #8B9098;
				}

				.explain_num {
					display: flex;
					justify-content: center;
					align-items: center;

					.points_num {
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 26rpx;
						text-align: left;
						color: #ECB54B;
					}
				}

				.btn {
					height: 80rpx;
					border-radius: 12rpx;
					background: linear-gradient(270deg, #81AF95 0%, #417E5C 100%);
					font-family: Arial;
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
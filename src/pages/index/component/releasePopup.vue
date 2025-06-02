<template>
	<view class="popup">
		<view class="content">
			<view class="lose px-[40rpx] pt-[40rpx] pb-[40rpx]">
				<view class="tips mb-[20rpx]">Points Release Reminder</view>
				<view class="warn mb-[20rpx]">Due to the release of points, the "{{releaseInfo.title}} Mine Area Investment Agreement"
					expired on {{releaseInfo.create_time}}, and the system automatically terminated the contract.</view>
				<view class="explain">
					<view class="explain_title">Silver Mine Investment Agreement</view>
					<view class="explain_text">Investor daily rebate ratio:<text class="num_text">{{formatNumber(releaseInfo.profit)}}%</text>
					</view>
					<view class="explain_image">
						<u-image width="150" height="123" src="@/static/images/icon/release_icon.png" alt="" />
					</view>
				</view>
				<view class="btn mt-[20rpx]" @tap="confirmPopup(releaseInfo.id)">Konfirmasi</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { formatNumber } from '@/utils/util'
	const props = defineProps({
		releaseInfo:{
			type: Object,
			default: () => {}
		}
	})
	const emit = defineEmits(['confirm'])
	const confirmPopup = (id:any) => {
		emit('confirm',id)
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
					position: relative;
					padding: 20rpx;
					border-radius: 20rpx;
					background: #E9F2FF;

					.explain_title {
						margin-bottom: 40rpx;
						font-family:  Arial;
						font-size: 26rpx;
						font-weight: 700;
						line-height: 40rpx;
						text-align: left;
						color: #1E1E1E;
					}

					.explain_text {
						font-family:  Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #1E1E1E;

						.num_text {
							margin-left: 5rpx;
							font-family:  Arial;
							font-size: 24rpx;
							font-weight: 700;
							line-height: 40rpx;
							text-align: left;
							color: #0067E0;
						}
					}

					.explain_image {
						position: absolute;
						bottom: 0;
						right: 0;
					}
				}

				.btn {
					height: 80rpx;
					border-radius: 12rpx;
					background: #81AF95;
					font-family:  Arial;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 80rpx;
					color: #FFFFFF;
					text-align: center;
				}
			}

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

				.warn {
					font-family:  Arial;
					font-size: 24rpx;
					font-weight: 400;
					line-height: 40rpx;
					text-align: left;
					color: #1E1E1E;
				}

				.explain {
					position: relative;
					padding: 20rpx;
					border-radius: 20rpx;
					background: #E9E9E9;

					.explain_title {
						margin-bottom: 40rpx;
						font-family:  Arial;
						font-size: 26rpx;
						font-weight: 700;
						line-height: 40rpx;
						text-align: left;
						color: #1E1E1E;
					}

					.explain_text {
						font-family:  Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #1E1E1E;

						.num_text {
							margin-left: 5rpx;
							font-family:  Arial;
							font-size: 24rpx;
							font-weight: 700;
							line-height: 40rpx;
							text-align: left;
							color: #0067E0;
						}
					}

					.explain_image {
						position: absolute;
						bottom: 0;
						right: 0;
					}
				}

				.btn {
					height: 80rpx;
					border-radius: 12rpx;
					background: #C3C6CB;
					font-family:  Arial;
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
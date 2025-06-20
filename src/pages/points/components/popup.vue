<template>
	<view class="popup">
		<view class="content">
			<view class="success px-[40rpx] pt-[40rpx] pb-[40rpx]" v-if="pointsType == 'success'">
				<view class="tips mb-[40rpx]">Penebusan Sukses</view>
				<view class="status mb-[20rpx]">
					<u-image width="100" height="100" src="@/static/images/icon/success.png" alt="" />
				</view>
				<view class="explain">
					<view class="explain_title">Poin Meningkat: </view>
					<view class="explain_num">{{formatNumber(number)}} Poin</view>
				</view>
				<view class="explain">
					<view class="explain_title">Bonus Berkah Tambahan:</view>
					<view class="explain_num">Rp {{formatNumber(bonus)}}</view>
				</view>
				<view class="btn mt-[20rpx]" @tap="confirmPopup">konfirmasi</view>
			</view>
			<view class="lose px-[40rpx] pt-[40rpx] pb-[40rpx]" v-if="pointsType == 'lose'">
				<view class="tips mb-[40rpx]">Pemberitahuan</view>
				<view class="status">
					<u-image width="100" height="100" src="@/static/images/icon/lose.png" alt="" />
				</view>
				<view class="explain">{{pointsMsg}}</view>
				<view class="btn mt-[20rpx]" @tap="cancelPopup">Batal</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { formatNumber } from '@/utils/util'
	const emit = defineEmits(['confirm', 'cancel'])
	const props = defineProps({
		pointsType: {
			type: String,
			default: 'success'  // success  lose
		},
        pointsMsg: {
            type: String,
            default: 'success'  // success  lose
        },
		number: {
			type: [Number, String],
			default: 0
		},
        bonus: {
            type: Number,
            default: 0
        }
	})
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

				.explain {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.explain_title {
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 48rpx;
						text-align: center;
						color: #8B9098;
					}
					.explain_num {
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 48rpx;
						text-align: center;
						color: #8B9098;
					}
				}

				.btn {
					height: 80rpx;
					border-radius: 12rpx;
					background: #81AF95;
					font-family: Arial;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 80rpx;
					color: #FFFFFF;
					text-align: center;
				}
			}

			.lose {
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

				.explain {
					font-family: Arial;
					font-size: 24rpx;
					font-weight: 400;
					line-height: 48rpx;
					text-align: center;
					color: #8B9098;
				}

				.btn {
					height: 80rpx;
					border-radius: 12rpx;
					background: #C3C6CB;
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

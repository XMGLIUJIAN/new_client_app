<template>
	<view class="popup">
		<view class="content">
			<view class="success px-[40rpx] pt-[40rpx] pb-[40rpx]" v-if="type == 'success'">
				<view class="tips mb-[20rpx]">Tanda Tangan Berhasil</view>
				<view class="status">
					<u-image width="140" height="140" src="@/static/images/icon/success.png" alt="" />
				</view>
				<view class="explain">
					<view class="explain_title">Investasi Sawah Beras Putih</view>
					<view class="explain_text">Rasio Deviden harian Investor:<text class="num_text">{{formatNumber(number)}}%</text>
					</view>
					<view class="explain_image">
						<u-image width="150" height="123" src="@/static/images/icon/sign_icon.png" alt="" />
					</view>
				</view>
				<view class="btn mt-[20rpx]" @tap="confirmPopup">Konfirmasi</view>
			</view>
			<view class="lose px-[40rpx] pt-[40rpx] pb-[40rpx]" v-if="type == 'lose'">
				<view class="tips mb-[40rpx]">Pemberitahuan</view>
				<view class="status">
					<u-image width="140" height="140" src="@/static/images/icon/lose.png" alt="" />
				</view>
				<view class="explain">Tidak cukup poin, pergi mengisi ulang</view>
				<view class="btn mt-[20rpx]" @tap="cancelPopup">Batal</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { formatNumber } from '@/utils/util'
	const props = defineProps({
		type:{
			type: String,
			default: 'success'
		},
		number: {
			type: Number,
			default: 0
		}
	})
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
					background: #0067E0;
					font-family:  Arial;
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
					color: #EF0000;
				}
				.btn{
					height: 80rpx;
					border-radius: 12rpx;
					background: #0067E0;
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
<template>
	<view class="popup">
		<view class="content">
			<view class="success px-[40rpx] pt-[40rpx] pb-[40rpx]" v-if="type == 'success'">
				<view class="tips mb-[40rpx]">Penukaran Berhasil</view>
				<view class="status">
					<u-image width="100" height="100" src="@/static/images/icon/success.png" alt="" />
				</view>
				<view class="explain">Set sandi penarikan berhasil</view>
				<view class="btn mt-[20rpx]" @tap="finishPopup">selesai</view>
			</view>
			<view class="lose px-[40rpx] pt-[40rpx] pb-[40rpx]" v-if="type == 'lose'">
				<view class="tips mb-[40rpx]">Pemberitahuan</view>
				<view class="status">
					<u-image width="100" height="100" src="@/static/images/icon/lose.png" alt="" />
				</view>
				<view class="explain">{{message}}</view>
				<view class="btn mt-[20rpx]" @tap="confirmPopup">Konfirmasi</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	const emit = defineEmits(['finish','confirm'])
	const props = defineProps({
		type: {
			type: String,
			default: 'success'  // success  lose
		},
		message:{
			type: String,
			default: ''
		}
	})
	const finishPopup = () => {
		emit('finish')
	}
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
					font-size: 24rpx;
					font-weight: 400;
					line-height: 48rpx;
					text-align: center;
					color: #8B9098;
				}
				.btn{
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
					font-size: 24rpx;
					font-weight: 400;
					line-height: 48rpx;
					text-align: center;
					color: #8B9098;
				}
				.btn{
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
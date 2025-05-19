<template>
	<view class="popup">
		<view class="content">
			<view class="success px-[40rpx] pt-[40rpx] pb-[40rpx]" v-if="type == 'success'">
				<view class="tips mb-[40rpx]">Pemberitahuan</view>
				<view class="explain">
					<u-image width="42" height="42" src="@/static/images/icon/explain_success.png" alt="" />
					<view class="explain_text">Sukses Mendaftar</view>
				</view>
				<view class="btn mt-[20rpx]" @tap="confirmPopup('success')">Pergi Ke Beranda</view>
			</view>
			<view class="lose px-[40rpx] pt-[40rpx] pb-[40rpx]" v-if="type == 'lose'">
				<view class="tips mb-[40rpx]">Pemberitahuan</view>
				<view class="explain">{{msg}}</view>
				<view class="btn mt-[20rpx]" @tap="confirmPopup('lose')">Konfirmasi</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	const props = defineProps({
		type: {
			type: String,
			default: 'success'  // success
		},
		msg: {
			type: String,
			default: ''  // success
		},
	})
	const emit = defineEmits(['confirm'])
	
	const confirmPopup = (type: String) => {
		emit('confirm', type);
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
				.explain{
					display: flex;
					justify-content: center;
					align-items: center;
					.explain_text{
						margin-left: 20rpx;
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 400;
						line-height: 48rpx;
						text-align: center;
						color: #1E1E1E;
					}
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
				.explain{
					font-family:  Arial;
					font-size: 28rpx;
					font-weight: 400;
					line-height: 48rpx;
					text-align: center;
					color: #1E1E1E;
				}
				.btn{
					height: 80rpx;
					border-radius: 12rpx;
					background: #E9E9E9;
					font-family:  Arial;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 80rpx;
					color: #1E1E1E;
					text-align: center;
				}
			}
		}
	}
</style>
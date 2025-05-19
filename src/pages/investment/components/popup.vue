<template>
	<view class="popup" @tap="cancelPopup">
		<view class="content">
			<view class="program px-[30rpx] pt-[30rpx] pb-[30rpx]">
				<view class="tips mb-[20rpx]">Jumlah Poin yang Digunakan</view>
				<view class="num mb-[40rpx]">{{info.total_amount}}</view>
				<view class="card">
					<view class="card_label">
						<view class="label_title">Jenis Sawah</view>
						<view class="label_text">{{info.name}}</view>
					</view>
					<view class="card_label">
						<view class="label_title">Total Dana Dipercepat</view>
						<view class="label_text">Rp {{formatNumber(info.total_amount)}}</view>
					</view>
					<view class="card_label">
						<view class="label_title">Total Durasi Pelepasan (hari)</view>
						<view class="label_text">{{info.total_days}}</view>
					</view>
					<view class="card_label">
						<view class="label_title">Jumlah Pelepasan per Hari</view>
						<view class="label_text">Rp {{formatNumber(info.daily_rebate)}}</view>
					</view>
				</view>
				<view class="btn mt-[20rpx]" @tap="confirmPopup(info.id)">Konfirmasi</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { formatNumber } from '@/utils/util'
	const emit = defineEmits(['confirm','cancel'])
	const props = defineProps({
		info: {
			type: Object,
			default: () => {}
		},
	})
	const confirmPopup = (id: number) => {
		emit('confirm',id)
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
			
			.program {
				width: 670rpx;
				border-radius: 16rpx;
				background: linear-gradient(180deg, #EBF4FF 0%, #FFFFFF 28.4%);
				.tips {
					font-family:  Source Han Sans CN;
					font-size: 30rpx;
					font-weight: 500;
					line-height: 48rpx;
					text-align: center;
					color: #666666;
				}
				.num{
					font-family: SimHei;
					font-weight: 700;
					font-size: 52rpx;
					line-height: 54rpx;
					text-align: center;
					color: #1E1E1E;
				}
				.card{
					padding: 20rpx;
					border-radius: 6rpx;
					background: #EFF6FF;
					.card_label{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.label_title{
							font-family: Source Han Sans CN;
							font-weight: 400;
							font-size: 24rpx;
							line-height: 54rpx;
							color: #666666;
							text-align: left;
						}
						.label_text{
							font-family: Source Han Sans CN;
							font-weight: 500;
							font-size: 26rpx;
							line-height: 54rpx;
							text-align: right;
							color: #0067E0;
						}
					}
				}
				.btn{
					height: 90rpx;
					border-radius: 12rpx;
					background: linear-gradient(270deg, #5693FF 0%, #0067E0 100%);
					font-family: Source Han Sans CN;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 90rpx;
					color: #FFFFFF;
					text-align: center;
				}
			}
		}
	}
</style>
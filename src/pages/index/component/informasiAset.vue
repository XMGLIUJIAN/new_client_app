<template>
	<view class="article mx-[30rpx] px-[20rpx] pt-[30rpx] pb-[30rpx]">
		<view class="article_head">
			<view class="article_title">Paket Investasi Cepat</view>
			<view class="article_tips">
				<text>Lihat Selengkapnya</text>
				<u-icon name="arrow-right-double" color="#B0B0B0" size="13"></u-icon>
			</view>
		</view>
		<view class="article_box">
			<view class="article_label">
				<view class="label_title">3 Hari</view>
				<view class="label_num">RP 60.000</view>
				<view class="label_text">
					<view class="text_title">Investasi Aman</view>
					<view class="text_title">Maksimalkan Keuntungan</view>
				</view>
			</view>
			<view class="article_line"></view>
			<view class="article_cepat">
				<view class="label_title">7 Hari</view>
				<view class="label_num">RP 350.000</view>
				<view class="label_text">
					<view class="text_title">Dibagikan Setiap Hari</view>
					<view class="text_title">Keuntungan Masuk Secara Real-Time</view>
				</view>
			</view>
			<view class="article_line"></view>
			<view class="article_label">
				<view class="label_title">15 Hari</view>
				<view class="label_num">RP 1.000.000</view>
				<view class="label_text">
					<view class="text_title">Mulai</view>
					<view class="text_title">Impian Kekayaanmu</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref, watch } from 'vue';
	import { formatNumber } from '@/utils/util'
	const incomeInfo = ref<any>({})
	const props = defineProps({
		informasiInfo: {
			type: Object,
			default: () => { }
		}
	})
	watch(
		() => props.informasiInfo,
		(value) => {
			incomeInfo.value = value
		},
		{ deep: true }
	)
</script>

<style lang="scss" scoped>
	.article {
		border-radius: 12rpx;
		background: #FFFFFF;
		.article_head{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 40rpx;
			.article_title{
				font-family: Arial;
				font-weight: 700;
				font-size: 32rpx;
				line-height: 54rpx;
				color: #1E4B2E;
			}
			.article_tips{
				font-family: Arial;
				font-weight: 400;
				font-size: 20rpx;
				line-height: 48rpx;
				color: #B0B0B0;
			}
		}
		.article_box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.article_label{
				width: 240rpx;
				padding: 0 10rpx;
				.label_title{
					font-family: Arial;
					font-weight: 400;
					font-size: 20rpx;
					line-height: 40rpx;
					text-align: center;
					color: #1E1E1E;
				}
				.label_num{
					font-family: Arial;
					font-weight: 700;
					font-size: 24rpx;
					line-height: 40rpx;
					text-align: center;
					color: #D90C07;
				}
				.label_text{
					font-family: Arial;
					font-weight: 400;
					font-size: 14rpx;
					line-height: 20rpx;
					text-align: center;
					color: #8B9098;
				}
			}
			.article_cepat{
				padding: 0 10rpx;
				.label_title{
					font-family: Arial;
					font-weight: 400;
					font-size: 20rpx;
					line-height: 40rpx;
					text-align: center;
					color: #1E1E1E;
				}
				.label_num{
					font-family: Arial;
					font-weight: 700;
					font-size: 24rpx;
					line-height: 40rpx;
					text-align: center;
					color: #D90C07;
				}
				.label_text{
					font-family: Arial;
					font-weight: 400;
					font-size: 14rpx;
					line-height: 20rpx;
					text-align: center;
					color: #8B9098;
				}
			}
			.article_line{
				width: 4rpx;
				height: 30rpx;
				background: #1E4B2E;
			}
		}
	}
</style>
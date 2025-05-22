<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="release_info">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					title="RINCIAN PELEPASAN" :title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="release_card mx-[20rpx] mt-[20rpx] mb-[20rpx]">
				<view class="release_card_head">
					<view class="record_card_state" :class="getState(investmentInfo.total_days)">{{investmentInfo.name}}</view>
					<view class="record_card_title">{{investmentInfo.tag}}</view>
				</view>
				<view class="release_card_box">
					<view class="card_label">
						<view class="label_title">Total Dana yang Dilepaskan</view>
						<view class="label_text">Rp {{formatNumber(investmentInfo.total_amount)}}</view>
					</view>
					<view class="card_label">
						<view class="label_title">Total Durasi Pelepasan</view>
						<view class="label_text">{{investmentInfo.total_days}}</view>
					</view>
					<view class="card_label">
						<view class="label_title">Jumlah Pelepasan Harian</view>
						<view class="label_text">Rp {{formatNumber(investmentInfo.daily_rebate)}}</view>
					</view>
				</view>
				<view class="release_state ended" v-if="investmentInfo.status == 1">Berakhir</view>
				<view class="release_state progress" v-else>Sedang Berjalan</view>
			</view>
			<view class="release_article">Rincian Pelepasan</view>
			<view class="release_box mx-[20rpx] mb-[20rpx]">
				<view class="release_box_row" v-for="(item,index) in recordArr" :key="index">
					<view class="release_row_head">
						<view class="row_head_title">DAY{{item.current_return_times}}</view>
						<view class="row_head_num"><text class="tip">+</text>Rp {{formatNumber(item.return_amount)}}</view>
					</view>
					<view class="release_row_date">{{formatDate(item.created_at)}}</view>
				</view>
				<view class="empty mt-[100rpx]" v-if="!recordArr.length">
					<u-empty text="Tidak Ada Catatan" mode="data" icon-color="#999999"
						color="#999999"></u-empty>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { returnRecord } from '@/api/raffle'
	import { formatNumber, formatDate } from '@/utils/util'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	const scrollTop = ref<number>(0)
	const recordArr = ref<any>([])
	const investmentInfo = ref<any>({})
	const getRecord = async (info: any) => {
		const data = await returnRecord(info)
		investmentInfo.value = data.investment
		recordArr.value = data.rows
	}
	const getState = (state : number) => {
		let color = ""
		switch (state) {
			case 3:
				color = 'putih'
				break;
			case 7:
				color = 'melati'
				break;
			case 15:
				color = 'ungu'
				break;
			case 30:
				color = 'merah'
				break;
			case 60:
				color = 'hitam'
				break;
		}
		return color
	}
	onLoad((option) => {
		getRecord(option)
	})
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page {
		background: #F6F6F6 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;
	
		.release_info {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.release_card{
				position: relative;
				padding: 30rpx;
				border-radius: 12rpx;
				background: #FBFBFB;
				.release_card_head{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-bottom: 20rpx;
					.record_card_state{
						font-family: Source Han Sans CN;
						font-weight: 700;
						font-size: 26rpx;
						line-height: 48rpx;
						text-align: center;
						&.putih{
							color: #8CA6C8;
						}
						&.melati{
							color: #B47033;
						}
						&.ungu{
							color: #0067E0;
						}
						&.merah{
							color: #DDA906;
						}
						&.hitam{
							color: #6D67D1;
						}
					}
					.record_card_title{
						margin-left: 20rpx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						font-size: 26rpx;
						line-height: 48rpx;
						text-align: center;
						color: #000000;
					}
				}
				.release_card_box{
					padding: 30rpx;
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
				.release_state{
					position: absolute;
					top: 0;
					right: 0;
					padding: 10rpx 22rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					font-size: 24rpx;
					line-height: 24rpx;
					text-align: center;
					border-top-right-radius: 12rpx;
					border-bottom-left-radius: 12rpx;
					&.progress{
						background: #DBEBFF;
						color: #0067E0;
					}
					&.ended{
						background: #EDEDED;
						color: #999999;
					}
				}
			}
			.release_article{
				margin: 40rpx 20rpx 20rpx 20rpx;
				font-family: Source Han Sans CN;
				font-weight: 700;
				font-size: 32rpx;
				line-height: 54rpx;
				text-align: left;
				color: #1E1E1E;
			}
			.release_box{
				padding: 36rpx;
				border-radius: 12rpx;
				background: #FFFFFF;
				.release_box_row{
					margin-bottom: 10rpx;
					border-bottom: 2rpx solid #E6E6E6;
					.release_row_head{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.row_head_title{
							font-family: Source Han Sans CN;
							font-weight: 500;
							font-size: 30rpx;
							line-height: 54rpx;
							text-align: left;
							color: #1E1E1E;
						}
						.row_head_num{
							font-family: SimHei;
							font-weight: 700;
							font-size: 36rpx;
							line-height: 54rpx;
							text-align: right;
							color: #1E1E1E;
							.tip{
								margin-right: 5rpx;
								font-family: SimHei;
								font-weight: 700;
								font-size: 28rpx;
								line-height: 54rpx;
								text-align: right;
								color: #1E1E1E;
							}
						}
					}
					.release_row_date{
						margin: 10rpx 0;
						font-family: Source Han Sans CN;
						font-weight: 400;
						font-size: 24rpx;
						line-height: 48rpx;
						text-align: left;
						color: #999999;
					}
				}
				.release_box_row:last-child{
					border: 0;
				}
			}
		}
	}
</style>
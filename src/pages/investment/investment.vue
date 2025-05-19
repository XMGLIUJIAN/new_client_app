<template>
	<view class="container pb-[60rpx]">
		<view class="imageGroup">
			<u-image width="750" height="499" :src="investmentInfo.head_icon"></u-image>
		</view>
		<view class="investment">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					title="RINCIAN PROGRAM" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
		</view>
		<view class="investment_card" :style="{height: investmentInfo.status == 1 ? '915rpx' : '780rpx'}">
			<u-image width="750" height="633" src="@/static/images/investment/investmentRectangle.png"></u-image>
			<view class="investment_box">
				<view class="investment_info" :style="{height: investmentInfo.status == 1 ? '915rpx' : '780rpx'}">
					<view class="investment_info_head mt-[20rpx] mb-[20rpx]">{{investmentInfo.name}}</view>
					<view class="investment_info_tips mt-[20rpx] mb-[20rpx]">
						<view class="investment_info_tip mt-[10rpx] mb-[10rpx] mx-[10rpx]">{{investmentInfo.tag}}</view>
						<view class="investment_info_tip mt-[10rpx] mb-[10rpx] mx-[10rpx]">Batas waktu
							{{investmentInfo.total_days}} hari</view>
					</view>
					<view class="investment_info_card">
						<view class="card_num"><text class="unit">Rp</text>{{formatNumber(investmentInfo.total_amount)}}
						</view>
						<view class="card_text">Jumlah total yang dirilis</view>
						<view class="card_foot">
							<view class="card_label">
								<view class="label_num">{{formatNumber(investmentInfo.total_days)}}</view>
								<view class="label_text">Total Hari pengembalian</view>
							</view>
							<view class="card_label">
								<view class="label_num"><text
										class="unit">Rp</text>{{formatNumber(investmentInfo.daily_rebate)}}</view>
								<view class="label_text">Jumlah pengembalian per hari</view>
							</view>
						</view>
					</view>
					<view class="investment_info_transfer mt-[20rpx] mb-[20rpx]" v-if="investmentInfo.status == 1">
						<view class="investment_info_label">
							<view class="label_title">Poin Tersedia:</view>
							<view class="label_poin">
								<view class="poin_num">{{formatNumber(investmentInfo.user_integral)}}</view>
								<view class="poin_unit">Poin</view>
							</view>
						</view>
						<view class="investment_info_label">
							<view class="label_title">Total Transfer:</view>
							<view class="label_poin">
								<view class="poin_num">{{formatNumber(investmentInfo.total_amount)}}</view>
								<view class="poin_unit">Poin</view>
							</view>
						</view>
					</view>
					<view class="investment_reminder">
						<u-image width="622" height="136" src="@/static/images/investment/investment_reminder.png"></u-image>
					</view>
					<view class="investment_btn_signed" v-if="investmentInfo.status == 2" @tap="getInvestment(investmentInfo.id)">
						<u-image width="38" height="38" src="@/static/images/investment/signed.png"></u-image>
						<text class="btn_text">Sudah Ditandatangani</text>
					</view>
					<view class="investment_btn_sign" v-else-if="investmentInfo.status == 1" @tap="submitEvent">
						Konfirmasi dan Transfer
					</view>
					<view class="investment_btn_signNot" v-else @tap="getInvestment(investmentInfo.id)">
						<u-image width="38" height="38" src="@/static/images/investment/signNot.png"></u-image>
						<text class="btn_text">Tidak Dapat Ditandatangani</text>
					</view>
				</view>
			</view>
		</view>
		<view class="program_box mt-[20rpx] mx-[30rpx]">
			<view class="program_head">Pahami Program Cepat Untung dalam 30 Detik</view>
			<view class="program_foot">
				<view class="program_foot_check" v-if="!checkShow" @tap="checkChange">
					<view class="program_foot_text">Klik untuk Melihat Detail</view>
					<u-icon name="arrow-down" color="#1E1E1E" size="28"></u-icon>
				</view>
				<view class="program_foot_image" v-else>
					<u-image width="626" height="2302" :src="investmentInfo.dialogue_pic"></u-image>
				</view>
			</view>
		</view>
		<view class="program_card mt-[20rpx] mx-[30rpx]">
			<view class="card_row" @tap="navigateTo('/pages/investment_record/investment_record')">
				<view class="row_info">
					<u-image width="50" height="50" src="@/static/images/investment/frame01.png"></u-image>
					<view class="row_text">Lihat Riwayat Investasi</view>
				</view>
				<u-icon name="arrow-right" color="#1E1E1E" size="24"></u-icon>
			</view>
			<view class="card_line"></view>
			<view class="card_row" @tap="navigateTo('/pages/qualification/qualification?id='+ investmentInfo.id)">
				<view class="row_info">
					<u-image width="50" height="50" src="@/static/images/investment/frame02.png"></u-image>
					<view class="row_text">Cek Kualifikasi</view>
				</view>
				<u-icon name="arrow-right" color="#1E1E1E" size="24"></u-icon>
			</view>
		</view>
		<Popup :info="investmentInfo" v-if="show" @cancel="show = false" @confirm="programEvent"></Popup>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { formatNumber } from '@/utils/util'
	import { pointsInvestmentInfo, investment } from '@/api/raffle'
	import { emitter } from '@/utils/emitter';
	import Popup from './components/popup.vue'
	const scrollTop = ref<number>(0)
	const info = ref<any>({})
	const show = ref<boolean>(false)
	const checkShow = ref<boolean>(false)
	const investmentInfo = ref<any>({})
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const submitEvent = () => {
		show.value = true
	}
	const checkChange = () => {
		checkShow.value = !checkShow.value
	}
	const programEvent = async (id : number) => {
		getInvestment(id)
	}
	const getInvestment = async (id : number) => {
		const resdata = await investment({ project_id: id })
		if(resdata.code == 1) {
			toast(resdata.message)
			getInvestmentInfo()
			show.value = false
		} else {
			toast(resdata.message)
		}
	}
	const getInvestmentInfo = async () => {
		const data = await pointsInvestmentInfo(info.value)
		investmentInfo.value = data.project
	}
	onLoad((option) => {
		info.value = option
		getInvestmentInfo()
	})
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page {
		background: #377DF5 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.investment {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
		}

		.investment_card {
			position: relative;
			height: 915rpx;

			.investment_box {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				.investment_info {
					width: 686rpx;
					padding: 20rpx;
					border-radius: 16rpx;
					background: #FFFFFF;

					.investment_info_head {
						font-family: Source Han Sans CN;
						font-weight: 700;
						font-size: 40rpx;
						line-height: 54rpx;
						text-align: center;
						color: #0067E0;
					}

					.investment_info_tips {
						display: flex;
						justify-content: center;
						align-items: center;

						.investment_info_tip {
							padding: 8rpx 18rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							font-size: 22rpx;
							line-height: 48rpx;
							text-align: center;
							color: #0067E0;
							border-radius: 8rpx;
							background: #DBEBFF;
						}
					}

					.investment_info_card {
						padding: 20rpx;
						border-radius: 12rpx;
						background: #EFF6FF;

						.card_num {
							font-family: SimHei;
							font-weight: 700;
							font-size: 48rpx;
							text-align: center;
							line-height: 60rpx;
							color: #EF0000;

							.unit {
								margin-right: 5rpx;
								font-family: SimHei;
								font-weight: 700;
								font-size: 48rpx;
								text-align: left;
								line-height: 60rpx;
								color: #EF0000;
							}
						}

						.card_text {
							font-family: Source Han Sans CN;
							font-weight: 400;
							font-size: 22rpx;
							line-height: 48rpx;
							text-align: center;
							color: #999999;
						}

						.card_foot {
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding-top: 20rpx;

							.card_label {
								.label_num {
									font-family: SimHei;
									font-weight: 700;
									font-size: 36rpx;
									line-height: 40rpx;
									text-align: center;
									color: #333333;

									.unit {
										margin-right: 10rpx;
										font-family: SimHei;
										font-weight: 700;
										font-size: 36rpx;
										line-height: 40rpx;
										text-align: center;
										color: #333333;
									}
								}

								.label_text {
									font-family: Source Han Sans CN;
									font-weight: 400;
									font-size: 22rpx;
									line-height: 40rpx;
									text-align: center;
									color: #999999;
								}
							}
						}
					}

					.investment_info_transfer {
						.investment_info_label {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.label_title {
								font-family: Source Han Sans CN;
								font-weight: 500;
								font-size: 26rpx;
								text-align: left;
								line-height: 48rpx;
								color: #1E1E1E;
							}

							.label_poin {
								display: flex;
								justify-content: flex-start;
								align-items: center;
								margin: 10rpx 0;

								.poin_num {
									font-family: SimHei;
									font-weight: 700;
									font-size: 30rpx;
									line-height: 42rpx;
									text-align: right;
									color: #0067E0;
								}

								.poin_unit {
									margin-left: 10rpx;
									font-family: Source Han Sans CN;
									font-weight: 500;
									font-size: 26rpx;
									line-height: 42rpx;
									text-align: right;
									color: #333333;
								}
							}
						}
					}

					.investment_reminder {
						margin: 20rpx 0;
					}

					.investment_btn_sign {
						margin-top: 35rpx;
						height: 90rpx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						font-size: 28rpx;
						line-height: 90rpx;
						text-align: center;
						color: #FFFFFF;
						border-radius: 12rpx;
						background: linear-gradient(270deg, #5693FF 0%, #0067E0 100%);
					}

					.investment_btn_signed {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 35rpx;
						height: 90rpx;
						border-radius: 12rpx;
						background: #D7E5FF;

						.btn_text {
							margin-left: 10rpx;
							font-family: Source Han Sans CN;
							font-weight: 500;
							font-size: 28rpx;
							text-align: center;
							color: #0067E0;
						}
					}

					.investment_btn_signNot {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 35rpx;
						height: 90rpx;

						.btn_text {
							margin-left: 10rpx;
							font-family: Source Han Sans CN;
							font-weight: 500;
							font-size: 28rpx;
							text-align: center;
							color: #333333;
						}

						border-radius: 12rpx;
						background: #F0F0F0;
					}
				}
			}
		}

		.program_box {
			.program_head{
				height: 96rpx;
				background: #DBEBFF;
				font-family: Source Han Sans CN;
				font-weight: 500;
				font-size: 26rpx;
				line-height: 96rpx;
				text-align: center;
				color: #0067E0;
				border-top-left-radius: 16rpx;
				border-top-right-radius: 16rpx;
			}
			.program_foot{
				background: #FFFFFF;
				border-bottom-left-radius: 16rpx;
				border-bottom-right-radius: 16rpx;
				.program_foot_check{
					display: flex;
					justify-content: center;
					align-items: center;
					height: 96rpx;
					.program_foot_text{
						font-family: Source Han Sans CN;
						font-weight: 500;
						font-size: 26rpx;
						line-height: 42rpx;
						color: #1E1E1E;

					}
				}
				.program_foot_image{
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 30rpx;
				}
			}
		}

		.program_card {
			padding: 40rpx;
			border-radius: 16rpx;
			background: #FFFFFF;

			.card_row {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.row_info {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.row_text {
						margin-left: 10rpx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						font-size: 28rpx;
						line-height: 48rpx;
						color: #1E1E1E;
					}
				}
			}

			.card_line {
				margin: 20rpx 0;
				height: 1rpx;
				background: #EBEBEB;
			}
		}
	}
</style>
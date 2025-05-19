<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="498" src="@/static/images/pageStyle/imageGroupThird.png"></u-image>
		</view>
		<view class="points_investment">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="POIN INVESTASI" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="investment_con">
				<view class="investment_card">
					<u-image height="392" src="@/static/images/user/investment_cardGroup.png"></u-image>
					<view class="card_info">
						<view class="card_head">Perjanjian Investasi {{investInfo.contract_name}}</view>
						<view class="card_title">Total Poin Di Butuhkan：</view>
						<view class="card_num">{{formatNumber(investInfo.contract_require)}}</view>
						<view class="card_text">Jumlah Tunai Dibutuhkan: Rp {{formatNumber(investInfo.contract_money)}}</view>
					</view>

				</view>
				<view class="trade_card px-[40rpx] pb-[40rpx] pt-[40rpx] mt-[20rpx] mb-[20rpx]">
					<view class="card_info">
						<view class="card_left">
							<view class="card_num">
								{{formatNumber(investInfo.user_money)}}
							</view>
							<view class="card_text">
								Saldo
							</view>
						</view>
						<view class="card_right">
							<view class="card_num">
								{{formatNumber(investInfo.user_integral)}}
							</view>
							<view class="card_text">
								Poin
							</view>
						</view>
					</view>
					<view class="investment_rate"><text class="star">*</text>Nilai Tukar：Rp 1 =
						{{formatNumber(investInfo.exchange_rate)}} POIN</view>
				</view>
				<view class="investment_interests  px-[40rpx] pb-[40rpx] pt-[40rpx]">
					<view class="flex items-center article-title text-lg font-medium">
						Bunga Investasi
					</view>
					<view class="investment_result mt-[20rpx]">
						<view class="result_left">Saldo Akun：</view>
						<view class="result_right">
							<u-image width="50" height="50" src="@/static/images/tradeExchange/descend.png" alt="" />
							<view class="number ml-[10rpx]">Rp {{formatNumber(investInfo.contract_money)}}</view>
						</view>
					</view>
					<view class="investment_result mt-[20rpx]">
						<view class="result_left">Perubahan Kontrak：</view>
						<view class="result_right">
							<u-image width="35" height="35" src="@/static/images/tradeExchange/sign.png" alt="" />
							<view class="sign ml-[10rpx]">Will Sign</view>
						</view>
					</view>
					<view class="agreement_release pt-[20rpx] pb-[20rpx]">{{investInfo.contract_name}} Perjanjian
						Investasi</view>
					<view class="investment_result mt-[20rpx]">
						<view class="result_left">Nilai Perubahan Setelah Perjanjian：</view>
						<view class="result_right">
							<u-image width="50" height="50" src="@/static/images/tradeExchange/rise.png" alt="" />
							<view class="number ml-[10rpx]">{{formatNumber(investInfo.points_rebate)}}%</view>
						</view>
					</view>
					<view class="agreement_release pt-[20rpx] pb-[20rpx]">Nilai Tukar Harian</view>
				</view>
				<view class="submit_btn mt-[50rpx]" @tap="SubmitEvent">Konfirmasi</view>
			</view>
			<toastPopup></toastPopup>
			<Popup v-if="investmentPopup" :type="investmentType" :number="investInfo.points_rebate"
				@confirm="investmentConfirm" @cancel="investmentCancel"></Popup>
		</view>
	</view>

</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import Popup from './components/popup.vue'
	import { formatNumber } from '@/utils/util'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { emitter } from '@/utils/emitter';
	import { myContractInvest, myContractInvestInfo } from '@/api/contract'
	const scrollTop = ref<number>(0)
	const contract_id = ref<String>('')
	const investInfo = ref<any>({})
	const investmentType = ref<String>('success')
	const investmentPopup = ref<Boolean>(false)
	const SubmitEvent = () => {
		emitter.emit('gifType',{type: 1})
		myContractInvestAsync()
	}
	const myContractInvestAsync = () => {
		setTimeout(async () => {
			const resData = await myContractInvest({ contract_id: contract_id.value })
			if (resData.code == 1) {
				investmentType.value = 'success'
				investmentPopup.value = true;
			} else if(resData.code == 1004){
				investmentType.value = 'lose'
				investmentPopup.value = true;
			} else {
				emitter.emit('toast', resData.msg)
			}
		}, 3000)

	}
	const investmentCancel = () => {
		investmentPopup.value = false;
		navigateTo('/pages/recharge/recharge')
	}
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const investmentConfirm = () => {
		getInfo()
		investmentPopup.value = false
	}

	const getInfo = async () => {
		investInfo.value = await myContractInvestInfo({ contractId: contract_id.value })
	}
	onLoad((options : any) => {
		contract_id.value = options.contract_id
		getInfo()
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

		.points_investment {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.investment_con {
				padding: 20rpx 40rpx;

				.investment_card {
					overflow: hidden;
					position: relative;
					border-radius: 12rpx;

					.card_info {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						padding: 40rpx;
						border-radius: 12rpx;

						.card_head {
							margin-bottom: 20rpx;
							font-family: Arial;
							font-size: 32rpx;
							font-weight: 700;
							line-height: 48rpx;
							text-align: left;
							color: #FFFFFF;
						}

						.card_title {
							margin-bottom: 20rpx;
							font-family: Arial;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 48rpx;
							text-align: left;
							color: #FFFFFF;
						}

						.card_num {
							margin-bottom: 20rpx;
							font-family: Arial;
							font-size: 48rpx;
							font-weight: 700;
							text-align: left;
							color: #FFFFFF;
						}

						.card_text {
							font-family: Arial;
							font-size: 24rpx;
							font-weight: 500;
							line-height: 40rpx;
							text-align: left;
							color: #BBD6FF;
						}
					}
				}

				.trade_card {
					border-radius: 12rpx;
					background: #FFFFFF;

					.card_info {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.card_left {
							.card_num {
								font-family: Arial;
								font-size: 32rpx;
								font-weight: 700;
								line-height: 64rpx;
								text-align: left;
								color: #1E1E1E;
							}

							.card_text {
								font-family: Arial;
								font-size: 32rpx;
								font-weight: 500;
								line-height: 48rpx;
								text-align: left;
								color: #999999;
							}
						}

						.card_right {
							.card_num {
								font-family: Arial;
								font-size: 32rpx;
								font-weight: 700;
								line-height: 64rpx;
								text-align: right;
								color: #1E1E1E;
							}

							.card_text {
								font-family: Arial;
								font-size: 32rpx;
								font-weight: 500;
								line-height: 48rpx;
								text-align: right;
								color: #999999;
							}
						}
					}

					.investment_rate {
						margin-top: 20rpx;
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #1E1E1E;

						.star {
							margin-right: 5rpx;
							font-family: Arial;
							font-size: 24rpx;
							font-weight: 700;
							line-height: 40rpx;
							text-align: left;
							color: #0067E0;
						}
					}
				}

				.investment_interests {
					border-radius: 12rpx;
					background: #FFFFFF;

					.article-title {
						color: #333333;
						font-family: Arial;
						font-weight: 700;
						font-size: 32rpx;

						&::before {
							content: '';
							width: 6rpx;
							height: 30rpx;
							display: block;
							margin-right: 10rpx;
							background: #0067E0;
						}
					}

					.investment_result {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.result_left {
							font-family: Arial;
							font-size: 28rpx;
							font-weight: 700;
							line-height: 48rpx;
							text-align: left;
							color: #999999;
						}

						.result_right {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.number {
								font-family: Arial;
								font-size: 32rpx;
								font-weight: 700;
								line-height: 48rpx;
								text-align: left;
								color: #1E1E1E;
							}

							.sign {
								font-family: Arial;
								font-size: 28rpx;
								font-weight: 500;
								line-height: 48rpx;
								text-align: left;
								color: #EF0000;
							}
						}
					}

					.agreement_release {
						font-family: Arial;
						font-size: 26rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #999999;
					}

				}


				.submit_btn {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 90rpx;
					border-radius: 8rpx;
					background: #0067E0;
					font-family: Arial;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 48rpx;
					text-align: center;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
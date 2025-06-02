<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="400" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="exchange pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#FFFFFF"
					title="TUKAR" :title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title-color="#FFFFFF">
					<template #right>
						<view class="rule mr-[30rpx]" @tap="navigateTo('/pages/point_rule/point_rule')">
							<u-image v-if="!scrollTop" width="40" height="40"
								src="@/static/images/icon/icon_help.png"></u-image>
							<u-image v-else width="40" height="40" src="@/static/images/icon/help.png"></u-image>
						</view>
					</template>
				</u-navbar>
			</u-sticky>
			<view class="exchange_card mt-[50rpx] mx-[30rpx]">
				<view class="trade_card_head">
					<view class="card_head_title">Informasi Aset</view>
					<view class="card_head_account">ID:{{userInfo.account}}</view>
				</view>
				<view class="transfer_card">
					<view class="card_box">
						<view class="card_text">Saldo</view>
						<view class="card_num">Rp {{formatNumber(userInfo.user_money)}}</view>
					</view>
					<view class="card_line"></view>
					<view class="card_box">
						<view class="card_text">Poin</view>
						<view class="card_num">{{formatNumber(userInfo.user_token)}}</view>
					</view>
				</view>
			</view>
			<view class="trade_popup mt-[30rpx] mb-[30rpx] pt-[40rpx] px-[30rpx]">
				<view class="trade_con px-[40rpx] pt-[40rpx] pb-[40rpx]">
					<view class="trade_submit">
						<view class="trade_Item">
							<view class="trade_head">
								<view class="trade_title">Jumlah Pertukaran</view>
								<view class="trade_tips" @tap="exchangeAll">Tukar Semua</view>
							</view>
							<view class="trade_input">
								<u-input v-model="formData.exchange_amount" type="number" :border="false"
									placeholder-style="color: #8B9098;font-size:24rpx;"
									placeholder="Masukkan Jumlah Token Yang Di Tukar" />
							</view>
						</view>
						<view class="exchange_rate" v-if="Object.keys(rateInfo).length > 0">
							<view class="title">Nilai Penukaran：</view>
							<view class="point">1 Token =</view>
							<view class="token">Rp {{formatNumber(rateInfo.rate)}}</view>
						</view>
						<view class="exchange_result pt-[20rpx]">
							<view class="result_left">Jumlah Total Penukaran</view>
							<view class="result_right mt-[20rpx]">
								<view class="number">
									<view class="num"><text class="unit">Rp</text> {{formatNumber(number)}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="submit_btn mx-[30rpx]" @tap="submitEvent">Konfirmasi</view>
		</view>
		<Popup v-if="exchangePopup" :exchangeType="exchangeType" @confirm="exchangeFinish" @cancel="exchangeCancel">
		</Popup>
		<toastPopup></toastPopup>
	</view>

</template>

<script lang="ts" setup>
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import { emitter } from '@/utils/emitter';
	import { formatNumber } from '@/utils/util'
	import { currencyConversion, exchangelist } from '@/api/exchangeTransfer'
	import { onShow, onPageScroll } from '@dcloudio/uni-app'
	import { computed, reactive, ref } from 'vue'
	import Popup from './components/popup.vue'
	const exchangePopup = ref<Boolean>(false)
	const scrollTop = ref<number>(0)
	const exchangeType = ref<String>('success') // success 交易成功 lose 交易失败
	const userStore = useUserStore()
	const rateInfo = ref<any>({})
	const number = computed(() => {
		let amount = formData.exchange_amount * rateInfo.value.rate || 0
		return amount
	})
	const { userInfo, isLogin } = storeToRefs(userStore)
	const formData = reactive<{
		exchange_amount : any,
		type : number
	}>({
		exchange_amount: null, // 兑换数量
		type: 9 //兑换类型
	})
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url: url
		})
	}
	const resetForm = () => {
		const resetData = {
			exchange_amount: null,
			type: 9
		}
		Object.assign(formData, resetData)
	}
	const exchangeFinish = () => {
		userStore.getUser()
		resetForm()
		exchangePopup.value = false
	}
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const exchangeCancel = () => {
		userStore.getUser()
		exchangePopup.value = false
	}
	const exchangeAll = () => {
		formData.exchange_amount = userInfo.value.user_token ? userInfo.value.user_token : null
	}
	const getRatelist = async () => {
		const data = await exchangelist({ currencyType: 3, exchangeCurrencyType: 1 })
		rateInfo.value = data.lists.length ? data.lists[0] : {}
	}
	const submitEvent = () => {
		if (!formData.exchange_amount) return toast('Silakan masukkan jumlah pertukaran')
		if (formData.exchange_amount < rateInfo.value.min_amount) return toast('Tidak bisa kurang dari jumlah pertukaran minimum')
		if (formData.exchange_amount > rateInfo.value.max_amount || rateInfo.value.max_amount == -1) return toast('Tidak bisa lebih besar dari jumlah pertukaran maksimum')
		emitter.emit('gifType')
		currencyConversionAsync()
	}

	const currencyConversionAsync = () => {
		setTimeout(async () => {
			const resData = await currencyConversion(formData)
			if (resData.code == 1) {
				exchangeType.value = 'success'
				exchangePopup.value = true
			} else {
				exchangeType.value = 'lose'
				exchangePopup.value = true
			}
		}, 3000)
	}
	onShow(() => {
		getRatelist()
		userStore.getUser()
	})
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page {
		background: #F1F1F1 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.imageGroup {
			background: #FFFFFF;
		}

		.exchange {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.rule {
				font-family: Arial;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 45rpx;
				text-align: right;
				color: #1E1E1E;
			}

			.exchange_card {
				overflow: hidden;
				border-radius: 12rpx;
				background: #FFFFFF;

				.trade_card_head {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 40rpx;
					background: linear-gradient(303.05deg, #92BEAB 10.45%, #26815A 89.55%);

					.card_head_title {
						font-family: Arial;
						font-weight: 500;
						font-size: 32rpx;
						line-height: 40rpx;
						color: #FFFFFF;
					}

					.card_head_account {
						font-family: Arial;
						font-weight: 400;
						font-size: 20rpx;
						line-height: 40rpx;
						color: #FFFFFF;
					}
				}

				.transfer_card {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 40rpx;

					.card_box {
						width: 45%;

						.card_num {
							font-family: Arial;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 64rpx;
							text-align: center;
							color: #1E1E1E;
						}

						.card_text {
							font-family: Arial;
							font-size: 32rpx;
							font-weight: 500;
							line-height: 48rpx;
							text-align: center;
							color: #8B9098;
						}
					}

					.card_line {
						width: 2rpx;
						height: 50rpx;
						background: #D7D7D7;
					}
				}
			}

			.trade_popup {
				border-top-left-radius: 20rpx;
				border-top-right-radius: 20rpx;
				background: #F0F0F0;

				.trade_con {
					border-radius: 12rpx;
					background: #FFFFFF;

					.trade_submit {
						.trade_Item {
							margin-bottom: 20rpx;

							.trade_head {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.trade_title {
									font-family: Arial;
									font-size: 32rpx;
									font-weight: 700;
									line-height: 40rpx;
									text-align: left;
									color: #1E4B2E;
								}

								.trade_tips {
									font-family: Arial;
									font-size: 24rpx;
									font-weight: 500;
									line-height: 40rpx;
									text-align: right;
									color: #D79D2A;
								}
							}

							.trade_input {
								margin-top: 20rpx;
								padding: 10rpx 30rpx;
								background: #FFFFFF;
								border-radius: 12rpx;
								border: 2rpx solid #8B9098;
							}
						}

						.exchange_rate {
							display: flex;
							justify-content: flex-start;
							align-items: center;

							.title {
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: left;
								color: #8B9098;
							}

							.token {
								margin: 0 10rpx;
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: left;
								color: #ECB54B;
							}

							.point {
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: left;
								color: #1E1E1E;

							}
						}

						.exchange_result {

							.result_left {
								font-family: Arial;
								font-size: 32rpx;
								font-weight: 500;
								line-height: 48rpx;
								text-align: left;
								color: #1E4B2E;
							}

							.result_right {
								display: flex;
								justify-content: flex-start;
								align-items: center;

								.number {
									display: flex;
									justify-content: space-between;
									align-items: center;

									.num {
										font-family: Arial;
										font-size: 32rpx;
										font-weight: 400;
										line-height: 48rpx;
										text-align: left;
										color: #1E1E1E;

										.unit {
											font-family: Arial;
											font-weight: 400;
											font-size: 36rpx;
											line-height: 40rpx;
											color: #D79D2A;
										}
									}
								}
							}
						}
					}
				}
			}
			.submit_btn {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 90rpx;
				border-radius: 12rpx;
				background: #458060;
				font-family: Arial;
				font-size: 32rpx;
				font-weight: 500;
				line-height: 48rpx;
				text-align: center;
				color: #FFFFFF;
			}
		}
	}
</style>
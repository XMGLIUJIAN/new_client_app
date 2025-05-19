<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="498" src="@/static/images/pageStyle/imageGroupFour.png"></u-image>
		</view>
		<view class="exchange pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					title="TUKAR" :title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title-color="#1E1E1E">
					<template #right>
						<view class="rule mr-[20rpx]" @tap="navigateTo('/pages/user_rule/user_rule?type=exchange')">
							Peraturan
						</view>
					</template>
				</u-navbar>
			</u-sticky>
			<view class="exchange_card mt-[40rpx] px-[40rpx] pt-[40rpx] pb-[40rpx] mx-[40rpx]">
				<view class="flex items-center justify-between pb-[20rpx]">
					<view v-if="isLogin" class="flex items-center">
						<u-avatar :src="userInfo.avatar" :size="120"></u-avatar>
						<view class="text-white ml-[20rpx]">
							<view class="text-2xl nickname">{{ userInfo.nickname }}</view>
							<view class="text-xs mt-[18rpx] account">
								Akun ID：{{ userInfo.account }}
							</view>
						</view>
					</view>
					<navigator v-else class="flex items-center" hover-class="none" url="/pages/login/login">
						<u-avatar src="/static/images/user/default_avatar.png" :size="120"></u-avatar>
						<view class="text-white ml-[20rpx]">
							<view class="text-2xl notLogin">
								<text>Masuk</text>
								<u-icon class="ml-[20rpx]" name="arrow-right" color="#1E1E1E" size="28"></u-icon>
							</view>
							<view class="text-xs mt-[18rpx] account">Belum login.</view>
						</view>
					</navigator>
				</view>
				<view class="trade_card px-[40rpx] pb-[20rpx] pt-[20rpx]">
					<view class="card_left">
						<view class="card_num">
							{{formatNumber(userInfo.user_token)}}
						</view>
						<view class="card_text">
							Token
						</view>
					</view>
					<view class="card_right">
						<view class="card_num">
							{{formatNumber(userInfo.user_money)}}
						</view>
						<view class="card_text">
							Saldo
						</view>
					</view>
				</view>
			</view>

			<view class="trade_con mt-[20rpx] mb-[40rpx] px-[40rpx] pt-[40rpx] pb-[40rpx] mx-[40rpx]">
				<view class="trade_submit">
					<view class="trade_Item">
						<view class="trade_head">
							<view class="trade_title">Jumlah Pertukaran：</view>
							<view class="trade_tips" @tap="exchangeAll">Tukar Semua</view>
						</view>
						<view class="trade_input">
							<u-input v-model="formData.exchange_amount" type="number" :border="false"
								placeholder-style="color: #999999;font-size:28rpx;"
								placeholder="Masukkan Jumlah Token Yang Di Tukar" />
						</view>
					</view>
					<view class="exchange_rate" v-if="Object.keys(rateInfo).length > 0">
						<view class="title">Nilai Penukaran：</view>
						<view class="point">1 Token =</view>
						<view class="token">Rp {{formatNumber(rateInfo.rate)}}</view>
					</view>
					<view class="exchange_result pt-[20rpx]">
						<view class="result_left">Jumlah Total Penukaran：</view>
						<view class="result_right">
							<u-image width="48" height="48" src="@/static/images/tradeExchange/rise.png" alt="" />
							<view class="number ml-[10rpx]">
								<view class="num ml-[10rpx]">Rp {{formatNumber(number)}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="submit_btn mx-[40rpx]" @tap="submitEvent">Konfirmasi</view>
			<Popup v-if="exchangePopup" :exchangeType="exchangeType" @confirm="exchangeFinish"
				@cancel="exchangeCancel"></Popup>
		</view>
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
		emitter.emit('gifType',{type: 1})
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
		},3000)
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
		background: #F6F6F6 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

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
				border-radius: 12rpx;
				background: #FFFFFF;

				.nickname {
					font-family: Arial;
					font-size: 34rpx;
					font-weight: 700;
					text-align: left;
					color: #1E1E1E;
				}

				.account {
					font-family: Arial;
					font-size: 28rpx;
					font-weight: 500;
					text-align: left;
					color: #8FA8C5;
				}

				.notLogin {
					font-family: Arial;
					font-size: 34rpx;
					font-weight: 700;
					text-align: left;
					color: #1E1E1E;
				}

				.trade_card {
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-radius: 12rpx;
					background: #DBEBFF;

					.card_left {
						.card_num {
							font-family: Arial;
							font-size: 36rpx;
							font-weight: 700;
							line-height: 64rpx;
							text-align: left;
							color: #1E1E1E;

							.num {
								font-family: Arial;
								font-size: 32rpx;
								font-weight: 700;
								line-height: 64rpx;
								text-align: right;
								color: #1E1E1E;
							}
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
							font-size: 36rpx;
							font-weight: 700;
							line-height: 64rpx;
							text-align: right;
							color: #1E1E1E;

							.num {
								font-family: Arial;
								font-size: 32rpx;
								font-weight: 700;
								line-height: 64rpx;
								text-align: right;
								color: #1E1E1E;
							}
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
			}


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
								font-size: 28rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: left;
								color: #1E1E1E;
							}

							.trade_tips {
								font-family: Arial;
								font-size: 28rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: right;
								color: #0067E0;
							}
						}

						.trade_input {
							margin-top: 20rpx;
							padding: 10rpx 20rpx;
							background: #F4F4F4;
							border-radius: 10rpx;
						}
					}

					.exchange_rate {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						.title {
							font-family: Arial;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 40rpx;
							text-align: left;
							color: #999999;
						}

						.token {
							margin: 0 10rpx;
							font-family: Arial;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 40rpx;
							text-align: left;
							color: #0067E0;
						}

						.point {
							font-family: Arial;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 40rpx;
							text-align: left;
							color: #1E1E1E;

						}
					}

					.exchange_result {

						.result_left {
							font-family: Arial;
							font-size: 24rpx;
							font-weight: 500;
							line-height: 48rpx;
							text-align: left;
							color: #1E1E1E;
						}

						.result_right {
							display: flex;
							justify-content: flex-end;
							align-items: center;

							.number {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.num {
									font-family: Arial;
									font-size: 32rpx;
									font-weight: 700;
									line-height: 48rpx;
									text-align: left;
									color: #1E1E1E;
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
</style>
<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="points pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E" title="POIN"
					:title-bold="true" :background="{ background:  scrollTop ? '#FFFFFF' : 'transparent'}"
					title-color="#1E1E1E">
					<template #right>
						<view class="rule mr-[20rpx]" @tap="navigateTo('/pages/user_rule/user_rule?type=points')">
							Peraturan
						</view>
					</template>
				</u-navbar>
			</u-sticky>
			<view class="point_card mt-[40rpx] px-[40rpx] pt-[40rpx] pb-[40rpx] mx-[40rpx]">
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
							{{formatNumber(userInfo.user_money)}}
						</view>
						<view class="card_text">
							Saldo
						</view>
					</view>
					<view class="card_right">
						<view class="card_num">
							{{formatNumber(userInfo.user_integral)}}
						</view>
						<view class="card_text">
							Poin
						</view>
					</view>
				</view>
			</view>

			<view class="trade_con mt-[20rpx] mb-[40rpx] px-[40rpx] pt-[40rpx] pb-[40rpx] mx-[40rpx]">
				<view class="trade_submit">
					<view class="trade_Item">
						<view class="trade_head">
							<view class="trade_title">Tukar Saldo：</view>
							<view class="trade_tips" @tap="exchangeAll">Tukar Semua</view>
						</view>
						<view class="trade_input">
							<u-input v-model="formData.exchange_amount" type="number" :border="false"
								placeholder-style="color: #999999;font-size:28rpx;"
								placeholder="Masukkan Jumlah Saldo Yang Di Tukar" />
						</view>
					</view>
					<view class="exchange_rate" v-if="Object.keys(rateInfo).length > 0">
						<view class="title">Nilai Penukaran：</view>
						<view class="point">Rp 1 =</view>
						<view class="token"> {{formatNumber(rateInfo.rate)}} POIN</view>
					</view>
					<view class="exchange_result pt-[20rpx]">
						<view class="result_left">Jumlah Total Penukaran：</view>
						<view class="result_right">
							<u-image width="48" height="48" src="@/static/images/tradeExchange/rise.png" alt="" />
							<view class="number ml-[10rpx]">
								<view class="num ml-[10rpx]">{{formatNumber(balance)}} POIN</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="submit_btn mx-[40rpx]" @tap="submitEvent">Konfirmasi</view>
			<toastPopup></toastPopup>
			<Popup v-if="pointsPopup" :pointsType="pointsType" :number="balance" @confirm="pointsFinish"
				@cancel="pointsCancel"></Popup>
		</view>
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
	const scrollTop = ref<number>(0)
	const pointsPopup = ref<Boolean>(false)
	const pointsType = ref<String>('success') // success 交易成功 lose 交易失败
	const userStore = useUserStore()
	const rateInfo = ref<any>({})
	const balance = computed(() => {
		let num = formData.exchange_amount * rateInfo.value.rate || 0
		return num
	})
	const { userInfo, isLogin } = storeToRefs(userStore)
	const formData = reactive<{
		exchange_amount : any,
		type : number
	}>({
		exchange_amount: null, // 兑换数量
		type: 5 //兑换类型
	})
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url: url
		})
	}
	const resetForm = () => {
		const resetData = {
			exchange_amount: null,
			type: 5
		}
		Object.assign(formData, resetData)
	}
	const pointsFinish = () => {
		userStore.getUser()
		resetForm()
		pointsPopup.value = false
	}
	const pointsCancel = () => {
		userStore.getUser()
		pointsPopup.value = false
	}
	const exchangeAll = () => {
		formData.exchange_amount = userInfo.value.user_money ? userInfo.value.user_money : null
	}
	const getRatelist = async () => {
		const data = await exchangelist({ currencyType: 1, exchangeCurrencyType: 2 })
		rateInfo.value = data.lists.length ? data.lists[0] : {}
	}
	const submitEvent = async () => {
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
				pointsType.value = 'success'
				pointsPopup.value = true
			} else {
				pointsType.value = 'lose'
				pointsPopup.value = true
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
		background: #F6F6F6 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.points {
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

			.point_card {
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
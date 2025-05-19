<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="498" src="@/static/images/pageStyle/imageGroupFour.png"></u-image>
		</view>
		<view class="trade pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					title="TRANSAKSI" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="trade_card mt-[40rpx] px-[40rpx] pt-[40rpx] pb-[40rpx] mx-[40rpx]">
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
								<u-icon class="ml-[20rpx]" name="arrow-right" color="#FFFFFF" size="28"></u-icon>
							</view>
							<view class="text-xs mt-[18rpx] account">Belum login.</view>
						</view>
					</navigator>
				</view>
				<view class="transfer_card px-[40rpx] pb-[20rpx] pt-[20rpx]">
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
							{{formatNumber(userInfo.user_token)}}
						</view>
						<view class="card_text">
							Token
						</view>
					</view>
				</view>
			</view>
			<view class="trade_con mt-[20rpx] mb-[40rpx] px-[40rpx] pt-[40rpx] pb-[40rpx] mx-[40rpx]">
				<view class="settings_head">Silakan pilih mata uang：</view>
				<view class="settings_list">
					<view class="settings_label mt-[20rpx] mb-[20rpx]"
						:class="{'hidden': e.state == true,'active':formData.type == e.currency_type}"
						v-for="(e,index) in transferArr" :key="index" @tap="change(e)">
						<view class="settings_Item">
							{{e.currency_name}}
						</view>
					</view>
				</view>
				<view class="trade_submit">
					<view class="trade_Item">
						<view class="trade_title">Nomor Akun Penerima：</view>
						<view class="trade_input">
							<u-input v-model="formData.accept_user_id" :border="false"
								placeholder-style="color: #999999;font-size:28rpx;"
								placeholder="Masukan Nomor HP Penerima" />
						</view>
					</view>
					<view class="trade_Item">
						<view class="trade_title">Konfirmasi Kembali：</view>
						<view class="trade_input">
							<u-input v-model="formData.accept_user_id_confirm" :border="false"
								placeholder-style="color: #999999;font-size:28rpx;"
								placeholder="Masukan Nomor HP Penerima Kembali" />
						</view>
					</view>
					<view class="trade_Item">
						<view class="trade_title">Jumlah Transaksi：</view>
						<view class="trade_input">
							<u-input v-model="formData.exchange_amount" type="number" :border="false"
								placeholder-style="color: #999999;font-size:28rpx;"
								placeholder="Masukkan Nilai Yang Dikirim" />
						</view>
					</view>
				</view>
			</view>
			<view class="submit_btn mx-[40rpx]" @tap="submitEvent">Konfirmasi Transaksi</view>
			<Popup v-if="tradePopup" :msg="tradeMessage" :tradeType="tradeType" @confirm="tradeFinish" @cancel="tradeCancel"></Popup>
			<verifyPopup v-if="verifyShow" :number="formData.exchange_amount" :type="currencyName"
				:userInfo="verifyInfo" @confirm="verifyTransfer" @cancel="verifyShow = false"></verifyPopup>
			<toastPopup></toastPopup>
		</view>
	</view>

</template>

<script lang="ts" setup>
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import { emitter } from '@/utils/emitter';
	import { formatNumber } from '@/utils/util'
	import { sendExchange, transferlist } from '@/api/exchangeTransfer'
	import { onShow, onPageScroll } from '@dcloudio/uni-app'
	import { computed, reactive, ref } from 'vue'
	import verifyPopup from './components/verifyPopup.vue'
	import Popup from './components/popup.vue'
	import { confirmInfo } from '@/api/user'
	const tradePopup = ref<Boolean>(false)
	const tradeMessage = ref<string>('')
	const tradeType = ref<String>('success') // success 交易成功 lose 交易失败
	const userStore = useUserStore()
	const currencyName = ref<String>('')
	const min_amount = ref<number>(0)
	const max_amount = ref<number>(0)
	const scrollTop = ref<number>(0)
	const verifyShow = ref<Boolean>(false)
	const verifyInfo = ref<any>({})
	const transferArr = ref<Array<any>>([])
	const { userInfo, isLogin } = storeToRefs(userStore)
	const formData = reactive<{
		accept_user_id : any,
		accept_user_id_confirm : any,
		exchange_amount : any,
		type : number
	}>({
		accept_user_id: null,
		accept_user_id_confirm: null,
		exchange_amount: null,
		type: 0
	})
	const change = (e : any) => {
		formData.type = e.currency_type
		currencyName.value = e.currency_name
		min_amount.value = e.min_amount
		max_amount.value = e.max_amount
	}
	const resetForm = () => {
		const resetData = {
			accept_user_id: null,
			accept_user_id_confirm: null,
			exchange_amount: null,
			type: 0
		}
		Object.assign(formData, resetData)
	}
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const tradeFinish = () => {
		userStore.getUser()
		resetForm()
		tradePopup.value = false
	}
	const tradeCancel = () => {
		userStore.getUser()
		tradePopup.value = false
	}
	const getTransfer = async () => {
		const data = await transferlist()
		transferArr.value = data.lists
	}
	const submitEvent = () => {
		if (!formData.type) return toast('Silakan pilih mata uang')
		if (!formData.accept_user_id) return toast('Masukan Nomor HP Penerima')
		if (!formData.accept_user_id_confirm) return toast('Masukan Nomor HP Penerima Kembali')
		if (formData.accept_user_id != formData.accept_user_id_confirm) return toast('Nomor telepon yang anda masukkan dua kali tidak cocok. Tolong coba lagi.')
		if (!formData.exchange_amount) return toast('Masukkan Nilai Yang Dikirim')
		if (formData.exchange_amount < min_amount.value) return toast('Tidak bisa kurang dari jumlah Transfer minimum')
		if (formData.exchange_amount > max_amount.value || max_amount.value == -1) return toast('Tidak bisa lebih besar dari jumlah Transfer maksimum')
		confirmInfoAsync()
	}
	const confirmInfoAsync = async () => {
		const resData = await confirmInfo({ mobile: formData.accept_user_id })
		if (resData.code == 1) {
			verifyInfo.value = resData.data
			verifyShow.value = true
		} else {
			toast(resData.msg)
		}
	}
	const verifyTransfer = () => {
		verifyShow.value = false
		emitter.emit('gifType',{type:1})
		sendTransfer()
	}
	const sendTransfer = () => {
		setTimeout(async () => {
			const resData = await sendExchange(formData)
			if (resData.code == 1) {
				tradeType.value = 'success'
				tradePopup.value = true
			} else {
				tradeMessage.value = resData.msg
				tradeType.value = 'lose'
				tradePopup.value = true
			}
		}, 3000)
	}
	onShow(() => {
		getTransfer()
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

		.trade {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.trade_card {
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

				.transfer_card {
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

				.settings_head {
					font-family: Arial;
					font-size: 32rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: left;
					color: #1E1E1E;
				}

				.settings_list {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 0 10px;

					.settings_label {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 186rpx;
						height: 124rpx;
						border-radius: 6rpx;
						background: #F4F4F4;

						.settings_Item {
							font-family: Arial;
							font-size: 36rpx;
							font-weight: 700;
							text-align: center;
							color: #1E1E1E;
						}
					}

					.active {
						border: 3rpx solid #0067E0;
						background: #E5F0FF;
					}

					.hidden {
						display: none;
					}
				}

				.trade_submit {
					margin-top: 20rpx;

					.trade_Item {
						margin-bottom: 20rpx;

						.trade_title {
							font-family: Arial;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 40rpx;
							text-align: left;
							color: #1E1E1E;
						}

						.trade_input {
							margin-top: 20rpx;
							padding: 10rpx 20rpx;
							background: #F4F4F4;
							border-radius: 10rpx;
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
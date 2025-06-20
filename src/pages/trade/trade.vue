<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="trade pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'"
					title="TRANSAKSI" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" :title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
			<view class="trade_card mt-[50rpx] mx-[30rpx]">
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
						<view class="card_num">{{formatNumber(userInfo.user_integral)}}</view>
					</view>
				</view>
			</view>
			<view class="trade_con mt-[20rpx] mb-[40rpx] px-[20rpx] pt-[20rpx] pb-[20rpx] mx-[30rpx]">
				<view class="settings_head">Silakan pilih mata uang</view>
				<u-radio-group v-model="formData.type">
					<view class="payment_list">
						<view class="payment_Item mb-[20rpx]" @tap="radioChange(item)" v-for="(item,index) in transferArr"
							:key="index">
							<view class="payment_label" v-if="!item.state">
								<u-image width="100" height="100" v-if="item.icon" :src="item.icon" alt="" />
								<view class="payment_name">{{item.currency_name}}</view>
							</view>
							<u-radio  v-if="!item.state" activeColor="#528B6B" shape="circle" @change="radioChange" :name="item.currency_type"></u-radio>
						</view>
					</view>
				</u-radio-group>
				<view class="trade_submit">
					<view class="trade_Item">
						<view class="trade_title">Nomor Akun Penerima</view>
						<view class="trade_input">
							<u-input v-model="formData.accept_user_id" :border="false"
								placeholder-style="color: #8B9098;font-size:24rpx;"
								placeholder="Masukan Nomor HP Penerima" />
						</view>
					</view>
					<view class="trade_Item">
						<view class="trade_title">Konfirmasi Kembali</view>
						<view class="trade_input">
							<u-input v-model="formData.accept_user_id_confirm" :border="false"
								placeholder-style="color: #8B9098;font-size:24rpx;"
								placeholder="Masukan Nomor HP Penerima Kembali" />
						</view>
					</view>
					<view class="trade_Item">
						<view class="trade_title">Jumlah Transaksi</view>
						<view class="trade_input">
							<u-input v-model="formData.exchange_amount" type="number" :border="false"
								placeholder-style="color: #8B9098;font-size:24rpx;"
								placeholder="Masukkan Nilai Yang Dikirim" />
						</view>
                        <view class="mt-2">Biaya Transfer：<text class="text-[#ECB54B] text-xs">{{(formData.fee*100).toFixed(0)}}%</text></view>
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
		type : number,
        fee:number
	}>({
		accept_user_id: null,
		accept_user_id_confirm: null,
		exchange_amount: null,
		type: 0,
        fee:0
	})
	const radioChange = (e : any) => {
		formData.type = e.currency_type
		formData.fee = e.fee
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
		emitter.emit('gifType')
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
            emitter.emit('toast_close')
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
		background: #F1F1F1 !important;
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
				overflow: hidden;
				border-radius: 12rpx;
				background: #FFFFFF;
				.trade_card_head{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 40rpx;
					background: linear-gradient(303.05deg, #92BEAB 10.45%, #26815A 89.55%);
					.card_head_title{
						font-family: Arial;
						font-weight: 500;
						font-size: 32rpx;
						line-height: 40rpx;
						color: #FFFFFF;
					}
					.card_head_account{
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
					.card_line{
						width: 2rpx;
						height: 50rpx;
						background: #D7D7D7;
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
					color: #1E4B2E;
				}

				.u-radio-group {
					display: block;
				}

				.payment_list {
					.payment_Item {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.payment_label {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.payment_name {
								margin-left: 20rpx;
								font-family: Arial;
								font-size: 28rpx;
								font-weight: 700;
								line-height: 40rpx;
								text-align: left;
								color: #333333;
							}
						}
					}
				}

				.trade_submit {
					margin-top: 20rpx;

					.trade_Item {
						margin-bottom: 20rpx;

						.trade_title {
							font-family: Arial;
							font-size: 28rpx;
							font-weight: 700;
							line-height: 40rpx;
							text-align: left;
							color: #1E4B2E;
						}

						.trade_input {
							margin-top: 20rpx;
							padding: 0 30rpx;
							background: #FFFFFF;
							border-radius: 12rpx;
							border: 2rpx solid #8B9098;
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
				font-size: 28rpx;
				font-weight: 500;
				line-height: 48rpx;
				text-align: center;
				color: #FFFFFF;
			}
		}
	}
</style>

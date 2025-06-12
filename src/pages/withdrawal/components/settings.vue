<template>
	<view class="settings">
		<view class="set_card mt-[20rpx] mx-[30rpx]">
			<u-image width="690" height="245" src="@/static/images/user/setGroup.png"></u-image>
			<view class="settings_card pt-[20rpx] pb-[20rpx] px-[40rpx]">
				<view class="card_head">
					<view class="card_head_title">Informasi Aset</view>
					<view class="card_head_account">ID:{{userInfo.account}}</view>
				</view>
				<view class="card_box">
					<view class="card_num">
						{{formatNumber(userInfo.user_money)}}
					</view>
					<view class="card_text">
						Saldo
					</view>
				</view>
			</view>
		</view>

		<view class="recharge_payment mt-[30rpx] mb-[30rpx] px-[30rpx] pt-[20rpx] pb-[30rpx] mx-[30rpx]">
			<view class="payment_head">Memilih Pembayaran</view>
			<u-radio-group v-model="formData.pay_way">
				<view class="payment_list">
					<view class="payment_Item mb-[20rpx]" @tap="radioChange(item)" v-for="(item,index) in paymentArr"
						:key="index">
						<view class="payment_label">
							<u-image width="100" height="100" :src="item.icon" alt="" />
							<view class="payment_name">{{item.name}}</view>
						</view>
						<u-radio shape="circle" activeColor="#528B6B" :name="item.pay_way"></u-radio>
					</view>
				</view>
			</u-radio-group>
		</view>

		<view class="settings_con mt-[20rpx] mb-[30rpx] px-[30rpx] pt-[30rpx] pb-[30rpx] mx-[30rpx]">
			<view class="settings_list">
				<view class="settings_label mt-[20rpx] mb-[20rpx]" :class="{'active':formData.money == e}"
					v-for="(e,index) in withdrawArr" :key="index" @tap="change(e)">
					<view class="settings_Item">
						{{formatNumber(e)}}
					</view>
				</view>
			</view>
			<view class="trade_submit">
				<view class="trade_Item">
					<view class="trade_title">Jumlah Penarikan</view>
					<view class="trade_input">
						<u-input v-model="formData.money" type="number" :border="false"
							placeholder-style="color: #8B9098;font-size:24rpx;"
							placeholder="Masukkan Jumlah Yang Ingin Ditarik" />
					</view>
				</view>
				<view class="trade_tips">Jumlah penarikan minimal adalah 50.000</view>
				<view class="exchange_rate">
					<view class="title">Biaya penarikan：</view>
					<view class="point">({{feeRate}}%)</view>
				</view>
				<view class="trade_head  mt-[20rpx] mb-[20rpx]">
					<view class="head_title">Bank</view>
					<view class="head_bind" @tap="navigateTo('/pages/bind_card/bind_card')">
						<u-image width="30" height="30" src="@/static/images/icon/addCard.png" alt="" />
						<text class="addCard">Mengikat Rekening Bank</text>
					</view>
				</view>
				<view class="trade_bank" @tap="select">
					<u-input type="select" v-model="cardNumber" @click="selectShow = true" :border="false"
						placeholder-style="color: #8B9098;font-size:24rpx;" placeholder="Pilih Rekening Bank" />
				</view>
			</view>
		</view>
		<view class="submit_btn mx-[30rpx]" @tap="submitEvent">Permintaan</view>
		<u-select v-model="selectShow" confirm-text="Konfirmasi" cancel-text="Batal" :list="cardArr"
			@confirm="actionSheet"></u-select>
		<keywords :popup="keywordShow" title="Penarikan" :money="formData.money" @confirm="keywordConfirm" @close="keywordClose"></keywords>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import { formatNumber, bankFormat } from '@/utils/util'
	import { onShow } from '@dcloudio/uni-app'
	import { computed, reactive, ref } from 'vue'
	import { withdrawalConfig, withdrawal } from '@/api/recharge'
	import { bankCardList } from '@/api/bank'
	import keywords from './keywords.vue'
	import { emitter } from '@/utils/emitter';
	const userStore = useUserStore()
	const { userInfo, isLogin } = storeToRefs(userStore)
	const selectShow = ref<Boolean>(false)
	const feeRate = ref<number>(0)
	const cardNumber = ref<string>('')
	const keywordShow = ref<Boolean>(false)
	const paymentArr = ref<Array<any>>([])
	const withdrawArr = ref<Array<any>>([])
	const cardArr = ref<Array<any>>([])
	const formData = reactive<{
		bank_code : String,
		bank_name : String,
		card_number : String,
		money : any,
		password: String,
		pay_way: number,
		type : any
	}>({
		bank_code: '',
		bank_name: '',
		card_number: '',
		pay_way: 0,
		money: null,
		password: '',
		type: 1
	})
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const actionSheet = (arr : any) => {
		formData.bank_code = arr[0].extra
		formData.bank_name = arr[0].label
		formData.card_number = arr[0].value
		cardNumber.value = bankFormat(arr[0].value)
	}
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const change = (e : any) => {
		formData.money = Number(e)
	}
	const cardList = async () => {
		const data = await bankCardList({pay_way: formData.pay_way})
		cardArr.value = data.lists.map((e : any) => ({
			value: e.bank_card,
			label: e.bank_name,
			extra: e.ifsc
		}))
	}
	const resetForm = () => {
		const resetData = {
			bank_code: '',
			bank_name: '',
			password:'',
			pay_way: 0,
			card_number: '',
			money: null,
			type: 1
		}
		Object.assign(formData, resetData)
	}
	const getConfig = async () => {
		const data = await withdrawalConfig()
		paymentArr.value = data.lists
		formData.pay_way = data.lists[0].pay_way
		withdrawArr.value =  data.lists[0].withdrawal_amount ? data.lists[0].withdrawal_amount.split(',') : []
		feeRate.value = data.lists[0].fee_rate
		cardList()
	}
	const select = () => {
		selectShow.value = !selectShow.value
	}
	const submitEvent = () => {
		if (!formData.money) return toast('Silahkan pilih jumlah untuk menarik')
		if (!formData.card_number) return toast('Silahkan pilih kartu bank')
		userInfo.value.has_pay_password ? keywordShow.value = true : navigateTo('/pages/change_payPwd/change_payPwd?type=set')
	}
	const keywordConfirm = (e: any) => {
		formData.password = e.password
		keywordShow.value = false
		payment()
	}
	const radioChange = (e : any) => {
		formData.pay_way = e.pay_way
		withdrawArr.value = e.withdrawal_amount ? e.withdrawal_amount.split(',') : []
		feeRate.value = e.fee_rate
		cardList()
	}
	const keywordClose = () => {
		keywordShow.value = false
	}
	const payment = () => {
		emitter.emit('gifType')
		withdrawalAsync()
	}
	const withdrawalAsync = () => {
		setTimeout(async () => {
			const payInfo = {
				bank_code: formData.bank_code,
				bank_name: formData.bank_name,
				card_number: formData.card_number,
				money: formData.money,
				pay_way: formData.pay_way,
				withdrawal_password: formData.password,
				type: formData.type
			}
			const resData = await withdrawal(payInfo)
			if (resData.code == 1) {
				userStore.getUser()
				resetForm()
				toast('Sukses')
			} else {
				toast(resData.msg)
			}
            emitter.emit('toast_close')
		}, 3000)
	}
	onShow(() => {
		userStore.getUser()
		getConfig()
	})
</script>

<style lang="scss" scoped>
	.settings {
		.set_card {
			position: relative;
			.settings_card {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				.card_head{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.card_head_title{
						font-family: Arial;
						font-weight: 700;
						font-size: 32rpx;
						line-height: 48rpx;
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
				.card_box {
					padding: 20rpx 0;
					.card_num {
						font-family: Arial;
						font-size: 48rpx;
						font-weight: 700;
						line-height: 64rpx;
						text-align: left;
						color: #FFFFFF;
					}

					.card_text {
						font-family: Arial;
						font-size: 30rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #eeeeee;
					}
				}

			}

		}

		.recharge_payment {
			padding: 40rpx 40rpx 20rpx 40rpx;
			border-radius: 12rpx;
			background: #FFFFFF;

			.payment_head {
				margin-bottom: 20rpx;
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
		}

		.settings_con {
			border-radius: 12rpx;
			background: #FFFFFF;

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
					background: #F0F0F0;

					.settings_Item {
						font-family: Arial;
						font-size: 28rpx;
						font-weight: 700;
						text-align: center;
						color: #1E1E1E;
					}
				}

				.active {
					border: 2rpx solid #1E4B2E;
					background: #E5F0FF;
				}

				.hidden {
					display: none;
				}
			}

			.trade_submit {
				.trade_Item {
					margin-bottom: 20rpx;

					.trade_title {
						font-family: Arial;
						font-size: 32rpx;
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
				.trade_tips{
					margin: 10rpx 0;
					font-family: Arial;
					font-size: 24rpx;
					font-weight: 500;
					line-height: 40rpx;
					text-align: left;
					color: #8B9098;
					.tips{
						margin-right: 5rpx;
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #999999;
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
						color: #1E1E1E;
					}

					.point {
						margin: 0 10rpx;
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #ECB54B;
					}
				}
				.trade_head {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.head_title {
						font-family: Arial;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #1E4B2E;
					}

					.head_bind {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.addCard {
							margin-left: 10rpx;
							font-family: Arial;
							font-size: 24rpx;
							font-weight: 500;
							line-height: 40rpx;
							text-align: right;
							color: #1E4B2E;
						}
					}
				}

				.trade_bank {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 30rpx;
					background: #FFFFFF;
					border-radius: 12rpx;
					border: 2rpx solid #8B9098;
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
</style>

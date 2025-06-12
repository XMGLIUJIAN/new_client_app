<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="recharge  pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="DEPOSIT" :title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
					<template #right>
						<view class="contact mr-[30rpx]" @tap="navigateTo('/pages/customer_service/customer_service')">
							<u-image v-if="!scrollTop" width="40" height="40" src="@/static/images/user/icon_service.png" alt="" />
							<u-image v-else width="40" height="40" src="@/static/images/icon/contact.png" alt="" />
						</view>
					</template>
				</u-navbar>
			</u-sticky>
			<view class="recharge_con px-[30rpx]">
				<view class="recharge_payment mt-[50rpx] mb-[20rpx]">
					<view class="payment_head">Memilih Pembayaran</view>
					<u-radio-group v-model="formData.pay_way">
						<view class="payment_list">
							<view class="payment_Item mb-[20rpx]" @tap="radioChange(item)" v-for="(item,index) in paymentArr"
								:key="index">
								<view class="payment_label">
									<u-image width="100" height="100" :src="item.icon" alt="" />
									<view class="payment_name">{{item.name}}</view>
								</view>
								<u-radio activeColor="#528B6B" shape="circle" @change="radioChange" :name="item.pay_way"></u-radio>
							</view>
						</view>
					</u-radio-group>
				</view>
				<view class="settings_card mb-[40rpx]">
					<view class="settings_head">Memilih Nominal</view>
					<view class="settings_list">
						<view class="settings_label mt-[20rpx] mb-[20rpx]" v-for="e in rechargeArr" :key="e"
							@tap="change(e)" :class="{'active':formData.money == e}">
							<view class="settings_Item">
								{{formatNumber(e)}}
							</view>
						</view>
					</view>
					<view class="empty mt-[50rpx]" v-if="!rechargeArr.length">
						<u-image width="462" height="291" src="@/static/images/icon/empty.png" alt="" />
						<view class="empty_text">Kesalahan Jaringan, Silakan Coba Lagi</view>
					</view>
					<view class="trade_submit">
						<view class="trade_Item">
							<view class="trade_title">Jumlah Deposit</view>
							<view class="trade_input">
								<u-input v-model="formData.money" type="number" :border="false"
									placeholder-style="color: #8B9098;font-size:24rpx;"
									placeholder="Masukkan Jumlah Yang Ingin Deposit" />
							</view>
						</view>
						<view class="trade_tips">Jumlah deposit minimal 200.000</view>
					</view>
				</view>
				<view class="submit_btn" @tap="submitEvent">Deposit</view>
				<view class="recharge_box">
					<view class="recharge_text">1. Jumlah minimal deposit adalah 200.000</view>
					<view class="recharge_text">2. Jumlah deposit harus kelipatan dari 10.000</view>
					<view class="recharge_text">3. Jika mengalami masalah deposit yang tidak masuk,silakan hubungi customer service</view>
					<view class="recharge_text">4. Jumlah maksimal deposit melalui kartu bank adalah 250.000.000</view>
					<view class="recharge_text">5. Jumlah maksimal deposit menggunakan E-wallet adalah 40.000.000</view>
				</view>
			</view>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { formatNumber } from '@/utils/util'
	import { onPageScroll, onShow } from '@dcloudio/uni-app'
	import { ref, reactive, computed, watch } from 'vue'
	import { getRecharge, getpayWayList, prepay } from '@/api/pay'
	import { emitter } from '@/utils/emitter';
	const rechargeArr = ref<Array<any>>([])
	const paymentArr = ref<Array<any>>([])
	const formData = reactive({
		pay_way: null,
		money: null,
	})
	const scrollTop = ref<number>(0)
	const rechargeStatus = ref<Boolean>(false)
	const change = (i : any) => {
		formData.money = i
	}
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url: url
		})
	}
	const radioChange = (e : any) => {
		formData.pay_way = e.pay_way
		rechargeArr.value = e.recharge_amount ? e.recharge_amount : []
	}
	const getPayment = async () => {
		const data = await getpayWayList()
		paymentArr.value = data.lists
		formData.pay_way = data.lists[0].pay_way
		rechargeArr.value = data.lists[0].recharge_amount
	}
	const submitEvent = async () => {
		if (!formData.pay_way) return toast('Silahkan pilih pengisian ulang')
		if (!formData.money) return toast('Silahkan pilih jumlah untuk mengisi ulang')
		const resData = await getRecharge({ money: formData.money })
		if (resData.code == 1) {
			emitter.emit('gifType')
			getPrepay(resData.data)
		} else {
			toast(resData.msg)
		}
	}
	const getPrepay = (rechargeInfo : any) => {
		setTimeout(async () => {
			const payInfo = {
				// attach: "",
				// code: "",
				// description: "",
				order_amount: formData.money,
				order_id: rechargeInfo.order_id,
				// out_trade_no: "",
				pay_way: formData.pay_way,
				// redirect: "",
				scene: rechargeInfo.from
			}
			const resData = await prepay(payInfo)
			if (resData.code == 1) {
				const link = resData.data.detail.PayURL
				// #ifdef APP
				plus.runtime.openURL(link)
				// #endif
				// #ifdef H5
				window.location.href = link
				// #endif
			} else {
				toast(resData.msg)
			}
            emitter.emit('toast_close')
		}, 3000)
	}
	onShow(() => {
		getPayment()
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

		.recharge {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.recharge_con {
				.recharge_payment {
					padding: 20rpx 30rpx;
					border-radius: 12rpx;
					background: #FFFFFF;

					.payment_head {
						margin-bottom: 20rpx;
						font-family: Arial;
						font-size: 30rpx;
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

				.settings_card {
					padding: 20rpx 30rpx;
					border-radius: 12rpx;
					background: #FFFFFF;

					.settings_head {
						font-family: Arial;
						font-size: 30rpx;
						font-weight: 700;
						line-height: 48rpx;
						text-align: left;
						color: #1E4B2E;
					}

					.settings_list {
						display: grid;
						grid-template-columns: repeat(3, 1fr);
						gap: 0 10rpx;

						.settings_label {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 188rpx;
							height: 120rpx;
							border-radius: 8rpx;
							background: #F0F0F0;

							.settings_Item {
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 700;
								text-align: center;
								color: #1E1E1E;
							}
						}

						.active {
							border: 2rpx solid #1E4B2E;
							background: #E5F0FF;
						}
					}
					.trade_submit {

						.trade_Item {
							margin-bottom: 20rpx;

							.trade_title {
								font-family: Arial;
								font-size: 30rpx;
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
							font-family: Arial;
							font-size: 24rpx;
							font-weight: 500;
							line-height: 40rpx;
							text-align: left;
							color: #8B9098;
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
				.recharge_box{
					margin-top: 20rpx;
					padding: 20rpx;
					border-radius: 12rpx;
					background: #FFFFFF;
					.recharge_text{
						font-family: Arial;
						font-size: 20rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #1E1E1E;
						word-break: keep-all;
					}
				}
			}
		}
	}
</style>

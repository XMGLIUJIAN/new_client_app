<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="recharge  pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="DEPOSIT" title-color="#1E1E1E">
					<template #right>
						<view class="contact mr-[20rpx]" @tap="navigateTo('/pages/customer_service/customer_service')">
							<u-image width="40" height="40" src="@/static/images/user/icon_service.png" alt="" />
						</view>
					</template>
				</u-navbar>
			</u-sticky>
			<view class="recharge_con px-[40rpx]">
				<view class="recharge_payment mt-[40rpx] mb-[20rpx]">
					<view class="payment_head">Memilih Pembayaran：</view>
					<u-radio-group v-model="formData.pay_way">
						<view class="payment_list">
							<view class="payment_Item mb-[20rpx]" @tap="radioChange(item)" v-for="(item,index) in paymentArr"
								:key="index">
								<view class="payment_label">
									<u-image width="100" height="100" :src="item.icon" alt="" />
									<view class="payment_name">{{item.name}}</view>
								</view>
								<u-radio shape="circle" @change="radioChange" :name="item.pay_way"></u-radio>
							</view>
						</view>
					</u-radio-group>
				</view>
				<view class="settings_card mb-[40rpx]">
					<view class="settings_head">Memilih Nominal：</view>
					<view class="settings_list">
						<view class="settings_label mt-[20rpx] mb-[20rpx]" v-for="e in rechargeArr" :key="e"
							@tap="change(e)" :class="{'active':formData.money == e}">
							<view class="settings_Item">
								{{formatNumber(e)}}
							</view>
						</view>
					</view>
					<view class="empty mt-[50rpx]" v-if="!rechargeArr.length">
						<u-empty text="Kesalahan jaringan, silakan coba lagi" mode="data" icon-color="#999999" color="#999999"></u-empty>
					</view>
					<view class="trade_submit">
						<view class="trade_Item">
							<view class="trade_title">Jumlah Deposit：</view>
							<view class="trade_input">
								<u-input v-model="formData.money" type="number" :border="false"
									placeholder-style="color: #999999;font-size:28rpx;"
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
		background: #F6F6F6 !important;
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
						color: #1E1E1E;
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
					padding: 40rpx;
					border-radius: 12rpx;
					background: #FFFFFF;

					.settings_head {
						margin-bottom: 20rpx;
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
								font-size: 28rpx;
								font-weight: 700;
								text-align: center;
								color: #1E1E1E;
							}
						}

						.active {
							border: 3rpx solid #0067E0;
							background: #E5F0FF;
						}
					}
					.trade_submit {
						margin-top: 20rpx;
					
						.trade_Item {
							margin-bottom: 20rpx;
					
							.trade_title {
								font-family: Arial;
								font-size: 32rpx;
								font-weight: 700;
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
						
						.trade_tips{
							margin: 10rpx 0;
							font-family: Arial;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 40rpx;
							text-align: left;
							color: #999999;
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
				.recharge_box{
					margin-top: 10rpx;
					padding: 20rpx;
					border-radius: 12rpx;
					background: #FFFFFF;
					.recharge_text{
						font-family: Arial;
						font-size: 28rpx;
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
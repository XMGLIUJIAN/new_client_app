<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="bind_card pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="DATA BANK" :title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
			<view class="card_con mt-[50rpx] pt-[30rpx] pb-[30rpx] px-[30rpx] mx-[30rpx]">
				<view class="trade_Item">
					<view class="trade_head">
						<view class="trade_title">Nama</view>
					</view>
					<view class="trade_input">
						<u-input v-model="formData.name" :border="false" placeholder-style="color: #8B9098;font-size:24rpx;"
							placeholder="Masukkan Nama Anda" />
					</view>
				</view>
				<view class="trade_Item">
					<view class="trade_head">
						<view class="trade_title">Nomor Rekening</view>
					</view>
					<view class="trade_input">
						<u-input v-model="formData.bank_card" :border="false" :maxlength="16" placeholder-style="color: #8B9098;font-size:24rpx;"
							placeholder="Masukkan Nomor Rekening" />
					</view>
				</view>
				<view class="trade_Item">
					<view class="trade_head">
						<view class="trade_title">Bank</view>
					</view>
					<view class="trade_input">
						<u-input type="select" @click="selectBank" v-model="formData.bank_name" :border="false"
							placeholder-style="color: #8B9098;font-size:24rpx;" placeholder="Pilih Bank" />
					</view>
				</view>
				<view class="description mt-[20rpx]">
					Untuk memastikan penarikan Anda cepat dan benar, harap periksa apakah informasi yang Anda isi sudah benar
				</view>
			</view>
			<view class="submit_btn mt-[50rpx] mx-[30rpx]" @tap="submitEvent">Konfirmasi</view>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { ref, reactive } from 'vue'
	import { useUserStore } from '@/stores/user'
	import { onLoad, onShow, onPageScroll } from '@dcloudio/uni-app'
	import { storeToRefs } from 'pinia'
	import { emitter } from '@/utils/emitter';
	import { bankCardAdd, bankCardDetail, bankCardEdit } from '@/api/bank'
	const scrollTop = ref<number>(0)
	const card_id = ref<Number>(0)
	const userStore = useUserStore()
	const { userInfo } = storeToRefs(userStore)
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const selectBank = () => {
		navigateTo('/pages/select_bank/select_bank')
	}
	const formData = reactive({
		icon: '',
		name: '',
		bank_card: '',
		mobile: '',
		ifsc:'',
		bank_name: '',
		area_code: ''
	})
	const getBankInfo = () => {
		emitter.on('bank',(e: any) => {
			formData.bank_name = e.name
			formData.icon = e.img
			formData.ifsc = e.ifsc
		})
	}
	const getCard = async () => {
		if (!card_id.value) return
		const data = await bankCardDetail({ id: card_id.value })
		Object.assign(formData, data)
	}
	const resetForm = () => {
		const resetData = {
			icon: '',
			name: '',
			bank_card: '',
			mobile: '',
			ifsc: '',
			bank_name: '',
			area_code: ''
		}
		Object.assign(formData, resetData)
	}
	const toast = (message : any = '') => {
		emitter.emit('toast',message)
	}
	const submitEvent = async () => {
		if(formData.bank_card.length < 10) return toast('Nomor kartu bank 10-16 digit')
		if (card_id.value) {
			try {
				await bankCardEdit({ id: card_id.value, user_id: userInfo.value.id, ...formData })
				resetForm()
				uni.navigateBack()
			} catch (error) {
				toast(error)
			}
		} else {
			try {
				await bankCardAdd({ user_id: userInfo.value.id, ...formData })
				resetForm()
				uni.navigateBack()
			} catch (error) {
				toast(error)
			}
		}
	}
	onLoad((options : any) => {
		card_id.value = options.id
		getBankInfo()
		getCard()
	})
	onShow(() => {
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

		.bind_card {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.card_con {
				background: #FFFFFF;
				border-radius: 12rpx;
				.trade_Item {
					margin-bottom: 40rpx;

					.trade_head {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.trade_title {
							font-family:  Arial;
							font-size: 32rpx;
							font-weight: 500;
							line-height: 40rpx;
							text-align: left;
							color: #1E1E1E;
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

				.description {
					font-family:  Arial;
					font-size: 24rpx;
					font-weight: 500;
					line-height: 40rpx;
					text-align: left;
					color: #8B9098;
				}
			}
			.submit_btn {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 90rpx;
				border-radius: 12rpx;
				background: #458060;
				font-family:  Arial;
				font-size: 32rpx;
				font-weight: 500;
				line-height: 48rpx;
				text-align: center;
				color: #FFFFFF;
			}
		}
	}
</style>
<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="change_payPwd">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#FFFFFF"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="KATA SANDI PENARIKAN" title-color="#FFFFFF">
				</u-navbar>
			</u-sticky>
			<view class="password_con mt-[50rpx]">
				<template v-if="type != 'set' && current != 'password' && current != 'password_confirm'">
					<view class="password_recover">
						<view class="recover_head">Silakan masukkan Password penarikan yang lama</view>
						<view class="recover_code mt-[20rpx] mb-[20rpx]">
							<u-message-input v-model="formData.old_password" font-size="64" bg-color="#F1F1F1"
								active-color="#1E1E1E" inactive-color="#F1F1F1" :focus="true" :breathe="false"
								maxlength="6" mode="box"></u-message-input>
						</view>
						<view class="forget" @tap="forget">Lupa password?</view>
					</view>
					<view class="submit-btn mt-[40rpx]" @click="editPassword">Pergi Ke Sunting</view>
				</template>

				<template v-if="current == 'password'">
					<view class="password_recover">
						<view class="recover_head">Masukkan Kode Verifikasi Baru</view>
						<view class="recover_code mt-[20rpx] mb-[20rpx]">
							<u-message-input v-model="formData.password" font-size="64" bg-color="#F1F1F1"
								active-color="#1E1E1E" inactive-color="#F1F1F1" :focus="true" :breathe="false"
								maxlength="6" mode="box"></u-message-input>
						</view>
						<view class="recover_text">Kata Sandi Penarikan Hanya Boleh Nomor</view>
					</view>
					<view class="submit-btn mt-[40rpx]" @click="newConfirm">Konfirmasi</view>
				</template>

				<template v-if="current == 'password_confirm'">
					<view class="password_recover">
						<view class="recover_head">Pastikan Kembali Kata Sandi Penarikan</view>
						<view class="recover_code mt-[20rpx] mb-[20rpx]">
							<u-message-input v-model="formData.password_confirm" font-size="64" bg-color="#F1F1F1"
								active-color="#1E1E1E" inactive-color="#F1F1F1" :focus="true" :breathe="false"
								maxlength="6" mode="box"></u-message-input>
						</view>
						<view class="recover_text">Kata Sandi Penarikan Hanya Boleh Nomor</view>
					</view>
					<view class="submit-btn mt-[40rpx] mx-[30rpx]" @click="pwdConfirm">Konfirmasi</view>
				</template>

			</view>
		</view>
		<Popup v-if="passwordPopup" :type="passwordType" :message="passwordMessage" @finish="finishPopup"
			@confirm="canclePopup"></Popup>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { setPayPassword, userChangePayPwd } from '@/api/user'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { RequestCodeEnum } from '@/enums/requestEnums'
	import { ref, reactive } from 'vue'
	import { emitter } from '@/utils/emitter';
	import { useRouter } from "uniapp-router-next";
	import Popup from './components/popup.vue'
	const scrollTop = ref<number>(0)
	const router = useRouter()
	const type = ref('')
	const passwordMessage = ref<any>(null)
	const passwordPopup = ref<Boolean>(false)
	const passwordType = ref<String>('success')
	const current = ref<String>('')
	const formData = reactive({
		old_password: '',
		password: '',
		password_confirm: ''
	})
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const forget = () => {
		router.navigateTo('/pages/forget_payPwd/forget_payPwd')
	}
	const editPassword = () => {
		if (!formData.old_password) return toast('Silakan masukkan Password asli')
		current.value = 'password'
	}
	const newConfirm = () => {
		if (!formData.password) return toast('Silakan masukkan sandi baru')
		current.value = 'password_confirm'
	}
	const finishPopup = () => {
		setTimeout(() => {
			resetForm()
			uni.navigateBack()
		}, 1500)
	}
	const canclePopup = () => {
		current.value = type.value == 'set' ? 'password' : ''
		resetForm()
		passwordPopup.value = false
	}
	const resetForm = () => {
		const resetData = {
			old_password: '',
			password: '',
			password_confirm: ''
		}
		Object.assign(formData, resetData)
	}
	const pwdConfirm = async () => {
		if (!formData.password_confirm) return toast('Tolong masukkan kata sandinya lagi')
		if (formData.password != formData.password_confirm) return toast('Masukan kata sandi tidak sesuai')
		if (type.value == 'set') {
			const data = await setPayPassword(formData)
			if (data.code == RequestCodeEnum.SUCCESS) {
				passwordType.value = 'success'
				passwordPopup.value = true
			} else {
				passwordMessage.value = data.msg
				passwordType.value = 'lose'
				passwordPopup.value = true
			}
		} else {
			const data = await userChangePayPwd(formData)
			if (data.code == RequestCodeEnum.SUCCESS) {
				passwordType.value = 'success'
				passwordPopup.value = true
			} else {
				passwordMessage.value = data.msg
				passwordType.value = 'lose'
				passwordPopup.value = true
			}
		}
	}
	onLoad((options : any) => {
		type.value = options.type || ''
		current.value = type.value == 'set' ? 'password' : ''
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

		.change_payPwd {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.password_con {
				padding: 0 40rpx;

				.password_recover {
					padding: 20rpx 30rpx 50rpx 30rpx;
					border-radius: 12rpx;
					background: #FFFFFF;
					.recover_head {
						font-family: Arial;
						font-size: 26rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #1E1E1E;
					}

					.recover_text {
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #8B9098;
					}

					.forget {
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #ECB54B;
					}
				}
				.submit-btn {
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
	}
</style>
<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="498" src="@/static/images/pageStyle/imageGroupFive.png"></u-image>
		</view>
		<view class="change_payPwd">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="KATA SANDI PENARIKAN" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="password_con mt-[50rpx]">
				<view class="password_recover"
					v-if="type != 'set' && current != 'password' && current != 'password_confirm'">
					<view class="recover_head">Silakan masukkan Password penarikan yang lama：</view>
					<view class="recover_code mt-[20rpx] mb-[20rpx]">
						<u-message-input v-model="formData.old_password" font-size="64" bg-color="#FFFFFF"
							active-color="#1E1E1E" inactive-color="#D9D9D9" :focus="true" :breathe="false" maxlength="6"
							mode="box"></u-message-input>
					</view>
					<view class="forget" @tap="forget">Lupa password?</view>
					<view class="submit-btn mt-[40rpx]" @click="editPassword">Pergi Ke Sunting</view>
				</view>
				<view class="password_recover" v-if="current == 'password'">
					<view class="recover_head">Masukkan Kode Verifikasi Baru：</view>
					<view class="recover_code mt-[20rpx] mb-[20rpx]">
						<u-message-input v-model="formData.password" font-size="64" bg-color="#FFFFFF"
							active-color="#1E1E1E" inactive-color="#D9D9D9" :focus="true" :breathe="false" maxlength="6"
							mode="box"></u-message-input>
					</view>
					<view class="recover_text">Kata Sandi Penarikan Hanya Boleh Nomor</view>
					<view class="submit-btn mt-[40rpx]" @click="newConfirm">Konfirmasi</view>
				</view>
				<view class="password_recover" v-if="current == 'password_confirm'">
					<view class="recover_head">Pastikan Kembali Kata Sandi Penarikan：</view>
					<view class="recover_code mt-[20rpx] mb-[20rpx]">
						<u-message-input v-model="formData.password_confirm" font-size="64" bg-color="#FFFFFF"
							active-color="#1E1E1E" inactive-color="#D9D9D9" :focus="true" :breathe="false" maxlength="6"
							mode="box"></u-message-input>
					</view>
					<view class="recover_text">Kata Sandi Penarikan Hanya Boleh Nomor</view>
					<view class="submit-btn mt-[40rpx]" @click="pwdConfirm">Konfirmasi</view>
				</view>
			</view>
			<Popup v-if="passwordPopup" :type="passwordType" :message="passwordMessage" @finish="finishPopup"
				@confirm="canclePopup"></Popup>
		</view>
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
		emitter.emit('toast',message)
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
		background: #F6F6F6 !important;
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
					.recover_head {
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #1E1E1E;
					}

					.recover_text {
						font-family:  Arial;
						font-size: 26rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #999999;
					}

					.forget {
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #0067E0;
					}

					.submit-btn {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 90rpx;
						border-radius: 8rpx;
						background: #0067E0;
						font-family:  Arial;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: center;
						color: #FFFFFF;
					}
				}

				.message {
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 20rpx;
					border-radius: 10rpx;
					border: 2rpx solid #EBEBEB;
					font-family:  Arial;
					font-size: 26rpx;
					font-weight: 500;
					text-align: center;
					color: #1E1E1E;
					word-break: normal;
				}
			}
		}
	}
</style>
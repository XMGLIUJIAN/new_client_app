<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="612" src="@/static/images/pageStyle/imageGroupFirst.png"></u-image>
		</view>
		<view class="forget">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false"
					:back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					:title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
					<view class="slot-wrap">
						<view class="forget_head" :style="{color:scrollTop ? '#1E1E1E' : '#FFFFFF'}">
							MEMULIHKAN KATA SANDI
						</view>
					</view>
				</u-navbar>
			</u-sticky>
			<view class="rice_head mt-[50rpx] px-[40rpx]">
				<view class="rice_logo pt-[40rpx]">
					<view class="welcome">Selamat datang</view>
					<view class="appName">Rice Rich</view>
				</view>
				<u-image class="logo_image" width="360" height="360" src="@/static/images/user/logo.png" alt="" />
			</view>
			<view class="forget_con pt-[40rpx] px-[40rpx]">
				<view class="forget_recover" v-if="current == 'phone'">
					<view class="recover_head mb-[20rpx]">Memulihkan kata sandi</view>
					<view class="recover_text">
						Demi memastikan keamanan akun anda,Silahkan masukkan nomor kode verifikasi anda untuk masuk kembali.
					</view>
					<view class="recover_row mt-[60rpx]">
						<u-image width="50" height="50" src="@/static/images/icon/phone.png" alt="" />
						<view class="recover_input">
							<u-input type="text" v-model="formData.mobile" :border="false"
								placeholder-style="color: #999999;" placeholder="Nomor HP anda(08XXXXXX)" />
						</view>
					</view>
					<view class="submit-btn mt-[40rpx]" @tap="nextStep">Selanjutnya</view>
				</view>
				<view class="forget_recover" v-if="current == 'code'">
					<view class="recover_head mb-[20rpx]">Masukkan kode verifikasi</view>
					<view class="recover_text">
						Kode verifikasi terkirim <text class="phone_num">(+62) {{formData.mobile}}</text>
					</view>

					<view class="recover_code mt-[50rpx]">
						<u-message-input v-model="formData.code" @finish="codeNext" font-size="64"
							active-color="#1E1E1E" inactive-color="#D9D9D9" :focus="true" :breathe="true" maxlength="6"
							mode="bottomLine"></u-message-input>
					</view>
					<view class="sendCode mt-[50rpx]" @click="sendSms">
						<u-verification-code ref="uCodeRef" :seconds="60" start-text="Kirim kode verifikasi"
							change-text="X detik kirim kembali" end-text="Kirim ulang kode verifikasi" :keep-running="false"
							@change="codeChange" />
						<text class="codeTips">
							{{ codeTips }}
						</text>
					</view>
				</view>
				<view class="forget_recover" v-if="current == 'password'">
					<view class="recover_head mb-[20rpx]">Atur ulang sandi</view>
					<view class="recover_text">
						8-20 karakter, bukan angka murni
					</view>
					<view class="recover_row mt-[40rpx]">
						<u-image width="50" height="50" src="@/static/images/icon/password.png" alt="" />
						<view class="recover_input">
							<u-input type="password" v-model="formData.password" :border="false"
								placeholder-style="color: #999999;" placeholder="Masukkan kata sandi" />
						</view>
					</view>
					<view class="recover_row mt-[20rpx]">
						<u-image width="50" height="50" src="@/static/images/icon/password.png" alt="" />
						<view class="recover_input">
							<u-input type="password" v-model="formData.password_confirm" :border="false"
								placeholder-style="color: #999999;" placeholder="Masukkan kata sandi kembali" />
						</view>
					</view>
					<u-button class="submit-btn mt-[40rpx]" :class="{'disabled': disabledStatus}"
						:disabled="disabledStatus" @click="handleConfirm" hover-class="none">selesai</u-button>
				</view>
			</view>
			<Popup v-if="forgetPopup" @confirm="forgetConfirm" :message="forgetMessage"></Popup>
			<toastPopup></toastPopup>
		</view>
	</view>

</template>

<script setup lang="ts">
	import { smsSend } from '@/api/app'
	import { forgotPassword } from '@/api/user'
	import { SMSEnum } from '@/enums/appEnums'
	import { RequestCodeEnum } from '@/enums/requestEnums'
	import { reactive, ref, shallowRef, computed, nextTick } from 'vue'
	import { useRouter } from "uniapp-router-next";
	import { emitter } from '@/utils/emitter';
	import { onPageScroll } from '@dcloudio/uni-app'
	import Popup from './components/popup.vue'
	const router = useRouter()
	const scrollTop = ref<number>(0)
	const forgetPopup = ref<Boolean>(false)
	const current = ref<String>('phone')
	const uCodeRef = shallowRef()
	const codeTips = ref('')
	const forgetMessage = ref<any>(null)
	const formData = reactive({
		mobile: '',
		code: '',
		password: '',
		password_confirm: ''
	})
	const forgetConfirm = (value : Boolean) => {
		resetForm()
		current.value = 'code'
		forgetPopup.value = value
	}
	const disabledStatus = computed(() => {
		let status = formData.password && formData.password_confirm ? false : true
		return status
	})
	const toast = (message : any = '') => {
		emitter.emit('toast',message)
	}
	const codeChange = (text : string) => {
		codeTips.value = text
	}
	const nextStep = () => {
		current.value = 'code'
		nextTick(() => {
			sendSms()
		})
	}
	const codeNext = () => {
		current.value = 'password'
		nextTick(() => {
			uCodeRef.value?.reset()
		})
	}
	const sendSms = async () => {
		if (!formData.mobile) return
		if (uCodeRef.value?.canGetCode) {
			await smsSend({
				scene: SMSEnum.FIND_PASSWORD,
				mobile: formData.mobile
			})
			toast('Kode berhasil di kirim')
			uCodeRef.value?.start()
		}
	}
	const resetForm = () => {
		const resetData = {
			code: '',
			password: '',
			password_confirm: ''
		}
		Object.assign(formData, resetData)
	}
	const handleConfirm = async () => {
		if (!formData.mobile) return toast('Nomor HP anda(08XXXXXX)')
		if (!formData.password) return toast('Masukkan kata sandi')
		if (!formData.password_confirm) return toast('Masukkan kata sandi kembali')
		if (formData.password != formData.password_confirm) return toast('Masukan kata sandi tidak sesuai')
		const data = await forgotPassword(formData)
		if (data.code == RequestCodeEnum.SUCCESS) {
			toast('Sukses')
			resetForm()
			setTimeout(() => {
				router.reLaunch('/pages/login/login')
			}, 1500)
		} else {
			forgetMessage.value = data.msg
			forgetPopup.value = true
		}
	}
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page {
		background: #FFFFFF !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.forget {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.slot-wrap {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;

				.forget_head {
					padding: 20rpx;
					font-family:  Arial;
					font-size: 32rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: center;
				}
			}

			.rice_head {
				position: relative;

				.rice_logo {
					.welcome {
						font-family:  Arial;
						font-size: 40rpx;
						font-weight: 500;
						line-height: 80rpx;
						text-align: left;
						color: #FFFFFF;
					}

					.appName {
						font-family:  Arial;
						font-size: 52rpx;
						font-weight: 900;
						line-height: 80rpx;
						text-align: left;
						color: #FFFFFF;
					}
				}

				.logo_image {
					position: absolute;
					top: 0;
					right: 0;
					z-index: 90;
				}
			}

			.forget_con {
				position: relative;
				top: 80rpx;
				z-index: 95;
				border-top-left-radius: 30rpx;
				border-top-right-radius: 30rpx;
				background: #FFFFFF;

				.forget_recover {
					.recover_head {
						font-family:  Arial;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 50rpx;
						text-align: left;
						color: #1E1E1E;
					}

					.recover_text {
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #999999;

						.phone_num {
							color: #0067E0;
						}
					}

					.sendCode {
						display: flex;
						justify-content: center;
						align-items: center;

						.codeTips {
							font-family:  Arial;
							font-size: 32rpx;
							font-weight: 500;
							line-height: 50rpx;
							text-align: center;
							color: #0067E0;
						}
					}

					.recover_row {
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 20rpx 40rpx;
						border-radius: 24rpx;
						background: #F4F7FD;

						.recover_input {
							margin-left: 20rpx;
							width: 100%;
						}
					}

					.submit-btn {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 90rpx;
						border-radius: 20rpx;
						background: #0067E0;
						font-family:  Arial;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: center;
						color: #FFFFFF;
					}

					.disabled {
						background: #BDD8F7;
					}
				}
			}
		}
	}
</style>
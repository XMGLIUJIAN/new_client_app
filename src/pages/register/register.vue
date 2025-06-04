<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="1624" src="@/static/images/page/maskGroup.png"></u-image>
		</view>
		<view class="register">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false"
					:back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" title="DAFTAR"
					:title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
			<view class="register_con  pt-[40rpx] pb-[40rpx] px-[40rpx]">
				<template v-if="current == 'register'">
					<view class="recover_head">
						<u-image width="85" height="22" src="@/static/images/icon/arrow_left.png"></u-image>
						<view class="recover_head_tips">Daftar Akun Anda</view>
						<u-image width="85" height="22" src="@/static/images/icon/arrow_right.png"></u-image>
					</view>
					<view class="recover_row mt-[40rpx]">
						<u-image width="40" height="40" src="@/static/images/icon/phone.png" alt="" />
						<view class="recover_input">
							<u-input type="text" v-model="formData.mobile" :border="false"
								placeholder-style="color: #8B9098;font-size:24rpx;"
								placeholder="Nomor HP anda(08XXXXXX)" />
						</view>
					</view>
					<view class="recover_row mt-[20rpx]">
						<u-image width="40" height="40" src="@/static/images/icon/password.png" alt="" />
						<view class="recover_input">
							<u-input type="password" v-model="formData.password" :maxlength="12" :border="false"
								placeholder-style="color: #8B9098;font-size:24rpx;" placeholder="Masukkan kata sandi" />
						</view>
					</view>
					<view class="recover_row mt-[20rpx]">
						<u-image width="40" height="40" src="@/static/images/icon/password.png" alt="" />
						<view class="recover_input">
							<u-input type="password" v-model="formData.password_confirm" :maxlength="12" :border="false"
								placeholder-style="color: #8B9098;font-size:24rpx;"
								placeholder="Masukkan kata sandi kembali" />
						</view>
					</view>
					<view class="recover_row mt-[20rpx]">
						<u-image width="40" height="40" src="@/static/images/icon/extend.png" alt="" />
						<view class="recover_input">
							<u-input type="text" v-model="formData.agent_id" :border="false"
								placeholder-style="color: #8B9098;font-size:24rpx;"
								placeholder="Masukkan kode Referral" />
						</view>
					</view>
					<view class="readAgree_box mt-[20rpx]">
						<u-checkbox v-model="isCheckAgreement" shape="circle" active-color="#528B6B">
							<view class="readAgree">
								<text>Silahkan baca dan setuju</text>
								<router-navigate hover-class="none" to="/pages/agreement/agreement?type=service">
									<text class="agreement">《Ketentuan layanan》</text>
								</router-navigate>
							</view>
							<view class="readAgree">
								<text>dan</text>
								<router-navigate hover-class="none" to="/pages/agreement/agreement?type=privacy">
									<text class="agreement">《kebijakan Privasi》</text>
								</router-navigate>
							</view>
						</u-checkbox>
					</view>
					<u-button class="submit-btn mt-[40rpx]" :class="{'disabled': disabledStatus}"
						:disabled="disabledStatus" @click="nextStep">Selanjutnya</u-button>
				</template>
				<template v-if="current == 'code'">
					<view class="recover_head" v-if="current == 'code'">
						<u-image width="85" height="22" src="@/static/images/icon/arrow_left.png"></u-image>
						<view class="recover_head_tips">Masukkan kode verifikasi</view>
						<u-image width="85" height="22" src="@/static/images/icon/arrow_right.png"></u-image>
					</view>
					<view class="forget_recover">
						<view class="recover_head mt-[40rpx]">
							<u-image width="70" height="60" src="@/static/images/icon/message.png" alt="" />
							<view class="recover_text">
								<view class="recover_text_title">Kode verifikasi terkirim ke nomor ponsel anda</view>
								<text class="phone_num">+62{{bankFormat(formData.mobile)}}</text>
							</view>
						</view>

						<view class="recover_code mt-[50rpx]">
							<u-message-input v-model="formData.verification_code"
								font-size="64" active-color="#1E1E1E" inactive-color="#29593E" :focus="true"
								:breathe="true" maxlength="6" mode="bottomLine"></u-message-input>
						</view>
						<view class="sendCode mt-[20rpx]" @click="sendSms">
							<view class="sendcode_title">Tidak Menerima Kode?</view>
							<u-verification-code ref="uCodeRef" :seconds="60" start-text="Kirim kode verifikasi"
								change-text="X detik kirim kembali" end-text="Kirim ulang kode verifikasi"
								:keep-running="false" @change="codeChange"  />
								<text class="codeTips">
									{{ codeTips }}
								</text>
						</view>
						<u-button class="submit-btn mt-[40rpx]" :class="{'disabled': disabled}"
							:disabled="disabled" @click="registerEvent">Konfirmasi</u-button>
					</view>
				</template>
			</view>
			<view class="contact" @tap="contactService">
				<u-image width="75" height="75" src="@/static/images/icon/contact.png" alt="" />
			</view>
			<toastPopup></toastPopup>
			<contactPopup v-if="contactShow" :service="serviceInfo" @confirm="contactEvent"
				@cancel="contactShow = false"></contactPopup>
			<Popup v-if="showModel" @confirm="confirm" @cancel="showModel = false"></Popup>
			<registerPopup v-if="registerShow" :type="registerType" :msg="failedMessage" @confirm="confirmPopup">
			</registerPopup>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { smsSend } from '@/api/app'
	import { customerServiceInfo } from '@/api/eventInfo'
	import { SMSEnum } from '@/enums/appEnums'
	import { emitter } from '@/utils/emitter';
	import { RequestCodeEnum } from '@/enums/requestEnums'
	import { login, register, registerInviteCodeVerify } from '@/api/account'
	import { useAppStore } from '@/stores/app'
	import { computed, reactive, ref, shallowRef, nextTick } from 'vue'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { getDeviceInfo, bankFormat } from '@/utils/util'
	import Popup from './components/popup.vue'
	import registerPopup from './components/registerPopup.vue'
	import contactPopup from './components/contactPopup.vue'
	import { useUserStore } from '@/stores/user'
	import { useRouter } from 'uniapp-router-next'
	const router = useRouter()
	const userStore = useUserStore()
	const uCodeRef = shallowRef()
	const scrollTop = ref<number>(0)
	const serviceInfo = ref<any>({})
	const isCheckAgreement = ref(false)
	const registerShow = ref(false)
	const current = ref<String>('register')
	const failedMessage = ref<String>('')
	const codeTips = ref('')
	const contactShow = ref<Boolean>(false)
	const registerType = ref<String>('success') // success 成功  lose 失败
	const appStore = useAppStore()
	const isOpenAgreement = computed(() => appStore.getLoginConfig.login_agreement == 1)
	const formData = reactive({
		mobile: '',
		verification_code: '',
		password: '',
		password_confirm: '',
		agent_id: '',
		whatsapp: '',
		telegram: '',
		registerMac: ''
	})
	const disabledStatus = computed(() => {
		let status = formData.mobile && formData.password && formData.agent_id && formData.password_confirm ? false : true
		return status
	})
	const disabled = computed(() => {
		let status = formData.verification_code ? false : true
		return status
	})
	const nextStep = async () => {
		if (!formData.mobile) return toast('Nomor HP anda(08XXXXXX)')
		if (!formData.password) return toast('Masukkan kata sandi')
		if (formData.password.length < 6) return toast('Kata sandi harus antara 6 dan 12 karakter')
		if (!formData.password_confirm) return toast('Masukan kata sandi tidak sesuai')
		if (!formData.agent_id) return toast('Masukkan kode Referral')
		if (formData.password != formData.password_confirm) return toast('Masukan kata sandi tidak sesuai')
		if (!isCheckAgreement.value && isOpenAgreement.value) return (showModel.value = true)
		const resData = await registerInviteCodeVerify({ invite_code: formData.agent_id, mobile: formData.mobile, password: formData.password })
		if (resData.code == 1) {
			current.value = 'code'
			nextTick(() => {
				sendSms()
			})
		} else {
			failedMessage.value = resData.msg
			registerType.value = 'lose'
			registerShow.value = true
		}
	}
	const contactEvent = (link : string) => {
		contactShow.value = false
		// #ifdef APP
		plus.runtime.openURL(link)
		// #endif
		// #ifdef H5
		window.location.href = link
		// #endif
	}
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const codeChange = (text : string) => {
		codeTips.value = text
	}
	const sendSms = async () => {
		if (!formData.mobile) return
		if (uCodeRef.value?.canGetCode) {
			await smsSend({
				scene: SMSEnum.REGISTER,
				mobile: formData.mobile
			})
			toast('Kode berhasil di kirim')
			uCodeRef.value?.start()
		}
	}
	const showModel = ref(false)
	const confirm = () => {
		isCheckAgreement.value = true
		showModel.value = false
	}
	const getInfo = async () => {
		const resdata = await customerServiceInfo()
		serviceInfo.value = resdata.data
	}
	const contactService = () => {
		getInfo()
		emitter.emit('gifType')
		setTimeout(() => {
			contactShow.value = true
		}, 3000)
	}
	const confirmPopup = (type : String) => {
		if (type == 'success') {
			registerShow.value = false
			loginFun()
		} else {
			formData.verification_code = ''
			registerShow.value = false
		}
	}

	const loginFun = async () => {
		emitter.emit('gifType')
		try {
			const data = await login({ scene: 1, account: formData.mobile, password: formData.password, registerMac: formData.registerMac })
			loginHandle(data)
		} catch (error : any) {
			toast(error)
		}
	}
	const loginHandle = async (data : any) => {
		userStore.login(data.token)
		await userStore.getUser()
		resetForm()
		router.switchTab('/pages/index/index')
	}
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const resetForm = () => {
		const resetData = {
			mobile: '',
			verification_code: '',
			password: '',
			password_confirm: '',
			agent_id: '',
			whatsapp: '',
			telegram: '',
			registerMac: ''
		}
		Object.assign(formData, resetData)
	}
	
	const registerEvent = async () => {
		if (!formData.verification_code) return toast('Silakan masukkan kode anda')
		emitter.emit('gifType')
		const system = getDeviceInfo()
		formData.registerMac = system.deviceId //获取设备唯一标识码
		const data = await register(formData)
		if (data.code == RequestCodeEnum.FAILED) {
			uCodeRef.value?.reset()
			failedMessage.value = data.msg
			registerType.value = 'lose'
			registerShow.value = true
		} else {
			current.value = 'register'
			uCodeRef.value?.reset()
			registerType.value = 'success'
			registerShow.value = true
		}
	}
	onLoad((options : any) => {
		formData.agent_id = options.agent_id
	})
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

		.imageGroup {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: -1;
		}

		.register {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.register_con {
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				padding: 50rpx;
				z-index: 95;
				border-top-left-radius: 12rpx;
				border-top-right-radius: 12rpx;
				background: #FFFFFF;

				.recover_head {
					display: flex;
					justify-content: center;
					align-items: center;

					.recover_head_tips {
						padding: 0 20rpx;
						font-family: Arial;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: center;
						color: #29593E;
					}
				}

				.recover_row {
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0 30rpx;
					border-radius: 12rpx;
					background: #FFFFFF;
					border: 2rpx solid #8B9098;

					.recover_input {
						margin-left: 20rpx;
						width: 100%;
					}
				}
			}

			.readAgree {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				font-family: Arial;
				font-size: 24rpx;
				font-weight: 500;
				line-height: 48rpx;
				text-align: center;
				color: #8B9098;

				.agreement {
					color: #458060;
				}
			}


			.submit-btn {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 72rpx;
				border-radius: 12rpx;
				background: #458060;
				font-family: Arial;
				font-size: 32rpx;
				font-weight: 500;
				line-height: 48rpx;
				text-align: center;
				color: #FFFFFF;
			}

			.disabled {
				background: #81AF95;
			}

			.forget_recover {
				.recover_head {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.recover_text {
						margin-left: 20rpx;

						.recover_text_title {
							font-family: Arial;
							font-size: 24rpx;
							font-weight: 500;
							line-height: 40rpx;
							text-align: left;
							color: #29593E;
						}

						.phone_num {
							font-family: Arial;
							font-size: 24rpx;
							font-weight: 500;
							line-height: 40rpx;
							text-align: left;
							color: #8B9098;
						}
					}
				}
				.sendCode {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.sendcode_title{
						margin-right: 10rpx;
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: center;
						color: #8B9098;
					}
					.codeTips {
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: center;
						color: #29593E;
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

			}

			.contact {
				position: fixed;
				top: 40%;
				right: 0;
				z-index: 100;
			}
		}
	}
</style>
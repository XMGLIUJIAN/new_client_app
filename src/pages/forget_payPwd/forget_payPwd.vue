<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="forget_payPwd">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#FFFFFF"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title-color="#FFFFFF">
					<view class="slot-wrap">
						<view class="forget_head">PEMULIHAN KATA SANDI</view>
					</view>
				</u-navbar>
			</u-sticky>
			<view class="forget_con px-[30rpx] pt-[50rpx]">
				<template v-if="current == 'phone'">
					<view class="forget_recover">
						<view class="recover_head mb-[20rpx]">Pemulihan Kata Sandi</view>
						<view class="recover_text">
							Hanya dapat dioperasikan sekali sehari untuk memastikan akun anda aman atau akun anda akan
							terkunci dan tidak dapat dit
						</view>
						<view class="recover_row mt-[50rpx]">
							<u-image width="50" height="50" src="@/static/images/icon/phone.png" alt="" />
							<view class="recover_input">
								<u-input type="text" v-model="formData.mobile" :border="false"
									placeholder-style="color: #8B9098;font-size:24rpx;" placeholder="Nomor HP anda(08XXXXXX)" />
							</view>
						</view>
					</view>
					<view class="submit-btn mt-[40rpx]" @tap="nextStep">Selanjutnya</view>
				</template>
				<template v-if="current == 'code'">
					<view class="forget_recover">
						<view class="recover_head mb-[20rpx]">Silakan masukkan kode verifikasi</view>
						<view class="recover_text">
							Kode verifikasi dikirim <text class="phone_num">(+62) {{formData.mobile}}</text>
						</view>

						<view class="recover_code mt-[50rpx]">
							<u-message-input v-model="formData.code" @finish="codeNext" font-size="64"
								active-color="#1E1E1E" inactive-color="#D9D9D9" :focus="true" :breathe="true"
								maxlength="6" mode="bottomLine"></u-message-input>
						</view>
						<view class="sendCode mt-[50rpx]" @click="sendSms">
							<u-verification-code ref="uCodeRef" :seconds="60" start-text="Kirim kode verifikasi"
								change-text="X detik kirim kembali" end-text="Kirim ulang kode verifikasi"
								:keep-running="false" @change="codeChange" />
							<text class="codeTips">
								{{ codeTips }}
							</text>
						</view>
					</view>
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
					<view class="submit-btn mt-[40rpx]" @click="pwdConfirm">Konfirmasi</view>
				</template>
			</view>
			<Popup v-if="forgetPopup" @confirm="forgetConfirm" :message="forgetMessage"></Popup>
		</view>
		<toastPopup></toastPopup>
	</view>

</template>
<script setup lang="ts">
	import { smsSend } from '@/api/app'
	import { forgotPayPassword } from '@/api/user'
	import { SMSEnum } from '@/enums/appEnums'
	import { RequestCodeEnum } from '@/enums/requestEnums'
	import { reactive, ref, shallowRef, computed, nextTick } from 'vue'
	import { onPageScroll } from '@dcloudio/uni-app'
	import { emitter } from '@/utils/emitter';
	import Popup from './components/popup.vue'
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
	const disabledStatus = computed(() => {
		let status = formData.password && formData.password_confirm ? false : true
		return status
	})
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const codeChange = (text : string) => {
		codeTips.value = text
	}
	const nextStep = () => {
		if (!formData.mobile) return toast('Nomor HP anda(08XXXXXX)')
		current.value = 'code'
		nextTick(() => {
			sendSms()
		})
	}
	const codeNext = () => {
		if (!formData.code) return toast('Silakan masukkan kode verifikasi anda')
		current.value = 'password'
		nextTick(() => {
			uCodeRef.value?.reset()
		})
	}
	const newConfirm = () => {
		if (!formData.password) return toast('Silakan masukkan sandi baru')
		current.value = 'password_confirm'
	}
	const sendSms = async () => {
		if (!formData.mobile) return
		if (uCodeRef.value?.canGetCode) {
			await smsSend({
				scene: SMSEnum.FIND_PAY_PASSWORD,
				mobile: formData.mobile
			})
			toast('Kode berhasil di kirim')
			uCodeRef.value?.start()
		}
	}
	const forgetConfirm = (value : Boolean) => {
		resetForm()
		current.value = 'phone'
		forgetPopup.value = value
	}
	const resetForm = () => {
		const resetData = {
			mobile: '',
			code: '',
			password: '',
			password_confirm: ''
		}
		Object.assign(formData, resetData)
	}
	const pwdConfirm = async () => {
		if (!formData.password_confirm) return toast('Tolong masukkan kata sandinya lagi')
		if (formData.password != formData.password_confirm) return toast('Masukan kata sandi tidak sesuai')
		const data = await forgotPayPassword(formData)
		if (data.code == RequestCodeEnum.SUCCESS) {
			toast('Pengaturan kata sandi berhasil')
			setTimeout(() => {
				resetForm()
				uni.navigateBack()
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
		background: #F1F1F1 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.forget_payPwd {
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
					font-family: Arial;
					font-size: 32rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: center;
					color: #FFFFFF;
				}
			}

			.forget_con {
				.forget_recover {
					padding: 10rpx 30rpx;
					border-radius: 12rpx;
					background: #FFFFFF;
					.recover_head {
						font-family: Arial;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 50rpx;
						text-align: left;
						color: #1E1E1E;
					}

					.recover_text {
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #8B9098;

						.phone_num {
							color: #1E4B2E;
						}
					}

					.sendCode {
						display: flex;
						justify-content: center;
						align-items: center;

						.codeTips {
							font-family: Arial;
							font-size: 32rpx;
							font-weight: 500;
							line-height: 50rpx;
							text-align: center;
							color: #1E4B2E;
						}
					}

					.recover_row {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-bottom: 20rpx;
						padding: 10rpx 30rpx;
						background: #FFFFFF;
						border-radius: 12rpx;
						border: 2rpx solid #8B9098;
						.recover_input {
							margin-left: 20rpx;
							width: 100%;
						}
					}
				}

				.password_recover {
					padding: 10rpx 30rpx;
					border-radius: 12rpx;
					background: #FFFFFF;
					.recover_head {
						font-family: Arial;
						font-size: 32rpx;
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
						font-size: 28rpx;
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
					border-radius: 20rpx;
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
			}
		}
	}
</style>
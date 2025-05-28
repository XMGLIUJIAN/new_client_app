<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="forget_payPwd">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title-color="#1E1E1E">
					<view class="slot-wrap">
						<view class="forget_head">PEMULIHAN KATA SANDI</view>
					</view>
				</u-navbar>
			</u-sticky>
			<view class="forget_con px-[40rpx] pt-[100rpx]">
				<view class="forget_recover" v-if="current == 'phone'">
					<view class="recover_head mb-[20rpx]">Pemulihan Kata Sandi</view>
					<view class="recover_text">
						Hanya dapat dioperasikan sekali sehari untuk memastikan akun anda aman atau akun anda akan terkunci dan tidak dapat dit
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
					<view class="recover_head mb-[20rpx]">Silakan masukkan kode verifikasi</view>
					<view class="recover_text">
						Kode verifikasi dikirim <text class="phone_num">(+62){{formData.mobile}}</text>
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
		emitter.emit('toast',message)
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
					font-family:  Arial;
					font-size: 32rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: center;
					color: #1E1E1E;
				}
			}

			.forget_con {
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
						background: #FFFFFF;

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

				.password_recover {
					.recover_head {
						font-family:  Arial;
						font-size: 30rpx;
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
			}
		}
	}
</style>
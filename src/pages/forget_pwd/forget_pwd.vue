<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="1624" src="@/static/images/page/maskGroup.png"></u-image>
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
			<view class="forget_con pt-[40rpx] pb-[40rpx] px-[40rpx]">
				<view class="forget_recover">
					<view class="recover_head">
						<u-image width="85" height="22" src="@/static/images/icon/arrow_left.png"></u-image>
						<view class="recover_head_tips">Memulihkan Kata Sandi</view>
						<u-image width="85" height="22" src="@/static/images/icon/arrow_right.png"></u-image>
					</view>
					<view class="recover_row mt-[40rpx]">
						<u-image width="40" height="40" src="@/static/images/icon/phone.png" alt="" />
						<view class="recover_tips">+62</view>
						<view class="recover_input">
							<u-input type="text" v-model="formData.mobile" :border="false"
								placeholder-style="color: #8B9098;font-size:24rpx;" placeholder="Nomor HP anda(08XXXXXX)" />
						</view>
					</view>
					<view class="recover_code mt-[20rpx]">
						<view class="code">
							<u-image width="40" height="40" src="@/static/images/icon/code.png" alt="" />
							<view class="code_input">
								<u-input type="text" v-model="formData.code" :border="false" placeholder-style="color: #999999;font-size:24rpx;"
								placeholder="Masukkan kode verifikasi" />
							</view>
						</view>
						<view class="sendCode" @click="sendSms">
							<u-verification-code ref="uCodeRef" unique-key="change" :seconds="60" start-text="Kirim"
								change-text="X detik" end-text="Kirim Ulang" :keep-running="false" @change="codeChange" />
							<text class="codeTips">
								{{ codeTips }}
							</text>
						</view>
					</view>
					<view class="recover_row mt-[40rpx]">
						<u-image width="40" height="40" src="@/static/images/icon/password.png" alt="" />
						<view class="recover_input">
							<u-input type="password" v-model="formData.password" :border="false"
								placeholder-style="color: #8B9098;font-size:24rpx;" placeholder="Masukkan kata sandi" />
						</view>
					</view>
					<view class="recover_row mt-[20rpx]">
						<u-image width="40" height="40" src="@/static/images/icon/password.png" alt="" />
						<view class="recover_input">
							<u-input type="password" v-model="formData.password_confirm" :border="false"
								placeholder-style="color: #8B9098;font-size:24rpx;" placeholder="Masukkan kata sandi kembali" />
						</view>
					</view>
					<u-button class="submit-btn mt-[40rpx]" :class="{'disabled': disabledStatus}"
						:disabled="disabledStatus" @click="nextStep" hover-class="none">selesai</u-button>
				</view>
			</view>
			<view class="contact" @tap="contactService">
				<u-image width="75" height="75" src="@/static/images/icon/contact.png" alt="" />
			</view>
			<contactPopup v-if="contactShow" :service="serviceInfo" @confirm="contactEvent"
				@cancel="contactShow = false"></contactPopup>
			<Popup v-if="forgetPopup" @confirm="forgetEvent" :message="forgetMessage"></Popup>
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
	import { customerServiceInfo } from '@/api/eventInfo'
	import { onPageScroll } from '@dcloudio/uni-app'
	import Popup from './components/popup.vue'
	import contactPopup from './components/contactPopup.vue'
	const router = useRouter()
	const scrollTop = ref<number>(0)
	const forgetPopup = ref<Boolean>(false)
	const serviceInfo = ref<any>({})
	const contactShow = ref<Boolean>(false)
	const uCodeRef = shallowRef()
	const codeTips = ref('')
	const forgetMessage = ref<any>(null)
	const formData = reactive({
		mobile: '',
		code: '',
		password: '',
		password_confirm: ''
	})
	const forgetEvent = (value : Boolean) => {
		const resetData = {
			code: '',
			password: '',
			password_confirm: ''
		}
		Object.assign(formData, resetData)
		uCodeRef.value?.reset()
		forgetPopup.value = value
	}
	const disabledStatus = computed(() => {
		let status = formData.mobile && formData.code && formData.password && formData.password_confirm ? false : true
		return status
	})
	const toast = (message : any = '') => {
		emitter.emit('toast',message)
	}
	const codeChange = (text : string) => {
		codeTips.value = text
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
			mobile:'',
			code: '',
			password: '',
			password_confirm: ''
		}
		Object.assign(formData, resetData)
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
	const contactEvent = (link : string) => {
		contactShow.value = false
		// #ifdef APP
		plus.runtime.openURL(link)
		// #endif
		// #ifdef H5
		window.location.href = link
		// #endif
	}
	const nextStep = async () => {
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
		.imageGroup {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: -1;
		}
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
					line-height: 40rpx;
					text-align: center;
				}
			}

			.forget_con {
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				z-index: 95;
				border-top-left-radius: 12rpx;
				border-top-right-radius: 12rpx;
				background: #FFFFFF;

				.forget_recover {
					.recover_head {
						display: flex;
						justify-content: center;
						align-items: center;
						.recover_head_tips{
							padding: 0 20rpx;
							font-family:  Arial;
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
						.recover_tips {
							margin-left: 20rpx;
							font-family: Arial;
							font-weight: 400;
							font-size: 24rpx;
							line-height: 40rpx;
							color: #8B9098;
						}
						.recover_input {
							margin-left: 20rpx;
							width: 100%;
						}
					}
					.recover_code{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.code {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-right: 20rpx;
							padding: 0 30rpx;
							border-radius: 10rpx;
							background: #FFFFFF;
							border: 2rpx solid #8B9098;
							.code_input{
								margin-left: 20rpx;
								width: 100%;
							}
						}
						
						.sendCode {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 162rpx;
							height: 72rpx;
							background: #ECB54B;
							border-radius: 12rpx;
						
							.codeTips {
								font-family:  Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 50rpx;
								text-align: center;
								color: #FFFFFF;
							}
						}
					}

					.submit-btn {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 90rpx;
						border-radius: 20rpx;
						background: #458060;
						font-family:  Arial;
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
			.contact {
				position: fixed;
				top: 40%;
				right: 0;
				z-index: 100;
			}
		}
	}
</style>
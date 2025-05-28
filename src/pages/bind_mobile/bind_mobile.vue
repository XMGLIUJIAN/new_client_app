<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="bind_mobile">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#FFFFFF"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="MENGUBAH TELEPON ANDA" title-color="#FFFFFF">
				</u-navbar>
			</u-sticky>
			<view class="phone_con mx-[30rpx] mt-[50rpx]">
				<view class="phone_head" v-if="formData.type == 'change'">Nomor ponsel asli</view>
				<view class="phone_head" v-if="formData.type == 'bind'">Ubah nomor telepon baru</view>
				<view class="password_input mt-[20rpx] mb-[20rpx]">
					<u-input type="text" v-model="formData.mobile" :border="false" placeholder-style="color: #999999;font-size:24rpx;"
						placeholder="Silakan masukkan ponsel anda" />
				</view>
				<view class="password_code mb-[20rpx]">
					<view class="code">
						<u-input type="text" v-model="formData.code" :border="false" placeholder-style="color: #999999;font-size:24rpx;"
							placeholder="Masukkan kode verifikasi" />
					</view>
					<view class="sendCode" @click="sendSms" v-if="current">
						<u-verification-code ref="uCodeRef" unique-key="change" :seconds="60" start-text="Kirim"
							change-text="X detik" end-text="Kirim Ulang" :keep-running="false" @change="codeChange" />
						<text class="codeTips">
							{{ codeTips }}
						</text>
					</view>
					<view class="sendCode" @click="sendSms" v-else>
						<u-verification-code ref="uCodeRef" unique-key="bind" :seconds="60" start-text="Kirim"
							change-text="X detik" end-text="Kirim Ulang" :keep-running="false" @change="codeChange" />
						<text class="codeTips">
							{{ codeTips }}
						</text>
					</view>
				</view>
			</view>
			<u-button class="submit-btn mt-[40rpx] mx-[30rpx]" :class="{'disabled': disabledStatus}" :disabled="disabledStatus"
				@click="recharge" v-if="formData.type == 'change'">Pergi ganti</u-button>
			<u-button class="submit-btn mt-[40rpx] mx-[30rpx]" :class="{'disabled': disabledStatus}" :disabled="disabledStatus"
				@click="handlePhone" v-if="formData.type == 'bind'">Konfirmasi telepon baru mengikat</u-button>
			<!-- #ifdef MP-WEIXIN -->
			<u-button class="submit-btn mt-[40rpx]" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
				type="primary" shape="circle" size="mini" :plain="true">
				{{ userInfo?.mobile == '' ? 'Ikat nomor telepon' : 'Ubah nomor telepon' }}
			</u-button>
			<!-- #endif -->
		</view>
		<toastPopup></toastPopup>
	</view>

</template>

<script lang="ts" setup>
	import { onShow, onUnload, onPageScroll } from '@dcloudio/uni-app'
	import { getUserInfo, userEdit, userBindMobile, userMnpMobile } from '@/api/user'
	import { smsSend } from '@/api/app'
	import { emitter } from '@/utils/emitter';
	import { SMSEnum } from '@/enums/appEnums'
	import { RequestCodeEnum } from '@/enums/requestEnums'
	import { reactive, ref, shallowRef, computed, nextTick } from 'vue'
	import { useUserStore } from '@/stores/user'
	const scrollTop = ref<number>(0)
	// 用户信息
	const uCodeRef = shallowRef()
	const codeTips = ref('')
	const current = ref<boolean>(false)
	const userStore = useUserStore()
	const userInfo = computed(() => userStore.userInfo)
	// 获取验证码显示字段
	const codeChange = (text : string) => {
		codeTips.value = text
	}

	const formData = reactive({
		type: !current.value ? 'change' : 'bind',
		mobile: !current.value ? userInfo.value.mobile : '',
		code: ''
	})
	const disabledStatus = computed(() => {
		let status = formData.mobile && formData.code ? false : true
		return status
	})
	const toast = (message : any = '') => {
		emitter.emit('toast',message)
	}
	const sendSms = async () => {
		if (!formData.mobile) return toast('Silakan masukkan ponsel anda')
		if (uCodeRef.value?.canGetCode) {
			await smsSend({
				scene: !current.value ? SMSEnum.CHANGE_MOBILE : SMSEnum.BIND_MOBILE,
				mobile: formData.mobile
			})
			toast('Kode berhasil di kirim')
			uCodeRef.value?.start()
		}
	}
	// 微信小程序 绑定｜｜修改手机号
	const getPhoneNumber = async (e: any) : Promise<void> => {
		const { encryptedData, iv, code } = e.detail
		const data = {
			code,
			encrypted_data: encryptedData,
			iv
		}
		if (encryptedData) {
			await userMnpMobile({
				...data
			})
			toast('Sukses')
			userStore.getUserInfo()
		}
	}
	const resetForm = () => {
		const resetData = {
			type: 'bind',
			mobile: '',
			code: '',
		}
		Object.assign(formData, resetData)
	}

	const recharge = async () => {
		const data = await userBindMobile(formData)
		if (data.code == RequestCodeEnum.FAILED) {
			nextTick(() => {
				uCodeRef.value?.reset()
			})
			toast(data.msg)
		} else {
			nextTick(() => {
				uCodeRef.value?.reset()
			})
			resetForm()
			current.value = true
		}
	}
	const handlePhone = async () => {
		if (!formData.mobile) return toast('Please Enter Your Phone')
		if (!formData.code) return toast('Please Enter Your Verification Code')
		const data = await userBindMobile(formData, { token: userStore.temToken })
		if (data.code == RequestCodeEnum.FAILED) {
			nextTick(() => {
				uCodeRef.value?.reset()
			})
			toast(data.msg)
		} else {
			nextTick(() => {
				uCodeRef.value?.reset()
			})
			toast('Sukses')
			userStore.login(userStore.temToken!)
			uni.navigateBack()
		}
	}
	onShow(async () => {
		userStore.getUserInfo()
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

		.bind_mobile {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.phone_con {
				padding: 20rpx;
				background: #FFFFFF;
				border-radius: 12rpx;
				.phone_head {
					font-family:  Arial;
					font-size: 32rpx;
					font-weight: 400;
					line-height: 48rpx;
					text-align: left;
					color: #1E1E1E;
				}

				.password_input {
					padding: 10rpx 40rpx;
					border-radius: 10rpx;
					background: #FFFFFF;
					border: 2rpx solid #8B9098;
				}

				.password_code {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.code {
						padding: 10rpx 20rpx;
						border-radius: 10rpx;
						background: #FFFFFF;
						border: 2rpx solid #8B9098;
					}

					.sendCode {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 228rpx;
						height: 90rpx;
						background: #EDCB8A;
						border-radius: 12rpx;

						.codeTips {
							font-family:  Arial;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 50rpx;
							text-align: center;
							color: #FFFFFF;
						}
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
</style>
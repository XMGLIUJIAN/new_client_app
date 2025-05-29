<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="login">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false"
					:back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent' }" title="MASUK"
					:title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
			<view class="login_head mt-[50rpx] px-[40rpx]">
				<view class="login_logo pt-[40rpx]">
					<view class="welcome">Selamat datang</view>
					<view class="appName">Rice Rich</view>
				</view>
				<u-image class="logo_image" width="360" height="360" src="@/static/images/user/logo.png" alt="" />
			</view>
			<view class="login_con pt-[40rpx] px-[40rpx]">
				<!-- 密码登录 -->
				<template
					v-if="formData.scene == LoginWayEnum.ACCOUNT && includeLoginWay(LoginWayEnum.ACCOUNT) && !current">
					<view class="recover_row mb-[20rpx]">
						<u-image width="50" height="50" src="@/static/images/icon/phone.png" alt="" />
						<view class="recover_input">
							<u-input type="text" v-model="formData.account" :border="false"
								placeholder-style="color: #999999;" placeholder="Masukkan nomor HP anda" />
						</view>
					</view>
					<view class="recover_row mb-[20rpx]">
						<u-image width="50" height="50" src="@/static/images/icon/password.png" alt="" />
						<view class="recover_input">
							<u-input type="password" v-model="formData.password" :border="false"
								placeholder-style="color: #999999;" placeholder="Masukkan Kata sandi anda" />
						</view>
					</view>
				</template>
				<!-- 验证码登录 -->
				<template
					v-if=" formData.scene == LoginWayEnum.MOBILE && includeLoginWay(LoginWayEnum.MOBILE) && !current">
					<view class="recover_row mb-[20rpx]">
						<u-image width="50" height="50" src="@/static/images/icon/phone.png" alt="" />
						<view class="recover_input">
							<u-input type="text" v-model="formData.account" :border="false"
								placeholder-style="color: #999999;" placeholder="Nomor HP anda(08XXXXXX)" />
						</view>
					</view>
				</template>
				<!-- 输入验证码 -->
				<template v-if="current == 'code'">
					<view class="forget_recover">
						<view class="recover_head mb-[20rpx]">Silakan masukkan kode verifikasi</view>
						<view class="recover_text">
							Kode verifikasi terkirim <text class="phone_num">(+62) {{formData.account}}</text>
						</view>

						<view class="recover_code mt-[50rpx]">
							<u-message-input v-model="formData.code" @finish="loginFun" font-size="64"
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
				<view class="forget_register"
					:style="{'justify-content':formData.scene == LoginWayEnum.ACCOUNT && includeLoginWay(LoginWayEnum.ACCOUNT) && !current ? 'space-between':'flex-end'}">
					<view class="forget"
						v-if="formData.scene == LoginWayEnum.ACCOUNT && includeLoginWay(LoginWayEnum.ACCOUNT) && !current">
						<navigator url="/pages/forget_pwd/forget_pwd" hover-class="none">Lupa kata sandi</navigator>
					</view>
					<view class="register" v-if="!current">
						<navigator url="/pages/register/register" hover-class="none">Daftar</navigator>
					</view>
				</view>
				<view class="mt-[20rpx]" v-if="isOpenAgreement && !current">
					<u-checkbox v-model="isCheckAgreement" shape="circle" active-color="#0067E0">
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
				<template
					v-if="formData.scene == LoginWayEnum.ACCOUNT && includeLoginWay(LoginWayEnum.ACCOUNT) && !current">
					<u-button class="submit-btn mt-[40rpx]" :class="{'disabled': disabledStatus}"
						:disabled="disabledStatus" @click="handleLogin(formData.scene)" hover-class="none">
						Masuk
					</u-button>
					<view class="login_type mt-[20rpx]" @click="changeLoginWay(LoginWayEnum.MOBILE)"
						v-if="formData.scene == LoginWayEnum.ACCOUNT && includeLoginWay(LoginWayEnum.MOBILE)">
						Masuk kode verifikasi
					</view>
				</template>
				<template
					v-if="formData.scene == LoginWayEnum.MOBILE && includeLoginWay(LoginWayEnum.MOBILE) && !current">
					<u-button class="submit-btn mt-[40rpx]" :class="{'disabled': disabled}" :disabled="disabled"
						@click="getCode" hover-class="none">Terima kode verifikasi</u-button>
					<view class="login_type mt-[20rpx]" @click="changeLoginWay(LoginWayEnum.ACCOUNT)"
						v-if="formData.scene == LoginWayEnum.MOBILE && includeLoginWay(LoginWayEnum.ACCOUNT)">
						Masukkan kata sandi
					</view>
				</template>
			</view>
			<view class="contact" @tap="contactService">
				<u-image width="75" height="75" src="@/static/images/icon/contact.png" alt="" />
			</view>
			<toastPopup></toastPopup>
			<loginPopup v-if="loginShow" @cancel="loginShow = false" @confirm="confirmPopup"></loginPopup>
			<contactPopup v-if="contactShow" :service="serviceInfo" @confirm="contactConfirm" @cancel="contactShow = false"></contactPopup>
			<Popup v-if="showModel" @confirm="confirm" @cancel="showModel = false"></Popup>
			<!-- #ifdef MP-WEIXIN || H5 -->
			<u-icon class="weixin" v-if="isOpenOtherAuth && isWeixin && inWxAuth && !current" @click="wxLogin"
				name="weixin-circle-fill" color="#39AA32" size="80"></u-icon>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<mplogin-popup v-model:show="showLoginPopup" :logo="websiteConfig.shop_logo"
				:title="websiteConfig.shop_name" @update="handleUpdateUser" />
			<!--  #endif -->
		</view>
	</view>
</template>

<script setup lang="ts">
	import { login, mnpLogin, updateUser, OALogin, loginPreVerify } from '@/api/account'
	import { smsSend } from '@/api/app'
	import { customerServiceInfo } from '@/api/eventInfo'
	import { SMSEnum } from '@/enums/appEnums'
	import { BACK_URL } from '@/enums/constantEnums'
	import { useLockFn } from '@/hooks/useLockFn'
	import { useAppStore } from '@/stores/app'
	import { useUserStore } from '@/stores/user'
	import { getDeviceInfo } from '@/utils/util'
	import { useRouter, useRoute } from 'uniapp-router-next'
	import cache from '@/utils/cache'
	import { isWeixinClient } from '@/utils/client'
	// #ifdef H5
	import wechatOa, { UrlScene } from '@/utils/wechat'
	// #endif
	import { onLoad, onShow, onPageScroll } from '@dcloudio/uni-app'
	import { computed, reactive, ref, shallowRef, watch, nextTick } from 'vue'
	import { storeToRefs } from 'pinia'
	import { emitter } from '@/utils/emitter';
	import Popup from './components/popup.vue'
	import loginPopup from './components/loginPopup.vue'
	import contactPopup from './components/contactPopup.vue'
	enum LoginWayEnum {
		ACCOUNT = 1,
		MOBILE = 2
	}

	const isWeixin = ref(true)
	// #ifdef H5
	isWeixin.value = isWeixinClient()
	// #endif
	const route = useRoute()
	const router = useRouter()
	const userStore = useUserStore()
	const { userInfo, isLogin } = storeToRefs(userStore)
	const appStore = useAppStore()
	const showModel = ref(false)
	const uCodeRef = shallowRef()
	const codeTips = ref('')
	const scrollTop = ref<number>(0)
	const serviceInfo = ref<any>({})
	const showLoginPopup = ref(false)
	const loginShow = ref<Boolean>(false)
	const isCheckAgreement = ref(false)
	const current = ref<String>('')
	const contactShow = ref<Boolean>(false)
	const formData = reactive({
		scene: 1,
		account: '',
		password: '',
		code: '',
		loginMac:''
	})
	const disabledStatus = computed(() => {
		let status = formData.account && formData.password ? false : true
		return status
	})
	const disabled = computed(() => {
		let status = formData.account ? false : true
		return status
	})
	const loginData = ref()
	const websiteConfig = computed(() => appStore.getWebsiteConfig)
	const codeChange = (text : string) => {
		codeTips.value = text
	}
	const contactConfirm = (link : string) => {
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
	const getInfo = async () => {
		const resdata = await customerServiceInfo()
		serviceInfo.value = resdata.data
	}
	const contactService = () => {
		getInfo()
		emitter.emit('gifType')
		setTimeout(()=>{
			contactShow.value = true
		},3000)
	}
	const sendSms = async () => {
		if (!formData.account) return
		if (uCodeRef.value?.canGetCode) {
			await smsSend({
				scene: SMSEnum.LOGIN,
				mobile: formData.account
			})
			toast('Kode berhasil di kirim')
			uCodeRef.value?.start()
		}
	}
	const confirm = () => {
		isCheckAgreement.value = true
		showModel.value = false
	}
	const changeLoginWay = (way : LoginWayEnum) => {
		formData.scene = way
		formData.account = ''
	}

	const getCode = async () => {
		if (!isCheckAgreement.value && isOpenAgreement.value) return (showModel.value = true)
		const resData = await loginPreVerify({ mobile: formData.account })
		if (resData.code == 1) {
			current.value = 'code'
			nextTick(() => {
				sendSms()
			})
		} else {
			loginShow.value = true
		}
	}
	const confirmPopup = () => {
		loginShow.value = false
		router.navigateTo('/pages/register/register')
	}
	const includeLoginWay = (way : LoginWayEnum) => {
		return appStore.getLoginConfig.login_way?.includes(String(way))
	}

	const inWxAuth = computed(() => {
		return appStore.getLoginConfig.wechat_auth
	})

	const isOpenAgreement = computed(() => appStore.getLoginConfig.login_agreement == 1)

	const isOpenOtherAuth = computed(() => appStore.getLoginConfig.third_auth == 1)
	const isForceBindMobile = computed(() => appStore.getLoginConfig.coerce_mobile == 1)

	const loginFun = async () => {
		if (!isCheckAgreement.value && isOpenAgreement.value) return (showModel.value = true)
		if (formData.scene == LoginWayEnum.ACCOUNT) {
			if (!formData.account) return toast('Masukkan nomor HP anda')
			if (!formData.password) return toast('Masukkan Kata sandi anda')
		}
		if (formData.scene == LoginWayEnum.MOBILE) {
			if (!formData.account) return toast('Nomor HP anda(08XXXXXX)')
			if (!formData.code) return toast('Silakan masukkan kode anda')
		}
		const system = getDeviceInfo()
		formData.loginMac = system.deviceId //获取设备唯一标识码
		uCodeRef.value?.reset()
		emitter.emit('gifType')
		loginAsync()
	}
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const loginAsync = () => {
		setTimeout(async () => {
			try {
				const data = await login(formData)
				loginHandle(data)
			} catch (error : any) {
				toast(error)
			}
		}, 3000)
	}
	const loginHandle = async (data : any) => {
		if (!data) return
		const { token, mobile } = data
		if (!mobile && isForceBindMobile.value) {
			userStore.temToken = token
			router.navigateTo('/pages/bind_mobile/bind_mobile')
			return
		}
		userStore.login(data.token)
		await userStore.getUser()
		toast('Sukses')
		const pages = getCurrentPages()
		if (pages.length > 1) {
			const prevPage = pages[pages.length - 2]
			await router.navigateBack()
			// @ts-ignore
			const { onLoad, options } = prevPage
			// 刷新上一个页面
			onLoad && onLoad(options)
		} else {
			router.switchTab('/pages/index/index')
		}
		cache.remove(BACK_URL)
	}

	const { lockFn: handleLogin } = useLockFn(loginFun)

	const oaLogin = async (options : any = { getUrl: true }) => {
		const { code, getUrl } = options
		if (getUrl) {
			await wechatOa.getUrl(UrlScene.LOGIN)
		} else {
			const data = await OALogin({
				code
			})
			return data
		}
		return Promise.reject()
	}

	const wxLogin = async () => {
		if (!isCheckAgreement.value && isOpenAgreement.value) {
			showModel.value = true
			return
		}
		emitter.emit('gifType')
		wxloginAsync()
	}
	const wxloginAsync = () => {
		setTimeout(async () => {
			// #ifdef MP-WEIXIN
			try {
				const { code } : any = await uni.login({
					provider: 'weixin'
				})
				const data = await mnpLogin({
					code: code
				})
				loginData.value = data
				if (data.is_new_user) {
					userStore.temToken = data.token
					showLoginPopup.value = true
					return
				}
				loginHandle(data)
			} catch (error : any) {
				toast(error)
			}
			// #endif
			// #ifdef H5
			if (isWeixin.value) {
				oaLogin()
			}
			// #endif
		}, 3000)
	}
	const handleUpdateUser = async (value : any) => {
		await updateUser(value, { token: userStore.temToken })
		showLoginPopup.value = false
		loginHandle(loginData.value)
	}

	watch(
		() => appStore.getLoginConfig,
		(value) => {
			if (value.login_way) {
				formData.scene = value.login_way[1]
			}
		},
		{
			immediate: true
		}
	)
	const DisableStyle = computed(() => {
		if (formData.scene == 1 && formData.account && formData.password) {
			return true
		} else if (formData.scene == 2 && formData.account && formData.code) {
			return true
		} else {
			return false
		}
	})

	const removeWxQuery = () => {
		const options = route.query
		if (options.code && options.state) {
			delete options.code
			delete options.state
			router.redirectTo({ path: route.path, query: options })
		}
	}

	const oaLoginAsync = (options : any) => {
		setTimeout(async () => {
			const data = await oaLogin(options)
			if (data) {
				loginData.value = data
				loginHandle(loginData.value)
			}
		}, 3000)
	}

	onLoad(async () => {
		//#ifdef H5
		const options = wechatOa.getAuthData()
		try {
			if (options.code && options.scene === UrlScene.LOGIN) {
				emitter.emit('gifType')
				oaLoginAsync(options)
			}
		} catch (error) {
			removeWxQuery()
		} finally {
			//清除保存的授权数据
			wechatOa.setAuthData()
		}
		//#endif
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

		.login {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.login_head {
				position: relative;

				.login_logo {
					.welcome {
						font-family: Arial;
						font-size: 40rpx;
						font-weight: 500;
						line-height: 80rpx;
						text-align: left;
						color: #FFFFFF;
					}

					.appName {
						font-family: Arial;
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

			.login_con {
				position: relative;
				top: 80rpx;
				z-index: 95;
				border-top-left-radius: 30rpx;
				border-top-right-radius: 30rpx;
				background: #FFFFFF;

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

				.forget_register {
					display: flex;
					align-items: center;

					.forget {
						font-family: Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #999999;
					}

					.register {
						font-family: Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: right;
						color: #0067E0;
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
					color: #999999;

					.agreement {
						color: #0067E0;
					}
				}


				.submit-btn {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 90rpx;
					border-radius: 20rpx;
					background: #0067E0;
					font-family: Arial;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 48rpx;
					text-align: center;
					color: #FFFFFF;
				}

				.disabled {
					background: #BDD8F7;
				}

				.login_type {
					font-family: Arial;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 48rpx;
					text-align: center;
					color: #0067E0;
				}
			}

			.forget_recover {
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
						font-family: Arial;
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

			}

			.weixin {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.contact {
				position: fixed;
				top: 50%;
				right: 0;
				z-index: 100;
			}
		}
	}
</style>
<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="1624" src="@/static/images/page/maskGroup.png"></u-image>
		</view>
		<view class="login">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false"
					:back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent' }" title="MASUK"
					:title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
			<view class="login_con pt-[40rpx] pb-[40rpx] px-[40rpx]">
				<view class="recover_head">
					<u-image width="85" height="22" src="@/static/images/icon/arrow_left.png"></u-image>
					<view class="recover_head_tips">Selamat Datang Di RiceRich</view>
					<u-image width="85" height="22" src="@/static/images/icon/arrow_right.png"></u-image>
				</view>
				<view class="recover_row mt-[40rpx]">
					<u-image width="40" height="40" src="@/static/images/icon/phone.png" alt="" />
					<view class="recover_tips">+62</view>
					<view class="recover_input">
						<u-input type="text" v-model="formData.account" :border="false"
							placeholder-style="color: #8B9098;font-size:24rpx;" placeholder="Masukkan nomor HP anda" />
					</view>
				</view>
				<view class="recover_row mt-[20rpx]">
					<u-image width="40" height="40" src="@/static/images/icon/password.png" alt="" />
					<view class="recover_input">
						<u-input type="password" v-model="formData.password" :border="false"
							placeholder-style="color: #8B9098;font-size:24rpx;" placeholder="Masukkan Kata sandi anda" />
					</view>
				</view>
				<view class="readAgree_box mt-[20rpx]">
					<u-checkbox v-model="isCheckAgreement" shape="circle" active-color="#528B6B">
						<view class="readAgree">
							<text>Silahkan Baca dan Setuju</text>
							<router-navigate hover-class="none" to="/pages/agreement/agreement?type=service">
								<text class="agreement">《 Ketentuan Layanan 》</text>
							</router-navigate>
						</view>
						<view class="readAgree">
							<text>dan</text>
							<router-navigate hover-class="none" to="/pages/agreement/agreement?type=privacy">
								<text class="agreement">《 Kebijakan Privasi 》</text>
							</router-navigate>
						</view>
					</u-checkbox>
				</view>
				<u-button class="submit-btn mt-[40rpx]" :class="{'disabled': disabledStatus}" :disabled="disabledStatus"
					@click="getCode" hover-class="none">
					Masuk
				</u-button>
				<view class="foot mt-[20rpx]">
					<view class="forget">
						<navigator url="/pages/forget_pwd/forget_pwd" hover-class="none">Lupa kata sandi</navigator>
					</view>
					<view class="register">
						<navigator url="/pages/register/register" hover-class="none">Daftar</navigator>
					</view>
				</view>
			</view>
			<view class="contact" @tap="contactService">
				<u-image width="75" height="75" src="@/static/images/icon/contact.png" alt="" />
			</view>
			<toastPopup></toastPopup>
			<loginPopup v-if="loginShow" @cancel="loginShow = false" @confirm="confirmPopup"></loginPopup>
			<contactPopup v-if="contactShow" :service="serviceInfo" @confirm="contactEvent"
				@cancel="contactShow = false"></contactPopup>
			<Popup v-if="showModel" @confirm="confirm" @cancel="showModel = false"></Popup>
			<!-- #ifdef MP-WEIXIN || H5 -->
			<u-icon class="weixin" v-if="isOpenOtherAuth && isWeixin && inWxAuth" @click="wxLogin"
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
	import { customerServiceInfo } from '@/api/eventInfo'
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
	const scrollTop = ref<number>(0)
	const serviceInfo = ref<any>({})
	const showLoginPopup = ref(false)
	const loginShow = ref<Boolean>(false)
	const isCheckAgreement = ref(false)
	const contactShow = ref<Boolean>(false)
	const formData = reactive({
		scene: 2,
		code: '',
		account: '',
		password: '',
		loginMac: ''
	})
	const disabledStatus = computed(() => {
		let status = formData.account && formData.password ? false : true
		return status
	})
	const loginData = ref()
	const websiteConfig = computed(() => appStore.getWebsiteConfig)
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
	const getInfo = async () => {
		const resdata = await customerServiceInfo()
		serviceInfo.value = resdata.data
        emitter.emit('toast_close')
	}
	const contactService = () => {
        emitter.emit('gifType')
		getInfo()
		setTimeout(() => {
			contactShow.value = true
		}, 3000)
	}
	const confirm = () => {
		isCheckAgreement.value = true
		showModel.value = false
	}

	const getCode = async () => {
		if (!isCheckAgreement.value && isOpenAgreement.value) return (showModel.value = true)
		if (!formData.account) return toast('Masukkan nomor HP anda')
		if (!formData.password) return toast('Masukkan Kata sandi anda')
		emitter.emit('gifType')
		const resData = await loginPreVerify({ mobile: formData.account })
		if (resData.code == 1) {
			loginFun()
		} else {
			loginShow.value = true
		}
        emitter.emit('toast_close')
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
		const system = getDeviceInfo()
		formData.loginMac = system.deviceId //获取设备唯一标识码
		emitter.emit('gifType')
		loginAsync()
	}
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const loginAsync = async () => {
		try {
			const data = await login(formData)
			loginHandle(data)
		} catch (error : any) {
			toast(error)
		}finally {
            emitter.emit('toast_close')
        }
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
	const wxloginAsync = async () => {
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
			}finally{

                emitter.emit('toast_close')
            }
			// #endif
			// #ifdef H5
			if (isWeixin.value) {
				oaLogin()
			}
			// #endif
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
				formData.scene = value.login_way[0]
			}
		},
		{
			immediate: true
		}
	)

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

		.imageGroup {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: -1;
		}

		.login {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.login_con {
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

				.foot {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.forget {
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #8B9098;
					}

					.register {
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: right;
						color: #D79D2A;
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
				top: 40%;
				right: 0;
				z-index: 100;
			}
		}
	}
</style>

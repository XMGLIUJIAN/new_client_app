<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="user-set">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#FFFFFF"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="PRIVASI DAN KEAMANAN" title-color="#FFFFFF">
				</u-navbar>
			</u-sticky>
			<navigator :url="`/pages/user_data/user_data`">
				<view class="account_info item flex bg-white mt-[20rpx] ml-[40rpx] mr-[40rpx]">
					<u-avatar :src="userInfo.avatar" shape="square" :size="100"></u-avatar>
					<view class="ml-[20rpx] flex flex-1 justify-between items-center">
						<view>
							<view class="mb-[15rpx] text-xl font-medium nickname">{{ userInfo.nickname }}</view>
							<view class="text-content text-xs">
								<text class="account_num">ID：{{ userInfo.account }}</text>
							</view>
						</view>
						<u-icon name="arrow-right" color="#B0B0B0"></u-icon>
					</view>
				</view>
			</navigator>
			<view class="user_set_card mt-[20rpx] ml-[40rpx] mr-[40rpx]">
				<view class="item btn-border flex flex-1 justify-between" @click="handlePhone">
					<view class="label_name">Ikat Ponsel</view>
					<view class="flex justify-between">
						<view class="text-muted mr-[20rpx]">
							{{ userInfo.mobile }}
						</view>
						<u-icon name="arrow-right" color="#B0B0B0"></u-icon>
					</view>
				</view>
				<view class="item btn-border flex flex-1 justify-between" @click="handlePwd">
					<view class="label_name">Sandi Masuk</view>
					<view class="flex justify-between">
						<view class="Not_set mr-[20rpx]" v-if="!userInfo.has_password">Tidak Ada Pengaturan</view>
						<view class="text-muted" v-else>******</view>
					</view>
				</view>
				<view class="item btn-border flex flex-1 justify-between" @click="handlePayPwd">
					<view class="label_name">Sandi Penarikan</view>
					<view class="flex justify-between">
						<view class="Not_set mr-[20rpx]" v-if="!userInfo.has_pay_password">Tidak Ada Pengaturan</view>
						<view class="text-muted" v-else>******</view>
					</view>
				</view>
				<!--  #ifdef H5 || MP-WEIXIN -->
				<view v-if="isWeixin" class="item flex flex-1 justify-between" @click="bindWechatLock">
					<view class="label_name">Melekat Pada Weobrolan</view>
					<view class="flex justify-between">
						<view class="text-muted mr-[20rpx]">
							{{ userInfo.is_auth ? 'Terikat' : 'Tidak Terikat' }}
						</view>
						<u-icon v-if="userInfo.is_auth == 0" name="arrow-right" color="#B0B0B0"></u-icon>
					</view>
				</view>
				<!-- #endif -->
			</view>
		</view>
		<toastPopup></toastPopup>
	</view>

</template>

<script setup lang="ts">
	import { onLoad, onShow, onPageScroll } from '@dcloudio/uni-app'
	import { computed, ref } from 'vue'
	import { useAppStore } from '@/stores/app'
	import { useUserStore } from '@/stores/user'
	import { AgreementEnum } from '@/enums/agreementEnums'
	import { isWeixinClient } from '@/utils/client'
	import { mnpAuthBind, oaAuthBind } from '@/api/account'
	import { useLockFn } from '@/hooks/useLockFn'
	import { useRouter } from "uniapp-router-next";
	import { emitter } from '@/utils/emitter';
	// #ifdef H5
	import wechatOa from '@/utils/wechat'
	// #endif
	const router = useRouter()
	const appStore = useAppStore()
	const userStore = useUserStore()
	const userInfo = computed(() => userStore.userInfo)
	const scrollTop = ref<number>(0)
	const isWeixin = ref(true)
	// #ifdef H5
	isWeixin.value = isWeixinClient()
	// #endif

	const handlePwd = () => {
		if (!userInfo.value.has_password) return router.navigateTo('/pages/change_password/change_password?type=set')
		if (userInfo.value.has_password) return router.navigateTo('/pages/change_password/change_password')
	}

	const handlePhone = () => {
		router.navigateTo('/pages/bind_mobile/bind_mobile')
	}
	const handlePayPwd = () => {
		if (!userInfo.value.has_pay_password) return router.navigateTo('/pages/change_payPwd/change_payPwd?type=set')
		if (userInfo.value.has_pay_password) return router.navigateTo('/pages/change_payPwd/change_payPwd')
	}
	const toast = (message : any = '') => {
		emitter.emit('toast',message)
	}
	const bindWechat = async () => {
		if (userInfo.value.is_auth) return
		try {
			emitter.emit('gifType')
			// #ifdef MP-WEIXIN
			const { code } : any = await uni.login({
				provider: 'weixin'
			})
			await mnpAuthBind({
				code: code
			})
			//#endif
			// #ifdef H5
			if (isWeixin.value) {
				wechatOa.getUrl()
			}
			// #endif
			await userStore.getUser()
		} catch (e) {
			toast(e)
		}
	}
	const { lockFn: bindWechatLock } = useLockFn(bindWechat)

	onShow(() => {
		userStore.getUser()
	})

	onLoad(async (options : any) => {
		// #ifdef H5
		const code = options.code
		if (!isWeixin.value) return
		if (code) {
			emitter.emit('gifType')
			try {
				await oaAuthBind({ code })
				await userStore.getUser()
			} catch (error) {
				
			}
			//用于清空code
			router.redirectTo('/pages/user_set/user_set')
		}

		// #endif
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
	.container{
		position: relative;
		.user-set {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.account_info {
				border-radius: 12rpx;
				.nickname{
					font-family: Arial;
					font-weight: 700;
					font-size: 28rpx;
					line-height: 40rpx;
					color: #1E4B2E;
				}
			}
			
			.account_num {
				font-family:  Arial;
				font-size: 24rpx;
				font-weight: 500;
				text-align: left;
				color: #999999;
			}
		
			.user_set_card {
				border-radius: 12rpx;
				background: #FFFFFF;
		
				.Not_set {
					font-family:  Arial;
					font-size: 28rpx;
					font-weight: 400;
					text-align: right;
					color: #ECB54B;
				}
				.label_name{
					font-family:  Arial;
					font-size: 28rpx;
					font-weight: 500;
					text-align: left;
					color: #1E1E1E;
				}
			}
		
			.item {
				padding: 30rpx;
			}
		
			.btn-border {
				border-bottom: 2rpx solid #f8f8f8;
			}
		}
	}
</style>
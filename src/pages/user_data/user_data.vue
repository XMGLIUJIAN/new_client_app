<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="user_data pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="DATA PRIBADI" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<!-- 头部修改头像 -->
			<view class="header pt-[30rpx]">
				<view class="flex justify-center pb-5">
					<avatar-upload :modelValue="userInfo?.avatar" file-key="url" :round="true"
						@update:modelValue="handleAvatarChange">
					</avatar-upload>
				</view>
			</view>
			<view class="user_data_card mx-[40rpx]">
				<!-- 用户ID -->
				<view class="item text-nr">
					<view class="label">Akun ID</view>
					<view class="content">{{ userInfo?.account }}</view>
					<u-icon name="arrow-right" size="22" color="#666"></u-icon>
				</view>

				<!-- 昵称 -->
				<view class="item text-nr" @click=";(showNickName = true), (newNickname = userInfo?.nickname)">
					<view class="label">Panggilan</view>
					<view class="content">{{ userInfo?.nickname }}</view>
					<u-icon name="arrow-right" size="22" color="#666"></u-icon>
				</view>

				<!-- 性别 -->
				<view class="item text-nr" @click="changeSex">
					<view class="label">Jenis Kelamin</view>
					<view class="content">{{ userInfo?.sex }}</view>
					<u-icon name="arrow-right" size="22" color="#666"></u-icon>
				</view>
				<!-- whatsapp -->
				<view class="item text-nr" @click=";(showWhatapp = true), (newWhatsapp = userInfo?.whatsapp)">
					<view class="label">WhatsApp</view>
					<view class="content">{{ userInfo?.whatsapp }}</view>
					<u-icon name="arrow-right" size="22" color="#666"></u-icon>
				</view>
				<!-- telegram -->
				<view class="item text-nr" @click=";(showTelegram = true), (newTelegram = userInfo?.telegram)">
					<view class="label">Telegram</view>
					<view class="content">{{ userInfo?.telegram }}</view>
					<u-icon name="arrow-right" size="22" color="#666"></u-icon>
				</view>
			</view>

			<!-- 昵称修改组件 -->
			<u-popup v-model="showNickName" :closeable="true" mode="center" :maskCloseAble="false" border-radius="20">
				<view class="px-[50rpx] py-[40rpx] bg-white" style="width: 85vw">
					<form @submit="changeNameConfirm">
						<view class="mb-[70rpx] text-xl text-center">Ganti Panggilan</view>
						<view class="recover_input">
							<u-form-item>
								<input :value="userInfo.nickname" name="nickname" type="nickname"
									placeholder="Masukkan Nama Panggilan" />
							</u-form-item>
						</view>
						<view class="mt-[80rpx]">
							<button class="submit-btn" form-type="submit" size="mini" hover-class="none">Konfirmasi</button>
						</view>
					</form>
				</view>
			</u-popup>
			<!-- 性别修改组件 -->
			<u-picker mode="selector" v-model="showPicker" confirm-color="#4173FF" :default-selector="[0]"
				:range="sexList" @confirm="changeSexConfirm" />
			<!-- whatsapp修改组件 -->
			<u-popup v-model="showWhatapp" :closeable="true" mode="center" :maskCloseAble="false" border-radius="20">
				<view class="px-[50rpx] py-[40rpx] bg-white" style="width: 85vw">
					<form @submit="changeWhatConfirm">
						<view class="mb-[70rpx] text-xl text-center">Ganti WhatsApp</view>
						<view class="recover_input">
							<u-form-item>
								<input :value="userInfo.whatsapp" name="whatsapp" type="whatsapp"
									placeholder="Masukan Nomor Whatshapp" />
							</u-form-item>
						</view>
						<view class="mt-[80rpx]">
							<button class="submit-btn" form-type="submit" size="mini" hover-class="none">Konfirmasi</button>
						</view>
					</form>
				</view>
			</u-popup>
			<!-- telegram修改组件 -->
			<u-popup v-model="showTelegram" :closeable="true" mode="center" :maskCloseAble="false" border-radius="20">
				<view class="px-[50rpx] py-[40rpx] bg-white" style="width: 85vw">
					<form @submit="changeTelegramConfirm">
						<view class="mb-[70rpx] text-xl text-center">Ganti Telegram</view>
						<view class="recover_input">
							<u-form-item>
								<input :value="userInfo.telegram" name="telegram" type="telegram"
									placeholder="Masukan Nomor Telegram" />
							</u-form-item>
						</view>
						<view class="mt-[80rpx]">
							<button class="submit-btn" form-type="submit" size="mini" hover-class="none">Konfirmasi</button>
						</view>
					</form>
				</view>
			</u-popup>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onShow, onUnload, onPageScroll } from '@dcloudio/uni-app'
	import { getUserInfo, userEdit } from '@/api/user'
	import { smsSend } from '@/api/app'
	import { FieldType, SMSEnum } from '@/enums/appEnums'
	import { emitter } from '@/utils/emitter';
	const scrollTop = ref<number>(0)
	// 用户信息
	const userInfo = ref<any>({})
	// 用户信息的枚举
	const fieldType = ref(FieldType.NONE)
	//选择性别数据
	const sexList = ref<Array<string> | null>(['Pria', 'Wanita'])

	//显示昵称弹窗
	const showNickName = ref<boolean | null>(false)
	//显示whatsapp弹窗
	const showWhatapp = ref<boolean | null>(false)
	//显示telegram弹窗
	const showTelegram = ref<boolean | null>(false)
	//显示性别选择弹窗
	const showPicker = ref<boolean | null>(false)
	//新whatsapp
	const newWhatsapp = ref<string>('')
	//新昵称
	const newNickname = ref<string>('')
	//新telegram
	const newTelegram = ref<string>('')
	// 获取用户信息
	const getUser = async () : Promise<void> => {
		userInfo.value = await getUserInfo()
	}

	const toast = (message : any = '') => {
		emitter.emit('toast',message)
	}

	const handleAvatarChange = (value : any) => {
		fieldType.value = FieldType.AVATAR
		setUserInfoFun(value)
	}

	// 修改用户信息
	const setUserInfoFun = async (value : string) : Promise<void> => {
		await userEdit({
			field: fieldType.value,
			value: value
		})
		toast('Sukses')
		getUser()
	}

	// 显示修改用户性别弹窗
	const changeSex = () => {
		showPicker.value = true
		fieldType.value = FieldType.SEX
	}

	// 修改用户性别
	const changeSexConfirm = (value : any) => {
		setUserInfoFun(value[0] + 1)
		showPicker.value = false
	}

	// 修改用户昵称
	const changeNameConfirm = async (e : any) => {
		newNickname.value = e.detail.value.nickname
		if (newNickname.value == '') return toast('Nama panggilan tidak bisa kosong')
		if (newNickname.value.length > 18) return toast('Nama panggilan tidak boleh lebih dari sepuluh digit')
		fieldType.value = FieldType.NICKNAME
		await setUserInfoFun(newNickname.value)

		showNickName.value = false
	}
	
	// 修改用户whatsapp
	const changeWhatConfirm = async (e : any) => {
		newWhatsapp.value = e.detail.value.whatsapp
		if (newWhatsapp.value == '') return toast('Whatsapp tidak bisa kosong')
		if (newWhatsapp.value.length < 10) return toast('Silakan masukkan nomor WhatsApp yang benar')
		fieldType.value = FieldType.WHATSAPP
		await setUserInfoFun(newWhatsapp.value)
	
		showWhatapp.value = false
	}
	
	// 修改用户Telegram
	const changeTelegramConfirm = async (e : any) => {
		newTelegram.value = e.detail.value.telegram
		if (newTelegram.value == '') return toast('Telegram tidak bisa kosong')
		fieldType.value = FieldType.TELEGRAM
		await setUserInfoFun(newTelegram.value)
	
		showTelegram.value = false
	}
	
	const goPage = (url : string) => {
		uni.navigateTo({
			url: url
		})
	}

	onShow(async () => {
		getUser()
	})

	onUnload(() => { })

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

		.user_data {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.header {
				width: 100%;

				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}
			}

			.user_data_card {
				border-radius: 12rpx;
				background-color: #ffffff;

				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 2rpx;
					padding: 30rpx;

					.label {
						width: 250rpx;
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #1E1E1E;
					}

					.content {
						width: 400rpx;
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #999999;
					}
				}
			}

			.recover_input {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 20rpx 40rpx;
				border-radius: 10rpx;
				background: #F4F7FD;
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
</style>
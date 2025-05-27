<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="change_password">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#FFFFFF"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="GANTI KATA SANDI" title-color="#FFFFFF">
				</u-navbar>
			</u-sticky>
			<view class="password_con mt-[50rpx] mx-[30rpx]">
				<view class="password_row" v-if="type != 'set'">
					<view class="password_label mb-[20rpx]">Verifikasi Kata Sandi</view>
					<view class="password_input">
						<u-input type="password" v-model="formData.old_password" :border="false"
							placeholder-style="color: #999999;font-size:24rpx;" placeholder="Masukkan Kata Sandi Lama" />
					</view>
				</view>
				<view class="password_row">
					<view class="password_label mb-[20rpx]">Kata Sandi Baru</view>
					<view class="password_input">
						<u-input type="password" v-model="formData.password" :border="false"
							placeholder-style="color: #999999;font-size:24rpx;" placeholder="Masukkan Kata Sandi Baru" />
					</view>
				</view>
				<view class="password_row">
					<view class="password_label mb-[20rpx]">Konfirmasi Kata Sandi</view>
					<view class="password_input">
						<u-input type="password" v-model="formData.password_confirm" :border="false"
							placeholder-style="color: #999999;font-size:24rpx;" placeholder="Masukkan Kata Sandi Kembali" />
					</view>
				</view>
				<view class="forget" @tap="forget" v-if="type != 'set'">Lupa Kata Sandi</view>
			</view>
			<view class="submit-btn mt-[40rpx] mx-[30rpx]" @click="handleConfirm">Konfimasi</view>
		</view>
		<toastPopup></toastPopup>
	</view>

</template>

<script setup lang="ts">
	import { userChangePwd } from '@/api/user'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { RequestCodeEnum } from '@/enums/requestEnums'
	import { reactive, ref } from 'vue'
	import { useRouter } from "uniapp-router-next";
	const scrollTop = ref<number>(0)
	const type = ref('')
	import { emitter } from '@/utils/emitter';
	const formData = reactive<any>({
		old_password: '',
		password: '',
		password_confirm: ''
	})
	const router = useRouter()
	const forget = () => {
		router.navigateTo('/pages/forget_pwd/forget_pwd')
	}
	const resetForm = () => {
		const resetData = {
			old_password: '',
			password: '',
			password_confirm: ''
		}
		Object.assign(formData, resetData)
	}
	const handleConfirm = async () => {
		if (!formData.old_password && type.value != 'set') return toast('Silakan masukkan Password asli')
		if (!formData.password) return toast('Silakan masukkan sandi baru')
		if (!formData.password_confirm) return toast('Tolong masukkan kata sandinya lagi')
		if (formData.password != formData.password_confirm) return toast('Masukan kata sandi tidak sesuai')
		const data = await userChangePwd(formData)
		if (data.code == RequestCodeEnum.SUCCESS) {
			toast('Sukses')
			resetForm()
			setTimeout(() => {
				uni.navigateBack()
			}, 1500)
		} else {
			toast(data.msg)
		}
	}
	const toast = (message : any = '') => {
		emitter.emit('toast',message)
	}
	onLoad((options : any) => {
		type.value = options.type || ''
	})
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page {
		background: #F0F0F0 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.change_password {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.password_con {
				padding: 20rpx;
				background: #FFFFFF;
				border-radius: 12rpx;
				.password_row {
					margin-bottom: 20rpx;

					.password_label {
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
				}

				.forget {
					font-family:  Arial;
					font-size: 24rpx;
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
				border-radius: 12rpx;
				background: #458060;
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
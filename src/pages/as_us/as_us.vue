<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="as-us">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#FFFFFF"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="TENTANG RICE RICH APP" title-color="#FFFFFF">
				</u-navbar>
			</u-sticky>
			<view class="app_info mt-[100rpx] mb-[30rpx] ml-[30rpx] mr-[30rpx]">
				<u-image width="159" height="154" :src="appStore.getWebsiteConfig.shop_logo" alt="" />
				<view class="text-content mt-[20rpx]">{{ appStore.getWebsiteConfig.shop_name }}</view>
				<view class="version mt-[30rpx]">Versi 2.3.1</view>
			</view>
			<view class="user-set mb-[20rpx]  ml-[40rpx] mr-[40rpx]">
				<view class="invention">Versi baru ditemukan</view>
				<view class="tip">V.2.3.1</view>
			</view>
			<view class="app_btn mt-[50rpx]">
				<view class="btn">Perbarui sekarang</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { useAppStore } from '@/stores/app'
	import { AgreementEnum } from '@/enums/agreementEnums'
	import { onPageScroll } from '@dcloudio/uni-app'
	const scrollTop = ref<number>(0)
	const appStore = useAppStore()
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

		.as-us {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.app_info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 420rpx;

				.text-content {
					font-family:  Arial;
					font-size: 36rpx;
					font-weight: 700;
					line-height: 54rpx;
					text-align: center;
					color: #D2B571;
				}
				.version{
					font-family: Arial;
					font-weight: 400;
					font-size: 32rpx;
					line-height: 40rpx;
					color: #1E1E1E;
				}
			}

			.user-set {
				display: flex;
				justify-content: center;
				align-items: center;
				.invention{
					margin-right: 20rpx;
					font-family: Arial;
					font-weight: 400;
					font-size: 24rpx;
					line-height: 40rpx;
					color: #4B92EA;
				}
				.tip{
					width: 90rpx;
					height: 35rpx;
					font-family: Arial;
					font-weight: 400;
					font-size: 24rpx;
					text-align: center;
					line-height: 35rpx;
					color: #8B9098;
					border-radius: 4rpx;
					background: rgba(240,200,163,0.4);
				}
			}
			.app_btn{
				display: flex;
				justify-content: center;
				align-items: center;
				.btn{
					width: 500rpx;
					height: 65rpx;
					font-family: Arial;
					font-weight: 400;
					font-size: 24rpx;
					text-align: center;
					line-height: 65rpx;
					color: #FFFFFF;
					border-radius: 8rpx;
					background: #4B92EA;
				}
			}
		}
	}
</style>
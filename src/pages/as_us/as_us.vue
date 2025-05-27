<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="as-us">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="TENTANG RICE RICH APP" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="app_info mt-[50rpx] mb-[20rpx] ml-[40rpx] mr-[40rpx]">
				<u-image width="292" height="292" :src="appStore.getWebsiteConfig.shop_logo" alt="" />
				<view class="text-content mt-[20rpx]">{{ appStore.getWebsiteConfig.shop_name }}</view>
			</view>
			<view class="user-set mb-[20rpx]  ml-[40rpx] mr-[40rpx]">
				<navigator :url="`/pages/agreement/agreement?type=${AgreementEnum.PRIVACY}`">
					<view class="privacy item bg-white mt-[20rpx] btn-border flex flex-1 justify-between">
						<view class="label_name">Kebijakan Privasi</view>
						<u-icon name="arrow-right" color="#666"></u-icon>
					</view>
				</navigator>
				<navigator :url="`/pages/agreement/agreement?type=${AgreementEnum.SERVICE}`">
					<view class="service item bg-white btn-border flex flex-1 justify-between">
						<view class="label_name">Ketentuan layanan</view>
						<u-icon name="arrow-right" color="#666"></u-icon>
					</view>
				</navigator>
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
		background: #F0F0F0 !important;
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
				border-radius: 12rpx;
				background: #FFFFFF;

				.text-content {
					font-family:  Arial;
					font-size: 36rpx;
					font-weight: 700;
					line-height: 54rpx;
					text-align: center;
					color: #333333;
				}
			}

			.user-set {
				.item {

					padding: 30rpx;
				}

				.privacy {
					border-top-left-radius: 10rpx;
					border-top-right-radius: 10rpx;
					.label_name{
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						text-align: left;
						color: #1E1E1E;
					}
				}

				.service {
					border-bottom-left-radius: 10rpx;
					border-bottom-right-radius: 10rpx;
					.label_name{
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						text-align: left;
						color: #1E1E1E;
					}
				}

				.btn-border {
					border-bottom: 2rpx solid #EAEAEA;
				}
			}
		}
	}
</style>
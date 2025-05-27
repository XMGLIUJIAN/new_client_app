<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="agreement pb-[50rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					:title="agreementType == 'privacy' ? 'KEBIJAKAN PRIVASI':'KETENTUAN LAYANAN'" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="parse mt-[50rpx] mb-[50rpx] ml-[40rpx]  mr-[40rpx]">
				<view class="parse_con">
					<rich-text class="rich_text" :nodes="agreementContent"></rich-text>
				</view>
			</view>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { getPolicy } from '@/api/app'
	import { formatRichText } from '@/utils/util'
	const scrollTop = ref<number>(0)
	const agreementType = ref('') // 协议类型
	const agreementContent = ref('') // 协议内容

	const getData = async (type : String) => {
		const res = await getPolicy({ type })
		agreementContent.value = formatRichText(res.content) || res.content
	}
	onLoad((options : any) => {
		if (options.type) {
			agreementType.value = options.type
			getData(agreementType.value)
		}
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

		.agreement {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.parse {
				border-radius: 12rpx;
				background: #FFFFFF;

				.parse_con {
					padding: 0 20rpx;
					.rich_text{
						word-break:break-all;
					}
				}
			}
		}
	}
</style>
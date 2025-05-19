<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="498" src="@/static/images/pageStyle/imageGroupFive.png"></u-image>
		</view>
		<view class="feedback">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="SAYA INGIN UMPAN BALIK" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="feedback_con mt-[50rpx] mb-[50rpx] ml-[40rpx] mr-[40rpx]">
				<view class="feedback_head mb-[20rpx]">Deskripsi masalah (diperlukan)</view>
				<view class="feedback_card">
					<textarea v-model="feedbackValue" maxlength="500"
						placeholder-style="color:#999999;font-size: 28rpx;"
						placeholder="Untuk memecahkan masalahmu dengan lebih baik, tolong jelaskan masalahnya sedetail mungkin." />
					<view class="feedback_tips">{{formatNumber(feedbackValue.length)}} / 500</view>
				</view>
				<view class="submit_btn mt-[50rpx]">Konfirmasi</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { formatNumber } from '@/utils/util'
	import { onPageScroll } from '@dcloudio/uni-app'
	const scrollTop = ref<number>(0)
	const feedbackValue = ref<String>('')
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

		.feedback {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.feedback_con {
				.feedback_head {
					font-family:  Arial;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 48rpx;
					text-align: left;
					color: #1E1E1E;
				}

				.feedback_card {
					padding: 20rpx;
					border-radius: 10rpx;
					background: #FFFFFF;

					.feedback_tips {
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 42rpx;
						text-align: right;
						color: #999999;
					}
				}

				.submit_btn {
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
	}
</style>
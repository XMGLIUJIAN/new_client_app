<template>
	<view class="popup">
		<view class="content">
			<view class="intro">
				<u-image width="572" height="844" src="@/static/images/raffle/raffle_popup.png"></u-image>
				<view class="core_area">
					<view class="title">
						<u-image width="348" height="58" src="@/static/images/raffle/aturan_aktivitas.png"></u-image>
					</view>
					<view class="popup_txt">
						<rich-text class="rich_text" :nodes="formatRichText(parseContent) || parseContent"></rich-text>
					</view>
				</view>
				<view class="cancel_btn" @tap="cancelPopup">
					<u-image width="68" height="68" src="@/static/images/raffle/cancel_btn.png"></u-image>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { formatRichText } from '@/utils/util'
	const props = defineProps({
		parseContent: {
			type: String,
			default: ''
		}
	})
	const emit = defineEmits(['cancel'])
	const cancelPopup = () => {
		emit('cancel')
	}
</script>

<style lang="scss" scoped>
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		z-index: 999;

		.content {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;

			.intro {
				position: relative;
				width: 572rpx;
				border-radius: 20rpx;
				background: #FFFFFF;
				.core_area{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					padding: 40rpx;
					.title{
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.popup_txt{
						overflow: auto;
						height: 700rpx;
						.rich_text{
							font-family: Source Han Sans CN;
							font-weight: 400;
							font-size: 24rpx;
							line-height: 48rpx;
							color: #FFFFFF;
							word-break:break-all;
						}
					}
				}

				.cancel_btn {
					position: absolute;
					bottom: -100rpx;
					left: 50%;
					transform: translate(-50%, 0);
				}
			}
		}
	}
</style>
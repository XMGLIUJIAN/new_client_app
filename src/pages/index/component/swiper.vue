<template>
	<view class="content mx-[30rpx] mt-[20rpx] mb-[150rpx] pt-[20rpx] pb-[20rpx]">
		<view class="swiper_head mb-[10rpx]">
			<view class="swiper_title">Konten Populer</view>
		</view>
		<view class="swiper-box">
			<view class="swiper-item">
				<u-image width="467" height="478" src="@/static/images/card/swiper_head01.png" />
				<view class="mineImage">
					<u-image width="467" height="225" src="@/static/images/card/swiper_foot01.png" alt="" />
				</view>
				<view class="poin_bonus">Saldo Poin Bonus</view>
				<view class="mineCard">
					<view class="card_box">
						<view class="mine_info">
							<view class="mine_head">
								<view class="head_info_left">
									<u-image width="42" height="42" src="@/static/images/card/mine_icon01.png" alt="" />
									<view class="head_info">
										<view class="head_info_title">Beras Putih</view>
										<view class="head_info_text">Jumlah 3 hari poposi</view>
									</view>
								</view>
								<view class="head_info_right">
									<view class="head_info_btn">Masatanan</view>
									<view class="head_info_progress">proporsi: 0.5%</view>
								</view>
							</view>
							<u-line-progress height="6" :show-percent="false" round :percent="formatProgress(50,100)"
								active-color="#92BEAB" inactive-color="#1E4B2E"></u-line-progress>
							<view class="upgrade_progress">9.999.999.999.999/1.999.999.999</view>
						</view>
					</view>
					<view class="mine_tip">Total Kontrak Investor:15.100</view>
				</view>
			</view>
			<view class="swiper_info">
				<view class="info_btn sign">
					<u-image width="40" height="40" src="@/static/images/icon/icon_sign.png" alt="" />
					<view class="icon_text">Area Check-in</view>
					<view class="icon_text">+2000 Poin</view>
				</view>
				<view class="info_btn prize">
					<u-image width="40" height="40" src="@/static/images/icon/icon_prize.png" alt="" />
					<view class="icon_text">Masuk untuk</view>
					<view class="icon_text">Info Acara Terbaru</view>
				</view>
				<view class="icon_lihat">
					<u-image width="28" height="28" src="@/static/images/icon/icon_all.png" alt="" />
					<view class="icon_text">Lihat selengkapnya</view>
					<view class="icon_text">
						<u-image width="30" height="12" src="@/static/images/icon/icon_rightTip.png" alt="" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { formatNumber, formatProgress } from '@/utils/util'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	const userStore = useUserStore()
	const { userInfo, isLogin } = storeToRefs(userStore)
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
</script>

<style lang="scss" scoped>
	.content {
		border-radius: 12rpx;
		background: linear-gradient(360deg, #FFFFFF 0%, #C7E1C9 89.42%);

		.swiper_head {
			padding: 0 20rpx;

			.swiper_title {
				font-family: Arial;
				font-size: 32rpx;
				font-weight: 700;
				line-height: 54rpx;
				text-align: left;
				color: #1E4B2E;
			}
		}

		.swiper-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;

			.swiper-item {
				overflow: hidden;
				position: relative;
				border-radius: 12rpx;

				.mineImage {
					position: absolute;
					bottom: 0;
					left: 0;
					z-index: 44;
				}
				.poin_bonus{
					position: absolute;
					top: 0;
					left: 40rpx;
					z-index: 44;
					width: 187rpx;
					height: 45rpx;
					border-bottom-right-radius: 12rpx;
					border-bottom-left-radius: 12rpx;
					background: linear-gradient(210deg, #EC4A32 13.39%, #EF817B 86.61%);
					font-family: Arial;
					font-weight: 400;
					font-size: 20rpx;
					text-align: center;
					line-height: 45rpx;
					color: #FFFFFF;
				}
				.mineCard {
					position: absolute;
					bottom: 20rpx;
					left: 0;
					width: 100%;
					z-index: 55;

					.card_box {
						display: flex;
						justify-content: center;
						align-items: flex-start;
						.mine_info {
							width: 442rpx;
							padding: 20rpx;
							border-radius: 12rpx;
							background: #FFFFFF;

							.mine_head {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.head_info_left {
									display: flex;
									justify-content: space-between;
									align-items: center;
									.head_info{
										margin-left: 10rpx;
										.head_info_title{
											font-family: Arial;
											font-weight: 400;
											font-size: 24rpx;
											text-align: left;
											line-height: 40rpx;
											color: #1E4B2E;
										}
										.head_info_text{
											font-family: Arial;
											font-weight: 400;
											font-size: 18rpx;
											line-height: 28rpx;
											text-align: left;
											color: #1E4B2E;
										}
									}
								}
								.head_info_right{
									display: flex;
									flex-direction: column;
									align-items: flex-end;
									justify-content: space-between;
									
									.head_info_btn{
										width: 100rpx;
										height: 24rpx;
										border-radius: 3rpx;
										background: #1E4B2E;
										font-family: Arial;
										font-weight: 400;
										font-size: 16rpx;
										line-height: 24rpx;
										text-align: center;
										color: #FFFFFF;
									}
									.head_info_progress{
										margin-top: 10rpx;
										font-family: Arial;
										font-weight: 400;
										font-size: 14rpx;
										line-height: 28rpx;
										text-align: right;
										color: #1E4B2E;
									}
								}
							}
							.upgrade_progress{
								font-family: Arial;
								font-weight: 400;
								font-size: 16rpx;
								line-height: 40rpx;
								text-align: left;
								color: #1E4B2E;
							}
						}
					}

					.mine_tip {
						font-family: Arial;
						font-weight: 400;
						font-size: 18rpx;
						text-align: center;
						line-height: 54rpx;
						color: #F1F1F1;
					}

				}

			}

			.swiper_info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				height: 478rpx;

				.info_btn {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 158rpx;
					height: 170rpx;
					border-radius: 12rpx;

					&.sign {
						background: linear-gradient(310.97deg, #F6DB90 32.02%, #F1C44D 119.99%);
					}

					&.prize {
						background: linear-gradient(210deg, #387AF1 13.39%, #6A9CF4 86.61%);
					}

					.icon_text {
						font-family: Arial;
						font-weight: 700;
						font-size: 16rpx;
						line-height: 28rpx;
						text-align: center;
						color: #FFFFFF;
					}
				}

				.icon_lihat {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 158rpx;
					height: 95rpx;
					border-radius: 12rpx;
					background: #F0F0F0;

					.icon_text {
						font-family: Arial;
						font-weight: 700;
						font-size: 16rpx;
						line-height: 28rpx;
						text-align: center;
						color: #1E1E1E;
					}
				}
			}
		}
	}
</style>
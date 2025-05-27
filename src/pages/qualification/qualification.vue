<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="qualification">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E" title="CEK KUALIFIKASI"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="qualification_box">
				<view class="qualification_card">
					<view class="card_head" :class="getState(checkInfo.total_days)">
						<view class="title" :class="getState(checkInfo.total_days)">{{checkInfo.name}}</view>
						<view class="card_head_btn canbe" v-if="checkInfo.status == 1">Tersedia</view>
						<view class="card_head_btn disable" v-else>Tidak Dapat Ditandatangani</view>
					</view>
					<view class="card_check">
						<view class="card_check_collapse">
							<view class="label_collapse">
								<view class="head_title">Total Investasi</view>
								<view class="collapse_head">
									<view class="head_tip">
										<text class="num">{{formatNumber(checkInfo.current_recharge)}}</text>/{{formatNumber(checkInfo.require_recharge)}}
									</view>
								</view>
								<u-line-progress height="8" :show-percent="false" round
									:percent="formatProgress(checkInfo.current_recharge,checkInfo.require_recharge)"
									active-color="#0067E0" inactive-color="#E8E8E8"></u-line-progress>
							</view>
							<view class="label_collapse">
								<view class="head_title">Jumlah Poin yang Dimiliki</view>
								<view class="collapse_head">
									<view class="head_tip">
										<text class="num">{{formatNumber(checkInfo.current_point)}}</text>/{{formatNumber(checkInfo.require_point)}}
									</view>
								</view>
								<u-line-progress height="8" :show-percent="false" round
									:percent="formatProgress(checkInfo.current_point,checkInfo.require_point)"
									active-color="#0067E0" inactive-color="#E8E8E8"></u-line-progress>
							</view>
							<view class="label_collapse">
								<view class="head_title">Jumlah Pengguna yang Diundang untuk Deposit</view>
								<view class="collapse_head">
									<view class="head_tip">
										<text class="num">{{formatNumber(checkInfo.current_invite)}}</text>/{{formatNumber(checkInfo.require_invite)}}
									</view>
								</view>
								<u-line-progress height="8" :show-percent="false" round
									:percent="formatProgress(checkInfo.current_invite,checkInfo.require_invite)"
									active-color="#0067E0" inactive-color="#E8E8E8"></u-line-progress>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { formatNumber, formatProgress } from '@/utils/util'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { eligibilityCheck } from '@/api/raffle'
	const scrollTop = ref<number>(0)
	const checkInfo = ref<any>({})
	const getState = (state : number) => {
		let color = ""
		switch (state) {
			case 3:
				color = 'putih'
				break;
			case 7:
				color = 'melati'
				break;
			case 15:
				color = 'ungu'
				break;
			case 30:
				color = 'merah'
				break;
			case 60:
				color = 'hitam'
				break;
		}
		return color
	}
	const getCheckInfo = async (info: any) => {
		checkInfo.value = await eligibilityCheck(info)
	}
	onLoad((option) => {
		getCheckInfo(option)
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

		.qualification {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.qualification_box {
				padding: 30rpx;

				.qualification_card {
					margin-bottom: 20rpx;

					.card_head {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 30rpx;
						height: 80rpx;
						border-top-right-radius: 16rpx;
						border-top-left-radius: 16rpx;

						&.putih {
							background: #F4F5F7;
						}

						&.melati {
							background: #FFF5ED;
						}

						&.ungu {
							background: #E8F1FF;
						}

						&.merah {
							background: #FFFBE6;
						}

						&.hitam {
							background: #EAE9FF;
						}

						.title {
							font-family: Source Han Sans CN;
							font-weight: 500;
							font-size: 28rpx;
							line-height: 40rpx;
							text-align: left;

							&.putih {
								color: #8CA6C8;
							}

							&.melati {
								color: #B47033;
							}

							&.ungu {
								color: #7AA7E8;
							}

							&.merah {
								color: #DDA906;
							}

							&.hitam {
								color: #6D67D1;
							}
						}

						.card_head_btn {
							padding: 6rpx 22rpx;
							font-family: Source Han Sans CN;
							font-weight: 500;
							font-size: 24rpx;
							line-height: 40rpx;
							text-align: center;
							border-radius: 10rpx;
							background: linear-gradient(270deg, #5693FF 0%, #0067E0 100%);

							&.canbe {
								background: linear-gradient(270deg, #5693FF 0%, #0067E0 100%);
								color: #FFFFFF;
							}

							&.disable {
								background: #FFFFFF;
								color: #BCBCBC;
							}
						}
					}

					.card_check {
						background: #FFFFFF;
						border-bottom-right-radius: 16rpx;
						border-bottom-left-radius: 16rpx;
						.card_check_collapse {
							padding: 0 30rpx;
							.label_collapse{
								padding: 20rpx 0;
								border-bottom: 2rpx solid #E8E8E8;
								.head_title{
									font-family: Source Han Sans CN;
									font-weight: 500;
									font-size: 24rpx;
									line-height:40rpx;
									text-align: left;
									color: #1E1E1E;
								}
								.collapse_head{
									display: flex;
									justify-content: flex-end;
									align-items: center;
									.head_tip{
										font-family: SimHei;
										font-weight: 400;
										font-size: 20rpx;
										line-height: 32rpx;
										text-align: right;
										color: #ADADAD;
										.num{
											font-family: SimHei;
											font-weight: 700;
											font-size: 30rpx;
											line-height: 32rpx;
											text-align: right;
											color: #0067E0;
										}
									}
								}
							}
							.label_collapse:last-child{
								border: 0;
							}
						}
					}
				}
			}
		}
	}
</style>
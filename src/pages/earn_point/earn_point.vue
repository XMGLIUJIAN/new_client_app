<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="earn_point">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false"
					:back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'" title="POIN PROFITPLUS" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					:title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
			<view class="point_card mt-[50rpx] mb-[20rpx] mx-[30rpx]">
				<view class="card_head">
					<view class="card_head_poin">Total Poin</view>
					<view class="card_head_lock" @tap="eyeChange">
						<u-image v-if="!eyeShow" width="30" height="30" src="@/static/images/icon/icon_see.png" alt="" />
						<u-image v-else width="30" height="30" src="@/static/images/icon/icon_lock.png" alt="" />
					</view>
				</view>
				<view class="card_point_num">{{!eyeShow ? formatNumber(224345323) || 0 : '***' }}</view>
				<view class="point_card_box">
					<view class="point_card_label">
						<view class="card_label_text">Pendapatan Kemarin</view>
						<view class="card_label_num">Rp 999.999</view>
					</view>
					<view class="point_card_label">
						<view class="card_label_text">Total Keuntungan</view>
						<view class="card_label_num">Rp 999.999</view>
					</view>
				</view>
				<view class="point_card_foot mt-[50rpx]">
					<view class="foot_btn">Tukar</view>
				</view>
			</view>
			<view class="profit_card mt-[20rpx] mb-[20rpx] mx-[30rpx]">
				<view class="profit_card_head">Penjelasan Tingkat Keuntungan</view>
				<view class="profit_card_line mt-[20rpx] mb-[20rpx]"></view>
				<view class="profit_card_dashboard mt-[20rpx] mb-[20rpx]">
					<u-image width="268" height="120" src="@/static/images/card/dashboard_first.png"></u-image>
					<!-- <u-image width="268" height="120" src="@/static/images/card/dashboard_second.png"></u-image> -->
				</view>
				<view class="profit_dashboard_text">Persentase Rilis Harian Saat Ini</view>
				<view class="profit_dashboard_num">0.05%</view>
				<view class="profit_countdown mt-[20rpx] mb-[20rpx]">
					<u-image width="35" height="35" src="@/static/images/card/icon_countdown.png"></u-image>
					<view class="profit_countdown_text">Hitung Mundur：144:59:48</view>
				</view>
				<view class="profit_card_box mb-[40rpx] mx-[40rpx]">
					<view class="profit_card_text">Tingkat Keuntungan</view>
					<view class="profit_card_btn">100%</view>
				</view>
				<view class="profit_card_estimate">
					<view class="card_estimate_text">Estimasi Hari Ini</view>
					<view class="card_estimate_num">Rp 999.999.999</view>
				</view>
				<view class="profit_card_issue">
					<view class="card_issue_head">
						<view class="issue_head_title">Pengalaman Rilis</view>
						<view class="issue_head_num">200%</view>
					</view>
					<view class="card_issue_line mt-[5rpx] mb-[20rpx]"></view>
					<view class="card_issue_box">
						<view class="card_invite_official mb-[20rpx]">
							<u-image width="173" height="130" src="@/static/images/card/invite_official.png"></u-image>
							<view class="invite_info">
								<view class="invite_info_label">Undang Pengguna Resmi,</view>
								<view class="invite_info_label">Rilis Naik Menjadi<text class="label_text">0.1%</text></view>
							</view>
						</view>
						<view class="card_invite_user">
							<view class="invite_info">
								<view class="invite_info_label">Undang Pengguna<text class="label_text">+1,</text></view>
								<view class="invite_info_label">Waktu Keuntungan Tinggi<text class="label_text">+2 Hari</text></view>
							</view>
							<u-image width="143" height="132" src="@/static/images/card/invite_user.png"></u-image>
						</view>
						<view class="issue_invite">
							<u-image width="65" height="65" src="@/static/images/card/issue_invite.png"></u-image>
						</view>
					</view>
				</view>
			</view>
			<view class="point_investasi mb-[30rpx] mx-[30rpx]">
					<u-image width="690" height="260" src="@/static/images/card/point_investasi.png"></u-image>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { formatNumber } from '@/utils/util'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	const scrollTop = ref<number>(0)
	const eyeShow = ref<boolean>(false)
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url: url
		})
	}
	const eyeChange = () => {
		eyeShow.value = !eyeShow.value
	}
	
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
	.container{
		position: relative;
		.earn_point{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.point_card{
				padding: 30rpx 50rpx 50rpx 50rpx;
				background: #FFFFFF;
				border-radius: 12rpx;
				.card_head{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.card_head_poin{
						font-family: Arial;
						font-weight: 400;
						font-size: 32rpx;
						line-height: 40rpx;
						color: #999999;
					}
					.card_head_lock{
						margin-left: 20rpx;
					}
				}
				.card_point_num{
					font-family: PingFang SC;
					font-weight: 500;
					font-size: 64rpx;
					line-height: 90rpx;
					color: #000000;
				}
				.point_card_box{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.card_label_text{
						font-family: Arial;
						font-weight: 400;
						font-size: 24rpx;
						line-height: 40rpx;
						text-align: left;
						color: #999999;
					}
					.card_label_num{
						font-family: Arial;
						font-weight: 400;
						font-size: 32rpx;
						line-height: 40rpx;
						text-align: left;
						color: #1E1E1E;
					}
				}
				.point_card_foot{
					display: flex;
					justify-content: center;
					align-items: center;
					.foot_btn{
						width: 552rpx;
						height: 72rpx;
						border-radius: 12rpx;
						background:  #458060;
						font-family: Arial;
						font-weight: 400;
						font-size: 30rpx;
						line-height: 72rpx;
						text-align: center;
						color: #FFFFFF;
					}
				}
			}
			.profit_card{
				padding: 20rpx 40rpx 40rpx 40rpx;
				background: #FFFFFF;
				border-radius: 12rpx;
				.profit_card_head{
					font-family: PingFang SC;
					font-weight: 500;
					font-size: 32rpx;
					line-height: 45rpx;
					text-align: center;
					color: #1E1E1E;
				}
				.profit_card_line{
					height: 1rpx;
					background: #D7D7D7;
				}
				.profit_card_dashboard{
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.profit_dashboard_text{
					font-family: PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					line-height: 40rpx;
					text-align: center;
					color: #999999;
				}
				.profit_dashboard_num{
					font-family: PingFang SC;
					font-weight: 400;
					font-size: 55rpx;
					line-height: 80rpx;
					text-align: center;
					color: #000000;
				}
				.profit_countdown{
					display: flex;
					justify-content: center;
					align-items: center;
					.profit_countdown_text{
						margin-left: 10rpx;
						font-family: PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						line-height: 35rpx;
						text-align: left;
						color: #999999;
					}
				}
				.profit_card_box{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					height: 58rpx;
					border-radius: 50rpx;
					background: #F1F1F1;
					.profit_card_text{
						padding: 0 38rpx;
						font-family: Arial;
						font-weight: 700;
						font-size: 24rpx;
						line-height: 100%;
						text-align: center;
						color: #458060;
					}
					.profit_card_btn{
						width: 220rpx;
						height: 58rpx;
						border-radius: 50rpx;
						background: linear-gradient(210deg, #E87A3D 13.39%, #F19E6C 86.61%);
						font-family: PingFang SC;
						font-weight: 600;
						font-size: 36rpx;
						line-height: 58rpx;
						text-align: center;
						color: #FFFFFF;
					}
				}
				.profit_card_estimate{
					padding: 20rpx;
					border-radius: 12rpx;
					background: #F7F7F7;
					.card_estimate_text{
						font-family: Arial;
						font-weight: 400;
						font-size: 26rpx;
						line-height: 40rpx;
						text-align: center;
						color: #000000;
					}
					.card_estimate_num{
						font-family: Arial;
						font-weight: 700;
						font-size: 50rpx;
						line-height: 80rpx;
						text-align: center;
						color: #EB2C0F;
					}
				}
				.profit_card_issue{
					margin-top: 60rpx;
					.card_issue_head{
						display: flex;
						justify-content: flex-start;
						align-items: center;
						.issue_head_title{
							font-family: Arial;
							font-weight: 700;
							font-size: 36rpx;
							line-height: 45rpx;
							text-align: left;
							color: #458060;
						}
						.issue_head_num{
							margin-left: 10rpx;
							font-family: Arial;
							font-weight: 700;
							font-size: 45rpx;
							line-height: 40rpx;
							text-align: left;
							color: #1E4B2E;
						}
					}
					.card_issue_line{
						width: 435rpx;
						height: 4rpx;
						background: #589E80;
					}
					.card_issue_box{
						position: relative;
						.card_invite_official{
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 20rpx;
							border-radius: 12rpx;
							background: #DEEDDE;
							.invite_info{
								font-family: Arial;
								font-weight: 400;
								font-size: 26rpx;
								line-height: 40rpx;
								text-align: left;
								color: #000000;
								.label_text{
									margin-left: 10rpx;
									font-family: Arial;
									font-weight: 400;
									font-size: 26rpx;
									line-height: 40rpx;
									text-align: left;
									background: linear-gradient(210deg, #E87A3D 13.39%, #F19E6C 86.61%);
									-webkit-background-clip: text;
									/*将设置的背景颜色限制在文字中*/
									-webkit-text-fill-color: transparent;
									/*给文字设置成透明*/
								}
							}
						}
						.card_invite_user{
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 20rpx;
							border-radius: 12rpx;
							background: #FFF8E9;
							.invite_info{
								font-family: Arial;
								font-weight: 400;
								font-size: 26rpx;
								line-height: 40rpx;
								text-align: left;
								color: #000000;
								.label_text{
									margin-left: 10rpx;
									font-family: Arial;
									font-weight: 400;
									font-size: 26rpx;
									line-height: 40rpx;
									text-align: left;
									background: linear-gradient(210deg, #E87A3D 13.39%, #F19E6C 86.61%);
									-webkit-background-clip: text;
									/*将设置的背景颜色限制在文字中*/
									-webkit-text-fill-color: transparent;
									/*给文字设置成透明*/
								}
							}
						}
						.issue_invite{
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%,-50%);
						}
					}
				}
			}
			.point_investasi{
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 12rpx;
				background: #FFFFFF;
			}
		}
	}
</style>
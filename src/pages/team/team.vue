<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="team">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="false" :is-fixed="false" :border-bottom="false" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					:title-color="scrollTop ? '#1E1E1E':'#FFFFFF'" title="TIM">
					<template #right>
						<view class="slot-wrap">
							<u-image v-if="scrollTop" width="40" height="40" src="@/static/images/icon/contact.png" alt="" />
							<u-image v-if="!scrollTop" width="40" height="40" src="@/static/images/user/icon_service.png" alt="" />
						</view>
					</template>
				</u-navbar>
			</u-sticky>
			<view class="team_con px-[30rpx] pt-[20rpx] pb-[120rpx]">
				<view class="team_card">
					<u-image width="690" height="350" src="@/static/images/team/team_info.png" alt="" />
					<view class="team_user">
						<view class="user_box">
							<view class="user_info">
								<view class="user_info_title">
									<view class="nickname">Level Tim</view>
									<view class="normal">Lv 1</view>
								</view>
								<view class="user_info_text">Persentase Pembagian Keuntungan Saat Ini:10%</view>
							</view>
							<view class="code_box">
								<u-image width="60" height="60" src="@/static/images/team/code.png" alt="" />
							</view>
						</view>
						<view class="team_card_line"></view>
						<view class="team_upgrade">
							<view class="upgrade">
								<view class="upgrade_text">Undang Pengguna untuk Isi Ulang 2</view>
								<view class="upgrade_tip">Butuh 2 lagi untuk mencapai LV2</view>
							</view>
							<u-line-progress height="8" :show-percent="false" round :percent="formatProgress(50,100)"
								active-color="#81AF95" inactive-color="#FFFFFF"></u-line-progress>
						</view>
						<view class="team_upgrade">
							<view class="upgrade">
								<view class="upgrade_text">Undang Pengguna untuk Isi Ulang 2</view>
								<view class="upgrade_tip">Butuh 2 lagi untuk mencapai LV2</view>
							</view>
							<u-line-progress height="8" :show-percent="false" round :percent="formatProgress(50,100)"
								active-color="#81AF95" inactive-color="#FFFFFF"></u-line-progress>
						</view>
					</view>
				</view>
				<view class="rankie_card mt-[20rpx]">
					<view class="rankie_head">Peringkat Tim</view>
					<view class="rankie_table">
						<view class="rankie_tr" v-for="(item,index) in rankArr" :key="index">
							<view class="rankie_image" v-if="index == 0">
								<u-image width="88" height="88" src="@/static/images/team/first.png" alt="" />
								<view class="avatar">
									<u-image width="60" height="60" src="@/static/images/user/default_avatar.png"
										alt="" />
								</view>
							</view>
							<view class="rankie_image" v-else-if="index == 1">
								<u-image width="88" height="88" src="@/static/images/team/second.png" alt="" />
								<view class="avatar">
									<u-image width="60" height="60" src="@/static/images/user/default_avatar.png"
										alt="" />
								</view>
							</view>
							<view class="rankie_image" v-else-if="index == 2">
								<u-image width="88" height="88" src="@/static/images/team/third.png" alt="" />
								<view class="avatar">
									<u-image width="60" height="60" src="@/static/images/user/default_avatar.png"
										alt="" />
								</view>
							</view>
							<view class="rankie_info">
								<view class="rankie_name">63+ {{item.userName}}</view>
								<view class="rankie_num">Rp {{formatNumber(item.totalInvestmentAmount)}}</view>
							</view>
						</view>
						<view class="empty mt-[50rpx]" v-if="!rankArr.length">
							<u-empty text="Tidak ada catatan" mode="list" icon-color="#999999"
								color="#999999"></u-empty>
						</view>
					</view>
				</view>
				<view class="teamdata_head">Detail Tim</view>
				<view class="teamdata_card">
					<view class="teamdata_box">
						<u-image width="630" height="225" src="@/static/images/team/team_card.png" alt="" />
						<view class="teamdata_num">
							<view class="search_investasi">
								<view class="number_row">
									<view class="number_title">Total Investasi Tim</view>
									<view class="number_text">
										<text class="num">Rp</text>
										{{formatNumber(myTeamInfo.teamTotalIncome)}}
									</view>
								</view>
							</view>
							<view class="search_number mt-[20rpx]">
								<view class="number_row">
									<view class="number_title">Total Investasi Tim</view>
									<view class="number_text">
										<text class="num">Rp</text>
										{{formatNumber(myTeamInfo.teamTotalIncome)}}
									</view>
								</view>
								<view class="number_row">
									<view class="number_title">Total Anggota Tim</view>
									<view class="number_text">{{formatNumber(myTeamInfo.teamSize)}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="teamdata_input">
						<u-image class="search" width="30" height="30" src="@/static/images/team/search.png" alt="" />
						<u-input type="text" v-model="mobile" @confirm="search" :border="false"
							placeholder-style="color: #8B9098;font-size:20rpx;" placeholder="Masukan nomor HP" />
					</view>
					<view class="team_chart mt-[20rpx]">
						<view class="chart_head">Distribusi Tim</view>
						<Chart ref="teamRef"></Chart>
					</view>
				</view>
			</view>
			<Popup :show="extendShow" :code="userInfo.invite_code" :link="userInfo.invite_link" @copy="extendCopy"
				@cancel="extendShow = false">
			</Popup>
			<toastPopup></toastPopup>
			<Search :show="searchShow" :searchInfo="searchInfo" @cancel="searchCancel"></Search>
			<tabbar />
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { formatNumber, formatProgress } from '@/utils/util'
	import { teamRank, teamInfo, teamUserInfo } from '@/api/team'
	import { ref, computed, reactive } from 'vue'
	import { useUserStore } from '@/stores/user'
	import { onShow, onPageScroll } from '@dcloudio/uni-app'
	import { emitter } from '@/utils/emitter';
	import Popup from './components/popup.vue'
	import Chart from './components/chart.vue'
	import Search from './components/search.vue'
	import { useRouter } from "uniapp-router-next";
	const scrollTop = ref<number>(0)
	const router = useRouter()
	const searchShow = ref<Boolean>(false)
	const extendShow = ref<Boolean>(false)
	const mobile = ref<String>('')
	const userStore = useUserStore()
	const seriesArr = ref<Array<any>>([])
	const levelArr = ref<Array<any>>([])
	const rankArr = ref<Array<any>>([]) //团队用户排名
	const myTeamInfo = ref<any>({})
	const searchInfo = ref<any>({})
	const teamRef = ref<any>(null)
	const userInfo = computed(() => userStore.userInfo)
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const copy = (text : string) => {
		uni.setClipboardData({
			showToast: false,
			data: String(text),
			success: function () {
				toast('Isinya disalin')
			}
		})
	}
	const extendCopy = (link : any) => {
		copy(link)
		extendShow.value = false
	}
	const teamRule = () => {
		router.navigateTo('/pages/team_rule/team_rule')
	}
	//团队用户排名
	const getRank = async () => {
		rankArr.value = await teamRank()
	}
	//团队详情
	const getInfo = async () => {
		const data = await teamInfo()
		myTeamInfo.value = data;
		levelArr.value = data.teamLeaderClassification.map((item : any) => item.identity)
		seriesArr.value = data.teamLeaderClassification.map((item : any) => Number(item.num))
		if (teamRef.value && levelArr.value.length && seriesArr.value.length) {
			teamRef.value.chartInit(levelArr.value, seriesArr.value)
		}
	}
	const getUserInfo = async (mobile : String) => {
		const resData = await teamUserInfo({ mobile: mobile })
		if (resData.code == 1) {
			searchInfo.value = resData.data
			searchShow.value = true;
		} else {
			toast(resData.msg)
		}
	}
	const extendFun = () => {
		router.navigateTo('/pages/invite/invite')
	}
	const Login = () => {
		router.navigateTo('/pages/login/login')
	}
	const search = () => {
		getUserInfo(mobile.value)
	}
	const searchCancel = () => {
		mobile.value = ''
		searchShow.value = false;
	}
	const refreshCode = () => {
		// userStore.getUser()
		// extendShow.value = true
		extendFun()
	}
	onShow(() => {
		userStore.getUser()
		getRank()
		getInfo()
	})
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>
<style lang="scss">
	page {
		background: #F1F1F1 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.team {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.slot-wrap {
				padding-right: 30rpx;
			}

			.team_con {
				.team_card {
					position: relative;
					margin-bottom: 20rpx;

					.team_user {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						padding: 30rpx 40rpx;

						.user_box {
							display: flex;
							justify-content: space-between;

							.user_info {
								.user_info_title {
									display: flex;
									justify-content: flex-start;
									align-items: center;

									.nickname {
										font-family: Arial;
										font-weight: 700;
										font-size: 32rpx;
										line-height: 48rpx;
										color: #275534;
									}

									.normal {
										margin-left: 10rpx;
										font-family: Arial;
										font-weight: 400;
										font-size: 32rpx;
										line-height: 48rpx;
										color: #D79D2A;
									}
								}

								.user_info_text {
									font-family: Arial;
									font-weight: 400;
									font-size: 18rpx;
									line-height: 48rpx;
									color: #275534;
								}
							}

							.code_box {
								display: flex;
								justify-content: center;
								align-items: center;
								width: 82rpx;
								height: 82rpx;
								background: #EDF5FF;
								border-radius: 8rpx;
							}
						}
						.team_card_line{
							margin-top: 20rpx;
							margin-bottom: 20rpx;
							height: 2rpx;
							background: #FFFFFF;
						}
						.team_upgrade{
							.upgrade {
								display: flex;
								justify-content: space-between;
								align-items: center;
								.upgrade_text{
									font-family: Arial;
									font-weight: 400;
									font-size: 18rpx;
									line-height: 40rpx;
									color: #275534;
								}
								.upgrade_tip{
									font-family: Arial;
									font-weight: 400;
									font-size: 14rpx;
									line-height: 40rpx;
									color: #275534;
								}
							}
						}
					}
				}

				.rankie_card {
					border-radius: 12rpx;
					background: #FFFFFF;

					.rankie_head {
						padding: 20rpx 30rpx;
						font-family: Arial;
						font-weight: 700;
						font-size: 32rpx;
						line-height: 48rpx;
						text-align: left;
						color: #FFFFFF;
						border-top-left-radius: 12rpx;
						border-top-right-radius: 12rpx;
						background: linear-gradient(303.05deg, #92BEAB 10.45%, #26815A 89.55%);
					}

					.rankie_table {
						padding: 20rpx 30rpx;

						.rankie_tr {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							padding: 10rpx 20rpx;
							border-bottom: 2rpx solid rgba(160, 163, 169, 0.2);

							.rankie_image {
								position: relative;

								.avatar {
									position: absolute;
									top: 50%;
									left: 50%;
									transform: translate(-50%, -38%);
								}

							}

							.rankie_info {
								margin-left: 40rpx;

								.rankie_name {
									font-family: Arial;
									font-size: 24rpx;
									font-weight: 400;
									line-height: 48rpx;
									text-align: left;
									color: #1E1E1E;
								}

								.rankie_num {
									font-family: Arial;
									font-size: 30rpx;
									font-weight: 400;
									line-height: 48rpx;
									text-align: left;
									color: #D79D2A;
								}
							}
						}

						.rankie_tr:last-child {
							border-bottom: 0;
						}
					}
				}

				.teamdata_head {
					padding: 20rpx;
					font-family: Arial;
					font-size: 32rpx;
					font-weight: 700;
					line-height: 54rpx;
					text-align: left;
					color: #275534;
				}

				.teamdata_card {
					padding: 30rpx;
					border-radius: 12rpx;
					background: #FFFFFF;

					.teamdata_box {
						position: relative;

						.teamdata_num {
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							padding: 20rpx 30rpx;

							.search_investasi {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.number_row {
									.number_title {
										font-family: Arial;
										font-size: 20rpx;
										font-weight: 500;
										line-height: 40rpx;
										text-align: left;
										color: #8B9098;
									}

									.number_text {
										font-family: Arial;
										font-size: 20rpx;
										font-weight: 500;
										line-height: 40rpx;
										text-align: left;
										color: #1E1E1E;

										.num {
											font-family: Arial;
											font-size: 20rpx;
											font-weight: 500;
											line-height: 40rpx;
											text-align: left;
											color: #333333;
										}
									}
								}
							}

							.search_number {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.number_row {
									.number_title {
										font-family: Arial;
										font-size: 20rpx;
										font-weight: 500;
										line-height: 40rpx;
										text-align: left;
										color: #8B9098;
									}

									.number_text {
										font-family: Arial;
										font-size: 20rpx;
										font-weight: 500;
										line-height: 40rpx;
										text-align: left;
										color: #1E1E1E;

										.num {
											font-family: Arial;
											font-size: 20rpx;
											font-weight: 500;
											line-height: 40rpx;
											text-align: left;
											color: #333333;
										}
									}
								}
							}
						}

					}

					.teamdata_input {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin: 20rpx 0;
						padding: 0 20rpx;
						border-radius: 10rpx;
						background: #F7F8FA;

						.search {
							margin-right: 10rpx;
						}
					}

					.team_chart {
						padding-top: 20rpx;
						background: #FFFFFF;

						.chart_head {
							font-family: Arial;
							font-size: 32rpx;
							font-weight: 700;
							line-height: 48rpx;
							text-align: left;
							color: #275534;
						}
					}
				}
			}
		}
	}
</style>
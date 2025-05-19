<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="498" src="@/static/images/pageStyle/imageGroupFour.png"></u-image>
		</view>
		<view class="team">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="false" :is-fixed="false" :border-bottom="false" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" title-color="#1E1E1E">
					<view class="slot-wrap">
						<u-image @click="extendFun" width="60" height="60" src="@/static/images/team/extend.png" alt="" />
						<view class="title">TIM</view>
						<view class="rules" @tap="teamRule">Peraturan Tim</view>
					</view>
				</u-navbar>
			</u-sticky>
			<view class="team_con px-[40rpx] pt-[20rpx] pb-[120rpx]">
				<view class="team_card">
					<view class="team_user">
						<view class="user_box">
							<u-avatar v-if="userInfo.avatar" :src="userInfo.avatar" shape="square"
								:size="120"></u-avatar>
							<u-avatar v-else src="/static/images/user/default_avatar.png" :size="120"></u-avatar>
							<view class="user_info">
								<view class="nickname" v-if="userInfo.nickname">{{ userInfo.nickname }}</view>
								<view class="notLogin" @tap="Login" v-else>
									<text>Masuk</text>
									<u-icon class="ml-[10rpx]" name="arrow-right" color="#1E1E1E" size="28"></u-icon>
								</view>
								<view class="group" v-if="userInfo.identity">
									<u-image width="208" height="64" src="@/static/images/user/group.png" alt="" />
									<view class="level">Level {{userInfo.identity}}</view>
								</view>
								<view class="normal" v-else>Pengguna Biasa</view>
							</view>
						</view>
						<view class="code_box" @tap="refreshCode">
							<u-image width="62" height="62" src="@/static/images/team/code.png" alt="" />
						</view>
					</view>
					<view class="upgrade">Undang dan Tingkatkan</view>
					<u-line-progress height="6" :show-percent="false" round :percent="formatProgress(myTeamInfo.directSubordinate,myTeamInfo.upgrade)" active-color="#0067E0"
						inactive-color="#DADADA"></u-line-progress>
					<view class="people" v-if="myTeamInfo.directSubordinate >= myTeamInfo.upgrade &&  userInfo.identity >= 5">
						<text class="people_num">Pemimpin tim teratas</text>		
					</view>	
					<view class="people" v-else>
						<text class="people_num">{{formatNumber(myTeamInfo.directSubordinate)}} Orang</text>
						<text> / {{formatNumber(myTeamInfo.upgrade)}} Orang</text>
					</view>
					<view class="hot_card">
						<view class="hot_head">
							<view class="hot_num">{{formatNumber(myTeamInfo.ratio)}}%</view>
							<view class="hot_effect">
								<u-image width="30" height="30" src="@/static/images/team/hot.png" alt="" />
								<view class="effect">Sistem pembakaran berlaku</view>
							</view>
						</view>
						<view class="hot_foot mt-[20rpx]">
							<view class="foot_title">Rasio Pembagian Keuntungan</view>
						</view>
					</view>
				</view>


				<view class="rankie_card mt-[20rpx]">
					<view class="trade_card pb-[30rpx]">
						<view class="card">
							<view class="card_num">
								<text class="num">Rp</text>
								{{formatNumber(myTeamInfo.totalInvestment)}}
							</view>
							<view class="card_text">
								Jumlah InvestasiKu
							</view>
						</view>
						<view class="card">
							<view class="card_team">
								<text class="num">Rp</text>
								{{formatNumber(myTeamInfo.teamTotalInvestment)}}
							</view>
							<view class="team_text">
								Jumlah Investasi Tim
							</view>
						</view>
					</view>
					<view class="rankie_head">Peringkat Tim</view>
					<view class="rankie_table">
						<view class="rankie_th">
							<view class="rankie_td num">Peringkat</view>
							<view class="rankie_td name">Nama Pengguna</view>
							<view class="rankie_td amount">Jumlah Investasi</view>
						</view>
						<view class="rankie_tr" v-for="(item,index) in rankArr" :key="index">
							<view class="rankie_image">
								<u-image width="70" height="55" v-if="index == 0" src="@/static/images/team/first.png"
									alt="" />
								<u-image width="70" height="55" v-else-if="index == 1"
									src="@/static/images/team/second.png" alt="" />
								<u-image width="70" height="55" v-else-if="index == 2"
									src="@/static/images/team/third.png" alt="" />
							</view>
							<view class="rankie_name">{{item.userName}}</view>
							<view class="rankie_num">Rp {{formatNumber(item.totalInvestmentAmount)}}</view>
						</view>
						<view class="empty mt-[50rpx]" v-if="!rankArr.length">
							<u-empty text="Tidak ada catatan" mode="list" icon-color="#999999" color="#999999"></u-empty>
						</view>
					</view>
				</view>
				<view class="teamdata_card mt-[20rpx]">
					<view class="teamdata_head">Detail Tim</view>
					<view class="teamdata_input">
						<u-image class="search" width="34" height="34" src="@/static/images/team/search.png" alt="" />
						<u-input type="text" v-model="mobile" @confirm="search" :border="false"
							placeholder-style="color: #999999;font-size:28rpx;" placeholder="Masukan nomor HP" />
					</view>
					<view class="search_number mt-[20rpx]">
						<view class="number_row">
							<view class="number_title">Total Jumlah Tim</view>
							<view class="number_text">{{formatNumber(myTeamInfo.teamSize)}}</view>
						</view>
						<view class="number_row">
							<view class="number_title">Total Pendapatan Tim</view>
							<view class="number_text">
								<text class="num">Rp</text>
								{{formatNumber(myTeamInfo.teamTotalIncome)}}
							</view>
						</view>
					</view>
					<view class="team_chart mt-[20rpx]">
						<view class="chart_head">Distribusi Tim</view>
						<Chart ref="teamRef"></Chart>
					</view>
				</view>
			</view>
			<Popup :show="extendShow" :code="userInfo.invite_code" :link="userInfo.invite_link"  @copy="extendCopy" @cancel="extendShow = false">
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
		emitter.emit('toast',message)
	}
	const copy = (text: string) => {
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
		router.navigateTo('/pages/rules/rules?active=3')
	}
	//团队用户排名
	const getRank = async () => {
		rankArr.value = await teamRank()
	}
	//团队详情
	const getInfo = async () => {
		const data = await teamInfo()
		myTeamInfo.value = data;
		levelArr.value = data.teamLeaderClassification.map((item: any) => item.identity)
		seriesArr.value = data.teamLeaderClassification.map((item: any) => Number(item.num))
		if(teamRef.value && levelArr.value.length && seriesArr.value.length) {
			teamRef.value.chartInit(levelArr.value,seriesArr.value)
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
		background: #F6F6F6 !important;
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
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 0 30rpx;

				.title {
					width: 200rpx;
					font-family:  Arial;
					font-size: 36rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: right;
					color: #1E1E1E;
				}

				.rules {
					font-family:  Arial;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 48rpx;
					text-align: center;
					color: #1E1E1E;
				}
			}

			.team_con {
				.team_card {
					margin-bottom: 20rpx;
					padding: 30rpx;
					border-radius: 12rpx;
					background: #FFFFFF;

					.team_user {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 20rpx;

						.user_box {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.user_info {
								margin-left: 20rpx;

								.nickname {
									font-family:  Arial;
									font-size: 32rpx;
									font-weight: 700;
									line-height: 54rpx;
									text-align: left;
									color: #1E1E1E;
								}

								.notLogin {
									font-family:  Arial;
									font-size: 32rpx;
									font-weight: 700;
									line-height: 54rpx;
									text-align: left;
									color: #1E1E1E;
								}

								.normal {
									display: flex;
									justify-content: center;
									align-items: center;
									padding: 8rpx 18rpx;
									border-radius: 4rpx;
									background: #E7F1FF;
									font-family:  Arial;
									font-size: 26rpx;
									font-weight: 500;
									line-height: 40rpx;
									text-align: center;
									color: #88A1C2;
								}

								.group {
									position: relative;

									.level {
										display: flex;
										justify-content: center;
										align-items: center;
										position: absolute;
										top: 0;
										left: 0;
										width: 100%;
										height: 100%;
										padding-left: 32rpx;
										font-family:  Arial;
										font-size: 28rpx;
										font-weight: 700;
										line-height: 40rpx;
										color: #1E1E1E;
									}
								}
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

					.upgrade {
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #999999;
					}

					.people {
						font-family:  Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 35rpx;
						text-align: left;
						color: #93C2F9;

						.people_num {
							font-family:  Arial;
							font-size: 24rpx;
							font-weight: 500;
							line-height: 35rpx;
							text-align: left;
							color: #0067E0;
						}
					}

					.hot_card {
						margin-top: 40rpx;

						.hot_head {
							display: flex;
							justify-content: flex-start;
							align-items: center;

							.hot_num {
								margin-right: 20rpx;
								font-family:  Arial;
								font-size: 36rpx;
								font-weight: 700;
								line-height: 48rpx;
								text-align: left;
								color: #0067E0;
							}

							.hot_effect {
								display: flex;
								justify-content: flex-start;
								align-items: center;
								padding: 5rpx 10rpx;
								border-radius: 5rpx;
								background: #FFEFE5;

								.effect {
									font-family:  Arial;
									font-size: 24rpx;
									font-weight: 500;
									line-height: 35rpx;
									text-align: left;
									color: #FF8138;
								}
							}
						}

						.hot_foot {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.foot_title {
								font-family:  Arial;
								font-size: 26rpx;
								font-weight: 400;
								line-height: 40rpx;
								text-align: left;
								color: #1E1E1E;
							}

							.foot_remove {
								font-family:  Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 35rpx;
								text-align: right;
								color: #0067E0;
							}
						}
					}
				}

				.rankie_card {
					padding: 20rpx;
					border-radius: 12rpx;
					background: linear-gradient(180deg, #E8F2FF 0%, #FFFFFF 100%);

					.trade_card {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.card {
							.card_num {
								font-family:  Arial;
								font-size: 32rpx;
								font-weight: 700;
								line-height: 64rpx;
								text-align: left;
								color: #1E1E1E;
								.num{
									font-family:  Arial;
									font-size: 32rpx;
									font-weight: 700;
									line-height: 64rpx;
									text-align: left;
									color: #333333;
								}
							}

							.card_team {
								font-family:  Arial;
								font-size: 32rpx;
								font-weight: 700;
								line-height: 64rpx;
								text-align: right;
								color: #1E1E1E;
								.num{
									font-family:  Arial;
									font-size: 32rpx;
									font-weight: 700;
									line-height: 64rpx;
									text-align: right;
									color: #333333;
								}
							}

							.card_text {
								font-family:  Arial;
								font-size: 28rpx;
								font-weight: 500;
								line-height: 48rpx;
								text-align: left;
								color: #999999;
							}
							.team_text{
								font-family:  Arial;
								font-size: 28rpx;
								font-weight: 500;
								line-height: 48rpx;
								text-align: right;
								color: #999999;
							}
						}
					}

					.rankie_head {
						font-family:  Arial;
						font-size: 36rpx;
						font-weight: 500;
						line-height: 54rpx;
						text-align: left;
						color: #0067E0;
					}

					.rankie_table {
						margin-top: 20rpx;

						.rankie_th {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.rankie_td {
								font-family:  Arial;
								font-size: 26rpx;
								font-weight: 400;
								line-height: 40rpx;
								color: #999999;
							}

							.num {
								width: 120rpx;
								height: 40rpx;
								text-align: left;
							}

							.name {
								width: 220rpx;
								height: 40rpx;
								text-align: left;
							}
							.amount {
								width: 280rpx;
								height: 40rpx;
								text-align: right;
							}
						}

						.rankie_tr {
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 10rpx 0;
							.rankie_image{
								width: 120rpx;
								height: 55rpx;
							}
							.rankie_name {
								width: 220rpx;
								height: 48rpx;
								font-family:  Arial;
								font-size: 28rpx;
								font-weight: 500;
								line-height: 48rpx;
								text-align: left;
								color: #1E1E1E;
							}

							.rankie_num {
								width: 280rpx;
								height: 48rpx;
								font-family:  Arial;
								font-size: 28rpx;
								font-weight: 700;
								line-height: 48rpx;
								text-align: right;
								color: #0067E0;
							}
						}
					}
				}

				.teamdata_card {
					padding: 30rpx;
					border-radius: 12rpx;
					background: #FFFFFF;

					.teamdata_head {
						font-family:  Arial;
						font-size: 36rpx;
						font-weight: 500;
						line-height: 54rpx;
						text-align: left;
						color: #0067E0;
					}

					.teamdata_input {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin: 20rpx 0;
						padding: 0 20rpx;
						border-radius: 10rpx;
						background: #F6F6F6;

						.search {
							margin-right: 10rpx;
						}
					}

					.search_number {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.number_row {
							.number_title {
								font-family:  Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 48rpx;
								text-align: left;
								color: #999999;
							}

							.number_text {
								font-family:  Arial;
								font-size: 32rpx;
								font-weight: 700;
								line-height: 48rpx;
								text-align: left;
								color: #1E1E1E;
								.num{
									font-family:  Arial;
									font-size: 32rpx;
									font-weight: 700;
									line-height: 64rpx;
									text-align: left;
									color: #333333;
								}
							}
						}
					}

					.team_chart {
						padding-top: 20rpx;
						background: #FFFFFF;

						.chart_head {
							font-family:  Arial;
							font-size: 32rpx;
							font-weight: 400;
							line-height: 48rpx;
							text-align: left;
							color: #000000;
						}
					}
				}


			}
		}
	}
</style>
<template>
	<view class="container" :style="pageStyle">
		<view class="imageGroup">
			<u-image width="750" height="486" src="@/static/images/pageStyle/imageGroupSecond.png"></u-image>
		</view>
		<view class="index">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="false" :is-fixed="false" :border-bottom="false"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}">
					<view class="slot-wrap">
						<view class="header_left" :style="{color: scrollTop ? '#1E1E1E' : '#FFFFFF'}">RICE RICH</view>
						<view class="header_right" v-if="isLogin" @tap="navigateTo('/pages/user_data/user_data')">
							<u-avatar :src="userInfo.avatar" :size="60"></u-avatar>
							<view class="user_text" :style="{color: scrollTop ? '#1E1E1E' : '#FFFFFF'}">
								{{userInfo.nickname}}
							</view>
						</view>
						<view class="header_right" v-else @tap="navigateTo('/pages/login/login')">
							<u-image width="60" height="60" src="@/static/images/user/icon_user.png" alt="" />
							<view class="user_text" :style="{color: scrollTop ? '#1E1E1E' : '#FFFFFF'}">Masuk</view>
						</view>
					</view>
				</u-navbar>
			</u-sticky>
			<!-- 组件 -->
			<template v-for="item in state.pages" :key="item.name">
				<template v-if="item.name == 'nav'">
					<w-nav :content="item.content" :styles="item.styles" />
				</template>
				<!-- <template v-if="item.name == 'banner'">
					<w-banner :content="item.content" :styles="item.styles" :isLargeScreen="isLargeScreen"
						@change="handleBanner" />
				</template> -->
			</template>
			<InformasiAset :informa="incomeInfo"></InformasiAset>
			<Notice :notice="noticeArr"></Notice>
			<!-- <view class="live_broadcast mx-[40rpx] px-[20rpx] mb-[20rpx]">
				<u-image class="live_image" width="172" height="83" src="@/static/images/user/live_image.png" alt="" />
				<view class="live_card">
					<view class="live_info">
						<u-image width="40" height="40" src="@/static/images/user/broadcast.png" alt="" />
						<view class="stream">Gold mine is live streaming...</view>
					</view>
					<view class="broadcast">
						<view class="broadcast_info">
							<u-image width="50" height="50" src="@/static/images/user/live.png" alt="" />
						</view>
						<u-icon name="arrow-right" color="#FFFFFF" size="26"></u-icon>
					</view>
				</view>
			</view> -->
			<!-- 组件 -->
			<template v-for="item in state.pages" :key="item.name">
				<template v-if="item.name == 'middle-banner'">
					<w-middle-banner :content="item.content" :styles="item.styles" />
				</template>
			</template>
			<view class="article mx-[40rpx] px-[20rpx] pt-[20rpx] pb-[20rpx] mt-[20rpx] mb-[20rpx]">
				<view class="flex items-center article-title text-lg font-medium">
					SawahKu
				</view>
				<view class="sign_card mt-[20rpx]">
					<view class="sign_info">
						<view class="sign_icon">
							<u-image width="50" height="50" src="@/static/images/user/dailySign.png" alt="" />
						</view>
						<view class="sign_point">
							<view class="sign_head">
								<view class="sign_title">Masuk harian</view>
								<view class="sign_points" v-if="signStatus">
									<u-image width="28" height="28" src="@/static/images/user/point_fill.png" alt="" />
									<view class="points_num">+ {{formatNumber(integral)}}</view>
								</view>
							</view>
							<view class="sign_text">Masuk untuk mendapatkan poin</view>
						</view>
					</view>
					<view class="sign_btn" v-if="!signStatus" @tap="signSubmit">Masuk</view>
					<view class="Signed_btn" v-else>Masuk</view>
				</view>
			</view>

			<Swiper ref="swiperRef"></Swiper>
			<Program :list="programArr"></Program>
			<!-- contact -->
			<view class="contact" @tap="contactService">
				<u-image width="115" height="108" src="@/static/images/icon/contact.png" alt="" />
			</view>
			<!-- 返回顶部按钮 -->
			<u-back-top :scroll-top="scrollTop" :top="100" :customStyle="{
			        backgroundColor: '#FFF',
			        color: '#000',
			        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)'
			    }">
			</u-back-top>

			<!--  #ifdef MP  -->
			<!--  微信小程序隐私弹窗  -->
			<MpPrivacyPopup></MpPrivacyPopup>
			<!--  #endif  -->
			<toastPopup></toastPopup>
			<!-- <prizePopup  v-if="prizeShow" @confirm="navigateAuth('/pages/raffle/raffle')" @cancel="prizeShow = false"></prizePopup> -->
			<prizePopup  v-if="prizeShow" @confirm="navigateAuth('/pages/newsCement/newsCement')" @cancel="prizeShow = false"></prizePopup>
			<releasePopup :releaseInfo="releaseInfo" v-if="releaseShow" @confirm="releaseCancel"></releasePopup>
			<SignPopup :integral="integral" v-if="signShow" @confirm="signCancel"></SignPopup>
			<Popup v-if="contactShow" :service="serviceInfo" @confirm="contactConfirm" @cancel="contactShow = false"></Popup>
			<!-- #ifdef H5 -->
			<downloadPopup ref="downloadRef"></downloadPopup>
			<!-- #endif -->
			<tabbar />
		</view>
	</view>
</template>

<script setup lang="ts">
	import { myIncomeInfo, downloadAccess } from '@/api/user'
	import { getIndex } from '@/api/shop'
	import { pointsInvestment } from '@/api/raffle'
	import { signList, signIn, editTermination, listTermination } from '@/api/team'
	import { onLoad, onShow, onPageScroll, onReady } from "@dcloudio/uni-app";
	import { computed, reactive, ref, nextTick } from 'vue'
	import { mesNotifiList, customerServiceInfo } from '@/api/eventInfo'
	import { useAppStore } from '@/stores/app'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import { emitter } from '@/utils/emitter';
	import { formatNumber, getNowFormatDate } from '@/utils/util'
	import Popup from './component/popup.vue'
	import releasePopup from './component/releasePopup.vue'
	import Swiper from './component/swiper.vue'
	import InformasiAset from './component/informasiAset.vue'
	import SignPopup from './component/signPopup.vue'
	import Notice from './component/notice.vue'
	import Program from './component/program.vue'
	import downloadPopup from './component/downloadPopup.vue'
	import prizePopup from './component/prizePopup.vue'
	// #ifdef MP
	import MpPrivacyPopup from './component/mp-privacy-popup.vue'
	// #endif
	const userStore = useUserStore()
	const { userInfo, isLogin } = storeToRefs(userStore)
	const appStore = useAppStore()
	const state = reactive<{
		pages : any[]
		meta : any[]
		article : any[]
		bannerImage : string
	}>({
		pages: [],
		meta: [],
		article: [],
		bannerImage: ''
	})
	const swiperRef = ref<any>(null)
	const downloadRef = ref<any>(null)
	const serviceInfo = ref<any>({})
	const integral = ref<Number | String>(0)
	const signShow = ref<Boolean>(false)
	const prizeShow = ref<Boolean>(false)
	const releaseShow = ref<Boolean>(false)
	const signStatus = ref<Boolean>(false)
	const scrollTop = ref<number>(0)
	const percent = ref<number>(0)
	const incomeInfo = ref<any>({})
	const releaseInfo = ref<any>({})
	const contactShow = ref<Boolean>(false)
	const nameScroll = ref<Boolean>(true)
	const noticeArr = ref<Array<any>>([])
	const programArr = ref<Array<any>>([])
	// 是否联动背景图
	const isLinkage = computed(() => {
		return state.pages.find((item : any) => item.name === 'banner')?.content.bg_style === 1
	})
	// 是否大屏banner
	const isLargeScreen = computed(() => {
		return state.pages.find((item : any) => item.name === 'banner')?.content.style === 2
	})
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const navigateAuth = (url: string) => {
		isLogin.value ? navigateTo(url) : navigateTo('/pages/login/login')
	}
	const getNotice = async () => {
		const data = await mesNotifiList({ type: 4 })
		noticeArr.value = data.lists.map((item : any) => item.content)
	}
	const signSubmit = async () => {
		const resData = await signIn()
		if (resData.code == 1) {
			integral.value = resData.data.integral
			signShow.value = true
		} else {
			toast(resData.msg)
		}
	}
	const signCancel = () => {
		getSignInfo()
		getIncomeInfo()
		swiperRef.value.getContractList()
		signShow.value = false
	}
	const getSignInfo = async () => {
		const date = getNowFormatDate()
		const data = await signList({ createDate: date })
		signStatus.value = !data.count ? false : true //判断当前日期是否已签到 
		integral.value = data.count > 0 ? data.lists[0].integral : 0
	}
	const contactConfirm = (link : string) => {
		contactShow.value = false
		// #ifdef APP
		plus.runtime.openURL(link)
		// #endif
		// #ifdef H5
		window.location.href = link
		// #endif
	}
	const getInfo = async () => {
		const resdata = await customerServiceInfo()
		serviceInfo.value = resdata.data
	}
	const contactService = () => {
		getInfo()
		emitter.emit('gifType',{type: 1})
		setTimeout(()=>{
			contactShow.value = true
		},3000)
	}
	// 根页面样式
	const pageStyle = computed(() => {
		const { bg_type, bg_color, bg_image } = state.meta[0]?.content ?? {}
		if (!isLinkage.value) {
			return bg_type == 1 ?
				{ 'background-color': bg_color } :
				{ 'background-image': `url(${bg_image})` }
		}
		else return { 'background-image': `url(${state.bannerImage})` }
	})

	const handleBanner = (url : string) => {
		state.bannerImage = url
	}

	const getData = async () => {
		const data = await getIndex()
		state.pages = JSON.parse(data?.page?.data)
		state.meta = JSON.parse(data?.page?.meta)
		state.article = data.article
		uni.setNavigationBarTitle({
			title: state.meta[0].content.title
		})
	}
	const getIncomeInfo = async () => {
		const resdata = await myIncomeInfo()
		if (resdata.code == 1) {
			incomeInfo.value = resdata.data
		} else {
			toast(resdata.msg)
		}
	}
	const getTermination = async () => {
		const resData = await listTermination()
		releaseShow.value = !resData.count ? false : true //判断当前日期是否已签到
		releaseInfo.value = resData.lists[0]
	}
	const releaseCancel = async (id : any) => {
		await editTermination({ id: id })
		releaseShow.value = false
	}
	const getInvestment = async () => {
		const data = await pointsInvestment()
		programArr.value = data.rows
	}
	const getAccess = async () => {
		const resdata = await downloadAccess()
		if (resdata.show != 1) {
			// downloadRef.value.openPopup()
			prizeShow.value = true
		}
	}
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
		const top = uni.upx2px(100)
		percent.value = event.scrollTop / top > 1 ? 1 : event.scrollTop / top
	})
	onLoad(() => {
		getData()
	})
	onShow(() => {
		userStore.getUser()
		getNotice()
		getSignInfo()
		getInvestment()
		getIncomeInfo()
		getTermination()
		// #ifdef H5
		nextTick(() => {
			getAccess()
		})
		// #endif
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
		background-repeat: no-repeat;
		background-size: 100% auto;
		width: 100%;
		transition: all 1s;
		min-height: calc(100vh - env(safe-area-inset-bottom));

		.index {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.slot-wrap {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 0 40rpx;

				.header_left {
					font-family: Arial;
					font-size: 36rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: left;
				}

				.header_right {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.user_text {
						margin-left: 20rpx;
						font-family: Arial;
						font-size: 28rpx;
						font-weight: 600;
						line-height: 48rpx;
						text-align: right;
					}
				}
			}

			.article {
				border-radius: 20rpx;
				background: #FFFFFF;

				.article-title {
					color: #333333;
					font-family: Arial;
					font-weight: 700;
					font-size: 32rpx;

					&::before {
						content: '';
						width: 6rpx;
						height: 30rpx;
						display: block;
						margin-right: 10rpx;
						background: #0067E0;
					}
				}

				.sign_card {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx;
					border-radius: 18rpx;
					background: linear-gradient(90deg, #EE582A 0%, #FF8953 100%);

					.sign_info {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.sign_icon {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 78rpx;
							height: 78rpx;
							background: #FFDFCD;
							border-radius: 12rpx;
						}

						.sign_point {
							margin-left: 20rpx;

							.sign_head {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.sign_title {
									font-family: Arial;
									font-size: 26rpx;
									font-weight: 500;
									line-height: 40rpx;
									text-align: left;
									color: #FFFFFF;
								}

								.sign_points {
									display: flex;
									justify-content: space-between;
									align-items: center;

									.points_num {
										font-family: Arial;
										font-size: 24rpx;
										font-weight: 500;
										line-height: 26rpx;
										text-align: left;
										color: #FFFFFF;
									}
								}
							}

							.sign_text {
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: left;
								color: #FFD8CA;
							}
						}
					}

					.sign_btn {
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 12rpx 30rpx;
						border-radius: 12rpx;
						background: #FFFFFF;
						font-family: Arial;
						font-size: 26rpx;
						font-weight: 700;
						line-height: 40rpx;
						text-align: center;
						color: #FF5D00;
					}

					.Signed_btn {
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 12rpx 30rpx;
						border-radius: 12rpx;
						background: #FFFFFF;
						font-family: Arial;
						font-size: 26rpx;
						font-weight: 700;
						line-height: 40rpx;
						text-align: center;
						color: #C9C9C9;
					}
				}
			}

			.live_broadcast {
				position: relative;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				background: linear-gradient(90deg, #FF362A 0%, #FE4F3D 100%);
				border-radius: 10rpx;

				.live_image {
					margin-right: 50rpx;
				}

				.live_card {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					padding: 20rpx 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.live_info {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						.stream {
							width: 480rpx;
							height: 40rpx;
							margin-left: 20rpx;
							font-family: Arial;
							font-size: 24rpx;
							font-weight: 900;
							line-height: 40rpx;
							text-align: left;
							color: #FFFFFF;
							overflow: hidden;
							/* 隐藏超出部分 */
							white-space: nowrap;
							text-overflow: ellipsis;
							/* 超出部分显示省略号 */
						}
					}

					.broadcast {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						.broadcast_info {
							margin-right: 5rpx;
						}
					}
				}
			}

			.contact {
				position: fixed;
				top: 58%;
				right: 0;
				z-index: 100;
			}
		}
	}
</style>
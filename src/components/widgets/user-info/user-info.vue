<template>
	<view class="user-info">
		<u-sticky h5-nav-height="0" bg-color="transparent">
			<u-navbar :is-back="false" :is-fixed="false" :custom-title="metaData.title_type == 2" :border-bottom="false"
				:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
				title-color="#1E1E1E">
				<view class="slot-wrap" :style="{ justifyContent: isLogin?'space-between':'center'}">
					<u-image v-if="isLogin" @tap="refreshCode" width="60" height="60"
						src="@/static/images/user/extend_icon.png" alt="" />
					<view class="title">
						AKUN
					</view>
					<u-image @tap="navigateAuth('/pages/message/message')" v-if="isLogin && !badge" width="60" height="60" src="@/static/images/user/message_icon.png" alt="" />
					<u-image @tap="navigateAuth('/pages/message/message')" v-if="isLogin && badge" width="60" height="60" src="@/static/images/user/message.png" alt="" />
				</view>
			</u-navbar>
		</u-sticky>
		<view class="flex items-center justify-between px-[40rpx] pb-[40rpx] pt-[40rpx]">
			<view v-if="isLogin" class="flex items-center" @click="navigateAuth('/pages/user_data/user_data')">
				<u-avatar :src="user.avatar" :size="120"></u-avatar>
				<view class="text-white ml-[20rpx]">
					<view class="text-2xl userInfo">
						<view class="nickname">{{ user.nickname }}</view>
						<u-image v-if="isLogin" width="40" height="40" src="@/static/images/user/user_data.png"
							alt="" />
					</view>
					<view class="text-xs mt-[18rpx] account" @click.stop="copy(user.account)">
						Akun ID：{{ user.account }}
					</view>
				</view>
			</view>
			<navigator v-else class="flex items-center" hover-class="none" url="/pages/login/login">
				<u-avatar src="/static/images/user/default_avatar.png" :size="120"></u-avatar>
				<view class="text-white ml-[20rpx]">
					<view class="text-2xl notLogin">
						<text>Masuk</text>
						<u-icon class="ml-[20rpx]" name="arrow-right" color="#0067E0" size="28"></u-icon>
					</view>
					<view class="text-xs mt-[18rpx] account">Belum login.</view>
				</view>
			</navigator>
			<navigator v-if="isLogin" class="group" hover-class="none"
				url="/pages/user_data/user_data">
				<u-image width="208" height="64" src="@/static/images/user/group.png" alt="" />
				<view class="level" v-if="user.identity">Level {{user.identity}}</view>
				<view class="normal" v-else>Biasa</view>
			</navigator>
		</view>
		<view class="pointCard mx-[40rpx] mb-[20rpx]">
			<view class="pointHead">
				<u-image width="48" height="48" src="@/static/images/user/point.png" alt="" />
				<view class="point_title">Saldo</view>
				<view class="eyeChange" @tap="eyeChange">
					<u-image width="42"  v-if="eyeShow" height="42" src="@/static/images/user/hidden.png" alt="" />
					<u-image width="42" v-else height="42" src="@/static/images/user/reveal.png" alt="" />
				</view>
			</view>
			<view class="point_num">
				<view class="num">Rp {{!eyeShow ? formatNumber(user.user_money) || 0 : '*****' }}</view>
				<view class="btn" @tap="navigateAuth('/pages/withdrawal/withdrawal')">Penarikan</view>
			</view>
			<view class="point_con">
				<view class="point_label">
					<view class="label_title">Poin</view>
					<view class="label_num">{{!eyeShow ? formatNumber(user.user_integral) || 0 : '***' }}</view>
					<view class="label_btn" @tap="navigateAuth('/pages/points/points')">Tukar</view>
				</view>
				<view class="point_label">
					<view class="label_title">
						<text>Token</text>
						<view class="buy" @tap="navigateTo('/pages/customer_service/customer_service')">
							<u-image width="26" height="26" src="@/static/images/user/buy.png" alt="" />
							<text>BELI</text>
						</view>
					</view>
					<view class="label_num">{{!eyeShow ? formatNumber(user.user_token) || 0 : '***' }}</view>
					<view class="label_btn" @tap="navigateAuth('/pages/exchange/exchange')">Tukar</view>
				</view>
				<view class="point_label">
					<view class="label_title">Ukuran Tim</view>
					<view class="label_num">{{!eyeShow ? formatNumber(user.team_size) || 0 : '***' }}</view>
					<view class="label_invite" @click="navigateAuth('/pages/invite/invite')">
						<u-image width="34" height="34" src="@/static/images/user/invite.png" alt="" />
						<text>Undang</text>
					</view>
				</view>
			</view>
		</view>
		<view class="accountCard px-[40rpx] mt-[20rpx] mb-[20rpx]">
			<view class="card" @tap="navigateAuth('/pages/recharge/recharge')">
				<view class="card_text">Deposit Akun</view>
				<view class="card_foot">
					<view class="card_btn">
						<text>Deposit</text>
						<u-icon name="arrow-right" color="#FFFFFF" size="24"></u-icon>
					</view>
					<u-image width="76" height="37" src="@/static/images/user/recharge.png" alt="" />
				</view>
			</view>
			<view class="card" @tap="navigateAuth('/pages/trade/trade')">
				<view class="card_text">Transaksi Akun</view>
				<view class="card_foot">
					<view class="card_btn">
						<text>Transaksi</text>
						<u-icon name="arrow-right" color="#FFFFFF" size="24"></u-icon>
					</view>
					<u-image width="66" height="45" src="@/static/images/user/transactions.png" alt="" />
				</view>
			</view>
		</view>
		<Popup :show="extendShow" :code="uQrcode" :link="uQrlink"  @copy="extendCopy" @cancel="extendShow = false"></Popup>
		<toastPopup></toastPopup>
	</view>
</template>
<script lang="ts" setup>
	import { computed, ref } from "vue";
	import { formatNumber } from '@/utils/util'
	import Popup from './popup.vue'
	import { emitter } from '@/utils/emitter';
	import { mesNotifiConf } from '@/api/eventInfo';
	const props = defineProps({
		pageMeta: {
			type: Object,
			default: () => []
		},
		content: {
			type: Object,
			default: () => ({})
		},
		styles: {
			type: Object,
			default: () => ({})
		},
		user: {
			type: Object,
			default: () => ({})
		},
		isLogin: {
			type: Boolean
		},
		scrollTop: {
			type: Number,
			default: 0
		},
		navColor: {
			type: String,
			default: "#000000"
		}
	})
	const badge = ref<Boolean>(false)
	const eyeShow = ref<Boolean>(true)
	const uQrcode = ref<String>('')
	const uQrlink = ref<String>('')
	const extendShow = ref<Boolean>(false)
	const metaData : any = computed(() => {
		return props.pageMeta[0].content
	})
	const eyeChange = () => {
		eyeShow.value = !eyeShow.value
	}
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
	const refreshCode = (code : string,link: string) => {
		// uQrcode.value = code
		// uQrlink.value = link
		// extendShow.value = true
		navigateTo('/pages/invite/invite')
	}
	const navigateAuth = (url: string) => {
		props.isLogin ? navigateTo(url) : navigateTo('/pages/login/login')
	}
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const getlist = async () => {
		const data = await mesNotifiConf()
		let number = data.lists.reduce((sum: number, e: { number: any }) => sum + Number(e.number || 0), 0)
		badge.value = number ? true : false
	}
	getlist()
</script>

<style lang="scss" scoped>

		.user-info {

			.slot-wrap {
				display: flex;
				align-items: center;
				width: 100%;
				padding: 0 30rpx;

				.title {
					font-family:  Arial;
					font-size: 36rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: center;
					color: #1E1E1E;
				}
			}

			.userInfo {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.nickname {
					margin-right: 5rpx;
					font-family:  Arial;
					font-size: 32rpx;
					font-weight: 700;
					text-align: left;
					color: #1E1E1E;
				}
			}


			.account {
				font-family:  Arial;
				font-size: 24rpx;
				font-weight: 500;
				text-align: left;
				color: #999999;
			}

			.notLogin {
				font-family:  Arial;
				font-size: 34rpx;
				font-weight: 700;
				text-align: left;
				color: #0067E0;
			}

			.group {
				position: relative;
				top: 0;
				left: 40rpx;

				.level {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					padding: 0 15rpx;
					font-family:  Arial;
					font-size: 28rpx;
					font-weight: 700;
					line-height: 40rpx;
					color: #1E1E1E;
				}
				.normal{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					padding: 0 20rpx;
					font-family:  Arial;
					font-size: 28rpx;
					font-weight: 700;
					line-height: 40rpx;
					color: #1E1E1E;
				}
			}
			.pointCard {
				padding: 40rpx;
				background: #FFFFFF;
				border-radius: 12rpx;

				.pointHead {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.point_title {
						margin-left: 10rpx;
						font-family:  Arial;
						font-size: 32rpx;
						font-weight: 700;
						line-height: 48rpx;
						color: #0067E0;
						text-align: left;
					}
					.eyeChange{
						margin-left: 20rpx;
					}
				}

				.point_num {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 0;

					.num {
						font-family:  Arial;
						font-size: 48rpx;
						font-weight: 600;
						line-height: 100rpx;
						text-align: left;
						color: #1E1E1E;
					}

					.btn {
						padding: 14rpx 18rpx;
						border-radius: 14rpx;
						background: linear-gradient(270deg, #5693FF 0%, #0067E0 100%);
						font-family:  Arial;
						font-size: 24rpx;
						font-weight: 500;
						text-align: left;
						color: #FFFFFF;
					}
				}

				.point_con {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.point_label {
						.label_title {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							font-family:  Arial;
							font-size: 26rpx;
							font-weight: 500;
							line-height: 36rpx;
							text-align: left;
							color: #999999;

							.buy {
								margin-left: 10rpx;
								display: flex;
								justify-content: flex-start;
								align-items: center;
								font-family:  Arial;
								font-size: 26rpx;
								font-weight: 500;
								line-height: 36rpx;
								text-align: left;
								color: #FF8138;
							}
						}

						.label_num {
							margin: 10rpx 0;
							font-family:  Arial;
							font-size: 32rpx;
							font-weight: 700;
							line-height: 48rpx;
							text-align: left;
							color: #1E1E1E;
						}

						.label_btn {
							display: inline-block;
							font-family:  Arial;
							font-size: 26rpx;
							font-weight: 700;
							text-align: center;
							color: #0067E0;
							padding: 10rpx 15rpx;
							border-radius: 14rpx;
							border: 2rpx solid #0067E0;
						}
						.label_invite{
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-family:  Arial;
							font-size: 26rpx;
							font-weight: 700;
							text-align: center;
							color: #FF4646;
							background: #FFEFEF;
							padding: 10rpx 15rpx;
							border-radius: 14rpx;
							border: 2rpx solid #FF4646;
						}
					}
				}
			}

			.accountCard {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.card {
					width: 325rpx;
					padding: 20rpx;
					background: #E4F0FF;
					border-radius: 12rpx;

					.card_text {
						font-family:  Arial;
						font-size: 26rpx;
						font-weight: 700;
						line-height: 40rpx;
						text-align: left;
						color: #1E1E1E;
					}

					.card_foot {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 10rpx 0;

						.card_btn {
							display: flex;
							justify-content: space-between;
							align-items: center;
							width: 142rpx;
							height: 50rpx;
							padding: 10rpx;
							border-radius: 8rpx;
							background: linear-gradient(270deg, #5693FF 0%, #0067E0 100%);
							font-family:  Arial;
							font-size: 24rpx;
							font-weight: 500;
							color: #FFFFFF;

						}
					}
				}
			}
		}
</style>
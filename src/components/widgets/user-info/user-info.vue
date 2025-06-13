<template>
	<view class="user-info">
		<u-sticky h5-nav-height="0" bg-color="transparent">
			<u-navbar :is-back="false" :is-fixed="false" :border-bottom="false" :title-bold="true"
				:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
				:title-color="scrollTop ? '#1E1E1E':'#FFFFFF'" title="AKUN">
				<template #right>
					<view class="slot-wrap" @tap="navigateTo('/pages/customer_service/customer_service')">
						<u-image v-if="!scrollTop" width="50" height="50" src="@/static/images/user/icon_service.png" alt="" />
						<u-image v-else width="50" height="50" src="@/static/images/icon/contact.png" alt="" />
					</view>
				</template>
			</u-navbar>
		</u-sticky>
		<view class="point_card mx-[30rpx] mt-[30rpx] mb-[30rpx]">
			<u-image width="690" height="360" src="@/static/images/user/mineGroup.png" alt="" />
			<view class="user_card">
				<view class="user_card_head">
					<view class="card_head_info">
						<view class="card_head_title">Saldo Poin</view>
						<view class="lock_box" @tap="eyeChange">
							<u-image v-if="!eyeShow" width="30" height="30" src="@/static/images/user/icon_see.png" alt="" />
							<u-image v-else width="30" height="30" src="@/static/images/user/icon_lock.png" alt="" />
						</view>
					</view>
					<view class="card_head_phone">ID:{{props.user.account}}</view>
				</view>
				<view class="user_card_info">
					<view class="user_card_poin">
                        <view>Poin {{!eyeShow ? formatNumber(props.user.user_integral) || 0 : '***' }}</view>
                        <u-image @tap="navigateAuth('/pages/earn_point/earn_point')" width="30" height="30" src="@/static/images/user/to.png" alt="" />
                    </view>
					<view class="user_card_saldo">Saldo Pengguna Rp {{!eyeShow ? formatNumber(props.user.user_money) || 0 : '***' }}</view>
				</view>
				<view class="user_card_line"></view>
				<view class="user_card_box">
					<view class="user_card_label" @tap="navigateAuth('/pages/points/points')">
						<u-image width="80" height="80" src="@/static/images/user/icon_card01.png" alt="" />
						<view class="card_label_text">Tukar Poin</view>
					</view>
					<view class="user_card_label" @tap="navigateAuth('/pages/recharge/recharge')">
						<u-image width="80" height="80" src="@/static/images/user/icon_card02.png" alt="" />
						<view class="card_label_text">Isi Ulang</view>
					</view>
					<view class="user_card_label" @tap="navigateAuth('/pages/withdrawal/withdrawal')">
						<u-image width="80" height="80" src="@/static/images/user/icon_card03.png" alt="" />
						<view class="card_label_text">Tarik Dana</view>
					</view>
					<view class="user_card_label" @tap="navigateAuth('/pages/trade/trade')">
						<u-image width="80" height="80" src="@/static/images/user/icon_card04.png" alt="" />
						<view class="card_label_text">Transfer Dana</view>
					</view>
				</view>
			</view>
		</view>
		<view class="article_card mx-[30rpx] mb-[30rpx]">
			<view class="article_head">Pemasukan dan Pengeluaran Bulan Ini</view>
			<view class="article_box">
				<view class="article_label">
					<view class="label_title">Pemasukan</view>
					<view class="label_num">Rp {{!eyeShow ? formatNumber(props.user.pointVaultIncome) || 0 : '***' }}</view>
				</view>
				<view class="article_line"></view>
				<view class="article_label">
					<view class="label_title">Tarik Dana</view>
					<view class="label_num" style="color: #0f0f0f">Rp {{!eyeShow ? formatNumber(props.user.totalPointVaultIncome) || 0 : '***' }}</view>
				</view>
			</view>
			<view class="card_line"></view>
			<view class="article_foot">
				<view class="foot_info">
					<view class="foot_title">Bantuan Tim (Belum Diambil)</view>
					<u-image @tap="show = true" width="24" height="24" src="@/static/images/user/help.png" alt="" />
				</view>
<!--                team_reserve_amount-->
				<view class="foot_num">Rp {{!eyeShow ? formatNumber(props.user.teamReserveAmount) || 0 : '***' }}</view>
			</view>
		</view>
		<BonusPopup v-if="show" @cancel="show = false"></BonusPopup>
		<toastPopup></toastPopup>
	</view>
</template>
<script lang="ts" setup>
	import { computed, ref } from "vue";
	import { formatNumber, formatProgress } from '@/utils/util'
	import { emitter } from '@/utils/emitter';
	import { mesNotifiConf } from '@/api/eventInfo';
    import BonusPopup from '@/components/toastPopup/BonusPopup.vue'
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
    // console.log(props.props.user.team_reserve_amount)

	const show = ref<boolean>(false)
	const badge = ref<Boolean>(false)
	const eyeShow = ref<Boolean>(true)
	const metaData : any = computed(() => {
		return props.pageMeta[0].content
	})
	const eyeChange = () => {
		eyeShow.value = !eyeShow.value
	}
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
	const navigateAuth = (url : string) => {
		props.isLogin ? navigateTo(url) : navigateTo('/pages/login/login')
	}
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const getlist = async () => {
		const data = await mesNotifiConf()
		let number = data.lists.reduce((sum : number, e : { number : any }) => sum + Number(e.number || 0), 0)
		badge.value = number ? true : false
	}
	getlist()
</script>

<style lang="scss" scoped>
	.user-info {

		.slot-wrap {
			padding-right: 30rpx;
		}

		.point_card {
			position: relative;

			.user_card {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				padding: 20rpx 0;

				.user_card_head {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 20rpx;

					.card_head_info {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.card_head_title {
							margin-right: 20rpx;
							font-family: Arial;
							font-weight: 400;
							font-size: 24rpx;
							line-height: 40rpx;
							text-align: center;
							color: #FFFFFF;
						}
					}

					.card_head_phone {
						font-family: Arial;
						font-weight: 400;
						font-size: 24rpx;
						line-height: 40rpx;
						text-align: right;
						color: #FFFFFF;
					}
				}

				.user_card_info {
					padding: 15rpx 20rpx;

					.user_card_poin {
						font-family: Arial;
						font-weight: 400;
						font-size: 32rpx;
						line-height: 54rpx;
						text-align: left;
						color: #FFFFFF;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
					}

					.user_card_saldo {
						font-family: Arial;
						font-weight: 400;
						font-size: 22rpx;
						line-height: 48rpx;
						text-align: left;
						color: #FFFFFF;
					}
				}

				.user_card_line {
					width: 690rpx;
					height: 10rpx;
					background: linear-gradient(270deg, rgba(246, 219, 144, 0) 0%, #FFEAAE 100%);
				}

				.user_card_box {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 40rpx;

					.user_card_label {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.card_label_text {
							font-family: Arial;
							font-weight: 400;
							font-size: 20rpx;
							line-height: 40rpx;
							text-align: center;
							color: #FFFFFF;
						}
					}
				}
			}
		}

		.article_card {
			padding: 10rpx 20rpx 20rpx 20rpx;
			border-radius: 12rpx;
			background: #FFFFFF;

			.article_head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 40rpx;
				font-family: Arial;
				font-weight: 700;
				font-size: 32rpx;
				line-height: 54rpx;
				color: #1E4B2E;
			}

			.article_box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.article_label {
					width: 300rpx;
					padding: 0 10rpx;

					.label_title {
						font-family: Arial;
						font-weight: 400;
						font-size: 24rpx;
						line-height: 40rpx;
						text-align: center;
						color: #8B9098;
					}

					.label_num {
						font-family: Arial;
						font-weight: 700;
						font-size: 30rpx;
						line-height: 40rpx;
						text-align: center;
						color: #D90C07;
					}
				}

				.article_line {
					width: 4rpx;
					height: 30rpx;
					background: #D7D7D7;
				}
			}
			.card_line {
				margin: 30rpx 20rpx;
				height: 2rpx;
				background: #D7D7D7;
			}

			.article_foot{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.foot_info{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.foot_title{
						margin-right: 20rpx;
						font-family: PingFang SC;
						font-weight: 500;
						font-size: 24rpx;
						line-height: 40rpx;
						color: #1E1E1E;
					}
				}
				.foot_num{
					margin-right: 60rpx;
					font-family: Arial;
					font-weight: 700;
					font-size: 24rpx;
					line-height: 40rpx;
					color: #1E1E1E;
				}
			}
		}
	}
</style>

<template>
	<view class="content mx-[40rpx] mt-[20rpx] mb-[20rpx] pt-[20rpx] pb-[20rpx]">
		<view class="swiper_head mb-[10rpx]">
			<u-image width="57" height="57" src="@/static/images/page/ellipse.png" />
			<view class="swiper_title">Pilihan Sawah</view>
		</view>
		<view class="scroll-box mx-[20rpx]">
			<scroll-view :scroll-x="true" :scroll-left="scrollLeft">
				<view class="tabs_content">
					<view class="tabs_label" :style="{color: item.id == active ? '#0067E0' : '#999999'}"
						v-for="(item,index) in list" :key="index">
						<view class="tabs_name">
							{{item.title}}
						</view>
					</view>
					<view class="active" :style="{left: active * 150 + 'rpx'}">
					</view>
				</view>
			</scroll-view>
		</view>
		<swiper class="swiper-box" :circular="false" :indicator-dots="false" :autoplay="false" :interval="2000"
			:duration="500" previous-margin="20rpx" next-margin="20rpx" @change="change">
			<swiper-item v-for="(item, index) in list" :key="index" @tap="swiperMine(item)">
				<view class="swiper-item">
					<view class="lock_con">
						<u-image width="614" height="312" :src="item.img_url" />
						<view class="lock" v-if="!item.state">
							<u-image width="88" height="88" src="@/static/images/icon/lock_icon.png" alt="" />
						</view>
					</view>
					<view class="mineCard">
						<u-image width="614" height="312" :src="item.back_ground_img_url" alt="" />
						<view class="mine_info">
							<view class="mine_head">
								<u-image width="44" height="44" :src="item.icon" alt="" />
								<view class="head_title" :style="{color: item.color}">{{item.main_title}}</view>
							</view>
							<view class="mining" v-if="item.state == 1">
								<view class="left">
									<view class="level">MASA TANAM</view>
									<view class="days">Jumlah <text class="days_num">{{formatNumber(item.mining_days)}} hari</text>
									</view>
								</view>
								<view class="right">proporsi: <text class="right_num">{{formatNumber(item.profit)}}%</text></view>
							</view>
							<view class="unmined" v-if="!item.state">
								<view class="left">
									<view class="level">TERSEDIA</view>
									<view class="days">Tersedia</view>
								</view>
								<view class="right">proporsi: <text class="right_num">{{formatNumber(item.profit)}}%</text></view>
							</view>
							<view class="stop" v-if="item.state == 2">
								<view class="left">
									<view class="level">TERSEDIA</view>
									<view class="days">Tersedia</view>
								</view>
								<view class="right">proporsi：<text class="right_num">{{formatNumber(item.profit)}}%</text></view>
							</view>
							<u-line-progress v-if="item.state" height="6" :show-percent="false" round
								:percent="formatProgress(userInfo.user_integral,item.contract_require)"
								active-color="#0067E0" inactive-color="#D9D9D9"></u-line-progress>
							<view class="card_foot" v-if="item.state">
								<view class="foot_text">
									<text class="upgrade">Upgrade Progres:</text>
									<text class="text_num">{{formatNumber(userInfo.user_integral || 0)}} Poin</text>
									/ {{formatNumber(item.contract_require || 0)}} Poin
									</view>
							</view>
							<view class="lock_box" v-if="!item.state">
								<u-image width="36" height="36" src="@/static/images/icon/lock_btn.png" alt="" />
								<view class="lock_text">
									Syarat dan Kondisi <text class="lock_num">Saldo {{formatNumber(item.contract_require)}} Poin</text>
								</view>
							</view>
							<view class="head_purchased" v-if="item.state">
								<view class="purchased">
									Total Kontrak Investor：{{formatNumber(item.number_people)}}
								</view>
							</view>
							<view class="foot_purchased" v-if="!item.state">
								<view class="purchased" :style="{background: item.color}">
									Total Kontrak Investor：{{formatNumber(item.number_people)}}
								</view>
							</view>
						</view>
						<view class="foot_btn" v-if="item.state">
							<view class="upgrade_btn" :style="{background: item.color}" v-if="index < list.length - 1"
								@tap.stop="navigateTo('/pages/mine_detail/mine_detail?id=' + list[index + 1].id)">
								<u-image width="32" height="32" src="@/static/images/icon/btn_icon02.png" alt="" />
								<text class="btn_text">PERBAHARUI</text>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { formatNumber, formatProgress } from '@/utils/util'
	import { contractList, myContractList } from '@/api/contract'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import { onShow } from '@dcloudio/uni-app'
	const userStore = useUserStore()
	const { userInfo, isLogin } = storeToRefs(userStore)
	const active = ref<Number>(0)
	const scrollLeft = ref(0)
	const list = ref<Array<String | any>>([])
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const swiperMine = (e : any) => {
		isLogin.value ? navigateTo('/pages/mine_detail/mine_detail?id=' + e.id) : navigateTo('/pages/mine_detail/mine_detail?id=' + e.contract_id)
	}

	const change = (e : any) => {
		active.value = e.detail.current
		scrollLeft.value = e.detail.current * 150
	}
	const getContractList = async () => {
		const data = isLogin.value ? await myContractList() : await contractList()
		list.value = data.lists
	}
	onShow(() => {
		getContractList()
	})
	defineExpose({ getContractList })
</script>

<style lang="scss" scoped>
	.content {
		border-radius: 12rpx;
		background: #FFFFFF;

		.swiper_head {
			clear: both;
			position: relative;
			padding: 0 20rpx;

			.swiper_title {
				position: absolute;
				top: 10rpx;
				left: 20rpx;
				font-family: Arial;
				font-size: 36rpx;
				font-weight: 700;
				line-height: 54rpx;
				text-align: left;
				color: #1E1E1E;

			}
		}

		.scroll-box {

			.tabs_content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;
				padding: 20rpx 0;

				.tabs_label {
					flex: 1;
					z-index: 100;

					.tabs_name {
						width: 150rpx;
						font-family: Arial;
						font-size: 26rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: center;
					}
				}

				.active {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					transition: all 0.5s;
					width: 150rpx;
					height: 70rpx;
					border-radius: 10rpx;
					color: #0067E0;
					background: #DBEBFF;
					z-index: 97;
				}
			}
		}


		.swiper-box {
			height: 650rpx;

			.swiper-item {
				display: block;
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: #fff;
				margin: 0 10rpx;
				border-radius: 15rpx;
				/* app上运行不显示图片，就需要加下面这行，设置高度 */
				height: 100%;
				border-radius: 20rpx;

				.lock_con {
					position: relative;
					overflow: hidden;
					width: 614rpx;
					height: 312rpx;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;

					.lock {
						position: absolute;
						top: 0;
						left: 0;
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 100%;
						background: rgba(255, 255, 255, 0.8);
					}
				}

				.mineCard {
					position: relative;
					width: 614rpx;
					
					.mine_info {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						padding: 20rpx;
						border-bottom-left-radius: 20rpx;
						border-bottom-right-radius: 20rpx;

						.mine_head {
							display: flex;
							justify-content: flex-start;
							align-items: center;

							.head_title {
								margin-left: 20rpx;
								font-family: Arial;
								font-size: 32rpx;
								font-weight: 700;
								line-height: 44rpx;
								text-align: left;
							}
						}

						.mining {
							display: flex;
							justify-content: space-between;
							align-items: flex-start;
							padding: 20rpx 0;

							.left {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.level {
									padding: 5rpx 20rpx;
									background: #D3F7D9;
									font-family: Arial;
									font-size: 22rpx;
									font-weight: 500;
									text-align: center;
									color: #00B01A;
									border-radius: 6rpx;
								}

								.days {
									margin-left: 10rpx;
									font-family: Arial;
									font-size: 26rpx;
									font-weight: 500;
									line-height: 40rpx;
									text-align: left;
									color: #999999;

									.days_num {
										margin-left: 10rpx;
										font-family: Arial;
										font-size: 26rpx;
										font-weight: 500;
										line-height: 40rpx;
										text-align: left;
										color: #1E1E1E;
									}
								}
							}

							.right {
								font-family: Arial;
								font-size: 26rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: left;
								color: #999999;

								.right_num {
									font-family: Arial;
									font-size: 26rpx;
									font-weight: 500;
									line-height: 40rpx;
									text-align: left;
									color: #1E1E1E;
								}
							}
						}
						.unmined {
							display: flex;
							justify-content: space-between;
							align-items: flex-start;
							padding: 20rpx 0;
						
							.left {
								display: flex;
								justify-content: space-between;
								align-items: center;
						
								.level {
									padding: 5rpx 20rpx;
									background: #FFF3F2;
									font-family: Arial;
									font-size: 22rpx;
									font-weight: 500;
									text-align: center;
									color: #999999;
									border-radius: 6rpx;
								}
						
								.days {
									margin-left: 10rpx;
									font-family: Arial;
									font-size: 26rpx;
									font-weight: 500;
									line-height: 40rpx;
									text-align: left;
									color: #999999;
								}
							}
						
							.right {
								font-family: Arial;
								font-size: 26rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: left;
								color: #999999;
						
								.right_num {
									font-family: Arial;
									font-size: 26rpx;
									font-weight: 500;
									line-height: 40rpx;
									text-align: left;
									color: #1E1E1E;
								}
							}
						}
						.stop {
							display: flex;
							justify-content: space-between;
							align-items: flex-start;
							padding: 20rpx 0;

							.left {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.level {
									padding: 5rpx 20rpx;
									background: #FFF3F2;
									font-family: Arial;
									font-size: 22rpx;
									font-weight: 500;
									text-align: center;
									color: #EF0000;
									border-radius: 6rpx;
								}

								.days {
									margin-left: 10rpx;
									font-family: Arial;
									font-size: 26rpx;
									font-weight: 500;
									line-height: 40rpx;
									text-align: left;
									color: #999999;
								}
							}

							.right {
								font-family: Arial;
								font-size: 26rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: left;
								color: #999999;

								.right_num {
									font-family: Arial;
									font-size: 26rpx;
									font-weight: 500;
									line-height: 40rpx;
									text-align: left;
									color: #1E1E1E;
								}
							}
						}

						.card_foot {
							display: flex;
							justify-content: space-between;
							align-items: flex-start;

							.foot_text {
								font-family: Arial;
								font-size: 22rpx;
								font-weight: 500;
								line-height: 48rpx;
								text-align: left;
								color: #88A1C2;

								.upgrade {
									margin-right: 10rpx;
									font-family: Arial;
									font-size: 22rpx;
									font-weight: 500;
									line-height: 48rpx;
									text-align: left;
									color: #88A1C2;
								}

								.text_num {
									margin-right: 5rpx;
									font-family: Arial;
									font-size: 22rpx;
									font-weight: 500;
									line-height: 48rpx;
									text-align: left;
									color: #0067E0;
								}
							}
						}

						.lock_box {
							display: flex;
							justify-content: center;
							align-items: center;
							margin-bottom: 20rpx;
							padding: 15rpx 0;
							border-radius: 8rpx;

							.lock_text {
								margin-left: 10rpx;
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: center;
								color: #1E1E1E;

								.lock_num {
									font-family: Arial;
									font-size: 24rpx;
									font-weight: 500;
									line-height: 40rpx;
									color: #0067E0;
								}
							}
						}

						.head_purchased {
							display: flex;
							justify-content: center;
							align-items: center;
							margin: 20rpx 0;
						
							.purchased {
								padding: 0 20rpx;
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 46rpx;
								text-align: left;
								color: #545B76;
								background: #B7D6FF;
								border-radius: 6rpx;
							}
						}
						
						.foot_purchased {
							display: flex;
							justify-content: center;
							align-items: center;

							.purchased {
								padding: 0 20rpx;
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 46rpx;
								text-align: left;
								color: #FFFFFF;
								border-radius: 6rpx;
							}
						}
					}
					.foot_btn {
						position: absolute;
						top: 0;
						right: 0;
						display: flex;
						justify-content: flex-end;
						align-items: flex-end;
					
						.upgrade_btn {
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 15rpx 12rpx;
							border-bottom-left-radius: 12rpx;
							.btn_text {
								margin-left: 10rpx;
								font-family: Arial;
								font-size: 26rpx;
								font-weight: 500;
								text-align: left;
								color: #FFFFFF;
							}
						}
					}
				}
			}
		}
	}
</style>
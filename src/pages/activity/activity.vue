<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="activity">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="false" :is-fixed="true" :border-bottom="false" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent' }"
					:title-color="scrollTop ? '#1E1E1E':'#FFFFFF'" title="AKTIVITAS">
					<template #right>
						<view class="slot-wrap" @tap="navigateTo('/pages/customer_service/customer_service')">
							<u-image v-if="scrollTop" width="50" height="50" src="@/static/images/icon/contact.png"
								alt="" />
							<u-image v-if="!scrollTop" width="50" height="50"
								src="@/static/images/user/icon_service.png" alt="" />
						</view>
					</template>
				</u-navbar>
			</u-sticky>
			<view class="activity_con pt-[20rpx] pb-[20rpx]">
				<view class="swiper mx-[30rpx]">
					<swiper class="swiper_box" :autoplay="true" indicator-color="#F1F1F1"
						indicator-active-color="#1E8552" :indicator-dots="true">
						<swiper-item v-for="(sItem, sIndex) in swiperArr" :key="sIndex">
							<view class="swiper_label">
								<u-image width="678" height="580" border-radius="12" :src="sItem"></u-image>
							</view>
						</swiper-item>
					</swiper>
				</view>

				<view class="activity_container">
					<view class="activity_head">
						<u-image width="750" height="310" src="@/static/images/activity/activity_head.png"></u-image>
						<view class="activity_head_box">Info Kegiatan</view>
					</view>
					<view class="activity_box">
						<view class="activity_card" v-for="(item,index) in list" :key="index"
							@tap="navigateTo('/pages/activity_detail/activity_detail?activity_id='+ item.id)">
							<view class="card_info" v-if="!item.is_show">
								<view class="activity_image">
									<u-image height="250" :src="item.img_url" alt="" />
									<view class="activity_image_ended" v-if="item.state == 1">
										<u-image width="220" height="184" src="@/static/images/activity/ended.png"
											alt="" />
									</view>
								</view>
								<view class="activity_info">
									<view class="activity_title">{{item.title}}</view>
									<view class="activity_foot">
										<view class="activity_time">
											<u-image width="36" height="36" src="@/static/images/activity/icon_date.png"
												alt="" />
											<view class="date">{{item.create_time}}</view>
										</view>
										<view class="activity_hot">
											<u-image width="36" height="36" src="@/static/images/activity/icon_hot.png"
												alt="" />
											<view class="hot">{{formatNumber(item.views)}}</view>
										</view>
									</view>
								</view>
								<view class="activity_icon ended" v-if="item.state == 1">Berakhir</view>
								<view class="activity_icon progress" v-else>Dalam Proses</view>
							</view>

						</view>
						<view class="empty mt-[50rpx]" v-if="!list.length">
							<u-image width="462" height="291" src="@/static/images/icon/empty.png" alt="" />
							<view class="empty_text">Tidak Ada Kegiatan</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 返回顶部按钮 -->
			<u-back-top :scroll-top="scrollTop" :top="100" :customStyle="{
		        backgroundColor: '#FFF',
		        color: '#000',
		        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)'
		    }">
			</u-back-top>
			<tabbar />
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { carouselImg, eventList } from '@/api/eventInfo'
	import { formatNumber } from '@/utils/util'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	const scrollTop = ref<number>(0)
	const list = ref<Array<any>>([])
	const swiperArr = ref<Array<any>>([])
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url: url
		})
	}
	const getSwiper = async () => {
		const data = await carouselImg()
		swiperArr.value = data ? data.imgs : []
	}
	const getList = async () => {
		const data = await eventList()
		list.value = data ? data.lists : []
	}
	onLoad(() => {
		getSwiper()
		getList()
	})
	getList()
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page {
		background: #FFFFFF !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.activity {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.slot-wrap {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				padding: 0 30rpx;

				.title {
					font-family: Arial;
					font-size: 36rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: center;
					color: #1E1E1E;
				}
			}

			.activity_con {
				.swiper {
					margin-bottom: 40rpx;
					padding: 10rpx;
					height: 628rpx;
					border-radius: 12rpx;
					background: #FFFFFF;

					.swiper_box {
						height: 628rpx;
						.swiper_label {
							border-radius: 12rpx;
							overflow: hidden;
						}

						::v-deep .uni-swiper-dots-horizontal {
							bottom: 0rpx;
						}

						::v-deep .uni-swiper-dot {
							width: 8rpx;
							height: 8rpx;
							border-radius: 4rpx;
						}

						::v-deep .uni-swiper-dot-active {
							width: 20rpx;
							height: 8rpx;
							border-radius: 4rpx;
						}
					}

				}

				.activity_container {
					.activity_head {
						position: relative;
						border-top-left-radius: 12rpx;
						border-top-right-radius: 12rpx;
						overflow: hidden;

						.activity_head_box {
							position: absolute;
							bottom: 0;
							left: 50%;
							transform: translate(-50%, 0);
							width: 678rpx;
							height: 70rpx;
							border-top-left-radius: 12rpx;
							border-top-right-radius: 12rpx;
							background: linear-gradient(316.44deg, #77DD9F 1.2%, #1D8556 98.8%);
							font-family: Arial;
							font-weight: 700;
							font-size: 32rpx;
							line-height: 70rpx;
							text-align: center;
							color: #FFFFFF;
						}
					}

					.activity_box {
						position: relative;
						top: -10rpx;
						padding: 20rpx 30rpx;
						background: #FFFFFF;
						border-radius: 20rpx;

						.activity_card {
							margin-bottom: 20rpx;
							border-radius: 12rpx;
							box-shadow: 0rpx 4rpx 6rpx 0rpx rgba(0, 0, 0, 0.05);

							.card_info {
								position: relative;
								border-radius: 12rpx;
								background: #FFFFFF;

								.activity_image {
									overflow: hidden;
									position: relative;
									width: 100%;
									height: 250rpx;
									border-top-left-radius: 12rpx;
									border-top-right-radius: 12rpx;

									.activity_image_ended {
										position: absolute;
										top: 0;
										left: 0;
										width: 100%;
										height: 250rpx;
										padding: 30rpx;
										border-top-left-radius: 12rpx;
										border-top-right-radius: 12rpx;
										background: rgba(0, 0, 0, 0.5);
									}
								}

								.activity_icon {
									position: absolute;
									top: 0;
									right: 0;
									padding: 5rpx 20rpx;
									border-top-right-radius: 12rpx;
									border-bottom-left-radius: 12rpx;

									&.progress {
										font-family: Arial;
										font-size: 22rpx;
										font-weight: 500;
										text-align: center;
										color: #FFFFFF;
										background: #1E8552;
									}

									&.ended {
										font-family: Arial;
										font-size: 22rpx;
										font-weight: 500;
										text-align: center;
										color: #FFFFFF;
										background: #999999;
									}
								}

								.activity_info {
									padding: 20rpx;
									background: #FFFFFF;
									border-bottom-left-radius: 12rpx;
									border-bottom-right-radius: 12rpx;

									.activity_title {
										font-family: Arial;
										font-size: 28rpx;
										font-weight: 700;
										line-height: 48rpx;
										text-align: left;
										color: #1E1E1E;
										overflow: hidden;
										/* 隐藏超出部分 */
										display: -webkit-box;
										/* 创建弹性盒子模型 */
										text-overflow: ellipsis;
										/* 超出部分显示省略号 */
										-webkit-box-orient: vertical;
										/* 设置盒子的垂直布局 */
										-webkit-line-clamp: 1;
										/* 限制在两行内 */
									}

									.activity_foot {
										display: flex;
										justify-content: space-between;
										align-items: center;
										margin-top: 20rpx;

										.activity_time {
											display: flex;
											justify-content: flex-start;
											align-items: center;

											.date {
												margin-left: 10rpx;
												font-family: Arial;
												font-size: 24rpx;
												font-weight: 500;
												line-height: 40rpx;
												text-align: left;
												color: #A0A3A9;
											}
										}

										.activity_hot {
											display: flex;
											justify-content: flex-start;
											align-items: center;

											.hot {
												margin-left: 10rpx;
												font-family: Arial;
												font-size: 26rpx;
												font-weight: 500;
												line-height: 40rpx;
												text-align: left;
												color: #EB2C0F;
											}
										}
									}
								}
							}

						}
					}
				}
			}
		}
	}
</style>
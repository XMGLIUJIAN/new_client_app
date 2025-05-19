<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="498" src="@/static/images/pageStyle/imageGroupFive.png"></u-image>
		</view>
		<view class="activity">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="false" :is-fixed="false" :border-bottom="false"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent' }">
					<view class="slot-wrap">
						<view class="title">AKTIVITAS</view>
					</view>
				</u-navbar>
			</u-sticky>
			<view class="activity_con pt-[20rpx] pb-[100rpx] px-[40rpx]">
				<view class="activity_card" v-for="(item,index) in list" :key="index"
					@tap="navigateTo('/pages/activity_detail/activity_detail?activity_id='+ item.id)">
					<view class="card_info" v-if="!item.is_show">
						<view class="activity_image">
							<u-image height="250" :src="item.img_url" alt="" />
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
					<u-empty text="Tidak ada kegiatan" mode="data" icon-color="#999999" color="#999999"></u-empty>
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
	import { eventList } from '@/api/eventInfo'
	import { formatNumber } from '@/utils/util'
	import { onPageScroll } from '@dcloudio/uni-app'
	const scrollTop = ref<number>(0)
	const list = ref<Array<any>>([])
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url: url
		})
	}
	const getList = async () => {
		const data = await eventList()
		list.value = data.lists
	}
	getList()
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
					font-family:  Arial;
					font-size: 36rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: center;
					color: #1E1E1E;
				}
			}

			.activity_con {
				.activity_card {
					.card_info {
						position: relative;
						margin-bottom: 20rpx;
						border-radius: 12rpx;
						background: #FFFFFF;
						.activity_image {
							overflow: hidden;
							height: 250rpx;
							border-top-left-radius: 12rpx;
							border-top-right-radius: 12rpx;
						}

						.activity_icon {
							position: absolute;
							top: 0;
							right: 0;
							padding: 5rpx 20rpx;
							border-top-right-radius: 12rpx;
							border-bottom-left-radius: 12rpx;

							&.progress {
								font-family:  Arial;
								font-size: 22rpx;
								font-weight: 500;
								text-align: center;
								color: #FFFFFF;
								background: #0067E0;
							}

							&.ended {
								font-family:  Arial;
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
								font-family:  Arial;
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
										font-family:  Arial;
										font-size: 24rpx;
										font-weight: 500;
										line-height: 40rpx;
										text-align: left;
										color: #999999;
									}
								}

								.activity_hot {
									display: flex;
									justify-content: flex-start;
									align-items: center;

									.hot {
										margin-left: 10rpx;
										font-family:  Arial;
										font-size: 26rpx;
										font-weight: 500;
										line-height: 40rpx;
										text-align: left;
										color: #FF8138;
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
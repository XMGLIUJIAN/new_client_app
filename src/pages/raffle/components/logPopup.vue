<template>
	<view class="popup">
		<view class="content">
			<view class="intro">
				<u-image width="572" height="844" src="@/static/images/raffle/raffle_popup.png"></u-image>
				<view class="core_area">
					<view class="title">
						<u-image width="188" height="58" src="@/static/images/raffle/Hadiahku.png"></u-image>
					</view>
					<view class="popup_txt">
						<scroll-view scroll-y :refresher-enabled="true" :refresher-triggered="isRefreshing"
							:lower-threshold="40" @refresherrefresh="onRefresh" @scrolltolower="onScrollToLower"
							:refresher-threshold="40" refresher-background="transparent" refresher-default-style="none"
							style="height: 698rpx;">
							<template v-if="isRefreshing" #refresher>
								<u-loadmore icon-type="flower" status="loading" color="#FFFFFF" />
							</template>
							<view class="popup_label" v-for="(item,index) in list" :key="index">
								<view class="popup_image">
									<u-image width="80" height="80" :src="item.prize_image"></u-image>
								</view>
								<view class="popup_info">
									<view class="info_title">{{item.prize_name}}</view>
									<view class="info_text" v-if="item.status == 1">HADIAH TELAH DI TERIMA</view>
									<view class="info_date">{{item.create_time}}</view>
									<view class="info_btn" v-if="!item.status" @tap="confirmPopup">
										<u-image width="28" height="28"
											src="@/static/images/raffle/pelayanan.png"></u-image>
										<view class="pelayanan">Costumer Service</view>
									</view>
								</view>
							</view>
							<u-loadmore v-if="!isRefreshing &&  list.length > 0" icon-type="flower" :status="status" color="#FFFFFF" />
							<view class="empty mt-[100rpx]" v-if="!list.length">
								<u-empty text="Tidak Ada Catatan" mode="data" icon-color="#FFFFFF"
									color="#FFFFFF"></u-empty>
							</view>
						</scroll-view>

					</view>

				</view>
				<view class="cancel_btn" @tap="cancelPopup">
					<u-image width="68" height="68" src="@/static/images/raffle/cancel_btn.png"></u-image>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { lotteryLogs } from '@/api/raffle';
	const list = ref<any>([])
	const currentPage = ref(1)
	const isRefreshing = ref(false)
	const isTotal = ref<boolean>(false)
	const status = ref('loadmore'); //loadmore 加载前  loading 加载中  nomore 没有更多了
	const emit = defineEmits(['confirm', 'cancle'])
	const confirmPopup = () => {
		emit('confirm')
	}
	const cancelPopup = () => {
		emit('cancle')
	}
	// 加载数据
	const loadData = async (isRefresh : boolean = false, pageSize : number = 10) => {
		if (status.value == 'loading' || status.value == 'nomore') return
		const isLoad = isRefresh ? false : isTotal.value
		if(isLoad) return
		status.value = 'loading'
		if(!isRefresh){
			currentPage.value++
		}else{
			currentPage.value = 1
		}
		try {
			const page =  currentPage.value
			const data : any = await lotteryLogs({ page: page, pageSize: pageSize })

			if (isRefresh) {
				list.value = data.rows
			} else {
				list.value = [...list.value, ...data.rows]
			}
			isTotal.value = page * pageSize >= data.total ? true : false
			//判断数据情况
			status.value = data.rows.length === 0 || data.total <=20 ? 'nomore' : 'loadmore'
		} finally {
			status.value = 'loadmore'
			isRefreshing.value = false
		}

	}

	// 下拉刷新
	const onRefresh = () => {
		if (isRefreshing.value) return
		isRefreshing.value = true
		loadData(true)
	}

	// 上拉加载
	const onScrollToLower = () => {
		loadData()
	}
	// 初始化加载
	loadData(true)
</script>

<style lang="scss" scoped>
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		z-index: 999;

		.content {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;

			.intro {
				position: relative;
				width: 572rpx;
				border-radius: 20rpx;
				background: #FFFFFF;

				.core_area {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					padding: 40rpx;

					.title {
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.popup_txt {
						width: 500rpx;
						height: 698rpx;

						.popup_label {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							margin-bottom: 10rpx;
							padding-bottom: 10rpx;
							border-bottom: 2rpx solid #7B997A;

							.popup_image {
								display: flex;
								justify-content: center;
								align-items: center;
								width: 128rpx;
								height: 128rpx;
								background: linear-gradient(180deg, #FFFFFF 0%, #FFEDC4 100%);
								border: 2rpx solid #FFFFFF;
								border-radius: 10rpx;
							}

							.popup_info {
								margin-left: 40rpx;

								.info_title {
									font-family: Source Han Sans CN;
									font-weight: 700;
									font-size: 28rpx;
									text-align: left;
									line-height: 48rpx;
									color: #FFFFFF;
								}

								.info_text {
									font-family: Source Han Sans CN;
									font-weight: 500;
									font-size: 22rpx;
									text-align: left;
									line-height: 48rpx;
									color: #BCCABB;
								}

								.info_date {
									font-family: Source Han Sans CN;
									font-weight: 500;
									font-size: 24rpx;
									text-align: left;
									line-height: 54rpx;
									color: #BCCABB;
								}

								.info_btn {
									display: flex;
									justify-content: center;
									align-items: center;
									width: 282rpx;
									height: 44rpx;
									border-radius: 22rpx;
									background: #FFFFFF;

									.pelayanan {
										font-family: Source Han Sans CN;
										font-weight: 500;
										font-size: 20rpx;
										line-height: 44rpx;
										color: #4A744E;
									}
								}
							}
						}
					}
				}

				.cancel_btn {
					position: absolute;
					bottom: -100rpx;
					left: 50%;
					transform: translate(-50%, 0);
				}
			}
		}
	}
</style>
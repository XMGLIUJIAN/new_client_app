<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="investment_record">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E" title="RIWAYAT INVESTASI"
					:title-bold="true" :background="{ background: 'transparent'}"
					title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="record">
				<scroll-view scroll-y :refresher-enabled="true" :refresher-triggered="isRefreshing"
					:lower-threshold="40" @refresherrefresh="onRefresh" @scrolltolower="onScrollToLower"
					:refresher-threshold="40" refresher-background="transparent" refresher-default-style="none"
					style="height: calc(100vh - 120rpx);">
					<template v-if="isRefreshing" #refresher>
						<u-loadmore icon-type="flower" status="loading" color="#999999" />
					</template>
					<view class="record_card" :class="getState(item.total_days)" v-for="(item,index) in list" :key="index">
						<view class="record_card_head">
							<view class="record_card_state" :class="getState(item.total_days)">{{item.project_name}}</view>
							<view class="record_card_title">{{item.tag}}</view>
						</view>
						<view class="record_card_foot">
							<view class="record_card_date">Waktu Mulai：{{formatDate(item.created_at)}}</view>
							<view class="record_card_btn" @tap="navigateTo('/pages/release_info/release_info?id='+item.id)">
								Rincian
							</view>
						</view>
						<view class="record_state ended" v-if="item.status == 1">Berakhir</view>
						<view class="record_state progress" v-else>Sedang Berjalan</view>
					</view>
					<u-loadmore v-if="!isRefreshing &&  list.length > 0" icon-type="flower" :status="status" color="#999999" />
					<view class="empty mt-[300rpx]" v-if="!list.length">
						<u-image width="482" height="291" src="@/static/images/investment/notdata.png"></u-image>
						<view class="empty_text">Belum Bergabung dalam Program</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { formatDate } from '@/utils/util'
	import { investmentRecord } from '@/api/raffle';
	import { onLoad } from '@dcloudio/uni-app'
	const list = ref<any>([])
	const currentPage = ref(1)
	const isRefreshing = ref(false)
	const isTotal = ref<boolean>(false)
	const status = ref('loadmore'); //loadmore 加载前  loading 加载中  nomore 没有更多了
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const getState = (state : number) => {
		let color = ""
		switch (state) {
			case 3:
				color = 'putih'
				break;
			case 7:
				color = 'melati'
				break;
			case 15:
				color = 'ungu'
				break;
			case 30:
				color = 'merah'
				break;
			case 60:
				color = 'hitam'
				break;
		}
		return color
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
			const data : any = await investmentRecord({ page: page, pageSize: pageSize })
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
	onLoad(() => {
		// 初始化加载
		loadData(true)
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

		.investment_record {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.record {
				padding: 20rpx;

				.record_card {
					position: relative;
					margin-bottom: 20rpx;
					padding: 20rpx;
					border-radius: 12rpx;
					border: 2rpx solid #E9E9E9;

					&.putih {
						background: #FBFBFB;
					}

					&.melati {
						background: #FFF7F0;
					}

					&.ungu {
						background: #F0F6FF;
					}

					&.merah {
						background: #FFFDF2;
					}

					&.hitam {
						background: #F2F2FF;
					}

					.record_card_head {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						.record_card_state {
							font-family: Source Han Sans CN;
							font-weight: 700;
							font-size: 26rpx;
							line-height: 48rpx;
							text-align: center;

							&.putih {
								color: #8CA6C8;
							}

							&.melati {
								color: #B47033;
							}

							&.ungu {
								color: #0067E0;
							}

							&.merah {
								color: #DDA906;
							}

							&.hitam {
								color: #6D67D1;
							}
						}

						.record_card_title {
							margin-left: 20rpx;
							font-family: Source Han Sans CN;
							font-weight: 500;
							font-size: 26rpx;
							line-height: 48rpx;
							text-align: center;
							color: #000000;
						}
					}

					.record_card_foot {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.record_card_date {
							font-family: Source Han Sans CN;
							font-weight: 400;
							font-size: 22rpx;
							line-height: 54rpx;
							text-align: left;
							color: #999999;
						}

						.record_card_btn {
							width: 116rpx;
							height: 54rpx;
							font-family: Source Han Sans CN;
							font-weight: 500;
							font-size: 26rpx;
							text-align: center;
							line-height: 54rpx;
							color: #1E1E1E;
							border-radius: 10rpx;
							border: 2rpx solid #E9E9E9;
							background: #FFFFFF;
						}
					}

					.record_state {
						position: absolute;
						top: 0;
						right: 0;
						padding: 10rpx 22rpx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						font-size: 24rpx;
						line-height: 24rpx;
						text-align: center;
						border-top-right-radius: 12rpx;
						border-bottom-left-radius: 12rpx;

						&.progress {
							background: #DBEBFF;
							color: #0067E0;
						}

						&.ended {
							background: #EDEDED;
							color: #999999;
						}
					}
				}
			}

			.empty {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.empty_text {
					margin-top: 20rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					font-size: 28rpx;
					line-height: 48rpx;
					text-align: center;
					color: #999999;
				}
			}
		}
	}
</style>
<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="transaction_info">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false"
					:back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'" title="PERCIKAN AIR" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					:title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
			<view class="transaction_info_card mt-[50rpx] mb-[30rpx] mx-[30rpx]">
				<view class="card_head">Ringkasan Transaksi</view>
				<view class="card_box">
					<view class="card_label mb-[30rpx]">
						<view class="label_title">Saldo</view>
						<view class="label_text">{{formatNumber(totalCashProceeds)}}</view>
					</view>
					<view class="card_label">
						<view class="label_title">Pion</view>
						<view class="label_text">{{formatNumber(totalPointsIncome)}}</view>
					</view>
					<view class="card_date">
						<u-image width="193" height="172" src="@/static/images/page/card_date.png"></u-image>
						<view class="date" @tap="calendarShow = true">{{!createDate ? 'TANGGAL' : createText}}</view>
					</view>
				</view>
			</view>
			<view class="transaction_info_popup">
				<view class="tabs_content mb-[20rpx]">
					<view class="tabs_label" :class="{'active': active == 0}" @tap="change(0)">Semua</view>
					<view class="tabs_line"></view>
					<view class="tabs_label" :class="{'active': active == 1}" @tap="change(1)">Saldo</view>
					<view class="tabs_line"></view>
					<view class="tabs_label" :class="{'active': active == 2}" @tap="change(2)">Poin</view>
				</view>
				<view class="transaction_box">
					<scroll-view scroll-y :refresher-enabled="true" :refresher-triggered="isRefreshing"
						:lower-threshold="40" @refresherrefresh="onRefresh" @scrolltolower="onScrollToLower"
						:refresher-threshold="40" refresher-background="transparent" refresher-default-style="none"
						style="height: 60vh;">
						<template v-if="isRefreshing" #refresher>
							<u-loadmore icon-type="flower" status="loading" color="#8B9098" />
						</template>
						<view class="transaction_investasi" v-for="(item,index) in list" :key="index">
							<view class="investasi_head">{{item.type_name}}</view>
							<view class="investasi_line"></view>
							<view class="investasi_foot">
								<view class="foot_date">{{item.create_time}}</view>
								<view class="foot_piont">
									<view class="point_title">{{item.currency_type == 2 ? 'Pion':'Saldo'}}</view>
									<view class="point_text increase" v-if="item.amount_received >= 0">
										+{{formatNumber(item.amount_received)}}</view>
									<view class="point_text reduce" v-if="item.amount_received < 0">
										{{formatNumber(item.amount_received)}}
									</view>
								</view>
							</view>
							<view class="investasi_tip" :class="item.amount_received >= 0 ? 'increase':'reduce'"></view>
						</view>
						<u-loadmore v-if="!isRefreshing &&  list.length > 0" icon-type="flower" :status="status"
							color="#8B9098" />
						<view class="empty mt-[100rpx]" v-if="!list.length">
							<u-image width="462" height="291" src="@/static/images/icon/empty.png" alt="" />
							<view class="empty_popup">Tidak Ada Catatan</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<toastPopup></toastPopup>
		<u-picker mode="time" :showTimeTag="false" v-model="calendarShow" :defaultTime="currentDate" :params="params" @confirm="changePicker" @cancel="refreshPicker"></u-picker>
	</view>
</template>

<script lang="ts" setup>
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { ref, nextTick } from 'vue';
	import { filterFormat, formatNumber } from '@/utils/util';
	import { cashFlowLogList, monthReport } from '@/api/contract';
	import { emitter } from '@/utils/emitter';
	const scrollTop = ref<number>(0)
	const month = ref<string>('')
	const year = ref<string>('')
	const createDate = ref<String>('')
	const createText = ref<String>('')
	const totalCashProceeds = ref<number>(0)
	const totalPointsIncome = ref<number>(0)
	const active = ref<Number>(0)
	const currentPage = ref(1)
	const isRefreshing = ref(false)
	const isTotal = ref<boolean>(false)
	const params = ref<any>({ year: true, month: true})
	const calendarShow = ref<boolean>(false)
	const currentDate = ref<string>('')
	const status = ref('loadmore'); //loadmore 加载前  loading 加载中  nomore 没有更多了
	const list = ref<Array<String | any>>([])
	const getYear = () => {
		let date : any = new Date()
		let year = date.getFullYear() //获取完整的年份(4位)
		let month = date.getMonth() + 1 //获取当前月份(0-11,0代表1月)
		let day = date.getDate().toString() //获取当前日(1-31)
		currentDate.value = `${year}-${month}-${day}`
	}
	const formatMouth = (num: string) => {
		let text = ''
		switch (num) {
			case '01':
				text = 'Januari'
				break;
			case '02':
				text = 'Februari'
				break;
			case '03':
				text = 'Maret'
				break;
			case '04':
				text = 'April'
				break;
			case '05':
				text = 'Mei'
				break;
			case '06':
				text = 'Juni'
				break;
			case '07':
				text = 'Juli'
				break;
			case '08':
				text = 'Agustus'
				break;
			case '09':
				text = 'September'
				break;
			case '10':
				text = 'Oktober'
				break;
			case '11':
				text = 'November'
				break;
			case '12':
				text = 'Desember'
				break;
		}
		return text
	}
	const changePicker = (e : any) => {
		createDate.value = e.month + '-' + e.year
		createText.value = formatMouth(e.month) + ' ' + e.year
		year.value = e.year
		month.value = e.month
		getInfo()
		loadData(true)
	}
	const refreshPicker = () => {
		createDate.value = ''
		createText.value = ''
		year.value = ''
		month.value = ''
		getInfo()
		loadData(true)
	}
	const change = (state : Number) => {
		active.value = state
		list.value = []
		loadData(true)
	}
	const getInfo = async () => {
		const data = await monthReport(filterFormat({ year: year.value, month: month.value }))
		totalCashProceeds.value = data ? data.extend.totalCashProceeds : 0
		totalPointsIncome.value = data ? data.extend.totalPointsIncome : 0
	}
	// 加载数据
	const loadData = async (isRefresh : boolean = false, pageSize : number = 50) => {
		if (status.value == 'loading' || status.value == 'nomore') return
		const isLoad = isRefresh ? false : isTotal.value
		if(isLoad) return
		status.value = 'loading'
		if(!isRefresh){
			currentPage.value++
		}else{
			currentPage.value = 1
		}
		emitter.emit('gifType')
		try {
			const page =  currentPage.value
			const data : any = await cashFlowLogList(filterFormat({ page_no: page, page_size: pageSize, currencyType: active.value, year: year.value, month: month.value}))

			if (isRefresh) {
				list.value = data.lists
			} else {
				list.value = [...list.value, ...data.lists]
			}
			isTotal.value = page * pageSize >= data.total ? true : false
			//判断数据情况
			status.value = data.lists.length === 0 || data.total <=20 ? 'nomore' : 'loadmore'
		} finally {
			status.value = 'loadmore'
			isRefreshing.value = false
            emitter.emit("toast_close")
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
		nextTick(() => {
			getInfo()
			// 初始化加载
			loadData(true)
		})
	})
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>


<style lang="scss">
	page {
		background: #F0F0F0 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;
		background: #FFFFFF;

		.transaction_info {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.transaction_info_card {
				padding: 20rpx;
				background: #458060;
				border-radius: 12rpx;

				.card_head {
					margin-bottom: 20rpx;
					font-family: Arial;
					font-weight: 400;
					font-size: 28rpx;
					line-height: 40rpx;
					color: #FFFFFF;
				}

				.card_box {
					position: relative;
					padding: 20rpx;
					border-radius: 12rpx;
					background: #FFFFFF;

					.card_label {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						.label_title {
							width: 100rpx;
							font-family: Arial;
							font-weight: 400;
							font-size: 24rpx;
							line-height: 40rpx;
							color: #1E1E1E;
						}

						.label_text {
							font-family: Arial;
							font-weight: 400;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #275534;
						}
					}

					.card_date {
						position: absolute;
						top: -50rpx;
						right: 20rpx;
						.date{
							position: relative;
							top: -80rpx;
							left: 0;
							font-family: Arial;
							font-weight: 400;
							font-size: 20rpx;
							line-height: 40rpx;
							text-align: center;
							color: #F0F0F0;
						}
					}
				}
			}

			.transaction_info_popup {
				padding: 20rpx 30rpx;
				border-top-left-radius: 20rpx;
				border-top-right-radius: 20rpx;
				background: #F0F0F0;

				.tabs_content {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 5rpx 10rpx;
					border-radius: 50rpx;
					background: #D7D7D7;
					position: relative;

					.tabs_label {
						flex: 1;
						font-family: Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: center;
						color: #8B9098;

						&.active {
							color: #275534;
							background: #FFFFFF;
							border-radius: 50rpx;
							transition: all 0.5s;
						}
					}

					.tabs_line {
						margin: 0 20rpx;
						width: 2rpx;
						height: 30rpx;
						background: #F1F1F1;
					}
				}

				.transaction_box {
					height: 60vh;
					.transaction_investasi {
						position: relative;
						padding: 20rpx 40rpx;
						border-radius: 12rpx;
						background: #FFFFFF;
						margin-bottom: 20rpx;

						.investasi_head {
							font-family: Arial;
							font-weight: 400;
							font-size: 30rpx;
							line-height: 40rpx;
							color: #275534;
						}

						.investasi_line {
							margin: 40rpx 0;
							height: 2rpx;
							background: #F0F0F0;
						}

						.investasi_foot {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.foot_date {
								font-family: Arial;
								font-weight: 400;
								font-size: 18rpx;
								line-height: 40rpx;
								color: #8B9098;
							}

							.foot_piont {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.point_title {
									margin-right: 10rpx;
									font-family: Arial;
									font-weight: 400;
									font-size: 28rpx;
									line-height: 40rpx;
									color: #1E1E1E;
								}

								.point_text {
									font-family: Arial;
									font-weight: 400;
									font-size: 28rpx;
									line-height: 40rpx;

									&.increase {
										color: #458060;
									}

									&.reduce {
										color: #DD3222;
									}
								}


							}
						}

						.investasi_tip {
							position: absolute;
							top: 20rpx;
							left: 0;
							width: 12rpx;
							height: 92rpx;
							border-top-right-radius: 12rpx;
							border-bottom-right-radius: 12rpx;

							&.increase {
								background: #458060;
							}

							&.reduce {
								background: #DD3222;
							}
						}
					}
				}

			}
		}
	}
</style>

<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="1217" src="@/static/images/page/pcu_777.png"></u-image>
		</view>
		<view class="pcu_logs">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false"
					:back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'" title="777 PCU" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					:title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
			<view class="pcu_logs_card">
                <u-image width="700" height="509" src="@/static/images/pcu/card.png"></u-image>
				<view class="card_content">
                    <view class="card_head mt-[50rpx] ml-[20px]">
                        <u-image width="50" height="50" src="@/static/images/pcu/card_icon.png"></u-image>
                        <text>Cocok Untuk Investasi Stabil</text>
                    </view>
                    <view class="card_box">
                        <view class="card_label1">
                            keuntungan Tersedia(Belum Diklaim)
                        </view>
                        <view class="card_label2 my-[40rpx]">
                            Rp {{formatNumber(extend.totalIncome)}}
                        </view>
                        <view class="card_label3">
                            <view class="card_label3_first">
                                <u-image width="28" height="28" src="@/static/images/pcu/time_icon.png"></u-image>
                                <text>Waktu Pencairan Dana Terdekat</text>
                            </view>
                            <view class="card_label3_date">{{extend.productExpirationDate}}</view>
                        </view>
                    </view>
                </view>
			</view>
			<view class="transaction_info_popup">
                <view class="transaction_title mb-[20rpx]">Rincian Tagihan</view>
				<view class="transaction_box">
					<scroll-view scroll-y :refresher-enabled="true" :refresher-triggered="isRefreshing"
						:lower-threshold="40" @refresherrefresh="onRefresh" @scrolltolower="onScrollToLower"
						:refresher-threshold="40" refresher-background="transparent" refresher-default-style="none"
						style="height: 60vh;">
						<template v-if="isRefreshing" #refresher>
							<u-loadmore icon-type="flower" status="loading" color="#8B9098" />
						</template>
						<view class="transaction_investasi" v-for="(item,index) in list" :key="index">
							<view class="investasi_head">
                                <u-image width="60" height="60" src="@/static/images/pcu/frame.png"></u-image>
                                <text>{{item.type_name}}</text>
                            </view>
							<view class="investasi_line"></view>
							<view class="investasi_foot">
								<view class="foot_date">{{item.create_time}}</view>
								<view class="foot_piont">
									<view class="point_title">Saldo</view>
									<view class="point_text reduce">
										+ {{formatNumber(item.cash)}}
									</view>
								</view>
							</view>
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
    import { PcuLogList } from '@/api/product'
	const scrollTop = ref<number>(0)
	const month = ref<string>('')
	const year = ref<string>('')
	const createDate = ref<String>('')
	const createText = ref<String>('')
	const totalCashProceeds = ref<number>(0)
	const totalPointsIncome = ref<number>(0)
	const active = ref<Number>(1)
	const currentPage = ref(1)
	const isRefreshing = ref(false)
	const isTotal = ref<boolean>(false)
	const params = ref<any>({ year: true, month: true})
	const calendarShow = ref<boolean>(false)
	const currentDate = ref<string>('')
	const status = ref('loadmore'); //loadmore 加载前  loading 加载中  nomore 没有更多了
    const extend = ref<any>({
        productExpirationDate:'-',
        totalIncome:0
    })
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
			const data : any = await PcuLogList(filterFormat({ page_no: page, page_size: pageSize, year: year.value, month: month.value}))
            extend.value = data.extend
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
			// getInfo()
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
        //background: linear-gradient(2.59deg, rgba(255, 255, 255, 0) 2.98%, #52A062 97.02%);
    }
</style>
<style lang="scss" scoped>
	.container {
		position: relative;
		background: #FFFFFF;

		.pcu_logs {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.pcu_logs_card {
				padding: 20rpx;
				//background: #458060;
				border-radius: 12rpx;
                position: relative;
                //background: url("../../static/images/pcu/card.png");
                //background-size: 100%;
                //background-repeat: no-repeat;
                //height: 300px;

				.card_content {
                    position: absolute;
                    top: 40rpx;
                    left: 20rpx;
                    right:0;
                    width: 700rpx;
                    .card_head {
                        margin-bottom: 20rpx;
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 28rpx;
                        line-height: 40rpx;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }

                    .card_box {
                        position: relative;
                        padding: 20rpx;
                        border-radius: 12rpx;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        .card_label1 {
                            font-family: Arial;
                            font-weight: 700;
                            font-size: 32rpx;
                            line-height: 100%;
                            margin-top: 20rpx;
                        }
                        .card_label2{
                            font-family: Arial;
                            font-weight: 700;
                            font-size: 48rpx;
                            line-height: 100%;
                            color: #F06550;

                        }
                        .card_label3 {
                            padding: 20rpx 80rpx;
                            border: 1px solid #000000;
                            border-radius: 80rpx;
                            font-size: 24rpx;
                            .card_label3_first {
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                justify-content: center;
                                :first-child {
                                    margin-right: 10rpx;
                                }
                            }
                            .card_label3_date {
                                margin-top: 10rpx;
                                font-size: 28rpx;
                                font-weight: 700;
                            }
                        }

                        .card_label {
                            width: 100%;
                            text-align: center;
                        }

                    }
                }
			}

			.transaction_info_popup {
				padding: 20rpx 30rpx;
				border-top-left-radius: 20rpx;
				border-top-right-radius: 20rpx;
				background: #F0F0F0;
                background-image: url("../../static/images/pcu/rectangle.png");
                background-size: 100%;
                background-repeat: no-repeat;
                .transaction_title {
                    font-family: Arial;
                    font-weight: 700;
                    font-size: 30rpx;
                    line-height: 100%;
                    letter-spacing: 0px;

                    color: #458060;
                }


				.transaction_box {
					height: 60vh;
					.transaction_investasi {
						position: relative;
						padding: 20rpx 40rpx;
						border-radius: 12rpx;
						//background: #FFFFFF;
						margin-bottom: 20rpx;
                        background-image: url("../../static/images/pcu/item.png");
                        background-size: 100%;
                        height: 187rpx;
                        background-repeat: no-repeat;

						.investasi_head {
							font-family: Arial;
							font-weight: 400;
							font-size: 25rpx;
							line-height: 40rpx;
							color: #275534;
                            display: flex;
                            align-items: center;
						}

						.investasi_line {
							margin: 20rpx 0;
							height: 1rpx;
							//background: #000000;
                            border-bottom: #0f0f0f 1px dashed;
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

					}
				}

			}
		}
	}
</style>

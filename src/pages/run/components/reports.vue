<template>
	<view class="reports pt-[20rpx]  px-[40rpx]">
		<view class="select_date mb-[20rpx]" @click="calendarShow = true">
			<view class="date" v-if="createDate">{{createText}}</view>
			<view class="placeholder" v-else>Pilih Tanggal</view>
			<label v-if="createDate" @click.stop="refresh">
				<u-image width="42" height="42" src="@/static/images/icon/icon_dateColse.png" alt="" />
			</label>
			<label v-else>
				<u-image width="42" height="42" src="@/static/images/icon/icon_date.png" alt="" />
			</label>
		</view>
		<view class="scroll">
			<view class="reports_card mb-[20rpx]">
				<view class="card_label">
					<view class="card_title">Total Pendapatan poin：</view>
					<view class="card_num">
						<u-image v-if="totalPointsIncome < 0" width="40" height="40" src="@/static/images/tradeExchange/descend.png" alt="" />
						<u-image v-else width="40" height="40" src="@/static/images/tradeExchange/rise.png" alt="" />
						<view class="num">{{formatNumber(totalPointsIncome)}}</view>
					</view>
				</view>
				<view class="card_label">
					<view class="card_title">Total Keuntungan：</view>
					<view class="card_num">
						<u-image v-if="totalCashProceeds < 0" width="40" height="40" src="@/static/images/tradeExchange/descend.png" alt="" />
						<u-image v-else width="40" height="40" src="@/static/images/tradeExchange/rise.png" alt="" />
						<view class="num">{{formatNumber(totalCashProceeds)}}</view>
					</view>
				</view>
				<view class="reports_chart mt-[40rpx]">
					<view class="chart_head">Statistik Pendapatan</view>
					<Chart ref="reportRef"></Chart>
				</view>
			</view>
			<view class="reports_revenue">
				<view class="revenue_head mb-[40rpx]">
					<view class="revenue_title">Riwayat Pendapatan</view>
					<view class="select_revenue">
						<view class="revenue_content">
							<view class="revenue_text">{{sportsName ? sportsName : 'Semua konten'}}</view>
							<u-icon name="arrow-up" v-if="selectVal == true" color="#999999" size="28"
								@tap="selectPopup"></u-icon>
							<u-icon name="arrow-down" v-else color="#999999" size="28" @tap="selectPopup"></u-icon>
						</view>
						<selectCard :list="list" :sportsType="sportsType" v-if="selectVal"
							@selectSportsType="selectSportsType"></selectCard>
					</view>

				</view>
				<view class="revenue_card">
					<view class="revenue_label" v-for="(item,index) in cashFlowArr" :key="index">
						<view class="label_title">{{item.type_name}}</view>
						<view class="label_info">
							<view class="label_date">{{item.create_time}}</view>
							<view class="label_num">
								<u-image v-if="item.currency_type == 2" width="42" height="42"
									src="@/static/images/tradeExchange/num.png" alt="" />
								<text class="num" v-else>Rp</text>
								<text class="num augment" v-if="item.amount_received >= 0">+{{formatNumber(item.amount_received)}}</text>
								<text class="num decrease" v-if="item.amount_received < 0">{{formatNumber(item.amount_received)}}</text>
							</view>
						</view>
					</view>
					<view class="empty mt-[50rpx]" v-if="!cashFlowArr.length">
						<u-empty text="Tidak ada catatan" mode="data" icon-color="#999999" color="#999999"></u-empty>
					</view>
				</view>
			</view>
		</view>
		<toastPopup></toastPopup>
		<u-picker mode="time" :showTimeTag="false" v-model="calendarShow" :defaultTime="currentDate" :params="params" @confirm="change"></u-picker>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { filterFormat, formatNumber } from '@/utils/util'
	import { cashFlowLogList, monthReport } from '@/api/contract'
	import { onShow } from '@dcloudio/uni-app'
	import Chart from './chart.vue'
	import selectCard from './selectCard.vue'
	const createDate = ref<String>('')
	const createText = ref<String>('')
	const selectVal = ref<Boolean>(false)
	const month = ref<string>('')
	const year = ref<string>('')
	const reportRef = ref<any>(null)
	const sportsType = ref<Number>(0)
	const sportsName = ref<String>('')
	const currentDate = ref<string>('')
	const totalCashProceeds = ref<number>(0)
	const totalPointsIncome = ref<number>(0)
	const cashArr = ref<Array<any>>([])
	const integralArr = ref<Array<any>>([])
	const list = ref<Array<String | any>>([
		{ type: 0, name: 'Semua konten' },
		{ type: 1, name: 'Saldo' },
		{ type: 2, name: 'Poin' },
	])
	const cashFlowArr = ref<Array<String | any>>([])
	const getYear = () => {
		let date : any = new Date()
		let year = date.getFullYear() //获取完整的年份(4位)
		let month = date.getMonth() + 1 //获取当前月份(0-11,0代表1月)
		let day = date.getDate().toString() //获取当前日(1-31)
		currentDate.value = `${year}-${month}-${day}`
	}
	const params = ref<any>({ year: true, month: true})
	const calendarShow = ref<boolean>(false)
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
	const change = (e : any) => {
		createDate.value = e.month + '-' + e.year
		createText.value = formatMouth(e.month) + ' ' + e.year
		year.value = e.year
		month.value = e.month
		getReport()
		getlist()
	}
	const refresh = () => {
		createDate.value = ''
		createText.value = ''
		year.value = ''
		month.value = ''
		getReport()
	}
	const getlist = async () => {
		const data = await cashFlowLogList(filterFormat({ page_no: 1, page_size: 100, currencyType: sportsType.value, year: year.value, month: month.value}))
		cashFlowArr.value = data.lists
	}
	const selectPopup = () => {
		selectVal.value = !selectVal.value
	}
	const selectSportsType = (e : any) => {
		sportsType.value = e.type
		sportsName.value = e.name
		selectVal.value = !selectVal.value
		getlist()
	}
	const getReport = async () => {
		const data = await monthReport(filterFormat({ year: year.value, month: month.value }))
		totalCashProceeds.value = data ? data.extend.totalCashProceeds : 0
		totalPointsIncome.value = data ? data.extend.totalPointsIncome : 0
		const cashInfo = data ? resultFilter(data.lists,1) : {} // 现金
		const integralInfo = data ? resultFilter(data.lists,2) : {} // 积分
		cashArr.value = cashInfo.children.length ? cashInfo.children : []
		integralArr.value = integralInfo.children.length ? integralInfo.children : []
		if (reportRef.value && cashArr.value.length && integralArr.value.length) {
			reportRef.value.chartInit(cashArr.value, integralArr.value)
		}
	}
	const resultFilter = (arr: any,type: number) => {
		for (let result of arr) {
			if (result.type === type) {
				return result
			}
		}
	}
	onShow(() => {
		getReport()
		getlist()
	})
</script>

<style lang="scss" scoped>
	.reports {
		.select_date {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
			border-radius: 22rpx;
			background: #FFFFFF;

			.placeholder {
				font-family:  Arial;
				font-size: 32rpx;
				font-weight: 500;
				line-height: 48rpx;
				text-align: left;
				color: #999999;
			}

			.date {
				font-family:  Arial;
				font-size: 32rpx;
				font-weight: 500;
				line-height: 48rpx;
				text-align: left;
				color: #1E1E1E;
			}
		}

		.scroll {
			// overflow: hidden;
			// overflow-y: scroll;
			// width: 100%;
			// height: calc(100vh - 480rpx);

			.reports_card {
				padding: 40rpx;
				border-radius: 12rpx;
				background: #FFFFFF;

				.card_label {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.card_title {
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 54rpx;
						text-align: left;
						color: #999999;
					}

					.card_num {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						.num {
							margin-left: 10rpx;
							font-family:  Arial;
							font-size: 36rpx;
							font-weight: 700;
							line-height: 54rpx;
							text-align: left;
							color: #1E1E1E;
						}
					}
				}

				.reports_chart {

					.chart_head {
						font-family:  Arial;
						font-size: 32rpx;
						font-weight: 400;
						line-height: 48rpx;
						text-align: left;
						color: #000000;
					}
				}
			}

			.reports_revenue {
				padding: 40rpx;
				border-radius: 12rpx;
				background: #FFFFFF;

				.revenue_head {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.revenue_title {
						font-family:  Arial;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #1E1E1E;
					}

					.select_revenue {
						position: relative;

						.revenue_content {
							display: flex;
							justify-content: space-between;
							align-items: center;
							width: 275rpx;
							padding: 20rpx;
							border-radius: 12rpx;
							background: #F4F4F4;

							.revenue_text {
								margin-right: 20rpx;
								font-family:  Arial;
								font-size: 26rpx;
								font-weight: 500;
								line-height: 48rpx;
								text-align: left;
								color: #999999;
							}
						}
					}

				}

				.revenue_card {

					.revenue_label {
						margin-bottom: 20rpx;
						border-bottom: 2rpx solid #E6E6E6;

						.label_title {
							margin-bottom: 20rpx;
							font-family:  Arial;
							font-size: 28rpx;
							font-weight: 700;
							line-height: 40rpx;
							text-align: left;
							color: #1E1E1E;
						}

						.label_info {
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding-bottom: 20rpx;

							.label_date {
								font-family:  Arial;
								font-size: 26rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: left;
								color: #999999;
							}

							.label_num {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.num {
									margin-left: 5rpx;
									font-family:  Arial;
									font-size: 32rpx;
									font-weight: 700;
									line-height: 48rpx;
									text-align: right;
								}

								.augment {
									color: #00B01A;
								}

								.decrease {
									color: #EF0000;
								}
							}
						}
					}

					.revenue_label:last-child {
						margin-bottom: 0;
						border-bottom: 0;
					}
				}
			}
		}
	}
</style>
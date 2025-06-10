<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="820" src="@/static/images/page/contractGroup.png"></u-image>
		</view>
		<view class="contact mt-[50rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false"
					:back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					:title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
					<view class="slot-wrap">
						<view class="forget_head" :style="{color:scrollTop ? '#1E1E1E' : '#FFFFFF'}">
							MANAJEMEN KONTRAK
						</view>
					</view>
				</u-navbar>
			</u-sticky>
			<view class="select_date mb-[200rpx] mx-[30rpx]" @click="calendarShow = true">
				<view class="select_info">
					<u-image width="40" height="40" src="@/static/images/icon/select_date.png" alt="" />
					<view class="date" v-if="createDate">{{createText}}</view>
					<view class="placeholder" v-else>Pilih Tanggal</view>
				</view>
				<view class="select_search">
					<view class="select_line"></view>
					<view class="search_text" v-if="createDate" @click.stop="refresh">Batal</view>
					<view class="search_text" v-else>Cari</view>
				</view>
			</view>
			<view class="contact_card">
				<u-image width="750" height="407" src="@/static/images/page/contract_popup.png" alt="" />
				<view class="contact_box px-[30rpx]">
					<view class="nav_content">
						<view class="nav_label" @tap="changeTab(item.state)"
							:style="{color: item.state == active ? '#458060' : '#FFFFFF'}"
							v-for="(item,index) in navArr" :key="index">
							<view class="nav_name">
								{{item.name}}
							</view>
						</view>
					</view>
					<view class="nav_active mb-[40rpx]">
						<view class="active"
							:style="{left: active == 0 ? '0%' :active == 1 ? '34%' :active == 2 ? '65%' : '100%'}">
						</view>
					</view>
					<view class="contact_scroll pt-[5rpx]">
						<view class="scroll_head mx-[10rpx]">Investasi Stabil, Imbal Hasil Efisien</view>
						<view class="scroll mb-[20rpx] pt-[20rpx] pb-[20rpx]">
						<scroll-view scroll-y :refresher-enabled="true" :refresher-triggered="isRefreshing"
							:lower-threshold="40" @refresherrefresh="onRefresh" @scrolltolower="onScrollToLower"
							:refresher-threshold="40" refresher-background="transparent" refresher-default-style="none"
							style="height: 900rpx;">
							<template v-if="isRefreshing" #refresher>
								<u-loadmore icon-type="flower" status="loading" color="#8B9098" />
							</template>
							<view class="list_card" :class="e.state == 1 ? 'release':'sign'" v-for="(e,index) in list" :key="index">
								<view class="list_title">{{e.title_name}}</view>
								<view class="list_line"></view>
								<view class="list_info">
									<view class="rebate">
										<view class="rebate_label">
											<view class="num">100.000.000</view>
											<view class="title">Poin Investasi</view>
										</view>
										<view class="rebate_label">
											<view class="date">{{e.create_date}}</view>
											<view class="title">Tanggal Kontrak</view>
										</view>
									</view>
									<view class="serial">
										<view class="serial_title">No. Kontrak</view>
										<view class="serial_number">RIC98879990666888</view>
									</view>
								</view>
								<view class="list_image">
									<u-image v-if="e.state == 1" width="170" height="170" src="@/static/images/icon/release_icon.png" alt="" />
									<u-image v-else width="170" height="170" src="@/static/images/icon/sign_icon.png" alt="" />
								</view>
								<view class="list_model">
									<view class="model_box">
										<u-image width="61" height="95" src="@/static/images/icon/icon_days.png" alt="" />
										<view class="day_info">
											<view class="day_title mt-[5rpx]">Hari</view>
											<view class="day_title">Investasi</view>
											<view class="daya_num">30</view>
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

			</view>
			<u-picker mode="time" :showTimeTag="false" v-model="calendarShow" :defaultTime="currentDate"
				:params="params" @confirm="change"></u-picker>
			<toastPopup></toastPopup>	
		</view>
	</view>

</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onLoad, onPageScroll, onShow } from '@dcloudio/uni-app'
	import { myContractLogList } from '@/api/contract'
	import { filterFormat, formatNumber } from '@/utils/util'
	import { emitter } from '@/utils/emitter';
	const scrollTop = ref<number>(0)
	const date = ref<String>('')
	const active = ref<Number>(0)
	const createDate = ref<String>('')
	const createText = ref<String>('')
	const calendarShow = ref<boolean>(false)
	const currentDate = ref<string>('')
	const currentPage = ref(1)
	const isRefreshing = ref(false)
	const isTotal = ref<boolean>(false)
	const list = ref<Array<String | any>>([])
	const status = ref('loadmore'); //loadmore 加载前  loading 加载中  nomore 没有更多了
	const navArr = ref<Array<String | any>>([
		{ state: 0, name: 'Semua' },
		{ state: 1, name: 'Terdaftar' },
		{ state: 2, name: 'Penghentian' }
	])
	const getYear = () => {
		let date : any = new Date()
		let year = date.getFullYear() //获取完整的年份(4位)
		let month = date.getMonth() + 1 //获取当前月份(0-11,0代表1月)
		let day = date.getDate().toString() //获取当前日(1-31)
		currentDate.value = `${year}-${month}-${day}`
	}
	const params = ref<any>({ year: true, month: true })
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
		emitter.emit('gifType')
		try {
			const page =  currentPage.value
			const data : any = await myContractLogList(filterFormat({ page_no: page, page_size: pageSize, state: active.value == 1 ? 0 : active.value == 2 ? 1 : null, createDate: createDate.value}))
	
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
	const changeTab = (state : Number) => {
		active.value = state
		loadData(true)
	}

	const formatMouth = (num : string) => {
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
		list.value = []
		loadData(true)
	}
	const refresh = () => {
		createDate.value = ''
		createText.value = ''
		loadData(true)
	}
	onLoad(() => {
		loadData(true)
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

		.contact {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.slot-wrap {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;

				.forget_head {
					padding: 20rpx;
					font-family: Arial;
					font-size: 32rpx;
					font-weight: 700;
					line-height: 40rpx;
					text-align: center;
				}
			}

			.select_date {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 40rpx;
				border-radius: 12rpx;
				background: #FFFFFF;

				.select_info {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.placeholder {
						margin-left: 20rpx;
						font-family: Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #C3C6CB;
					}

					.date {
						margin-left: 20rpx;
						font-family: Arial;
						font-size: 28rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #1E1E1E;
					}
				}

				.select_search {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.select_line {
						margin-right: 15rpx;
						width: 3rpx;
						height: 30rpx;
						background: #458060;
					}

					.search_text {
						font-family: Arial;
						font-weight: 400;
						font-size: 26rpx;
						line-height: 40rpx;
						color: #458060;
					}
				}
			}

			.contact_card {
				position: relative;
				border-top-left-radius: 18rpx;
				border-top-right-radius: 18rpx;

				.contact_box {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					border-top-left-radius: 18rpx;
					border-top-right-radius: 18rpx;

					.nav_content {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 20rpx 0;

						.nav_label {
							flex: 1;
							z-index: 100;

							.nav_name {
								font-family: Arial;
								font-size: 28rpx;
								font-weight: 500;
								line-height: 48rpx;
								text-align: center;
							}
						}

					}

					.nav_active {
						position: relative;
						height: 4rpx;
						background: #FFFFFF;

						.active {
							position: absolute;
							top: 0;
							transition: all 0.5s;
							width: 246rpx;
							height: 4rpx;
							background: #458060;
							z-index: 99;
						}
					}
					.contact_scroll{
						border-radius: 12rpx;
						background: #FFFFFF;
						.scroll_head{
							padding: 20rpx 40rpx;
							border-top-left-radius: 12rpx;
							border-top-right-radius: 12rpx;
							background: linear-gradient(360deg, #FFFFFF 45.02%, #C7E1C9 121.61%);
							font-family: Arial;
							font-weight: 400;
							font-size: 32rpx;
							line-height: 44rpx;
							color: #5FA76E;
						}
						.scroll {
							overflow: hidden;
							height: 950rpx;
							padding: 20rpx;
							.list_card {
								position: relative;
								margin-bottom: 10rpx;
								padding: 20rpx 40rpx;
								border-radius: 12rpx;
						
								&.sign {
									background: #FFF8E9;
								}
						
								&.release {
									background: #DEEDDE;
								}
						
								.list_title {
									width: 480rpx;
									height: 96rpx;
									margin-bottom: 10rpx;
									font-family: Arial;
									font-size: 32rpx;
									font-weight: 700;
									line-height: 48rpx;
									text-align: left;
									color: #458060;
								}
								.list_line{
									width: 480rpx;
									height: 2rpx;
									background: #666666;
								}
								.list_info {
									width: 450rpx;
									.rebate {
										display: flex;
										justify-content: space-between;
										align-items: center;
										.rebate_label{
											padding: 20rpx 0;
											.num {
												font-family: Arial;
												font-size: 24rpx;
												font-weight: 700;
												line-height: 40rpx;
												text-align: left;
												color: #1E1E1E;
											}
											.date{
												font-family: Arial;
												font-size: 24rpx;
												font-weight: 400;
												line-height: 40rpx;
												text-align: left;
												color: #1E1E1E;
											}
											.title {
												font-family: Arial;
												font-size: 20rpx;
												font-weight: 400;
												line-height: 40rpx;
												text-align: left;
												color: #999999;
											}
										}
									}
									.serial{
										display: flex;
										justify-content: space-between;
										align-items: center;
										width: 480rpx;
										height: 44rpx;
										padding: 0 10rpx;
										border: 1px solid #666666;
										.serial_title{
											font-family: Arial;
											font-weight: 400;
											font-size: 20rpx;
											line-height: 44rpx;
											text-align: left;
											color: #666666;
										}
										.serial_number{
											font-family: Arial;
											font-weight: 400;
											font-size: 20rpx;
											line-height: 44rpx;
											text-align: right;
											color: #1E1E1E;
										}
									}
								}
						
								.list_image {
									position: absolute;
									bottom: 0;
									right: 0;
									z-index: 98;
								}
								.list_model{
									position: absolute;
									 top: 0;
									 right: 50rpx;
									 z-index: 98;
									 .model_box{
										 position: relative;
										 .day_info{
											 position: absolute;
											 top: 0;
											 left: 0;
											 width: 100%;
											 .day_title{
												 font-family: Arial;
												 font-weight: 400;
												 font-size: 12rpx;
												 line-height: 20rpx;
												 text-align: center;
												 color: #000000;
											 }
											 .daya_num{
												 font-family: Arial;
												 font-weight: 400;
												 font-size: 28rpx;
												 line-height: 25rpx;
												 text-align: center;
												 color: #000000;
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
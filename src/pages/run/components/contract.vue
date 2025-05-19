<template>
	<view class="contact pt-[20rpx] px-[40rpx]">
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
		<view class="tabs_content mb-[20rpx]">
			<view class="tabs_label" @tap="changeTab(item.state)"
				:style="{color: item.id == active ? '#0067E0' : '#999999'}" v-for="(item,index) in list" :key="index">
				<view class="tabs_name">
					{{item.name}}
				</view>
			</view>
			<view class="active" :style="{left: active == 0 ? '3%' :active == 1 ? '35%' :active == 2 ? '66%' : '100%'}">
			</view>
		</view>
		<view class="scroll">
			<view class="list_card sign" :class="e.state == 1 ? 'release':'sign'" v-for="(e,index) in contractArr" :key="index">
				<view class="list_title">{{e.title_name}}</view>
				<view class="list_info">
					<view class="rebate">Rasio pelepasan poin harian：<text class="num">{{formatNumber(e.points_rebate)}}%</text></view>
					<view class="date">{{e.create_time}}</view>
				</view>
				<view class="list_image">
					<u-image  v-if="e.state == 1" width="216" height="216" src="@/static/images/icon/release_icon.png" alt="" />
					<u-image v-else width="216" height="216" src="@/static/images/icon/sign_icon.png" alt="" />
				</view>
			</view>
			<view class="empty mt-[50rpx]" v-if="!contractArr.length">
				<u-empty text="Tidak ada catatan" mode="data" icon-color="#999999" color="#999999"></u-empty>
			</view>
		</view>
		<toastPopup></toastPopup>
		<u-picker mode="time" :showTimeTag="false" v-model="calendarShow" :defaultTime="currentDate" :params="params"  @confirm="change"></u-picker>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import { myContractLogList } from '@/api/contract'
	import { filterFormat, formatNumber } from '@/utils/util'
	const date = ref<String>('')
	const active = ref<Number>(0)
	const createDate = ref<String>('')
	const createText = ref<String>('')
	const calendarShow = ref<boolean>(false)
	const currentDate = ref<string>('')
	const contractArr = ref<Array<String | any>>([])
	const list = ref<Array<String | any>>([
		{
			state: 0,
			name: 'Semua konten'
		},
		{
			state: 1,
			name: 'Terdaftar'
		},
		{
			state: 2,
			name: 'Penghentian'
		}
	])
	const getYear = () => {
		let date : any = new Date()
		let year = date.getFullYear() //获取完整的年份(4位)
		let month = date.getMonth() + 1 //获取当前月份(0-11,0代表1月)
		let day = date.getDate().toString() //获取当前日(1-31)
		currentDate.value = `${year}-${month}-${day}`
	}
	const params = ref<any>({year: true,month: true})
	const getlist = async () => {
		const data = await myContractLogList(filterFormat({page_no:1, page_size: 100, state: active.value == 1 ? 0 : active.value == 2 ? 1 : null,createDate: createDate.value}))
		contractArr.value = data.lists
	}
	const changeTab = (state : Number) => {
		active.value = state
		getlist()
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
	const change = (e : any) => {
		createDate.value = e.month + '-' + e.year
		createText.value = formatMouth(e.month) + ' ' + e.year
		getlist()
	}
	const refresh = () => {
		createDate.value = ''
		createText.value = ''
		getlist()
	}
	onShow(()=>{
		getlist()
	})
</script>

<style lang="scss" scoped>
	.contact {
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

		.tabs_content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 20rpx;
			border-radius: 22rpx;
			background: #FFFFFF;
			position: relative;

			.tabs_label {
				flex: 1;
				z-index: 100;

				.tabs_name {
					font-family:  Arial;
					font-size: 28rpx;
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
				width: 210rpx;
				height: 80rpx;
				border-radius: 15rpx;
				color: #0067E0;
				background: #DBEBFF;
				z-index: 99;
			}
		}

		.scroll {
			// overflow: hidden;
			// overflow-y: scroll;
			// width: 100%;
			// height: calc(100vh - 600rpx);
			.list_card {
				position: relative;
				margin-bottom: 10rpx;
				padding: 40rpx;
				border-radius: 12rpx;

				&.sign {
					background: #FFFFFF;
				}

				&.release {
					background: #EFF2F5;
				}

				.list_title {
					margin-bottom: 20rpx;
					font-family:  Arial;
					font-size: 32rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: left;
					color: #0067E0;
				}

				.list_info {
					.rebate {
						font-family:  Arial;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #999999;

						.num {
							font-family:  Arial;
							font-size: 28rpx;
							font-weight: 700;
							line-height: 40rpx;
							text-align: left;
							color: #1E1E1E;
						}
					}

					.date {
						display: inline-block;
						margin-top: 20rpx;
						padding: 8rpx 20rpx;
						border-radius: 8rpx;
						background: #F1F7FF;
						font-family:  Arial;
						font-size: 26rpx;
						font-weight: 500;
						line-height: 40rpx;
						text-align: left;
						color: #1E1E1E;
					}
				}

				.list_image {
					position: absolute;
					bottom: 0;
					right: 0;
				}
			}
		}

	}
</style>
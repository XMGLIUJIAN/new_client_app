<template>
	<view class="state pb-[40rpx]">
		<view class="state_con px-[30rpx]">
			<view class="state_card px-[30rpx] pb-[30rpx] pt-[30rpx]">
				<view class="card_left">
					<view class="card_num">
						{{formatNumber(userInfo.user_money)}}
					</view>
					<view class="card_text">
						Saldo
					</view>
				</view>
			</view>
			<view class="state_list mt-[20rpx]">
				<view class="state_Item  pt-[20rpx]  pb-[20rpx]" v-for="(item,index) in stateArr" :key="index">
					<view class="state_head">
						<view class="state_title">PENARIKAN</view>
						<view class="state_num">{{formatNumber(item.withdrawal_amount)}}</view>
					</view>
					<view class="state_foot mt-[10rpx]">
						<view class="state_time">{{item.create_time}}</view>
						<view class="state_status" :class="getState(item.state)">{{getStatus(item.state)}}</view>
					</view>
				</view>
				<view class="empty mt-[50rpx]" v-if="!stateArr.length">
					<u-empty text="Tidak ada catatan" mode="data" icon-color="#999999" color="#999999"></u-empty>
				</view>
			</view>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { ref, reactive } from 'vue'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import { formatNumber } from '@/utils/util'
	import { withdrawalLog } from '@/api/recharge'
	import { onShow } from '@dcloudio/uni-app'
	const userStore = useUserStore()
	const { userInfo } = storeToRefs(userStore)
	const stateArr = ref<Array<any>>([])
	const getStatus = (status: any) => {
		let state = ''
		switch(status){
			case 0:
			    state = 'Sedang Ditinjau'
			    break;
			case 1:
			    state = 'Dalam Proses'
			    break;
			case 2:
			    state = 'Sukses'
			    break;
			case 3:
			    state = 'Gagal'
			    break;
		}
		return state
	}
	const getState = (status: any) => {
		let state = ''
		switch(status){
			case 0:
			    state = 'audit'
			    break;
			case 1:
			    state = 'remit'
			    break;
			case 2:
			    state = 'success'
			    break;
			case 3:
			    state = 'fail'
			    break;
		}
		return state
	}
	const getList = async () => {
		const data = await withdrawalLog({page_no: 1, page_size: 2000})
		stateArr.value = data.lists
	}
	onShow(()=> {
		userStore.getUser()
		getList()
	})
</script>

<style lang="scss" scoped>
	.state {
		.state_con {
			margin-top: 20rpx;

			.state_card {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-radius: 12rpx;
				background: linear-gradient(270.01deg, #FFFFFF 29.05%, #C7E1C9 111.86%);

				.card_left {
					.card_num {
						font-family:  Arial;
						font-size: 48rpx;
						font-weight: 700;
						line-height: 64rpx;
						text-align: left;
						color: #1E1E1E;
					}

					.card_text {
						font-family:  Arial;
						font-size: 30rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #A0A3A9;
					}
				}

			}

			.state_list {
				padding: 30rpx;
				border-radius: 12rpx;
				background: #FFFFFF;

				.state_Item {
					border-bottom: 2rpx solid #D7D7D7;
					.state_head {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.state_title {
							font-family:  Arial;
							font-size: 32rpx;
							font-weight: 400;
							line-height: 48rpx;
							text-align: left;
							color: #1E1E1E;
						}

						.state_num {
							font-family:  Arial;
							font-size: 36rpx;
							font-weight: 400;
							line-height: 48rpx;
							text-align: right;
							color: #1E1E1E;
						}
					}
					.state_foot {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.state_time {
							font-family:  Arial;
							font-size: 24rpx;
							font-weight: 500;
							line-height: 40rpx;
							text-align: left;
							color: #A0A3A9;
						}

						.state_status {
							padding: 2rpx 18rpx;
							border-radius: 6rpx;
							font-family:  Arial;
							font-size: 24rpx;
							font-weight: 500;
							text-align: left;
							color: #FFFFFF;
							&.audit{
								background: #ECB54B;
							}
							&.remit{
								background: #C8C9CC;
							}
							&.fail{
								background: #EC4A32;
							}
							&.success{
								background: #458060;
							}
						}
					}
				}
			}
		}
	}
</style>
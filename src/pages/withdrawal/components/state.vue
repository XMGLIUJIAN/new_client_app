<template>
	<view class="state pb-[40rpx]">
		<view class="state_con mx-[30rpx]">
            <u-image width="100%" height="171" class="z-10" src="@/static/images/withdrawal/setGroup.png"></u-image>
			<view class="state_card pb-[30rpx] pt-[30rpx]">
				<view class="card_left px-[30rpx]">
                    <view class="card_title">Total Penarikan (Rp)</view>
					<view class="card_num mt-[20rpx]">
						{{formatNumber(userInfo.user_money)}}
					</view>
				</view>
                <view class="state_list mx-[30rpx]">
                    <view class="state_Item" v-for="(item,index) in stateArr" :key="index">
                        <view class="state_head">
                            <u-image width="60" height="60" src="@/static/images/withdrawal/card_icon_red.png" alt="" />
                            <view>
                                <view class="state_title">Penarikan</view>
                                <view class="state_time">{{item.create_time}}</view>
                            </view>
                        </view>
                        <view class="state_foot mt-[10rpx]">
                            <u-image class="state_foot_icon" width="155" height="155" src="@/static/images/withdrawal/state_icon_red.png" alt="" />
                            <view class="state_num">Rp {{formatNumber(item.withdrawal_amount)}}-{{item.state}}</view>
                        </view>
                    </view>
                    <view class="empty mt-[50rpx]" v-if="!stateArr.length">
                        <u-image width="462" height="291" src="@/static/images/icon/empty.png" alt="" />
                        <view class="empty_text">Tidak Ada Catatan</view>
                    </view>
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
            position: relative;

			.state_card {
                background: #FFFFFF;
                position: absolute;
                width: 100%;
                left: 0;
                top: 0;
				display: flex;
                flex-direction: column;
				justify-content: space-between;
				border-radius: 12rpx;

				.card_left {
                    z-index: 10;
                    .card_title {
                        font-family:  Arial;
                        font-size: 28rpx;
                        font-weight: 700;
                        color: #1E1E1E;
                    }
					.card_num {
						font-family:  Arial;
						font-size: 48rpx;
						font-weight: 700;
						line-height: 74rpx;
						text-align: left;
						color: #1E4B2E;
					}
				}

			}

			.state_list {
				.state_Item {
					border-bottom: 2rpx solid #D7D7D7;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
					.state_head {
						display: flex;
						justify-content: space-between;
						align-items: center;
                        :first-child {
                            margin-right: 20rpx;
                        }

						.state_title {
							font-family:  Arial;
							font-size: 32rpx;
							font-weight: 400;
							line-height: 48rpx;
							text-align: left;
							color: #1E1E1E;
						}

                        .state_time {
                            font-family:  Arial;
                            font-size: 20rpx;
                            line-height: 40rpx;
                            text-align: left;
                            color: #A0A3A9;
                        }
					}
					.state_foot {
						display: flex;
						justify-content: space-between;
						align-items: center;
                        .state_foot_icon{
                            margin-right: -60rpx;
                        }
                        .state_num {
                            font-family:  Arial;
                            font-size: 34rpx;
                            font-weight: 700;
                            line-height: 48rpx;
                            text-align: right;
                            color: #1E1E1E;
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

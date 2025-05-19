<template>
	<view class="program mx-[40rpx] mt-[20rpx] mb-[120rpx] pt-[20rpx] pb-[20rpx]">
		<view class="program_head">
			<view class="program_title">Program Cepat Untung</view>
			<view class="program_tips">Lepaskan Dua kali Lipat</view>
		</view>
		<view class="program_box mt-[20rpx] mx-[20rpx]" v-for="(item,index) in list" :key="index"
			@tap="navigateAuth('/pages/investment/investment?id='+item.id)">
			<view class="program_box_head mb-[20rpx]">
				<view class="program_box_info">
					<view class="program_box_state" :class="getState(item.total_days)">{{item.name}}</view>
					<view class="program_box_title ml-[10rpx]">{{item.tag}}</view>
				</view>
				<view class="program_box_day">{{item.total_days}}Hari</view>
			</view>
			<view class="program_box_foot">
				<view class="program_box_num"><text class="unit">Rp</text>{{formatNumber(item.total_amount)}}</view>
				<view class="program_btn_sign" v-if="item.status == 1">TERSEDIA</view>
				<view class="program_btn_signed" v-else-if="item.status == 2">DIBELI</view>
				<view class="program_btn_detail" v-else>DETAIL</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { formatNumber } from '@/utils/util'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	const props = withDefaults(defineProps<{
		list : any
	}>(), {
		list: []
	})
	const userStore = useUserStore()
	const { userInfo, isLogin } = storeToRefs(userStore)
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
	const navigateAuth = (url : string) => {
		isLogin.value ? navigateTo(url) : navigateTo('/pages/login/login')
	}
</script>

<style lang="scss" scoped>
	.program {
		border-radius: 16rpx;
		background: #FFFFFF;

		.program_head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;

			.program_title {
				font-family: Source Han Sans CN;
				font-weight: 500;
				font-size: 28rpx;
				line-height: 48rpx;
				color: #000000;
			}

			.program_tips {
				padding: 10rpx;
				border-radius: 8rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				font-size: 22rpx;
				line-height: 40rpx;
				color: #EF0000;
				background: #FFEAEA;
			}
		}

		.program_box {
			padding: 20rpx;
			border-radius: 12rpx;

			.program_box_head {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.program_box_info {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.program_box_state {
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

					.program_box_title {
						font-family: Source Han Sans CN;
						font-weight: 500;
						font-size: 24rpx;
						line-height: 48rpx;
						text-align: center;
						color: #000000;
					}
				}

				.program_box_day {
					padding: 8rpx 14rpx;
					border-radius: 4rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					font-size: 22rpx;
					line-height: 24rpx;
					text-align: center;
					color: #0067E0;
					background: #DBEBFF;
				}
			}

			.program_box_foot {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;

				.program_box_num {
					font-family: SimHei;
					font-weight: 700;
					font-size: 42rpx;
					text-align: left;
					line-height: 60rpx;
					color: #EF0000;

					.unit {
						margin-right: 5rpx;
						font-family: SimHei;
						font-weight: 700;
						font-size: 42rpx;
						text-align: left;
						line-height: 60rpx;
						color: #EF0000;
					}
				}


				.program_btn_sign {
					padding: 6rpx 22rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					font-size: 26rpx;
					line-height: 40rpx;
					color: #FFFFFF;
					border-radius: 10rpx;
					background: linear-gradient(270deg, #5693FF 0%, #0067E0 100%);
				}

				.program_btn_signed {
					padding: 6rpx 22rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					font-size: 26rpx;
					line-height: 40rpx;
					color: #0067E0;
					border-radius: 10rpx;
					background: #D7E5FF;
				}

				.program_btn_detail {
					padding: 6rpx 22rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					font-size: 26rpx;
					line-height: 40rpx;
					color: #0067E0;
					border-radius: 10rpx;
					border: 2rpx solid #0067E0;
				}

			}
		}

		.program_box:nth-of-type(odd) {
			background: #F4F5F7;
		}

		.program_box:nth-of-type(even) {
			background: #F6FAFF;
		}
	}
</style>
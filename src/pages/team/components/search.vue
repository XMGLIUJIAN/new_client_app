<template>
	<view class="search" v-if="show" @tap="cancelPopup">
		<view class="search_con">
			<view class="search_card">
				<view class="card_info">
					<view class="userInfo">
						<view class="nickname">{{searchInfo.nickname}}</view>
						<view class="account">Nomor HP：{{searchInfo.account}}</view>
					</view>
					<view class="group">
						<u-image width="208" height="64" src="@/static/images/user/group.png" alt="" />
						<view class="level" v-if="searchInfo.identity">Level {{searchInfo.identity}}</view>
						<view class="normal" v-else>Biasa</view>
					</view>
				</view>
				<view class="search_line"></view>
<!--				<view class="search_areas">-->
<!--					<view class="areas_title">Wilayah Sawah Terinvestasi:</view>-->
<!--					<view class="areas_text">{{searchInfo.contract_name}}</view>-->
<!--				</view>-->
				<view class="search_number mb-[40rpx]">
					<view class="number_row">
						<view class="number_title">Total Investasi</view>
						<view class="number_amount">{{formatNumber(searchInfo.my_total_investment)}}</view>
					</view>
					<view class="number_row">
						<view class="number_title">Poin</view>
						<view class="number_amount">{{formatNumber(searchInfo.user_integral)}}</view>
					</view>
				</view>
				<view class="search_number mt-[40rpx] mb-[40rpx]">
					<view class="number_row">
						<view class="number_title">Jumlah Anggota</view>
						<view class="number_text">{{formatNumber(searchInfo.team_size)}}</view>
					</view>
					<view class="number_row">
						<view class="number_title">Pendapatan Tim</view>
						<view class="number_num">Rp {{formatNumber(searchInfo.team_total_income)}}</view>
					</view>
				</view>
				<view class="search_hisher">
					<view class="hisher_title">Pendapatan Anda:</view>
					<view class="hisher_text">{{formatNumber(searchInfo.my_income)}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { formatNumber } from '@/utils/util'
	import { onLoad } from '@dcloudio/uni-app'
	const emit = defineEmits(['cancel']);
	const props = defineProps({
		show:{
			type: Boolean,
			default: false
		},
		searchInfo: {
			type: Object,
			default: {}
		}
	})
	const cancelPopup = () => {
		emit('cancel');
	}
</script>

<style lang="scss" scoped>
	.search {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		z-index: 999;


		.search_con {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			.search_card {
				position: relative;
				padding: 40rpx;
				border-radius: 12rpx;
				background: #FFFFFF;

				.card_info {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.userInfo {
						.nickname {
							font-family:  Arial;
							font-size: 34rpx;
							font-weight: 700;
							line-height: 48rpx;
							text-align: left;
							color: #1E1E1E;
						}

						.account {
							font-family:  Arial;
							font-size: 24rpx;
							font-weight: 500;
							line-height: 48rpx;
							text-align: left;
							color: #8B9098;
						}
					}

					.group {
						position: relative;
						top: 0;
						left: 40rpx;

						.level {
							display: flex;
							justify-content: flex-end;
							align-items: center;
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							padding: 0 20rpx;
							font-family:  Arial;
							font-size: 28rpx;
							font-weight: 700;
							line-height: 40rpx;
							color: #1E1E1E;
						}

						.normal{
							display: flex;
							justify-content: flex-end;
							align-items: center;
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							padding: 0 20rpx;
							font-family:  Arial;
							font-size: 28rpx;
							font-weight: 700;
							line-height: 40rpx;
							color: #1E1E1E;
						}
					}
				}

				.search_line {
					margin: 20rpx 0;
					height: 2rpx;
					background: #D7D7D7;
				}

				.search_areas {
					margin-bottom: 20rpx;

					.areas_title {
						font-family:  Arial;
						font-size: 26rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #8B9098;
					}

					.areas_text {
						font-family:  Arial;
						font-size: 28rpx;
						font-weight: 700;
						line-height: 48rpx;
						text-align: left;
						color: #1E1E1E;
					}
				}

				.search_number {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.number_row {
						.number_title {
							font-family:  Arial;
							font-size: 26rpx;
							font-weight: 500;
							line-height: 48rpx;
							text-align: left;
							color: #8B9098;
						}

						.number_text {
							font-family:  Arial;
							font-size: 32rpx;
							font-weight: 700;
							line-height: 48rpx;
							text-align: left;
							color: #1E1E1E;
						}
						.number_num{
							font-family:  Arial;
							font-size: 32rpx;
							font-weight: 700;
							line-height: 48rpx;
							text-align: right;
							color: #1E1E1E;
						}
						.number_amount {
							font-family:  Arial;
							font-size: 32rpx;
							font-weight: 700;
							line-height: 48rpx;
							text-align: left;
							color: #275534;
						}
					}
				}

				.search_hisher {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx;
					border-radius: 12rpx;
					background: linear-gradient(90deg, #92BEAB 0%, #26815A 100%);

					.hisher_title {
						font-family:  Arial;
						font-size: 26rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #FFFFFF;
					}

					.hisher_text {
						font-family:  Arial;
						font-size: 36rpx;
						font-weight: 700;
						line-height: 48rpx;
						text-align: right;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>

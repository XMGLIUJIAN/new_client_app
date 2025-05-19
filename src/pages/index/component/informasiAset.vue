<template>
	<view class="article mx-[40rpx] px-[20rpx] pt-[20rpx] pb-[20rpx]">
		<view class="flex items-center article-title text-lg font-medium">
			Informasi Aset
		</view>
		<view class="pointCard mt-[20rpx]">
			<view class="point_con mb-[20rpx]">
				<view class="point_label">
					<view class="label_head">
						<u-image width="48" height="48" src="@/static/images/pageStyle/Frame01.png"></u-image>
						<view class="label_title">PoinKu</view>
					</view>
					<view class="label_foot">
						<view class="label_num">{{formatNumber(incomeInfo.myPoints) || 0}}</view>
					</view>
				</view>
				<view class="point_label">
					<view class="label_head">
						<u-image width="48" height="48" src="@/static/images/pageStyle/Frame02.png"></u-image>
						<view class="label_title">Dividen</view>
					</view>
					<view class="label_foot">
						<view class="label_num">{{formatNumber(incomeInfo.rebateIncome) || 0}}</view>
						<view class="augment" v-if="incomeInfo.rebateIncomeToDay > 0">
							+{{formatNumber(incomeInfo.rebateIncomeToDay)}}</view>
						<view class="decrease" v-if="incomeInfo.rebateIncomeToDay < 0">
							{{formatNumber(incomeInfo.rebateIncomeToDay)}}</view>
					</view>
				</view>
			</view>
			<view class="point_con">
				<view class="point_label">
					<view class="label_head">
						<u-image width="48" height="48" src="@/static/images/pageStyle/Frame03.png"></u-image>
						<view class="label_title">Distribusi</view>
					</view>
					<view class="label_foot">
						<view class="label_num">
							{{formatNumber(incomeInfo.distributionIncome) || 0}}</view>
						<view class="augment" v-if="incomeInfo.distributionIncomeToDay > 0">
							+{{formatNumber(incomeInfo.distributionIncomeToDay)}}</view>
						<view class="decrease" v-if="incomeInfo.distributionIncomeToDay < 0">
							{{formatNumber(incomeInfo.distributionIncomeToDay)}}</view>
					</view>
				</view>
				<view class="point_label">
					<view class="label_head">
						<u-image width="48" height="48" src="@/static/images/pageStyle/Frame04.png"></u-image>
						<view class="label_title">Komunitas</view>
					</view>
					<view class="label_foot">
						<view class="label_num">{{formatNumber(incomeInfo.teamTotalIncome) || 0}}
						</view>
						<view class="augment" v-if="incomeInfo.teamTotalIncomeToDay > 0">
							+{{formatNumber(incomeInfo.teamTotalIncomeToDay)}}</view>
						<view class="decrease" v-if="incomeInfo.teamTotalIncomeToDay < 0">
							{{formatNumber(incomeInfo.teamTotalIncomeToDay)}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref, watch } from 'vue';
	import { formatNumber } from '@/utils/util'
	const incomeInfo = ref<any>({})
	const props = defineProps({
		informa: {
			type: Object,
			default: () => {}
		}
	})
	watch(
		() => props.informa,
		(value) => {
			incomeInfo.value = value
		}, 
		{ deep: true }
	)
</script>

<style lang="scss" scoped>
	.article {
		border-radius: 20rpx;
		background: #FFFFFF;
	
		.article-title {
			color: #333333;
			font-family:  Arial;
			font-weight: 700;
			font-size: 32rpx;
	
			&::before {
				content: '';
				width: 6rpx;
				height: 30rpx;
				display: block;
				margin-right: 10rpx;
				background: #0067E0;
			}
		}
	
		.pointCard {
			background: #FFFFFF;
			border-radius: 12rpx;
	
			.point_con {
				display: flex;
				justify-content: space-between;
				align-items: center;
	
				.point_label {
					width: 300rpx;
					height: 160rpx;
					padding: 20rpx;
					border-radius: 18rpx;
					background: linear-gradient(105.88deg, #DBEBFF 0%, #F1F7FF 100%);
	
					.label_head {
						display: flex;
						justify-content: flex-start;
						align-items: center;
	
						.label_title {
							margin-left: 10rpx;
							font-family:  Arial;
							font-size: 26rpx;
							font-weight: 700;
							line-height: 40rpx;
							text-align: left;
							color: #1E1E1E;
						}
					}
	
					.label_foot {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin: 10rpx 0;
	
						.label_num {
							font-family:  Arial;
							font-size: 32rpx;
							font-weight: 700;
							line-height: 48rpx;
							text-align: left;
							color: #1E1E1E;
						}
	
						.augment {
							font-family:  Arial;
							font-size: 30rpx;
							font-weight: 700;
							line-height: 48rpx;
							text-align: left;
							color: #B40000;
						}
	
						.decrease {
							font-family:  Arial;
							font-size: 30rpx;
							font-weight: 700;
							line-height: 48rpx;
							text-align: left;
							color: #00B01A;
						}
					}
	
				}
			}
		}
	}
</style>
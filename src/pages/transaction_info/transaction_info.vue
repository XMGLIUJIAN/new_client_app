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
						<view class="label_text">20.000.000.000</view>
					</view>
					<view class="card_label">
						<view class="label_title">Pion</view>
						<view class="label_text">20.000.000.000</view>
					</view>
					<view class="card_date">
						<u-image width="193" height="172" src="@/static/images/page/card_date.png"></u-image>
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
				<view class="transaction_investasi">
					<view class="investasi_head">Pelepasan Investasi Harian</view>
					<view class="investasi_line"></view>
					<view class="investasi_foot">
						<view class="foot_date">09-05-2025 05:15:23</view>
						<view class="foot_piont">
							<view class="point_title">Pion</view>
							<view class="point_text increase">+100.000</view>
						</view>
					</view>
					<view class="investasi_tip increase"></view>
				</view>
				<view class="transaction_investasi">
					<view class="investasi_head">Penarikan ke Kartu Bank</view>
					<view class="investasi_line"></view>
					<view class="investasi_foot">
						<view class="foot_date">09-05-2025 05:15:23</view>
						<view class="foot_piont">
							<view class="point_title">Pion</view>
							<view class="point_text reduce">-100.000</view>
						</view>
					</view>
					<view class="investasi_tip reduce"></view>
				</view>
				<view class="transaction_investasi">
					<view class="investasi_head">Pelepasan Investasi Harian</view>
					<view class="investasi_line"></view>
					<view class="investasi_foot">
						<view class="foot_date">09-05-2025 05:15:23</view>
						<view class="foot_piont">
							<view class="point_title">Pion</view>
							<view class="point_text increase">+100.000</view>
						</view>
					</view>
					<view class="investasi_tip increase"></view>
				</view>
				<view class="transaction_investasi">
					<view class="investasi_head">Mulai Transfer（***0821）</view>
					<view class="investasi_line"></view>
					<view class="investasi_foot">
						<view class="foot_date">09-05-2025 05:15:23</view>
						<view class="foot_piont">
							<view class="point_title">Pion</view>
							<view class="point_text reduce">-100.000</view>
						</view>
					</view>
					<view class="investasi_tip reduce"></view>
				</view>
				<view class="transaction_investasi">
					<view class="investasi_head">Tukarkan Saldo ke Poin</view>
					<view class="investasi_line"></view>
					<view class="investasi_foot">
						<view class="foot_date">09-05-2025 05:15:23</view>
						<view class="foot_piont">
							<view class="point_title">Pion</view>
							<view class="point_text increase">+100.000</view>
						</view>
					</view>
					<view class="investasi_tip increase"></view>
				</view>
				<view class="transaction_investasi">
					<view class="investasi_head">Penarikan ke Kartu Bank</view>
					<view class="investasi_line"></view>
					<view class="investasi_foot">
						<view class="foot_date">09-05-2025 05:15:23</view>
						<view class="foot_piont">
							<view class="point_title">Pion</view>
							<view class="point_text reduce">-100.000</view>
						</view>
					</view>
					<view class="investasi_tip reduce"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onPageScroll } from '@dcloudio/uni-app'
	import { ref } from 'vue';
	const scrollTop = ref<number>(0)
	const active = ref<Number>(0)
	const list = ref<Array<String | any>>([
		{ state: 0, name: 'Semua' },
		{ state: 1, name: 'Saldo' },
		{ state: 2, name: 'Poin' },
	])
	const change = (state : Number) => {
		active.value = state
	}
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
								&.increase{
									color: #458060;
								}
								&.reduce{
									color: #DD3222;
								}
							}


						}
					}
					.investasi_tip{
						position: absolute;
						top: 20rpx;
						left: 0;
						width: 12rpx;
						height: 92rpx;
						border-top-right-radius: 12rpx;
						border-bottom-right-radius: 12rpx;
						&.increase{
							background: #458060;
						}
						&.reduce{
							background: #DD3222;
						}
					}
				}
			}
		}
	}
</style>
<template>
	<view class="container mt-[20rpx] mb-[175rpx] mx-[30rpx] pt-[4rpx] px-[4rpx]">
		<u-image width="680" height="102" src="@/static/images/informasiAset/card_head.png"></u-image>
		<view class="article_box px-[30rpx] pt-[30rpx] pb-[30rpx]">
			<view class="article_head mb-[10rpx]">
				<u-image width="60" height="60" src="@/static/images/card/article_image.png"></u-image>
				<view class="article_head_title">Zona Global</view>
				<view class="article_head_text">Pertumbuhan Stabil</view>
			</view>
		</view>
		<view class="article_nav mb-[20rpx]">
			<u-image width="680" height="96" src="@/static/images/card/nav_image.png"></u-image>
			<view class="article_select">
				<view class="scroll-box">
					<scroll-view :scroll-x="true" :scroll-left="scrollLeft">
						<view class="tabs_content">
							<view class="tabs_label" v-for="(e,index) in navArr" :key="index">
								<view class="tabs_name" :style="{color: e.current == active ? '#1E4B2E':'#666666'}" @tap="change(e)">
									{{e.title}}
								</view>
							</view>
							<view class="active" :style="{left: active * 140 + 'rpx'}">
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="article_product">
			<view class="product_box" @tap="navigateTo('/pages/product_info/product_info?type='+ 1)">
				<view class="product_image">
					<u-image width="648" height="300" src="@/static/images/card/product_short.png"></u-image>
				</view>
				<view class="product_card">
					<view class="product_head">
						<view class="head_info">
							<u-image width="45" height="45" src="@/static/images/card/product_vietnam.png"></u-image>
							<view class="head_info_name">Vietnam</view>
						</view>
						<view class="head_tips unActivated">
							<u-image width="34" height="34" src="@/static/images/card/unActivated.png"></u-image>
							<view class="tips_title">Syarat Terbatas</view>
						</view>
						<!-- <view class="head_tips inEffect">
							<u-image width="34" height="34" src="@/static/images/card/inEffect.png"></u-image>
							<view class="tips_title">Syarat Terbatas</view>
						</view> -->
						<!-- <view class="head_tips canSigned">
							<u-image width="34" height="34" src="@/static/images/card/canSigned.png"></u-image>
							<view class="tips_title">Syarat Terbatas</view>
						</view> -->
					</view>
					<view class="product_line"></view>
					<view class="product_info">
						<view class="product_info_title">Dana Beras Jasmine No.6</view>
						<view class="product_info_level">
							<view class="level">Risiko 0</view>
							<view class="level_tips short">Jangka Pendek</view>
							<!-- <view class="level_tips mid">Jangka Menengah</view>
							<view class="level_tips long">Jangka Panjang</view> -->
						</view>
						<view class="product_medal">
							<view class="medal">
								<u-image width="71" height="64" src="@/static/images/card/medal_short.png"></u-image>
								<!-- <u-image width="71" height="64" src="@/static/images/card/medal_mid.png"></u-image>
								<u-image width="71" height="64" src="@/static/images/card/medal_long.png"></u-image> -->
								<view class="medal_text">Detail</view>
							</view>
						</view>
					</view>
					<view class="product_foot">
						<view class="foot_box">
							<view class="foot_label">
								<view class="label_num">+10%</view>
								<view class="label_title">Pertumbuhan Bersih</view>
							</view>
							<view class="foot_label">
								<view class="label_num">Rp 100.000.000</view>
								<view class="label_text">Poin Investasi</view>
								<!-- <view class="label_title">Nilai Kontrak</view> -->
							</view>
						</view>
						<view class="foot_date">
							<view class="date_num">16DAY</view>
							<u-image width="30" height="30" src="@/static/images/card/product_date.png"></u-image>
						</view>
					</view>
				</view>
			</view>
			<view class="product_box" @tap="navigateTo('/pages/product_info/product_info?type='+ 2)">
				<view class="product_image">
					<u-image width="648" height="300" src="@/static/images/card/product_mid.png"></u-image>
				</view>
				<view class="product_card">
					<view class="product_head">
						<view class="head_info">
							<u-image width="45" height="45" src="@/static/images/card/product_vietnam.png"></u-image>
							<view class="head_info_name">Vietnam</view>
						</view>
						<!-- <view class="head_tips unActivated">
							<u-image width="34" height="34" src="@/static/images/card/unActivated.png"></u-image>
							<view class="tips_title">Syarat Terbatas</view>
						</view> -->
						<view class="head_tips inEffect">
							<u-image width="34" height="34" src="@/static/images/card/inEffect.png"></u-image>
							<view class="tips_title">Syarat Terbatas</view>
						</view>
						<!-- <view class="head_tips canSigned">
							<u-image width="34" height="34" src="@/static/images/card/canSigned.png"></u-image>
							<view class="tips_title">Syarat Terbatas</view>
						</view> -->
					</view>
					<view class="product_line"></view>
					<view class="product_info">
						<view class="product_info_title">Dana Beras Jasmine No.6</view>
						<view class="product_info_level">
							<view class="level">Risiko 0</view>
							<!-- <view class="level_tips short">Jangka Pendek</view> -->
							<view class="level_tips mid">Jangka Menengah</view>
							<!-- <view class="level_tips long">Jangka Panjang</view> -->
						</view>
						<view class="product_medal">
							<view class="medal">
								<u-image width="71" height="64" src="@/static/images/card/medal_short.png"></u-image>
								<!-- <u-image width="71" height="64" src="@/static/images/card/medal_mid.png"></u-image>
								<u-image width="71" height="64" src="@/static/images/card/medal_long.png"></u-image> -->
								<view class="medal_text">Detail</view>
							</view>
						</view>
					</view>
					<view class="product_foot">
						<view class="foot_box">
							<view class="foot_label">
								<view class="label_num">+10%</view>
								<view class="label_title">Pertumbuhan Bersih</view>
							</view>
							<view class="foot_label">
								<view class="label_num">Rp 1.000.000.000</view>
								<!-- <view class="label_text">Poin Investasi</view> -->
								<view class="label_title">Nilai Kontrak</view>
							</view>
						</view>
						<view class="foot_date">
							<view class="date_num">16DAY</view>
							<u-image width="30" height="30" src="@/static/images/card/product_date.png"></u-image>
						</view>
					</view>
				</view>
			</view>
			<view class="product_box" @tap="navigateTo('/pages/product_info/product_info?type='+ 3)">
				<view class="product_image">
					<u-image width="648" height="300" src="@/static/images/card/product_long.png"></u-image>
				</view>
				<view class="product_card">
					<view class="product_head">
						<view class="head_info">
							<u-image width="45" height="45" src="@/static/images/card/product_vietnam.png"></u-image>
							<view class="head_info_name">Vietnam</view>
						</view>
						<!-- <view class="head_tips unActivated">
							<u-image width="34" height="34" src="@/static/images/card/unActivated.png"></u-image>
							<view class="tips_title">Syarat Terbatas</view>
						</view>
						<view class="head_tips inEffect">
							<u-image width="34" height="34" src="@/static/images/card/inEffect.png"></u-image>
							<view class="tips_title">Syarat Terbatas</view>
						</view> -->
						<view class="head_tips canSigned">
							<u-image width="34" height="34" src="@/static/images/card/canSigned.png"></u-image>
							<view class="tips_title">Syarat Terbatas</view>
						</view>
					</view>
					<view class="product_line"></view>
					<view class="product_info">
						<view class="product_info_title">Dana Beras Jasmine No.6</view>
						<view class="product_info_level">
							<view class="level">Risiko 0</view>
							<!-- <view class="level_tips short">Jangka Pendek</view>
							<view class="level_tips mid">Jangka Menengah</view> -->
							<view class="level_tips long">Jangka Panjang</view>
						</view>
						<view class="product_medal">
							<view class="medal">
								<!-- <u-image width="71" height="64" src="@/static/images/card/medal_short.png"></u-image>
								<u-image width="71" height="64" src="@/static/images/card/medal_mid.png"></u-image> -->
								<u-image width="71" height="64" src="@/static/images/card/medal_long.png"></u-image>
								<view class="medal_text">Detail</view>
							</view>
						</view>
					</view>
					<view class="product_foot">
						<view class="foot_box">
							<view class="foot_label">
								<view class="label_num">+10%</view>
								<view class="label_title">Pertumbuhan Bersih</view>
							</view>
							<view class="foot_label">
								<view class="label_num">Rp 2.000.000.000</view>
								<!-- <view class="label_title">Nilai Kontrak</view>-->
								 <view class="label_text">Poin Investasi</view>
							</view>
						</view>
						<view class="foot_date">
							<view class="date_num">16DAY</view>
							<u-image width="30" height="30" src="@/static/images/card/product_date.png"></u-image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { formatNumber, formatProgress } from '@/utils/util'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	const active = ref<Number>(0)
	const scrollLeft = ref(0)
	const navArr = ref<Array<any>>([
		{ current: 0, title: 'Semua' },
		{ current: 1, title: 'Vietnam' },
		{ current: 2, title: 'Laos' },
		{ current: 3, title: 'Thailand' },
		{ current: 4, title: 'Myanmar' }
	])
	const userStore = useUserStore()
	const { userInfo, isLogin } = storeToRefs(userStore)
	const change = (e : any) => {
		active.value = e.current
		scrollLeft.value = e.current * 30
	}
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		border-radius: 12rpx;
		background: #FFFFFF;

		.article_box {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.article_head {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.article_head_title {
					margin-left: 10rpx;
					font-family: Arial;
					font-weight: 700;
					font-size: 32rpx;
					line-height: 54rpx;
					color: #1E4B2E;
				}

				.article_head_text {
					margin-left: 30rpx;
					font-family: Arial;
					font-weight: 400;
					font-size: 22rpx;
					line-height: 40rpx;
					color: #A0A3A9;
				}
			}
		}

		.article_nav {
			position: relative;

			.article_select {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 96rpx;

				.scroll-box {
					overflow: hidden;
					margin-left: 168rpx;
					width: 500rpx;
					.tabs_content {
						display: flex;
						justify-content: space-between;
						align-items: center;
						position: relative;
						padding: 30rpx 0;

						.tabs_label {
							flex: 1;
							z-index: 100;

							.tabs_name {
								width: 140rpx;
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: center;
							}
						}

						.active {
							position: absolute;
							top: 50%;
							transform: translateY(-50%);
							transition: all 0.5s;
							width: 140rpx;
							height: 59rpx;
							border-radius: 30rpx;
							background: #BBE8D0;
							z-index: 97;
						}
					}
				}
			}
		}
		.article_product{
			padding: 30rpx 20rpx;
			.product_box{
				position: relative;
				margin-top: 10rpx;
				.product_image{
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.product_card{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					padding: 20rpx;
					.product_head{
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 10rpx;
						.head_info{
							display: flex;
							justify-content: space-between;
							align-items: center;
							.head_info_name{
								margin-left: 20rpx;
								font-family: Arial;
								font-weight: 700;
								font-size: 28rpx;
								line-height: 30rpx;
								color: #1E1E1E;
							}
						}
						.head_tips{
							display: flex;
							justify-content: flex-start;
							align-items: center;
							width: 168rpx;
							height: 40rpx;
							padding: 5rpx;
							border-radius: 40rpx;
							&.unActivated{
								background: #999999;
							}
							&.inEffect{
								background: #ECB54B;
							}
							&.canSigned{
								background: #67BA8C;
							}
							.tips_title{
								margin-left: 5rpx;
								font-family: Arial;
								font-weight: 400;
								font-size: 16rpx;
								line-height: 40rpx;
								color: #FFFFFF;
							}
						}
					}
					.product_line{
						height: 2rpx;
						background: #D7D7D7;
					}
					.product_info{
						position: relative;
						padding: 30rpx 20rpx;
						.product_info_title{
							font-family: Arial;
							font-weight: 400;
							font-size: 26rpx;
							line-height: 40rpx;
							color: #1E1E1E;
						}
						.product_info_level{
							display: flex;
							justify-content: flex-start;
							align-items: center;
							.level{
								margin-right: 20rpx;
								width: 90rpx;
								height: 25rpx;
								border-radius: 2rpx;
								background: #D2ECDD;
								font-family: Arial;
								font-weight: 400;
								text-align: center;
								font-size: 16rpx;
								line-height: 25rpx;
								color: #1E4B2E;
							}
							.level_tips{
								width: 155rpx;
								height: 25rpx;
								border-radius: 2rpx;
								font-family: Arial;
								font-weight: 400;
								text-align: center;
								font-size: 16rpx;
								line-height: 25rpx;
								&.short{
									color: #81AF95;
									background: rgba(129, 175, 149, 0.3);
								}
								&.mid{
									color: #D2B571;
									background: rgba(236, 181, 75, 0.3);
								}
								&.long{
									color: #F06550;
									background: rgba(255, 175, 175, 0.3);
								}
							}
						}
						.product_medal{
							position: absolute;
							top: 0;
							right: 30rpx;
							.medal{
								position: relative;
								.medal_text{
									position: absolute;
									top: 0;
									left: 0;
									width: 71rpx;
									height: 64rpx;
									font-family: Arial;
									font-weight: 400;
									font-size: 20rpx;
									text-align: center;
									line-height: 64rpx;
									color: #FFFFFF;
								}
							}
						}
					}
					.product_foot{
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 20rpx;
						.foot_box{
							display: flex;
							justify-content: space-between;
							align-items: center;
							.foot_label{
								margin-right: 20rpx;
								.label_num{
									font-family: Arial;
									font-weight: 700;
									font-size: 28rpx;
									text-align: left;
									line-height: 40rpx;
									color: #EB2C0F;
								}
								.label_title{
									font-family: Arial;
									font-weight: 400;
									font-size: 20rpx;
									line-height: 40rpx;
									text-align: left;
									color: #A0A3A9;
								}
								.label_text{
									font-family: Arial;
									font-weight: 400;
									font-size: 20rpx;
									line-height: 40rpx;
									text-align: left;
									color: #999999;
								}
							}
						}
						.foot_date{
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							.date_num{
								margin-bottom: 10rpx;
								font-family: Arial;
								font-weight: 400;
								font-size: 20rpx;
								line-height: 25rpx;
								text-align: center;
								color: #1E1E1E;
							}
						}
					}
				}
			}
		}
	}
</style>
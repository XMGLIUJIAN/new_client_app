<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="1624" src="@/static/images/page/treasureGroup.png"></u-image>
		</view>
		<view class="point_treasure">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false"
					:back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'" title="MENGUNDANG INTEGRASI" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					:title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
			<view class="treasure_card mt-[275rpx] mx-[30rpx]">
				<view class="card_title">Undang Teman Berhasil, Dapatkan</view>
				<view class="card_num">Rp 30.000</view>
				<view class="card_text">Bonus Tunai</view>
			</view>
			<view class="treasure_book mt-[20rpx] mx-[30rpx]">
				<u-image width="690" height="752" src="@/static/images/activity/treasure_book.png"></u-image>
				<view class="treasure_book_info">
					<view class="treasure_image ml-[75rpx]">
						<u-image width="569" height="338" src="@/static/images/activity/treasure_image.png"></u-image>
					</view>
					<view class="treasure_book_label ml-[75rpx]">
						<view class="label_image">
							<u-image width="30" height="30" src="@/static/images/activity/treasure_union.png"></u-image>
						</view>		
						<view class="label_info">
							Dapatkan hingga <text class="label_info_text">50%</text> dari hasil investasi harian teman setiap hari
						</view>
					</view>
					<view class="treasure_book_label ml-[75rpx]">
						<view class="label_image">
							<u-image width="30" height="30" src="@/static/images/activity/treasure_union.png"></u-image>
						</view>		
						<view class="label_info">
							Dihitung langsung, masuk ke akun esok harinya
						</view>
					</view>
					<view class="treasure_book_label ml-[75rpx]">
						<view class="label_image">
							<u-image width="30" height="30" src="@/static/images/activity/treasure_union.png"></u-image>
						</view>		
						<view class="label_info">
							Semakin banyak undangan, semakin besar bonusnya — <text class="label_info_text">Tanpa batas!</text>
						</view>
					</view>
					<view class="treasure_book_foot mx-[20rpx]">
						<view class="treasure_book_invite" @tap="navigateTo('/pages/invite/invite')">
							<view class="treasure_book_text">Lihat Daftar</view>
						</view>
						<view class="treasure_book_connection" @tap="navigateTo('/pages/connection/connection')">
							<view class="treasure_book_text">Lihat Daftar</view>
							<view class="treasure_book_text">Undangan Saya</view>
						</view>
					</view>
				</view>
			</view>
			<view class="treasure_bonus mt-[20rpx] mb-[20rpx] mx-[30rpx]">
				<view class="treasure_bonus_title">Contoh Bonus</view>
				<view class="treasure_bonus_label">
					<view class="treasure_icon">
						<u-image width="30" height="30" src="@/static/images/activity/treasure_icon.png"></u-image>
					</view>
					<view class="treasure_bonus_text">Pendapatan harian teman: <text class="label_text">Rp 10.000</text></view>
				</view>
				<view class="treasure_bonus_label">
					<view class="treasure_icon">
						<u-image width="30" height="30" src="@/static/images/activity/treasure_icon.png"></u-image>
					</view>
					<view class="treasure_bonus_text">Anda dapat: <text class="label_text">Rp5.000 (50%)</text></view>
				</view>
			</view>
		</view>
	</view>

</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	const scrollTop = ref<number>(0)
	
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>
<style lang="scss" scoped>
	.container {
		position: relative;

		.imageGroup {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: -1;
		}

		.point_treasure {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.treasure_card {
				padding: 20rpx;
				background: #F6FFF9;
				border: 6rpx solid #FFFFFF;
				border-radius: 12rpx;

				.card_title {
					font-family: Arial;
					font-weight: 500;
					font-size: 26rpx;
					line-height: 45rpx;
					text-align: center;
					color: #000000;
				}

				.card_num {
					font-family: Arial;
					font-weight: 900;
					font-size: 64rpx;
					line-height: 80rpx;
					text-align: center;
					background: linear-gradient(234.06deg, #F94A44 14.72%, #F19E6C 101.69%);
					-webkit-background-clip: text;
					/*将设置的背景颜色限制在文字中*/
					-webkit-text-fill-color: transparent;
					/*给文字设置成透明*/
				}

				.card_text {
					font-family: PingFang SC;
					font-weight: 500;
					font-size: 26rpx;
					line-height: 45rpx;
					text-align: center;
					background: linear-gradient(210deg, #E87A3D 13.39%, #F19E6C 86.61%);
					-webkit-background-clip: text;
					/*将设置的背景颜色限制在文字中*/
					-webkit-text-fill-color: transparent;
					/*给文字设置成透明*/
				}
			}
			.treasure_book{
				overflow: hidden;
				position: relative;
				border-radius: 12rpx;
				.treasure_book_info{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					padding: 20rpx;
					.treasure_book_label{
						display: flex;
						justify-content: flex-start;
						margin-top: 30rpx;
						.label_image{
							width: 30rpx;
							height: 30rpx;
						}
						.label_info{
							margin-left: 20rpx;
							font-family: Arial;
							font-weight: 400;
							font-size: 24rpx;
							line-height: 28rpx;
							color: #1E1E1E;
							.label_info_text{
								font-family: Arial;
								font-weight: 400;
								font-size: 24rpx;
								line-height: 28rpx;
								background: linear-gradient(210deg, #E87A3D 13.39%, #F19E6C 86.61%);
								-webkit-background-clip: text;
								/*将设置的背景颜色限制在文字中*/
								-webkit-text-fill-color: transparent;
								/*给文字设置成透明*/
							}
						}
					}
					.treasure_book_foot{
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 30rpx;
						.treasure_book_invite{
							display: flex;
							justify-content: center;
							align-items: center;
							width: 286rpx;
							height: 78rpx;
							border-radius: 12rpx;
							background: #F19E6C;
							.treasure_book_text{
								font-family: Arial;
								font-weight: 400;
								font-size: 26rpx;
								line-height: 30rpx;
								color: #FFFFFF;
							}
						}
						.treasure_book_connection{
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							width: 286rpx;
							height: 78rpx;
							border-radius: 12rpx;
							background: #81AF95;
							.treasure_book_text{
								font-family: Arial;
								font-weight: 400;
								font-size: 26rpx;
								line-height: 30rpx;
								color: #FFFFFF;
							}
						}
					}
				}
			}
			.treasure_bonus{
				padding: 20rpx 40rpx;
				background: #FFFFFF;
				border-radius: 12rpx;
				.treasure_bonus_title{
					font-family: Arial;
					font-weight: 700;
					font-size: 36rpx;
					line-height: 40rpx;
					color: #1E4B2E;
				}
				.treasure_bonus_label{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-top: 20rpx;
					.treasure_icon{
						width: 30rpx;
						height: 30rpx;
					}
					.treasure_bonus_text{
						margin-left: 20rpx;
						font-family: Arial;
						font-weight: 400;
						font-size: 28rpx;
						line-height: 40rpx;
						color: #1E4B2E;
						.label_text{
							font-family: Arial;
							font-weight: 400;
							font-size: 28rpx;
							line-height: 40rpx;
							background: linear-gradient(210deg, #E87A3D 13.39%, #F19E6C 86.61%);
							-webkit-background-clip: text;
							/*将设置的背景颜色限制在文字中*/
							-webkit-text-fill-color: transparent;
						}
					}
				}
			}
		}
	}
</style>
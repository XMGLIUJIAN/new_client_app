<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="message">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :title-bold="true"
					title="PESAN PEMBERITAHUAN" back-icon-color="#FFFFFF"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" title-color="#FFFFFF">
				</u-navbar>
			</u-sticky>
			<view class="message_con mt-[50rpx] mx-[30rpx]">
				<view class="message_card" v-for="(item,index) in messageArr" :key="index"
					@tap="navigateTo('/pages/message/detail?type='+ item.type)">
					<view class="message_info">
						<view class="card_badge">
							<u-image width="100" height="100" :src="item.icon" alt="" />
							<view class="badge">
								<u-badge :absolute="false" bg-color="#DC2F20" :overflow-count="99" :count="item.number"></u-badge>
							</view>
						</view>
						<view class="card_info">
							<view class="card_head">
								<view class="card_title">{{item.title}}</view>
								<view class="card_time">{{item.create_time}}</view>
							</view>
							<view class="card_text">{{item.subtitle}}</view>
						</view>
					</view>
				</view>
				<view class="empty  pt-[20rpx] pb-[20rpx] mt-[50rpx]" v-if="!messageArr.length">
					<u-image width="462" height="291" src="@/static/images/icon/empty.png" alt="" />
					<view class="empty_text">Tidak Ada Kabar</view>
				</view>
			</view>
			<toastPopup></toastPopup>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { mesNotifiConf } from '@/api/eventInfo'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	const messageArr = ref<Array<any>>([])
	const scrollTop = ref<number>(0)
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url: url
		})
	}
	const getlist = async () => {
		const data = await mesNotifiConf()
		messageArr.value = data.lists
	}
	onLoad(() => {
		getlist()
	})
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page {
		background: #F1F1F1 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.message {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.message_con {
				border-radius: 12rpx;
				background: #FFFFFF;

				.message_card {
					padding: 30rpx;

					.message_info {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.card_badge{
							position: relative;
							.badge{
								position: absolute;
								top: 0;
								right: 0;
							}
						}
						.card_info {
							margin-left: 20rpx;
							width: 80%;

							.card_head {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.card_title {
									font-family: Arial;
									font-size: 24rpx;
									font-weight: 700;
									line-height: 48rpx;
									text-align: left;
									color: #1E1E1E;
								}

								.card_time {
									font-family: Arial;
									font-size: 18rpx;
									font-weight: 500;
									line-height: 48rpx;
									text-align: left;
									color: #999999;
								}
							}

							.card_text {
								font-family: Arial;
								font-size: 20rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: left;
								color: #8B9098;
							}
						}
					}
				}
			}
		}
	}
</style>
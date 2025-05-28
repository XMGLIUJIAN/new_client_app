<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="detail">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :title-bold="true"
					title="NOTIFIKASI PESAN" :back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" :title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
			<view class="detail_con pt-[20rpx] pb-[20rpx] px-[30rpx]">
				<view class="message_card" v-for="(item,index) in list" :key="index">
					<view class="card_head">
						<view class="card_info">
							<view class="card_title">{{item.title}}</view>
							<view class="card_text">{{item.subtitle}}</view>
						</view>
						<view class="card_badge">
							<u-badge :is-dot="!item.state ? true : false" :absolute="false" size="mini" bgColor="#EF0000"></u-badge>
						</view>
					</view>
					<view class="card_line"></view>
					<view class="card_foot">
						<view class="card_time">{{item.create_time}}</view>
						<view class="card_preview" @tap="navigateTo('/pages/message/parse?message_id=' + item.id)">
							<view class="preview_text">Periksa perinciannya</view>
							<view class="arrow-right">
								<u-icon name="arrow-right" color="#999999" size="24"></u-icon>
							</view>
						</view>
					</view>
				</view>
				<view class="empty mt-[50rpx]" v-if="!list.length">
					<u-empty text="Tidak ada kabar" mode="data" icon-color="#999999" color="#999999"></u-empty>
				</view>
			</view>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { mesNotifiList } from '@/api/eventInfo'
	import { onLoad, onPageScroll, onShow } from '@dcloudio/uni-app'
	const scrollTop = ref<number>(0)
	const messageType = ref<number>(0)
	const list = ref<any>([])
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url: url
		})
	}
	const getlist = async() => {
		const data = await mesNotifiList({type: messageType.value})
		list.value = data.lists
	}
	onLoad((options : String | any) => {
		messageType.value = Number(options.type)
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

		.detail {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.detail_con {
				.message_card {
					margin-bottom: 20rpx;
					padding: 30rpx;
					border-radius: 12rpx;
					background: #FFFFFF;

					.card_head {
						display: flex;
						justify-content: space-between;

						.card_info {
							.card_title {
								font-family:  Arial;
								font-size: 30rpx;
								font-weight: 700;
								line-height: 48rpx;
								text-align: left;
								color: #1E1E1E;
							}

							.card_text {
								font-family:  Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: left;
								color: #999999;
							}
						}
					}

					.card_line {
						margin: 20rpx 0;
						height: 2rpx;
						background: #EDEDED;
					}

					.card_foot {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.card_time {
							font-family:  Arial;
							font-size: 24rpx;
							font-weight: 400;
							line-height: 40rpx;
							text-align: left;
							color: #999999;
						}

						.card_preview {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.preview_text {
								font-family:  Arial;
								font-size: 24rpx;
								font-weight: 400;
								line-height: 40rpx;
								text-align: left;
								color: #999999;
							}

							.arrow-right {
								display: flex;
								justify-content: center;
								align-items: center;
								margin-left: 10rpx;
								height: 40rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
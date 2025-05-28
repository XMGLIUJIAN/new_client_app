<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="connection">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :title-bold="true"
					title="INFORMASI KONTAK TIM" :back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" :title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
			<view class="connection_con pt-[40rpx]">
				<view class="connection_card mx-[30rpx] mb-[30rpx]">
					<u-image height="278" src="@/static/images/user/connection.png"></u-image>
					<view class="card_info pt-[20rpx]">
						<view class="title">Atasan Saya</view>
						<view class="info">
							<view class="info_text">
								<text>Nama Panggilan：</text>
								<text class="text_con">{{seniorUser.nickname}}</text>
							</view>
							<view class="info_text">
								<text>Nomor HP：</text>
								<text class="text_con">{{seniorUser.mobile}}</text>
							</view>
						</view>
						<view class="contact">
							<view class="contact_box">
								<u-image width="45" height="45" src="@/static/images/icon/icon_whatsapp.png" alt="" />
								<view class="contact_num">{{seniorUser.whatsapp}}</view>
							</view>
							<view class="contact_box">
								<u-image width="45" height="45" src="@/static/images/icon/icon_telegram.png" alt="" />
								<view class="contact_num">{{seniorUser.telegram}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="connection_popup pt-[30rpx] pb-[30rpx] px-[30rpx]">
					<view class="connection_direct mb-[30rpx]">Member Langsung Saya</view>
					<view class="connection_row" v-for="(item,index) in list" :key="index">
						<view class="info">
							<view class="info_text">
								<text>Nama Panggilan：</text>
								<text class="text_con">{{item.nickname}}</text>
							</view>
							<view class="info_text">
								<text>Nomor HP：</text>
								<text class="text_con">{{item.mobile}}</text>
							</view>
						</view>
						<view class="contact">
							<view class="contact_box" v-if="item.whatsapp">
								<u-image width="45" height="45" src="@/static/images/icon/icon_whatsapp.png" alt="" />
								<view class="contact_num">{{item.whatsapp}}</view>
							</view>
							<view class="contact_box" v-if="item.telegram">
								<u-image width="45" height="45" src="@/static/images/icon/icon_telegram.png" alt="" />
								<view class="contact_num">{{item.telegram}}</view>
							</view>
						</view>
					</view>
					<view class="empty mt-[50rpx]" v-if="!list.length">
						<u-empty text="Tidak Ada Catatan" mode="list" icon-color="#999999" color="#999999"></u-empty>
					</view>
				</view>
			</view>
		</view>
		<toastPopup></toastPopup>
	</view>

</template>

<script lang="ts" setup>
	import { lowerLevelUser } from '@/api/user'
	import { ref, computed } from 'vue'
	import { useUserStore } from '@/stores/user'
	import { onShow, onPageScroll } from '@dcloudio/uni-app'
	const scrollTop = ref<number>(0)
	const seniorUser = ref<any>({})
	// 用户信息
	const userStore = useUserStore()
	const userInfo = computed(() => userStore.userInfo)
	const list = ref<Array<any>>([])
	const lowerUser = async () => {
		const data = await lowerLevelUser({ inviteCode: userInfo.value.invite_code })
		seniorUser.value = data.seniorUser
		list.value = data.lowerLevelUsers.lists
	}
	onShow(() => {
		userStore.getUser()
		lowerUser()
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
		background: #FFFFFF;
		.connection {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.connection_con {
				.connection_card {
					position: relative;
					overflow: hidden;
					border-radius: 20rpx;

					.card_info {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						.title {
							margin: 0 40rpx;
							font-family:  Arial;
							font-size: 32rpx;
							font-weight: 700;
							line-height: 48rpx;
							text-align: left;
							color: #1E4B2E;
						}

						.info {
							margin: 12rpx 30rpx;

							.info_text {
								font-family:  Arial;
								font-size: 24rpx;
								font-weight: 400;
								line-height: 48rpx;
								text-align: left;
								color: #60926D;

								.text_con {
									margin-left: 10rpx;
									font-family:  Arial;
									font-size: 24rpx;
									font-weight: 400;
									line-height: 48rpx;
									text-align: left;
									color: #60926D;
								}
							}
						}

						.contact {
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 20rpx 40rpx;
							background: linear-gradient(316.44deg, #92BEAB 1.2%, #26815A 98.8%);
							.contact_box {
								display: flex;
								justify-content: flex-start;
								align-items: center;
								width: 45%;
								.contact_num {
									margin-left: 10rpx;
									font-family:  Arial;
									font-size: 28rpx;
									font-weight: 500;
									line-height: 48rpx;
									text-align: left;
									color: #FFFFFF;
								}
							}
						}
					}

				}

				.connection_popup {
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
					background: #F1F1F1;

					.connection_direct {
						font-family:  Arial;
						font-size: 32rpx;
						font-weight: 700;
						line-height: 48rpx;
						text-align: left;
						color: #1E4B2E;
					}

					.connection_row {
						margin-bottom: 20rpx;
						border-radius: 20rpx;
						overflow: hidden;

						.info {
							background: #FFFFFF;
							padding: 20rpx 30rpx;

							.info_text {
								font-family:  Arial;
								font-size: 24rpx;
								font-weight: 400;
								line-height: 48rpx;
								text-align: left;
								color: #60926D;

								.text_con {
									margin-left: 10rpx;
									font-family:  Arial;
									font-size: 24rpx;
									font-weight: 400;
									line-height: 48rpx;
									text-align: left;
									color: #60926D;
								}
							}
						}

						.contact {
							display: flex;
							justify-content: space-between;
							align-items: center;
							background: #E3EDFF;
							padding: 20rpx 40rpx;
							background: linear-gradient(316.44deg, #92BEAB 1.2%, #26815A 98.8%);


							.contact_box {
								display: flex;
								justify-content: flex-start;
								align-items: center;
								width: 45%;
								.contact_num {
									margin-left: 10rpx;
									font-family:  Arial;
									font-size: 24rpx;
									font-weight: 500;
									line-height: 48rpx;
									text-align: left;
									color: #FFFFFF;
								}
							}
						}
					}
				}

			}
		}
	}
</style>
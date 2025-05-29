<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="manage_bank pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="KELOLA REKENING BANK" :title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
					<template #right>
						<view class="addCard mr-[30rpx]">
							<u-image v-if="scrollTop" @tap="navigateTo('/pages/bind_card/bind_card')" width="50" height="40" src="@/static/images/icon/icon_add.png" alt="" />
							<u-image v-else @tap="navigateTo('/pages/bind_card/bind_card')" width="50" height="37" src="@/static/images/icon/icon_card.png" alt="" />
						</view>
					</template>
				</u-navbar>
			</u-sticky>
			<view class="manage_con pt-[40rpx] mx-[30rpx]">
				<view class="card" v-for="(item,index) in list" :key="index">
					<view class="card_head">
						<view class="card_info">
							<view class="card_logo">
								<u-image width="50" height="50" :src="item.icon" alt="" />
							</view>
							<view class="card_name">
								{{item.bank_name}}
							</view>
						</view>
						<u-image @tap="navigateTo('/pages/bind_card/bind_card?id='+ item.id)" width="30" height="30"
							src="@/static/images/icon/icon_edit.png" alt="" />
					</view>
					<view class="card_num">{{bankFormat(item.bank_card)}}</view>
					<view class="card_delete" @tap="deleteCard(item.id)">
						<u-image width="50" height="50" src="@/static/images/icon/icon_delete.png" alt="" />
					</view>
				</view>
				<view class="empty mt-[300rpx]" v-if="!list.length">
					<u-image width="462" height="291" src="@/static/images/icon/empty.png" alt="" />
					<view class="empty_text">Tidak Ada Catatan</view>
				</view>
			</view>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { ref, nextTick } from 'vue'
	import { onShow, onPageScroll } from '@dcloudio/uni-app'
	import { bankCardList, bankCardDel } from '@/api/bank'
	import { bankFormat } from '@/utils/util'
	const scrollTop = ref<number>(0)
	const list = ref<Array<String | any>>([])
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const deleteCard = async (id : Number) => {
		try {
			await bankCardDel({ id: id })
		} finally {
			queryList()
		}
	}
	const queryList = async () => {
		const data = await bankCardList({})
		list.value = data.lists
	}
	onShow(() => {
		queryList()
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

		.manage_bank {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.manage_con {
				.card {
					position: relative;
					margin-bottom: 20rpx;
					padding: 40rpx;
					border-radius: 20rpx;

					.card_head {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.card_info {
							display: flex;
							justify-content: flex-start;
							align-items: center;

							.card_logo {
								overflow: hidden;
								display: flex;
								justify-content: center;
								align-items: center;
								width: 68rpx;
								height: 68rpx;
								border-radius: 50%;
								background: #FFFFFF;
							}

							.card_name {
								margin-left: 20rpx;
								font-family:  Arial;
								font-size: 32rpx;
								font-weight: 500;
								line-height: 48rpx;
								text-align: left;
								color: #FFFFFF;
							}
						}
					}

					.card_num {
						margin-top: 50rpx;
						font-family:  Arial;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 54rpx;
						text-align: left;
						color: #FFFFFF;

						text {
							margin-right: 40rpx;
						}
					}

					.card_delete {
						position: absolute;
						bottom: 0;
						right: 0;
						overflow: hidden;
						width: 50rpx;
						height: 50rpx;
						border-top-left-radius: 20rpx;
						border-bottom-right-radius: 20rpx;
					}
				}

				.card:nth-child(odd) {
					background: linear-gradient(90deg, #EDC970 0%, #C6A25C 100%);
				}

				//偶数行
				.card:nth-child(even) {
					background: linear-gradient(90deg, #81AF95 0%, #417E5C 100%);
				}
			}
		}
	}
</style>
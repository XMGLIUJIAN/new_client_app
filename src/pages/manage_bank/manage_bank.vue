<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="manage_bank pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="KELOLA REKENING BANK" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="manage_con pt-[40rpx] mx-[40rpx]">
				<view class="card" v-for="(item,index) in list" :key="index">
					<view class="card_head">
						<view class="card_info">
							<view class="card_logo">
								<u-image width="66" height="66" :src="item.icon" alt="" />
							</view>
							<view class="card_name">
								{{item.bank_name}}
							</view>
						</view>
						<u-image @tap="navigateTo('/pages/bind_card/bind_card?id='+ item.id)" width="52" height="52"
							src="@/static/images/icon/icon_edit.png" alt="" />
					</view>
					<view class="card_num">{{bankFormat(item.bank_card)}}</view>
					<view class="card_delete" @tap="deleteCard(item.id)">
						<u-image width="60" height="60" src="@/static/images/icon/icon_delete.png" alt="" />
					</view>
				</view>
				<view class="empty mt-[50rpx]" v-if="!list.length">
					<u-empty text="Tidak Ada Catatan" mode="data" icon-color="#999999" color="#999999"></u-empty>
				</view>
				<view class="addCard mt-[50rpx]" @tap="navigateTo('/pages/bind_card/bind_card')">
					<u-image width="36" height="36" src="@/static/images/icon/icon_add.png" alt="" />
					<view class="newCard">Tambahkan Rekening Bank Baru</view>
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
		const data = await bankCardList()
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
		background: #F6F6F6 !important;
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
								width: 66rpx;
								height: 66rpx;
								border-radius: 50%;
								background: #FFFFFF;
							}

							.card_name {
								margin-left: 20rpx;
								font-family:  Arial;
								font-size: 32rpx;
								font-weight: 700;
								line-height: 48rpx;
								text-align: left;
								color: #FFFFFF;
							}
						}
					}

					.card_num {
						margin-top: 50rpx;
						font-family:  Arial;
						font-size: 36rpx;
						font-weight: 600;
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
						width: 60rpx;
						height: 60rpx;
						border-top-left-radius: 20rpx;
						border-bottom-right-radius: 20rpx;
					}
				}

				.card:nth-child(odd) {
					background: linear-gradient(180deg, #1C3762 0%, #1B3D6D 100%);
				}

				//偶数行
				.card:nth-child(even) {
					background: linear-gradient(180deg, #62351C 0%, #6D3D1B 100%);

				}

				.addCard {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 90rpx;
					border-radius: 8rpx;
					background: #E2F0FF;
					border: 2rpx solid #0067E0;

					.newCard {
						margin-left: 10rpx;
						font-family:  Arial;
						font-size: 32rpx;
						font-weight: 500;
						text-align: center;
						color: #0067E0;
					}
				}
			}
		}
	}
</style>
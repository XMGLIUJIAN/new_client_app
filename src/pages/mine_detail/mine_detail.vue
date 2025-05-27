<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="mine_detail pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="DATA SAWAH" title-color="#1E1E1E">
				</u-navbar>
			</u-sticky>
			<view class="swiper mx-[40rpx] mt-[40rpx] mb-[40rpx]">
				<u-image border-radius="20" height="385" :src="contract_info.img_url" alt="" />
			</view>
			<view class="mine_con mx-[40rpx]">
				<view class="mine_head">
					<u-image class="group" height="94" :src="contract_info.title_ground_img_url" alt="" />
					<view class="head_info">
						<u-image width="49" height="56" :src="contract_info.icon" alt="" />
						<view class="head_title">{{contract_info.main_title}}</view>
					</view>
				</view>
				<view class="mine_info">
					<view class="signed mt-[20rpx]">
						<text>Member Aktif</text>
						<text class="signed_num">{{formatNumber(contract_info.number_people)}}</text>
					</view>
					<view class="mine_card">
						<view class="mine_label">
							<view class="mine_title">
								<u-image width="40" height="40" src="@/static/images/user/mine_icon01.png" alt="" />
								<view class="mine_text">Poin yang dibutuhkan</view>
							</view>
							<view class="card_text">{{formatNumber(contract_info.contract_require)}}</view>
						</view>
					</view>
					<view class="mine_card">
						<view class="mine_label">
							<view class="mine_title">
								<u-image width="40" height="40" src="@/static/images/user/mine_icon02.png" alt="" />
								<view class="mine_text">Tingkat Pengembalian</view>
							</view>
							<view class="card_text">{{formatNumber(contract_info.profit)}}%</view>
						</view>
						<view class="mine_label">
							<view class="mine_title">
								<u-image width="40" height="40" src="@/static/images/user/mine_icon03.png" alt="" />
								<view class="mine_text">Siklus Proyek</view>
							</view>
							<view class="card_text">{{formatNumber(contract_info.cycle)}}</view>
						</view>
					</view>
					<view class="mine_line mt-[20rpx] mb-[20rpx]"></view>
					<view class="mine_place">
						<view class="place_title">Tempat：</view>
						<view class="place_text">{{contract_info.location}}</view>
					</view>
					<view class="mine_place">
						<view class="place_title">Pengenalan：</view>
						<u-read-more ref="uReadMoreRef" open-text="Sembunyikan" close-text="Tampilkan"
							:show-height="100" :toggle="true">
							<view class="place_text">
								<rich-text class="rich_text" :nodes="formatRichText(contract_info.synopsis)"></rich-text>
							</view>
						</u-read-more>
					</view>
				</view>
			</view>
			<view class="submit_btn mt-[40rpx] mx-[40rpx]" @tap="submitEvent(contract_info.contract_id)">
				Saya Ingin Investasi
			</view>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { ref, shallowRef } from 'vue'
	import { formatNumber, formatRichText } from '@/utils/util'
	import { myContractInfo, contractInfo } from '@/api/contract'
	import { onLoad, onPageScroll, onReady } from '@dcloudio/uni-app'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	const userStore = useUserStore()
	const { isLogin } = storeToRefs(userStore)
	const uReadMoreRef = shallowRef()
	const scrollTop = ref<number>(0)
	const contract_info = ref<any>({})
	const contract_id = ref<String>('')
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const getContractInfo = async () => {
		contract_info.value = isLogin.value ? await myContractInfo({ id: contract_id.value }) : await contractInfo({ contractId: contract_id.value })
	}
	const submitEvent = (contract_id : any) => {
		isLogin.value ? navigateTo('/pages/points_investment/points_investment?contract_id=' + contract_id) : navigateTo('/pages/login/login')
	}
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
	onLoad((options : any) => {
		contract_id.value = options.id
		getContractInfo()
	})
	onReady(() => {
		uReadMoreRef.value.isLongContent = true;
		uReadMoreRef.value.showMore = false;
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

		.mine_detail {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.mine_con {
				border-radius: 20rpx;
				background: #FFFFFF;

				.mine_head {
					overflow: hidden;
					position: relative;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;

					.head_info {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						padding: 0 40rpx;

						.head_title {
							margin-left: 10rpx;
							font-family: Arial;
							font-size: 32rpx;
							font-weight: 700;
							line-height: 60rpx;
							text-align: left;
							color: #FFFFFF;
						}
					}
				}

				.mine_info {
					padding: 20rpx 40rpx;

					.signed {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						display: inline-block;
						padding: 10rpx 20rpx;
						background: #DBEBFF;
						border-radius: 12rpx;
						font-family: Arial;
						font-size: 24rpx;
						font-weight: 700;
						text-align: left;
						color: #1E1E1E;

						.signed_num {
							margin-left: 10rpx;
							font-family: Arial;
							font-size: 32rpx;
							font-weight: 700;
							text-align: left;
							color: #0067E0;
						}
					}

					.mine_card {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 20rpx;

						.mine_title {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							margin-bottom: 20rpx;

							.mine_text {
								margin-left: 10rpx;
								font-family: Arial;
								font-size: 28rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: left;
								color: #1E1E1E;
							}
						}

						.card_text {
							margin-left: 50rpx;
							font-family: Arial;
							font-size: 36rpx;
							font-weight: 700;
							line-height: 60rpx;
							text-align: left;
							color: #1E1E1E;
						}
					}

					.mine_line {
						height: 2rpx;
						background: #EBEBEB;
					}

					.mine_place {
						.place_title {
							font-family: Arial;
							font-size: 32rpx;
							font-weight: 700;
							line-height: 60rpx;
							text-align: left;
							color: #1E1E1E;
						}

						.place_text {
							font-family: Arial;
							font-size: 28rpx;
							font-weight: 400;
							line-height: 48rpx;
							text-align: left;
							color: #999999;

							.rich_text {
								word-break: keep-all;
							}
						}
					}
				}
			}

			.submit_btn {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 90rpx;
				border-radius: 8rpx;
				background: #0067E0;
				font-family: Arial;
				font-size: 32rpx;
				font-weight: 500;
				line-height: 48rpx;
				text-align: center;
				color: #FFFFFF;
			}
		}
	}
</style>
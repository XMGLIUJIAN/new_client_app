<template>
	<view class="container">
		<view class="imageGroup">
			<u-image v-if="type == 1" width="750" height="1227" src="@/static/images/product/product_shortGroup.png"></u-image>
			<u-image v-if="type == 2" width="750" height="1227" src="@/static/images/product/product_midGroup.png"></u-image>
			<u-image v-if="type == 3" width="750" height="1227" src="@/static/images/product/product_longGroup.png"></u-image>
		</view>
		<view class="product_info">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false"
					:back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'" title="RINCIAN PRODUK" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					:title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
			<view class="product_card mt-[225rpx] mx-[30rpx]">
				<view class="product_card_image mb-[20rpx]">
					<u-image v-if="type == 1" width="650" height="325"
						src="@/static/images/product/product_short.png"></u-image>
					<u-image v-if="type == 2" width="650" height="325"
						src="@/static/images/product/product_mid.png"></u-image>
					<u-image v-if="type == 3" width="650" height="325"
						src="@/static/images/product/product_long.png"></u-image>
				</view>
				<view class="product_card_info" :class="switchCard(type)">
					<view class="card_info_head">
						<view class="head_label">Aman & Stabil</view>
						<view class="head_line"></view>
						<view class="head_label">Untung Maksimal</view>
						<view class="head_line"></view>
						<view class="head_label">Jangka Panjang</view>
					</view>
					<view class="card_info_box">
						<view class="card_box_head" :class="switchCard(type)" v-if="type == 1">Fund Beras Harum No.8
						</view>
						<view class="card_box_head" :class="switchCard(type)" v-if="type == 2">Dana Beras Golden
							Ayeyarwady No.9</view>
						<view class="card_box_head" :class="switchCard(type)" v-if="type == 3">Dana Beras Merah
							Berembrio No.8</view>
						<view class="card_box_line">
							<u-image v-if="type == 1" width="395" height="19"
								src="@/static/images/product/rectangle_mid.png"></u-image>
							<u-image v-if="type == 2" width="395" height="19"
								src="@/static/images/product/rectangle_mid.png"></u-image>
							<u-image v-if="type == 3" width="395" height="19"
								src="@/static/images/product/rectangle_long.png"></u-image>
						</view>
						<view class="card_box_info mt-[40rpx] mb-[40rpx]">
							<view class="card_box_label">
								<view class="label_num" :class="switchCard(type)">30.88%</view>
								<view class="label_text">Pertumbuhan Bulanan</view>
							</view>
							<view class="card_box_label">
								<view class="label_num" :class="switchCard(type)">7 Hari</view>
								<view class="label_text">Tanggal Investasi</view>
							</view>
						</view>
						<view class="card_info_title mb-[20rpx]" :class="switchCard(type)">Jumlah Investasi</view>
						<view class="card_info_investasi" v-if="type == 1">
							<u-image width="500" height="56" src="@/static/images/product/investasiGroup.png"></u-image>
							<view class="card_investasi_num">100.000.000</view>
						</view>
						<view class="product_info_profit" v-if="type != 1">
							<view class="card_info_profit" :class="switchCard(type)">
								<view class="profit_info_input">
									<u-input v-model="exchange_amount" type="number" :border="false"
										placeholder-style="color: #D7D7D7;font-size:20rpx;"
										placeholder="Masukkan Poin Investasi" />
								</view>
								<view class="profit_info_btn" :class="switchCard(type)">Estimasi Profit</view>
							</view>
						</view>
						<view class="card_text_profit mt-[20rpx] ml-[40rpx]" v-if="type != 1" :class="switchCard(type)">
							Poin Minimum Investasi: 1.000.000</view>
						<view class="product_card_foot">
							<view class="product_card_btn mt-[20rpx]" :class="switchCard(type)">Booking Sekarang</view>
						</view>
					</view>
				</view>
			</view>
			<view class="contract_card mt-[20rpx] mx-[30rpx]">
				<u-image v-if="type == 1" width="690" height="155" src="@/static/images/product/contract_short.png"></u-image>
				<u-image v-if="type == 2" width="690" height="155" src="@/static/images/product/contract_mid.png"></u-image>
				<u-image v-if="type == 3" width="690" height="155" src="@/static/images/product/contract_long.png"></u-image>
				<view class="contract_card_info">
					<view class="card_info_head">
						<u-image v-if="type == 1" width="35" height="35" src="@/static/images/product/product_icon_short.png"></u-image>
						<u-image v-if="type == 2" width="35" height="35" src="@/static/images/product/product_icon_mid.png"></u-image>
						<u-image v-if="type == 3" width="35" height="35" src="@/static/images/product/product_icon_long.png"></u-image>
						<view class="head_title" :class="switchCard(type)">Jenis Kontrak</view>
					</view>
					<view class="card_info_line"></view>
					<view class="card_info_foot" v-if="type == 1">Harian Bunga,Jatuh Tempo Pokok</view>
					<view class="card_info_foot" v-if="type == 2">Harian Bunga,Jatuh Tempo Pokok</view>
					<view class="card_info_foot" v-if="type == 3">Bunga & Pokok Saat Jatuh Tempo</view>
				</view>
			</view>
			<view class="advantage_card mt-[20rpx] mb-[20rpx] mx-[30rpx]">
				<view class="card_info_head">
					<u-image width="35" height="35" src="@/static/images/product/product_advantage.png"></u-image>
					<view class="head_title" :class="switchCard(type)">Jumlah Keuntungan</view>
				</view>
				<view class="card_info_line"></view>
				<view class="card_box_foot" v-if="type == 1">
					<view class="foot_label">
						<view class="label_title">Tunai Harian</view>
						<view class="label_text">Rp 893.323.434</view>
					</view>
					<view class="foot_line"></view>
					<view class="foot_label">
						<view class="label_title">Kembali Pokok</view>
						<view class="label_num">Rp 999.888.222</view>
					</view>
				</view>
				<view class="card_box_foot" v-if="type == 2">
					<view class="foot_label">
						<view class="label_title">Tunai Harian</view>
						<view class="label_text">Rp 893.323.434</view>
					</view>
					<view class="foot_line"></view>
					<view class="foot_label">
						<view class="label_title">Kembali Pokok</view>
						<view class="label_num">Rp 999.888.222</view>
					</view>
				</view>
				<view class="card_box_foot" v-if="type == 3">
					<view class="foot_label">
						<view class="label_title">Poin Investasi</view>
						<view class="label_text">893.323.434</view>
					</view>
					<view class="foot_temp">
						<u-image width="135" height="135" src="@/static/images/product/temp.png"></u-image>
					</view>
					<view class="foot_label">
						<view class="label_title">Keuntungan Tunai</view>
						<view class="label_num">Rp 999.888.222</view>
					</view>
				</view>
			</view>
			<view v-if="doShow" class="doShow">
                <view class="product_cokelat mb-[20rpx] mx-[30rpx]" v-if="type == 1">
                    <u-image width="690" height="825" src="@/static/images/product/product_address01.png"></u-image>
                </view>
                <view class="product_cokelat mb-[20rpx] mx-[30rpx]" v-if="type == 2">
                    <u-image width="690" height="825" src="@/static/images/product/product_address02.png"></u-image>
                </view>
                <view class="product_cokelat mb-[20rpx] mx-[30rpx]" v-if="type == 3">
                    <u-image width="690" height="825" src="@/static/images/product/product_address03.png"></u-image>
                </view>
                <view class="product_advantage mb-[150rpx] mx-[30rpx]" v-if="type == 1">
                    <u-image width="690" height="1110" src="@/static/images/product/product_advantage_short.png"></u-image>
                </view>
                <view class="product_advantage mb-[150rpx] mx-[30rpx]" v-if="type == 2">
                    <u-image width="690" height="1110" src="@/static/images/product/product_advantage_mid.png"></u-image>
                </view>
                <view class="product_advantage mb-[150rpx] mx-[30rpx]" v-if="type == 3">
                    <u-image width="690" height="1110" src="@/static/images/product/product_advantage_long.png"></u-image>
                </view>
            </view>
            <view v-else class="doShowBtn mb-[160rpx]">
                <view @tap="doShow = true">Klik untuk Melihat Detail
                    <u-icon name="arrow-down" color="#1E1E1E" size="28"></u-icon></view>
            </view>
            <view class="product_foot">
                <u-image v-if="type == 1" width="80" height="80" src="@/static/images/product/product_frame_short.png"></u-image>
                <u-image v-if="type == 2" width="80" height="80" src="@/static/images/product/product_frame_mid.png"></u-image>
                <u-image v-if="type == 3" width="80" height="80" src="@/static/images/product/product_frame_long.png"></u-image>
                <view class="product_foot_btn" :class="switchCard(type)">Tandatangan</view>
            </view>
			<ContractPopup v-if="contractShow" @cancel="contractShow = false"></ContractPopup>
			<SuccessPopup v-if="successShow" @cancel="successShow = false"></SuccessPopup>
			<LosePopup v-if="loseShow" @cancel="loseShow = false"></LosePopup>
			<Popup v-if="show" @cancel="show = false"></Popup>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { formatNumber } from '@/utils/util'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import ContractPopup from './components/contractPopup.vue'
	import SuccessPopup from './components/successPopup.vue'
	import LosePopup from './components/losePopup.vue'
	import Popup from './components/popup.vue'
	const scrollTop = ref<number>(0)
	const contractShow = ref<boolean>(false)
	const successShow = ref<boolean>(false)
	const loseShow = ref<boolean>(false)
	const show = ref<boolean>(false)
	const exchange_amount = ref<any>(null)
	const type = ref<number>(1)
    const doShow = ref(false)
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url: url
		})
	}
	const switchCard = (type : number | string) => {
		let classColor = ''
		switch (type) {
			case '1':
				classColor = 'short'
				break;
			case '2':
				classColor = 'mid'
				break;
			case '3':
				classColor = 'long'
				break;
		}
		return classColor
	}
	onLoad((option : any) => {
		type.value = option.type
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 平滑滚动，可选
        });
	})
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

		.product_info {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.product_card {
				padding: 20rpx 20rpx 30rpx 20rpx;
				border-radius: 12rpx;
				background: linear-gradient(180deg, #FFFFFF 11.06%, rgba(255, 255, 255, 0.25) 79.33%);

				.product_card_image {
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 12rpx;
				}

				.product_card_info {
					padding: 0 5rpx;
					border-top-left-radius: 12rpx;
					border-top-right-radius: 12rpx;

					&.short {
						background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #3B8D6A 110.29%);
					}

					&.mid {
						background: linear-gradient(0deg, rgba(246, 219, 144, 0) 0%, #D5AD50 110.29%);
					}

					&.long {
						background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #ED3E24 110.29%);
					}

					.card_info_head {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 10rpx 40rpx;

						.head_label {
							font-family: Arial;
							font-weight: 400;
							font-size: 18rpx;
							line-height: 30rpx;
							text-align: center;
							color: #FFFFFF;
						}

						.head_line {
							width: 2rpx;
							height: 18rpx;
							background: #FFFFFF;
						}
					}

					.card_info_box {
						padding: 40rpx 20rpx;
						border-radius: 12rpx;
						background: #FFFFFF;

						.card_box_head {
							font-family: Arial;
							font-weight: 700;
							font-size: 32rpx;
							line-height: 40rpx;
							text-align: center;

							&.short {
								color: #1E4B2E;
							}

							&.mid {
								color: #A88228;
							}

							&.long {
								color: #AE2D1A;
							}
						}

						.card_box_line {
							position: relative;
							top: -25rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}

						.card_box_info {
							display: flex;
							justify-content: space-around;
							align-items: center;

							.card_box_label {
								.label_num {
									font-family: Arial;
									font-weight: 700;
									font-size: 32rpx;
									line-height: 48rpx;
									text-align: center;

									&.short {
										color: #458060;
									}

									&.mid {
										color: #A88228;
									}

									&.long {
										color: #F06550;
									}
								}

								.label_text {
									font-family: Arial;
									font-weight: 400;
									font-size: 20rpx;
									line-height: 40rpx;
									text-align: center;
									color: #666666;
								}
							}
						}

						.card_info_title {
							font-family: Arial;
							font-weight: 700;
							font-size: 32rpx;
							line-height: 48rpx;
							text-align: center;

							&.short {
								color: #1E4B2E;
							}

							&.mid {
								color: #A88228;
							}

							&.long {
								color: #AE2D1A;
							}
						}

						.card_info_investasi {
							position: relative;
							display: flex;
							justify-content: center;
							align-items: center;

							.card_investasi_num {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								font-family: Arial;
								font-weight: 700;
								font-size: 36rpx;
								line-height: 40rpx;
								text-align: center;
								color: #1E1E1E;
							}
						}

						.product_info_profit {
							display: flex;
							justify-content: center;
							align-items: center;

							.card_info_profit {
								display: flex;
								justify-content: space-between;
								align-items: center;
								width: 515rpx;
								height: 67rpx;

								&.short {
									border: 4rpx solid #458060;
								}

								&.mid {
									border: 4rpx solid #D2B571;
								}

								&.long {
									border: 4rpx solid #F06550;
								}

								.profit_info_input {
									padding: 0 20rpx;
								}

								.profit_info_btn {
									width: 169rpx;
									height: 67rpx;
									font-family: Arial;
									font-weight: 400;
									font-size: 20rpx;
									line-height: 67rpx;
									text-align: center;
									color: #FFFFFF;

									&.short {
										background: #458060;
									}

									&.mid {
										background: #D2B571;
									}

									&.long {
										background: #F06550;
									}
								}
							}
						}

						.card_text_profit {
							font-family: Arial;
							font-weight: 400;
							font-size: 20rpx;
							line-height: 40rpx;
							text-align: left;

							&.short {
								color: #1E4B2E;
							}

							&.mid {
								color: #6F5A04;
							}

							&.long {
								color: #AE2D1A;
							}
						}

						.product_card_foot {
							display: flex;
							justify-content: center;
							align-items: center;

							.product_card_btn {
								width: 564rpx;
								height: 67rpx;
								border-radius: 12rpx;
								font-family: Arial;
								font-weight: 400;
								font-size: 30rpx;
								line-height: 67rpx;
								text-align: center;
								color: #FFFFFF;

								&.short {
									background: #458060;
								}

								&.mid {
									background: linear-gradient(180deg, #F6DB90 -94.03%, #D2B571 166.42%);
								}

								&.long {
									background: #F06550;
								}
							}
						}

					}
				}
			}
			.contract_card{
				position: relative;
				.contract_card_info{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					padding: 0 30rpx;
					.card_info_head{
						display: flex;
						justify-content: flex-start;
						align-items: center;
						padding: 20rpx 0;
						.head_title{
							margin-left: 20rpx;
							font-family: Arial;
							font-weight: 700;
							font-size: 30rpx;
							line-height: 40rpx;
							color: #1E4B2E;
						}
					}
					.card_info_line{
						height: 1rpx;
						background: #FFFFFF;
					}
					.card_info_foot{
						padding: 15rpx 0;
						font-family: Arial;
						font-weight: 400;
						font-size: 28rpx;
						line-height: 40rpx;
						text-align: center;
						color: #1E1E1E;
					}
				}
			}
			.advantage_card{
				padding: 0 30rpx;
				border-radius: 12rpx;
				background: #FFFFFF;
				.card_info_head{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 20rpx 0;
					.head_title{
						margin-left: 20rpx;
						font-family: Arial;
						font-weight: 700;
						font-size: 30rpx;
						line-height: 40rpx;
						&.short {
							color: #1E4B2E;
						}

						&.mid {
							color: #A88228;
						}

						&.long {
							color: #AE2D1A;
						}
					}
				}
				.card_info_line{
					height: 1rpx;
					background: #D7D7D7;
				}
				.card_box_foot{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.foot_label{
						padding: 40rpx 20rpx;
						.label_title{
							margin-bottom: 20rpx;
							font-family: Arial;
							font-weight: 400;
							font-size: 24rpx;
							line-height: 40rpx;
							text-align: center;
							color: #666666;
						}
						.label_text{
							font-family: Arial;
							font-weight: 400;
							font-size: 28rpx;
							line-height: 40rpx;
							text-align: center;
							color: #1E1E1E;
						}
						.label_num{
							font-family: Arial;
							font-weight: 400;
							font-size: 28rpx;
							line-height: 40rpx;
							text-align: center;
							color: #EB2C0F;
						}
					}
					.foot_line{
						width: 2rpx;
						height: 30rpx;
						background: #D7D7D7;
					}
				}
			}
			.product_cokelat{
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
				border-radius: 12rpx;
				background: #FFFFFF;
			}
			.product_advantage{
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
				border-radius: 12rpx;
				background: #FFFFFF;
			}
			.product_foot{
				position: fixed;
				bottom: 0;
				left: 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 20rpx 30rpx;
				background: #FFFFFF;
				.product_foot_btn{
					width: 550rpx;
					height: 76rpx;
					border-radius: 12rpx;
					font-family: Arial;
					font-weight: 400;
					font-size: 36rpx;
					line-height: 76rpx;
					text-align: center;
					color: #FFFFFF;
					&.short {
						background: #458060;
					}

					&.mid {
						background: #D2B571;
					}

					&.long {
						background: #AE2D1A;
					}
				}
			}

            .doShowBtn{
                text-align: center;
            }
		}
	}
</style>

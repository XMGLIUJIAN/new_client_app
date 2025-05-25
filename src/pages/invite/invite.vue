<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="inactive">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#FFFFFF"
					:title-bold="true" :background="{ background: 'transparent'}" title="UNDANG TEMAN"
					title-color="#FFFFFF">
				</u-navbar>
			</u-sticky>
			<view class="inactive_con pt-[40rpx] pb-[40rpx] px-[20rpx]">
				<view class="inactive_title">
					<u-image width="496" height="102" src="@/static/images/activity/logoGroup.png"></u-image>
				</view>
				<view class="inactive_teman">
					<view class="inactive_image">
						<u-image width="636" height="143" src="@/static/images/activity/rectangle.png" alt="" />
						<view class="inactive_box">
							<view class="box_head">
								<u-image width="48" height="48" src="@/static/images/activity/inactive_icon.png"
									alt="" />
								<view class="box_text">Ajak Teman Sebanyak Mungkin</view>
							</view>
						</view>
					</view>
				</view>
				<view class="inactive_popup">
					<view class="popup_image">
						<u-image width="686" height="732" src="@/static/images/activity/inactiveGroup.png" alt="" />
					</view>
					<view class="inactive_card">
						<view class="card_head">Bagikan QR</view>
						<view class="card_simpan">Simpan & Bagikan QR dengan Mudah</view>
						<view class="card_code">
							<view class="code">
								<uqrcode v-if="userInfo.invite_link" id="uqrcode" ref="uqrcodeRef" canvas-id="qrcode" :value="userInfo.invite_link"
									@complete="canvasToTempFilePath"></uqrcode>
								<view class="card_mask" v-if="refresh">
									<view class="tips">The QR code has expired</view>
									<view class="refresh" @tap="refreshCode">Refresh</view>
								</view>
							</view>
						</view>
						<view class="inactive_line"></view>
						<view class="card_invite">
							<view class="code_title">Kode Referral£º</view>
							<view class="code_text">{{userInfo.invite_code}}</view>
						</view>
						<view class="card_link">Salin & Bagikan Tautan</view>
						<view class="link_input">
							<view class="link">
								<view class="invite_link">{{userInfo.invite_link}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="submit-btn" @tap="copy(userInfo.invite_link)">Undang Teman</view>
				<view class="proses">Berhasil Mengundang! Hadiah Sedang Diproses</view>
			</view>
			<toastPopup></toastPopup>
		</view>
		<view class="bottom_Group">
			<u-image width="750" height="185" src="@/static/images/page/extend_bot.png"></u-image>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onShow } from '@dcloudio/uni-app'
	import { emitter } from '@/utils/emitter';
	import { ref, reactive, computed, getCurrentInstance } from 'vue'
	import { useUserStore } from '@/stores/user'
	const userStore = useUserStore()
	const userInfo = computed(() => userStore.userInfo)
	const refresh = ref<Boolean>(false)
	const codeFile = ref<any>(null)
	const { proxy } = getCurrentInstance();
	const canvasToTempFilePath = () => {
		proxy.$refs.uqrcodeRef.toTempFilePath({
			success: (res : any) => {
				codeFile.value = res.tempFilePath
			}
		});
	}
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const copy = (text : string) => {
		uni.setClipboardData({
			showToast: false,
			data: String(text),
			success: function () {
				toast('Isinya disalin')
			}
		})
	}
	const saveTempFilePath = () => {
		let tempFilePath = codeFile.value
		// #ifdef APP
		const reg = new RegExp('^data:image/png;base64,', 'g');
		const dataURL = tempFilePath.replace(reg, '');
		uni.saveImageToPhotosAlbum({
			filePath: dataURL,
			success: res => {
				console.log(res);
			},
			fail: err => {
				console.log(err);
			}
		});
		// #endif
	}
	const refreshCode = () => {
		userStore.getUser()
		refresh.value = false
	}
	onShow(() => {
		userStore.getUser()
	})
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		background: #0059C0;
		min-height: 100vh;

		.bottom_Group {
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 50;
		}

		.inactive {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 88;
			.inactive_con {
				margin-top: 60rpx;

				.inactive_title {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 60rpx;
				}

				.inactive_teman {
					display: flex;
					justify-content: center;
					align-items: center;

					.inactive_image {
						position: relative;

						.inactive_box {
							position: absolute;
							top: 0;
							left: 0;
							width: 636rpx;
							height: 166rpx;
							padding: 30rpx;

							.box_head {
								display: flex;
								justify-content: flex-start;
								align-items: center;

								.box_text {
									font-family: Arial;
									font-weight: 700;
									font-size: 28rpx;
									line-height: 54rpx;
									text-align: left;
									color: #1B417B;
								}
							}
						}
					}
				}

				.inactive_popup {
					position: relative;
					top: -35rpx;
					.popup_image {
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.inactive_card {
						position: absolute;
						top: 0;
						left: 50%;
						transform: translate(-50%, 0);
						padding: 20rpx;
						border-radius: 20rpx;

						.card_head {
							font-family: Arial;
							font-size: 32rpx;
							font-weight: 700;
							line-height: 56rpx;
							text-align: center;
							color: #FFFFFF;
						}

						.card_simpan {
							margin-bottom: 20rpx;
							font-family: Arial;
							font-size: 24rpx;
							font-weight: 700;
							line-height: 56rpx;
							text-align: center;
							color: #B1BCCB;
						}

						.card_code {
							display: flex;
							justify-content: center;
							align-items: center;

							.code {
								position: relative;
								width: 268rpx;
								height: 268rpx;
								background: #FFFFFF;

								#uqrcode {
									position: absolute;
									top: 50%;
									left: 50%;
									transform: translate(-50%, -50%);
								}

								.card_mask {
									position: absolute;
									top: 0;
									left: 0;
									display: flex;
									flex-direction: column;
									justify-content: center;
									align-items: center;
									width: 100%;
									height: 100%;
									background: rgba(255, 255, 255, 0.8);
									z-index: 99;

									.tips {
										margin-bottom: 20rpx;
										font-family: serif;
										font-size: 26rpx;
										font-weight: 400;
										line-height: 40rpx;
										text-align: center;
										color: #333333;
									}

									.refresh {
										display: flex;
										justify-content: center;
										align-items: center;
										width: 150rpx;
										height: 48rpx;
										border-radius: 12rpx;
										background: #006DEC;
										font-family: Arial;
										font-size: 24rpx;
										font-weight: 400;
										line-height: 48rpx;
										text-align: center;
										color: #FFFFFF;
									}
								}
							}

						}
						.inactive_line{
							margin-top: 45rpx;
							margin-bottom: 20rpx;
							border: 3rpx dashed rgba(229, 235, 255, 0.3);
						}
						.card_invite {
							display: flex;
							justify-content: center;
							align-items: center;

							.code_title {
								font-family: Arial;
								font-size: 28rpx;
								font-weight: 500;
								line-height: 56rpx;
								text-align: center;
								color: #FFFFFF;
							}

							.code_text {
								font-family: Arial;
								font-size: 28rpx;
								font-weight: 700;
								line-height: 56rpx;
								text-align: center;
								color: #FFFFFF;
							}
						}

						.card_link {
							margin-bottom: 20rpx;
							font-family: Arial;
							font-size: 24rpx;
							font-weight: 500;
							line-height: 56rpx;
							text-align: center;
							color: #B1BCCB;
						}

						.link_input {
							display: flex;
							justify-content: space-between;
							align-items: center;
							overflow: hidden;
							border-radius: 8rpx;
							background: #F1F4FF;

							.link {
								width: 578rpx;
								height: 85rpx;
								padding: 20rpx;

								.invite_link {
									height: 48rpx;
									font-family: Arial;
									font-size: 22rpx;
									font-weight: 500;
									line-height: 48rpx;
									text-align: left;
									color: #0067E0;
									text-overflow: ellipsis;
									overflow: hidden;
									word-break: break-all;
									white-space: nowrap;
								}
							}
						}
					}
				}
				.submit-btn{
					width: 686rpx;
					height: 98rpx;
					background: #FFFFFF;
					border-radius: 49rpx;
					font-family: Arial;
					font-weight: 700;
					font-size: 36rpx;
					line-height: 98rpx;
					color: #0067E0;
					text-align: center;
					z-index: 88;
				}
				.proses{
					margin-top: 20rpx;
					font-family: Arial;
					font-weight: 400;
					font-size: 24rpx;
					line-height: 48rpx;
					text-align: center;
					color: #FFFFFF;
					z-index: 88;
				}
			}
		}
	}
</style>
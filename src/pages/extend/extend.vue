<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="886" src="@/static/images/page/imageGroup.png"></u-image>
		</view>
		<view class="inactive">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="false" :is-fixed="true" :border-bottom="false"
					:back-icon-color="scrollTop ? '#1E1E1E':'#FFFFFF'" :title-bold="true"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					:title-color="scrollTop ? '#1E1E1E':'#FFFFFF'" title="UNDANG TEMAN">
					<template #right>
						<view class="slot-wrap" @tap="navigateTo('/pages/customer_service/customer_service')">
							<u-image v-if="scrollTop" width="40" height="40" src="@/static/images/icon/contact.png"
								alt="" />
							<u-image v-if="!scrollTop" width="40" height="40"
								src="@/static/images/user/icon_service.png" alt="" />
						</view>
					</template>
				</u-navbar>
			</u-sticky>
			<view class="inactive_Group mt-[200rpx] mx-[30rpx]">
				<u-image width="690" height="1147" src="@/static/images/page/invite_card.png"></u-image>
				<view class="inactive_box">
					<view class="inactive_popup">
						<view class="inactive_card">
							<view class="inactive_title">
								<u-image width="376" height="89" src="@/static/images/page/logoGroup.png"></u-image>
							</view>
							<view class="inactive_text mt-[20rpx]">Undang Sebanyak Mungkin Teman</view>
							<view class="card_invite mt-[30rpx] mb-[20rpx]">
								<u-image width="35" height="30" src="@/static/images/page/icon_left.png"></u-image>
								<view class="code_title">Kode Referral</view>
								<u-image width="35" height="30" src="@/static/images/page/icon_right.png"></u-image>
							</view>
							<view class="code_text">{{userInfo.invite_code}}</view>
							<view class="card_link">Salin and Bagikan Tautan</view>
							<view class="link_input" @tap="copy(userInfo.invite_link)">
								<view class="link">
									<view class="invite_link">{{userInfo.invite_link}}</view>
								</view>
							</view>
							<view class="inactive_line">
								<u-image width="475" height="2" src="@/static/images/page/inactive_line.png"></u-image>
							</view>
							<view class="card_simpan">Simpan and Bagikan QR dengan Mudah</view>
							<view class="card_code">
								<view class="code">
									<uqrcode v-if="userInfo.invite_link" id="uqrcode" ref="uqrcodeRef"
										canvas-id="qrcode" :value="userInfo.invite_link"
										@complete="canvasToTempFilePath"></uqrcode>
									<view class="card_mask" v-if="refresh">
										<view class="tips">The QR code has expired</view>
										<view class="refresh" @tap="refreshCode">Refresh</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="proses mt-[20rpx] mb-[20rpx]">Berhasil Mengundang! Hadiah Sedang Diproses</view>
			</view>
			<toastPopup></toastPopup>
			<tabbar />
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onPageScroll, onShow } from '@dcloudio/uni-app'
	import { emitter } from '@/utils/emitter';
	import { ref, reactive, computed, getCurrentInstance } from 'vue'
	import { useUserStore } from '@/stores/user'
	const scrollTop = ref<number>(0)
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
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
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
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>
<style lang="scss">
	page {
		background: #80B398 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.inactive {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.slot-wrap {
				padding-right: 30rpx;
			}

			.inactive_Group {
				position: relative;

				.inactive_box {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					padding: 30rpx;

					.inactive_popup {
						position: relative;

						.inactive_card {
							position: absolute;
							top: 0;
							left: 50%;
							transform: translate(-50%, 0);
							padding: 20rpx;
							border-radius: 20rpx;

							.inactive_title {
								display: flex;
								justify-content: center;
								align-items: center;
							}
							
							.inactive_text {
								font-family: Arial;
								font-weight: 400;
								font-size: 32rpx;
								text-align: center;
								line-height: 54rpx;
								color: #FFFFFF;
							}
							
							.card_invite {
								display: flex;
								justify-content: center;
								align-items: center;
								.code_title {
									margin: 0 20rpx;
									font-family: Arial;
									font-size: 36rpx;
									font-weight: 500;
									line-height: 54rpx;
									text-align: center;
									color: #FFFFFF;
								}
							}

							.code_text {
								margin-bottom: 50rpx;
								font-family: Arial;
								font-size: 64rpx;
								font-weight: 500;
								line-height: 56rpx;
								text-align: center;
								color: #FFFFFF;
							}

							.card_link {
								margin-bottom: 20rpx;
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 56rpx;
								text-align: center;
								color: #FFFFFF;
							}

							.link_input {
								display: flex;
								justify-content: space-between;
								align-items: center;
								overflow: hidden;
								border-radius: 12rpx;
								background: #FFFFFF;

								.link {
									width: 578rpx;
									padding: 10rpx 30rpx;

									.invite_link {
										height: 48rpx;
										font-family: Arial;
										font-size: 22rpx;
										font-weight: 500;
										line-height: 48rpx;
										text-align: left;
										color: #1E4B2E;
										text-overflow: ellipsis;
										overflow: hidden;
										word-break: break-all;
										white-space: nowrap;
									}
								}
							}

							.inactive_line {
								display: flex;
								justify-content: center;
								align-items: center;
								margin-top: 50rpx;
								margin-bottom: 50rpx;
							}

							.card_simpan {
								margin-bottom: 20rpx;
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 56rpx;
								text-align: center;
								color: #FFFFFF;
							}

							.card_code {
								display: flex;
								justify-content: center;
								align-items: center;

								.code {
									position: relative;
									width: 327rpx;
									height: 327rpx;
									border-radius: 18rpx;
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
						}
					}
				}

				.proses {
					font-family: Arial;
					font-weight: 400;
					font-size: 24rpx;
					line-height: 48rpx;
					text-align: center;
					color: #1E4B2E;
				}
			}
		}
	}
</style>
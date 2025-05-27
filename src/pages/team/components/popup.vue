<template>
	<view class="popup" v-if="show">
		<view class="content">
			<view class="extendCard">
				<view class="extend_invite">
					<view class="extend_head">UNDANG TEMAN</view>
					<view class="extend_text">Undang untuk bergabung</view>
					<view class="extend_image">
						<u-image width="447" height="252" src="@/static/images/activity/inactive.png" alt="" />
					</view>
					<view class="uqrcode_box">
						<view class="extend_code">
							<view class="code">
								<uqrcode v-if="show" id="uqrcode" ref="uqrcodeRef" canvas-id="qrcode" :value="uQrlink"
									@complete="canvasToTempFilePath" size="128"></uqrcode>
							</view>
						</view>
						<view class="card_invite">
							<view class="code_title">Kode undangan:</view>
							<view class="code_text">{{uQrcode}}</view>
						</view>
					</view>
					<view class="extend_link">
						<view class="link">
							<view class="invite_link">{{uQrlink}}</view>
						</view>
						<view class="copy" @tap="copyPopup(uQrlink)">Salin</view>
					</view>
				</view>
				<view class="extend_close" @tap="cancelPopup">
					<u-image width="40" height="40" src="@/static/images/team/close.png" alt="" />
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { watch, ref, getCurrentInstance } from 'vue'
	const uQrcode = ref<String>('')
	const uQrlink = ref<String>('')
	const codeFile = ref<String>('')
	const { proxy } = getCurrentInstance();
	const props = defineProps({
		show: {
			type: Boolean,
			default: false
		},
		code: {
			type: String,
			default: '123456'
		},
		link: {
			type: String,
			default: '123456'
		}
	})
	watch(
		() => props.code,
		(nVal) => {
			uQrcode.value = nVal
		},
		{ immediate: true }
	)
	watch(
		() => props.link,
		(nVal) => {
			uQrlink.value = nVal
		},
		{ immediate: true }
	)
	const emit = defineEmits(['copy', 'cancel']);
	const copyPopup = (link : String) => {
		emit('copy', link);
	}
	const cancelPopup = () => {
		emit('cancel');
	}
	const canvasToTempFilePath = () => {
		proxy.$refs.uqrcodeRef.toTempFilePath({
			success: (res : any) => {
				codeFile.value = res.tempFilePath
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
</script>

<style lang="scss" scoped>
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		z-index: 999;

		.content {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;

			.extendCard {
				position: relative;
				width: 562rpx;
				padding: 40rpx;
				border-radius: 12rpx;
				background: linear-gradient(180deg, #0067E0 0%, #4162E7 100%);

				.extend_invite {
					.extend_head {
						font-family: Arial;
						font-size: 40rpx;
						font-weight: 900;
						line-height: 60rpx;
						text-align: center;
						color: #FFFFFF;
					}

					.extend_text {
						font-family: Arial;
						font-size: 36rpx;
						font-weight: 700;
						line-height: 54rpx;
						text-align: center;
						color: #FFFFFF;
					}

					.extend_image {
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.uqrcode_box {
						margin: 20rpx 40rpx;
						padding: 20rpx;
						border-radius: 20rpx;
						background: linear-gradient(180deg, #EBF4FF 0%, #FFFFFF 100%);

						.extend_code {
							display: flex;
							justify-content: center;
							align-items: center;
							margin: 20rpx 0;

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
							}
						}

						.card_invite {
							display: flex;
							justify-content: center;
							align-items: center;

							.code_title {
								margin-right: 10rpx;
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 600;
								line-height: 56rpx;
								text-align: center;
								color: #1E1E1E;
							}

							.code_text {
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 56rpx;
								text-align: center;
								color: #0067E0;
							}
						}
					}


					.extend_link {
						display: flex;
						justify-content: space-between;
						align-items: center;
						border-radius: 8rpx;
						background: #E5EBFF;

						.link {
							width: 350rpx;
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
								overflow: hidden;
								text-overflow: ellipsis;
								/* ����������ʾʡ�Ժ� */
							}
						}

						.copy {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 124rpx;
							height: 85rpx;
							background: #FFFFFF;
							border-top-right-radius: 8rpx;
							border-bottom-right-radius: 8rpx;
							font-family: Arial;
							font-size: 26rpx;
							font-weight: 500;
							line-height: 48rpx;
							text-align: left;
							color: #0067E0;
						}
					}
				}

				.extend_close {
					position: absolute;
					top: 20rpx;
					right: 20rpx;
				}
			}
		}
	}
</style>
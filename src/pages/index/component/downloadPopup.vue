<template>
	<u-popup v-model="show" mode="bottom" border-radius="28" :safe-area-inset-bottom="true">
		<view class="download">
			<u-image width="750" height="360" src="@/static/images/page/download_popup.png" alt="" />
			<view class="content">
				<view class="download_row">
					<u-image width="112" height="112" src="@/static/images/icon/download_icon01.png" alt="" />
					<view class="download_info">
						<view class="app_info">
							<view class="download_title">Rice Rich - APP</view>
							<view class="download_text">Investasi Pintar Masa Depan Terjamin</view>
						</view>
						<view class="download_btn" @tap="downloadAPP(download_url)">
							<u-image width="200" height="72" src="@/static/images/activity/download_btn.png" alt="" />
							<view class="download_text">
								<u-image width="30" height="30" src="@/static/images/icon/download.png" alt="" />
								<view class="btn_text">Unduh</view>
							</view>

						</view>
					</view>
				</view>
				<view class="download_row">
					<u-image width="112" height="112" src="@/static/images/icon/download_icon02.png" alt="" />
					<view class="download_info">
						<view class="browser_info">
							<view class="download_label">Telusuri di sini</view>
						</view>
						<view class="browser_btn" @tap="show = false">Lanjut</view>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { download } from '@/api/user';
	const show = ref<boolean>(false)
	const download_url = ref<string>('')
	const getdownload = async () => {
		const data = await download()
		download_url.value = data.download_url
	}
	const downloadAPP = (link : string) => {
		// #ifdef H5
		window.location.href = link
		// #endif
	}
	const openPopup = () => {
		show.value = true
	}
	getdownload()
	defineExpose({ openPopup })
</script>


<style lang="scss" scoped>
	.download {
		position: relative;
		width: 100%;
		overflow: hidden;
		touch-action: none;

		.content {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			padding: 40rpx 40rpx 0 40rpx;

			.download_row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 40rpx;

				.download_info {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.app_info {
						margin: 0 20rpx;
						width: 315rpx;

						.download_title {
							font-family: Arial;
							font-weight: 700;
							text-align: left;
							font-size: 32rpx;
							line-height: 48rpx;
							color: #0067E0;
						}

						.download_text {
							font-family: Arial;
							font-weight: 400;
							font-size: 22rpx;
							text-align: left;
							line-height: 40rpx;
							color: #999999;
						}
					}

					.browser_info {
						margin: 0 20rpx;
						width: 315rpx;

						.download_label {
							font-family: Arial;
							font-weight: 700;
							font-size: 32rpx;
							text-align: left;
							line-height: 48rpx;
							color: #333333;
						}
					}

					.download_btn {
						position: relative;
						width: 200rpx;
						height: 72rpx;

						.download_text {
							position: absolute;
							top: 0;
							left: 0;
							display: flex;
							justify-content: center;
							align-items: center;
							width: 200rpx;
							height: 72rpx;
							border-radius: 36rpx;

							.btn_text {
								margin-left: 5rpx;
								font-family: Arial;
								font-weight: 900;
								font-size: 24rpx;
								text-align: center;
								color: #FFFFFF;
							}
						}
					}


					.browser_btn {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 200rpx;
						height: 72rpx;
						border-radius: 36rpx;
						background: #E1E8F3;
						font-family: Arial;
						font-weight: 900;
						font-size: 24rpx;
						text-align: center;
						color: #333333;
					}
				}
			}
		}
	}
</style>
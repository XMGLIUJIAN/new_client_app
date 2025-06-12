<template>
	<view class="popup">
		<view class="content">
			<view class="success">
				<u-image width="59success9" height="995" src="@/static/images/product/success.png"></u-image>
				<view class="success_info">
					<view class="tips mt-[150rpx]">Penandatanganan Berhasil</view>
					<view class="success_info_box">
						<view class="success_box mt-[80rpx]">
							<view class="success_image">
								<u-image width="135" height="135" src="@/static/images/icon/success.png" alt="" />
							</view>
							<view class="success_model">
								<view class="model_box">
									<u-image width="61" height="95" src="@/static/images/icon/icon_days.png" alt="" />
									<view class="day_info">
										<view class="day_title mt-[10rpx]">Hari</view>
										<view class="day_title">Investasi</view>
										<view class="daya_num">{{props.data.siklus_investasi}}</view>
									</view>
								</view>
							</view>
							<view class="success_explain mt-[100rpx]">
								<view class="explain_title">Silver Mine Investment Agreement</view>
								<view class="explain_line mt-[20rpx] mb-[30rpx]"></view>
								<view class="explain_box">
									<view class="explain_label">
										<view class="label_num">{{props.investPoint}}</view>
										<view class="label_title">Poin Investasi</view>
									</view>
									<view class="explain_label">
										<view class="label_text">10.15.2025</view>
										<view class="label_title">Tanggal Kontrak</view>
									</view>
								</view>
							</view>
							<view class="success_foot mt-[20rpx]">
								<view class="explain_card mb-[175rpx]">
									<view class="explain_card_title">No. Kontrak</view>
									<view class="explain_card_num">{{props.contractName}}</view>
								</view>
								<view class="explain_btn" @tap="navigateTo('/pages/contract/contract')">Selesai</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const date = new Date()
const today = ref()
const emit = defineEmits(['confirm', 'cancel'])
const cancelPopup = () => {
    emit('cancel')
}
const navigateTo = (url: string) => {
    cancelPopup()
    uni.navigateTo({
        url: url
    })
}
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    contractName: {
        type:String,
        default:''
    },
    investPoint: {
        type: Number,
        default:0
    }
})
console.log(props)
</script>

<style lang="scss" scoped>
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.6);
		z-index: 999;

		.content {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;

			.success {
				position: relative;
				width: 599rpx;
				border-radius: 12rpx;

				.success_info {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					padding: 40rpx;

					.tips {
						font-family: Arial;
						font-weight: 700;
						font-size: 36rpx;
						text-align: center;
						line-height: 48rpx;
						color: #458060;
					}

					.success_info_box {
						display: flex;
						justify-content: center;
						align-items: center;

						.success_box {
							position: relative;
							width: 482rpx;
							height: 450rpx;
							border-radius: 20rpx;
							background: #EDF2ED;

							.success_image {
								position: absolute;
								top: -60rpx;
								left: 50%;
								transform: translate(-50%, 0);
							}

							.success_model {
								position: absolute;
								top: 0;
								right: 50rpx;
								z-index: 98;

								.model_box {
									position: relative;

									.day_info {
										position: absolute;
										top: 0;
										left: 0;
										width: 100%;

										.day_title {
											font-family: Arial;
											font-weight: 400;
											font-size: 12rpx;
											line-height: 20rpx;
											text-align: center;
											color: #000000;
										}

										.daya_num {
											font-family: Arial;
											font-weight: 400;
											font-size: 28rpx;
											line-height: 25rpx;
											text-align: center;
											color: #000000;
										}
									}
								}
							}

							.success_explain {
								padding: 20rpx 40rpx;

								.explain_title {
									font-family: Arial;
									font-weight: 700;
									font-size: 24rpx;
									line-height: 28rpx;
									text-align: center;
									color: #579D7F;
								}

								.explain_line {
									height: 2rpx;
									background: #D7D7D7;
								}

								.explain_box {
									display: flex;
									justify-content: space-between;
									align-items: center;

									.explain_label {
										.label_text {
											font-family: Arial;
											font-weight: 700;
											font-size: 24rpx;
											line-height: 40rpx;
											text-align: center;
											color: #1E1E1E;
										}

										.label_title {
											font-family: Arial;
											font-weight: 400;
											font-size: 20rpx;
											line-height: 40rpx;
											text-align: center;
											color: #999999;
										}

										.label_text {
											font-family: Arial;
											font-weight: 400;
											font-size: 24rpx;
											line-height: 40rpx;
											text-align: center;
											color: #1E1E1E;
										}
									}
								}
							}
							.success_foot{
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								.explain_card{
									display: flex;
									flex-direction: column;
									justify-content: center;
									align-items: center;
									width: 420rpx;
									height: 75rpx;
									border: 1rpx solid #666666;
									.explain_card_title{
										font-family: Arial;
										font-weight: 400;
										font-size: 20rpx;
										line-height: 40rpx;
										text-align: center;
										color: #666666;
									}
									.explain_card_num{
										font-family: Arial;
										font-weight: 400;
										font-size: 20rpx;
										line-height: 40rpx;
										text-align: center;
										color: #1E1E1E;
									}
								}
								.explain_btn{
									width: 420rpx;
									height: 76rpx;
									border-radius: 76rpx;
									background: #579D7F;
									font-family: Arial;
									font-weight: 400;
									font-size: 32rpx;
									line-height: 76rpx;
									text-align: center;
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

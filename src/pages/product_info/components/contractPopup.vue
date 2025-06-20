<template>
    <view class="popup">
        <view class="content">
            <view class="prize" @tap="confirmPopup">
                <view class="tips mb-[40rpx]">Petunjuk</view>
<!--                <view class="explain mb-[40rpx]">-->
<!--                    <view class="explain_line"></view>-->
<!--                    <view class="explain_title">Buka zona setelah memenuhi syarat</view>-->
<!--                    <view class="explain_line"></view>-->
<!--                </view>-->
                <view class="contract_box mt-[20rpx] mb-[20rpx]">
<!--                    <view class="num">01</view>-->
                    <view class="contract_text">{{props.msg}}</view>
                </view>
<!--                <view class="contract_box mb-[20rpx]">-->
<!--                    <view class="num">02</view>-->
<!--                    <view class="contract_text">Mengundang anggota resmi baru</view>-->
<!--                </view>-->
                <view v-if="props.invite > 0" class="contract_num">{{ props.invite }} Orang</view>
<!--                <view v-else class="contract_num">{{ props.msg }}</view>-->
                <view class="btn" @tap="cancelPopup">
                    <u-image
                        width="52"
                        height="52"
                        src="@/static/images/icon/icon_cancel.png"
                    ></u-image>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
const emit = defineEmits(['confirm', 'cancel'])
const props = defineProps({
    invite: {
        type: Number,
        default: 0
    },
    msg: {
        type: String,
        default: ''
    }
})
const confirmPopup = () => {
    emit('confirm')
}
const cancelPopup = () => {
    emit('cancel')
}
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

        .prize {
            position: relative;
            width: 575rpx;
            padding: 40rpx;
            background: linear-gradient(360deg, #ffffff 67.79%, #d7f1e6 100%);
            border-radius: 12rpx;
            .tips {
                font-family: Arial;
                font-weight: 700;
                font-size: 40rpx;
                text-align: center;
                line-height: 48rpx;
                color: #1e4b2e;
            }
            .explain {
                display: flex;
                justify-content: center;
                align-items: center;
                .explain_title {
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 24rpx;
                    line-height: 40rpx;
                    color: #458060;
                }
                .explain_line {
                    margin: 10rpx;
                    width: 20rpx;
                    height: 2rpx;
                    background: #458060;
                }
            }
            .contract_box {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 480rpx;
                height: 49rpx;
                background: linear-gradient(360deg, #ffffff 25%, #c7e1c9 100%);
                .num {
                    font-family: Arial;
                    font-weight: 700;
                    font-style: italic;
                    font-size: 40rpx;
                    line-height: 40rpx;
                    color: #458060;
                }
                .contract_text {
                    margin-left: 20rpx;
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 26rpx;
                    line-height: 40rpx;
                    color: #458060;
                }
            }
            .contract_num {
                font-family: Arial;
                font-weight: 700;
                font-size: 36rpx;
                text-align: center;
                line-height: 40rpx;
                color: #458060;
            }
            .btn {
                position: absolute;
                bottom: -100rpx;
                left: 50%;
                transform: translate(-50%, 0);
            }
        }
    }
}
</style>

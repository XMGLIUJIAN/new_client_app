<template>
    <view class="container">
        <view class="imageGroup">
            <u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
        </view>
        <view class="earn_point">
            <u-sticky h5-nav-height="0" bg-color="transparent">
                <u-navbar
                    :is-back="true"
                    :is-fixed="true"
                    :border-bottom="false"
                    :back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'"
                    title="POIN PROFITPLUS"
                    :title-bold="true"
                    :background="{ background: scrollTop ? '#FFFFFF' : 'transparent' }"
                    :title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'"
                >
                </u-navbar>
            </u-sticky>
            <view class="point_card mt-[50rpx] mb-[20rpx] mx-[30rpx]">
                <view class="card_head">
                    <view class="card_head_poin">Total Poin</view>
                    <view class="card_head_lock" @tap="eyeChange">
                        <u-image
                            v-if="!eyeShow"
                            width="30"
                            height="30"
                            src="@/static/images/icon/icon_see.png"
                            alt=""
                        />
                        <u-image
                            v-else
                            width="30"
                            height="30"
                            src="@/static/images/icon/icon_lock.png"
                            alt=""
                        />
                    </view>
                </view>
                <view class="card_point_num">{{!eyeShow ? formatNumber(userInfo.user_integral) || 0 : '***' }}</view>
                <view class="point_card_box">
                    <view class="point_card_label">
                        <view class="card_label_text">Pendapatan Kemarin</view>
                        <view class="card_label_num">{{!eyeShow ? "Rp "+formatNumber(pageData.yesterday_income) || 0 : '***' }}</view>
                    </view>
                    <view class="point_card_label">
                        <view class="card_label_text">Total Keuntungan</view>
                        <view class="card_label_num">{{!eyeShow ? "Rp "+formatNumber(pageData.total_income) || 0 : '***' }}</view>
                    </view>
                </view>
                <view class="point_card_foot mt-[50rpx]">
                    <view class="foot_btn" @tap="navigateTo('/pages/points/points')">Tukar</view>
                </view>
            </view>
            <view class="profit_card mt-[20rpx] mb-[20rpx] mx-[30rpx]">
                <view class="profit_card_head">Penjelasan Tingkat Keuntungan</view>
                <view class="profit_card_line mt-[20rpx] mb-[20rpx]"></view>
                <view class="profit_card_dashboard mt-[20rpx] mb-[20rpx]">
                    <u-image
                        v-if="pageData.income_level==1"
                        width="268"
                        height="120"
                        src="@/static/images/card/dashboard_first.png"
                    ></u-image>
                     <u-image v-else width="268" height="120" src="@/static/images/card/dashboard_second.png"></u-image>
                </view>
                <view class="profit_dashboard_text">Persentase Rilis Harian Saat Ini</view>
                <view class="profit_dashboard_num">{{ pageData.rate*100 }}%</view>
                <view class="profit_countdown mt-[20rpx] mb-[20rpx]">
                    <u-image
                        width="35"
                        height="35"
                        src="@/static/images/card/icon_countdown.png"
                    ></u-image>
                    <view class="profit_countdown_text">Hitung Mundur：{{pageData.expiration_time}}</view>
                </view>
                <view class="profit_card_box mb-[40rpx] mx-[40rpx]">
                    <view class="profit_card_text">Tingkat Keuntungan</view>
                    <view class="profit_card_btn">{{pageData.income_level*100}}%</view>
                </view>
                <view class="profit_card_estimate">
                    <view class="card_estimate_text">Estimasi Hari Ini</view>
                    <view class="card_estimate_num">{{!eyeShow ? "Rp "+formatNumber(pageData.estimated_revenue) || 0 : '***' }}</view>
                </view>
                <view class="profit_card_issue">
                    <view class="card_issue_head">
                        <view class="issue_head_title">Pengalaman Rilis</view>
                        <view class="issue_head_num">200%</view>
                    </view>
                    <view class="card_issue_line mt-[5rpx] mb-[20rpx]"></view>
                    <view class="card_issue_box">
                        <view class="card_invite_official mb-[20rpx]">
                            <u-image
                                width="173"
                                height="130"
                                src="@/static/images/card/invite_official.png"
                            ></u-image>
                            <view class="invite_info">
                                <view class="invite_info_label">Undang Pengguna Resmi,</view>
                                <view class="invite_info_label"
                                    >Rilis Naik Menjadi<text class="label_text">0.1%</text></view
                                >
                            </view>
                        </view>
                        <view class="card_invite_user">
                            <view class="invite_info">
                                <view class="invite_info_label"
                                    >Undang Pengguna<text class="label_text">+1,</text></view
                                >
                                <view class="invite_info_label"
                                    >Waktu Keuntungan Tinggi<text class="label_text"
                                        >+2 Hari</text
                                    ></view
                                >
                            </view>
                            <u-image
                                width="143"
                                height="132"
                                src="@/static/images/card/invite_user.png"
                            ></u-image>
                        </view>
                        <view class="issue_invite">
                            <u-image
                                width="65"
                                height="65"
                                src="@/static/images/card/issue_invite.png"
                            ></u-image>
                        </view>
                    </view>
                </view>
            </view>
            <view class="point_investasi mb-[30rpx] mx-[30rpx]">
                <u-image
                    width="690"
                    height="260"
                    src="@/static/images/card/point_investasi.png"
                ></u-image>
            </view>
        </view>
    </view>
    <toastPopup></toastPopup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { formatNumber } from '@/utils/util'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onLoad, onPageScroll, onShow } from '@dcloudio/uni-app'
import { getPointVaultIncomeRateApi } from '@/api/point'
import { emitter } from '@/utils/emitter'
const scrollTop = ref<number>(0)
const eyeShow = ref<boolean>(true)
const pageData = ref<any>({
    income_level:0,
    yesterday_income:0,
    rate:0.0005,
    total_income:0,
    estimated_revenue:0,
    expiration_time:'-'
})
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const navigateTo = (url: string) => {
    uni.navigateTo({
        url: url
    })
}
const eyeChange = () => {
    eyeShow.value = !eyeShow.value
}

const fetchEarnPointData = async () => {
    emitter.emit('gifType')
    try {
        const res = await getPointVaultIncomeRateApi()
        if (res.code==1){
            pageData.value = res.data
        }
    } catch (err){
        console.log("请求失败")
        console.log(err)
    }finally {
        emitter.emit("toast_close")
    }
}

onShow(() => {
    fetchEarnPointData()
})

onPageScroll((event: any) => {
    scrollTop.value = event.scrollTop
})
</script>

<style lang="scss">
page {
    background: #f0f0f0 !important;
}
</style>
<style lang="scss" scoped>
.container {
    position: relative;
    .earn_point {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .point_card {
            padding: 30rpx 50rpx 50rpx 50rpx;
            background: #ffffff;
            border-radius: 12rpx;
            .card_head {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .card_head_poin {
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 32rpx;
                    line-height: 40rpx;
                    color: #999999;
                }
                .card_head_lock {
                    margin-left: 20rpx;
                }
            }
            .card_point_num {
                font-family: PingFang SC;
                font-weight: 500;
                font-size: 64rpx;
                line-height: 90rpx;
                color: #000000;
            }
            .point_card_box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .card_label_text {
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 24rpx;
                    line-height: 40rpx;
                    text-align: left;
                    color: #999999;
                }
                .card_label_num {
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 32rpx;
                    line-height: 40rpx;
                    text-align: left;
                    color: #1e1e1e;
                }
            }
            .point_card_foot {
                display: flex;
                justify-content: center;
                align-items: center;
                .foot_btn {
                    width: 552rpx;
                    height: 72rpx;
                    border-radius: 12rpx;
                    background: #458060;
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 30rpx;
                    line-height: 72rpx;
                    text-align: center;
                    color: #ffffff;
                }
            }
        }
        .profit_card {
            padding: 20rpx 40rpx 40rpx 40rpx;
            background: #ffffff;
            border-radius: 12rpx;
            .profit_card_head {
                font-family: PingFang SC;
                font-weight: 500;
                font-size: 32rpx;
                line-height: 45rpx;
                text-align: center;
                color: #1e1e1e;
            }
            .profit_card_line {
                height: 1rpx;
                background: #d7d7d7;
            }
            .profit_card_dashboard {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .profit_dashboard_text {
                font-family: PingFang SC;
                font-weight: 400;
                font-size: 24rpx;
                line-height: 40rpx;
                text-align: center;
                color: #999999;
            }
            .profit_dashboard_num {
                font-family: PingFang SC;
                font-weight: 400;
                font-size: 55rpx;
                line-height: 80rpx;
                text-align: center;
                color: #000000;
            }
            .profit_countdown {
                display: flex;
                justify-content: center;
                align-items: center;
                .profit_countdown_text {
                    margin-left: 10rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    font-size: 24rpx;
                    line-height: 35rpx;
                    text-align: left;
                    color: #999999;
                }
            }
            .profit_card_box {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 58rpx;
                border-radius: 50rpx;
                background: #f1f1f1;
                .profit_card_text {
                    padding: 0 38rpx;
                    font-family: Arial;
                    font-weight: 700;
                    font-size: 24rpx;
                    line-height: 100%;
                    text-align: center;
                    color: #458060;
                }
                .profit_card_btn {
                    width: 220rpx;
                    height: 58rpx;
                    border-radius: 50rpx;
                    background: linear-gradient(210deg, #e87a3d 13.39%, #f19e6c 86.61%);
                    font-family: PingFang SC;
                    font-weight: 600;
                    font-size: 36rpx;
                    line-height: 58rpx;
                    text-align: center;
                    color: #ffffff;
                }
            }
            .profit_card_estimate {
                padding: 20rpx;
                border-radius: 12rpx;
                background: #f7f7f7;
                .card_estimate_text {
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 26rpx;
                    line-height: 40rpx;
                    text-align: center;
                    color: #000000;
                }
                .card_estimate_num {
                    font-family: Arial;
                    font-weight: 700;
                    font-size: 50rpx;
                    line-height: 80rpx;
                    text-align: center;
                    color: #eb2c0f;
                }
            }
            .profit_card_issue {
                margin-top: 60rpx;
                .card_issue_head {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .issue_head_title {
                        font-family: Arial;
                        font-weight: 700;
                        font-size: 36rpx;
                        line-height: 45rpx;
                        text-align: left;
                        color: #458060;
                    }
                    .issue_head_num {
                        margin-left: 10rpx;
                        font-family: Arial;
                        font-weight: 700;
                        font-size: 45rpx;
                        line-height: 40rpx;
                        text-align: left;
                        color: #1e4b2e;
                    }
                }
                .card_issue_line {
                    width: 435rpx;
                    height: 4rpx;
                    background: #589e80;
                }
                .card_issue_box {
                    position: relative;
                    .card_invite_official {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 20rpx;
                        border-radius: 12rpx;
                        background: #deedde;
                        .invite_info {
                            font-family: Arial;
                            font-weight: 400;
                            font-size: 26rpx;
                            line-height: 40rpx;
                            text-align: left;
                            color: #000000;
                            .label_text {
                                margin-left: 10rpx;
                                font-family: Arial;
                                font-weight: 400;
                                font-size: 26rpx;
                                line-height: 40rpx;
                                text-align: left;
                                background: linear-gradient(210deg, #e87a3d 13.39%, #f19e6c 86.61%);
                                -webkit-background-clip: text;
                                /*将设置的背景颜色限制在文字中*/
                                -webkit-text-fill-color: transparent;
                                /*给文字设置成透明*/
                            }
                        }
                    }
                    .card_invite_user {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 20rpx;
                        border-radius: 12rpx;
                        background: #fff8e9;
                        .invite_info {
                            font-family: Arial;
                            font-weight: 400;
                            font-size: 26rpx;
                            line-height: 40rpx;
                            text-align: left;
                            color: #000000;
                            .label_text {
                                margin-left: 10rpx;
                                font-family: Arial;
                                font-weight: 400;
                                font-size: 26rpx;
                                line-height: 40rpx;
                                text-align: left;
                                background: linear-gradient(210deg, #e87a3d 13.39%, #f19e6c 86.61%);
                                -webkit-background-clip: text;
                                /*将设置的背景颜色限制在文字中*/
                                -webkit-text-fill-color: transparent;
                                /*给文字设置成透明*/
                            }
                        }
                    }
                    .issue_invite {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
            }
        }
        .point_investasi {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 12rpx;
            background: #ffffff;
        }
    }
}
</style>

<template>
    <view class="product_box">
        <view class="product_image">
            <u-image
                v-if="props.data.color == 1"
                width="648"
                height="300"
                src="@/static/images/card/product_short.png"
            ></u-image>
            <u-image
                v-else-if="props.data.color == 2"
                width="648"
                height="300"
                src="@/static/images/card/product_mid.png"
            ></u-image>
            <u-image
                v-else
                width="648"
                height="300"
                src="@/static/images/card/product_long.png"
            ></u-image>
        </view>
        <view class="product_card">
            <view class="product_head">
                <view class="head_info">
                    <u-image
                        width="45"
                        height="45"
                        :src="props.data.national_flag_url"
                    ></u-image>
                    <view class="head_info_name"
                        >{{ props.data.country }}</view
                    >
                </view>
                <view class="head_tips canSigned" @tap="()=>{contractShow = true}">
                    <u-image
                        width="34"
                        height="34"
                        src="@/static/images/card/canSigned.png"
                    ></u-image>
<!--                    "状态 0:可购买-可购买 1：条件未满足-灰色 2：合约生效中，等待合约到期后，再次购买-黄色 -->
                    <view v-if="props.data.status==0" class="tips_title bg0">Syarat Terbatas</view>
                    <view v-else-if="props.data.status==1" class="tips_title bg1">Syarat Terbatas</view>
                    <view v-else-if="props.data.status==2" class="tips_title bg2">Syarat Terbatas</view>
                </view>
            </view>
            <view class="product_line"></view>
            <view class="product_info" @tap="navigateTo(`/pages/product_info/product_info?product_id=${props.data.product_id}`)">
                <view class="product_info_title">{{ props.data.product_name }}</view>
                <view class="product_info_level">
                    <view class="level">Risiko {{ props.data.risk_level }}</view>
                    <view class="level_tips long">{{ props.data.product_tags }}</view>
                </view>
                <view class="product_medal">
                    <view class="medal">
                        <u-image
                            v-if="props.data.color == 1"
                            width="71"
                            height="64"
                            src="@/static/images/card/medal_short.png"
                        ></u-image>
                        <u-image
                            v-else-if="props.data.color == 2"
                            width="71"
                            height="64"
                            src="@/static/images/card/medal_mid.png"
                        ></u-image>
                        <u-image
                            v-else
                            width="71"
                            height="64"
                            src="@/static/images/card/medal_long.png"
                        ></u-image>
                        <view class="medal_text">Detail</view>
                    </view>
                </view>
            </view>
            <view class="product_foot">
                <view class="foot_box">
                    <view class="foot_label">
                        <view class="label_num">+{{ (props.data.show_interest_rate * 100).toFixed(2)}}%</view>
                        <view class="label_title">Pertumbuhan Bersih</view>
                    </view>
                    <view class="foot_label">
                        <view class="label_num">
                            <view>{{ props.data.color>1?"Tanpa Batas":"Rp "+formatNumber(props.data.investment_amount) }}</view>
                            <u-image
                                v-if="props.data.color > 1"
                                width="30"
                                height="30"
                                src="@/static/images/page/up.png"
                            ></u-image>
                        </view>
                        <view class="label_text">Poin Investasi</view>
                    </view>
                </view>
                <view class="foot_date">
                    <view class="date_num">{{ props.data.siklus_investasi }} Hari</view>
                    <u-image
                        width="30"
                        height="30"
                        src="@/static/images/card/product_date.png"
                    ></u-image>
                </view>
            </view>
        </view>
    </view>
    <ContractPopup v-if="contractShow" @cancel="contractShow = false"></ContractPopup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatNumber } from '../../../utils/util'
import ContractPopup from '@/pages/product_info/components/contractPopup.vue'
const contractShow = ref(false)
const props = defineProps({
    data: {
        type: Object,
        default: {}
    }
})

const navigateTo = (url: string) => {
    uni.navigateTo({
        url
    })
}


</script>

<style scoped lang="scss">
.product_box {
    position: relative;
    margin-top: 10rpx;
    .product_image {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .product_card {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 20rpx;
        .product_head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10rpx;
            .head_info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .head_info_name {
                    margin-left: 20rpx;
                    font-family: Arial;
                    font-weight: 700;
                    font-size: 28rpx;
                    line-height: 30rpx;
                    color: #1e1e1e;
                }
            }
            .head_tips {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 168rpx;
                height: 40rpx;
                padding: 5rpx;
                border-radius: 40rpx;
                &.unActivated {
                    background: #999999;
                }
                &.inEffect {
                    background: #ecb54b;
                }
                &.canSigned {
                    background: #67ba8c;
                }
                .tips_title {
                    margin-left: 5rpx;
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 16rpx;
                    line-height: 40rpx;
                    color: #ffffff;
                    .bg0{
                        background: #67BA8C;
                    }
                    .bg1{
                        background: #999999;
                    }
                    .bg2{
                        background: #ECB54B;
                    }
                }
            }
        }
        .product_line {
            height: 2rpx;
            background: #d7d7d7;
        }
        .product_info {
            position: relative;
            padding: 30rpx 20rpx;
            .product_info_title {
                font-family: Arial;
                font-weight: 400;
                font-size: 26rpx;
                line-height: 40rpx;
                color: #1e1e1e;
            }
            .product_info_level {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .level {
                    margin-right: 20rpx;
                    width: 90rpx;
                    height: 25rpx;
                    border-radius: 2rpx;
                    background: #d2ecdd;
                    font-family: Arial;
                    font-weight: 400;
                    text-align: center;
                    font-size: 16rpx;
                    line-height: 25rpx;
                    color: #1e4b2e;
                }
                .level_tips {
                    width: 155rpx;
                    height: 25rpx;
                    border-radius: 2rpx;
                    font-family: Arial;
                    font-weight: 400;
                    text-align: center;
                    font-size: 16rpx;
                    line-height: 25rpx;
                    &.short {
                        color: #81af95;
                        background: rgba(129, 175, 149, 0.3);
                    }
                    &.mid {
                        color: #d2b571;
                        background: rgba(236, 181, 75, 0.3);
                    }
                    &.long {
                        color: #f06550;
                        background: rgba(255, 175, 175, 0.3);
                    }
                }
            }
            .product_medal {
                position: absolute;
                top: 0;
                right: 30rpx;
                .medal {
                    position: relative;
                    .medal_text {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 71rpx;
                        height: 64rpx;
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 20rpx;
                        text-align: center;
                        line-height: 64rpx;
                        color: #ffffff;
                    }
                }
            }
        }
        .product_foot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20rpx;
            .foot_box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .foot_label {
                    margin-right: 20rpx;
                    .label_num {
                        font-family: Arial;
                        font-weight: 700;
                        font-size: 28rpx;
                        text-align: left;
                        line-height: 40rpx;
                        color: #eb2c0f;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }
                    .label_title {
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 20rpx;
                        line-height: 40rpx;
                        text-align: left;
                        color: #a0a3a9;
                    }
                    .label_text {
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 20rpx;
                        line-height: 40rpx;
                        text-align: left;
                        color: #999999;
                    }
                }
            }
            .foot_date {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .date_num {
                    margin-bottom: 10rpx;
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 20rpx;
                    line-height: 25rpx;
                    text-align: center;
                    color: #1e1e1e;
                }
            }
        }
    }
}
</style>

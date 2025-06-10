<template>
    <view class="product_box">
        <view class="product_image">
            <u-image v-if="tt==1" width="648" height="300" src="@/static/images/card/product_short.png"></u-image>
            <u-image v-else-if="tt==2" width="648" height="300" src="@/static/images/card/product_mid.png"></u-image>
            <u-image v-else width="648" height="300" src="@/static/images/card/product_long.png"></u-image>
        </view>
        <view class="product_card">
            <view class="product_head">
                <view class="head_info">
                    <u-image v-if="tt==1" width="45" height="45" src="@/static/images/card/product_laos.png"></u-image>
                    <u-image v-else-if="tt==2" width="45" height="45" src="@/static/images/card/product_thailand.png"></u-image>
                    <u-image v-else width="45" height="45" src="@/static/images/card/product_vietnam.png"></u-image>
                    <view class="head_info_name">Vietnam-{{ props.tt }}</view>
                </view>
                <view class="head_tips canSigned">
                    <u-image width="34" height="34" src="@/static/images/card/canSigned.png"></u-image>
                    <view class="tips_title">Syarat Terbatas</view>
                </view>
            </view>
            <view class="product_line"></view>
            <view class="product_info">
                <view class="product_info_title">Dana Beras Jasmine No.6</view>
                <view class="product_info_level">
                    <view class="level">Risiko 0</view>
                    <view class="level_tips long">Jangka Panjang</view>
                </view>
                <view class="product_medal">
                    <view class="medal">
                        <u-image v-if="tt==1" width="71" height="64" src="@/static/images/card/medal_short.png"></u-image>
                        <u-image v-else-if="tt==2" width="71" height="64" src="@/static/images/card/medal_mid.png"></u-image>
                        <u-image v-else width="71" height="64" src="@/static/images/card/medal_long.png"></u-image>
                        <view class="medal_text">Detail</view>
                    </view>
                </view>
            </view>
            <view class="product_foot">
                <view class="foot_box">
                    <view class="foot_label">
                        <view class="label_num">+10%</view>
                        <view class="label_title">Pertumbuhan Bersih</view>
                    </view>
                    <view class="foot_label">
                        <view class="label_num">
                            <view>Rp 2.000.000.000</view>
                            <u-image v-if="day>100" width="30" height="30" src="@/static/images/page/up.png"></u-image>
                        </view>
                        <view class="label_text">Poin Investasi</view>
                    </view>
                </view>
                <view class="foot_date">
                    <view class="date_num">{{ props.day }}DAY</view>
                    <u-image width="30" height="30" src="@/static/images/card/product_date.png"></u-image>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    tt:{
        type: Number,
        default: 0
    },
    day:{
        type:Number,
        default: 0
    }
})

const couentArr = ref<Array<string>>([
    'product_laos.png',
    'product_thailand.png',
    'product_vietnam.png',
])



</script>


<style scoped lang="scss">
.product_box{
    position: relative;
    margin-top: 10rpx;
    .product_image{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .product_card{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 20rpx;
        .product_head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10rpx;
            .head_info{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .head_info_name{
                    margin-left: 20rpx;
                    font-family: Arial;
                    font-weight: 700;
                    font-size: 28rpx;
                    line-height: 30rpx;
                    color: #1E1E1E;
                }
            }
            .head_tips{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 168rpx;
                height: 40rpx;
                padding: 5rpx;
                border-radius: 40rpx;
                &.unActivated{
                    background: #999999;
                }
                &.inEffect{
                    background: #ECB54B;
                }
                &.canSigned{
                    background: #67BA8C;
                }
                .tips_title{
                    margin-left: 5rpx;
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 16rpx;
                    line-height: 40rpx;
                    color: #FFFFFF;
                }
            }
        }
        .product_line{
            height: 2rpx;
            background: #D7D7D7;
        }
        .product_info{
            position: relative;
            padding: 30rpx 20rpx;
            .product_info_title{
                font-family: Arial;
                font-weight: 400;
                font-size: 26rpx;
                line-height: 40rpx;
                color: #1E1E1E;
            }
            .product_info_level{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .level{
                    margin-right: 20rpx;
                    width: 90rpx;
                    height: 25rpx;
                    border-radius: 2rpx;
                    background: #D2ECDD;
                    font-family: Arial;
                    font-weight: 400;
                    text-align: center;
                    font-size: 16rpx;
                    line-height: 25rpx;
                    color: #1E4B2E;
                }
                .level_tips{
                    width: 155rpx;
                    height: 25rpx;
                    border-radius: 2rpx;
                    font-family: Arial;
                    font-weight: 400;
                    text-align: center;
                    font-size: 16rpx;
                    line-height: 25rpx;
                    &.short{
                        color: #81AF95;
                        background: rgba(129, 175, 149, 0.3);
                    }
                    &.mid{
                        color: #D2B571;
                        background: rgba(236, 181, 75, 0.3);
                    }
                    &.long{
                        color: #F06550;
                        background: rgba(255, 175, 175, 0.3);
                    }
                }
            }
            .product_medal{
                position: absolute;
                top: 0;
                right: 30rpx;
                .medal{
                    position: relative;
                    .medal_text{
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
                        color: #FFFFFF;
                    }
                }
            }
        }
        .product_foot{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20rpx;
            .foot_box{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .foot_label{
                    margin-right: 20rpx;
                    .label_num{
                        font-family: Arial;
                        font-weight: 700;
                        font-size: 28rpx;
                        text-align: left;
                        line-height: 40rpx;
                        color: #EB2C0F;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }
                    .label_title{
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 20rpx;
                        line-height: 40rpx;
                        text-align: left;
                        color: #A0A3A9;
                    }
                    .label_text{
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 20rpx;
                        line-height: 40rpx;
                        text-align: left;
                        color: #999999;
                    }
                }
            }
            .foot_date{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .date_num{
                    margin-bottom: 10rpx;
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 20rpx;
                    line-height: 25rpx;
                    text-align: center;
                    color: #1E1E1E;
                }
            }
        }
    }
}
</style>

<template>
    <view class="container mx-[30rpx] pt-[4rpx] px-[4rpx]">
        <u-image
            width="100%"
            height="102"
            border-radius="12"
            src="@/static/images/informasiAset/card_head.png"
        ></u-image>
        <view class="article_box px-[30rpx] pt-[30rpx] pb-[30rpx]">
            <view class="article_head mb-[30rpx]">Pengguna Baru</view>
            <view class="article_manfaat mt-[20rpx] mb-[20rpx]">
                <view class="manfaat_info">
                    <view class="manfaat_info_head">
                        <view class="head_name">{{ props.informasiInfo.country }}</view>
                        <view class="head_line"></view>
                        <view class="head_rank">{{ props.informasiInfo.product_name }}</view>
                    </view>
                    <view class="manfaat_info_foot mt-[10rpx]">
                        <view class="foot_level">{{ props.informasiInfo.risk_level }} Risiko</view>
                        <view class="foot_label">{{ props.informasiInfo.product_tags }}</view>
                    </view>
                </view>
                <u-image
                    width="106"
                    height="72"
                    src="@/static/images/informasiAset/card_tip.png"
                ></u-image>
            </view>
            <view class="article_row">
                <view class="article_row_label">
                    <view class="label_text">+{{(props.informasiInfo.show_interest_rate*100).toFixed(2)}}%</view>
                    <view class="label_title">Pertumbuhan Bersih</view>
                </view>
                <view class="article_row_label">
                    <view class="label_text">{{ props.informasiInfo.color>1?"Tanpa Batas":"Rp "+formatNumber(props.informasiInfo.investment_amount) }}</view>
                    <view class="label_title">Jumlah Investasi</view>
                </view>
                <view class="article_row_date">
                    <view class="">{{props.informasiInfo.siklus_investasi}} Hari</view>
                    <view class="label_title">Jangka Waktu Produk</view>
                </view>
            </view>
            <view class="article_image mt-[30rpx]">
                <u-image
                    width="630"
                    height="238"
                    :src="topPic"
                ></u-image>
            </view>
            <view
                class="article_btn mt-[20rpx]"
                @tap="navigateTo(`/pages/product_info/product_info?product_id=${props.informasiInfo.product_id}&color=${props.informasiInfo.color}`)"
                >Beli Sekarang</view
            >
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { formatNumber } from '@/utils/util'
import { onLoad } from '@dcloudio/uni-app'
const incomeInfo = ref<any>({})
const props = defineProps({
    informasiInfo: {
        type: Object,
        default: () => {}
    }
})

const topPic = computed(()=>{
    if(Array.isArray(props.informasiInfo.product_img_url) && props.informasiInfo.product_img_url.length>0){
        return props.informasiInfo.product_img_url[0]
    }
})
watch(
    () => props.informasiInfo,
    (value) => {
        incomeInfo.value = value
    },
    { deep: true }
)

const navigateTo = (url: string) => {
    uni.navigateTo({
        url
    })
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    height: 710rpx;
    border-radius: 12rpx;
    background: #ffffff;

    .article_box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        .article_head {
            font-family: Arial;
            font-weight: 700;
            font-size: 32rpx;
            line-height: 54rpx;
            color: #1e4b2e;
        }

        .article_manfaat {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;

            .manfaat_info {
                .manfaat_info_head {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    .head_name {
                        font-family: Arial;
                        font-weight: 700;
                        font-size: 26rpx;
                        line-height: 40rpx;
                        color: #1e1e1e;
                    }

                    .head_line {
                        margin: 0 20rpx;
                        width: 1rpx;
                        height: 30rpx;
                        background: #1e1e1e;
                    }
                    .head_rank {
                        font-family: Arial;
                        font-weight: 700;
                        font-size: 26rpx;
                        line-height: 40rpx;
                        color: #1e1e1e;
                    }
                }
                .manfaat_info_foot {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .foot_level {
                        padding: 0 20rpx;
                        height: 30rpx;
                        border-radius: 4rpx;
                        background: #afd3ff;
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 16rpx;
                        text-align: center;
                        line-height: 30rpx;
                        color: #1e1e1e;
                    }
                    .foot_label {
                        margin-left: 15rpx;
                        padding: 0 20rpx;
                        height: 30rpx;
                        border-radius: 4rpx;
                        background: rgba(255, 175, 175, 0.2);
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 16rpx;
                        text-align: center;
                        line-height: 30rpx;
                        color: #1e1e1e;
                    }
                }
            }
        }
        .article_row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .article_row_label {
                .label_text {
                    font-family: Arial;
                    font-weight: 700;
                    font-size: 28rpx;
                    line-height: 40rpx;
                    color: #eb2c0f;
                }
                .label_title {
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 16rpx;
                    line-height: 40rpx;
                    color: #a0a3a9;
                }
            }
            .article_row_date {
                .label_text {
                    font-family: Arial;
                    font-weight: 700;
                    font-size: 28rpx;
                    line-height: 40rpx;
                    color: #1e1e1e;
                }
                .label_title {
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 16rpx;
                    line-height: 40rpx;
                    color: #a0a3a9;
                }
            }
        }
        .article_image {
            overflow: hidden;
            width: 630rpx;
            height: 238rpx;
            border-radius: 8rpx;
        }

        .article_btn {
            width: 630rpx;
            height: 70rpx;
            font-family: Arial;
            font-weight: 400;
            font-size: 32rpx;
            line-height: 70rpx;
            text-align: center;
            color: #ffffff;
            border-radius: 8rpx;
            background: #458060;
        }
    }
}
</style>

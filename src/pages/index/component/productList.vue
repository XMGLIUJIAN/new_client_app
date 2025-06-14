<template>
    <view class="container mt-[20rpx] mb-[175rpx] mx-[30rpx] pt-[4rpx] px-[4rpx]">
        <u-image
            width="680"
            height="102"
            src="@/static/images/informasiAset/card_head.png"
        ></u-image>
        <view class="article_box px-[30rpx] pt-[30rpx] pb-[30rpx]">
            <view class="article_head mb-[10rpx]">
                <u-image
                    width="60"
                    height="60"
                    src="@/static/images/card/article_image.png"
                ></u-image>
                <view class="article_head_title">Zona Global</view>
                <view class="article_head_text">Pertumbuhan Stabil</view>
            </view>
        </view>
        <view class="article_nav mb-[20rpx]">
            <u-image width="680" height="96" src="@/static/images/card/nav_image.png"></u-image>
            <view class="article_select">
                <view class="scroll-box">
                    <scroll-view :scroll-x="true" :scroll-left="scrollLeft">
                        <view class="tabs_content">
                            <view class="tabs_label" v-for="(e, index) in navArr" :key="index">
                                <view
                                    class="tabs_name pt-[10rpx]"
                                    :style="{ color: e.current == active ? '#1E4B2E' : '#666666' }"
                                    @tap="change(e)"
                                >
                                    {{ e.title }}
                                </view>
                            </view>
                            <view class="active" :style="{ left: active * 140 + 'rpx' }"> </view>
                        </view>
                    </scroll-view>
                </view>
            </view>
        </view>
        <view class="article_product">
            <Product v-for="(item,index) in selectedData" :key="index" :data="item"/>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import Product from '@/pages/index/component/product.vue'
const active = ref<number>(0)
const scrollLeft = ref(0)
const selectActive = ref('')
const navArr = ref<Array<any>>([
    { current: 0, title: 'Semua' },
    { current: 1, title: 'Thailand' },
    { current: 2, title: "Vietnam" },
    { current: 3, title: "Laos" },
    { current: 4, title: "Myanmar" },
])
const props = defineProps({
    productData: {
        type: Object,
        default: []
    }
})


// "状态 0:可购买-可购买 1：条件未满足-灰色 2：合约生效中，等待合约到期后，再次购买-黄色
const selectedData = computed(() => {
    return props.productData.filter(
        (item) =>
            (selectActive.value === '' ||
                selectActive.value === 'Semua' ||
                item.country === selectActive.value) &&
            item.product_id !== "P2025060710000"
    ).sort((a, b) => {
        // 先按 status 升序
        if (a.status !== b.status) {
            return a.status - b.status;
        }
        // 如果 status 相同，按 sort 升序
        return a.sort - b.sort;
    });
    // return data.sort((a, b) => a.sort - b.sort);
})
const userStore = useUserStore()
const { userInfo, isLogin } = storeToRefs(userStore)
const change = (e: any) => {
    active.value = e.current
    selectActive.value = e.title
    scrollLeft.value = e.current * 30
}

</script>

<style lang="scss" scoped>
.container {
    position: relative;
    border-radius: 12rpx;
    background: #ffffff;

    .article_box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        .article_head {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .article_head_title {
                margin-left: 10rpx;
                font-family: Arial;
                font-weight: 700;
                font-size: 32rpx;
                line-height: 54rpx;
                color: #1e4b2e;
            }

            .article_head_text {
                margin-left: 30rpx;
                font-family: Arial;
                font-weight: 400;
                font-size: 22rpx;
                line-height: 40rpx;
                color: #a0a3a9;
            }
        }
    }

    .article_nav {
        position: relative;

        .article_select {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 96rpx;

            .scroll-box {
                overflow: hidden;
                margin-left: 168rpx;
                width: 500rpx;
                .tabs_content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    padding: 30rpx 0;

                    .tabs_label {
                        flex: 1;
                        z-index: 100;

                        .tabs_name {
                            width: 140rpx;
                            font-family: Arial;
                            font-size: 24rpx;
                            font-weight: 500;
                            line-height: 40rpx;
                            text-align: center;
                        }
                    }

                    .active {
                        position: absolute;
                        top: 55%;
                        transform: translateY(-50%);
                        transition: all 0.5s;
                        width: 140rpx;
                        height: 59rpx;
                        border-radius: 30rpx;
                        background: #bbe8d0;
                        z-index: 97;
                    }
                }
            }
        }
    }
    .article_product {
        padding: 10rpx 20rpx;
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
    }
}
</style>

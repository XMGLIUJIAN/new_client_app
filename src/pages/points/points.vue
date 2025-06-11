<template>
    <view class="container">
        <view class="imageGroup">
            <u-image width="750" height="400" src="@/static/images/page/pageGroup.png"></u-image>
        </view>
        <view class="points pb-[40rpx]">
            <u-sticky h5-nav-height="0" bg-color="transparent">
                <u-navbar
                    :is-back="true"
                    :is-fixed="true"
                    :border-bottom="false"
                    back-icon-color="#FFFFFF"
                    title="POIN"
                    :title-bold="true"
                    :background="{ background: scrollTop ? '#FFFFFF' : 'transparent' }"
                    title-color="#FFFFFF"
                >
                    <template #right>
                        <view
                            class="rule mr-[30rpx]"
                            @tap="navigateTo('/pages/user_rule/user_rule?type=points')"
                        >
                            <u-image
                                v-if="!scrollTop"
                                width="40"
                                height="40"
                                src="@/static/images/icon/icon_help.png"
                            ></u-image>
                            <u-image
                                v-else
                                width="40"
                                height="40"
                                src="@/static/images/icon/help.png"
                            ></u-image>
                        </view>
                    </template>
                </u-navbar>
            </u-sticky>
            <view class="point_card mt-[50rpx] mx-[30rpx]">
                <view class="trade_card_head">
                    <view class="card_head_title">Informasi Aset</view>
                    <view class="card_head_account">ID:{{ userInfo.account }}</view>
                </view>
                <view class="transfer_card">
                    <view class="card_box">
                        <view class="card_text">Saldo</view>
                        <view class="card_num">Rp {{ formatNumber(userInfo.user_money) }}</view>
                    </view>
                    <view class="card_line"></view>
                    <view class="card_box">
                        <view class="card_text">Poin</view>
                        <view class="card_num">{{ formatNumber(userInfo.user_token) }}</view>
                    </view>
                </view>
            </view>
            <view class="trade_popup mt-[30rpx] mb-[30rpx] pt-[40rpx] px-[30rpx]">
                <view class="trade_con px-[40rpx] pt-[40rpx] pb-[40rpx]">
                    <view class="trade_submit">
                        <view class="trade_Item">
                            <view class="trade_head">
                                <view class="trade_title">Tukar Saldo</view>
                                <view class="trade_tips" @tap="exchangeAll">Tukar Semua</view>
                            </view>
                            <view class="trade_input">
                                <u-input
                                    v-model="formData.exchange_amount"
                                    type="number"
                                    :border="false"
                                    placeholder-style="color: #8B9098;font-size:24rpx;"
                                    placeholder="Masukkan Jumlah Saldo Yang Di Tukar"
                                />
                            </view>
                        </view>
                        <view class="exchange_rate" v-if="Object.keys(rateInfo).length > 0">
                            <view class="title">Nilai Penukaran:</view>
                            <view class="point">Rp 1 =</view>
                            <view class="token"> {{ formatNumber(rateInfo.rate) }} Poin</view>
                        </view>
                        <view class="exchange_result pt-[20rpx]">
                            <view class="result_left">Hasil Penukaran Kali Ini：</view>
                            <view class="result_right mt-[20rpx]">
                                <view class="number">
                                    <view class="num"
                                        >{{ formatNumber(balance) }}
                                        <text class="unit">POIN</text></view
                                    >
                                </view>
                            </view>
                        </view>
                    </view>

                    <view class="bonus_card mt-[30rpx] mb-[10rpx] pt-[10rpx] px-[10rpx]">
                        <u-image
                            class="bonus_card_bg"
                            width="100%"
                            height="284"
                            src="@/static/images/user/bonus_card.png"
                            border-radius="12rpx"
                        ></u-image>
                        <view class="bonus_card_body p-[20rpx]">
                            <view class="bonus_card_body_box">
                                <view class="bonus_card_title mt-[10rpx]">
                                    <u-image
                                        width="40"
                                        height="40"
                                        src="@/static/images/page/give.png"
                                        alt="" />
                                    <view>Bonus Keberuntungan Tambahan</view>
                                    <u-image
                                        @tap="show = true"
                                        width="24"
                                        height="24"
                                        src="@/static/images/user/help.png"
                                        alt=""
                                /></view>
                                <view class="bonus_card_content mx-[30rpx] mt-[20rpx]">
                                    <view class="bonus_total pt-[50rpx]">
                                        <text>Rp {{ formatNumber(BonusKeberuntunganTambahan) }}</text>
                                    </view>
                                    <view class="bonus_desc pt-[40rpx]"
                                        ><text class="first_bonus">Rasio Bonus</text>：Rp
                                        {{ rateInfo.team_reserve_rate }} = 1
                                        <text class="unit">Bonus</text></view
                                    >
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <view class="submit_btn mx-[30rpx]" @tap="submitEvent">Konfirmasi</view>
            <toastPopup></toastPopup>
            <Popup
                v-if="pointsPopup"
                :pointsType="pointsType"
                :number="balance"
                @confirm="pointsFinish"
                @cancel="pointsCancel"
            ></Popup>

            <BonusPopup v-if="show" @cancel="show = false"></BonusPopup>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { emitter } from '@/utils/emitter'
import { formatNumber } from '@/utils/util'
import { currencyConversion, exchangelist } from '@/api/exchangeTransfer'
import { onPageScroll, onShow } from '@dcloudio/uni-app'
import { computed, reactive, ref } from 'vue'
import Popup from './components/popup.vue'
import BonusPopup from '@/components/toastPopup/BonusPopup.vue'

const scrollTop = ref<number>(0)
const pointsPopup = ref<boolean>(false)
const pointsType = ref<string>('success') // success 交易成功 lose 交易失败
const userStore = useUserStore()
const rateInfo = ref<any>({})
const show = ref(false)
const balance = computed(() => {
    return formData.exchange_amount * rateInfo.value.rate || 0
})
const BonusKeberuntunganTambahan = computed(() => {
    const num = formData.exchange_amount / rateInfo.value.team_reserve_rate || 0
    return Math.floor(num)
})
const { userInfo, isLogin } = storeToRefs(userStore)
const formData = reactive<{
    exchange_amount: any
    type: number
}>({
    exchange_amount: null, // 兑换数量
    type: 5 //兑换类型
})
const toast = (message: any = '') => {
    emitter.emit('toast', message)
}
const navigateTo = (url: string) => {
    uni.navigateTo({
        url: url
    })
}
const resetForm = () => {
    const resetData = {
        exchange_amount: null,
        type: 5
    }
    Object.assign(formData, resetData)
}
const pointsFinish = () => {
    userStore.getUser()
    resetForm()
    pointsPopup.value = false
}
const pointsCancel = () => {
    userStore.getUser()
    pointsPopup.value = false
}
const exchangeAll = () => {
    formData.exchange_amount = userInfo.value.user_money ? userInfo.value.user_money : null
}
const getRatelist = async () => {
    const data = await exchangelist({ currencyType: 1, exchangeCurrencyType: 2 })
    rateInfo.value = data.lists.length ? data.lists[0] : {}
}
const submitEvent = async () => {
    if (!formData.exchange_amount) return toast('Silakan masukkan jumlah pertukaran')
    if (formData.exchange_amount < rateInfo.value.min_amount)
        return toast('Tidak bisa kurang dari jumlah pertukaran minimum')
    if (formData.exchange_amount > rateInfo.value.max_amount || rateInfo.value.max_amount == -1)
        return toast('Tidak bisa lebih besar dari jumlah pertukaran maksimum')
    emitter.emit('gifType')
    currencyConversionAsync()
}
const currencyConversionAsync = () => {
    setTimeout(async () => {
        const resData = await currencyConversion(formData)
        if (resData.code == 1) {
            pointsType.value = 'success'
            pointsPopup.value = true
        } else {
            pointsType.value = 'lose'
            pointsPopup.value = true
        }
    }, 3000)
}
onShow(() => {
    getRatelist()
    userStore.getUser()
})

onPageScroll((event: any) => {
    scrollTop.value = event.scrollTop
})
</script>

<style lang="scss">
page {
    background: #f1f1f1 !important;
}
</style>
<style lang="scss" scoped>
.container {
    position: relative;

    .imageGroup {
        background: #ffffff;
    }

    .points {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        .point_card {
            overflow: hidden;
            border-radius: 12rpx;
            background: #ffffff;

            .trade_card_head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20rpx 40rpx;
                background: linear-gradient(303.05deg, #92beab 10.45%, #26815a 89.55%);

                .card_head_title {
                    font-family: Arial;
                    font-weight: 500;
                    font-size: 32rpx;
                    line-height: 40rpx;
                    color: #ffffff;
                }

                .card_head_account {
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 20rpx;
                    line-height: 40rpx;
                    color: #ffffff;
                }
            }

            .transfer_card {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20rpx 40rpx;

                .card_box {
                    width: 45%;

                    .card_num {
                        font-family: Arial;
                        font-size: 28rpx;
                        font-weight: 500;
                        line-height: 64rpx;
                        text-align: center;
                        color: #1e1e1e;
                    }

                    .card_text {
                        font-family: Arial;
                        font-size: 32rpx;
                        font-weight: 500;
                        line-height: 48rpx;
                        text-align: center;
                        color: #8b9098;
                    }
                }

                .card_line {
                    width: 2rpx;
                    height: 50rpx;
                    background: #d7d7d7;
                }
            }
        }

        .trade_popup {
            border-top-left-radius: 20rpx;
            border-top-right-radius: 20rpx;
            background: #f0f0f0;

            .trade_con {
                border-radius: 12rpx;
                background: #ffffff;

                .trade_submit {
                    .trade_Item {
                        margin-bottom: 20rpx;

                        .trade_head {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .trade_title {
                                font-family: Arial;
                                font-size: 32rpx;
                                font-weight: 700;
                                line-height: 40rpx;
                                text-align: left;
                                color: #1e4b2e;
                            }

                            .trade_tips {
                                font-family: Arial;
                                font-size: 24rpx;
                                font-weight: 500;
                                line-height: 40rpx;
                                text-align: right;
                                color: #d79d2a;
                            }
                        }

                        .trade_input {
                            margin-top: 20rpx;
                            padding: 0 30rpx;
                            background: #ffffff;
                            border-radius: 12rpx;
                            border: 2rpx solid #8b9098;
                        }
                    }

                    .exchange_rate {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;

                        .title {
                            margin-right: 20rpx;
                            font-family: Arial;
                            font-size: 24rpx;
                            font-weight: 500;
                            line-height: 40rpx;
                            text-align: left;
                            color: #8b9098;
                        }

                        .token {
                            margin: 0 10rpx;
                            font-family: Arial;
                            font-size: 24rpx;
                            font-weight: 500;
                            line-height: 40rpx;
                            text-align: left;
                            color: #ecb54b;
                        }

                        .point {
                            font-family: Arial;
                            font-size: 24rpx;
                            font-weight: 500;
                            line-height: 40rpx;
                            text-align: left;
                            color: #1e1e1e;
                        }
                    }

                    .exchange_result {
                        .result_left {
                            font-family: Arial;
                            font-size: 32rpx;
                            font-weight: 700;
                            line-height: 48rpx;
                            text-align: left;
                            color: #1e4b2e;
                        }

                        .result_right {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;

                            .number {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;

                                .num {
                                    font-family: Arial;
                                    font-size: 36rpx;
                                    font-weight: 400;
                                    line-height: 48rpx;
                                    text-align: left;
                                    color: #1e1e1e;

                                    .unit {
                                        font-family: Arial;
                                        font-weight: 400;
                                        font-size: 24rpx;
                                        line-height: 40rpx;
                                        color: #d79d2a;
                                    }
                                }
                            }
                        }
                    }
                }

                .bonus_card {
                    position: relative;
                    .bonus_card_body {
                        font-family: Arial;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                        .bonus_card_body_box {
                            .bonus_card_title {
                                width: 100%;
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                justify-content: center;
                                font-width: 700;
                                font-size: 30rpx;
                                color: #1e4b2e;
                                :nth-child(2) {
                                    padding: 0 10rpx;
                                }
                            }
                            .bonus_card_content {
                                background: white;
                                border-radius: 12rpx;
                                height: 176rpx;
                                text-align: center;
                                .bonus_total {
                                    color: #1e1e1e;
                                    font-size: 36rpx;
                                    font-weight: 400;
                                }
                                .bonus_desc {
                                    font-size: 20rpx;
                                    .first_bonus {
                                        color: #8b9098;
                                    }
                                    .unit {
                                        color: #ecb54b;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .submit_btn {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 90rpx;
            border-radius: 12rpx;
            background: #458060;
            font-family: Arial;
            font-size: 32rpx;
            font-weight: 500;
            line-height: 48rpx;
            text-align: center;
            color: #ffffff;
        }
    }
}
</style>

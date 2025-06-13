<template>
    <view class="container">
        <view class="imageGroup">
            <u-image
                v-if="productData.color == 1"
                width="750"
                height="1227"
                src="@/static/images/product/product_shortGroup.png"
            ></u-image>
            <u-image
                v-if="productData.color == 2"
                width="750"
                height="1227"
                src="@/static/images/product/product_midGroup.png"
            ></u-image>
            <u-image
                v-if="productData.color == 3"
                width="750"
                height="1227"
                src="@/static/images/product/product_longGroup.png"
            ></u-image>
        </view>
        <view class="product_info">
            <u-sticky h5-nav-height="0" bg-color="transparent">
                <u-navbar
                    :is-back="true"
                    :is-fixed="true"
                    :border-bottom="false"
                    :back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'"
                    title="RINCIAN PRODUK"
                    :title-bold="true"
                    :background="{ background: scrollTop ? '#FFFFFF' : 'transparent' }"
                    :title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'"
                >
                    <u-image
                        v-if="productData.color == 1"
                        class="service_btn"
                        @tap="contactService"
                        width="60"
                        height="60"
                        src="@/static/images/product/product_frame_short.png"
                    ></u-image>
                    <u-image
                        v-if="productData.color == 2"
                        class="service_btn"
                        @tap="contactService"
                        width="60"
                        height="60"
                        src="@/static/images/product/product_frame_mid.png"
                    ></u-image>
                    <u-image
                        v-if="productData.color == 3"
                        class="service_btn"
                        @tap="contactService"
                        width="60"
                        height="60"
                        src="@/static/images/product/product_frame_long.png"
                    ></u-image>
                </u-navbar>
            </u-sticky>
            <view class="product_card mt-[225rpx] mx-[30rpx]">
                <view class="product_card_image mb-[20rpx]">
                    <!--                    <u-image-->
                    <!--                        v-if="productData.color == 1"-->
                    <!--                        width="650"-->
                    <!--                        height="325"-->
                    <!--                        src="@/static/images/product/product_short.png"-->
                    <!--                    ></u-image>-->
                    <!--                    <u-image-->
                    <!--                        v-if="productData.color == 2"-->
                    <!--                        width="650"-->
                    <!--                        height="325"-->
                    <!--                        src="@/static/images/product/product_mid.png"-->
                    <!--                    ></u-image>-->
                    <!--                    <u-image-->
                    <!--                        v-if="productData.color == 3"-->
                    <!--                        width="650"-->
                    <!--                        height="325"-->
                    <!--                        src="@/static/images/product/product_long.png"-->
                    <!--                    ></u-image>-->

                    <u-image
                        v-if="productData.product_img_url && productData.product_img_url.length > 0"
                        width="650"
                        height="325"
                        :src="productData.product_img_url[0]"
                    ></u-image>
                </view>
                <view class="product_card_info" :class="switchCard(productData.color)">
                    <view class="card_info_head">
                        <view class="head_label">Aman & Stabil</view>
                        <view class="head_line"></view>
                        <view class="head_label">Untung Maksimal</view>
                        <view class="head_line"></view>
                        <view class="head_label">Jangka Panjang</view>
                    </view>
                    <view class="card_info_box">
                        <view class="card_box_head" :class="switchCard(productData.color)">{{
                            productData.product_name
                        }}</view>
                        <view class="card_box_line">
                            <u-image
                                v-if="productData.color == 1"
                                width="395"
                                height="19"
                                src="@/static/images/product/rectangle_mid.png"
                            ></u-image>
                            <u-image
                                v-if="productData.color == 2"
                                width="395"
                                height="19"
                                src="@/static/images/product/rectangle_mid.png"
                            ></u-image>
                            <u-image
                                v-if="productData.color == 3"
                                width="395"
                                height="19"
                                src="@/static/images/product/rectangle_long.png"
                            ></u-image>
                        </view>
                        <view class="card_box_info mt-[40rpx] mb-[40rpx]">
                            <view class="card_box_label">
                                <view class="label_num" :class="switchCard(productData.color)"
                                    >{{ (productData.show_interest_rate * 100).toFixed(2) }}%</view
                                >
                                <view class="label_text">Pertumbuhan Bulanan</view>
                            </view>
                            <view class="card_box_label">
                                <view class="label_num" :class="switchCard(productData.color)"
                                    >{{ productData.siklus_investasi }} Hari</view
                                >
                                <view class="label_text">Tanggal Investasi</view>
                            </view>
                        </view>
                        <view
                            class="card_info_title mb-[20rpx]"
                            :class="switchCard(productData.color)"
                            >Jumlah Investasi</view
                        >
                        <view class="card_info_investasi" v-if="productData.color == 1">
                            <u-image
                                width="500"
                                height="56"
                                src="@/static/images/product/investasiGroup.png"
                            ></u-image>
                            <view class="card_investasi_num">{{
                                formatNumber(productData.investment_points)
                            }}</view>
                        </view>
                        <view class="product_info_profit" v-if="productData.color != 1">
                            <view class="card_info_profit" :class="switchCard(productData.color)">
                                <view class="profit_info_input">
                                    <u-input
                                        v-model="exchange_amount"
                                        type="number"
                                        :border="false"
                                        placeholder-style="color: #D7D7D7;font-size:20rpx;"
                                        placeholder="Masukkan Poin Investasi"
                                    />
                                </view>
                                <view class="profit_info_btn" :class="switchCard(productData.color)"
                                    >Estimasi Profit</view
                                >
                            </view>
                        </view>
                        <view
                            class="card_text_profit mt-[20rpx] ml-[40rpx]"
                            v-if="productData.color != 1"
                            :class="switchCard(productData.color)"
                        >
                            Poin Minimum Investasi: 1.000.000</view
                        >
                        <view class="product_card_foot">
                            <view
                                class="product_card_btn mt-[20rpx]"
                                @tap="InvestHandle"
                                :class="switchCard(productData.color)"
                                >Booking Sekarang</view
                            >
                        </view>
                    </view>
                </view>
            </view>
            <view class="contract_card mt-[20rpx] mx-[30rpx]">
                <u-image
                    v-if="productData.color == 1"
                    width="690"
                    height="155"
                    src="@/static/images/product/contract_short.png"
                ></u-image>
                <u-image
                    v-if="productData.color == 2"
                    width="690"
                    height="155"
                    src="@/static/images/product/contract_mid.png"
                ></u-image>
                <u-image
                    v-if="productData.color == 3"
                    width="690"
                    height="155"
                    src="@/static/images/product/contract_long.png"
                ></u-image>
                <view class="contract_card_info">
                    <view class="card_info_head">
                        <u-image
                            v-if="productData.color == 1"
                            width="35"
                            height="35"
                            src="@/static/images/product/product_icon_short.png"
                        ></u-image>
                        <u-image
                            v-if="productData.color == 2"
                            width="35"
                            height="35"
                            src="@/static/images/product/product_icon_mid.png"
                        ></u-image>
                        <u-image
                            v-if="productData.color == 3"
                            width="35"
                            height="35"
                            src="@/static/images/product/product_icon_long.png"
                        ></u-image>
                        <view class="head_title" :class="switchCard(productData.color)"
                            >Jenis Kontrak</view
                        >
                    </view>
                    <view class="card_info_line"></view>
                    <view class="card_info_foot" v-if="productData.color == 1"
                        >Harian Bunga,Jatuh Tempo Pokok</view
                    >
                    <view class="card_info_foot" v-if="productData.color == 2"
                        >Harian Bunga,Jatuh Tempo Pokok</view
                    >
                    <view class="card_info_foot" v-if="productData.color == 3"
                        >Bunga & Pokok Saat Jatuh Tempo</view
                    >
                </view>
            </view>
            <view class="advantage_card mt-[20rpx] mb-[20rpx] mx-[30rpx]">
                <view class="card_info_head">
                    <u-image
                        width="35"
                        height="35"
                        src="@/static/images/product/product_advantage.png"
                    ></u-image>
                    <view class="head_title" :class="switchCard(productData.color)"
                        >Jumlah Keuntungan</view
                    >
                </view>
                <view class="card_info_line"></view>
                <view class="card_box_foot" v-if="productData.color == 1">
                    <view class="foot_label">
                        <view class="label_title">Tunai Harian</view>
                        <view class="label_text"
                            >Rp {{ formatNumber(productData.day_profit) }}</view
                        >
                    </view>
                    <view class="foot_line"></view>
                    <view class="foot_label">
                        <view class="label_title">Kembali Pokok</view>
                        <view class="label_num"
                            >Rp {{ formatNumber(productData.total_profit) }}</view
                        >
                    </view>
                </view>
                <view class="card_box_foot" v-if="productData.color == 2">
                    <view class="foot_label">
                        <view class="label_title">Tunai Harian</view>
                        <view class="label_text"
                            >Rp {{ formatNumber(income) }}</view
                        >
                    </view>
                    <view class="foot_line"></view>
                    <view class="foot_label">
                        <view class="label_title">Kembali Pokok</view>
                        <view class="label_num"
                            >Rp {{ formatNumber(total) }}</view
                        >
                    </view>
                </view>
                <view class="card_box_foot" v-if="productData.color == 3">
                    <view class="foot_label">
                        <view class="label_title">Poin Investasi</view>
                        <view class="label_text"
                            >Rp {{ formatNumber(income) }}</view
                        >
                    </view>
                    <view class="foot_temp">
                        <u-image
                            width="135"
                            height="135"
                            src="@/static/images/product/temp.png"
                        ></u-image>
                    </view>
                    <view class="foot_label">
                        <view class="label_title">Keuntungan Tunai</view>
                        <view class="label_num"
                            >Rp {{ formatNumber(total) }}</view
                        >
                    </view>
                </view>
            </view>
            <view v-if="doShow" class="doShow">
                <view
                    v-if="productData.product_area_img_url"
                    v-for="(pic, index) in productData.product_area_img_url"
                    class="product_cokelat mb-[20rpx] mx-[30rpx]"
                >
                    <u-image
                        class="py-[20]"
                        width="100%"
                        :height="index == 0 ? 825 : 1110"
                        :src="pic"
                    ></u-image>
                </view>
            </view>
            <view v-else class="doShowBtn my-[30rpx] mx-[30rpx] py-[5rpx]">
                <view @tap="doShow = true">
                    <u-image width="678" height="83" src="@/static/images/page/btn.png"></u-image>
                    <view class="btn_text mt-[33rpx] mx-[60rpx]"
                        >Klik Untuk Memuat Lebih Banyak Informasi &nbsp;&nbsp; →</view
                    >
                    <!--                    <u-icon name="arrow-down" color="#1E1E1E" size="28"></u-icon>-->
                </view>
            </view>
            <!--            <view class="product_foot">-->
            <!--                <u-image-->
            <!--                    v-if="productData.color == 1"-->
            <!--                    @tap="contactService"-->
            <!--                    width="80"-->
            <!--                    height="80"-->
            <!--                    src="@/static/images/product/product_frame_short.png"-->
            <!--                ></u-image>-->
            <!--                <u-image-->
            <!--                    v-if="productData.color == 2"-->
            <!--                    @tap="contactService"-->
            <!--                    width="80"-->
            <!--                    height="80"-->
            <!--                    src="@/static/images/product/product_frame_mid.png"-->
            <!--                ></u-image>-->
            <!--                <u-image-->
            <!--                    v-if="productData.color == 3"-->
            <!--                    @tap="contactService"-->
            <!--                    width="80"-->
            <!--                    height="80"-->
            <!--                    src="@/static/images/product/product_frame_long.png"-->
            <!--                ></u-image>-->
            <!--                <view class="product_foot_btn" :class="switchCard(productData.color)">Tandatangan</view>-->
            <!--            </view>-->
            <ContractPopup v-if="contractShow" @cancel="contractShow = false"></ContractPopup>
            <SuccessPopup
                v-if="successShow"
                :data="productData"
                :investPoint="investPoint"
                :contractName="contractName"
                @cancel="successShow = false"
            ></SuccessPopup>
            <LosePopup v-if="loseShow" @cancel="loseShow = false"></LosePopup>
            <Popup v-if="show" @cancel="show = false"></Popup>
            <CustomerPopup
                v-if="contactShow"
                :service="serviceInfo"
                @confirm="contactlink"
                @cancel="contactShow = false"
            ></CustomerPopup>

            <toastPopup></toastPopup>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { formatNumber } from '@/utils/util'
import { onLoad, onPageScroll } from '@dcloudio/uni-app'
import ContractPopup from './components/contractPopup.vue'
import SuccessPopup from './components/successPopup.vue'
import LosePopup from './components/losePopup.vue'
import Popup from './components/popup.vue'
import { customerServiceInfo } from '@/api/eventInfo'
import { emitter } from '@/utils/emitter'
import CustomerPopup from '@/pages/index/component/customerPopup.vue'
import { getProductDetailApi, InvestProductApi,interestCalculator } from '@/api/product'

const scrollTop = ref<number>(0)
const contractShow = ref<boolean>(false)
const successShow = ref<boolean>(false)
const loseShow = ref<boolean>(false)
const show = ref<boolean>(false)
const exchange_amount = ref<any>(null)
const serviceInfo = ref<any>({})
const productData = ref<any>({})
const contactShow = ref(false)
const contractName = ref('')
const investPoint = ref(0)
const doShow = ref(false)
const income = ref(0)
const total = ref(0)
const navigateTo = (url: string) => {
    uni.navigateTo({
        url: url
    })
}

watch(exchange_amount, (newVal, oldVal) => {
    // console.log(`输入从 "${oldVal}" 变成了 "${newVal}"`)
    const incomeVal = (parseInt(newVal)/productData.value.exchange_rate*productData.value.day_cash_rate)
    const totalVal = (incomeVal*productData.value.siklus_investasi)+parseInt(newVal)
    income.value = incomeVal.toFixed(0)
    total.value = totalVal.toFixed(0)
})

const fetchData = async (product_id: string) => {
    productData.value = await getProductDetailApi({ productId: product_id })
}



const contactlink = (link: string) => {
    contactShow.value = false
    // #ifdef APP
    plus.runtime.openURL(link)
    // #endif
    // #ifdef H5
    window.location.href = link
    // #endif
}

const getInfo = async () => {
    const resdata = await customerServiceInfo()
    serviceInfo.value = resdata.data
    contactShow.value = true
    emitter.emit('toast_close')
}
const contactService = () => {
    emitter.emit('gifType')
    getInfo()
    // setTimeout(()=>{
    //     contactShow.value = true
    // },3000)
}

const InvestHandle = async () => {
    const params = {
        amount: productData.value.investment_points,
        product_id: productData.value.product_id
    }
    if (productData.value.color > 1) {
        params.amount = exchange_amount.value
    }
    if (params.amount < productData.value.investment_points) {
        loseShow.value = true
        return
    }
    emitter.emit('gifType')
    const data = await InvestProductApi(params)
    emitter.emit('toast_close')
    if (data.code == 0) {
        emitter.emit('toast', data.msg)
        return
    } else {
        // contractName
        investPoint.value = params.amount
        contractName.value = data.data.contractName
        // params.amount
        successShow.value = true
    }
}

const switchCard = (type: number | string) => {
    let classColor = ''
    switch (type) {
        case '1':
        case 1:
            classColor = 'short'
            break
        case '2':
        case 2:
            classColor = 'mid'
            break
        case '3':
        case 3:
            classColor = 'long'
            break
    }
    return classColor
}
onLoad((option: any) => {
    fetchData(option.product_id)
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滚动，可选
    })
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

    .product_info {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .service_btn {
            position: absolute;
            right: 10rpx;
            top: 10rpx;
        }

        .product_card {
            padding: 20rpx 20rpx 30rpx 20rpx;
            border-radius: 12rpx;
            background: linear-gradient(180deg, #ffffff 11.06%, rgba(255, 255, 255, 0.25) 79.33%);

            .product_card_image {
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 12rpx;
            }

            .product_card_info {
                padding: 0 5rpx;
                border-top-left-radius: 12rpx;
                border-top-right-radius: 12rpx;

                &.short {
                    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #3b8d6a 110.29%);
                }

                &.mid {
                    background: linear-gradient(0deg, rgba(246, 219, 144, 0) 0%, #d5ad50 110.29%);
                }

                &.long {
                    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #ed3e24 110.29%);
                }

                .card_info_head {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10rpx 40rpx;

                    .head_label {
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 18rpx;
                        line-height: 30rpx;
                        text-align: center;
                        color: #ffffff;
                    }

                    .head_line {
                        width: 2rpx;
                        height: 18rpx;
                        background: #ffffff;
                    }
                }

                .card_info_box {
                    padding: 40rpx 20rpx;
                    border-radius: 12rpx;
                    background: #ffffff;

                    .card_box_head {
                        font-family: Arial;
                        font-weight: 700;
                        font-size: 32rpx;
                        line-height: 40rpx;
                        text-align: center;

                        &.short {
                            color: #1e4b2e;
                        }

                        &.mid {
                            color: #a88228;
                        }

                        &.long {
                            color: #ae2d1a;
                        }
                    }

                    .card_box_line {
                        position: relative;
                        top: -25rpx;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .card_box_info {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;

                        .card_box_label {
                            .label_num {
                                font-family: Arial;
                                font-weight: 700;
                                font-size: 32rpx;
                                line-height: 48rpx;
                                text-align: center;

                                &.short {
                                    color: #458060;
                                }

                                &.mid {
                                    color: #a88228;
                                }

                                &.long {
                                    color: #f06550;
                                }
                            }

                            .label_text {
                                font-family: Arial;
                                font-weight: 400;
                                font-size: 20rpx;
                                line-height: 40rpx;
                                text-align: center;
                                color: #666666;
                            }
                        }
                    }

                    .card_info_title {
                        font-family: Arial;
                        font-weight: 700;
                        font-size: 32rpx;
                        line-height: 48rpx;
                        text-align: center;

                        &.short {
                            color: #1e4b2e;
                        }

                        &.mid {
                            color: #a88228;
                        }

                        &.long {
                            color: #ae2d1a;
                        }
                    }

                    .card_info_investasi {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .card_investasi_num {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            font-family: Arial;
                            font-weight: 700;
                            font-size: 36rpx;
                            line-height: 40rpx;
                            text-align: center;
                            color: #1e1e1e;
                        }
                    }

                    .product_info_profit {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .card_info_profit {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            width: 515rpx;
                            height: 67rpx;

                            &.short {
                                border: 4rpx solid #458060;
                            }

                            &.mid {
                                border: 4rpx solid #d2b571;
                            }

                            &.long {
                                border: 4rpx solid #f06550;
                            }

                            .profit_info_input {
                                padding: 0 20rpx;
                            }

                            .profit_info_btn {
                                width: 169rpx;
                                height: 67rpx;
                                font-family: Arial;
                                font-weight: 400;
                                font-size: 20rpx;
                                line-height: 67rpx;
                                text-align: center;
                                color: #ffffff;

                                &.short {
                                    background: #458060;
                                }

                                &.mid {
                                    background: #d2b571;
                                }

                                &.long {
                                    background: #f06550;
                                }
                            }
                        }
                    }

                    .card_text_profit {
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 20rpx;
                        line-height: 40rpx;
                        text-align: left;

                        &.short {
                            color: #1e4b2e;
                        }

                        &.mid {
                            color: #6f5a04;
                        }

                        &.long {
                            color: #ae2d1a;
                        }
                    }

                    .product_card_foot {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .product_card_btn {
                            width: 564rpx;
                            height: 67rpx;
                            border-radius: 12rpx;
                            font-family: Arial;
                            font-weight: 400;
                            font-size: 30rpx;
                            line-height: 67rpx;
                            text-align: center;
                            color: #ffffff;

                            &.short {
                                background: #458060;
                            }

                            &.mid {
                                background: linear-gradient(
                                    180deg,
                                    #f6db90 -94.03%,
                                    #d2b571 166.42%
                                );
                            }

                            &.long {
                                background: #f06550;
                            }
                        }
                    }
                }
            }
        }
        .contract_card {
            position: relative;
            .contract_card_info {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                padding: 0 30rpx;
                .card_info_head {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 20rpx 0;
                    .head_title {
                        margin-left: 20rpx;
                        font-family: Arial;
                        font-weight: 700;
                        font-size: 30rpx;
                        line-height: 40rpx;
                        color: #1e4b2e;
                    }
                }
                .card_info_line {
                    height: 1rpx;
                    background: #ffffff;
                }
                .card_info_foot {
                    padding: 15rpx 0;
                    font-family: Arial;
                    font-weight: 400;
                    font-size: 28rpx;
                    line-height: 40rpx;
                    text-align: center;
                    color: #1e1e1e;
                }
            }
        }
        .advantage_card {
            padding: 0 30rpx;
            border-radius: 12rpx;
            background: #ffffff;
            .card_info_head {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 20rpx 0;
                .head_title {
                    margin-left: 20rpx;
                    font-family: Arial;
                    font-weight: 700;
                    font-size: 30rpx;
                    line-height: 40rpx;
                    &.short {
                        color: #1e4b2e;
                    }

                    &.mid {
                        color: #a88228;
                    }

                    &.long {
                        color: #ae2d1a;
                    }
                }
            }
            .card_info_line {
                height: 1rpx;
                background: #d7d7d7;
            }
            .card_box_foot {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .foot_label {
                    padding: 40rpx 20rpx;
                    .label_title {
                        margin-bottom: 20rpx;
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 24rpx;
                        line-height: 40rpx;
                        text-align: center;
                        color: #666666;
                    }
                    .label_text {
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 28rpx;
                        line-height: 40rpx;
                        text-align: center;
                        color: #1e1e1e;
                    }
                    .label_num {
                        font-family: Arial;
                        font-weight: 400;
                        font-size: 28rpx;
                        line-height: 40rpx;
                        text-align: center;
                        color: #eb2c0f;
                    }
                }
                .foot_line {
                    width: 2rpx;
                    height: 30rpx;
                    background: #d7d7d7;
                }
            }
        }
        .product_cokelat {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            border-radius: 12rpx;
            background: #ffffff;
        }
        .product_advantage {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            border-radius: 12rpx;
            background: #ffffff;
        }
        .product_foot {
            position: fixed;
            bottom: 0;
            left: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 20rpx 30rpx;
            background: #ffffff;
            .product_foot_btn {
                width: 550rpx;
                height: 76rpx;
                border-radius: 12rpx;
                font-family: Arial;
                font-weight: 400;
                font-size: 36rpx;
                line-height: 76rpx;
                text-align: center;
                color: #ffffff;
                &.short {
                    background: #458060;
                }

                &.mid {
                    background: #d2b571;
                }

                &.long {
                    background: #ae2d1a;
                }
            }
        }

        .doShowBtn {
            text-align: center;
            position: relative;
            .btn_text {
                position: absolute;
                top: 0;
                left: 0;
                color: #ffffff;
                font-size: 26rpx;
            }
        }
    }
}
</style>

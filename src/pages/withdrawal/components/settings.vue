<template>
	<view class="settings">
		<view class="set_card mt-[20rpx] mx-[30rpx]">
			<u-image width="100%" height="171" src="@/static/images/withdrawal/setGroup.png"></u-image>
			<view class="settings_card pt-[20rpx] pb-[20rpx] px-[20rpx]">
				<view class="card_head">
					<view class="card_head_title">Saldo Dompet (Rp)</view>
<!--					<view class="card_head_account">ID:{{userInfo.account}}</view>-->
				</view>
				<view class="card_box">
					<view class="card_num">
						{{formatNumber(userInfo.user_money)}}
					</view>
<!--					<view class="card_text">Saldo</view>-->
				</view>

            <view class="trade_submit">
                <view class="trade_Item">
                    <view class="trade_title">Jumlah Penarikan</view>
                    <view class="settings_list">
                        <view class="settings_label mt-[20rpx] mb-[20rpx]" :class="{'active':formData.money == e}"
                              v-for="(e,index) in withdrawArr" :key="index" @tap="change(e)">
                            <view class="settings_Item">
                                {{formatNumber(e)}}
                            </view>
                        </view>
                    </view>
                    <view class="trade_input">
                        <u-input v-model="formData.money" type="number" :border="false"
                                 placeholder-style="color: #8B9098;font-size:24rpx;"
                                 placeholder="Masukkan Jumlah Yang Ingin Ditarik" />
                    </view>
                </view>

                <view class="trade_head  mt-[10rpx] mb-[2rpx]">
                    <view class="head_title">Bank</view>
                    <view class="head_bind" @tap="navigateTo('/pages/bind_card/bind_card')">
                        <u-image width="30" height="30" src="@/static/images/withdrawal/write_icon.png" alt="" />
                        <text class="addCard">Edit Informasi Bank</text>
                    </view>
                </view>
                <view class="trade_bank" @tap="select">
                    <view class="trade_bank_item">
                        <view>Name</view>
                        <view>{{ cardInfo.name }}</view>
                    </view>
                    <view class="trade_bank_item">
                        <view>Bank</view>
                        <view>{{ cardInfo.bank_name }}</view>
                    </view>
                    <view class="trade_bank_item">
                        <view>Akun</view>
                        <view>{{ cardInfo.bank_card }}</view>
                    </view>
                </view>
            </view>
            <view class="submit_btn mx-[10rpx] my-[30rpx]" @tap="submitEvent">Konfirmasi</view>
                <view class="trade_footer_tips">
                    <u-image width="100%" height="518" src="@/static/images/withdrawal/tips_bg.png"></u-image>
                    <view class="trade_footer_tips_text p-[20rpx]">
                        <view class="trade_footer_tips_text_title">Tips Penarikan</view>
                        <view class="trade_footer_tips_text_content">
                            <view class="trade_footer_tips_text_content_item">
                                <u-image width="30" height="30" src="@/static/images/withdrawal/num1.png" alt="" />
                                Jumlah penarikan minimum adalah Rp 50.000.
                            </view>
                            <view class="trade_footer_tips_text_content_item">
                                <u-image width="30" height="30" src="@/static/images/withdrawal/num2.png" alt="" />
                                Waktu proses penarikan: 12 hingga 72 jam kerja.
                            </view>
                            <view class="trade_footer_tips_text_content_item">
                                <u-image width="30" height="30" src="@/static/images/withdrawal/num3.png" alt="" />
                                Penarikan akan dikenakan pajak dan biaya administrasi.
                            </view>
                        </view>
                        <view class="fees_lv">
                            <view class="fees_lv_item fees_lv_title">
                                <view class="fess_lv_item_line">Jumlah Penarikan</view>
                                <view class="fess_lv_item_line">Biaya Penarikan</view>
                            </view>
                            <view class="fees_lv_item">
                                <view class="fess_lv_item_line">0—200.000</view>
                                <view class="fess_lv_item_line">12%</view>
                            </view>
                            <view class="fees_lv_item">
                                <view class="fess_lv_item_line">200.001—1.000.000</view>
                                <view class="fess_lv_item_line">8%</view>
                            </view>
                            <view class="fees_lv_item">
                                <view class="fess_lv_item_line">1.000.001—10.000.000</view>
                                <view class="fess_lv_item_line">5%</view>
                            </view>
                            <view class="fees_lv_item">
                                <view class="fess_lv_item_line">Lebin dari 10.000.000</view>
                                <view class="fess_lv_item_line">2%</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
		<u-select v-model="selectShow" confirm-text="Konfirmasi" cancel-text="Batal" :list="cardArr"
			@confirm="actionSheet"></u-select>
		<keywords :popup="keywordShow" title="Penarikan" :money="formData.money" @confirm="keywordConfirm" @close="keywordClose"></keywords>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { bankFormat, formatNumber } from '@/utils/util'
import { onShow } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import { withdrawal, withdrawalConfig } from '@/api/recharge'
import { bankCardDetail, bankCardList } from '@/api/bank'
import keywords from './keywords.vue'
import { emitter } from '@/utils/emitter'

const userStore = useUserStore()
	const { userInfo, isLogin } = storeToRefs(userStore)
	const selectShow = ref<Boolean>(false)
	const feeRate = ref<number>(0)
	const cardNumber = ref<string>('')
	const keywordShow = ref<Boolean>(false)
	const paymentArr = ref<Array<any>>([])
	const withdrawArr = ref<Array<any>>([])
	const cardArr = ref<Array<any>>([])
    const cardInfo = reactive({
        name: '',
        bank_name: '',
        bank_card: '',
        bank_code: ''
    })
	const formData = reactive<{
		bank_code : String,
		bank_name : String,
		card_number : String,
		money : any,
		password: String,
		pay_way: number,
		type : any
	}>({
		bank_code: '',
		bank_name: '',
		card_number: '',
		pay_way: 0,
		money: null,
		password: '',
		type: 1
	})
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const actionSheet = (arr : any) => {
		formData.bank_code = arr[0].extra
		formData.bank_name = arr[0].label
		formData.card_number = arr[0].value
		cardNumber.value = bankFormat(arr[0].value)
	}
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const change = (e : any) => {
		formData.money = Number(e)
	}
	const cardList = async () => {
		const data = await bankCardList({pay_way: formData.pay_way})
		cardArr.value = data.lists.map((e : any) => ({
			value: e.bank_card,
			label: e.bank_name,
			extra: e.ifsc
		}))
	}
	const resetForm = () => {
		const resetData = {
			bank_code: '',
			bank_name: '',
			password:'',
			pay_way: 0,
			card_number: '',
			money: null,
			type: 1
		}
		Object.assign(formData, resetData)
	}
	const getConfig = async () => {
		const data = await withdrawalConfig()
		paymentArr.value = data.lists
		formData.pay_way = data.lists[0].pay_way
		withdrawArr.value =  data.lists[0].withdrawal_amount ? data.lists[0].withdrawal_amount.split(',') : []
		feeRate.value = data.lists[0].fee_rate
		// cardList()
        await getBankCardDetail()
	}
    const getBankCardDetail = async () => {
        const data = await bankCardDetail({})
        cardInfo.name  = data.name
        cardInfo.bank_card  = data.bank_card
        cardInfo.bank_name = data.bank_name
        cardInfo.bank_code = data.ifsc

    }
	const select = () => {
		selectShow.value = !selectShow.value
	}
	const submitEvent = () => {
		if (!formData.money) return toast('Silahkan pilih jumlah untuk menarik')
		// if (!formData.card_number) return toast('Silahkan pilih kartu bank')
		userInfo.value.has_pay_password ? keywordShow.value = true : navigateTo('/pages/change_payPwd/change_payPwd?type=set')
	}
	const keywordConfirm = (e: any) => {
		formData.password = e.password
		keywordShow.value = false
		payment()
	}
	const radioChange = (e : any) => {
		formData.pay_way = e.pay_way
		withdrawArr.value = e.withdrawal_amount ? e.withdrawal_amount.split(',') : []
		feeRate.value = e.fee_rate
		cardList()
	}
	const keywordClose = () => {
		keywordShow.value = false
	}
	const payment = () => {
		emitter.emit('gifType')
		withdrawalAsync()
	}
	const withdrawalAsync = async () => {

        const payInfo = {
            bank_code: cardInfo.bank_code,
            bank_name: cardInfo.bank_name,
            card_number: cardInfo.bank_card,
            money: formData.money,
            pay_way: formData.pay_way,
            withdrawal_password: formData.password,
            // type: formData.type
        }
        const resData = await withdrawal(payInfo)
        emitter.emit('toast_close')
        if (resData.code == 1) {
            userStore.getUser()
            resetForm()
            toast('Sukses')
        } else {
            toast(resData.msg)
        }

		// setTimeout(async () => {
		// 	const payInfo = {
		// 		bank_code: formData.bank_code,
		// 		bank_name: formData.bank_name,
		// 		card_number: formData.card_number,
		// 		money: formData.money,
		// 		pay_way: formData.pay_way,
		// 		withdrawal_password: formData.password,
		// 		type: formData.type
		// 	}
		// 	const resData = await withdrawal(payInfo)
        //     emitter.emit('toast_close')
		// 	if (resData.code == 1) {
		// 		userStore.getUser()
		// 		resetForm()
		// 		toast('Sukses')
		// 	} else {
		// 		toast(resData.msg)
		// 	}
        //
		// }, 3000)
	}
	onShow(() => {
		userStore.getUser()
		getConfig()
	})
</script>

<style lang="scss" scoped>
	.settings {
		.set_card {
            background: #ffffff;
            min-height: 100vh;
            border-top-right-radius: 10rpx;
            border-top-left-radius: 10rpx;
			position: relative;
			.settings_card {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				.card_head{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.card_head_title{
						font-family: Arial;
						font-weight: 700;
						font-size: 28rpx;
						line-height: 48rpx;
						color: #1E1E1E;
					}
					.card_head_account{
						font-family: Arial;
						font-weight: 400;
						font-size: 20rpx;
						line-height: 40rpx;
						color: #FFFFFF;
					}
				}
				.card_box {
					padding: 20rpx 0;
					.card_num {
						font-family: Arial;
						font-size: 48rpx;
						font-weight: 700;
						line-height: 64rpx;
						text-align: left;
						color: #1E4B2E;
					}

					.card_text {
						font-family: Arial;
						font-size: 30rpx;
						font-weight: 500;
						line-height: 48rpx;
						text-align: left;
						color: #eeeeee;
					}
				}

			}

            .settings_list {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 0 10px;

                .settings_label {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 186rpx;
                    height: 96rpx;
                    border-radius: 6rpx;
                    background: #F0F0F0;

                    .settings_Item {
                        font-family: Arial;
                        font-size: 28rpx;
                        font-weight: 700;
                        text-align: center;
                        color: #1E1E1E;
                    }
                }

                .active {
                    border: 2rpx solid #1E4B2E;
                    background: #E5F0FF;
                }

                .hidden {
                    display: none;
                }
            }

            .trade_submit {
                .trade_Item {
                    margin-bottom: 20rpx;

                    .trade_title {
                        font-family: Arial;
                        font-size: 32rpx;
                        font-weight: 700;
                        line-height: 40rpx;
                        text-align: left;
                        color: #1E4B2E;
                    }

                    .trade_input {
                        margin-top: 20rpx;
                        padding: 0 30rpx;
                        background: #FFFFFF;
                        border-radius: 12rpx;
                        border: 2rpx solid #8B9098;
                    }
                }
                .trade_tips{
                    margin: 10rpx 0;
                    font-family: Arial;
                    font-size: 24rpx;
                    font-weight: 500;
                    line-height: 40rpx;
                    text-align: left;
                    color: #8B9098;
                    .tips{
                        margin-right: 5rpx;
                        font-family: Arial;
                        font-size: 24rpx;
                        font-weight: 500;
                        line-height: 40rpx;
                        text-align: left;
                        color: #999999;
                    }
                }
                .exchange_rate {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    .title {
                        font-family: Arial;
                        font-size: 24rpx;
                        font-weight: 500;
                        line-height: 40rpx;
                        text-align: left;
                        color: #1E1E1E;
                    }

                    .point {
                        margin: 0 10rpx;
                        font-family: Arial;
                        font-size: 24rpx;
                        font-weight: 500;
                        line-height: 40rpx;
                        text-align: left;
                        color: #ECB54B;
                    }
                }
                .trade_head {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .head_title {
                        font-family: Arial;
                        font-size: 32rpx;
                        font-weight: 500;
                        line-height: 48rpx;
                        text-align: left;
                        color: #1E1E1E;
                    }

                    .head_bind {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .addCard {
                            margin-left: 10rpx;
                            font-family: Arial;
                            font-size: 22rpx;
                            font-weight: 500;
                            line-height: 40rpx;
                            text-align: right;
                            color: #1E4B2E;
                        }
                    }
                }

                .trade_bank {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    background: #FFFFFF;
                    margin-bottom: 20rpx;
                    .trade_bank_item {
                        display: flex;
                        height: 40rpx;
                        color: #666666;
                        margin-top: 20rpx;
                        flex-direction: row;
                        width: 100%;
                        justify-content: space-between;
                        border-bottom: 1px #252424 dashed ;
                    }
                }


            }
            .trade_footer_tips {
                position: relative;
                .trade_footer_tips_text {
                    position: absolute;
                    left: 0;
                    top: 0;
                    .trade_footer_tips_text_title {
                        color: #000000;
                        font-size: 30rpx;
                        font-weight: 700;
                        padding: 10rpx 0;
                    }
                    .trade_footer_tips_text_content{
                        .trade_footer_tips_text_content_item {
                            :first-child{
                                margin-right: 10rpx;
                            }
                            display: flex;
                            flex-direction: row;
                            font-size: 26rpx;
                            margin: 15rpx 0;
                        }
                    }
                    .fees_lv {
                        border: #1E4B2E solid 1rpx;
                        border-radius: 6rpx;
                        padding: 10rpx;
                        margin-top: 10rpx;
                        color: #1E4B2E;
                        .fees_lv_title {
                            font-weight: bold;
                        }
                        .fees_lv_item{
                            font-size: 24rpx;
                            margin-top: 10rpx;
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: start;
                            .fess_lv_item_line{
                                flex: 1;
                            }
                            :first-child{
                                flex: 2;
                            }
                        }
                    }
                }
            }
		}

		.recharge_payment {
			padding: 40rpx 40rpx 20rpx 40rpx;
			border-radius: 12rpx;
			background: #FFFFFF;

			.payment_head {
				margin-bottom: 20rpx;
				font-family: Arial;
				font-size: 32rpx;
				font-weight: 700;
				line-height: 48rpx;
				text-align: left;
				color: #1E4B2E;
			}

			.u-radio-group {
				display: block;
			}

			.payment_list {
				.payment_Item {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.payment_label {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.payment_name {
							margin-left: 20rpx;
							font-family: Arial;
							font-size: 28rpx;
							font-weight: 700;
							line-height: 40rpx;
							text-align: left;
							color: #333333;
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
			color: #FFFFFF;
		}
	}
</style>

import { client } from '@/utils/client'
import request from '@/utils/request'

//支付方式配置
export function getpayWayList() {
    return request.get({ url: '/pay/payWayList' }, { isAuth: true })
}

//支付方式
export function getPayWay(data: any) {
    return request.get({ url: '/pay/payWay', data }, { isAuth: true })
}

//创建充值订单
export function getRecharge(data: any) {
    return request.post({ url: '/recharge/recharge', data }, { isAuth: true, isCustom: true })
}

// 发起支付
export function prepay(data: Record<string, any>) {
    return request.post({ url: '/pay/prepay', data: { ...data, terminal: client } }, { isAuth: true, isCustom: true })
}

// 支付状态
export function getPayResult(data: any) {
    return request.get({ url: '/pay/payStatus', data }, { isAuth: true })
}
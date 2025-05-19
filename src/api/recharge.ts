import request from '@/utils/request'

//充值
export function recharge(data: any) {
    return request.post({ url: '/recharge/recharge', data }, { isAuth: true })
}

//充值记录
export function rechargeRecord(data: any) {
    return request.get({ url: '/recharge/lists', data }, { isAuth: true })
}

// 充值配置
export function rechargeConfig() {
    return request.get({ url: '/recharge/config' }, { isAuth: true })
}

//提现金额配置
export function withdrawalConfig() {
    return request.get({ url: '/withdrawalConfig/list' }, { isAuth: true })
}

//提现记录
export function withdrawalLog(data: any) {
    return request.get({ url: '/withdrawalLog/list', data }, { isAuth: true })
}

//提现
export function withdrawal(data: any) {
    return request.post({ url: '/withdrawalLog/withdrawal', data }, { isAuth: true, isCustom: true })
}
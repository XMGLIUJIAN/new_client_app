import request from '@/utils/request'

//兑换配置列表
export function exchangelist(data: any) {
    return request.get({ url: '/exchangeCurrencyConfig/list', data})
}
//转账配置列表
export function transferlist() {
    return request.get({ url: '/transferableCurrencyConfig/list'})
}

// 货币兑换 5:现金兑换积分 6:现金兑换银商代币 7:积分兑换现金 8:积分兑换银商代币 9:银商代币兑换现金 10:银商代币兑换积分
export function currencyConversion(data: any) {
    return request.post({ url: '/exchange/currencyConversion', data},{ isCustom: true})
}

//货币转账 2:现金转账、3:积分转账、4:银商代币转账
export function sendExchange(data: any) {
    return request.post({ url: '/exchange/sendExchange', data},{ isCustom: true})
}
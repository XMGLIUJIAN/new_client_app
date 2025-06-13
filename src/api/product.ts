import request from '@/utils/request'
import { client } from '@/utils/client'

export function getProductApi() {
    return request.get({ url: '/productConfig/list' })
}

export function getProductDetailApi(params  : any) {
    return request.get({ url: '/productConfig/detail',data:params})
}

export function interestCalculator(params  : any) {
    return request.get({ url: '/productConfig/interestCalculator',data:params }, { isAuth: true })
}



export function InvestProductApi(params  : any) {
    // return request.post({ url: '/pay/prepay', data: { ...data, terminal: client } }, { isAuth: true, isCustom: true })
    return request.post({ url: '/myContract/productInvest',data: { ...params, terminal: client } }, { isAuth: true, isCustom: true })
}

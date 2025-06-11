import request from '@/utils/request'

export function getProductApi() {
    return request.get({ url: '/productConfig/list' })
}

export function getProductDetailApi(id  : any) {
    return request.get({ url: '/productConfig/detail?id='+id })
}

import request from '@/utils/request'

export function getProductApi() {
    return request.get({ url: '/productConfig/list' })
}

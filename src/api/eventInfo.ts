import request from '@/utils/request'

//活动资讯列表
export function eventList() {
    return request.get({ url: '/eventInfo/list' })
}

//活动资讯详情
export function eventInfo(data: any) {
    return request.get({ url: '/eventInfo/detail',data})
}

//消息类型
export function mesNotifiConf() {
    return request.get({ url: '/mesNotifiConf/list'})
}

//消息列表
export function mesNotifiList(data: any) {
    return request.get({ url: '/mesNotifi/list', data})
}

//消息详情
export function mesNotifiInfo(data: any) {
    return request.get({ url: '/mesNotifi/detail',data})
}

//客服
export function customerServiceInfo() {
    return request.get({ url: '/customerService/detail'},{isCustom: true})
}

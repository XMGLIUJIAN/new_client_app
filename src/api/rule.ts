import request from '@/utils/request'

//规则列表
export function investRuleList() {
    return request.get({ url: '/investRule/list' })
}

//规则详情
export function investRuleInfo(data: any) {
    return request.get({ url: '/investRule/detail', data})
}

//关于我们列表
export function aboutUsList() {
    return request.get({ url: '/aboutUs/list' })
}

//关于我们详情
export function aboutUsInfo() {
    return request.get({ url: '/aboutUs/detail',})
}
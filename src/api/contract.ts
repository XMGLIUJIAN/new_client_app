import request from '@/utils/request'

//合同列表
export function contractList() {
    return request.get({ url: '/contract/list' })
}

//合同详情
export function contractInfo(data:any) {
    return request.get({ url: '/contract/detail', data})
}

//我的合同列表
export function myContractList() {
    return request.get({ url: '/myContract/list' })
}

//我的合同详情
export function myContractInfo(data:any) {
    return request.get({ url: '/myContract/detail', data})
}

//投资合同
export function myContractInvest(data:any) {
    return request.post({ url: '/myContract/invest', data}, {isCustom: true})
}

//投资信息
export function myContractInvestInfo(data:any) {
    return request.get({ url: '/myContract/investInfo', data})
}

//我的合同日志列表
export function myContractLogList(data: any) {
    return request.get({ url: '/myContractLog/list', data}, { isAuth: true })
}

//我的合同日志详情
export function myContractLogInfo(data:any) {
    return request.get({ url: '/myContractLog/detail', data})
}

//月度报表
export function monthReport(data:any) {
    return request.get({ url: '/monthReport/list', data}, { isAuth: true })
}

//流水日志列表
export function cashFlowLogList(data: any) {
    return request.get({ url: '/cashFlowLog/list', data}, { isAuth: true })
}

//流水日志详情
export function cashFlowLogInfo(data:any) {
    return request.get({ url: '/cashFlowLog/detail', data})
}
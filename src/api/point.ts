import request from '@/utils/request'


export function getPointVaultIncomeRateApi() {
    return request.get({ url: '/pointVaultIncomeRate/detail' })
}

//邀请记录
export function getInviteRecordApi() {
    return request.get({ url: '/inviteRecord/list'})
}

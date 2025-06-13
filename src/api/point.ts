import request from '@/utils/request'

export function getPointVaultIncomeRateApi() {
    return request.get({ url: '/pointVaultIncomeRate/detail'},{ isCustom: true})
}

//邀请记录
export function getInviteRecordApi() {
    return request.get({ url: '/inviteRecord/list'})
}

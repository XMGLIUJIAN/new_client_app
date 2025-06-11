import request from '@/utils/request'


export function getPointVaultIncomeRateApi() {
    return request.get({ url: '/pointVaultIncomeRate/detail' })
}

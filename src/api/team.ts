import request from '@/utils/request'

// 团队用户排名
export function teamRank() {
    return request.get({ url: '/user/myTeamRank' }, { isAuth: true })
}

// 团队详情
export function teamInfo() {
    return request.get({ url: '/user/teamDetail'}, { isAuth: true })
}

// 团队用户详情
export function teamUserInfo(data: any) {
    return request.get({ url: '/user/myTeamUserDetail', data},{ isAuth: true, isCustom: true })
}

// 每日签到记录
export function signList(data: any) {
    return request.get({ url: '/daySign/list', data})
}

// 每日签到
export function signIn() {
    return request.get({ url: '/daySign/signIn'},{ isCustom: true})
}

// 合同解约提醒
export function editTermination(data: any) {
    return request.post({ url: '/myContractTermination/edit', data})
}
//查询合同解约提醒
export function listTermination() {
    return request.get({ url: '/myContractTermination/list'})
}
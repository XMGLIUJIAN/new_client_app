import request from '@/utils/request'

//转盘信息初始化
export function lotteryInfo() {
    return request.get({ url: '/lottery/info'}, { isUrlPrefix: true, isAuth:true, isCustom:true })
}

//开始抽奖
export function lotteryPlay() {
    return request.post({ url: '/lottery/play'}, { isUrlPrefix: true, isAuth:true })
}

//抽奖记录
export function lotteryLogs(data: any) {
    return request.get({ url: '/lottery/logs',data}, { isUrlPrefix: true, isAuth:true })
}

//幸运用户
export function lotteryLuckUser() {
    return request.get({ url: '/lottery/luck_user'}, { isUrlPrefix: true, isAuth:true })
}

//规则公告
export function lotteryNotice() {
    return request.get({ url: '/lottery/notice'}, { isUrlPrefix: true, isAuth:true })
}

//投资项目列表
export function pointsInvestment() {
    return request.get({ url: '/points_investment'}, { isUrlPrefix: true })
}

//项目内容初始化
export function pointsInvestmentInfo(data: any) {
    return request.get({ url: '/points_investment/detail',data}, { isUrlPrefix: true, isAuth:true })
}

//投资项目
export function investment(data: any) {
    return request.post({ url: '/points_investment',data}, { isUrlPrefix: true, isAuth:true, isCustom:true })
}

//投资记录
export function investmentRecord(data: any) {
    return request.get({ url: '/points_investment/record',data}, { isUrlPrefix: true, isAuth:true })
}

//释放明细
export function returnRecord(data: any) {
    return request.get({ url: '/points_investment/return_record',data}, { isUrlPrefix: true, isAuth:true })
}

//资格查询
export function eligibilityCheck(data: any) {
    return request.get({ url: '/points_investment/eligibility_check',data}, { isUrlPrefix: true, isAuth:true })
}
import request from '@/utils/request'

export function getUserCenter(header?: any) {
    return request.get({ url: '/user/center', header }, { ignoreCancel: true })
}

// 个人信息
export function getUserInfo() {
    return request.get({ url: '/user/info' }, { isAuth: true })
}

// 个人编辑
export function userEdit(data: any) {
    return request.post({ url: '/user/setInfo', data }, { isAuth: true })
}

// 绑定手机
export function userBindMobile(data: any, header?: any) {
    return request.post({ url: '/user/bindMobile', data, header }, { isAuth: true, isCustom: true })
}

// 微信电话
export function userMnpMobile(data: any) {
    return request.post({ url: '/user/getMobileByMnp', data }, { isAuth: true })
}

// 更改密码
export function userChangePwd(data: any) {
    return request.post({ url: '/user/changePassword', data }, { isAuth: true,  isCustom: true})
}

//忘记密码
export function forgotPassword(data: Record<string, any>) {
    return request.post({ url: '/user/forgotPwd', data }, {isCustom: true})
}

//重置密码
export function resetPassword(data: Record<string, any>) {
    return request.post({ url: '/user/resetPassword', data })
}

//设置支付密码
export function setPayPassword(data: Record<string, any>) {
    return request.post({ url: '/user/setPayPassword', data }, {isAuth: true, isCustom: true})
}

//修改支付密码
export function userChangePayPwd(data: Record<string, any>) {
    return request.post({ url: '/user/changePayPassword', data },{isAuth: true, isCustom: true})
}

//忘记支付密码
export function forgotPayPassword(data: Record<string, any>) {
    return request.post({ url: '/user/forgotPayPassword', data }, {isAuth: true, isCustom: true})
}

//余额明细
export function accountLog(data: any) {
    return request.get({ url: '/account_log/lists', data })
}

//下级用户信息
export function lowerLevelUser(data: any) {
    return request.get({ url: '/user/lowerLevelUsers', data },{ isAuth: true})
}

//首页数据面板
export function myIncomeInfo() {
    return request.get({ url: '/user/myIncomeInfo'},{isCustom: true})
}

//确认用户信息
export function confirmInfo(data: any) {
    return request.get({ url: '/user/confirmInfo', data},{isCustom: true})
}

//app下载弹窗
export function downloadAccess() {
    return request.get({ url: '/downloadUrl/accessLog'},{isCustom: true})
}

//app下载地址
export function download() {
    return request.get({ url: '/downloadUrl/detail'})
}

//记录登录状态
export function getLogCenter(data: any) {
    return request.get({ url: '/loginLog/add', data},{isCustom: true})
}
import { client } from '@/utils/client'
import request from '@/utils/request'

// 登录
export function login(data: Record<string, any>) {
    return request.post({ url: '/login/account', data: { ...data, terminal: client } })
}

//退出登录
export function logout() {
    return request.post({ url: '/login/logout'})
}

//注册
export function register(data: Record<string, any>) {
    return request.post({ url: '/login/register', data: { ...data, channel: client } },{isCustom: true})
}

//登录前置验证
export function loginPreVerify(data: any) {
    return request.post({ url: '/login/loginPreVerify', data}, {isCustom: true})
}

//注册前置验证
export function registerInviteCodeVerify(data: any) {
    return request.post({ url: '/login/registerInviteCodeVerify', data}, {isCustom: true})
}

//向微信请求code的链接
export function getWxCodeUrl(data: Record<string, any>) {
    return request.get({ url: '/login/codeUrl', data })
}

export function OALogin(data: Record<string, any>) {
    return request.post({ url: '/login/oaLogin', data })
}

export function mnpLogin(data: Record<string, any>) {
    return request.post({ url: '/login/mnpLogin', data })
}

//更新微信小程序头像昵称
export function updateUser(data: Record<string, any>, header: any) {
    return request.post({ url: '/login/updateUser', data, header })
}

//小程序绑定微信
export function mnpAuthBind(data: Record<string, any>) {
    return request.post({ url: '/login/mnpAuthBind', data })
}

//公众号绑定微信
export function oaAuthBind(data: Record<string, any>) {
    return request.post({ url: '/login/oaAuthBind', data })
}

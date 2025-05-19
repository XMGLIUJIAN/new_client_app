import request from '@/utils/request'

//银行卡列表
export function bankCardList(data: any) {
    return request.get({ url: '/bankCard/list', data}, { isAuth: true })
}

//银行卡新增
export function bankCardAdd(data: any) {
    return request.post({ url: '/bankCard/add', data }, { isAuth: true })
}

//银行卡编辑
export function bankCardEdit(data: any) {
    return request.post({ url: '/bankCard/edit', data }, { isAuth: true })
}

//银行卡删除
export function bankCardDel(data: any) {
    return request.post({ url: '/bankCard/del', data }, { isAuth: true })
}

//银行卡详情
export function bankCardDetail(data: any) {
    return request.get({ url: '/bankCard/detail', data }, { isAuth: true })
}

//银行卡配置列表
export function bankList() {
    return request.get({ url: '/bankList/list' }, { isAuth: true })
}

//银行卡配置详情
export function bankListDetail(data: any) {
    return request.get({ url: '/bankList/detail', data }, { isAuth: true })
}
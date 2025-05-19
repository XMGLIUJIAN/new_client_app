//菜单主题类型
export enum ThemeEnum {
    LIGHT = 'light',
    DARK = 'dark'
}

// 客户端
export enum ClientEnum {
    MP_WEIXIN = 1, // 微信-小程序
    OA_WEIXIN = 2, // 微信-公众号
    H5 = 3, // H5
    IOS = 5, //苹果
    ANDROID = 6 //安卓
}

export enum SMSEnum {
    LOGIN = 'YZMDL',//登录
	REGISTER = 'YZMZC',//注册
    BIND_MOBILE = 'BDSJHM',//绑定手机
    CHANGE_MOBILE = 'BGSJHM',//更换手机
    FIND_PASSWORD = 'ZHDLMM', //找回登录密码
	FIND_PAY_PASSWORD = 'ZHZFMM' //找回支付密码
}

export enum SearchTypeEnum {
    HISTORY = 'history'
}

// 用户资料
export enum FieldType {
    NONE = '',
    AVATAR = 'avatar',
    USERNAME = 'account',
    NICKNAME = 'nickname',
    SEX = 'sex',
	WHATSAPP = 'whatsapp',
	TELEGRAM = 'telegram'
}

// 支付结果
export enum PayStatusEnum {
    SUCCESS = 'success',
    FAIL = 'fail',
    PENDING = 'pending'
}

// 页面状态
export enum PageStatusEnum {
    LOADING = 'loading', // 加载中
    NORMAL = 'normal', // 正常
    ERROR = 'error', // 异常
    EMPTY = 'empty' // 为空
}

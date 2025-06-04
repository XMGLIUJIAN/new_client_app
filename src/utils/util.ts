import { isObject } from '@vue/shared'
import { getToken } from './auth'
import { parseQuery } from "uniapp-router-next";
import { filter } from 'lodash-es';
import { number } from 'echarts';

/**
 * @description 获取元素节点信息（在组件中的元素必须要传ctx）
 * @param  { String } selector 选择器 '.app' | '#app'
 * @param  { Boolean } all 是否多选
 * @param  { ctx } context 当前组件实例
 */
export const getRect = (selector : string, all : boolean = false, context ?: any) => {
	return new Promise((resolve, reject) => {
		let qurey = uni.createSelectorQuery()
		if (context) {
			qurey = uni.createSelectorQuery().in(context)
		}
		qurey[all ? 'selectAll' : 'select'](selector)
			.boundingClientRect(function (rect) {
				if (all && Array.isArray(rect) && rect.length) {
					return resolve(rect)
				}
				if (!all && rect) {
					return resolve(rect)
				}
				reject('Tidak dapat menemukan elemen')
			})
			.exec()
	})
}

/**
 * @description 获取当前页面实例
 */
export function currentPage() {
	const pages = getCurrentPages()
	const currentPage = pages[pages.length - 1]
	return currentPage || {}
}

/**
 * @description 后台选择链接专用跳转
 */
interface Link {
	path : string
	name ?: string
	type : string
	canTab : boolean
	query ?: Record<string, any>
}

export enum LinkTypeEnum {
	'SHOP_PAGES' = 'shop',
	'CUSTOM_LINK' = 'custom',
	'MINI_PROGRAM' = 'mini_program'
}

export function navigateTo(link : Link, navigateType : 'navigateTo' | 'switchTab' | 'reLaunch' = 'navigateTo') {
	// 如果是小程序跳转
	if (link.type === LinkTypeEnum.MINI_PROGRAM) {
		navigateToMiniProgram(link)
		return
	}

	const url = link?.query ? `${link.path}?${objectToQuery(link?.query)}` : link.path;

	(navigateType == 'switchTab' || link.canTab) && uni.switchTab({ url })
	navigateType == 'navigateTo' && uni.navigateTo({ url })
	navigateType == 'reLaunch' && uni.reLaunch({ url })
}

/**
 * @description 小程序跳转
 * @param link 跳转信息，由装修数据进行输入
 */
export function navigateToMiniProgram(link : Link) {
	const query = link.query;
	// #ifdef H5
	window.open(
		`weixin://dl/business/?appid=${query?.appId}&path=${query?.path}&env_version=${query?.env_version}&query=${encodeURIComponent(query?.query)}`
	)
	// #endif
	// #ifdef MP
	uni.navigateToMiniProgram({
		appId: query?.appId,
		path: query?.path,
		extraData: parseQuery(query?.query),
		envVersion: query?.env_version,
	})
	// #endif
}

/**
 * @description 将一个数组分成几个同等长度的数组
 * @param  { Array } array[分割的原数组]
 * @param  { Number } size[每个子数组的长度]
 */
export const sliceArray = (array : any[], size : number) => {
	const result = []
	for (let x = 0; x < Math.ceil(array.length / size); x++) {
		const start = x * size
		const end = start + size
		result.push(array.slice(start, end))
	}
	return result
}

/**
 * @description 是否为空
 * @param {unknown} value
 * @return {Boolean}
 */
export const isEmpty = (value : unknown) => {
	return value == null && typeof value == 'undefined'
}

/**
 * @description 对象格式化为Query语法
 * @param { Object } params
 * @return {string} Query语法
 */
export function objectToQuery(params : Record<string, any>) : string {
	let query = ''
	for (const props of Object.keys(params)) {
		const value = params[props]
		const part = encodeURIComponent(props) + '='
		if (!isEmpty(value)) {
			console.log(encodeURIComponent(props), isObject(value))
			if (isObject(value)) {
				for (const key of Object.keys(value)) {
					if (!isEmpty(value[key])) {
						const params = props + '[' + key + ']'
						const subPart = encodeURIComponent(params) + '='
						query += subPart + encodeURIComponent(value[key]) + '&'
					}
				}
			} else {
				query += part + encodeURIComponent(value) + '&'
			}
		}
	}
	return query.slice(0, -1)
}

/**
 * @description 添加单位
 * @param {String | Number} value 值 100
 * @param {String} unit 单位 px em rem
 */
export const addUnit = (value : string | number, unit : string = 'rpx') => {
	return !Object.is(Number(value), NaN) ? `${value}${unit}` : value
}

/**
 * @description 格式化输出价格
 * @param  { string } price 价格
 * @param  { string } take 小数点操作
 * @param  { string } prec 小数位补
 */
export function formatPrice({ price, take = 'all', prec = undefined } : any) {
	let [integer, decimals = ''] = (price + '').split('.')

	// 小数位补
	if (prec !== undefined) {
		const LEN = decimals.length
		for (let i = prec - LEN; i > 0; --i) decimals += '0'
		decimals = decimals.substr(0, prec)
	}

	switch (take) {
		case 'int':
			return integer
		case 'dec':
			return decimals
		case 'all':
			return integer + '.' + decimals
	}
}

/**
 * @description 组合异步任务
 * @param  { string } task 异步任务
 */

export function series(...task : Array<(_arg : any) => any>) {
	return function () : Promise<any> {
		return new Promise((resolve, reject) => {
			const iteratorTask = task.values()
			const next = (res ?: any) => {
				const nextTask = iteratorTask.next()
				if (nextTask.done) {
					resolve(res)
				} else {
					Promise.resolve(nextTask.value(res)).then(next).catch(reject)
				}
			}
			next()
		})
	}
}

/*
	 * 处理富文本里的图片宽度自适应
	 * 1.去掉img标签里的style、width、height属性
	 * 2.img标签添加style属性：max-width:100%;height:auto
	 * 3.修改所有style里的width属性为max-width:100%
	 * 4.去掉<br/>标签
	 * @param html
	 * @returns {void|string|*}
	 */
export const formatRichText = (html : string) => {
	if (html) {
		let newContent = html.replace(/<img[^>]*>/gi, function (match) {
			match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
			match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
			match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
			return match;
		});
		newContent = newContent.replace(/style="[^"]+"/gi, function (match) {
			match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
				'max-width:100%;');
			return match;
		});
		newContent = newContent.replace(/<br[^>]*\/>/gi, '');
		newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:0 auto;"');

		return newContent;
	}

}
/*
* 数字转换单位
*/
export const formatNumber = (num : string | number | any) => {
	let x = typeof (num) == 'number' ? num.toString() : num
	var pattern = /(-?\d+)(\d{3})/;
	while (pattern.test(x))
		x = x.replace(pattern, "$1.$2");
	return x
}
/*
* 进度条数据转换
*/
export const formatProgress = (numberProgress : any = 0, totalProgress : any = 0) => {
	let percentage = (numberProgress / totalProgress) * 100;
	return percentage
}

/*
* 获取设备信息
*/
export const getDeviceInfo = () => {
	const system = uni.getSystemInfoSync();
	return system
}

/*
* 过滤空值
*/
export const filterFormat = (obj : any) => {
	let param = {};
	if (obj === null || obj === undefined || obj === "") return param;
	for (var key in obj) {
		if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
			param[key] = obj[key];
		}
	}
	return param;
}

/*
* 获取当前年月日
*/
export const getNowFormatDate = () => {
	let date : any = new Date()
	let year = date.getFullYear() //获取完整的年份(4位)
	let month = date.getMonth() + 1 //获取当前月份(0-11,0代表1月)
	let day = date.getDate().toString() //获取当前日(1-31)
	return `${day}-${month}-${year}`
}

/*
* 转换时间格式
*/
export const formatDate = (timestamp: any) => {	
	let format = timestamp.split('+')[0].replace('T', ' ');
	
	// 拆分日期部分
	let [date, time] = format.split(' ');
	let [year, month, day] = date.split('-');
	let [hour, minute, second] = time.split(':');
	// 重新拼接为 "日-月-年"
	let formatted = `${day}-${month}-${year} ${hour}:${minute}:${second}`
	return formatted
}

//格式化银行卡、手机号码
export const bankFormat = (val : string) => {
	// 移除非数字字符
	const cleaned = val.replace(/\D/g, '');
	const len = cleaned.length;
	if (len === 0) return '';

	// 分割成4位一组
	const parts = [];
	let i = 0;
	while (i < len) {
		parts.push(cleaned.slice(i, i + 4));
		i += 4;
	}

	// 判断是否为4的倍数
	const isMultipleOfFour = len % 4 === 0;

	// 处理脱敏
	let maskedParts;
	if (isMultipleOfFour) {
		// 替换前n-1组为****，最后一组保留
		maskedParts = parts.map((part, index) =>
			index < parts.length - 1 ? '****' : part
		);
	} else {
		// 替换所有完整的4位组为****，剩余部分保留
		maskedParts = parts.map(part =>
			part.length === 4 ? '****' : part
		);
	}

	// 用空格连接各组
	return maskedParts.join(' ');
}

/**
 * 清理应用已缓存的文件
*/
export const clearCacheFile = () => {
	// #ifndef H5
	uni.getSavedFileList({
		success: (res) => {
			let fileList = res.fileList
			if (fileList.length) {
				for (let i = 0; i < fileList.length; i++) {
					uni.removeSavedFile({
						filePath: fileList[i].filePath,
						complete: () => {
							console.log('清除缓存已完成')
						}
					})
				}
			}
		}
	})
	// #endif
}

/**
 * 清除 localStorage 数据
 * @param {String} name - 缓存数据的标识
 */
export const clearStore = (name: any) => {
  if (name) {
    uni.removeStorageSync(name)
  } else {
    uni.clearStorageSync()
  }
}
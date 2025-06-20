<template>
	<view class="almost-lottery">
		<view class="almost-lottery__wrap" :style="{ width: lotterySize + 'rpx', height: lotterySize + 'rpx' }">
			<view class="lottery-action"
				:style="{ width: actionSize + 'rpx', height: actionSize + 'rpx', left: canvasMarginOutside + 'rpx'}">
			</view>
			<view class="str-margin-outside" :style="{ left: strMarginOutside + 'rpx' }"></view>
			<view class="img-margin-str" :style="{ left: imgMarginStr + 'rpx' }"></view>
			<view class="img-size" :style="{ width: imgWidth + 'rpx', height: imgHeight + 'rpx' }"></view>
			<template v-if="lotteryImg">
				<image class="almost-lottery__bg" mode="aspectFit" :src="lotteryBg" :style="{
            width: lotteryPxSize + 'px',
            height: lotteryPxSize + 'px'
          }"></image>
				<image :class="[
            'almost-lottery__canvas-img',
            { 'almost-lottery__canvas-img-other': !selfRotaty },
            { 'almost-lottery__canvas-img-self': selfRotated }
          ]" mode="aspectFit" :src="lotteryImg" :style="{
            width: canvasImgPxSize + 'px',
            height: canvasImgPxSize  + 'px',
            left: canvasImgToLeftPx + 'px',
            top: canvasImgToLeftPx + 'px',
            transform: `rotate(${canvasAngle + targetAngle}deg)`,
            transitionDuration: `${transitionDuration}s`
          }"></image>
			<image class="almost-lottery__action-bg" mode="aspectFit" :src="actionBg" :style="{
            width: actionPxSize + 'px',
            height: actionPxSize + 'px',
            left: actionBgToLeftPx + 'px',
            top: actionBgToLeftPx + 'px',
            transform: `rotate(${actionAngle + targetActionAngle}deg)`,
            transitionDuration: `${transitionDuration}s`
          }" @click="handleActionStart"></image>
			</template>
		</view>

		<!-- 为了兼容 app 端 ctx.measureText 所需的标签 -->
		<text class="almost-lottery__measureText" :style="{ fontSize: higtFontSize + 'px' }">{{ measureText }}</text>

		<!-- #ifdef MP-ALIPAY -->
		<canvas :class="className" :id="canvasId" :width="higtCanvasSize" :height="higtCanvasSize" :style="{
        width: higtCanvasSize + 'px',
        height: higtCanvasSize + 'px'
      }" />
		<!-- #endif -->
		<!-- #ifndef MP-ALIPAY -->
		<canvas :class="className" :canvas-id="canvasId" :width="higtCanvasSize" :height="higtCanvasSize" :style="{
        width: higtCanvasSize + 'px',
        height: higtCanvasSize + 'px'
      }" />
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		getStore,
		setStore,
		clearStore,
		circleImg,
		clacTextLen,
		downloadFile,
		pathToBase64,
		base64ToPath
	} from '@/uni_modules/almost-lottery/utils/almost-utils.js'
	export default {
		name: 'AlmostLottery',
		props: {
			// 设计稿的像素比基准值
			pixelRatio: {
				type: Number,
				default: 2
			},
			// canvas 标识
			canvasId: {
				type: String,
				default: 'almostLottery'
			},
			// 渲染延迟
			renderDelay: {
				type: Number,
				default: 0
			},
			// 抽奖转盘的整体尺寸
			lotterySize: {
				type: Number,
				default: 600
			},
			// 抽奖按钮的尺寸
			actionSize: {
				type: Number,
				default: 200
			},
			// canvas边缘距离转盘边缘的距离
			canvasMarginOutside: {
				type: Number,
				default: 60
			},
			// 奖品列表
			prizeList: {
				type: Array,
				required: true,
				validator: (value) => {
					return value.length > 1
				}
			},
			// 中奖奖品在列表中的下标
			prizeIndex: {
				type: Number,
				required: true
			},
			// 奖品区块对应背景颜色
			colors: {
				type: Array,
				default: () => [
					'#FDD188',
					'#7AA67E'
				]
			},
			// 转盘外环背景图
			lotteryBg: {
				type: String,
				default: '/uni_modules/almost-lottery/static/almost-lottery/almost-lottery__bg2x.png'
			},
			// 抽奖按钮背景图
			actionBg: {
				type: String,
				default: '/uni_modules/almost-lottery/static/almost-lottery/almost-lottery__action2x.png'
			},
			// 是否绘制奖品名称
			prizeNameDrawed: {
				type: Boolean,
				default: true
			},
			// 是否开启奖品区块描边
			stroked: {
				type: Boolean,
				default: true
			},
			// 描边颜色
			strokeColor: {
				type: String,
				default: '#1D7C5A'
			},
			// 旋转的类型
			rotateType: {
				type: String,
				default: 'roulette'
			},
			// 是否开启自转
			selfRotaty: {
				type: Boolean,
				default: false
			},
			// 自转时，最少转多少毫秒
			selfTime: {
				type: Number,
				default: 3000
			},
			// 旋转动画时间 单位s
			duration: {
				type: Number,
				default: 8
			},
			// 旋转的圈数
			ringCount: {
				type: Number,
				default: 20
			},
			// 指针位置
			pointerPosition: {
				type: String,
				default: 'edge',
				validator: (value) => {
					return value === 'edge' || value === 'middle'
				}
			},
			// 文字方向
			strDirection: {
				type: String,
				default: 'horizontal',
				validator: (value) => {
					return value === 'horizontal' || value === 'vertical'
				}
			},
			// 字体颜色
			strFontColors: {
				type: Array,
				default: () => [
					'#2E743D',
					'#FCF4C6'
				]
			},
			// 文字的大小
			strFontSize: {
				type: Number,
				default: 18
			},
			// 奖品文字距离边缘的距离
			strMarginOutside: {
				type: Number,
				default: 30
			},
			// 奖品图片距离奖品文字的距离
			imgMarginStr: {
				type: Number,
				default: 30
			},
			// 奖品文字多行情况下的行高
			strLineHeight: {
				type: Number,
				default: 1.2
			},
			// 奖品文字总长度限制
			strMaxLen: {
				type: Number,
				default: 30
			},
			// 奖品文字多行情况下第一行文字长度
			strLineLen: {
				type: Number,
				default: 14
			},
			// 奖品图片的宽
			imgWidth: {
				type: Number,
				default: 80
			},
			// 奖品图片的高
			imgHeight: {
				type: Number,
				default: 80
			},
			// 是否绘制奖品图片
			imgDrawed: {
				type: Boolean,
				default: true
			},
			// 奖品图片是否裁切为圆形
			imgCircled: {
				type: Boolean,
				default: false
			},
			// 转盘绘制成功的提示
			successMsg: {
				type: String,
				default: '奖品准备就绪，快来参与抽奖吧'
			},
			// 转盘绘制失败的提示
			failMsg: {
				type: String,
				default: '奖品仍在准备中，请稍后再来...'
			},
			// 是否开启画板的缓存
			canvasCached: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 画板className
				className: 'almost-lottery__canvas',
				// 高清固定 2 倍，不再从 system 中动态获取，因为 h5、app-vue 中单个尺寸过大时存在 iOS/Safari 无法绘制的问题，且 2 倍基本也可以解决模糊的问题
				systemPixelRatio: 2,
				// 抽奖转盘的整体px尺寸
				lotteryPxSize: 0,
				// 画板的px尺寸
				canvasImgPxSize: 0,
				// 抽奖按钮的px尺寸
				actionPxSize: 0,
				// 奖品文字距离转盘边缘的距离
				strMarginPxOutside: 0,
				// 奖品图片相对奖品文字的距离
				imgMarginPxStr: 0,
				// 奖品图片的宽、高
				imgPxWidth: 0,
				imgPxHeight: 0,
				// 画板导出的图片
				lotteryImg: '',
				// 旋转到奖品目标需要的角度
				targetAngle: 0,
				targetActionAngle: 0,
				// 配合自转使用
				selfRotated: false,
				selfRotatyStartTime: null,
				// 是否正在旋转
				isRotate: false,
				// 当前停留在那个奖品的序号
				stayIndex: 0,
				// 当前中奖奖品的序号
				targetIndex: 0,
				// 是否存在可用的缓存转盘图
				isCacheImg: false,
				oldLotteryImg: '',
				// 解决 app 不支持 measureText 的问题
				// app 已在 2.9.3 的版本中提供了对 measureText 的支持，将在后续版本逐渐稳定后移除相关兼容代码
				measureText: ''
			}
		},
		computed: {
			// 高清尺寸
			higtCanvasSize() {
				return this.canvasImgPxSize * this.systemPixelRatio
			},
			// 高清字体
			higtFontSize() {
				return Math.round(this.strFontSize / this.pixelRatio) * this.systemPixelRatio
			},
			// 高清行高
			higtHeightMultiple() {
				return Math.round(this.strFontSize / this.pixelRatio) * this.strLineHeight * this.systemPixelRatio
			},
			canvasImgToLeftPx() {
				return (this.lotteryPxSize - this.canvasImgPxSize) / 2
			},
			actionBgToLeftPx() {
				return (this.lotteryPxSize - this.actionPxSize) / 2
			},
			// 根据奖品列表计算 canvas 旋转角度
			canvasAngle() {
				let result = 0

				let prizeCount = this.prizeList.length
				let prizeClip = 360 / prizeCount
				let diffNum = 90 / prizeClip
				if (this.pointerPosition === 'edge' || this.rotateType === 'pointer') {
					result = -(prizeClip * diffNum)
				} else {
					result = -(prizeClip * diffNum + prizeClip / 2)
				}
				return result
			},
			actionAngle() {
				return 0
			},
			// 外圆的半径
			outsideRadius() {
				return this.higtCanvasSize / 2
			},
			// 内圆的半径
			insideRadius() {
				return 20 * this.systemPixelRatio
			},
			// 文字距离边缘的距离
			textRadius() {
				return this.strMarginPxOutside * this.systemPixelRatio || (this.higtFontSize / 2)
			},
			// 根据画板的宽度计算奖品文字与中心点的距离
			textDistance() {
				const textZeroY = Math.round(this.outsideRadius - (this.insideRadius / 2))
				return textZeroY - this.textRadius
			},
			// 旋转动画时间 单位 s
			transitionDuration() {
				return this.selfRotaty ? 2 : this.duration
			}
		},
		watch: {
			// 监听获奖序号的变动
			prizeIndex(newVal, oldVal) {
				if (newVal > -1) {
					if (this.selfRotaty) {
						const diffTime = Date.now() - this.selfRotatyStartTime
						const timeDelay = diffTime < this.selfTime ? this.selfTime : 0
						setTimeout(() => {
							this.selfRotated = false
							this.targetIndex = newVal
							this.onRotateStart()
						}, timeDelay)
					} else {
						setTimeout(() => {
							this.targetIndex = newVal
							this.onRotateStart()
						}, 0)
					}
				} else {
					// console.info('旋转结束，prizeIndex 已重置')
				}
			}
		},
		methods: {
			// 开始旋转
			onRotateStart() {
				// 奖品总数
				if (!this.selfRotaty) {
					if (this.isRotate) return
					this.isRotate = true
				}

				let prizeCount = this.prizeList.length
				let baseAngle = 360 / prizeCount
				let angles = 0

				let ringCount = this.selfRotaty ? 1 : this.ringCount

				if (this.rotateType === 'pointer') {
					if (this.targetActionAngle === 0) {
						// 第一次旋转
						angles = (this.targetIndex - this.stayIndex) * baseAngle + baseAngle / 2 - this.actionAngle
					} else {
						// 后续旋转
						// 后续继续旋转 就只需要计算停留的位置与目标位置的角度
						angles = (this.targetIndex - this.stayIndex) * baseAngle
					}

					// 更新目前序号
					this.stayIndex = this.targetIndex
					// 转 8 圈，圈数越多，转的越快
					this.targetActionAngle += angles + 360 * ringCount
					// console.log('targetActionAngle', this.targetActionAngle)
				} else {
					if (this.targetAngle === 0) {
						// 第一次旋转
						// 因为第一个奖品是从0°开始的，即水平向右方向
						// 第一次旋转角度 = 270度 - (停留的序号-目标序号) * 每个奖品区间角度 - 每个奖品区间角度的一半 - canvas自身旋转的度数
						angles = (270 - (this.targetIndex - this.stayIndex) * baseAngle - baseAngle / 2) - this.canvasAngle
					} else {
						// 后续旋转
						// 后续继续旋转 就只需要计算停留的位置与目标位置的角度
						angles = -(this.targetIndex - this.stayIndex) * baseAngle
					}

					// 更新目前序号
					this.stayIndex = this.targetIndex
					// 转 8 圈，圈数越多，转的越快
					this.targetAngle += angles + 360 * ringCount
				}

				// 计算转盘结束的时间，预加一些延迟确保转盘停止后触发结束事件
				let endTime = this.selfRotaty ? 0 : (this.transitionDuration * 1000 + 100)
				let endTimer = setTimeout(() => {
					clearTimeout(endTimer)
					endTimer = null

					this.isRotate = false
					this.$emit('draw-end')
				}, endTime)

				let resetPrizeTimer = setTimeout(() => {
					clearTimeout(resetPrizeTimer)
					resetPrizeTimer = null

					// 每次抽奖结束后都要重置父级组件的 prizeIndex
					this.$emit('reset-index')
				}, endTime + 50)
			},
			// 点击 开始抽奖 按钮
			handleActionStart() {
				if (!this.lotteryImg) return
				if (this.isRotate) return
				this.$emit('draw-start')
			},
			// 渲染转盘
			async onCreateCanvas() {
				// 获取 canvas 画布
				const canvasId = this.canvasId
				const ctx = uni.createCanvasContext(canvasId, this)

				// canvas 的宽高
				let canvasW = this.higtCanvasSize
				let canvasH = this.higtCanvasSize

				// 根据奖品个数计算 角度
				let prizeCount = this.prizeList.length
				let baseAngle = Math.PI * 2 / prizeCount

				// 设置字体
				ctx.setFontSize(this.higtFontSize)

				// 注意，开始画的位置是从0°角的位置开始画的。也就是水平向右的方向。
				// 画具体内容
				for (let i = 0; i < prizeCount; i++) {
					let prizeItem = this.prizeList[i]
					// 当前角度
					let angle = i * baseAngle

					// 保存当前画布的状态
					ctx.save()

					// x => 圆弧对应的圆心横坐标 x
					// y => 圆弧对应的圆心横坐标 y
					// radius => 圆弧的半径大小
					// startAngle => 圆弧开始的角度，单位是弧度
					// endAngle => 圆弧结束的角度，单位是弧度
					// anticlockwise(可选) => 绘制方向，true 为逆时针，false 为顺时针

					ctx.beginPath()
					// 外圆
					ctx.arc(canvasW * 0.5, canvasH * 0.5, this.outsideRadius, angle, angle + baseAngle, false)
					// 内圆
					ctx.arc(canvasW * 0.5, canvasH * 0.5, this.insideRadius, angle + baseAngle, angle, true)
					// 每个奖品区块背景填充颜色
					if (this.colors.length === 2) {
						ctx.setFillStyle(this.colors[i % 2])
					} else {
						ctx.setFillStyle(this.colors[i])
					}
					// 填充颜色
					ctx.fill()

					// 开启描边
					if (this.stroked) {
						//设置边框大小
						ctx.lineWidth = 5;
						// 设置描边颜色
						ctx.setStrokeStyle(`${this.strokeColor}`)
						// 描边
						ctx.stroke()
					}

					// 开始绘制奖品内容
					// 重新映射画布上的 (0,0) 位置
					let translateX = canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * this.textDistance
					let translateY = canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * this.textDistance
					ctx.translate(translateX, translateY)

					// 绘制奖品名称
					let rewardName = this.strLimit(prizeItem.prizeName)
					
					// 设置文字颜色
					if (this.strFontColors.length === 1) {
						ctx.setFillStyle(this.strFontColors[0])
					} else if (this.strFontColors.length === 2) {
						ctx.setFillStyle(this.strFontColors[i % 2])
					} else {
						ctx.setFillStyle(this.strFontColors[i])
					}

					// rotate方法旋转当前的绘图，因为文字是和当前扇形中心线垂直的
					ctx.rotate(angle + (baseAngle / 2) + (Math.PI / 2))

					// 设置文本位置并处理换行
					if (this.strDirection === 'horizontal') {
						// 是否需要换行
						if (rewardName && this.prizeNameDrawed) {
							let realLen = clacTextLen(rewardName).realLen
							let isLineBreak = realLen > this.strLineLen
							if (isLineBreak) {
								// 获得多行文本数组
								let textCount = 0
								let tempTxt = ''
								let rewardNames = []
								for (let j = 0; j < rewardName.length; j++) {
									textCount += clacTextLen(rewardName[j]).byteLen
									tempTxt += rewardName[j]

									if (textCount >= (this.strLineLen * 2)) {
										rewardNames.push(tempTxt)
										textCount = 0
										tempTxt = ''
									} else {
										if ((rewardName.length - 1) === j) {
											rewardNames.push(tempTxt)
											textCount = 0
											tempTxt = ''
										}
									}
								}

								// 循环文本数组，计算每一行的文本宽度
								for (let j = 0; j < rewardNames.length; j++) {
									if (ctx.measureText && ctx.measureText(rewardNames[j]).width > 0) {
										// 文本的宽度信息
										let tempStrSize = ctx.measureText(rewardNames[j])
										let tempStrWidth = -(tempStrSize.width / 2).toFixed(2)
										ctx.fillText(rewardNames[j], tempStrWidth, j * this.higtHeightMultiple)
									} else {
										this.measureText = rewardNames[j]

										// 等待页面重新渲染
										await this.$nextTick()

										let textWidth = await this.getTextWidth()
										let tempStrWidth = -(textWidth / 2).toFixed(2)
										ctx.fillText(rewardNames[j], tempStrWidth, j * this.higtHeightMultiple)
										// console.log(rewardNames[j], textWidth, j)
									}
								}
							} else {
								if (ctx.measureText && ctx.measureText(rewardName).width > 0) {
									// 文本的宽度信息
									let tempStrSize = ctx.measureText(rewardName)
									let tempStrWidth = -(tempStrSize.width / 2).toFixed(2)
									ctx.fillText(rewardName, tempStrWidth, 0)
								} else {
									this.measureText = rewardName

									// 等待页面重新渲染
									await this.$nextTick()

									let textWidth = await this.getTextWidth()
									let tempStrWidth = -(textWidth / 2).toFixed(2)
									ctx.fillText(rewardName, tempStrWidth, 0)
								}
							}
						}
					} else {
						let rewardNames = rewardName.split('')
						for (let j = 0; j < rewardNames.length; j++) {
							if (ctx.measureText && ctx.measureText(rewardNames[j]).width > 0) {
								// 文本的宽度信息
								let tempStrSize = ctx.measureText(rewardNames[j])
								let tempStrWidth = -(tempStrSize.width / 2).toFixed(2)
								ctx.fillText(rewardNames[j], tempStrWidth, j * this.higtHeightMultiple)
							} else {
								this.measureText = rewardNames[j]

								// 等待页面重新渲染
								await this.$nextTick()

								let textWidth = await this.getTextWidth()
								let tempStrWidth = -(textWidth / 2).toFixed(2)
								ctx.fillText(rewardNames[j], tempStrWidth, j * this.higtHeightMultiple)
								// console.log(rewardNames[j], textWidth, i)
							}
						}
					}


					// 绘制奖品图片，文字竖向展示时，不支持图片展示
					if (this.imgDrawed && prizeItem.prizeImage && this.strDirection !== 'vertical') {
						// App-Android平台 系统 webview 更新到 Chrome84+ 后 canvas 组件绘制本地图像 uni.canvasToTempFilePath 会报错
						// 统一将图片处理成 base64
						// https://ask.dcloud.net.cn/question/103303
						let reg = /^(https|http)/g
						// 处理远程图片
						if (reg.test(prizeItem.prizeImage)) {
							let platformTips = ''
							// #ifdef APP-PLUS
							platformTips = ''
							// #endif
							// #ifdef MP
							platformTips = '需要处理好下载域名的白名单问题，'
							// #endif
							// #ifdef H5
							platformTips = '需要处理好跨域问题，'
							// #endif
							// console.warn(`###当前数据列表中的奖品图片为网络图片，${platformTips}开始尝试下载图片...###`)
							let res = await downloadFile(prizeItem.prizeImage)
							// console.log('处理远程图片', res)
							if (res.ok) {
								let tempFilePath = res.tempFilePath
								// #ifndef MP
								prizeItem.prizeImage = await pathToBase64(tempFilePath)
								// #endif
								// #ifdef MP
								prizeItem.prizeImage = tempFilePath
								// #endif
							} else {
								this.handlePrizeImgSuc({
									ok: false,
									data: res.data,
									msg: res.msg
								})
							}
						} else {
							// #ifndef MP
							// 不是小程序环境，把本地图片处理成 base64
							if (prizeItem.prizeImage.indexOf(';base64,') === -1) {
								console.log('开始处理本地图片', prizeItem.prizeImage)
								prizeItem.prizeImage = await pathToBase64(prizeItem.prizeImage)
								console.log('处理本地图片结束', prizeItem.prizeImage)
							}
							// #endif

							// #ifdef MP-WEIXIN
							// 小程序环境，把 base64 处理成小程序的本地临时路径
							if (prizeItem.prizeImage.indexOf(';base64,') !== -1) {
								console.log('开始处理BASE64图片', prizeItem.prizeImage)
								prizeItem.prizeImage = await base64ToPath(prizeItem.prizeImage)
								console.log('处理BASE64图片完成', prizeItem.prizeImage)
							}
							// #endif
						}

						let prizeImageX = -(this.imgPxWidth * this.systemPixelRatio / 2)
						let prizeImageY = this.imgMarginPxStr * this.systemPixelRatio
						let prizeImageW = this.imgPxWidth * this.systemPixelRatio
						let prizeImageH = this.imgPxHeight * this.systemPixelRatio
						if (this.imgCircled) {
							// 重新设置每个圆形的背景色
							if (this.colors.length === 2) {
								ctx.setFillStyle(this.colors[i % 2])
							} else {
								ctx.setFillStyle(this.colors[i])
							}
							circleImg(ctx, prizeItem.prizeImage, prizeImageX, prizeImageY, prizeImageW, prizeImageH)
						} else {
							ctx.drawImage(prizeItem.prizeImage, prizeImageX, prizeImageY, prizeImageW, prizeImageH)
						}
					}

					ctx.restore()
				}

				// 保存绘图并导出图片
				ctx.draw(true, () => {
					let drawTimer = setTimeout(() => {
						clearTimeout(drawTimer)
						drawTimer = null

						// #ifdef MP-ALIPAY
						ctx.toTempFilePath({
							destWidth: this.higtCanvasSize,
							destHeight: this.higtCanvasSize,
							success: (res) => {
								// console.log(res.apFilePath)
								this.handlePrizeImg({
									ok: true,
									data: res.apFilePath,
									msg: '画布导出生成图片成功'
								})
							},
							fail: (err) => {
								this.handlePrizeImg({
									ok: false,
									data: err,
									msg: '画布导出生成图片失败'
								})
							}
						})
						// #endif

						// #ifndef MP-ALIPAY
						uni.canvasToTempFilePath({
							canvasId: this.canvasId,
							destWidth: this.higtCanvasSize,
							destHeight: this.higtCanvasSize,
							success: (res) => {
								// 在 H5 平台下，tempFilePath 为 base64
								// console.log(res.tempFilePath)
								this.handlePrizeImg({
									ok: true,
									data: res.tempFilePath,
									msg: '画布导出生成图片成功'
								})
							},
							fail: (err) => {
								this.handlePrizeImg({
									ok: false,
									data: err,
									msg: '画布导出生成图片失败'
								})
							}
						}, this)
						// #endif
					}, 500)
				})
			},
			// 处理导出的图片
			handlePrizeImg(res) {
				if (res.ok) {
					let data = res.data
					if (!this.canvasCached) {
						this.lotteryImg = data
						this.handlePrizeImgSuc(res)
						return
					}

					// #ifndef H5
					if (this.isCacheImg) {
						uni.getSavedFileList({
							success: (sucRes) => {
								let fileList = sucRes.fileList
								// console.log('getSavedFileList Cached', fileList)

								let cached = false

								if (fileList.length) {
									for (let i = 0; i < fileList.length; i++) {
										let item = fileList[i]
										if (item.filePath === data) {
											cached = true
											this.lotteryImg = data

											// console.info('经查，本地缓存中存在的转盘图可用，本次将不再绘制转盘')
											this.handlePrizeImgSuc(res)
											break
										}
									}
								}

								if (!cached) {
									// console.info('经查，本地缓存中存在的转盘图不可用，需要重新初始化转盘绘制')
									this.initCanvasDraw()
								}
							},
							fail: (err) => {
								this.initCanvasDraw()
							}
						})
					} else {
						uni.saveFile({
							tempFilePath: data,
							success: (sucRes) => {
								let filePath = sucRes.savedFilePath
								// console.log('saveFile', filePath)
								setStore(`${this.canvasId}LotteryImg`, filePath)
								this.lotteryImg = filePath
								this.handlePrizeImgSuc({
									ok: true,
									data: filePath,
									msg: '画布导出生成图片成功'
								})
							},
							fail: (err) => {
								this.handlePrizeImg({
									ok: false,
									data: err,
									msg: '画布导出生成图片失败'
								})
							}
						})
					}
					// #endif
					// #ifdef H5
					setStore(`${this.canvasId}LotteryImg`, data)
					this.lotteryImg = data
					this.handlePrizeImgSuc(res)

					// console info
					let consoleText = this.isCacheImg ? '缓存' : '导出'
					// console.info(`当前为 H5 端，使用${consoleText}中的 base64 图`)
					// #endif
				} else {
					console.error(res.msg, res)
					// #ifdef H5
					console.error('###当前为 H5 端，下载网络图片需要后端配置允许跨域###')
					// #endif
					// #ifdef MP
					console.error('###当前为小程序端，下载网络图片需要配置域名白名单###')
					// #endif
				}
			},
			// 处理图片完成
			handlePrizeImgSuc(res) {
				this.$emit('finish', {
					ok: res.ok,
					data: res.data,
					msg: res.ok ? this.successMsg : this.failMsg
				})
			},
			// 兼容 app 端不支持 ctx.measureText
			// 已知问题：初始绘制时，低端安卓机 平均耗时 2s
			// hbx 2.8.12+ 已在 app 端支持
			getTextWidth() {
				console.warn('正在采用兼容方式获取文本的 size 信息')
				let query = uni.createSelectorQuery().in(this)
				let nodesRef = query.select('.almost-lottery__measureText')
				return new Promise((resolve, reject) => {
					nodesRef.fields({
						size: true,
					}, (res) => {
						resolve(res.width)
					}).exec()
				})
			},
			// 处理文字溢出
			strLimit(value) {
				let maxLength = this.strMaxLen
				if (!value || !maxLength) return value
				return clacTextLen(value).realLen > maxLength ? value.slice(0, maxLength - 1) + '..' : value
			},
			// 检查本地缓存中是否存在转盘图
			checkCacheImg() {
				// console.log('检查本地缓存中是否存在转盘图')
				// 检查是否已有缓存的转盘图
				// 检查是否与本次奖品数据相同
				this.oldLotteryImg = getStore(`${this.canvasId}LotteryImg`)
				let oldPrizeList = getStore(`${this.canvasId}PrizeList`)
				let newPrizeList = JSON.stringify(this.prizeList)
				if (this.oldLotteryImg) {
					// console.log(`经查，本地缓存中存在转盘图 => ${this.oldLotteryImg}，继续判断这张缓存图是否可用`)
					if (oldPrizeList === newPrizeList) {
						this.isCacheImg = true
						this.handlePrizeImg({
							ok: true,
							data: this.oldLotteryImg,
							msg: '画布导出生成图片成功'
						})
						return
					}
				}

				this.initCanvasDraw()
			},
			// 初始化绘制
			initCanvasDraw() {
				console.log('开始初始化转盘绘制')
				this.isCacheImg = false
				this.lotteryImg = ''
				clearStore(`${this.canvasId}LotteryImg`)
				setStore(`${this.canvasId}PrizeList`, this.prizeList)
				this.onCreateCanvas()
			},
			// 预处理初始化
			async beforeInit() {
				let query = uni.createSelectorQuery().in(this)
				// 处理 rpx 自适应尺寸
				let lotterySize = await new Promise((resolve) => {
					query.select('.almost-lottery__wrap').boundingClientRect((rects) => {
						resolve(rects)
						// console.log('处理 lottery rpx 的自适应', rects)
					}).exec()
				})
				let actionSize = await new Promise((resolve) => {
					query.select('.lottery-action').boundingClientRect((rects) => {
						resolve(rects)
						// console.log('处理 action rpx 的自适应', rects)
					}).exec()
				})
				let strMarginSize = await new Promise((resolve) => {
					query.select('.str-margin-outside').boundingClientRect((rects) => {
						resolve(rects)
						// console.log('处理 str-margin-outside rpx 的自适应', rects)
					}).exec()
				})
				let imgMarginStr = await new Promise((resolve) => {
					query.select('.img-margin-str').boundingClientRect((rects) => {
						resolve(rects)
						// console.log('处理 img-margin-str rpx 的自适应', rects)
					}).exec()
				})
				let imgSize = await new Promise((resolve) => {
					query.select('.img-size').boundingClientRect((rects) => {
						resolve(rects)
						// console.log('处理 img-size rpx 的自适应', rects)
					}).exec()
				})

				this.lotteryPxSize = Math.floor(lotterySize.width)
				this.canvasImgPxSize = this.lotteryPxSize - Math.floor(actionSize.left) + Math.floor(lotterySize.left)
				this.actionPxSize = Math.floor(actionSize.width)

				this.strMarginPxOutside = Math.floor(strMarginSize.left) - Math.floor(lotterySize.left)
				this.imgMarginPxStr = Math.floor(imgMarginStr.left) - Math.floor(lotterySize.left)
				this.imgPxWidth = Math.floor(imgSize.width)
				this.imgPxHeight = Math.floor(imgSize.height)

				// console.log(this.lotteryPxSize, this.canvasImgPxSize, this.actionPxSize)

				let stoTimer = setTimeout(() => {
					clearTimeout(stoTimer)
					stoTimer = null

					// 判断画板是否设置缓存
					if (this.canvasCached) {
						this.checkCacheImg()
					} else {
						this.initCanvasDraw()
					}
				}, 50)
			}
		},
		mounted() {
			this.$nextTick(() => {
				let delay = 50 + this.renderDelay

				let stoTimer = setTimeout(() => {
					clearTimeout(stoTimer)
					stoTimer = null

					this.beforeInit()
				}, delay)
			})
		}
	}
</script>

<style lang="scss" scoped>
	.almost-lottery {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	// 以下元素不可见，是 canvas 的实例
	.almost-lottery__canvas {
		position: absolute;
		left: -9999px;
		opacity: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	// 以下元素不可见，用于获得自适应的值
	.lottery-action,
	.str-margin-outside,
	.img-margin-str,
	.img-size {
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		// background-color: blue;
	}

	// 以下元素不可见，用于计算文本的宽度
	.almost-lottery__measureText {
		position: absolute;
		left: 0;
		top: 0;
		white-space: nowrap;
		font-size: 12px;
		opacity: 0;
	}

	// 以下为可见内容的样式
	.almost-lottery__wrap {
		position: relative;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		// background-color: #FFFFFF;
	}

	.almost-lottery__bg,
	.almost-lottery__canvas-img,
	.almost-lottery__action-bg {
		position: absolute;
		left: 0;
		top: 0;
	}

	.almost-lottery__canvas-img-other {
		transition: transform cubic-bezier(.34, .12, .05, .95);
	}

	@keyframes selfRotate {
		0% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(180deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.almost-lottery__canvas-img-self {
		transition: transform ease-in;
		animation: selfRotate .6s linear infinite;
	}
</style>
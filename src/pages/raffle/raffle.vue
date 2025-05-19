<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="1158" src="@/static/images/raffle/raffle_head.png"></u-image>
		</view>
		<view class="raffleGroup">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#FFFFFF"
					:title-bold="true" :background="{ background: scrollTop ? '#2C4E2F' : 'transparent'}" title="REFFLE"
					title-color="#FFFFFF">
				</u-navbar>
			</u-sticky>
			<view class="raffle_title">
				<u-image width="750" height="171" src="@/static/images/raffle/raffle_title.png"></u-image>
			</view>
			<view class="raffle_lottery">
				<u-image width="449" height="108" src="@/static/images/raffle/raffle_lottery.png"></u-image>
			</view>
			<view class="almost-lottery">
				<view class="almost-lottery__wheel">
					<almost-lottery :lottery-size="lotteryConfig.lotterySize" :action-size="lotteryConfig.actionSize"
						:ring-count="2" :duration="6" :ringCount="12" :img-circled="false" :canvasCached="true"
						:prize-list="prizeList" :prize-index="prizeIndex" @reset-index="prizeIndex = -1"
						@draw-start="handleDrawStart" @draw-end="handleDrawEnd" @finish="handleDrawFinish"
						v-if="prizeList.length" />
				</view>
			</view>
			<view class="raffle_wheel">
				<view class="raffle_line">
					<u-image width="750" height="112" src="@/static/images/raffle/raffle_line.png"></u-image>
				</view>
				<view class="raffle_freeNum">
					<u-image width="520" height="192" src="@/static/images/raffle/raffle_freeNum.png"></u-image>
					<view class="freeNum">
						Jumlah undian: <text class="freeNum_text">{{freeNumDay}}</text>
					</view>
				</view>
			</view>
			<view class="raffle_pengguna">
				<u-image width="529" height="47" src="@/static/images/raffle/raffle_pengguna.png"></u-image>
			</view>
			<view class="raffle_card">
				<u-image width="714" height="480" src="@/static/images/raffle/raffle_card.png"></u-image>
				<view class="raffle_list">
					<view class="list_box">
						<mergedScroll v-if="lampArr.length" :list="lampArr"></mergedScroll>
					</view>
					<view class="list_btn">
						<u-image @tap="prizeEvent" width="231" height="116"
							src="@/static/images/raffle/raffle_btn01.png"></u-image>
						<u-image @tap="navigateTo('/pages/invite/invite')" width="316" height="116"
							src="@/static/images/raffle/raffle_btn02.png"></u-image>
					</view>
				</view>
			</view>
			<view class="raffle_rule" @tap="introShow = true">
				<view class="rule_text">Peraturan</view>
				<u-image width="26" height="28" src="@/static/images/raffle/raffle_icon.png"></u-image>
			</view>
			<view class="bottom_Group">
				<u-image width="750" height="177" src="@/static/images/raffle/raffle_foot.png"></u-image>
			</view>
		</view>
		<introPopup v-if="introShow" :parseContent="parseContent" @cancel="introShow = false"></introPopup>
		<prizePopup v-if="prizeShow" :prizeValue="prizeValue" @confirm="prizeConfirm" @cancel="prizeCancle">
		</prizePopup>
		<logPopup v-if="logArrShow" @confirm="logService" @cancle="logArrShow = false"></logPopup>
		<toastPopup></toastPopup>
	</view>
</template>
<script lang="ts" setup>
	import { ref, nextTick } from 'vue';
	import { emitter } from '@/utils/emitter';
	import { clearCacheFile, clearStore } from '@/utils/util'
	import { onLoad, onShow, onUnload, onPageScroll } from '@dcloudio/uni-app';
	import { lotteryInfo, lotteryPlay, lotteryLuckUser, lotteryNotice } from '@/api/raffle'
	import introPopup from './components/introPopup.vue'
	import prizePopup from './components/prizePopup.vue'
	import logPopup from './components/logPopup.vue'
	import mergedScroll from './components/mergedScroll.vue'
	interface lotteryConfigRes {
		lotterySize : number // 抽奖转盘的整体尺寸，单位rpx
		actionSize : number  // 抽奖按钮的尺寸，单位rpx
	}
	const scrollTop = ref<number>(0)
	const introShow = ref<boolean>(false)
	const prizeShow = ref<boolean>(false)
	const parseContent = ref<string>('')
	const logArrShow = ref<boolean>(false)
	const lampArr = ref<any>([])
	const lotteryConfig = ref<lotteryConfigRes>({
		lotterySize: 600,
		actionSize: 150
	})
	const prizeValue = ref<any>({})
	// 奖品配置数据
	const lotteryBg = ref<string>('') // 转盘外环图
	const actionBg = ref<string>('') // 抽奖按钮图
	const prizeList = ref<any>([]) // 奖品数据
	const prizeIndex = ref<number>(-1) // 中奖下标
	const prizeing = ref<boolean>(false) // 是否正在抽奖中，避免重复触发
	//中奖概率配置数据
	const onFrontend = ref<boolean>(false) // 是否由前端控制概率，默认不开启，强烈建议由后端控制
	const prizeWeightMax = ref<number>(0) // 权重随机数的最大值
	const prizeWeightArr = ref<any>([]) // 权重数组
	//业务需求示例数据
	const freeNumDay = ref<number>(0) // 抽奖次数
	const stopTimer = ref<any>(null)
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const prizeConfirm = () => {
		prizeing.value = false
		prizeShow.value = false
		prizeEvent()
	}
	const prizeCancle = () => {
		prizeing.value = false
		prizeShow.value = false
	}
	const prizeEvent = () => {
		emitter.emit('gifType', { type: 1})
		logArrShow.value = true
	}
	const getluckUser = async () => {
		const data = await lotteryLuckUser()
		lampArr.value = data
	}
	const getlotteryNotice = async () => {
		const data = await lotteryNotice()
		parseContent.value = data.intro
	}
	//  获取中奖配置接口
	const requestApiGetPrizeList = async () => {
		const resdata = await lotteryInfo()
		if (resdata.code == 1) {
			freeNumDay.value = resdata.data.draws_count
			let list = resdata.data.prizes
			let prizes = list.map((item : any) => ({
				prizeId: item.id,	//奖品对应
				prizeName: item.name,	//奖品名称
				prizeWeight: 0, //奖品权重
				prizeImage: item.pic	//奖品图片地址，网络图片仅支持http和https协议
			}))
			return prizes
		} else {
			toast(resdata.msg)
		}
	}
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const logService = () => {
		navigateTo('/pages/customer_service/customer_service')
	}
	//获取奖品数据后处理
	const getPrizeListAsync = async () => {
		//等待接口返回的数据进一步处理
		const prizes = await requestApiGetPrizeList();
		if (prizes) {
			prizeList.value = prizes
			// 如果开启了前端控制概率
			// 得出权重的最大值并生成权重数组
			if (onFrontend.value) {
				// 生成权重数组并排序取得最大值
				prizeWeightArr.value = prizeList.value.map((item : any) => item.prizeWeight)
				let prizeWeightArrSort = [...prizeWeightArr.value]
				prizeWeightArrSort.sort((a, b) => b - a)

				// 开放自定义权重最大值，没有自定义则取权重数组中的最大值
				prizeWeightMax.value = prizeWeightMax.value > 0 ? prizeWeightMax.value : prizeWeightArrSort[0]
			}
		} else {
			console.log('获取奖品失败')
		}
	}
	// 获取奖品数据
	const getPrizeList = () => {
		emitter.emit('gifType', { type: 1 })
		getPrizeListAsync()
	}
	// 本地获取中奖下标
	const localGetPrizeIndex = () => {
		// 前端控制概率的情况下，需要拿到最接近随机权重且大于随机权重的值
		// 后端控制概率的情况下，通常会直接返回 prizeId
		if (!prizeWeightMax.value || !prizeWeightArr.value.length) {
			console.warn('###当前已开启前端控制中奖概率，但是奖品数据列表中的 prizeWeight 参数似乎配置不正确###')
			return
		}
		console.log('当前权重最大值为 =>', prizeWeightMax.value)

		// 注意这里使用了 Math.ceil，如果某个权重的值为 0，则始终无法中奖
		let randomWeight = Math.ceil(Math.random() * prizeWeightMax.value)
		console.log('本次权重随机数 =>', randomWeight)

		// 生成大于等于随机权重的数组
		let tempMaxArrs : any = []
		prizeList.value.forEach((item : any) => {
			if (item.prizeWeight >= randomWeight) {
				tempMaxArrs.push(item.prizeWeight)
			}
		})
		console.log('tempMaxArrs', tempMaxArrs)

		// 如果大于随机权重的数组有值，先对这个数组排序然后取值
		// 反之新建一个临时的包含所有权重的已排序数组，然后取值
		let tempMaxArrsLen = tempMaxArrs.length
		if (tempMaxArrsLen) {
			tempMaxArrs.sort((a : any, b : any) => a - b)
			// 取值时，如果存在多个值，分两种情况
			if (tempMaxArrsLen > 1) {
				// 检查是否存在重复的值
				let sameCount = 0
				for (let i = 0; i < tempMaxArrs.length; i++) {
					if (tempMaxArrs[i] === tempMaxArrs[0]) {
						sameCount++
					}
				}

				// 值不相等的情况下取最接近的值，也就是第1个值
				if (sameCount === 1) {
					prizeIndex.value = prizeWeightArr.value.indexOf(tempMaxArrs[0])
				} else {
					// 存在值相等时，随机取值，当然这里你可以自己决定是否随机取值
					let sameWeight = tempMaxArrs[0]
					let sameWeightArr : any = []
					let sameWeightItem = {
						prizeWeight: 0,
						idx: 0
					}
					prizeWeightArr.value.forEach((item : any, index : number) => {
						if (item === sameWeight) {
							sameWeightArr.push({
								prizeWeight: item,
								idx: index
							})
						}
					})
					// console.log('sameWeightArr', sameWeightArr)
					sameWeightItem = sameWeightArr[Math.floor(Math.random() * sameWeightArr.length)]
					console.log('sameWeightItem', sameWeightItem)
					prizeIndex.value = sameWeightItem ? sameWeightItem.idx : 0
				}
			} else {
				prizeIndex.value = prizeWeightArr.value.indexOf(tempMaxArrs[0])
			}
		}

		// console.log('本次抽中奖品 =>', prizeList.value[prizeIndex.value].prizeName)
	}

	// 远程请求接口获取中奖下标
	const remoteGetPrizeIndex = async () => {
		const resdata = await lotteryPlay()
		// 模拟请求接口获取中奖信息
		stopTimer.value = setTimeout(() => {
			stopTimer.value = null

			let list = [...prizeList.value]
			// 拿到后端返回的 prizeId 后，开始循环比对得出那个中奖的数据
			for (let i = 0; i < list.length; i++) {
				let item = list[i]
				if (item.prizeId === resdata.prize.id) {
					// 中奖下标
					prizeIndex.value = i
					break
				}
			}
		}, 200)
	}
	// 本次抽奖开始
	const handleDrawStart = () => {
		if (!freeNumDay.value) return toast('🎁 Kesempatan undian habis! Undang 2 pengguna terdaftar untuk mendapatkan 1 kesempatan undian lagi!')
		if (prizeing.value) return
		prizeing.value = true
		if (freeNumDay.value) {
			freeNumDay.value--
			tryLotteryDraw()
			prizeing.value = false
		} else {
			prizeing.value = false
		}
	}
	// 尝试发起抽奖
	const tryLotteryDraw = () => {
		// 判断是否由前端控制概率
		if (onFrontend.value) {
			localGetPrizeIndex()
		} else {
			remoteGetPrizeIndex()
		}
	}
	// 本次抽奖结束
	const handleDrawEnd = () => {
		console.log('旋转结束，执行拿到结果后到逻辑')
		// 旋转结束后，开始处理拿到结果后的逻辑
		prizeValue.value = prizeList.value[prizeIndex.value]
		prizeShow.value = true
	}
	// 抽奖转盘绘制完成
	const handleDrawFinish = (res : any) => {
		// console.log('抽奖转盘绘制完成', res)
		stopTimer.value = setTimeout(() => {
			clearTimeout(stopTimer.value)
			stopTimer.value = null
		}, 50)
	}

	const handleInitCanvas = () => {
		clearCacheFile()
		uni.removeStorageSync('almostLotteryLotteryImg')
		uni.removeStorageSync('almostLotteryPrizeList')
		prizeList.value = []
	}
	onShow(() => {
		getluckUser()
		getlotteryNotice()
		nextTick(() => {
			getPrizeList()
		})
	})
	onUnload(() => {
		handleInitCanvas()
	})
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page {
		background: #2C4E2F;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.raffleGroup {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 88;

			.raffle_title {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 100rpx;
			}

			.raffle_lottery {
				position: relative;
				top: 75rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 99;
			}

			.almost-lottery {
				display: flex;
				justify-content: center;
				align-items: center;

				.almost-lottery__wheel {
					text-align: center;
					z-index: 88;

					.almost-lottery__count {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						text-align: center;
						padding: 40rpx 0;
					}

					.text {
						background: linear-gradient(90deg, #F7CE9E 0%, #D69C63 100%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
						font-size: 28rpx;
						font-weight: bold;
					}
				}
			}

			.raffle_wheel {
				position: relative;
				top: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 200rpx;
				z-index: 77;

				.raffle_line {
					position: absolute;
					top: 60rpx;
					z-index: 40;
				}

				.raffle_freeNum {
					position: absolute;
					top: -40rpx;
					z-index: 77;
					display: flex;
					justify-content: center;
					align-items: center;

					.freeNum {
						position: absolute;
						top: 40rpx;
						left: 50%;
						transform: translate(-50%, 0);
						font-family: Source Han Sans CN;
						font-weight: 500;
						font-size: 22rpx;
						line-height: 48rpx;
						text-align: center;
						color: #81B1A0;

						.freeNum_text {
							font-family: Source Han Sans CN;
							font-weight: 500;
							font-size: 22rpx;
							line-height: 48rpx;
							text-align: center;
							color: #FFFFFF;
						}
					}
				}
			}

			.raffle_pengguna {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 40rpx;
			}

			.raffle_card {
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;

				.raffle_list {
					position: absolute;
					top: 0;
					left: 50%;
					transform: translate(-50%, 0);
					width: 640rpx;
					padding: 30rpx;

					.list_btn {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 20rpx;
					}
				}
			}

			.raffle_rule {
				display: flex;
				justify-content: center;
				align-items: center;

				.rule_text {
					font-family: Source Han Sans CN;
					font-weight: 400;
					font-size: 28rpx;
					line-height: 48rpx;
					text-align: center;
					color: #99B49C;
				}
			}
		}
	}
</style>
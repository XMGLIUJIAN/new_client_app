<template>
	<view class="notice-container mx-[40rpx] px-[20rpx] mt-[20rpx] mb-[20rpx]">
		<view class="announcement">
			<view class="announcement_icon">
				<u-image width="60" height="60" src="@/static/images/user/notice.png" alt="" />
			</view>
			<view class="announcement_text">
				<view class="songName">
					<view class="notice-content" :style="contentStyle">
						{{ currentNotice }}
					</view>
				</view>
			</view>
			<u-icon name="arrow-right" color="#1E1E1E" size="26"></u-icon>
		</view>
	</view>
</template>

<script setup>
import {
		ref,
		computed,
		watch,
		onMounted,
		onBeforeUnmount
	} from 'vue'
	const props = defineProps({
		notice: {
			type: Array,
			default: () => []
		}
	})
	watch(
		() => props.notice,
		(value) => {
			noticeArr.value = value
		}, 
		{ deep: true }
	)
	const noticeArr = ref([])
	const currentIndex = ref(0)
	const containerWidth = ref(0)
	const contentWidth = ref(0)
	const scrollX = ref(0)
	let animationFrame = null

	const currentNotice = computed(() => noticeArr.value[currentIndex.value])

	const contentStyle = computed(() => ({
		transform: `translateX(${scrollX.value}px)`
	}))

	// 获取容器宽度
	const getContainerWidth = () => {
		return new Promise(resolve => {
			uni.createSelectorQuery()
				.select('.announcement_text')
				.boundingClientRect(rect => {
					containerWidth.value = rect ? rect.width : 0
					resolve()
				}).exec()
		})
	}

	// 获取内容宽度
	const getContentWidth = () => {
		return new Promise(resolve => {
			uni.createSelectorQuery()
				.select('.notice-content')
				.boundingClientRect(rect => {
					contentWidth.value = rect ? rect.width : 0
					resolve()
				}).exec()
		})
	}
	const cancelAnimationFrame = (animationFrame) => {
		animationFrame = null
	}
	// 滚动动画
	const startScroll = async () => {
		// 停止当前动画
		if (animationFrame) {
			cancelAnimationFrame(animationFrame)
		}

		// 初始化位置
		scrollX.value = containerWidth.value
		await getContentWidth()

		const startPosition = containerWidth.value // 初始位置（右侧外部
		const endPosition = -contentWidth.value// 结束位置（左侧外部）
		const totalDistance = startPosition - endPosition
		const speed = 40 // 像素/秒
		const duration = (totalDistance / speed) * 1000 // 总持续时间（毫秒）

		let startTime = null

		const animate = timestamp => {
			if (!startTime) startTime = timestamp
			const progress = timestamp - startTime

			// 计算当前滚动位置
			scrollX.value = startPosition - (totalDistance * (progress / duration))

			if (progress < duration) {
				animationFrame = requestAnimationFrame(animate)
			} else {
				// 滚动完成，切换到下一条
				switchToNextNotice()
			}
		}

		animationFrame = requestAnimationFrame(animate)
	}

	// 切换下一条通知
	const switchToNextNotice = () => {
		currentIndex.value = (currentIndex.value + 1) % noticeArr.value.length
		// 等待DOM更新后重新开始滚动
		setTimeout(async () => {
			await getContentWidth()
			startScroll()
		}, 50) // 添加短暂延迟确保DOM更新
	}

	// 初始化
	onMounted(async () => {
		await getContainerWidth()
		startScroll()
	})
	
	// 清理
	onBeforeUnmount(() => {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame)
		}
	})
</script>

<style lang="scss" scoped>
	.notice-container {
		padding: 20rpx;
		background: #FFFFFF;
		border-radius: 10rpx;

		.announcement {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.announcement_text {
				display: flex;
				margin: 0 20rpx;
				padding: 0 20rpx;

				.songName {
					display: flex;
					justify-content: flex-start;
					width: 450rpx;
					padding-left: 40rpx;
					font-size: 28rpx;
					height: 48rpx;
					color: #1E1E1E;
					font-weight: 500;
					line-height: 48rpx;
					overflow: hidden;
					position: relative;

					.notice-content {
						position: absolute;
						white-space: nowrap;
						will-change: transform;
						
						.price {
							margin-left: 5rpx;
							font-size: 28rpx;
							height: 48rpx;
							color: #EF0000;
							font-weight: 500;
							line-height: 48rpx;
						}
					}
				}
			}
		}
	}
</style>
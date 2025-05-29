<template>
	<view class="container">
		<view ref="scrollContainer" v-if="mergedList.length" class="scroll-container" :style="{ transform: `translateY(${translateY}rpx)` }"
			@transitionend="handleTransitionEnd">
			<view v-for="(item, index) in mergedList" :key="index" class="raffle_label">
				{{item.mobile}} Menang <text class="label_text">{{item.name}}</text>
			</view>
		</view>
		<view class="empty mt-[50rpx]" v-if="!mergedList.length">
			<u-image width="462" height="291" src="@/static/images/icon/empty.png" alt="" />
			<view class="empty_text">Tidak Ada Catatan</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref, unref, computed, onMounted, onBeforeUnmount } from 'vue'
	const props = withDefaults(
		defineProps<{
			list : any
		}>(),
		{
			list: []
		})
	const mergedList = computed(() => {
		let arr = [];
		arr = props.list.length >= 3 ? [...props.list, ...props.list] : props.list
		return arr
	}) // 双倍数据实现无缝
	const itemHeight = 82 // 每个项目高度
	const translateY = ref(0)
	const scrollContainer = ref()
	let timer : any = null
	const startAutoScroll = () => {
		timer = setInterval(() => {
			translateY.value -= itemHeight
		}, 3000)
	}

	const stopAutoScroll = () => {
		clearInterval(timer)
	}

	const handleTransitionEnd = () => {
		const container = unref(scrollContainer.value)
		// 当滚动到原始列表的末尾时重置位置
		if (translateY.value <= -props.list.length * itemHeight) {
			container.$el.style.transition = 'none' // 禁用过渡
			translateY.value = 0
			container.$el.style.transform = `translateY(-${translateY}px)`;
			// 强制重绘以应用样式变化
			setTimeout(() => {
				void container.offsetHeight
				container.$el.style.transition = 'transform 0.5s ease-in-out' // 恢复过渡
				container.$el.style.transform = `translateY(-${translateY}px)`;
			}, 1000)
		}
	}
	onMounted(() => {
		props.list.length >= 3 ? startAutoScroll() : stopAutoScroll()
	})

	onBeforeUnmount(() => {
		stopAutoScroll()
	})
</script>


<style lang="scss" scoped>
	.container {
		width: 572rpx;
		/* 显示3条的高度 */
		height: 246rpx;
		overflow: hidden;
		position: relative;

		.scroll-container {
			transition: transform 0.5s ease-in-out;

			.raffle_label {
				margin-top: 20rpx;
				width: 572rpx;
				height: 62rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				font-size: 28rpx;
				line-height: 62rpx;
				text-align: left;
				color: #333333;
				padding: 0 20rpx;
				border-radius: 62rpx;
				background: #D9F0E9;
				/* 内容过长显示两行，多余为省略号 */
				text-overflow: ellipsis;
				/*设置隐藏部分为省略号*/
				overflow: hidden;
				/*设置隐藏*/
				display: -webkit-box;
				-webkit-line-clamp: 1;
				/*设置显示行数，此处为2行，可设置其他数字*/
				-webkit-box-orient: vertical;

				.label_text {
					font-family: Source Han Sans CN;
					font-weight: 500;
					font-size: 28rpx;
					line-height: 62rpx;
					letter-spacing: 0px;
					text-align: center;
					color: #0B7349;
				}
			}
		}
	}
</style>
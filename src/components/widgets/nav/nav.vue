<template>
	<view class="container mb-[20rpx] mx-[30rpx]">
		<view class="relative">
		    <swiper
		        class="py-[30rpx] px-[40rpx] h-full"
		        :style="{
		            height: navList[0].length > content.per_line ? '288rpx' : '132rpx'
		        }"
		        :autoplay="false"
		       :indicator-dots="navList.length > 1" 
			   indicator-active-color="#1E4B2E"
			   indicator-color="#F1F1F1"
		        @change="swiperChange"
		    >
		        <swiper-item v-for="(sItem, sIndex) in navList" :key="sIndex">
		            <view class="nav" v-if="navList.length && content.enabled">
		                <view
		                    class="grid grid-rows-auto gap-y-3 w-full"
		                    :style="{ 'grid-template-columns': `repeat(${content.per_line}, 1fr)` }"
		                >
		                    <view
		                        v-for="(item, index) in sItem"
		                        :key="index"
		                        class="flex flex-col items-center navItem"
		                        @click="handleClick(item.link)"
		                    >
		                        <u-image width="44" height="44" :src="getImageUrl(item.image)" alt=""/>
		                        <view class="iconText mt-[14rpx] text-white">{{ item.name }}</view>
		                    </view>
		                </view>
		            </view>
		        </swiper-item>
		    </swiper>
		</view>
	</view>
</template>

<script setup lang="ts">
import {ref, watch, computed} from 'vue'
import {useAppStore} from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import {navigateTo, sliceArray} from '@/utils/util'

const props = defineProps({
    content: {
        type: Object,
        default: () => ({})
    },
    styles: {
        type: Object,
        default: () => ({})
    }
})
const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)
const {getImageUrl} = useAppStore()
const swiperCurrent = ref<number>(0)
const navList = ref<Record<string, any>>([])
// 路由白名单
const nativeArr = [
    '/pages/rules/rules',
    '/pages/about_us/about_us',
]
const pagesNum = computed<number>(() => {
    return props.content.per_line * props.content.show_line
})

watch(
    () => props.content.data,
    (val) => {
        const num = props.content.style === 1 ? val.length : pagesNum.value
        navList.value = sliceArray(val, num)
    },
    {deep: true, immediate: true}
)

const handleClick = (link: any) => {
	isLogin.value ? navigateTo(link) : nativeArr.includes(link.path) ? navigateTo(link) : navigateAuth('/pages/login/login')
}
const navigateAuth = (url: string) => {
		uni.navigateTo({
			url
		})
}
const swiperChange = (e: any) => {
    swiperCurrent.value = e.detail.current
}
</script>
<style lang="scss" scoped>
	.container{
		background: #FFFFFF;
		border-radius: 12rpx;
		.navItem{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 180rpx;
			height: 115rpx;
			border-radius: 8rpx;
			background: #F1F1F1;
		}
	}
	.iconText{
		font-family:  Arial;
		font-size: 18rpx;
		font-weight: 400;
		text-align: center;
		color: #1E1E1E;
	}
	::v-deep .uni-swiper-dots-horizontal{
		bottom: 0;
	}
	::v-deep .uni-swiper-dot-active{
		width: 30rpx;
		border-radius: 4rpx;
	}
	::v-deep .uni-swiper-dot{
		border-radius: 4rpx;
	}
</style>
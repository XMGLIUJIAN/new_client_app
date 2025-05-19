<template>
    <div class="relative mx-[40rpx]">
        <swiper
            class="py-[40rpx] rounded-lg"
            :style="{
                height: navList[0].length > content.per_line ? '288rpx' : '132rpx'
            }"
            :autoplay="false"
            :indicator-dots="false"
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
                            class="flex flex-col items-center"
                            @click="handleClick(item.link)"
                        >
                            <u-image width="82" height="82" :src="getImageUrl(item.image)" alt=""/>
                            <view class="iconText mt-[14rpx] text-white">{{ item.name }}</view>
                        </view>
                    </view>
                </view>
            </swiper-item>
        </swiper>
    </div>
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
	.iconText{
		font-family:  Arial;
		font-size: 26rpx;
		font-weight: 400;
		text-align: center;
		color: #FFFFFF;
	}
</style>
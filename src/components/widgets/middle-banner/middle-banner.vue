<template>
    <view
        class="banner h-[220rpx] mx-[30rpx] mt-[20rpx] translate-y-0"
        v-if="showList.length && content.enabled"
    >
        <swiper
            class="swiper h-full"
            :indicator-dots="false"
            indicator-active-color="#FFFFFF"
            :autoplay="true"
        >
            <swiper-item
                v-for="(item, index) in showList"
                :key="index"
                @click="handleClick(item.link)"
            >
                <u-image
                    mode="widthFix"
                    width="100%"
                    height="100%"
                    :src="getImageUrl(item.image)"
                    :border-radius="20"
                />
            </swiper-item>
        </swiper>
    </view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { navigateTo } from '@/utils/util'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)
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
const navigateAuth = (url: string) => {
		uni.navigateTo({
			url
		})
}
const handleClick = (link: any) => {
    isLogin.value ? navigateTo(link) : navigateAuth('/pages/login/login')
}
const { getImageUrl } = useAppStore()

const showList = computed(() => {
    return props.content.data?.filter((item: any) => item.is_show == '1') || []
})
</script>

<style></style>

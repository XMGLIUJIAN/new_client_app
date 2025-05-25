<template>
	<view class="mb-[120rpx]">
		<view class="my-service bg-white mx-[30rpx] mt-[20rpx] mb-[20rpx] rounded-lg px-[20rpx] pt-[20rpx] pb-[20rpx]">
		    <view
		        v-if="content.title"
		        class="title font-medium text-lg"
		    >
		        <view>{{ content.title }}</view>
		    </view>
		    <view v-if="content.style == 1" class="grid grid-cols-4 gap-x-15 gap-y-4">
		        <view
		            v-for="(item, index) in showList"
		            :key="index"
		            class="flex flex-col items-center pt-[10rpx]"
		            @click="handleClick(item.link)"
		        >
		            <u-image width="64" height="64" :src="getImageUrl(item.image)" alt="" />
		            <view class="mt-[22rpx] text-sm name">{{ item.name }}</view>
		        </view>
		    </view>
		    <view v-if="content.style == 2">
		        <view
		            v-for="(item, index) in showList"
		            :key="index"
		            class="flex items-center border-light border-solid border-0 border-b h-[100rpx]"
		            @click="handleClick(item.link)"
		        >
		            <u-image width="48" height="48" :src="getImageUrl(item.image)" alt="" />
		            <view class="ml-[20rpx] flex-1 text-sm name">{{ item.name }}</view>
		            <view class="text-muted">
						<text class="version"  v-if="index == showList.length - 1">Versi {{ appStore.config.version }}</text>
						<u-icon name="arrow-right"/>
		            </view>
		        </view>
		    </view>
		</view>
		<view v-if="isLogin" class="switch_account mx-[40rpx]" @tap="switchAccount">
			<view class="switch_text">Tukar Akun</view>
		</view>
		<Popup v-if="switchPopup" @confirm="confirm" @cancel="cancel"></Popup>
		<toastPopup></toastPopup>
	</view>
</template>
<script lang="ts" setup>
import { logout } from '@/api/account'
import { useAppStore } from '@/stores/app'
import { navigateTo } from '@/utils/util'
import { computed, ref } from 'vue'
import Popup from './components/popup.vue'
import {useRouter} from "uniapp-router-next";
import {useUserStore} from '@/stores/user'
const appStore = useAppStore()
const router = useRouter()
const userStore = useUserStore()
const props = defineProps({
    content: {
        type: Object,
        default: () => ({})
    },
    styles: {
        type: Object,
        default: () => ({})
    },
	isLogin: {
		type: Boolean
	},
})
// 路由白名单
const nativeArr = [
    '/pages/customer_service/customer_service',
    '/pages/as_us/as_us',
]
const switchPopup = ref<Boolean>(false)
const switchAccount = () => {
	switchPopup.value = true
}
// 切换账号
	
const logoutFun = async () => {
	await logout()
}
const confirm = (e: Boolean) => {
	switchPopup.value = e
	logoutFun()
	userStore.logout()
	router.redirectTo('/pages/login/login')
}
const cancel = (e: Boolean) => {
	switchPopup.value = e
}
const { getImageUrl } = useAppStore()
const handleClick = (link: any) => {
	props.isLogin ? navigateTo(link) : nativeArr.includes(link.path) ? navigateTo(link) : navigateAuth('/pages/login/login')
}
const navigateAuth = (url: string) => {
		uni.navigateTo({
			url
		})
}
const showList = computed(() => {
    return props.content.data?.filter((item: any) => item.is_show == '1') || []
})
</script>

<style lang="scss" scoped>
	.name{
		font-family: Arial;
		font-weight: 400;
		font-size: 15rpx;
		line-height: 28rpx;
		color: #1E1E1E;
	}
	.version{
		font-family:  Arial;
		font-size: 24rpx;
		font-weight: 400;
		line-height: 40rpx;
		color: #999999;
	}
	.switch_account{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 88rpx;
		background: #458060;
		border-radius: 12rpx;
		.switch_text{
			margin-left: 20rpx;
			font-family:  Arial;
			font-size: 32rpx;
			font-weight: 500;
			line-height: 48rpx;
			text-align: left;
			color: #FFFFFF;
		}
	}
</style>

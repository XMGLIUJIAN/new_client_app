<template>
	<view class="container">
		<view class="newsCement">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#FFFFFF"
					:title-bold="true" :background="{ background: scrollTop ? '#2A482E' : 'transparent'}" title="PENGUMUMAN"
					title-color="#FFFFFF">
				</u-navbar>
			</u-sticky>
		</view>
		<view class="imageGroup">
			<u-image width="750" height="2044" src="@/static/images/raffle/noticeGroup.png"></u-image>
		</view>
		<view class="contactService" @tap="contactService"></view>
		<toastPopup></toastPopup>
		<Popup v-if="contactShow" :service="serviceInfo" @confirm="contactConfirm" @cancel="contactShow = false"></Popup>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { emitter } from '@/utils/emitter';
	import { onPageScroll } from '@dcloudio/uni-app';
	import { customerServiceInfo } from '@/api/eventInfo'
	import Popup from './components/popup.vue'
	const scrollTop = ref<number>(0)
	const serviceInfo = ref<any>({})
	const contactShow = ref<Boolean>(false)
	const getInfo = async () => {
		const resdata = await customerServiceInfo()
		serviceInfo.value = resdata.data
	}
	const contactService = () => {
		getInfo()
		emitter.emit('gifType')
		setTimeout(()=>{
			contactShow.value = true
		},3000)
	}
	const contactConfirm = (link : string) => {
		contactShow.value = false
		// #ifdef APP
		plus.runtime.openURL(link)
		// #endif
		// #ifdef H5
		window.location.href = link
		// #endif
	}
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page{
		background: linear-gradient(180deg, #427354 0%, #2A482E 100%);
	}
</style>
<style lang="scss" scoped>
	.container{
		position: relative;
		padding-bottom: 50rpx;
		.contactService{
			position: absolute;
			bottom: 360rpx;
			left: 50%;
			transform: translate(-50%,0%);
			width: 610rpx;
			height: 80rpx;
			border-radius: 12rpx;
		}
	}
</style>
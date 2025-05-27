<template>
	<view class="container">
		<rich-text class="rich_text" :nodes="formatRichText(parseInfo.content) || parseInfo.content"></rich-text>
		<view class="activity_detail">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :title-bold="true"
					title="INFORMASI PERISTIWA" :back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}" :title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
				</u-navbar>
			</u-sticky>
		</view>
		<toastPopup></toastPopup>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import { formatRichText } from '@/utils/util'
	import { eventInfo } from '@/api/eventInfo'
	const scrollTop = ref<number>(0)
	const parseInfo = ref<any>({})
	const getdata = async (activity_id: String | Number) => {
		parseInfo.value =  await eventInfo({id: activity_id})
	}
	onLoad((options: any) => {
		getdata(options.activity_id)
	})
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page {
		background: #FFFFFF !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.activity_detail {
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>
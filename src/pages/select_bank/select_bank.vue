<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="select_bank">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#FFFFFF"
					:title-bold="true" :background="{ background: 'transparent'}" title="PILIH BANK"
					title-color="#FFFFFF">
					<template #right>
						<view class="contact mr-[20rpx]" @tap="navigateTo('/pages/customer_service/customer_service')">
							<u-image width="50" height="50" src="@/static/images/user/icon_service.png" alt="" />
						</view>
					</template>
				</u-navbar>
			</u-sticky>
			<view class="page-main">
				<next-indexed-xlist :dataList="list" :showAvatar="true" @itemclick="itemclick"></next-indexed-xlist>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { bankList } from '@/api/bank';
	import { emitter } from '@/utils/emitter';
	import { ref } from 'vue';
	const list = ref([])
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
	const getlist = async () => {
		const data = await bankList()
		list.value = data.lists.map((item : any) => ({
			id: item.id,
			name: item.bank_name,
			img: item.icon,
			phone: item.search_name,
			ifsc: item.ifsc
		}))
	}
	const itemclick = (e : any) => {
		emitter.emit('bank', e)
		uni.navigateBack()
	}
	onLoad(() => {
		getlist()
	})
</script>

<style lang="scss">
	page {
		background: #F1F1F1 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.select_bank {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
		}
	}
</style>

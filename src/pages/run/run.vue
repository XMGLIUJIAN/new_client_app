<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="498" src="@/static/images/pageStyle/imageGroupThird.png"></u-image>
		</view>
		<view class="management pb-[120rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="false" :is-fixed="false" :border-bottom="false"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}">
					<view class="slot-wrap">
						<view class="title">MANAJEMEN PROYEK</view>
					</view>
				</u-navbar>
			</u-sticky>
			<view class="management_tabs pt-[20rpx] pb-[20rpx]">
				<view class="tabs_Item" @tap="change(e)" v-for="(e,index) in tabList" :key="index"
					:class="{'active': active == e.active}">
					{{e.name}}
				</view>
			</view>
			<template v-if="active == 'contract'">
				<Contract></Contract>
			</template>
			<template v-if="active == 'reports'">
				<Reports></Reports>
			</template>
			<tabbar />
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onPageScroll } from '@dcloudio/uni-app'
	import Contract from './components/contract.vue'
	import Reports from './components/reports.vue'
	const scrollTop = ref<number>(0)
	const tabList = ref<Array<string> | any>([{active:'contract',name:'Kontrak'}, {active:'reports',name:'Laporan'}])
	const active = ref<string>('contract')
	
	const change = (e : any) => {
		active.value = e.active
	}
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
</script>

<style lang="scss">
	page {
		background: #F6F6F6 !important;
	}
</style>
<style lang="scss" scoped>
	.container {
		position: relative;

		.management {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.slot-wrap {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				padding: 0 30rpx;

				.title {
					font-family:  Arial;
					font-size: 36rpx;
					font-weight: 700;
					line-height: 48rpx;
					text-align: center;
					color: #1E1E1E;
				}
			}

			.management_tabs {
				display: flex;
				justify-content: space-around;
				align-items: center;

				.tabs_Item {
					width: 250rpx;
					height: 88rpx;
					border-radius: 48rpx;
					background: transparent;
					font-family:  Arial;
					font-size: 30rpx;
					font-weight: 500;
					line-height: 88rpx;
					text-align: center;
					color: #1E1E1E;
					background: rgba(255, 255, 255, 0.3);
				}

				.active {
					font-family:  Arial;
					font-size: 32rpx;
					font-weight: 700;
					border: 2rpx solid #FFFFFF;
					color: #006EEE;
				}
			}
		}
	}
</style>
<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="withdrawal pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" back-icon-color="#1E1E1E"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="PENARIKAN" title-color="#1E1E1E">
					<template #right>
						<view class="rule mr-[20rpx]" @tap="navigateTo('/pages/user_rule/user_rule?type=withdrawal')">
							Peraturan
						</view>
					</template>
				</u-navbar>
			</u-sticky>
			<view class="withdraw_tabs pt-[20rpx] pb-[20rpx]">
				<view class="tabs_Item" @tap="changeTab(e)" v-for="(e,index) in tabList" :key="index"
					:class="{'active': active == e.active}">
					{{e.name}}
				</view>
			</view>
			<template v-if="active == 'Settings'">
				<Settings></Settings>
			</template>
			<template v-if="active == 'State'">
				<State></State>
			</template>
		</view>
	</view>

</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onPageScroll } from '@dcloudio/uni-app'
	import Settings from './components/settings.vue'
	import State from './components/state.vue'
	const scrollTop = ref<number>(0)
	const tabList = ref<Array<string | any>>([{active:'Settings',name:'Permintaan'},{active:'State',name:'Status'}])
	const active = ref<string>('Settings')
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url: url
		})
	}
	const changeTab = (e : any) => {
		active.value = e.active;
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

		.withdrawal {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.rule {
				font-family: serif;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 45rpx;
				text-align: right;
				color: #1E1E1E;
			}

			.withdraw_tabs {
				display: flex;
				justify-content: space-around;
				align-items: center;

				.tabs_Item {
					width: 250rpx;
					height: 88rpx;
					border-radius: 48rpx;
					background: transparent;
					font-family: serif;
					font-size: 30rpx;
					font-weight: 500;
					line-height: 88rpx;
					text-align: center;
					color: #1E1E1E;
					background: rgba(255, 255, 255, 0.3);
				}

				.active {
					font-family: serif;
					font-size: 32rpx;
					font-weight: 700;
					border: 2rpx solid #FFFFFF;
					color: #006EEE;
				}
			}
		}
	}
</style>
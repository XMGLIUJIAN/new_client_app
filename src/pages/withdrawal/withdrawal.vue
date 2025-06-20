<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="475" src="@/static/images/page/pageGroup.png"></u-image>
		</view>
		<view class="withdrawal pb-[40rpx]">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" :back-icon-color="scrollTop ? '#1E1E1E' : '#FFFFFF'"
					:title-bold="true" :background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}"
					title="PENARIKAN" :title-color="scrollTop ? '#1E1E1E' : '#FFFFFF'">
					<template #right>
						<view class="rule mr-[30rpx]" @tap="navigateTo('/pages/user_rule/user_rule?type=withdrawal')">
							<u-image v-if="!scrollTop" width="40" height="40" src="@/static/images/icon/icon_help.png"></u-image>
							<u-image v-else width="40" height="40" src="@/static/images/icon/help.png"></u-image>
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
		background: #F1F1F1 !important;
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
			.withdraw_tabs {
				display: flex;
				justify-content: space-around;
				align-items: center;

				.tabs_Item {
					width: 258rpx;
					height: 80rpx;
					border-radius: 48rpx;
					background: transparent;
					font-family: serif;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 80rpx;
					text-align: center;
					color: #A0A3A9;
					background: rgba(255, 255, 255, 0.5);
				}

				.active {
					font-family: serif;
					font-size: 28rpx;
					font-weight: 700;
					border: 2rpx solid #FFFFFF;
					color: #1E4B2E;
				}
			}
		}
	}
</style>

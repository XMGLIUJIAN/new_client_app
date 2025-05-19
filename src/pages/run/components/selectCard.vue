<template>
	<view class="select">
		<view class="selectCard">
			<view class="card"
				:style="{background:item.type == sportsType ? '#DBEBFF' : '#F4F4F4',color:item.type == sportsType ? '#006EEE' : '#999999'}"
				v-for="(item,index) in list" :key="index" @tap="selectType(item)">
					{{item.name}}
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { nextTick, ref, watch } from 'vue'
	const emit = defineEmits(['input','selectSportsType'])
	const props = withDefaults(defineProps<{
        sportsType?: number | string
        list?: any
    }>(),
    {
       sportsType: '',
       list:[]
    })
	const selectType = (e: any) => {
		emit('selectSportsType', e)
	}
</script>

<style lang="scss" scoped>
	.select {
		position: absolute;
		top: 60rpx;
		left: 0rpx;
		z-index: 99;
		margin-top: 20rpx;
		.selectCard {
			width: 275rpx;
			border-radius: 12rpx;
			.card {
				padding: 20rpx;
				font-family:  Arial;
				font-size: 28rpx;
				font-weight: normal;
				line-height: 40rpx;
				font-variation-settings: "opsz" auto;
			}
		}
	}
</style>
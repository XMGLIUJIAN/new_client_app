<template>
	<view class="popup" v-if="show">
		<view class="content">
			<view class="explain" v-if="toastType == 'gif'">
				<u-image width="200" height="200" src="@/static/images/gif/aigei.gif" alt="" />
			</view>
			<view class="toast" v-if="toastType == 'message'">
				<view class="message">{{toastMessage}}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref, onMounted } from 'vue'
	import { emitter } from '@/utils/emitter';
	const show = ref<boolean>(false)
	const toastMessage = ref<any>(null)
	const toastType = ref<any>('message')
	const toast = (message : any = null) => {
		toastMessage.value = message
		show.value = true
		setTimeout(() => {
			toastMessage.value = null
			show.value = false
		}, 2000)
	}
	const gifType = (time:number = 2000) => {
		toastType.value = 'gif'
		show.value = true
		setTimeout(() => {
			toastType.value = 'message'
			show.value = false
		}, time)
	}
	onMounted(() => {
		emitter.on('toast', (message : string | any) => {
			 toast(message)
		})
		emitter.on('gifType',(time: number | any) =>{
			 gifType(time);
		})
        emitter.on('toast_close', () => {
            toastType.value = null
            show.value = false
		})
	})
</script>

<style lang="scss" scoped>
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		z-index: 9999;

		.content {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;

			.explain {
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 20rpx;
				background: #FFFFFF;
				overflow: hidden;
			}

			.toast {
				width: 586rpx;
				padding: 40rpx;
				border-radius: 20rpx;
				background: #FFFFFF;

				.message {
					display: flex;
					justify-content: center;
					align-items: center;
					font-family: Arial;
					font-size: 28rpx;
					font-weight: 500;
					text-align: center;
					color: #1E1E1E;
					word-break: normal;
				}
			}
		}
	}
</style>

<template>
	<button class="avatar-upload p-0 m-0 rounded" :style="styles" hover-class="none" open-type="chooseAvatar"
		@click="chooseAvatar" @chooseavatar="chooseAvatar">
		<image class="w-full h-full" mode="heightFix" :src="modelValue" v-if="modelValue" />
		<slot v-else>
			<div :style="styles"
				class="border border-dotted border-light flex w-full h-full flex-col items-center justify-center text-muted text-xs box-border rounded">
				<u-icon name="plus" :size="36" />
			</div>
		</slot>
	</button>
	<toastPopup></toastPopup>
</template>
<script lang="ts" setup>
	import { uploadImage } from '@/api/app'
	import { useUserStore } from '@/stores/user'
	import { addUnit } from '@/utils/util'
	import { isBoolean } from 'lodash-es'
	import { computed, CSSProperties, onUnmounted, ref } from 'vue'
	import { emitter } from '@/utils/emitter';
	const props = defineProps({
		modelValue: {
			type: String
		},
		fileKey: {
			type: String,
			default: 'uri'
		},
		size: {
			type: [String, Number],
			default: 120
		},
		round: {
			type: [Boolean, String, Number],
			default: false
		},
		border: {
			type: Boolean,
			default: true
		}
	})
	const emit = defineEmits<{
		(event : 'update:modelValue', value : string) : void
	}>()
	const userStore = useUserStore()
	const styles = computed<CSSProperties>(() => {
		const size = addUnit(props.size)
		return {
			width: size,
			height: size,
			borderRadius: isBoolean(props.round) ? (props.round ? '50%' : '') : addUnit(props.round)
		}
	})
	const toast = (message : any = '') => {
		emitter.emit('toast', message)
	}
	const chooseAvatar = (e : any) => {
		// #ifndef MP-WEIXIN
		uni.navigateTo({
			url: '/uni_modules/vk-uview-ui/components/u-avatar-cropper/u-avatar-cropper?destWidth=300&rectWidth=200&fileType=jpg'
		})
		// #endif
		// #ifdef MP-WEIXIN
		const path = e.detail?.avatarUrl
		if (path) {
			uploadImageIng(path)
		}
		// #endif
	}

	const uploadImageIng = (file : string) => {
		emitter.emit('gifType')
		setTimeout(async () => {
			try {
				const res : any = await uploadImage(file, userStore.temToken!)
				emit('update:modelValue', res[props.fileKey])
			} catch (error) {
				toast(error)
			}
		}, 3000)
	}
	// 监听从裁剪页发布的事件，获得裁剪结果
	uni.$on('uAvatarCropper', (path) => {
		uploadImageIng(path)
	})
	onUnmounted(() => {
		uni.$off('uAvatarCropper')
	})
</script>

<style lang="scss" scoped>
	.avatar-upload {
		background: #fff;
		overflow: hidden;

		&::after {
			border: none;
		}
	}
</style>
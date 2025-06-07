<template>
	<view class="container mt-[20rpx] mb-[150rpx] mx-[30rpx] pt-[4rpx] px-[4rpx]">
		<u-image width="680" height="102" src="@/static/images/informasiAset/card_head.png"></u-image>
		<view class="article_box px-[30rpx] pt-[30rpx] pb-[30rpx]">
			<view class="article_head mb-[10rpx]">
				<u-image width="60" height="60" src="@/static/images/card/article_image.png"></u-image>
				<view class="article_head_title">Zona Global</view>
				<view class="article_head_text">Pertumbuhan Stabil</view>
			</view>
		</view>
		<view class="article_nav mb-[20rpx]">
			<u-image width="680" height="96" src="@/static/images/card/nav_image.png"></u-image>
			<view class="article_select">
				<view class="scroll-box">
					<scroll-view :scroll-x="true" :scroll-left="scrollLeft">
						<view class="tabs_content">
							<view class="tabs_label" v-for="(e,index) in navArr" :key="index">
								<view class="tabs_name" :style="{color: e.current == active ? '#1E4B2E':'#666666'}" @tap="change(e)">
									{{e.title}}
								</view>
							</view>
							<view class="active" :style="{left: active * 140 + 'rpx'}">
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="article_product">
			
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { formatNumber, formatProgress } from '@/utils/util'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	const active = ref<Number>(0)
	const scrollLeft = ref(0)
	const navArr = ref<Array<any>>([
		{ current: 0, title: 'Semua' },
		{ current: 1, title: 'Vietnam' },
		{ current: 2, title: 'Laos' },
		{ current: 3, title: 'Thailand' },
		{ current: 4, title: 'Myanmar' }
	])
	const userStore = useUserStore()
	const { userInfo, isLogin } = storeToRefs(userStore)
	const change = (e : any) => {
		active.value = e.current
		scrollLeft.value = e.current * 30
	}
	const navigateTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		border-radius: 12rpx;
		background: #FFFFFF;

		.article_box {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;

			.article_head {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.article_head_title {
					margin-left: 10rpx;
					font-family: Arial;
					font-weight: 700;
					font-size: 32rpx;
					line-height: 54rpx;
					color: #1E4B2E;
				}

				.article_head_text {
					margin-left: 30rpx;
					font-family: Arial;
					font-weight: 400;
					font-size: 22rpx;
					line-height: 40rpx;
					color: #A0A3A9;
				}
			}
		}

		.article_nav {
			position: relative;

			.article_select {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 96rpx;

				.scroll-box {
					overflow: hidden;
					margin-left: 168rpx;
					width: 500rpx;
					.tabs_content {
						display: flex;
						justify-content: space-between;
						align-items: center;
						position: relative;
						padding: 30rpx 0;

						.tabs_label {
							flex: 1;
							z-index: 100;

							.tabs_name {
								width: 140rpx;
								font-family: Arial;
								font-size: 24rpx;
								font-weight: 500;
								line-height: 40rpx;
								text-align: center;
							}
						}

						.active {
							position: absolute;
							top: 50%;
							transform: translateY(-50%);
							transition: all 0.5s;
							width: 140rpx;
							height: 59rpx;
							border-radius: 30rpx;
							background: #BBE8D0;
							z-index: 97;
						}
					}
				}
			}
		}
		.article_product{
			
		}
	}
</style>
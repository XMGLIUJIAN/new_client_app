<template>
	<view class="container">
		<view class="imageGroup">
			<u-image width="750" height="415" src="@/static/images/page/indexGroup.png"></u-image>
		</view>
		<view class="index">
			<u-sticky h5-nav-height="0" bg-color="transparent">
				<u-navbar :is-back="false" :is-fixed="false" height="54" :border-bottom="false"
					:background="{ background: scrollTop ? '#FFFFFF' : 'transparent'}">
					<view class="slot-wrap">
						<u-image width="227" height="54" src="@/static/images/icon/logoIcon.png"></u-image>
						<u-image v-if="!scrollTop" @tap="contactService" width="50" height="50" src="@/static/images/user/icon_service.png" alt="" />
						<u-image v-else @tap="contactService" width="50" height="50" src="@/static/images/icon/contact.png" alt="" />
					</view>
				</u-navbar>
			</u-sticky>
			<Notice :notice="noticeArr"></Notice>
			<!-- 组件 -->
			<template v-for="item in state.pages" :key="item.name">
				<template v-if="item.name == 'nav'">
					<w-nav :content="item.content" :styles="item.styles" />
				</template>
			</template>
			<InformasiAset v-show="indexProduct.is_investing==false" :informasiInfo="indexProduct"></InformasiAset>
			<template v-for="item in state.pages" :key="item.name">
				<template v-if="item.name == 'middle-banner'">
					<w-middle-banner :content="item.content" :styles="item.styles" />
				</template>
			</template>
			<ProductList></ProductList>
		</view>
		<ContractPopup v-if="contractShow"></ContractPopup>
		<CustomerPopup v-if="contactShow" :service="serviceInfo" @confirm="contactlink" @cancel="contactShow = false"></CustomerPopup>
		<toastPopup></toastPopup>
		<tabbar />
	</view>
</template>

<script setup lang="ts">
	import { onLoad, onPageScroll } from "@dcloudio/uni-app"
	import { computed, reactive, ref, nextTick } from 'vue'
	import { useUserStore } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import InformasiAset from './component/informasiAset.vue'
	import Notice from './component/notice.vue'
	import ProductList from './component/productList.vue'
	import CustomerPopup from './component/customerPopup.vue'
	import ContractPopup from './component/contractPopup.vue'
	import { getIndex } from "@/api/shop"
	import { customerServiceInfo, mesNotifiList } from "@/api/eventInfo"
	import { emitter } from "@/utils/emitter"
    import { getProductDetailApi } from '@/api/product'
	const userStore = useUserStore()
    const { userInfo, isLogin } = storeToRefs(userStore)
	const state = reactive<{
		pages : any[]
		meta : any[]
		article : any[]
	}>({
		pages: [],
		meta: [],
		article: []
	})
	const scrollTop = ref<any>(0)
	const swiperRef = ref<any>(null)
	const serviceInfo = ref<any>({})
	const contactShow = ref<Boolean>(false)
	const contractShow = ref<Boolean>(false)
	const noticeArr = ref<Array<any>>([])
    const indexProduct = ref<any>({})
	const getNotice = async () => {
		const data = await mesNotifiList({ type:4 })
		noticeArr.value = data.lists.map((item : any) => item.content)
	}
	const contactlink = (link : string) => {
		contactShow.value = false
		// #ifdef APP
		plus.runtime.openURL(link)
		// #endif
		// #ifdef H5
		window.location.href = link
		// #endif
	}
	const getInfo = async () => {
		const resdata = await customerServiceInfo()
		serviceInfo.value = resdata.data
        contactShow.value = true
        emitter.emit('toast_close')
	}
	const contactService = () => {
        emitter.emit('gifType')
		getInfo()
		// setTimeout(()=>{
		// 	contactShow.value = true
		// },3000)
	}
	const getData = async () => {
		const data = await getIndex()
		state.pages = JSON.parse(data?.page?.data)
		state.meta = JSON.parse(data?.page?.meta)
		state.article = data.article
	}

    const fetchIndexProduct = async ()=>{
        const data = await getProductDetailApi({productId:"P2025060710000"})
        indexProduct.value = data
    }
	onPageScroll((event : any) => {
		scrollTop.value = event.scrollTop
	})
	onLoad(()=>{
		getData()
		getNotice()
        fetchIndexProduct()
		userStore.getUser()
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

		.index {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.slot-wrap {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				padding: 0 40rpx;
			}
		}
	}
</style>

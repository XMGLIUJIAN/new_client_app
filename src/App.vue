<script setup lang="ts">
import { onLaunch, onHide } from '@dcloudio/uni-app'
import { useAppStore } from './stores/app'
import { useUserStore } from './stores/user'
import { useThemeStore } from './stores/theme'
import { useRoute, useRouter } from 'uniapp-router-next'
const appStore = useAppStore()
const { getUser } = useUserStore()
const { getTheme } = useThemeStore()
const { getLogInfo } = useUserStore()
const router = useRouter()
const route = useRoute()

//#ifdef H5
const setH5WebIcon = () => {
    const config = appStore.getWebsiteConfig
    let favicon: HTMLLinkElement = document.querySelector('link[rel="icon"]')!
    if (favicon) {
        favicon.href = config.h5_favicon
        return
    }
    favicon = document.createElement('link')
    favicon.rel = 'icon'
    favicon.href = config.h5_favicon
    document.head.appendChild(favicon)
}
//#endif 

const getConfig = async () => {
    await appStore.getConfig()
    //#ifdef H5
    setH5WebIcon()
    //#endif
    const { status, page_status, page_url } = appStore.getH5Config
    if (route.meta.webview) return
    //处理关闭h5渠道
    //#ifdef H5
    if (status == 0) {
        if (page_status == 1) return (location.href = page_url)
        router.reLaunch('/pages/empty/empty')
    }
    //#endif
}

onLaunch(async () => {
    getTheme()
    getConfig()
    //#ifdef H5
    setH5WebIcon()
    //#endif
    await getUser()
	await getLogInfo()
})
onHide(async () => {
	await getLogInfo()
})
</script>
<style lang="scss">
//
</style>

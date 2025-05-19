<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <view class="h-screen flex flex-col justify-center items-center">
        <view>
            <u-empty text="Maaf, halaman yang Anda akses tidak ada" mode="data"></u-empty>
        </view>
        <view class="w-full px-[100rpx] mt-[40rpx]">
            <router-navigate
                to="/"
                nav-type="reLaunch"
            >
               <view class="submit_btn">Kembali ke beranda</view> 
            </router-navigate>
        </view>
    </view>
</template>
<style lang="scss">
	page {
		background: #FFFFFF !important;
	}
</style>
<style lang="scss" scoped>
	.submit_btn {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90rpx;
		border-radius: 45rpx;
		background: #0067E0;
		font-family:  Arial;
		font-size: 32rpx;
		font-weight: 500;
		line-height: 48rpx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
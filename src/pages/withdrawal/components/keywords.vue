<template>
	<view class="popup" v-if="popup">
		<view class="pass-box">
			<view class="pass-box-head">
				<text class="keyboard-icon key-shanchu" style="position: absolute;font-size: 40rpx;"
					@tap="close"></text>
				<view class="pass-box-head__title">
					Masukkan pin penarikan
				</view>
			</view>
			<view class="pass-box-center" v-if="title">
				<view class="pass-box-center__text">
					{{title}}
				</view>
				<view class="pass-box-center__money" v-if="money">
					Rp<text>{{price}}</text>
				</view>
			</view>
			<view class="pass-box-extend" v-if="$slots.extend">
				<slot name="extend"></slot>
			</view>
			<view class="pass-box-footer" :style="'--digit:'+digit">
				<view v-for="(item,index) in digit" :key="index" class="pass-box-footer__passnum">
					<text class="keyboard-icon key-dian" v-if="password[index]"
						style="margin-left: 50%;transform: translateX(-50%);font-size: 76rpx;"></text>
				</view>
			</view>
		</view>
		<view class="keyboard">
			<view v-for="(item,index) in 9" :key="index" hover-class="key-hover" :hover-stay-time="100"
				class="keyboard-key" @tap="keyTap(item)">
				{{item}}
			</view>
			<view class=""></view>
			<view class="keyboard-key" hover-class="key-hover" :hover-stay-time="100" @tap="keyTap(0)">
				0
			</view>
			<view class="keyboard-key__del" hover-class="key-hover" :hover-stay-time="100" @tap="keyTap('del')">
				<text class="keyboard-icon key-backspace"></text>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { formatNumber } from '@/utils/util'
	import { ref, computed, watch } from 'vue'
	const emit = defineEmits(['confirm','close'])
	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
		money: {
			type: Number,
			default: 0,
		},
		popup: {
			type: Boolean,
			default: false,
		},
		digit: {
			type: Number,
			default: 6,
			validator(val : number) {
				return !isNaN(val) && (val >= 4 && val <= 8)
			}
		}
	})
	const password = ref<any>([])
	const price = computed(() => {
		return formatNumber(props.money)
	})
	watch(() => password.value,
		(val) => {
			if (val.length == props.digit) {
				emit('confirm', {
					password: val.join('')
				})
				password.value = []
			}
		},
		{deep: true}
	)
	const close = () => {
		password.value = []
		emit('close')
	}
	const keyTap = (val : any) => {
		let value = val.toString()
		if (value !== 'del') {
			if (password.value.length < props.digit) {
				password.value.push(value)
			}
		} else {
			password.value.pop()
		}

	}
</script>
<style>
	@font-face {
		font-family: "keyboard";
		/* Project id 3416614 */
		src:
			url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOYAAsAAAAAB4gAAANLAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDHAqCMIImATYCJAMQCwoABCAFhGcHSRuvBlFUTmJkX2FThnuRwHYHE4QAIC7eAAI4iFBdNHsBCP8cJA8MEYRj6H2SAoBidMC6qqqKx0LOT23CzWgyhlgi6V5N2z6tjUetMOmO2lW1pO0ll3Y3l80XRzHuhXuMwiEkDottmkYY45xtyxNOnrirQg6wzlcJjmSgm5rbyGLaOULR0GYhodH0Pw2p4k28QRwkqKIl4R065FWYmH1/Kd8lIVwLALT6KKVhKQ3/hA7sAKMBKr0RBiiCHAXZtSfrGoFac3ZM7Zxc3cLatYgbWDfDEAdxcVyTWQQLvE9RkKwWKttOLeKOCtKt9HDb/358tRBIKjJjlf2z4xTePvhwIz9eAPJbrkhA94QKZEytzB6X6r1HpsPYlGm1Za1nrADVqiVGrWv+0Fz8iZ21q8y/PEKWiEpGYT1YIvHMh2pbTvChWV1muYGkhLdC1WHeIXCTQf3+sBBSqkHTrg5tnl3AGS+7XuHtRZjYdqs26IlQfEojIMbQA8ZlKYF1eQolaVZpIcoZxMKwJbOhvGZkuCIrJQmOOsdNoJTAB07LYozY8hiIUKzBfx0xu4d7LYWXLhBiMSD8UKA52PLfv8Ihf0jk/Rpp32OgmleEv/8m8ATGV/apY2CaCbJ09CfQ0tufc+vuO60V/Aae0IZH3YRi6FLTkvEUFKlwDwJ53G1kpIwvK7jK46kQRcNO6WFiAPJiOuS76f6b3ziNn/tD09Z/dQW8f7Q931q0p+oz9QZ/wnLYUrCofkop09vav0vzvSMJtaaDV5+i1ecY1Na6kFCtLUZSpQ9ZtQGuyCZQoc4CKlVbRa1Jx7PrtNGmRanBiBcKodkESaN7yJq9c0X2gQqdvlCp2T9qHcTqcnVGokNDEVOK8QhlohphzeWSRrGKTHpNWVdFRtf5/e7JtFI16NluNnlKDZkhRrT9zGcWKIyq8WSs3aiqFGqjCkrYzpn1huOIso/YiarhkEEijKRQbARJCaUh3AgrETaJKREjdY1kOlWaWcMEdx8zWnKkxpHH5rbgTs1NK+ZKbmn1ZXyMCUgwlBo6WVsnUqkoSJd3KpAEs+U9ItoGxxQSbc32Hql+eiquBmOJEilylKhQTmTUzLe50yTJu7U4SspWU1VkCVlVAAA=') format('woff2');
	}

	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		z-index: 999;
	}

	.keyboard-icon {
		font-family: "keyboard" !important;
		font-size: inset;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.key-dian:before {
		content: "\e608";
	}

	.key-shanchu:before {
		content: "\e66e";
	}

	.key-backspace:before {
		content: "\e610";
	}

	.key-hover {
		background-color: #e0e0e0 !important;
	}
</style>

<style lang="scss" scoped>
	.pass-box {
		width: 600rpx;
		border-radius: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		margin: auto;
		left: 75rpx;
		top: 35%;
		transform: translateY(-50%);
		box-sizing: border-box;
		position: absolute;

		&-head {
			position: relative;
			line-height: 40rpx;

			&__title {
				width: 100%;
				text-align: center;
				font-size: 28rpx;
				font-weight: 700;
			}
		}

		&-center {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 40rpx;

			&__text {
				overflow: hidden;
				display: -webkit-box;
				margin-bottom: 10rpx;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			&__money {
				font-weight: 700;

				text {
					font-size: 60rpx;
				}
			}
		}

		&-extend {
			border-top: 1px solid #eee;
			padding: 20rpx 0;
		}

		&-footer {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 20rpx;

			&__passnum {
				width: calc(520rpx / var(--digit) - 10rpx);
				height: calc(520rpx / var(--digit) - 10rpx);
				max-width: 100rpx;
				max-height: 100rpx;
				border-radius: 10rpx;
				background-color: #eee;
				display: flex;
				align-items: center;
			}
		}
	}

	.keyboard {
		position: fixed;
		width: 750rpx;
		bottom: 0;
		bottom: env(safe-area-inset-bottom);
		//margin-bottom: env(safe-area-inset-bottom);
		background-color: #eee;
		display: grid;
		grid: 100rpx / repeat(3, 1fr);
		grid-gap: 1px;

		&-key {
			background-color: #fff;
			line-height: 100rpx;
			text-align: center;
			font-size: 60rpx;

			&__del {
				line-height: 100rpx;
				text-align: center;
				font-size: 60rpx;
			}
		}
	}
</style>
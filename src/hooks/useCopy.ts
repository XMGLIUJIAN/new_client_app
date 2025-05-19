import { emitter } from '@/utils/emitter';
export function useCopy() {
    const copy = (text: string) => {
        uni.setClipboardData({
			showToast: false,
            data: String(text),
			success: function () {
				emitter.emit('toast','Isinya disalin')
			}
        })
    }
    return {
        copy
    }
}

import { emitter } from '@/utils/emitter';

export async function saveImageToPhotosAlbum(url: string) {
    if (!url) return emitter.emit('toast','Kesalahan gambar')
    //#ifdef H5
	emitter.emit('toast','Selamat tinggal')
    //#endif
    //#ifndef H5
    try {
        const res: any = await uni.downloadFile({ url, timeout: 10000 })
        await uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath
        })
        emitter.emit('toast','Sukses')
    } catch (error: any) {
		emitter.emit('toast',error || 'Gagal untuk menyimpan')
    }
    //#endif
}

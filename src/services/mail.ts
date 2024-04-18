import instance from './core/api'

export const sendMail = async (noidung: any) => {
    try {
        const response = await instance.post('/send-maill', noidung)

        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['sendMail']`, error)
    }
}

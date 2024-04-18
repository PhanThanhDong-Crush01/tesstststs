import { IWhyCancelOrder } from '@/interface/IWhyCancelOrder'
import instance from './core/api'

export const add = async (why: IWhyCancelOrder) => {
    try {
        const response = await instance.post('/bill/whyCanCelOrder', why)
        console.log('🚀 ~ add ~ response:', response)

        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['ADD_WHY_CANCEL_ORDER_ERROR']`, error)
    }
}

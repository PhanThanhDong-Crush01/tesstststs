import instance from './core/api'
import { IBill } from '@/interface/IBill'

export const getAll = async () => {
    try {
        const response = await instance.get('/bill/136')
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['GETALL_BILL_ERROR']`, error)
    }
}
export const getThongKeOrder = async () => {
    try {
        const response = await instance.get('/bill/getThongKeOrder')
        return response.data
    } catch (error: any) {
        console.log(`['getThongKeOrder']`, error)
    }
}
export const getBillOfUser = async (id: string) => {
    try {
        const response = await instance.get('/bill/user/' + id)
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['getBillOfUser_ERROR']`, error)
    }
}
export const getBillDetail = async (id: string) => {
    try {
        const response = await instance.get(`/bill/${id}`)
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['getBillDetail_ERROR']`, error)
    }
}
export const update = async (bill: IBill) => {}
export const add = async (bill: IBill) => {
    try {
        const response = await instance.post('/bill/', bill)
        if (response.data) {
            alert('Tạo hóa đơn thành công!!')
        }
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['ADD_BILL_ERROR']`, error)
    }
}
export const remove = async (bill: IBill) => {}
//mẫu product

export const apiChangeStatusOrder = async (bill: any) => {
    try {
        const response = await instance.patch(`/bill/changeOrderStatus/${bill.idBill}`, bill)
        if (response.data) {
            alert('Thay đổi trạng thái đơn hàng thành công!!')
        }
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['CHANGE_STATUS_ORDER_ERROR']`, error)
    }
}
export const apiChangePaymentStatus = async (bill: any) => {
    try {
        const response = await instance.patch(`/bill/changePaymentStatus/${bill._id}`, bill)
        if (response.data) {
            alert('Thay đổi trạng thái thanh toán đơn hàng thành công!!')
        }
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['CHANGE_PAYMENT_STATUS_ERROR']`, error)
    }
}
export const apiCancelOrder = async (bill: IBill) => {
    try {
        const response = await instance.patch(`/bill/cancelOrder/${bill._id}`, bill)

        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['CHANGE_PAYMENT_STATUS_ERROR']`, error)
    }
}

export const getOneCancelOrder = async (idbill: any) => {
    try {
        const response = await instance.get(`/bill/whyCanCelOrder/${idbill}`)
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['getOneCancelOrder']`, error)
    }
}

// import { IAuth } from '@/interface/IAuth'
// import instance from './core/api'

import { IAuth } from '@/interface/IAuth'
import instance from './core/api'

export const getAll = async () => {
    try {
        const response = await instance.get(`/auth`)
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['GETALL_AUTH_ERROR']`, error)
    }
}
export const getAllAuthOrder = async () => {
    try {
        const response = await instance.get(`/auth/getAllAuthOrder`)
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['getAllAuthOrder']`, error)
    }
}
export const getOneUser = async (id: string) => {
    try {
        const response = await instance.get(`/auth/${id}`)
        return response.data
    } catch (error: any) {
        console.log(`['GETONE_AUTH_ERROR']`, error)
    }
}
export const getAuthWithRole = async (staff: number) => {
    try {
        const response = await instance.get(`/auth/${staff}/permission`)
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['getAuthWithRole_ERROR']`, error)
    }
}

export const signin = async (user: any) => {
    try {
        const response = await instance.post('/auth/signin', user)
        if (response.data) {
            alert('Đăng nhập thành công!')
        }
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['Signin_ERROR']`, error)
    }
}
export const signup = async (user: any) => {
    try {
        const response = await instance.post('/auth/signup', user)
        if (response.data) {
            alert('Đăng kí thành công!!')
        }
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['Signup_ERROR']`, error)
    }
}
export const updateUserProfile = async (user: IAuth) => {
    try {
        console.log(user)
        const response = await instance.patch(`/auth/${user._id}`, user)

        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['UPDATEUSERPROFILE_AUTH_ERROR']`, error)
    }
}
export const updateUserRole = async (user: IAuth) => {
    try {
        const response = await instance.patch(`/auth/roleUser/${user._id}`, user)

        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['UPDATEUSERROLE_AUTH_ERROR']`, error)
    }
}
export const quanmkAPI = async (email: any) => {
    try {
        const response = await instance.post(`/auth/1/quenmk`, { email: email })
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['quanmkAPI']`, error)
    }
}
export const setEmployeeCode = async (user: IAuth) => {
    try {
        const response = await instance.patch(`${user._id}/setEmployeeCode`)

        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['UPDATEUSERROLE_AUTH_ERROR']`, error)
    }
}
export const createAuth = async (user: any) => {
    try {
        const response = await instance.post('/auth/createAuth', user)

        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['CREATE_AUTH_ERROR']`, error)
    }
}
export const createKhachVangLai = async (user: any) => {
    try {
        const response = await instance.post('/auth/createKhachVangLai', user)

        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['CREATE_AUTH_ERROR']`, error)
    }
}
export const editAuth = async (user: any) => {
    try {
        const response = await instance.patch(`/auth/editAuth/${user._id}`, user)

        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['_AUTH_ERROR']`, error)
    }
}
export const deleteEmployee = async (user: IAuth) => {
    try {
        const response = await instance.patch(`/auth/deleteEmployee/${user._id}`, user)

        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['delete_Employee']`, error)
    }
}
export const remove = async (auth: IAuth) => {
    try {
        await instance.delete(`/auth/${auth._id}`)
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['DELETE_AUTH_ERROR']`, error)
    }
}
export const changePassword = async (user: IAuth) => {
    try {
        console.log(user)

        const response = await instance.patch(`/auth/changePassword/${user._id}`, user)
        if (response.data) {
            alert('Cập nhật mật khẩu mới thành công!!')
            setTimeout(() => {
                window.location.href = '/signin'
            }, 2000)
        }
        return response.data
    } catch (error: any) {
        alert(error?.response?.data?.message + '!')
        console.log(`['CHANGEPASSWORD_AUTH_ERROR']`, error)
    }
}

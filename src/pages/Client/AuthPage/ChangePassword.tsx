import { useAuthMutation } from '@/hooks/Auth/useAuthMutation'
import { useAuthQuery } from '@/hooks/Auth/useAuthQuery'
import Layout, { Content } from 'antd/es/layout/layout'
import { useForm } from 'react-hook-form'

const ChangePasswordPage = () => {
    const userID = localStorage.getItem('userID')
    console.log(userID)
    const { data } = useAuthQuery(userID || '')
    console.log(data)
    const { register, handleSubmit } = useForm()
    const { onSubmit } = useAuthMutation({
        action: 'CHANGE_PASSWORD'
        // onSuccess: () => {
        //     navigate('/signin')
        // }
    })

    const onHandleSubmit = (data: any) => {
        const changePassword = {
            ...data,
            _id: userID,
            newPassword: data.newPassword,
            confirmNewpassword: data.confirmNewpassword
        }
        console.log('🚀 ~ onHandleSubmit ~ updatedCategory:', changePassword)
        onSubmit(changePassword)
    }

    return (
        <div>
            <Content style={{ padding: '0px 0px' }}>
                <Layout style={{ padding: '0px 0' }}>
                    <Content style={{ padding: '0 24px' }}>
                        <main className=' gap-5 ' style={{}}>
                            <div className='border-b border-gray-300  pb-2'>
                                <p className='text-2xl font-sans pb-3'>Thay đổi mật khẩu</p>
                            </div>
                            <form
                                className=' flex flex-col gap-5 px-10'
                                // action='#'
                                // method='POST'
                                onSubmit={handleSubmit(onHandleSubmit)}
                            >
                                {/* <Input.Password {...register('oldPassword')} placeholder='Mật khẩu cũ' />
                                <Input.Password {...register('newPassword')} placeholder='Mật khẩu mới' /> */}
                                <div className='mt-3'>
                                    <input
                                        type='password'
                                        placeholder='Mật khẩu cũ'
                                        {...register('oldPassword')}
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    />
                                </div>
                                <div className='mt-2'>
                                    <input
                                        placeholder='Mật khẩu mới'
                                        type='password'
                                        {...register('newPassword')}
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    />
                                </div>
                                <div className='mt-2'>
                                    <input
                                        placeholder='Xác nhận mật khẩu mới'
                                        type='password'
                                        {...register('confirmNewpassword')}
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    />
                                </div>
                                <div>
                                    <button
                                        type='submit'
                                        className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                    >
                                        Lưu
                                    </button>
                                </div>
                            </form>
                        </main>
                    </Content>
                </Layout>
            </Content>
        </div>
    )
}

export default ChangePasswordPage

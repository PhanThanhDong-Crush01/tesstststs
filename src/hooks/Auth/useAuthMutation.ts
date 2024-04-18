import { IAuth } from '@/interface/IAuth'
import AddAuth from '@/pages/Admin/ListUser/AddAuth'
import {
    changePassword,
    createAuth,
    deleteEmployee,
    editAuth,
    remove,
    updateUserProfile,
    updateUserRole
} from '@/services/auth'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
const formSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    age: Joi.number().required(),
    address: Joi.string().required(),
    imgUser: Joi.string().required(),
    gender: Joi.boolean().required()
})

type useAuthMutationProps = {
    action: 'UPDATE' | 'UPDATEROLE' | 'ADD' | 'UPDATEAUTH' | 'DELETE' | 'CHANGE_PASSWORD'
    defaultValues?: IAuth
    onSuccess?: (data: any) => void
}
// Modify the useAuthMutation hook
export const useAuthMutation = ({
    action,
    defaultValues = {
        name: '',
        email: '',
        phone: '',
        address: '',
        imgUser: '',
        age: 0,
        gender: true,
        jobPosition: '',
        employee: '',
        datas: undefined
    },
    onSuccess
}: useAuthMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (user: IAuth) => {
            switch (action) {
                case 'UPDATEROLE':
                    return await updateUserRole(user)
                case 'UPDATE':
                    return await updateUserProfile(user)
                case 'ADD':
                    return await createAuth(user)
                case 'UPDATEAUTH':
                    return await editAuth(user)
                case 'CHANGE_PASSWORD':
                    return await changePassword(user)
                case 'DELETE':
                    return await remove(user)

                default:
                    return null
            }
        },
        onSuccess: (data) => {
            // Modify onSuccess to receive data from server response
            onSuccess && onSuccess(data) // Pass the data to the callback function
            queryClient.invalidateQueries({
                queryKey: ['AUTH']
            })
        }
    })

    const form = useForm({
        defaultValues
    })

    const onSubmit: SubmitHandler<any> = (values) => {
        mutate(values)
    }
    const onRemove = (auth: IAuth) => {
        mutate(auth)
    }
    return {
        onRemove,
        form,
        onSubmit,
        ...rest
    }
}

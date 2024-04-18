import { IProduct } from '@/interface/IProduct'
import { add, deletePro, restoreApi, storage, update } from '@/services/product'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

type useProductMutationProps = {
    action: 'ADD' | 'UPDATE' | 'STORAGE' | 'DELETE' | 'RESTORE'
    defaultValues?: IProduct
    onSuccess?: () => void
}

export const useProductMutation = ({
    action,
    defaultValues = {
        name: '',
        image: '',
        import_date: '',
        expiry: '',
        status: true,
        description: '',
        idCategory: ''
    },
    onSuccess
}: useProductMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (product: IProduct) => {
            switch (action) {
                case 'ADD':
                    return await add(product)
                case 'DELETE':
                    return await deletePro(product)
                case 'UPDATE':
                    return await update(product)
                case 'STORAGE':
                    return await storage(product)
                case 'RESTORE':
                    return await restoreApi(product)
                default:
                    return null
            }
        },
        onSuccess: () => {
            onSuccess && onSuccess()
            queryClient.invalidateQueries({
                queryKey: ['PRODUCT']
            })
        }
    })
    const form = useForm({
        defaultValues
    })
    const onSubmit: SubmitHandler<any> = (values) => {
        console.log(values)
        mutate(values)
    }
    const onStorage = (product: IProduct) => {
        product.status = false
        mutate(product)
    }
    const onRemove = (product: IProduct) => {
        mutate(product)
    }
    const onRestore = (product: IProduct) => {
        mutate(product)
    }
    return {
        form,
        onSubmit,
        onStorage,
        onRemove,
        onRestore,
        ...rest
    }
}
//mẫu product

import { IBill } from '@/interface/IBill'
import { add, remove, update } from '@/services/bill'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

type useBillMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE'
    defaultValues?: IBill
    onSuccess?: () => void
}

export const useBillMutation = ({
    action,
    defaultValues = { name: '', price: 0 },
    onSuccess
}: useBillMutationProps) => {
    const queryClient = useQueryClient()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (bill: IBill) => {
            switch (action) {
                case 'ADD':
                    return await add(bill)
                case 'UPDATE':
                    return await update(bill)
                case 'DELETE':
                    return await remove(bill)
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
        mutate(values)
    }
    const onRemove = (bill: IBill) => {
        mutate(bill)
    }
    return {
        form,
        onSubmit,
        onRemove,
        ...rest
    }
}
//mẫu product

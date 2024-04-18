import { getAll, getOne } from '@/services/product'
import { useQuery } from 'react-query'

export const useProductQuery = (productId?: string) => {
    const { data = {}, ...rest } = useQuery(
        productId ? ['PRODUCT', productId] : ['PRODUCT'],
        () => (productId ? getOne(productId) : getAll()),
        {
            retry: true // Add retry option to retry failed API calls
        }
    )
    return { data, ...rest }
}

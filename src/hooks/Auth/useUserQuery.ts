import { getOneUser } from '@/services/auth'
import { useQuery } from 'react-query'

const storedUserID: any = localStorage.getItem('userID')
export const useUserQuery = () => {
    //có thể có staff
    const { data, ...rest }: any = useQuery({
        queryKey: storedUserID ? ['AUTH', storedUserID] : ['AUTH'],
        queryFn: () => getOneUser(storedUserID)
    })

    const user = data?.datas
    return { user, ...rest }
}

import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import NavigationButtons from '@/components/component/Back_Next_Page'

const PageNotFound: React.FC = () => (
    <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist. (Bạn không có quyền truy cập)'
        extra={
            <Link to={'/'}>
                <Button type='primary' danger>
                    Back Home
                </Button>
                <NavigationButtons />
            </Link>
        }
    />
)

export default PageNotFound

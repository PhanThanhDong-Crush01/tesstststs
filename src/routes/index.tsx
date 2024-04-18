import BaseLayout from '@/layouts/BaseLayout'
import SigninPage from '@/pages/Client/AuthPage/SigninPage'
import SignupPage from '@/pages/Client/AuthPage/SignupPage'
import CartPage from '@/pages/Client/CartPage'
import ContactPage from '@/pages/Client/ContactPage'
import HomePage from '@/pages/Client/HomPage'
import IntroducePage from '@/pages/Client/IntroducePage'
import PaymentInformationPage from '@/pages/Client/PaymentInformationPage'
import PaymentSuccessPage from '@/pages/Client/PaymentSuccessPage'
import ProductDetailPage from '@/pages/Client/ProductDetailPage'
import ShopPage from '@/pages/Client/ShopPage'
import { Route, Routes } from 'react-router-dom'
import OrderPage from '@/pages/Client/AuthPage/OrderPage'
import LayoutUserPage from '@/components/component/LayoutUser'
import { SendOTP } from '@/components/component/SendOtp'
import OrderDetailPage from '@/pages/Client/AuthPage/OrderDetail'
import MyVoucher from '@/pages/Client/AuthPage/MyVoucher'
import PaymentVNPayComponent from '@/pages/Client/PaymentSuccessPage/PaymentPayPal'
import ChangePasswordPage from '@/pages/Client/AuthPage/ChangePassword'
import PageNotFound from '@/pages/PageNotFound'

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<BaseLayout />}>
                <Route index element={<HomePage />} />
                <Route path='products' element={<ShopPage />} />
                <Route path='products/:id' element={<ProductDetailPage />} />
                <Route path='cart' element={<CartPage />} />
                <Route path='payment_information' element={<PaymentInformationPage />} />
                <Route path='payment_method_paypalcheckout' element={<PaymentVNPayComponent />} />
                <Route path='payment_success' element={<PaymentSuccessPage />} />
                <Route path='contact' element={<ContactPage />} />
                <Route path='introduce' element={<IntroducePage />} />
                <Route path='check_order' element={<SendOTP />} />
            </Route>
            <Route path='signin' element={<SigninPage />} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='' element={<LayoutUserPage />}>
                <Route path='change_password' element={<ChangePasswordPage />} />
                <Route path='order' element={<OrderPage />} />
                <Route path='my_voucher' element={<MyVoucher />} />
                <Route path='order/order_detail/:id' element={<OrderDetailPage />} />
            </Route>

            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default Routers

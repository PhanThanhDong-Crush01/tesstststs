import { quanmkAPI, signin } from '@/services/auth'
import { sendMail } from '@/services/mail'
import { message } from 'antd'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->


    <style>
        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
            background: #f1f1f1;
        }

        /* What it does: Stops email clients resizing small text. */
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        /* What it does: Centers email on Android 4.4 */
        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }

        /* What it does: Stops Outlook from adding extra spacing to tables. */
        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        /* What it does: Fixes webkit padding issue. */
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }

        /* What it does: Uses a better rendering method when resizing images in IE. */
        img {
            -ms-interpolation-mode: bicubic;
        }

        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
        a {
            text-decoration: none;
        }

        /* What it does: A work-around for email clients meddling in triggered links. */
        *[x-apple-data-detectors],
        /* iOS */
        .unstyle-auto-detected-links *,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }

        /* What it does: Prevents Gmail from changing the text color in conversation threads. */
        .im {
            color: inherit !important;
        }

        /* If the above doesn't work, add a .g-img class to any image in question. */
        img.g-img+div {
            display: none !important;
        }

        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
        /* Create one of these media queries for each additional viewport size you'd like to fix */

        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u~div .email-container {
                min-width: 320px !important;
            }
        }

        /* iPhone 6, 6S, 7, 8, and X */
        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u~div .email-container {
                min-width: 375px !important;
            }
        }

        /* iPhone 6+, 7+, and 8+ */
        @media only screen and (min-device-width: 414px) {
            u~div .email-container {
                min-width: 414px !important;
            }
        }
    </style>

    <!-- CSS Reset : END -->

    <!-- Progressive Enhancements : BEGIN -->
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
        }

        .primary {
            background: #30e3ca;
        }

        .bg_white {
            background: #ffffff;
        }

        .bg_light {
            background: #fafafa;
        }

        .bg_black {
            background: #000000;
        }

        .bg_dark {
            background: rgba(0, 0, 0, .8);
        }

        .email-section {
            padding: 2.5em;
        }

        /*BUTTON*/
        .btn {
            padding: 10px 15px;
            display: inline-block;
        }

        .btn.btn-primary {
            border-radius: 5px;
            background: #30e3ca;
            color: #ffffff;
        }

        .btn.btn-white {
            border-radius: 5px;
            background: #ffffff;
            color: #000000;
        }

        .btn.btn-white-outline {
            border-radius: 5px;
            background: transparent;
            border: 1px solid #fff;
            color: #fff;
        }

        .btn.btn-black-outline {
            border-radius: 0px;
            background: transparent;
            border: 2px solid #000;
            color: #000;
            font-weight: 700;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            color: #000000;
            margin-top: 0;
            font-weight: 400;
        }

        body {
            font-weight: 400;
            font-size: 15px;
            line-height: 1.8;
            color: rgba(0, 0, 0, .4);
        }

        a {
            color: #30e3ca;
        }

        table {}

        /*LOGO*/

        .logo h1 {
            margin: 0;
        }

        .logo h1 a {
            color: #30e3ca;
            font-size: 24px;
            font-weight: 700;
        }

        /*HERO*/
        .hero {
            position: relative;
            z-index: 0;
        }

        .hero2 {
            position: relative;
            z-index: 0;
        }

        .hero .text {
            color: rgba(0, 0, 0, .3);
        }

        .hero .text h2 {
            color: #000;
            font-size: 40px;
            margin-bottom: 0;
            font-weight: 400;
            line-height: 1.4;
        }

        .hero .text h3 {
            font-size: 24px;
            font-weight: 300;
        }

        .hero .text h2 span {
            font-weight: 600;
            color: #30e3ca;
        }


        .heading-section h2 {
            color: #000000;
            font-size: 28px;
            margin-top: 0;
            line-height: 1.4;
            font-weight: 400;
        }

        .heading-section .subheading {
            margin-bottom: 20px !important;
            display: inline-block;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: rgba(0, 0, 0, .4);
            position: relative;
        }

        .heading-section .subheading::after {
            position: absolute;
            left: 0;
            right: 0;
            bottom: -10px;
            content: '';
            width: 100%;
            height: 2px;
            background: #30e3ca;
            margin: 0 auto;
        }

        .heading-section-white {
            color: rgba(255, 255, 255, .8);
        }

        .heading-section-white h2 {
            /* Thay thế bằng font family mong muốn */
            line-height: 1;
            /* Đây là đoạn bị thiếu trong mã của bạn */
            padding-bottom: 0;
        }


        .heading-section-white h2 {
            color: #ffffff;
        }

        .heading-section-white .subheading {
            margin-bottom: 0;
            display: inline-block;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: rgba(255, 255, 255, .4);
        }


        ul.social {
            padding: 0;
        }

        ul.social li {
            display: inline-block;
            margin-right: 10px;
        }

        /*FOOTER*/

        .footer {
            border-top: 1px solid rgba(0, 0, 0, .05);
            color: rgba(0, 0, 0, .5);
        }

        .footer .heading {
            color: #000;
            font-size: 20px;
        }

        .footer ul {
            margin: 0;
            padding: 0;
        }

        .footer ul li {
            list-style: none;
            margin-bottom: 10px;
        }

        .footer ul li a {
            color: rgba(0, 0, 0, 1);
        }

        .middleChi {
            background: rgb(253, 0, 0);
            opacity: 0.9;
            overflow: hidden;
            border-radius: 30px;
            padding: 0 10px;
            border: 6px solid rgb(219, 219, 6);
        }

        .middleChiText h3 {
            color: white;
            font-size: 20px;
            font-weight: 900;
        }

        .middleChiText h4 {
            color: white;
            font-size: 18px;
            font-weight: 700;
        }

        .middleChiText .andi:hover {
            background-color: rgb(255, 221, 0);
        }

        @media screen and (max-width: 500px) {}
    </style>


</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
    <div style="max-width: 600px; margin: 0 auto;" class="email-container">
        <div valign="middle" class="hero2 middleChi">
            <div class="text middleChiText" style="text-align: center;">
                <h3>Quên mật khuẩn đăng nhập?</h3>
                <h4>MeowDelights gửi bạn mật khẩu đăng nhập mới! Hãy đăng nhập và đổi mật khẩu ngay</h4>
                <p><a href="#" class="btn btn-primary andi">123@123</a></p>
            </div>
        </div>



    </div>
</body>

</html>`

const SigninPage = () => {
    const sendd = async (email: any) => {
        const noidung = {
            email: email,
            subject: 'MeowDelights xin trân trọng gửi đến bạn',
            html: html
        }

        const res = await quanmkAPI(email)
        if (res) {
            const data = await sendMail(noidung)
            if (data) {
                alert('Bạn hãy mở mail và lấy mất khẩu mới để đăng nhập và đổi mật khẩu ngay khi đăng nhập thành công')
            }
        }
    }
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/
        return re.test(email)
    }
    const [email, setEmail] = useState<any>()
    const onSubmit = async (data: any) => {
        if (!validateEmail(email)) {
            alert('Mời nhập đúng định dạng email!')
        }
        const values = {
            email: email,
            password: data.password
        }
        try {
            const response = await signin(values)
            if (response?.user) {
                message.success('Đăng nhập thành công')
                const user = JSON.stringify(response?.user)
                localStorage.setItem('user', user)
                localStorage.setItem('userID', response?.user?._id)
                if (response?.user?.role !== 'member') {
                    window.location.href = '/admin/bill'
                }
                if (response?.user?.role === 'member') {
                    navigate(`/updateProfile`)
                }
            }
        } catch (error: any) {
            console.log(error)
            message.warning(error?.response?.message)
        }
    }

    const [isLoading, setLoading] = useState<any>(true)

    const QuenMk = async () => {
        if (email == null) {
            alert('Mời nhập email!')
        } else if (!validateEmail(email)) {
            alert('Mời nhập đúng định dạng email!')
        } else {
            setLoading(false)
            await sendd(email)
            setLoading(true)
        }
    }

    return (
        <div className='flex flex-1 flex-col justify-center px-6 pt-10 lg:px-8 rounded-md shadow-lg relative z-10 '>
            <div
                style={{
                    width: '50%',
                    margin: '0 auto',
                    borderRadius: '10%',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    backgroundImage:
                        "url('https://res.cloudinary.com/difmqasye/image/upload/v1710874415/samples/da/unnamed_qe3fnu.jpg')"
                }}
            >
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white'>
                        Đăng nhập với MeowDelights
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm' id='mainpage'>
                    <form className='space-y-6' action='#' method='POST' onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                                Email
                            </label>
                            <div className='mt-2'>
                                <input
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    type='email'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='mt-2'>
                                <label htmlFor='' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Password
                                </label>
                                <input
                                    placeholder='Password'
                                    {...register('password')}
                                    type='password'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex' }}>
                            <span
                                className=' rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                style={{ width: '170px', marginRight: '5px', backgroundColor: 'gray', height: '40px' }}
                                onClick={QuenMk}
                            >
                                {!isLoading ? 'Loading...' : 'Quên pass?'}
                            </span>
                            <button
                                type='submit'
                                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                Đăng nhập
                            </button>
                        </div>

                        {/* <div>
                            <button
                                type='submit'
                                className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    fill='currentColor'
                                    className='bi bi-google pt-1'
                                    viewBox='0 0 16 16'
                                >
                                    <path d='M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z' />
                                </svg>
                                <p className='pl-2'>Đăng nhập với Google </p>
                            </button>
                        </div> */}
                    </form>

                    <p className='mt-10 text-center text-sm text-gray-500 pb-4'>
                        Not a member?{' '}
                        <Link to='/signup' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
                            Registered
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SigninPage

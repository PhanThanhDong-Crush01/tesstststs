import { getRandomNumber } from '@/lib/utils'
import instance from '@/services/core/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendMail } from '@/services/mail'
import { removeCartUser } from '@/services/cart'

export const SendOTP = () => {
    const [otpxacnhan, setOTPXN] = useState<any>()
    const [otpguidiTrue, setotpguidi] = useState<any>()
    const [phone, setPhone] = useState<any>()

    const [donhang, setDonHang] = useState<any>()
    useEffect(() => {
        const donghangJson = JSON.parse(localStorage.getItem('donhang') as any)
        if (donghangJson) {
            setDonHang(donghangJson)
            setPhone('84' + donghangJson?.bill?.tel.slice(1))
        }
    }, [])

    const handleOTPChange = (value: any) => {
        setOTPXN(value)
    }

    const [label, setLabel] = useState<any>(false)
    const sendOtp = async () => {
        try {
            const otpguidi = getRandomNumber()
            setotpguidi(otpguidi)
            await instance.post('/send-otp', { otp: otpguidi, phoneNumber: phone })
            setLabel(true)
        } catch (error: any) {
            alert(error?.response?.data?.message + '!')
        }
    }

    const navigate = useNavigate()
    const [userID, setUserID] = useState<any>()
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUserID(storedUserID)
        }
    }, [])
    const [idBill, setIdBill] = useState()

    const onSubmitOtp = async () => {
        if (otpxacnhan === ' ') {
            alert('Vui lòng nhập OTP!')
        } else if (Number(otpxacnhan) === 0) {
            //Number(otpxacnhan) !== otpguidiTrue
            alert('OTP không đúng, vui lòng nhập lại!')
        } else {
            alert('OTP chính xác!')
            try {
                const response = await instance.post('/bill/', donhang)
                if (response.data) {
                    alert('Tạo hóa đơn thành công!!')
                    await removeCartUser(userID)
                    setIdBill(response?.data?.data?.bill?._id)
                    localStorage.setItem('billNew', JSON.stringify(response.data))
                    localStorage.removeItem('donhang')
                    const pttt = donhang?.bill?.paymentmethods
                    if (pttt === 'Thanh toán khi nhận hàng') {
                        setTimeout(() => {
                            sendd()
                            navigate('/payment_success')
                        }, 2000) // 2 seconds delay
                    } else {
                        setTimeout(() => {
                            sendd()
                            navigate('/payment_method_paypalcheckout')
                        }, 2000) // 2 seconds delay
                    }
                }
                return response.data
            } catch (error: any) {
                alert(error?.response?.data?.message + '!')
            }
        }
    }

    const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->


    <!-- CSS Reset : BEGIN -->
    <style>
        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
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
                <h3>Chúc mừng bạn đã đặt hàng thành công</h3>
                <h4>Cảm ơn bạn đã ủng hộ cho sự phát triển của MeowDelights! Bạn có thể theo dõi đơn hàng của mình bằng
                    cách click vào nút bên dưới</h4>
                <p><a href=${`http://localhost:5173/order/${
                    idBill ? idBill : ''
                }`} class="btn btn-primary andi">Đi đến xem đơn hàng</a></p>
            </div>
        </div>
        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
            style="margin: auto;">

            <tr>
                <td valign="middle" class="hero bg_white" style="padding: 3em 0 2em 0;">
                    <img src="https://res.cloudinary.com/dsi8kycrz/image/upload/v1712268264/meo_order_success.png"
                        alt=""
                        style="width: 100%; height: auto; margin: auto; display: block;">
                </td>
            </tr><!-- end tr -->

            <tr>
                <td class="bg_light" style="text-align: center;">
                    <p>Đây là email tự động! <a href="#"
                            style="color: rgba(0,0,0,.8);">Vui lòng không trả lời email</a></p>
                </td>
            </tr>
        </table>


    </div>
</body>

</html>`

    const sendd = async () => {
        const noidung = {
            email: donhang?.bill?.email,
            subject: 'MeowDelights xin trân trọng thông báo đến bạn',
            html: html
        }

        await sendMail(noidung)
    }

    return (
        <div style={{ margin: '0 auto', marginTop: '50px' }}>
            <div className='section pt-0'>
                <div className='container'>
                    <div className='section-title centered'>
                        <h1 className='title' style={{ fontSize: '30px' }}>
                            Nhập OTP để xác nhận đơn hàng
                        </h1>
                    </div>
                    <div
                        className='sigma_form style-2'
                        style={{
                            width: '300px',
                            height: '300px',
                            border: '1px soild gray',
                            borderColor: 'gray',
                            borderRadius: '10%',
                            margin: '0 auto'
                        }}
                    >
                        <div className='grid gap-2'>
                            <label htmlFor='username'>
                                {!label ? (
                                    <span>Nhấn gửi để nhận mã OTP</span>
                                ) : (
                                    <span>
                                        OTP đã được gửi đến số điện thoại {phone.replace(/\d(?=\d{4})/g, '*')}, hãy mở
                                        hộp thư trên điện thoại và xác nhận OTP ở đây!
                                    </span>
                                )}
                            </label>
                            <input
                                id='otpxacnhan'
                                placeholder='123456'
                                onChange={(e: any) => handleOTPChange(e.target.value)}
                            />
                            <div style={{ display: 'flex' }}>
                                <button
                                    style={{
                                        color: 'black',
                                        backgroundColor: 'white',
                                        border: '0.5px solid gray',
                                        width: '30px'
                                    }}
                                    onClick={sendOtp}
                                >
                                    Gửi
                                </button>
                                <button
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'blue',
                                        width: '100%',
                                        marginLeft: '10px'
                                    }}
                                    onClick={onSubmitOtp}
                                >
                                    Check
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

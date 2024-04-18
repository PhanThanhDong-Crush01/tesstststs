import FooterTemplate from '@/components/component/Footer'
import MenuClientComponent from '@/components/component/MenuClientComponent'
import { Link } from 'react-router-dom'

const IntroducePage = () => {
    return (
        <div className='btn-style-5 sigma_header-absolute btn-rounded sidebar-style-3'>
            <MenuClientComponent />
            <div className='search-form-wrapper'>
                <div className='search-trigger sigma_close'>
                    <span></span>
                    <span></span>
                </div>
                <form className='search-form' method='post'>
                    <input type='text' placeholder='Search...' value='' />
                    <button type='submit' className='search-btn'>
                        <i className='fal fa-search m-0'></i>
                    </button>
                </form>
            </div>

            <div className='sigma_subheader style-5 bg-gray'>
                <div className='container'>
                    <div className='sigma_subheader-inner'>
                        <h1>VỀ CHÚNG TÔI</h1>
                    </div>
                    <ol className='breadcrumb'>
                        <li className='breadcrumb-item'>
                            <a className='btn-link' href='#'>
                                Trang chủ
                            </a>
                        </li>
                        <li className='breadcrumb-item active' aria-current='page'>
                            Về chúng tôi
                        </li>
                    </ol>
                </div>

                <img src='src/assets/img/subheader-br.png' className='br' alt='subheader' />
                <img src='src/assets/img/subheader-bl.png' className='bl' alt='subheader' />
                <img src='src/assets/img/subheader-tr.png' className='tr' alt='subheader' />
            </div>
            <div className='section section-padding'>
                <div className='container'>
                    <div className='row align-items-center mb-5'>
                        <div className='col-lg-5'>
                            <div className='section-title'>
                                <h3 className='title mb-0'>Chính sách đặc biệt ở MeowDelights</h3>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <p className='mb-0'>
                                Chúng tôi hi vọng rằng chính sách mua hàng và hủy hàng của chúng tôi sẽ giúp bạn có trải
                                nghiệm mua sắm trực tuyến thoải mái và dễ dàng nhất. Nếu có bất kỳ câu hỏi hoặc yêu cầu
                                nào, vui lòng liên hệ với chúng tôi. Cảm ơn bạn đã lựa chọn MeowDelights!
                            </p>
                        </div>
                        <div className='col-lg-3 text-lg-right'>
                            <Link to={'/contact'}>
                                <a className='sigma_btn mt-4 mt-lg-0'>Đặt lịch hẹn</a>
                            </Link>
                        </div>
                    </div>
                    <div className='sigma_info-wrapper style-25'>
                        <h1 style={{ fontSize: '23px', fontWeight: 700, marginTop: '20px', marginBottom: '10px' }}>
                            Chính sách Mua Hàng và Hủy Hàng:
                        </h1>
                        <li style={{ paddingLeft: '10px' }}>
                            <u style={{ fontSize: '17px', fontWeight: 500, marginBottom: '10px' }}>Đặt Hàng:</u> Quý
                            khách có thể dễ dàng đặt hàng trực tuyến thông qua trang web của chúng tôi. Chúng tôi cung
                            cấp một loạt các sản phẩm chất lượng, từ phụ kiện như áo len và chuồng cho mèo đến các loại
                            đồ ăn dinh dưỡng, đáp ứng mọi nhu cầu của thú cưng của bạn.
                        </li>
                        <li style={{ paddingLeft: '10px' }}>
                            <u style={{ fontSize: '17px', fontWeight: 500, marginBottom: '10px' }}>Thanh Toán:</u> Chúng
                            tôi chấp nhận thanh toán an toàn qua nhiều phương thức khác nhau để đảm bảo sự thuận tiện và
                            an toàn cho bạn.
                        </li>
                        <li style={{ paddingLeft: '10px' }}>
                            <u style={{ fontSize: '17px', fontWeight: 500, marginBottom: '10px' }}>Giao Hàng:</u> Sau
                            khi nhận đơn hàng của bạn, chúng tôi sẽ nhanh chóng xử lý và giao hàng tận nơi. Chúng tôi
                            cam kết cung cấp dịch vụ giao hàng nhanh chóng và đáng tin cậy để bạn và thú cưng của bạn có
                            thể nhận được sản phẩm một cách nhanh chóng.
                        </li>
                        <li style={{ paddingLeft: '10px' }}>
                            <u style={{ fontSize: '17px', fontWeight: 500, marginBottom: '10px' }}>Hủy Hàng:</u> Quý
                            khách có thể hủy đơn hàng của mình trước khi đơn hàng được giao. Đối với các đơn hàng đã
                            được giao, chúng tôi chỉ chấp nhận hủy hàng nếu đơn hàng của bạn vẫn đang ở trạng thái "Chờ
                            Xác Nhận" hoặc "Đang Chuẩn Bị Hàng".
                        </li>
                        <h1 style={{ fontSize: '23px', fontWeight: 700, marginTop: '20px', marginBottom: '10px' }}>
                            Chính sách Đăng Ký Tài Khoản và Bảo Mật:
                        </h1>
                        <li style={{ paddingLeft: '10px' }}>
                            <u style={{ fontSize: '17px', fontWeight: 500, marginBottom: '10px' }}>
                                Đăng Ký Tài Khoản:
                            </u>{' '}
                            Quý khách có thể đăng ký tài khoản trên trang web của chúng tôi để tiện lợi hơn trong quá
                            trình mua sắm và theo dõi đơn hàng.
                        </li>
                        <li style={{ paddingLeft: '10px' }}>
                            <u style={{ fontSize: '17px', fontWeight: 500, marginBottom: '10px' }}>
                                Bảo Mật Thông Tin:
                            </u>{' '}
                            Chúng tôi cam kết bảo vệ thông tin cá nhân của quý khách. Mọi thông tin được thu thập sẽ
                            được bảo quản và sử dụng một cách an toàn và tuân thủ theo các quy định về bảo mật.
                        </li>
                        <h1 style={{ fontSize: '23px', fontWeight: 700, marginTop: '20px', marginBottom: '10px' }}>
                            Chính Sách Hỗ Trợ:
                        </h1>
                        <li style={{ paddingLeft: '10px' }}>
                            <u style={{ fontSize: '17px', fontWeight: 500, marginBottom: '10px' }}>
                                Hỗ Trợ Khi Lỡ Mua Nhầm Hàng:
                            </u>{' '}
                            Trong trường hợp quý khách lỡ mua nhầm hàng, chúng tôi sẽ cung cấp hỗ trợ và giải quyết vấn
                            đề một cách nhanh chóng và linh hoạt nhất có thể.
                        </li>
                        <li style={{ paddingLeft: '10px' }}>
                            <u style={{ fontSize: '17px', fontWeight: 500, marginBottom: '10px' }}>
                                Chính Sách Liên Hệ Tư Vấn:
                            </u>{' '}
                            Chúng tôi luôn sẵn lòng hỗ trợ và tư vấn cho quý khách về bất kỳ vấn đề nào liên quan đến
                            sản phẩm, dịch vụ hoặc quy trình mua hàng. Quý khách có thể liên hệ với chúng tôi thông qua
                            số điện thoại, email hoặc các phương tiện liên lạc khác được cung cấp trên trang web của
                            chúng tôi.
                        </li>
                        <h1 style={{ fontSize: '23px', fontWeight: 700, marginTop: '20px', marginBottom: '10px' }}>
                            Chúng tôi hy vọng rằng những chính sách và quy định trên sẽ giúp quý khách có trải nghiệm
                            mua sắm trực tuyến tốt nhất tại MeowDelights. Nếu có bất kỳ câu hỏi hoặc yêu cầu hỗ trợ nào,
                            vui lòng liên hệ với chúng tôi. Cảm ơn bạn đã tin tưởng
                        </h1>
                    </div>
                </div>
            </div>

            <div className='section bg-secondary-1' style={{ backgroundImage: 'url(assets/img/pattern.png)' }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-5 order-2 order-lg-1'>
                            <div className='sigma_about style-21'>
                                <div className='section-title'>
                                    <h3 className='title text-white'>
                                        Tại sao phải chọn phụ kiện và thức ăn tốt cho thú cưng của bạn?
                                    </h3>
                                </div>
                                <div className='sigma_about-content'>
                                    <br />
                                    <p>
                                        Vì sức khỏe và hạnh phúc của thú cưng phụ thuộc lớn vào chế độ dinh dưỡng và môi
                                        trường sống của chúng.
                                        <br /> Phụ kiện và thức ăn chất lượng không chỉ giữ cho thú cưng khỏe mạnh mà
                                        còn giúp chúng phát triển đúng cách. <br />
                                        Chăm sóc cẩn thận cho thú cưng không chỉ là trách nhiệm của chúng ta, mà còn là
                                        biểu hiện của tình yêu và sự quan tâm đến thành viên của gia đình nhỏ của chúng
                                        ta.
                                    </p>
                                    <div className='sigma_info style-15'>
                                        <div className='sigma_info-title'>
                                            <i className='flaticon-stethoscope sigma_info-icon'></i>
                                        </div>
                                        <div className='sigma_info-description'></div>
                                    </div>
                                    <div className='sigma_info style-15 mb-0'>
                                        <div className='sigma_info-title'>
                                            <i className='flaticon-group sigma_info-icon'></i>
                                        </div>
                                        <div className='sigma_info-description'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 offset-lg-1 order-1 order-lg-2'>
                            <div className='sigma_about style-21 mt-0 w-100 h-100'>
                                <div className='sigma_about-image-1'>
                                    <img src='src/assets/img/home-1/400x280.jpg' alt='img' />
                                </div>
                                <div className='sigma_about-image-2 d-none d-sm-block'>
                                    <img src='src/assets/img/home-1/370x250.jpg' alt='img' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='section section-padding p-0'>
                <div className='container-fluid p-0'>
                    <div className='sigma_instagram style-1 insta-images'>
                        <div className='' style={{ display: 'flex' }}>
                            <a href='#'>
                                <img src='src/assets/img/about-us/376x430.jpg' alt='img' style={{ width: '100%' }} />
                            </a>
                            <a href='#'>
                                <img src='src/assets/img/about-us/376x430-0.jpg' alt='img' style={{ width: '100%' }} />
                            </a>
                            <a href='#'>
                                <img src='src/assets/img/about-us/376x430-1.jpg' alt='img' style={{ width: '100%' }} />
                            </a>
                            <a href='#'>
                                <img src='src/assets/img/about-us/376x430-2.jpg' alt='img' style={{ width: '100%' }} />
                            </a>
                            <a href='#'>
                                <img src='src/assets/img/about-us/376x430-3.jpg' alt='img' style={{ width: '100%' }} />
                            </a>
                            <a href='#'>
                                <img src='src/assets/img/about-us/376x430-4.jpg' alt='img' style={{ width: '100%' }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <FooterTemplate />
        </div>
    )
}

export default IntroducePage

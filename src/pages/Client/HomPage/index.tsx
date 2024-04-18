import MenuClientComponent from '@/components/component/MenuClientComponent.js'
import FooterTemplate from '@/components/component/Footer.js'
import { useEffect, useState } from 'react'
import { IProduct } from '@/interface/IProduct'
import instance from '@/services/core/api'
import { useCategoryQuery } from '@/hooks/Category/useCategoryQuery'
import { Button } from 'antd'
import ProductDialogPage from '../ShopPage/productDialog'
import { useForm } from 'react-hook-form'

const HomePage = () => {
    const [dataProduct, setDataProduct] = useState<IProduct[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get('/products')
                const dataPro = response.data?.datas || []

                // Sort products by createdAt (newest to oldest)
                dataPro.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

                const formattedData = dataPro.map((item: any, index: any) => ({
                    ...item,
                    key: index + 1
                }))
                setDataProduct(formattedData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])
    const dataProductTrue = dataProduct.filter((item: any) => {
        return item.status === true
    })
    const { data }: any = useCategoryQuery()

    // Lấy 4 sản phẩm đầu tiên từ mảng dataProductTrue
    const productFour = dataProductTrue.slice(0, 4)

    const [productEight, setProductEight] = useState<any>()
    useEffect(() => {
        setProductEight(dataProductTrue.slice(0, 8))
    }, [dataProduct])

    const locCate = (idcate: any) => {
        const proLoc = dataProduct.filter((item: any) => {
            if (item.idCategory === idcate && item.status === true) {
                return item
            }
        })
        if (proLoc) {
            setProductEight(proLoc)
        }
    }

    const { register, handleSubmit, errors }: any = useForm()

    return (
        <>
            <div className='sigma_header-absolute btn-style-5 btn-rounded sidebar-style-3'>
                <MenuClientComponent />
                <div className='search-form-wrapper'>
                    <div className='search-trigger sigma_close'>
                        <span></span>
                        <span></span>
                    </div>
                    <form className='search-form' method='post'>
                        <input type='text' placeholder='Tìm kiếm...' value='' />
                        <button type='submit' className='search-btn'>
                            <i className='fal fa-search m-0' />
                        </button>
                    </form>
                </div>
                <div className='sigma_banner light-bg style-10 bg-cover'>
                    <img src='src/assets/img/tr.png' className='tr' alt='img' />
                    <img src='src/assets/img/br.png' className='br' alt='img' />
                    <img src='src/assets/img/bl.png' className='bl' alt='img' />
                    <div className='banner-slider-inner'>
                        <div className='sigma_banner-text'>
                            <div className='container'>
                                <div className='row align-items-center'>
                                    <div className='col-lg-6'>
                                        <h5 className='primary-color'></h5>
                                        <h1 className='title'>Chào mừng bạn đến với Meows DeLights</h1>
                                        {/* <div className='banner-links d-flex align-items-center'>
                                            <a href='contact-us.html' className='sigma_btn'>
                                                Nhận báo cáo
                                            </a>
                                            <a href='about-us.html' className='sigma_btn light ml-4'>
                                                Đọc thêm
                                            </a>
                                        </div> */}
                                    </div>
                                    <div className='col-lg-6 d-none d-lg-block'>
                                        <div className='sigma_banner-image mt-5 mt-lg-0'>
                                            <img src='src/assets/img/home-2/540x540.jpg' alt='img' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='section section-padding pt-3'>
                    <div className='container'>
                        <div className='section-title centered'>
                            <span className='subtitle'>Xu huớng</span>
                            <h3 className='title mb-0'>Sản phẩm hàng đầu của chúng tôi</h3>
                        </div>
                        <div className='row'>
                            {productFour &&
                                productFour.map((pro: any) => (
                                    <div className='col-lg-3 col-md-6'>
                                        <div className='sigma_product style-8'>
                                            <div className='sigma_product-thumb'>
                                                <a href={'products/' + pro?._id}>
                                                    <img src={pro?.image} alt='product' />
                                                </a>
                                                <div className='sigma_product-controls'>
                                                    <p data-toggle='tooltip' title='Wishlist'>
                                                        <i className='far fa-heart' />
                                                    </p>
                                                    <a href='#' data-toggle='tooltip' title='Add To Cart'>
                                                        <i className='far fa-shopping-basket' />
                                                    </a>
                                                    <p data-toggle='tooltip' title='Quick View'>
                                                        <i
                                                            data-toggle='modal'
                                                            data-target='#quickViewModal'
                                                            className='far fa-eye'
                                                        />
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='sigma_product-body'>
                                                <h5 className='sigma_product-title'>
                                                    <a href='#'>{pro?.name}</a>
                                                </h5>

                                                <div className='sigma_product-price'>
                                                    <span>{pro?.minPrice}</span>
                                                    <span>{pro?.maxPrice}</span>
                                                    <i>VNĐ</i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className='section section-padding pt-0'>
                    <div className='container'>
                        <div className='section-title centered pt-5'>
                            {/* <span className='subtitle'>Xu hướng</span> */}
                            <h3 className='title mb-0'>Đồ dùng cho thú cưng</h3>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='sigma_tab-item style-2 with-dots'>
                                    <ul className='nav nav-tabs' id='myTab' role='tablist'>
                                        {data?.data &&
                                            data?.data.map((cate: any) => (
                                                <li
                                                    className='nav-item'
                                                    onClick={() => locCate(cate._id)}
                                                    key={cate?._id}
                                                >
                                                    <a
                                                        className='nav-link active'
                                                        id='photo-tab'
                                                        data-toggle='tab'
                                                        href='#photo'
                                                        role='tab'
                                                        aria-controls='photo'
                                                        aria-selected='true'
                                                    >
                                                        <span className='pulsive-dot'></span>
                                                        {cate?.name}
                                                    </a>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                            <div className='tab-content col-12' id='myTabContent'>
                                <div
                                    className='tab-pane fade show active'
                                    id='photo'
                                    role='tabpanel'
                                    aria-labelledby='photo-tab'
                                >
                                    <div className='row'>
                                        {productEight &&
                                            productEight.map((pro: any) => (
                                                <div className='col-lg-3 col-md-6' key={pro?._id}>
                                                    <div className='sigma_product style-8'>
                                                        <div className='sigma_product-thumb'>
                                                            <a href={'products/' + pro?._id}>
                                                                <img src={pro?.image} alt='anh' />
                                                            </a>
                                                            <div className='sigma_product-controls'>
                                                                <p data-toggle='tooltip' title='Wishlist'>
                                                                    <i className='far fa-heart' />
                                                                </p>
                                                                <a href='#' data-toggle='tooltip' title='Add To Cart'>
                                                                    <i className='far fa-shopping-basket' />
                                                                </a>
                                                                <p data-toggle='tooltip' title='Quick View'>
                                                                    <i
                                                                        data-toggle='modal'
                                                                        data-target='#quickViewModal'
                                                                        className='far fa-eye'
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='sigma_product-body'>
                                                            <h5 className='sigma_product-title'>
                                                                <a href={'products/' + pro?._id}>{pro?.name}</a>
                                                            </h5>

                                                            <div className='sigma_product-price'>
                                                                <span>{pro?.minPrice} </span>
                                                                <span>{pro?.maxPrice} </span>
                                                                <i> VNĐ </i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='section section-padding'>
                    <div className='container'>
                        <div className='section-title centered'>
                            <span className='subtitle'>Phụ kiện và thức ăn</span>
                            <h3 className='title mb-0'>Mọi thứ thú cưng của bạn cần</h3>
                        </div>
                        <div className='row'>
                            {productFour &&
                                productFour.map((item: any) => (
                                    <div className='col-lg-3 col-md-6'>
                                        <div className='sigma_product style-6'>
                                            <div className='sigma_product-thumb'>
                                                <a href={'products/' + item?._id}>
                                                    <img src={item?.image} alt='product' />
                                                </a>
                                            </div>
                                            <div className='sigma_product-body'>
                                                <h5 className='sigma_product-title'>
                                                    <a href='#'>{item?.name}</a>
                                                </h5>

                                                <div className='sigma_product-price'>
                                                    <span>{item?.minPrice}</span>
                                                    <span>{item?.maxPrice}</span>
                                                    <i>VNĐ</i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                <div className='section'>
                    <div className='container'>
                        <div className='row justify-content-end position-relative'>
                            <div
                                className='sigma_contact-image style-6 d-none d-lg-block'
                                style={{
                                    width: '50%',
                                    marginTop: '5%'
                                }}
                            >
                                <img src='src/assets/img/home-2/480x590.jpg' alt='img' style={{ width: '70%' }} />
                            </div>
                            <div
                                className='col-lg-8 '
                                style={{
                                    width: '100%'
                                }}
                            >
                                <div className='sigma_form style-6'>
                                    <div className='section-title'>
                                        <h3 className='title mb-1 text-white'>Liên lạc</h3>
                                        <p className='text-white'>Chúng tôi sẽ rất vui để hỗ trợ bạn</p>
                                    </div>
                                    <form method='post'>
                                        <div className='d-flex'>
                                            <div className='form-group' style={{ width: '48%' }}>
                                                <i className='fal fa-user' />
                                                <input
                                                    type='text'
                                                    name='name'
                                                    placeholder='Tên'
                                                    {...register('name', { required: true })}
                                                />
                                                {errors?.name && <p className='text-red-500'>Tên là trường bắt buộc</p>}
                                            </div>
                                            <div className='form-group ml-6' style={{ width: '48%' }}>
                                                <i className='fal fa-user' />
                                                <input
                                                    type='text'
                                                    name='phone'
                                                    placeholder='Số điện thoại'
                                                    {...register('phone', {
                                                        required: true,
                                                        pattern: /^(0)[0-9]{9,10}$/
                                                    })}
                                                />
                                                {errors?.phone && errors?.phone.type === 'required' && (
                                                    <p className='text-red-500'>Số điện thoại là trường bắt buộc</p>
                                                )}
                                                {errors?.phone && errors?.phone.type === 'pattern' && (
                                                    <p className='text-red-500'>Số điện thoại không hợp lệ</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <i className='fal fa-envelope' />
                                            <input
                                                type='email'
                                                name='email'
                                                placeholder='Email'
                                                {...register('email', { required: true })}
                                            />
                                            {errors?.email && <p className='text-red-500'>Email là trường bắt buộc</p>}
                                        </div>
                                        <div className='form-group'>
                                            <i className='fal fa-envelope' />
                                            <input
                                                type='text'
                                                name='title'
                                                placeholder='Tiêu đề'
                                                {...register('title', { required: true })}
                                            />
                                            {errors?.title && (
                                                <p className='text-red-500'>Tiêu đề là trường bắt buộc</p>
                                            )}
                                        </div>
                                        <div className='form-group'>
                                            <textarea
                                                name='message'
                                                rows={5}
                                                style={{ paddingLeft: '20px', paddingTop: '10px' }}
                                                placeholder='Tin nhắn'
                                                {...register('message', { required: true })}
                                            ></textarea>
                                            {errors?.message && (
                                                <p className='text-red-500'>Tin nhắn là trường bắt buộc</p>
                                            )}
                                        </div>
                                        <button type='submit' className='btn btn-block secondary'>
                                            Gửi
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='modal fade sigma_quick-view-modal' id='quickViewModal' role='dialog' aria-hidden='true'>
                    <div className='modal-dialog modal-lg modal-dialog-centered' role='document'>
                        <div className='modal-content'>
                            <div className='modal-body sigma_modal-sec'>
                                <div className='sigma_close' data-dismiss='modal'>
                                    <span></span>
                                    <span></span>
                                </div>

                                <div className='row sigma_product-single'>
                                    <div className='col-md-6'>
                                        <div className='sigma_product-single-thumb'>
                                            <img src='src/assets/img/shop/quick-view.png' alt='product' />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='sigma_product-single-content'>
                                            <div className='sigma_product-price'>
                                                <span>352$</span>
                                                <span>245$</span>
                                            </div>

                                            <hr />

                                            <p className='sigma_product-excerpt'>
                                                We love every pet, so your pet feel relaxed and stress free. We take
                                                pride in giving you and your pet personalized attention. Our
                                                professional team provide exceptional grooming service,
                                            </p>

                                            <div className='sigma_product-meta'>
                                                <p>
                                                    <strong>
                                                        Product SKU: <span>#3382dk</span>
                                                    </strong>
                                                </p>
                                                <p>
                                                    <strong>
                                                        Availablity: <span>In Stock</span>
                                                    </strong>
                                                </p>
                                                <p>
                                                    <strong>Tags: </strong> <a>Fashion</a>,<a>ClassNameic</a>
                                                </p>
                                            </div>

                                            <hr />

                                            <form className='sigma_product-atc-form'>
                                                <div className='sigma_product-buttons d-block'>
                                                    <a href='#' className='ml-0 btn-block sigma_btn'>
                                                        Buy Now <i className='far fa-shopping-basket' />
                                                    </a>
                                                    <a href='#' className='ml-0 btn-block sigma_btn light'>
                                                        Wishlist <i className='far fa-heart' />
                                                    </a>
                                                    <a href='#' className='ml-0 btn-block sigma_btn light'>
                                                        Compare <i className='far fa-compress' />
                                                    </a>
                                                </div>
                                            </form>

                                            <div className='sigma_post-single-meta'>
                                                <div className='sigma_post-single-meta-item sigma_post-share'>
                                                    <h5>Share</h5>
                                                    <ul className='sigma_sm'>
                                                        <li>
                                                            <a>
                                                                <i className='fab fa-facebook-f' />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a>
                                                                <i className='fab fa-linkedin-in' />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a>
                                                                <i className='fab fa-twitter' />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a>
                                                                <i className='fab fa-youtube' />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterTemplate />
            </div>
        </>
    )
}

export default HomePage

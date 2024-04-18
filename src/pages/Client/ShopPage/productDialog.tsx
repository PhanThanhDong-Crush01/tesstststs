import { useCartMutation } from '@/hooks/Cart/useCartMutation'
import { useProductQuery } from '@/hooks/Product/useProductQuery'
import { formatPriceBootstrap } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const ProductDialogPage = ({ id }: any) => {
    const productDialog = useProductQuery(id)

    const { register, handleSubmit } = useForm()
    const uniqueColorsWithImage = productDialog?.data?.typeProduct?.reduce((unique: any, item: any) => {
        if (!unique.some((color: any) => color.color === item.color)) {
            unique.push({
                color: item.color,
                image: item.image // Thêm link ảnh vào đây
            })
        }
        return unique
    }, [])
    const uniqueSizes = [...new Set(productDialog?.data?.typeProduct?.map((itemSize: any) => itemSize.size))]
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedQuantity, setSelectedQuantity] = useState<any>()
    const [selectedPrice, setSelectedPrice] = useState<number | null>(0)
    const [TypeProductID, setTypeProductID] = useState<string | null>(null)
    const [imageChinh, setImageChinh] = useState<any>('')
    useEffect(() => {
        setImageChinh(productDialog?.data?.data?.image)
        setSelectedPrice(productDialog?.data?.minPrice)
    }, [productDialog])
    const handleColorChange = (color: string, image: string) => {
        setSelectedColor(color)
        setImageChinh(image)
        updatePrice(color, selectedSize)
        updateQuantily(color, selectedSize)
    }

    const handleSizeChange = (size: string) => {
        setSelectedSize(size)
        updatePrice(selectedColor, size)
        updateQuantily(selectedColor, size)
    }
    const updatePrice = (color: string, size: string) => {
        const selectedTypeProduct = productDialog?.data?.typeProduct?.find(
            (item: any) => item.color === color && item.size === size
        )

        if (selectedTypeProduct) {
            setSelectedPrice(selectedTypeProduct.price)
            setTypeProductID(selectedTypeProduct._id)
        } else {
            setSelectedPrice(null)
        }
    }
    const [selectedTypeProductDaChon, setSelectedTypeProductDaChon] = useState<any>()
    const updateQuantily = (color: string, size: string) => {
        const selectedTypeProduct = productDialog?.data?.typeProduct?.find(
            (item: any) => item.color === color && item.size === size
        )

        if (selectedTypeProduct) {
            setSelectedQuantity(selectedTypeProduct.quantity)
            setTypeProductID(selectedTypeProduct._id)
            setSelectedTypeProductDaChon(selectedTypeProduct)
        } else {
            setSelectedQuantity(0)
        }
    }

    const { onSubmit } = useCartMutation({
        action: 'ADD',
        onSuccess: () => {
            alert('Thêm sản phẩm vào giỏ hàng thành công!!')
        }
    })

    const storedUserID = localStorage.getItem('userID')

    const onHandleSubmit = (data: any) => {
        if (selectedColor === '') {
        } else if (selectedSize === '') {
        } else if (data.quantity > selectedQuantity) {
        } else {
            const cart = {
                iduser: storedUserID || '',
                idpro: id,
                idprotype: TypeProductID,
                quantity: Number(data.quantity),
                imageTypePro: imageChinh,
                nameTypePro: selectedColor + ' - ' + selectedSize,
                namePro: productDialog?.data?.data?.name,
                money: selectedPrice
            }

            if (storedUserID) {
                onSubmit(cart)
            } else {
            }
        }
    }

    return (
        <div className='my-5 mx-12 h-96'>
            {' '}
            <form action='' onSubmit={handleSubmit(onHandleSubmit)}>
                <div className='row '>
                    <div className='col-lg-5 col-md-6'>
                        <div className='sigma_product-single-thumb mb-lg-30 flex flex-row gap-2'>
                            {/* <div className=' flex flex-col gap-2 w-1/3'>
                                {uniqueColorsWithImage &&
                                    uniqueColorsWithImage.map((item: any) => (
                                        <img
                                            key={item.image}
                                            {...register('imageTypePro')}
                                            className=''
                                            src={item.image}
                                            alt='product'
                                            onClick={() => setImageChinh(item.image)}
                                        />
                                    ))}
                            </div> */}
                            <div className='slider w-2/3'>
                                <img src={imageChinh} alt='product' />
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-7 col-md-6'>
                        <div className='sigma_product-single-content'>
                            <div className='flex flex-row gap-3'>
                                <span style={{ display: 'block', fontSize: '18px' }}>
                                    {productDialog.data?.data?.name}
                                </span>

                                {selectedPrice !== null && (
                                    <p className='text-2xl pt-3'>
                                        {/* Giá: */}
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: formatPriceBootstrap(Number(selectedPrice))
                                            }}
                                        ></span>
                                    </p>
                                )}
                            </div>

                            <hr />

                            <div className='sigma_product-meta text-base'>
                                <h2 className='flex flex-row gap-1 pb-3'>
                                    Mã sản phẩm <span>{productDialog?.data?.data?._id}</span>
                                </h2>
                                <strong hidden>
                                    Tên sản phẩm <span {...register('namePro')}>{productDialog?.data?.data?.name}</span>
                                </strong>
                                <p>
                                    <strong className='flex items-baseline  border-slate-200'>
                                        <div className='space-x-2 flex text-sm'>
                                            <span className='pt-1  font-sans pr-9'>Loại</span>
                                            {uniqueColorsWithImage &&
                                                uniqueColorsWithImage.map((itemColor: any) => (
                                                    <label key={itemColor.color}>
                                                        <input
                                                            {...register('nameTypePro')}
                                                            className='sr-only peer '
                                                            name='color'
                                                            type='radio'
                                                            value={itemColor.color}
                                                            onChange={() =>
                                                                handleColorChange(itemColor.color, itemColor.image)
                                                            }
                                                        />
                                                        <div
                                                            className='rounded-sm  text-slate-700 peer-checked:font-semibold peer-checked:bg-yellow-600 peer-checked:text-white '
                                                            style={{
                                                                width: '100%',
                                                                padding: '3px',
                                                                margin: '5px',
                                                                border: '1px solid #EEEEEE'
                                                                // fontSize: '10px'
                                                            }}
                                                        >
                                                            {itemColor.color}
                                                        </div>
                                                    </label>
                                                ))}
                                        </div>
                                    </strong>
                                </p>
                                <p>
                                    <strong className='flex items-baseline  border-b border-slate-200'>
                                        <div className='space-x-2 flex text-sm gap-3 '>
                                            <span className='pt-1  font-sans pr-5'>Kích cỡ</span>
                                            {uniqueSizes.map((size: any) => (
                                                <label key={size}>
                                                    <input
                                                        {...register('nameTypePro')}
                                                        className='sr-only peer'
                                                        name='size'
                                                        type='radio'
                                                        value={size}
                                                        onChange={() => handleSizeChange(size)}
                                                    />
                                                    <div
                                                        className='rounded-sm flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-yellow-600 peer-checked:text-white px-2'
                                                        style={{
                                                            width: '100%',
                                                            padding: '3px',
                                                            border: '1px solid #EEEEEE'
                                                        }}
                                                    >
                                                        {size}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </strong>
                                </p>

                                <p>
                                    <strong className='flex items-baseline  border-b border-slate-200 pb-2 gap-3'>
                                        <div className='space-x-2 flex flex-row gap-2 text-sm gap-2 '>
                                            <span className='pt-1  font-sans '>Số lượng</span>
                                            <input
                                                {...register('quantity')}
                                                className='sr-only peer '
                                                name='quantity'
                                                type='number'
                                                min={1}
                                                defaultValue={1}
                                            />
                                        </div>
                                        <div className=' flex flex-row gap-2 pt-1'>
                                            <h2
                                                className=' w-10 h-3 text-base'
                                                dangerouslySetInnerHTML={{
                                                    __html: Number(
                                                        selectedQuantity || selectedQuantity == 0
                                                            ? selectedQuantity
                                                            : Number(productDialog?.data?.totalQuantity)
                                                    )
                                                }}
                                            ></h2>

                                            <span className='text-xs'>sản phẩm có sẵn</span>
                                        </div>
                                    </strong>
                                </p>
                            </div>

                            <div className='sigma_product-atc-form pt-2 '>
                                <div className='sigma_product-buttons'>
                                    <button
                                        type='submit'
                                        className='ms-0 sigma_btn'
                                        style={{ backgroundColor: '#FFCC01' }}
                                    >
                                        Thêm giỏi hàng <i className='far fa-shopping-basket'></i>
                                    </button>
                                </div>
                            </div>

                            <div className='sigma_post-single-meta'></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProductDialogPage

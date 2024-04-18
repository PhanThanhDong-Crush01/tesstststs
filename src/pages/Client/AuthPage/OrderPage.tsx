import React, { useEffect, useRef, useState } from 'react'
import { Button, Image, Input, Space, Table, Tabs } from 'antd'
import type { InputRef, TableColumnType, TableProps, TabsProps } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Link, useNavigate } from 'react-router-dom'
import { useBillQuery } from '@/hooks/Bill/useBillQuery'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { formatPrice } from '@/lib/utils'
import { useWhyCancelOrder } from '@/hooks/Bill/useWhyCancelOrder'
import { FcNext } from 'react-icons/fc'
import ThanhToanSau from '../PaymentSuccessPage/ThanhToanSau'
interface DataType {
    key: string
    _id: string
    iduser: string
    nameUser: string
    email: string
    tel: number
    address: string
    idvc: string
    nameVc: string
    decreaseVc: number
    date: any
    money: number
    paymentmethods: string
    paymentstatus: string
    orderstatus: string
    createdAt: any
    updatedAt: any
    totalQuantity: number
    billDetails: any[]
}
type DataIndex = keyof DataType
const OrderPage: React.FC = () => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)
    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }
    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText('')
    }
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()} placeholder='Tìm kiếm...'>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={'Tim'}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            confirm({ closeDropdown: false })
                            setSearchText((selectedKeys as string[])[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            close()
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => 'Loc',
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        }
    })
    const [userID, setUserID] = useState<string | null>(null)
    const [selectedTab, setSelectedTab] = useState<string>('1')
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID')
        if (storedUserID) {
            setUserID(storedUserID)
        }
    }, [])
    const { data } = useBillQuery(userID || '')
    const [filteredData, setfilteredData] = useState<any>()
    const [soDonHangChoXacNhan, setsoDonHangChoXacNhan] = useState<any>(0)
    const [soDonHangDangChuanBiHang, setsoDonHangDangChuanBiHang] = useState<any>(0)
    const [soDonHangGiao, setsoDonHangGiao] = useState<any>(0)
    const [soDonHangGiaoHangThanhCong, setsoDonHangGiaoHangThanhCong] = useState<any>(0)
    const [soDonHangDaHuy, setsoDonHangDaHuy] = useState<any>(0)
    useEffect(() => {
        const filtered = data?.bill
            ?.filter((item: DataType) => {
                switch (selectedTab) {
                    case '1':
                        return true
                    case '2':
                        return item.orderstatus === 'Chờ xác nhận'
                    case '3':
                        return item.orderstatus === 'Đang chuẩn bị hàng'
                    case '4':
                        return (
                            item.orderstatus === 'Đang giao hàng' ||
                            item.orderstatus === 'Đã giao hàng cho đơn vị vận chuyển'
                        )
                    case '5':
                        return item.orderstatus === 'Đã giao hàng thành công'
                    case '6':
                        return item.orderstatus === 'Đã hủy hàng'
                    default:
                        return true
                }
            })
            .sort((a: any, b: any) => {
                // Sắp xếp từ mới nhất đến cũ nhất dựa trên thời gian tạo ra (createdAt)
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            })
        setfilteredData(filtered)

        // Đếm số lượng các đơn hàng trong mỗi trạng thái
        const countPendingConfirmation = data?.bill.filter((item: any) => item.orderstatus === 'Chờ xác nhận').length
        const countPreparing = data?.bill.filter((item: any) => item.orderstatus === 'Đang chuẩn bị hàng').length
        const countPreparingLoading = data?.bill.filter(
            (item: any) => item.orderstatus === 'Đã giao hàng cho đơn vị vận chuyển'
        ).length
        const countShipping = data?.bill.filter((item: any) => item.orderstatus === 'Đang giao hàng').length
        const countDelivered = data?.bill.filter((item: any) => item.orderstatus === 'Đã giao hàng thành công').length
        const countCancelled = data?.bill.filter((item: any) => item.orderstatus === 'Đã hủy hàng').length

        // Cập nhật số đơn hàng trong mỗi trạng thái bằng cách gọi các hàm setsoDonHang... tương ứng
        setsoDonHangChoXacNhan(countPendingConfirmation)
        setsoDonHangDangChuanBiHang(countPreparing)
        setsoDonHangGiao(() => {
            if (countShipping >= 0 && countPreparingLoading >= 0) {
                return countShipping + countPreparingLoading
            }
        })
        setsoDonHangGiaoHangThanhCong(countDelivered)
        setsoDonHangDaHuy(countCancelled)
    }, [data, selectedTab])
    const onChangeTab = (key: string) => {
        console.log(key)
        setSelectedTab(key)
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: (
                <span
                    style={{
                        fontSize: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                    Tất cả <span className='text-[red] ml-1 mb-3'> {data?.bill?.length}</span> &nbsp;
                    <FcNext />
                </span>
            )

            // children: 'Content of Tab Pane 1'
        },
        {
            key: '2',
            label: (
                <span
                    style={{
                        fontSize: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                    Chờ xác nhận <span className='text-[red] ml-1 mb-3'> {soDonHangChoXacNhan}</span> &nbsp;
                    <FcNext />
                </span>
            )
            // children: 'Content of Tab Pane 2'
        },
        {
            key: '3',
            label: (
                <span
                    style={{
                        fontSize: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                    Đang chuẩn bị hàng <span className='text-[red] ml-1 mb-3'> {soDonHangDangChuanBiHang}</span>
                    &nbsp;
                    <FcNext />
                </span>
            )
            // children: 'Content of Tab Pane 3'
        },
        {
            key: '4',
            label: (
                <span
                    style={{
                        fontSize: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                    Đang giao hàng <span className='text-[red] ml-1 mb-3'> {soDonHangGiao}</span> &nbsp;
                    <FcNext />
                </span>
            )
            // children: 'Content of Tab Pane 3'
        },

        {
            key: '5',
            label: (
                <span
                    style={{
                        fontSize: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                    Giao hàng thành công <span className='text-[red] ml-1 mb-3'> {soDonHangGiaoHangThanhCong}</span>{' '}
                    &nbsp;
                </span>
            )
            // children: 'Content of Tab Pane 3'
        },
        {
            key: '6',
            label: (
                <span
                    style={{
                        fontSize: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                    Đơn hàng đã hủy<span className='text-[red] ml-1 mb-3'> {soDonHangDaHuy}</span>
                </span>
            )
            // children: 'Content of Tab Pane 3'
        }
    ]

    // const [isReviewDialogVisible, setIsReviewDialogVisible] = useState(false)
    const [selectedIdBill, setSelectedIdBill] = useState<string>('')

    const [newWhy, setNewWhy] = useState('')

    const handleWhyCancelButtonClick = (idbill: string) => {
        setSelectedIdBill(idbill)
    }

    const handleAddWhy = () => {
        const dataWhy = {
            idbill: selectedIdBill,
            iduser: userID || '',
            message: newWhy.slice(0, 75)
        }
        onSubmitWhy(dataWhy)
    }

    const { onSubmitWhy } = useWhyCancelOrder({
        action: 'ADD',
        onSuccess: () => {
            window.location.href = `/order/order_detail/${selectedIdBill}`
        }
    })

    const TimeDate = (time: any) => {
        const createdAtDate = new Date(time)
        const day = createdAtDate.getDate().toString().padStart(2, '0')
        const month = (createdAtDate.getMonth() + 1).toString().padStart(2, '0')
        const year = createdAtDate.getFullYear().toString().slice(-2)

        const formattedDate = `${day}/${month}/${year}`
        const timeTmas = createdAtDate.toLocaleTimeString('en-GB', { hour12: false })

        const inRa = timeTmas + ' - ' + formattedDate
        return inRa
    }
    const [showThanhToanSau, setShowThanhToanSau] = useState(false)
    const [idBill, setIdBill] = useState('')

    const handleThanhToanNgay = (id: string) => {
        setIdBill(id)
        setShowThanhToanSau(true)
    }
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isReviewVisible, setIsReviewVisible] = useState(true)
    const [hasCommented, setHasCommented] = useState(false) // Thêm state cho hasCommented

    const handleCommentSubmit = () => {
        setIsSubmitted(true)
        setIsReviewVisible(false) // Ẩn nút "Đánh giá"
        setHasCommented(true) // Cập nhật state của hasCommented
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Đơn hàng',
            dataIndex: '_id',
            key: '_id',
            // width: '80%',
            ...getColumnSearchProps('_id'),
            render: (_: any, record: DataType) => (
                <>
                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <div className='thongtindonhang' style={{ flex: 1 }}>
                            <div className='mb-3'>
                                <h1 style={{ fontSize: '20px' }}>
                                    Mã: <u>{record?._id}</u>
                                </h1>
                            </div>
                            {record?.billDetails.map((item: any) => (
                                <div
                                    className='flex mb-3'
                                    style={{ alignItems: 'flex-start' }}
                                    key={item?.imageTypePro}
                                >
                                    <Image
                                        src={item?.imageTypePro}
                                        alt='Product'
                                        width={70}
                                        style={{
                                            boxShadow:
                                                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                                            padding: '5px'
                                        }}
                                    />
                                    <div className='flex flex-col ml-2'>
                                        <p className='text-base'>{item?.namePro}</p>
                                        <p className='text-gray-400'>
                                            Phân loại: &nbsp;
                                            {item?.nameTypePro}
                                        </p>
                                        <p className='text-sm'>x{item?.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            className='thongtingia'
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'end'
                            }}
                        >
                            <h1 style={{ fontSize: '20px', color: 'red' }}>
                                <i>{record?.orderstatus}</i>,<br />
                                <span style={{ fontSize: '16px', color: 'black' }}>{TimeDate(record?.updatedAt)}</span>
                            </h1>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <p>{record.paymentstatus === 'Đã thanh toán' ? 'Đã thanh toán: ' : ''} &nbsp;</p>
                                <p
                                    style={{ fontWeight: '700' }}
                                    className='text-lg text-[red]'
                                    dangerouslySetInnerHTML={{
                                        __html: formatPrice(record?.money)
                                    }}
                                ></p>
                            </div>
                        </div>
                    </div>
                    <hr style={{ marginBottom: '20px', border: '1px solid #DCDCDC' }} />
                </>
            )
        },

        {
            // title: 'Hành động',
            dataIndex: '',
            key: '',
            width: '12%',
            fixed: 'right',
            render: (_: any, record: DataType) => (
                <Space>
                    <div className=' flex flex-col gap-3'>
                        {/* Nút "Xem chi tiết" hiển thị luôn */}
                        <Link to={`order_detail/${record._id}`}>
                            <Button>Xem chi tiết</Button>
                        </Link>

                        {/* Nút thanh toán PayPal */}
                        <>
                            {record.paymentmethods === 'Thanh toán qua PayPal' &&
                                record.paymentstatus === 'Chờ thanh toán' && (
                                    <Button
                                        style={{ backgroundColor: 'orange', color: 'red' }}
                                        onClick={() => handleThanhToanNgay(record._id)}
                                    >
                                        Thanh toán ngay
                                    </Button>
                                )}

                            {showThanhToanSau && <ThanhToanSau money={record.money} idBill={idBill} show={true} />}
                        </>
                        {record.orderstatus === 'Đã hủy hàng' && (
                            <Button style={{ backgroundColor: 'gray', color: 'white' }}>Đã hủy</Button>
                        )}
                    </div>
                </Space>
            )
        }
    ]
    return (
        <Content>
            <main className=''>
                <div>
                    <div className='flex flex-col gap-5 '>
                        <Tabs defaultActiveKey='1' items={items} onChange={onChangeTab} style={{ padding: '0 30px' }} />
                        <Table columns={columns} dataSource={filteredData} scroll={{ x: 1300 }} />;
                    </div>
                </div>
            </main>
        </Content>
    )
}
export default OrderPage

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { PUBLIC_BASE_URL, ORDERS_PUBLIC_API_ROUTE, PAGE_ROUTE_SIGN_IN, ORDER_DETAIL_PAGE_ROUTE } from "@src/services/routes";
import axios from "axios";
import { orderStyles } from "@src/styles";
import { Spinner } from "@src/component";
import Pagination from "../Pagination";

const Orders: NextPage = () => {

    const Router = useRouter();
    const user_token = sessionStorage.getItem("usertoken");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<any>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_token}`
    }

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            setLoading(true);
            await axios.get(`${PUBLIC_BASE_URL}${ORDERS_PUBLIC_API_ROUTE}`, {
                headers: headers
            })
                .then((response) => {
                    // console.log(response.data.data[0].orderItems);
                    // console.log('orders: ', response.data.data);
                    setOrders(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                })
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = orders.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(orders.length / recordsPerPage)

    return (
        <div>
            <div className="container">
                {/* <div className="row" style={{marginBottom: '-20px'}}>
                    <div className="col-md-3">
                        <div className={orderStyles.orderDetails}>                            
                            <Image src={'/uploads/food-thumbnail.svg'} width={50} height={50} style={{marginBottom: '10px'}} />
                            <div style={{paddingLeft: '10px', position: 'relative', left: '50px', top: '-60px'}}>
                                <p><strong>Mega Chicken</strong></p>
                                <p>1* grilled chicken wings</p>
                                <p>1* grilled chicken wings</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3" style={{position: 'relative', left: '40px'}}>
                        <div className={orderStyles.amount}>
                            <p>NGN4,000</p>
                            <p>NGN4,000</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className={orderStyles.date}>
                            <p>10/10/2022</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <span className={orderStyles.processing} style={{position: 'relative', right: '50px'}}>PROCESSING</span>
                    </div>
               </div>
               <div className={orderStyles.spaceDiv}></div>
               <div className="row" style={{marginBottom: '-20px'}}>
                    <div className="col-md-3">
                        <div className={orderStyles.orderDetails}>                            
                            <Image src={'/uploads/food-thumbnail.svg'} width={50} height={50} style={{marginBottom: '10px'}} />
                            <div style={{paddingLeft: '10px', position: 'relative', left: '50px', top: '-60px'}}>
                                <p><strong>Mega Chicken</strong></p>
                                <p>1* grilled chicken wings</p>
                                <p>1* grilled chicken wings</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3" style={{position: 'relative', left: '40px'}}>
                        <div className={orderStyles.amount}>
                            <p>NGN4,000</p>
                            <p>NGN4,000</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className={orderStyles.date}>
                            <p>10/10/2022</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <span className={orderStyles.delivered} style={{position: 'relative', right: '50px'}}>DELIVERED</span>
                        <div className={orderStyles.reorderButton}>
                            <p className="pt-3">Reorder</p>
                        </div>
                    </div>
               </div>
               <div className={orderStyles.spaceDiv}></div>
               <div className="row" style={{marginBottom: '-20px'}}>
                    <div className="col-md-3">
                        <div className={orderStyles.orderDetails}>                            
                            <Image src={'/uploads/food-thumbnail.svg'} width={50} height={50} style={{marginBottom: '10px'}} />
                            <div style={{paddingLeft: '10px', position: 'relative', left: '50px', top: '-60px'}}>
                                <p><strong>Mega Chicken</strong></p>
                                <p>1* grilled chicken wings</p>
                                <p>1* grilled chicken wings</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3" style={{position: 'relative', left: '40px'}}>
                        <div className={orderStyles.amount}>
                            <p>NGN4,000</p>
                            <p>NGN4,000</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className={orderStyles.date}>
                            <p>10/10/2022</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <span className={orderStyles.delivered} style={{position: 'relative', right: '50px'}}>DELIVERED</span>
                        <div className={orderStyles.reorderButton}>
                            <p className="pt-3">Reorder</p>
                        </div>
                    </div>
               </div> */}
                <div className="row">
                    <div className="col-md-12">
                        <div style={{ marginLeft: '-10px', marginRight: '10px' }}>
                            <table className="table bg-white" style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ color: '#979797' }}>
                                        <td className="d-none d-sm-table-cell">Customer</td>
                                        <td>Order No</td>
                                        <td>Amount</td>
                                        <td className="d-none d-sm-table-cell">Date</td>
                                        <td>Status</td>
                                        <td className="d-none d-sm-table-cell"></td>
                                    </tr>
                                    {loading && <div className="mt-3"><Spinner /></div>}
                                    {currentRecords && currentRecords.map((order: {
                                        _id: React.Key | string
                                        delivery: any;
                                        orderNo: string | number;
                                        totalPrice: number;
                                        status: string
                                    }) => <Link href={{
                                        pathname: ORDER_DETAIL_PAGE_ROUTE,
                                        query: {
                                            orderNo: order.orderNo,
                                        },
                                    }}>
                                            <tr style={{ cursor: 'pointer' }}>
                                                <th style={{ fontWeight: 'normal' }} className="d-none d-sm-table-cell">{order.delivery.firstName}</th>
                                                <td>{order.orderNo}</td>
                                                <td>{order.totalPrice}</td>
                                                <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                                                <td><span className={orderStyles.processing}>{order.status}</span></td>
                                                <td className="d-none d-sm-table-cell">{'>'}</td>
                                            </tr>
                                        </Link>
                                    )}
                                    {/* <Link href={ORDER_DETAIL_PAGE_ROUTE}>
                                        <tr style={{ cursor: 'pointer' }}>
                                            <th style={{ fontWeight: 'normal' }} className="d-none d-sm-table-cell">John Doe</th>
                                            <td>#12345</td>
                                            <td>N1,500</td>
                                            <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                                            <td><span className={orderStyles.processing}>Processing</span></td>
                                            <td className="d-none d-sm-table-cell">{'>'}</td>
                                        </tr>
                                    </Link> */}
                                    {/* <Link href={ORDER_DETAIL_PAGE_ROUTE}>
                                        <tr style={{ cursor: 'pointer' }}>
                                            <th style={{ fontWeight: 'normal' }} className="d-none d-sm-table-cell">John Doe</th>
                                            <td>#12345</td>
                                            <td>N1,500</td>
                                            <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                                            <td><span className={orderStyles.delivered}>Delivered</span></td>
                                            <td className="d-none d-sm-table-cell">{'>'}</td>
                                        </tr>
                                    </Link> 
                                    <Link href={ORDER_DETAIL_PAGE_ROUTE}>
                                        <tr style={{ cursor: 'pointer' }}>
                                            <th style={{ fontWeight: 'normal' }} className="d-none d-sm-table-cell">John Doe</th>
                                            <td>#12345</td>
                                            <td>N1,500</td>
                                            <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                                            <td><span className={orderStyles.delivered}>Delivered</span></td>
                                            <td className="d-none d-sm-table-cell">{'>'}</td>
                                        </tr>
                                    </Link> 
                                    <Link href={ORDER_DETAIL_PAGE_ROUTE}>
                                        <tr style={{ cursor: 'pointer' }}>
                                            <th style={{ fontWeight: 'normal' }} className="d-none d-sm-table-cell">John Doe</th>
                                            <td>#12345</td>
                                            <td>N1,500</td>
                                            <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                                            <td><span className={orderStyles.delivered}>Delivered</span></td>
                                            <td className="d-none d-sm-table-cell">{'>'}</td>
                                        </tr>
                                    </Link> 
                                    <Link href={ORDER_DETAIL_PAGE_ROUTE}>
                                        <tr style={{ cursor: 'pointer' }}>
                                            <th style={{ fontWeight: 'normal' }} className="d-none d-sm-table-cell">John Doe</th>
                                            <td>#12345</td>
                                            <td>N1,500</td>
                                            <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                                            <td><span className={orderStyles.delivered}>Delivered</span></td>
                                            <td className="d-none d-sm-table-cell">{'>'}</td>
                                        </tr>
                                    </Link> 
                                    <Link href={ORDER_DETAIL_PAGE_ROUTE}>
                                        <tr style={{ cursor: 'pointer' }}>
                                            <th style={{ fontWeight: 'normal' }} className="d-none d-sm-table-cell">John Doe</th>
                                            <td>#12345</td>
                                            <td>N1,500</td>
                                            <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                                            <td><span className={orderStyles.delivered}>Delivered</span></td>
                                            <td className="d-none d-sm-table-cell">{'>'}</td>
                                        </tr>
                                    </Link> 
                                    <Link href={ORDER_DETAIL_PAGE_ROUTE}>
                                        <tr style={{ cursor: 'pointer' }}>
                                            <th style={{ fontWeight: 'normal' }} className="d-none d-sm-table-cell">John Doe</th>
                                            <td>#12345</td>
                                            <td>N1,500</td>
                                            <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                                            <td><span className={orderStyles.delivered}>Delivered</span></td>
                                            <td className="d-none d-sm-table-cell">{'>'}</td>
                                        </tr>
                                    </Link> 
                                    <Link href={ORDER_DETAIL_PAGE_ROUTE}>
                                        <tr style={{ cursor: 'pointer' }}>
                                            <th style={{ fontWeight: 'normal' }} className="d-none d-sm-table-cell">John Doe</th>
                                            <td>#12345</td>
                                            <td>N1,500</td>
                                            <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                                            <td><span className={orderStyles.delivered}>Delivered</span></td>
                                            <td className="d-none d-sm-table-cell">{'>'}</td>
                                        </tr>
                                    </Link> 
                                    <Link href={ORDER_DETAIL_PAGE_ROUTE}>
                                        <tr style={{ cursor: 'pointer' }}>
                                            <th style={{ fontWeight: 'normal' }} className="d-none d-sm-table-cell">John Doe</th>
                                            <td>#12345</td>
                                            <td>N1,500</td>
                                            <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                                            <td><span className={orderStyles.delivered}>Delivered</span></td>
                                            <td className="d-none d-sm-table-cell">{'>'}</td>
                                        </tr>
                                    </Link> 
                                    <Link href={ORDER_DETAIL_PAGE_ROUTE}>
                                        <tr style={{ cursor: 'pointer' }}>
                                            <th style={{ fontWeight: 'normal' }} className="d-none d-sm-table-cell">John Doe</th>
                                            <td>#12345</td>
                                            <td>N1,500</td>
                                            <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                                            <td><span className={orderStyles.delivered}>Delivered</span></td>
                                            <td className="d-none d-sm-table-cell">{'>'}</td>
                                        </tr>
                                    </Link> 
                                    <Link href={ORDER_DETAIL_PAGE_ROUTE}>
                                        <tr style={{ cursor: 'pointer' }}>
                                            <th style={{ fontWeight: 'normal' }} className="d-none d-sm-table-cell">John Doe</th>
                                            <td>#12345</td>
                                            <td>N1,500</td>
                                            <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                                            <td><span className={orderStyles.delivered}>Delivered</span></td>
                                            <td className="d-none d-sm-table-cell">{'>'}</td>
                                        </tr>
                                    </Link> */}
                                </tbody>
                            </table>
                            {
                                orders && orders.length > 0 ? <Pagination
                                    nPages={nPages}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                /> : <></>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders;
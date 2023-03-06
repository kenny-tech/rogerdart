import { useEffect, useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import * as Icon from "@heroicons/react/outline";
import { orderStyles } from "@src/styles";
import { PUBLIC_BASE_URL, ORDER_PUBLIC_API_ROUTE } from "@src/services/routes";


const OrderDetail: NextPage = () => {

    const Router = useRouter();
    const user_token = sessionStorage.getItem("usertoken");
    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const query = Router.query;
    const orderNumber = query.order_no;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_token}`
    }
    // const orderData:any = query.data;
    // console.log('order Number : ',orderNumber);
    // console.log('order : ',JSON.parse(orderData));
    // console.log('type of order DATA : ',typeof JSON.parse(orderData));
    // console.log('order 1: ',JSON.parse(orderData));


    useEffect(() => {
        getOrders();
    }, [])

    const getOrders = async () => {
        try {
            setLoading(true);
            let orderUrl = `${PUBLIC_BASE_URL}${ORDER_PUBLIC_API_ROUTE}/${orderNumber}`;
            console.log('order url: ', orderUrl)
            await axios.get(orderUrl, {
                headers: headers
            })
            .then((response) => {
                console.log('order details: ',response.data.data);
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

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div style={{ marginLeft: '-10px', marginRight: '10px' }}>
                            <div className="row" style={{ backgroundColor: '#F9F8F8', height: '500px', marginLeft: '12px', marginRight: '12px' }}>
                                <div className="col-md-3 mt-4">
                                    <p style={{fontSize: '18px', fontWeight: '600px'}}>Customer Details</p>
                                    {/* <p style={{fontSize: '14px', fontWeight: '400px', marginBottom: '20px'}}><Icon.UserIcon width={15} height={15}/> {orders.delivery.firstName} {orders.delivery.lastName}</p>
                                    <p style={{fontSize: '14px', fontWeight: '400px', marginBottom: '20px'}}><Icon.PhoneIcon width={15} height={15}/> {orders.delivery.phone} </p>
                                    <p style={{fontSize: '14px', fontWeight: '400px', marginBottom: '20px'}}><Icon.HomeIcon width={15} height={15}/> {orders.delivery.address}</p> */}
                                </div>
                                <div className="col-md-4 pt-4" style={{ backgroundColor: '#FFF' }}>
                                    <p style={{ fontSize: '18px', fontWeight: '600px' }}>Order Items</p>
                                    <br />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>King size burger</p>
                                            <span style={{ color: '#6B6F7D', fontSize: '12px', position: 'relative', bottom: '15px' }}>16 pcs</span>
                                        </div>
                                        <div>
                                            <p>N300.00</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>King size burger</p>
                                            <span style={{ color: '#6B6F7D', fontSize: '12px', position: 'relative', bottom: '15px' }}>16 pcs</span>
                                        </div>
                                        <div>
                                            <p>N300.00</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>King size burger</p>
                                            <span style={{ color: '#6B6F7D', fontSize: '12px', position: 'relative', bottom: '15px' }}>16 pcs</span>
                                        </div>
                                        <div>
                                            <p>N300.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mt-4">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>Status</p>
                                        </div>
                                        <div>
                                            <span className={orderStyles.delivered}>Delivered</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                        <div>
                                            <p>Order number</p>
                                        </div>
                                        <div>
                                            <p>#18352</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>Date</p>
                                        </div>
                                        <div>
                                            <p>April 4, 2022</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>Discount</p>
                                        </div>
                                        <div>
                                            <p>N500.00</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                        <div>
                                            <p>Delivery charge</p>
                                        </div>
                                        <div>
                                            <p>N1,000.00</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>Total amount</p>
                                        </div>
                                        <div>
                                            <p>N4,500.00</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                        <div>
                                            <p>Time of delivery</p>
                                        </div>
                                        <div>
                                            <p>15:45pm</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                        <div>
                                            <p>Delivery address</p>
                                        </div>
                                        <div style={{ marginLeft: '50px' }}>
                                            <p>10 Tamedo Street, Surulere, Lagos.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail;
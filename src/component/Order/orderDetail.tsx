import { useEffect, useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import * as Icon from "@heroicons/react/outline";
import { orderStyles } from "@src/styles";
import { PUBLIC_BASE_URL, ORDER_PUBLIC_API_ROUTE } from "@src/services/routes";
import { Spinner } from "@src/component";

const OrderDetail: NextPage = () => {

    const Router = useRouter();
    const user_token = sessionStorage.getItem("usertoken");
    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [delivery, setDelivery] = useState<any>();
    const [orderItems, setOrderItems] = useState<any>([]);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [total, setTotal] = useState<number>(0);

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
                    setFirstName(response.data.data.delivery.firstName);
                    setLastName(response.data.data.delivery.lastName);
                    setPhone(response.data.data.delivery.phone);
                    setAddress(response.data.data.delivery.address);
                    setOrderItems(response.data.data.orderItems);
                    setTotal(response.data.data.totalPrice);
                    setStatus(response.data.data.status);
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
                        {loading && <div className="mt-3"><Spinner /></div>}
                        <div style={{ marginLeft: '-10px', marginRight: '10px' }}>
                            <div className="row" style={{ backgroundColor: '#F9F8F8', height: '500px', marginLeft: '12px', marginRight: '12px' }}>
                                <div className="col-md-3 mt-4">
                                    <p style={{ fontSize: '18px', fontWeight: '600px' }}>Customer Details</p>
                                    <p style={{ fontSize: '14px', fontWeight: '400px', marginBottom: '20px' }}><Icon.UserIcon width={15} height={15} /> {firstName} {lastName}</p>
                                    <p style={{ fontSize: '14px', fontWeight: '400px', marginBottom: '20px' }}><Icon.PhoneIcon width={15} height={15} /> {phone} </p>
                                    <p style={{ fontSize: '14px', fontWeight: '400px', marginBottom: '20px' }}><Icon.HomeIcon width={15} height={15} /> {address}</p>
                                </div>
                                <div className="col-md-4 pt-4" style={{ backgroundColor: '#FFF' }}>
                                    <p style={{ fontSize: '18px', fontWeight: '600px' }}>Order Items</p>
                                    <br />
                                    {orderItems && orderItems.map((order: {
                                        productName: string;
                                        quantity: number;
                                        price: number;
                                    }) => <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <p>{order.productName}</p>
                                                <span style={{ color: '#6B6F7D', fontSize: '12px', position: 'relative', bottom: '15px' }}>{order.quantity}</span>
                                            </div>
                                            <div>
                                                <p>N{order.price}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-4 mt-4">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>Status</p>
                                        </div>
                                        <div>
                                            <span className={orderStyles.delivered}>{status}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>Order number</p>
                                        </div>
                                        <div>
                                            <p>{orderNumber}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>Date</p>
                                        </div>
                                        <div>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>Discount</p>
                                        </div>
                                        <div>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>Delivery charge</p>
                                        </div>
                                        <div>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>Total amount</p>
                                        </div>
                                        <div>
                                            <p>N{total.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>Time of delivery</p>
                                        </div>
                                        <div>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p>Delivery address</p>
                                        </div>
                                        <div style={{ marginLeft: '50px', position: 'relative', left: '50px' }}>
                                            <p>{address}</p>
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
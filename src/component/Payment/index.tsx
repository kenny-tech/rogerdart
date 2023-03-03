import React, { useContext, useState } from "react";
import { NextPage } from "next";
import { usePaystackPayment } from 'react-paystack';
import { useRouter } from "next/router";
import axios from "axios";
import { successAlert, errorAlert } from "@src/services/alert";
import ProductContext from '@src/services/productContext';
import { PUBLIC_BASE_URL, VALIDATE_ORDER_ROUTE } from "@src/services/routes";

type Data = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    landMark: string;
    grandTotal: number;
    orderId: string;
    orderReference: string
}

const PaystackPayment: NextPage<Data> = ({ firstName, lastName, address, city, state, phone, landMark, grandTotal, orderId, orderReference }:any) => {

    let paymentConfig:any = ({
        email: sessionStorage.getItem("email"),
        amount: parseInt(grandTotal) * 100,
        metadata: {
            orderId: orderId
        },
        publicKey: process.env.PAYSTACK_P_KEY,
    });

    const initializePayment = usePaystackPayment(paymentConfig);

    const Router = useRouter();
    const usertoken = sessionStorage.getItem("usertoken");
    const { cart } = useContext(ProductContext);
    const [orderRef, setOrderRef] = useState('');
 
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usertoken}`
    }

    const onPaymentSuccess:any = async (reference:any) => {
        
        try {
           
            let data = {
                paystackReference: reference.reference
            }
            
            let postUrl = `${PUBLIC_BASE_URL}${VALIDATE_ORDER_ROUTE}/${orderReference}`;

            console.log(postUrl);

            await axios.post(postUrl, 
            data, 
            {
                headers: headers
            })
            .then((response) => {
                console.log('success payment response: ',response);
                if(response.statusText) {
                    successAlert('Order successfully placed!');
                    localStorage.removeItem('orderReference');
                    setTimeout(() => {
                        Router.reload()
                    }, 3000);
                }
            })
            .catch((error) => {
                console.log('error payment response : ',error);
                errorAlert(error.response.data.message);
            })  
    
        } catch (error) {
            errorAlert('Something went wrong! '+ error);
        } 
        
    };

    const onPaymentClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    const initiatePayment = async () => {
        initializePayment(onPaymentSuccess, onPaymentClose); 
    }

    return (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width: '220px', height: '40px', borderRadius: 20, backgroundColor: '#eb332a', cursor: 'pointer'}} onClick={() => initiatePayment()}>
            <p style={{color: '#fff', fontSize: '16px',  position: 'relative', bottom: '10px'}}>Confirm & Make Payment</p>
        </div>
    )
}

export default PaystackPayment;
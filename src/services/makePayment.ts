import axios from 'axios';
import { useEffect } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useRouter } from "next/router";
import { PUBLIC_BASE_URL, VALIDATE_ORDER_ROUTE } from "@src/services/routes";
import { successAlert, errorAlert } from "@src/services/alert";

export const makePayment = (grandTotal:number, orderId: string) => {
    
    const Router = useRouter();

    const usertoken = sessionStorage.getItem("usertoken");
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usertoken}`
    }

    const config:any = {
        email: sessionStorage.getItem("email"),
        amount: grandTotal * 100,
        metadata: {
            orderId: orderId
        },
        publicKey: process.env.PAYSTACK_P_KEY,
    };

    const initializePayment = usePaystackPayment(config);

    const onPaymentSuccess:any = async (reference:any) => {
        
        try {
            console.log(reference);
            let orderReference = localStorage.getItem('orderReference');

            console.log('Order reference: ', orderReference);
            
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

    initializePayment(onPaymentSuccess, onPaymentClose); 


}
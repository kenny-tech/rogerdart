import { orderNoHandler } from "@api/middleware/orderno-handler";
import rogerPay from "@api/middleware/payment-handler";
import { createOrder, execute, makePayment } from "@src/config";
import { paymentQueries } from "../payment/payment.queries";
import { OrderProps } from "./order.model";
import { orderQueries } from "./order.queries";

export const Order = async (props:OrderProps) => {
    const today = new Date().toISOString().slice(0, 14)
    const orderNo = orderNoHandler();
    const verifyPayment:any = await rogerPay(props.transaction_ref)
    
    const orderedItem = JSON.stringify(props.orderedItems);
    const customResponse = `Error!`;

    if(JSON.parse(verifyPayment).status){
        
        const result = JSON.parse(verifyPayment).data;
        const payParams = {
            total:result.amount, 
            reference:result.reference,
            paid_at:result.paid_at,
            status:result.status === "success" ? true : false, 
        }
        
        //Create order and store order information
        createOrder<OrderProps>(orderQueries.CREATE_ORDER, [orderNo, props.user_id, 
        props.vendor_id, orderedItem, props.delivery_contact, props.deliveryguy_tip, props.subtotal, props.tax, props.billing_address, today]) 
        
        //Create and store payment information
        await makePayment<OrderProps>(paymentQueries.CREATE_PAYMENT, [props.user_id, props.vendor_id, props.orderedItems[0].product_id, orderNo, props.transaction_ref, 
        payParams.total, payParams.status, props.orderedItems[0].quantity, payParams.paid_at])
    }
    // else return JSON.parse(verifyPayment).data;
    else return customResponse;
};

export const OrderList = async (data:any) => {
    return execute<OrderProps>(orderQueries.GET_ORDER, [data.id])
};


import { makePayment } from "@src/config";
import { PaymentProps } from "./payment.model";
import { paymentQueries } from "./payment.queries";

export const Pay = async (data:PaymentProps) => {
    return makePayment<PaymentProps>(paymentQueries.CREATE_PAYMENT, [data.order_no, data.transaction_ref, 
        data.reference, data.amount, data.status, data.modified_at])
};
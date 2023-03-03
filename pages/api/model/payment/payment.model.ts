export interface PaymentProps {
    order_no: string;
    transaction_ref:string;
    reference:string;
    amount:number;
    status:string;
    modified_at:Date;
  };
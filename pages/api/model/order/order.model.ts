export interface OrderProps {
    user_id: number;
    orderedItems:any;
    subtotal:number;
    tax:number;
    id:string;
    deliveryguy_tip:number;
    delivery_contact:string;
    reference:string;
    amount:number;
    status:boolean;
    product_id:number;
    vendor_id:number;
    billing_address:string;
    quantity:number;
    modified_at:Date;
    transaction_ref:string;
  };
export interface Vendor {
    [x: string]: string[]|Object;
    id:string;
    business_reg_no:string;
    business_type:string;
    bvn:string;
    nin:string;
    utility_bill:string;
    driving_license:string;
    voters_card:string;
    email: string;
    business_pass: string;
    mobile: string;
    first_name:string;
    last_name:string;
    business_name:string;
    delivery_time:string;
    open:string;
    close:string;
    street_I:string;
    street_II:string;
    city:string;
    state:string;
    isActivated:boolean;
    confirmation_code:string;
    linkedin:string;
    facebook:string;
    created_at:Date;
    getVendors:any;
  };

  export interface Product {
    [x: string]: string[]|Object;
    id:string;
    item_name:string;
    category_id:string,
    item_description:string;
    item_price:string;
    variants:string|Object[];
    delivery_time:string;
  };
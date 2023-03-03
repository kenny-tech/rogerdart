import { otpHandler } from "@api/middleware/otp-handler";
import { createAccount, executeAll, executeAuth, findById, getPaymentHistory, businessIdentitiyVerification, editProductById, businessAccountConfirmation, businessAccountInfo, findSingleMenuById, findVendorMenusById, findVendorsByAddress, findOrderById, orderDetailsById, findProductById, createProduct} from "@src/config";
import { Product, Vendor } from "./vendor.model";
import { vendorQueries } from "./vendor.queries";
import bcrypt from "bcrypt";

const otp = otpHandler();//Generates one-time protection code for account verification
export const signIn = async (data:Vendor) => {
    return executeAuth<Vendor>(vendorQueries.SIGN_IN, [
        data.email, 
        data.business_pass
    ])
};//Logic to authenticate merchant to dashboard

export const signUp = async (data:Vendor) => {
    const business_hpass = await bcrypt.hash(data.business_pass, 10);
    data.confirmationCode = otp;
    return createAccount<any>(vendorQueries.FIND_VENDOR_BY_EMAIL, vendorQueries.CREATE_ACCOUNT,
         data.email, [data.business_name, data.email, data.owner_address, 
         data.owner_city, data.owner_state, business_hpass, data.confirmationCode])
};//Logic to create merchant account

export const confirmAccount = async (data:Vendor) => {
    return businessAccountConfirmation<Vendor>(vendorQueries.FIND_VENDOR_BY_CODE, vendorQueries.UPDATE_VENDOR_CONFIRMATION_CODE,
         data.confirmation_code, [data.confirmation_code])
};//Logic to verify and authenticate merchant to by passcode

export const updateAccountInformation = async (id:any, data:Vendor) => {
    return businessAccountInfo<Vendor>(vendorQueries.FIND_VENDOR_BY_ID, vendorQueries.UPDATE_VENDOR_PERSONAL_INFO,
         id, JSON.stringify([id, data.first_name, data.last_name, data.email, data.owner_address, data.owner_city, data.owner_state]))
};//Logic to store merchant personal information

export const updateBusinessInformation = async (id:any, data:Vendor) => {
    return businessAccountInfo<Vendor>(vendorQueries.FIND_VENDOR_BY_ID, vendorQueries.UPDATE_VENDOR_BUSINESS_INFO,
         id, JSON.stringify([data.business_name, data.business_reg, data.business_type, data.bvn, data.nin, data.utility_bill, data.id_card, id]))
};//Logic to store business information

export const businessSubscription = async (id:any, data:Vendor) => {
    return businessAccountInfo<Vendor>(vendorQueries.FIND_VENDOR_BY_ID, vendorQueries.UPDATE_VENDOR_SUBSCRIPTION,
         id, [data.subscription, id])
};//Logic to store business information

export const identityVerification = async (id:any, data:Vendor) => {
    return businessIdentitiyVerification<Vendor>(vendorQueries.FIND_VENDOR_BY_ID, vendorQueries.UPDATE_ID_VERIFICATION,
         id, [data.owner_photo, data.owner_mobile, id])
};//Logic to store phone and id information

//Lists of vendors
export const getVendors = () => {return executeAll(vendorQueries.GET_ALL_VENDOR)};//Logic to get all vendors

//Lists of orders for a particular Vendor
export const getOrders = (id:any) => {
    return findOrderById(vendorQueries.GET_ALL_ORDERS, id)
};//Logic to get all orders

//Find all products
export const getProducts = (id:any) => {
    return findProductById(vendorQueries.GET_ALL_PRODUCTS, id)
};//Logic to get all products

//Add product
export const addProduct = (id:any, data:any) => {
    return createProduct(vendorQueries.GET_VENDOR_BY_ID, id, vendorQueries.CREATE_PRODUCT, [id, data.item_name, data.category_id, data.item_description, data.item_price, data.variants, data.delivery_time, data.item_image])
};//Logic to create product

//Edit product
export const editProduct = (id:any, data:any) => {
    return editProductById(vendorQueries.GET_VENDOR_BY_ID, id, vendorQueries.EDIT_PRODUCT, [data.item_name, data.category_id, data.item_description, data.item_price, data.variants, data.delivery_time, data.item_image, id])
};//Logic to edit product

//History of payment for a particular vendor
export const paymentHistory = (id:any, data:any) => {
    return getPaymentHistory(vendorQueries.GET_VENDOR_BY_ID, id, vendorQueries.GET_PAYMENT, [id])
};//Logic to get payment history

//History of payment for a particular vendor
export const paymentHistoryDetails = (id:any, paymentId:any) => {
    return getPaymentHistory(vendorQueries.GET_VENDOR_BY_ID, id, vendorQueries.GET_PAYMENT_DETAILS, paymentId)
};//Logic to get payment history

//Orders details for particular Order
export const getOrderDetail = (id:any, order_id:any) => {
    return orderDetailsById(vendorQueries.GET_VENDOR_BY_ID, id, vendorQueries.GET_VENDOR_ORDER_BY_ID, order_id)
};//Logic to get all orders

export const vendorMenus = async (data:any) => {
    return findVendorMenusById<Vendor>(vendorQueries.GET_VENDOR_MENU, data.id)
};//

export const searchEverything = async (data:any) => {
    return findVendorsByAddress<Vendor>(vendorQueries.FIND_BY_ADDRESS, data.address)
};


export const vendorSingleMenu = async (data:any) => {
    return findSingleMenuById<Vendor>(vendorQueries.GET_VENDOR_SINGLE_MENU, data.menuId)
};

export const editVendor = async (data:any) => {
    return findById<Vendor>(vendorQueries.GET_ALL_VENDOR_BY_ID, data.id)
};

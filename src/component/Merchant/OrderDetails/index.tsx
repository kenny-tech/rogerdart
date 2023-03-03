import { NextPage } from "next";
import { orderStyles } from "@src/styles";
import * as Icon from "@heroicons/react/outline";
import Link from "next/link";
import { ORDER_MERCHANT_PAGE_ROUTE } from "@src/services/routes";

const OrderDetail: NextPage = () => {
    return (
        <>
        <Link href={ORDER_MERCHANT_PAGE_ROUTE}>
            <p style={{marginLeft: '20px', cursor:'pointer'}}><Icon.ArrowLeftIcon width={15} height={15}/>Back</p>
        </Link>
        <div className="row" style={{backgroundColor: '#F9F8F8', height: '500px', marginLeft: '12px', marginRight: '12px'}}>
            <div className="col-md-3 mt-4">
                <p style={{fontSize: '14px', fontWeight: '600px'}}>Customer Details</p>
                <p style={{fontSize: '14px', fontWeight: '400px', marginBottom: '10px'}}><Icon.UserIcon width={15} height={15}/>  Angie</p>
                <p style={{fontSize: '14px', fontWeight: '400px', marginBottom: '10px'}}><Icon.PhoneIcon width={15} height={15}/>  +2348022332233</p>
                <p style={{fontSize: '14px', fontWeight: '400px', marginBottom: '10px'}}><Icon.MailIcon width={15} height={15}/>  abc@gmail.com</p>
            </div>
            <div className="col-md-4 pt-4" style={{backgroundColor: '#FFF'}}>
                <h4>Order Items</h4>
                <br/>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <div>
                        <p>King size burger</p>
                        <span style={{color: '#6B6F7D', fontSize: '12px', position: 'relative', bottom: '15px'}}>16 pcs</span>
                    </div>
                    <div>
                        <p>N300.00</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <div>
                        <p>King size burger</p>
                        <span style={{color: '#6B6F7D', fontSize: '12px', position: 'relative', bottom: '15px'}}>16 pcs</span>
                    </div>
                    <div>
                        <p>N300.00</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <div>
                        <p>King size burger</p>
                        <span style={{color: '#6B6F7D', fontSize: '12px', position: 'relative', bottom: '15px'}}>16 pcs</span>
                    </div>
                    <div>
                        <p>N300.00</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mt-4">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: '20px'}}>
                    <div>
                        <p>Status</p>
                    </div>
                    <div>
                        <span className={orderStyles.delivered}>Delivered</span>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: '20px'}}>
                    <div>
                        <p>Order number</p>
                    </div>
                    <div>
                        <p>#18352</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: '20px'}}>
                    <div>
                        <p>Date</p>
                    </div>
                    <div>
                        <p>April 4, 2022</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: '20px'}}>
                    <div>
                        <p>Discount</p>
                    </div>
                    <div>
                        <p>N500.00</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: '20px'}}>
                    <div>
                        <p>Delivery charge</p>
                    </div>
                    <div>
                        <p>N1,000.00</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: '20px'}}>
                    <div>
                        <p>Total amount</p>
                    </div>
                    <div>
                        <p>N4,500.00</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: '20px'}}>
                    <div>
                        <p>Time of delivery</p>
                    </div>
                    <div>
                        <p>15:45pm</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: '20px'}}>
                    <div>
                        <p>Delivery address</p>
                    </div>
                    <div style={{marginLeft: '50px'}}>
                        <p>10 Tamedo Street, Surulere, Lagos.</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default OrderDetail;
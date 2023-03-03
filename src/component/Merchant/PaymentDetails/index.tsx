import { NextPage } from "next";
import { orderStyles } from "@src/styles";
import * as Icon from "@heroicons/react/outline";
import { PAYMENT_MERCHANT_PAGE_ROUTE } from "@src/services/routes";
import Link from "next/link";

const PaymentDetails: NextPage = () => {
    return (
        <>
        <Link href={PAYMENT_MERCHANT_PAGE_ROUTE}>
            <p style={{marginLeft: '20px', cursor: 'pointer'}}><Icon.ArrowLeftIcon width={15} height={15}/>Back</p>
        </Link>
        <div className="row" style={{backgroundColor: '#F9F8F8', height: '500px', marginLeft: '12px', marginRight: '12px'}}>
            <div className="col-md-3 mt-3">
                <p style={{fontSize: '14px', fontWeight: '600px'}}>Customer Details</p>
                <p style={{fontSize: '14px', fontWeight: '400px', marginBottom: '10px'}}><Icon.UserIcon width={15} height={15}/>  Angie</p>
                <p style={{fontSize: '14px', fontWeight: '400px', marginBottom: '10px'}}><Icon.PhoneIcon width={15} height={15}/>  +2348022332233</p>
                <p style={{fontSize: '14px', fontWeight: '400px', marginBottom: '10px'}}><Icon.MailIcon width={15} height={15}/>  abc@gmail.com</p>
            </div>
            <div className="col-md-9 pt-4" style={{backgroundColor: '#FFF'}}>
                <h4>Payment details</h4>
                <div className={orderStyles.buttonOrder} style={{position: 'relative', bottom: '30px'}}>
                    <p className={orderStyles.buttonText}>Go to order <Icon.PencilAltIcon className={orderStyles.icon}/></p>
                </div>
                <br/>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginRight: '50px'}}>
                    <div>
                        <p>Payment status</p>
                    </div>
                    <div style={{marginRight: '-70px'}}>
                        <span className={orderStyles.delivered}>Delivered</span>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginRight: '50px'}}>
                    <div>
                        <p>Item</p>
                    </div>
                    <div>
                        <p> 1 king size burger</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginRight: '50px'}}>
                    <div>
                        <p>Order number</p>
                    </div>
                    <div>
                        <p>7066</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginRight: '50px'}}>
                    <div>
                        <p>Amount</p>
                    </div>
                    <div>
                        <p>N15,000.00</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginRight: '50px'}}>
                    <div>
                        <p>Payment mode</p>
                    </div>
                    <div>
                        <p>Bank transfer</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginRight: '50px'}}>
                    <div>
                        <p>Date</p>
                    </div>
                    <div>
                        <p>24th Apr, 2022</p>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginRight: '50px'}}>
                    <div>
                        <p>Payment reference</p>
                    </div>
                    <div>
                        <p>112345566776</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default PaymentDetails;
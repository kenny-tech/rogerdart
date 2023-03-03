import { NextPage } from "next";
import { merchantOrderStyles} from '@src/styles';
import * as Icon from "@heroicons/react/outline";

const InfoBox: NextPage = () => {
    return (
        <>
            <div className="col-md-4 ml-4">
                <div className={merchantOrderStyles.orderInfoBox1}>
                    <div>
                        <Icon.ShoppingCartIcon color='#282828' width={30} height={50}/>
                    </div>
                    <p className={merchantOrderStyles.title}>Total Order</p>
                    <p className={merchantOrderStyles.amount}>N0.00</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className={merchantOrderStyles.orderInfoBox2}>
                    <div>
                        <Icon.ShoppingCartIcon color='#282828' width={30} height={50}/>
                    </div>
                    <p className={merchantOrderStyles.title}>Total Order</p>
                    <p className={merchantOrderStyles.amount}>N0.00</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className={merchantOrderStyles.orderInfoBox3}>
                    <div>
                        <Icon.ShoppingCartIcon color='#282828' width={30} height={50}/>
                    </div>
                    <p className={merchantOrderStyles.title}>Total Order</p>
                    <p className={merchantOrderStyles.amount}>N0.00</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className={merchantOrderStyles.orderInfoBox4}>
                    {/* <div>
                        <Icon.ShoppingCartIcon color='#282828' width={30} height={50}/>
                    </div>
                    <p>Total Order</p>
                    <p>N0.00</p> */}
                </div>
            </div>
            <div className="col-md-4">
                <div className={merchantOrderStyles.orderInfoBox5}>
                    {/* <div>
                        <Icon.ShoppingCartIcon color='#282828' width={30} height={50}/>
                    </div>
                    <p>Total Order</p>
                    <p>N0.00</p> */}
                </div>
            </div>
            <div className="col-md-4">
                <div className={merchantOrderStyles.orderInfoBox6}>
                    {/* <div>
                        <Icon.ShoppingCartIcon color='#282828' width={30} height={50}/>
                    </div>
                    <p>Total Order</p>
                    <p>N0.00</p> */}
                </div>
            </div>
        </>
    )
}
export default InfoBox;
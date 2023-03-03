import { NextPage } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Icon from "@heroicons/react/outline";
import { couponStyles } from "@src/styles";
import AddCoupon from "@src/component/Modal/addCoupon";
import { errorAlert } from "@src/services/alert";
import { PUBLIC_BASE_URL, MERCHANT_GET_COUPON_PUBLIC_API_ROUTE } from "@src/services/routes";
import { Spinner } from "@src/component";
// import EditCoupon from "@src/component/Modal/editCoupon";

const Coupons: NextPage = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [type, setType] = useState<string>('');
    const [coupons, setCoupons] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const token = sessionStorage.getItem("merchantToken");

    const handleAddCouponModal = (type: string, code: string, tag: string, value: string, startDate: string, endDate: string) => {
      setIsOpen(true);
      setType(type);
      setType(code);
      setType(tag);
      setType(value);
      setType(startDate);
      setType(type);
    }

  useEffect(() => {        
    getCoupons();
  }, []);   
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  
  const getCoupons = async () => {
      try {
          setLoading(true);
          await axios.get(`${PUBLIC_BASE_URL}${MERCHANT_GET_COUPON_PUBLIC_API_ROUTE}`, {
              headers: headers
          })
          .then((response) => {
            console.log(response.data.data.coupons);
            setCoupons(response.data.data.coupons);
            setLoading(false);
          })
          .catch((error) => {
              console.log(error);
              setLoading(false);
          })  
      } catch (error: any) {
          // console.log(error);
          errorAlert(error.response.data.message);
          setLoading(false);
      } 
  }


  // const handleEditCouponModal = () => {
  //   setIsOpen(true);
  // }

  return (
        <>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
            <div className={couponStyles.button}>
              <p className={couponStyles.buttonText} onClick={() => handleAddCouponModal('Add Coupon', '', '', '', '', '')}>Generate new coupon</p>
            </div>
          </div>
          <div style={{marginLeft: '30px', marginRight: '100px'}}>
            <table className="table bg-white" style={{width: '90%'}}>
                <tbody>
                  <tr style={{color: '#979797'}}>
                    <td>Name</td>
                    <td className="d-none d-sm-table-cell">Value</td>
                    <td className="d-none d-sm-table-cell">Date created</td>
                    <td className="d-none d-sm-table-cell">Expiry Date</td>
                    <td>Status</td>
                    <td></td>
                  </tr>
                  {loading && <Spinner />}
                    {coupons && coupons.map((coupon: {
                        _id: React.Key | string 
                        name: string;
                        type: string;
                        startDate: string;
                        expiryDate: string;
                        value: number;
                        isActive: boolean;
                    }) => <tr>
                        <th style={{fontWeight: 'normal'}}>{coupon.name}</th>
                        <td className="d-none d-sm-table-cell">{coupon.value}</td>
                        <td className="d-none d-sm-table-cell">{coupon.startDate}</td>
                        <td className="d-none d-sm-table-cell">{coupon.expiryDate}</td>
                        <td>{coupon.isActive? <span className={couponStyles.label}>Active</span> : <span className={couponStyles.labelInactive}>Inactive</span> }</td>
                        <td><Icon.PencilIcon width={20} height={20} style={{position: 'relative', right: '10px', cursor: 'pointer'}} onClick={() => handleAddCouponModal('Edit Coupon', '', '', '', '', '')}/></td>
                      </tr>
                    )}
              </tbody>
            </table>
            {isOpen && <AddCoupon setIsOpen={setIsOpen} type={type}  />}
            {/* {isOpen && <EditCoupon setIsOpen={setIsOpen}  />} */}
          </div>
        </>
    )
}

export default Coupons;
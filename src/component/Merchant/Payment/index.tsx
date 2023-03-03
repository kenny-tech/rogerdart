import { NextPage } from "next";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Search from "../Search";
import { orderStyles } from "@src/styles";
import Button from "../Button/buttonRightIcon";
import { PAYMENT_DETAIL_MERCHANT_PAGE_ROUTE } from "@src/services/routes";
import { PUBLIC_BASE_URL, MERCHANT_GET_PRODUCTS_PUBLIC_API_ROUTE } from "@src/services/routes";
import { errorAlert } from "@src/services/alert";

const Payments: NextPage = () => {

  const [payments, setPayments] = useState([]);
  const token = sessionStorage.getItem("merchantToken");

  useEffect(() => {        
    getPayments();
  }, []);   
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  
  const getPayments = async () => {
      try {
          await axios.get(`${PUBLIC_BASE_URL}${MERCHANT_GET_PRODUCTS_PUBLIC_API_ROUTE}`, {
              headers: headers
          })
          .then((response) => {
            setPayments(response.data.data);
          })
          .catch((error) => {
              console.log(error)
          })  
      } catch (error: any) {
          // console.log(error);
          errorAlert(error.response.data.message);
      } 
  }

    return (
        <>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
            <div className={orderStyles.search}>
              <Search />
            </div>
            <div className={orderStyles.filter}>
              <Button />
            </div>
          </div>
          <div style={{marginLeft: '30px', marginRight: '100px', marginTop: '-30px'}}>
          <table className="table bg-white" style={{width: '90%'}}>
              <tbody>
                <tr style={{color: '#979797'}}>
                  <td>Type</td>
                  <td>Reference</td>
                  <td className="d-none d-sm-table-cell">Amount</td>
                  <td className="d-none d-sm-table-cell">Date</td>
                  <td>Status</td>
                </tr>
                <Link href={PAYMENT_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>Bank Transfer</th>
                    <td>ABC45</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Successful</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link>
                <Link href={PAYMENT_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>Bank Transfer</th>
                    <td>ABC45</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Successful</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link>
                <Link href={PAYMENT_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>Bank Transfer</th>
                    <td>ABC45</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Successful</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link>
                <Link href={PAYMENT_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>Bank Transfer</th>
                    <td>ABC45</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Successful</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link>
                <Link href={PAYMENT_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>Bank Transfer</th>
                    <td>ABC45</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Successful</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link>
                <Link href={PAYMENT_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>Bank Transfer</th>
                    <td>ABC45</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Successful</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link>
                <Link href={PAYMENT_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>Bank Transfer</th>
                    <td>ABC45</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Successful</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link>
                <Link href={PAYMENT_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>Bank Transfer</th>
                    <td>ABC45</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Successful</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link>
                <Link href={PAYMENT_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>Bank Transfer</th>
                    <td>ABC45</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Successful</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link>
                <Link href={PAYMENT_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>Bank Transfer</th>
                    <td>ABC45</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Successful</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link>
              </tbody>
            </table>
          </div>
        </>
    )
}
export default Payments;
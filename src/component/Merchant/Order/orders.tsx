import { NextPage } from "next";
import { useState, useEffect } from "react";
import { orderStyles } from "@src/styles";
import Search from "../Search";
import Button from "../Button/buttonRightIcon";
import Link from "next/link";
import axios from "axios";
import { ORDER_DETAIL_MERCHANT_PAGE_ROUTE, PUBLIC_BASE_URL, MERCHANT_GET_ORDERS_PUBLIC_API_ROUTE } from "@src/services/routes";
import { errorAlert } from "@src/services/alert";

const Orders: NextPage = () => {

  const [orders, setOrders] = useState([]);
  const token = sessionStorage.getItem("merchantToken");

  useEffect(() => {        
    getOrders();
  }, []);   
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  
  const getOrders = async () => {
      try {
          await axios.get(`${PUBLIC_BASE_URL}${MERCHANT_GET_ORDERS_PUBLIC_API_ROUTE}`, {
              headers: headers
          })
          .then((response) => {
            console.log(response)
            setOrders(response.data.data);
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
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className={orderStyles.search}>
              <Search />
            </div>
            <div className={orderStyles.filter}>
              <Button />
            </div>
          </div>
          <div style={{marginLeft: '30px', marginRight: '100px'}}>
            <table className="table bg-white" style={{width: '90%'}}>
              <tbody>
                <tr style={{color: '#979797'}}>
                  <td>Customer</td>
                  <td>Order No</td>
                  <td className="d-none d-sm-table-cell">Amount</td>
                  <td className="d-none d-sm-table-cell">Date</td>
                  <td>Status</td>
                  <td></td>
                </tr>
                <Link href={ORDER_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>John Doe</th>
                    <td>#12345</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Delivered</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link>
                <Link href={ORDER_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>John Doe</th>
                    <td>#12345</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Delivered</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link> <Link href={ORDER_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>John Doe</th>
                    <td>#12345</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Delivered</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link> <Link href={ORDER_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>John Doe</th>
                    <td>#12345</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Delivered</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link> <Link href={ORDER_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>John Doe</th>
                    <td>#12345</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Delivered</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link> <Link href={ORDER_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>John Doe</th>
                    <td>#12345</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Delivered</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link> <Link href={ORDER_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>John Doe</th>
                    <td>#12345</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Delivered</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link> <Link href={ORDER_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>John Doe</th>
                    <td>#12345</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Delivered</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link> <Link href={ORDER_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>John Doe</th>
                    <td>#12345</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Delivered</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link> <Link href={ORDER_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>John Doe</th>
                    <td>#12345</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Delivered</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link> <Link href={ORDER_DETAIL_MERCHANT_PAGE_ROUTE}>
                  <tr>
                    <th style={{fontWeight: 'normal'}}>John Doe</th>
                    <td>#12345</td>
                    <td className="d-none d-sm-table-cell">N1,500</td>
                    <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                    <td><span className={orderStyles.delivered}>Delivered</span></td>
                    <td className="d-none d-sm-table-cell">{'>'}</td>
                  </tr>
                </Link>
              </tbody>
            </table>
          </div>
        </>
    )
}
export default Orders;
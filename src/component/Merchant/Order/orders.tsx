import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { orderStyles } from "@src/styles";
import Search from "../Search";
import Button from "../Button/buttonRightIcon";
import axios from "axios";
import { PUBLIC_BASE_URL, MERCHANT_GET_ORDERS_PUBLIC_API_ROUTE, ORDER_DETAIL_MERCHANT_PAGE_ROUTE } from "@src/services/routes";
import { Spinner } from "@src/component";
import Pagination from "@src/component/Pagination";
import { orderStatus } from "@src/constants";

const Orders: NextPage = () => {

  const Router = useRouter();
  const token = sessionStorage.getItem("merchantToken");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);

  useEffect(() => {
    getOrders('All');
  }, []);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const getOrders = async (orderStatus = 'All') => {
    try {
      let orderUrl = `${PUBLIC_BASE_URL}${MERCHANT_GET_ORDERS_PUBLIC_API_ROUTE}`;

      setLoading(true);
      if (orderStatus === 'Pending') {
        orderUrl = `${PUBLIC_BASE_URL}${MERCHANT_GET_ORDERS_PUBLIC_API_ROUTE}?status=pending`
      } else if (orderStatus === 'Processing') {
        orderUrl = `${PUBLIC_BASE_URL}${MERCHANT_GET_ORDERS_PUBLIC_API_ROUTE}?status=paid`
      } else if (orderStatus === 'Delivered') {
        orderUrl = `${PUBLIC_BASE_URL}${MERCHANT_GET_ORDERS_PUBLIC_API_ROUTE}?status=paid`
      } else {
        orderUrl = `${PUBLIC_BASE_URL}${MERCHANT_GET_ORDERS_PUBLIC_API_ROUTE}`
      }

      await axios.get(orderUrl, {
        headers: headers
      })
        .then((response) => {
          setOrders(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        })
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleOrderClick = (order_no: any) => {
    Router.push({
      pathname: `${ORDER_DETAIL_MERCHANT_PAGE_ROUTE}`,
      query: { order_no: order_no },
      // query: { order_no: order_no, data: JSON.stringify(orders) },
    }, `${ORDER_DETAIL_MERCHANT_PAGE_ROUTE}`);
  }

  const handleFilterOrder = (e: any) => {
    let orderStatus = e.target.value;
    if (orderStatus === 'All') {
      getOrders(orderStatus);
    } else if (orderStatus === 'Pending') {
      getOrders(orderStatus);
    } else if (orderStatus === 'Processing') {
      getOrders(orderStatus);
    } else if (orderStatus === 'Delivered') {
      getOrders(orderStatus);
    } else {
      getOrders('All');
    }
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = orders.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(orders.length / recordsPerPage);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className={orderStyles.search}>
          <Search />
        </div>
        <div className={orderStyles.filter}>
          <Button />
        </div>
      </div>
      <div style={{ marginLeft: '30px', marginRight: '100px' }}>
        <table className="table bg-white" style={{ width: '90%' }}>
          <tbody>
            <tr style={{ color: '#979797' }}>
              <td>Customer</td>
              <td>Order No</td>
              <td className="d-none d-sm-table-cell">Amount</td>
              <td className="d-none d-sm-table-cell">Date</td>
              <td>Status</td>
              <td></td>
            </tr>
            {loading && <div className="mt-3"><Spinner /></div>}
            {currentRecords && currentRecords.map((order: {
              _id: React.Key | string
              delivery: any;
              orderNo: string | number;
              totalPrice: number;
              status: string
            }) => <tr style={{ cursor: 'pointer' }} onClick={() => handleOrderClick(order.orderNo)}>
                <th style={{ fontWeight: 'normal' }} className="d-none d-sm-table-cell">{order.delivery.firstName}</th>
                <td>{order.orderNo}</td>
                <td>{order.totalPrice}</td>
                <td className="d-none d-sm-table-cell">24th Apr, 2022</td>
                <td><span className={orderStyles.processing}>{order.status}</span></td>
                <td className="d-none d-sm-table-cell">{'>'}</td>
              </tr>
            )}
          </tbody>
        </table>
        {
          orders && orders.length > 0 ? <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          /> : <></>
        }
      </div>
    </>
  )
}
export default Orders;
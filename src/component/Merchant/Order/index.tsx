import { NextPage } from "next";
import { orderStyles } from "@src/styles";
import Image from "next/image";

const Order: NextPage = () => {
    return (
        <>
          <span style={{marginLeft: '30px', marginBottom: '40px', fontSize: '24px', fontWeight: 600, position:'relative', top: '20px'}}>Recent Order</span>
          <div className="d-flex align-items-center justify-content-center">
            <Image src={'/uploads/empty-order.svg'} width={378} height={413} />
          </div>
          {/* <div style={{marginLeft: '30px', marginRight: '100px'}}>
            <table className="table bg-white">
              <tbody>
                <tr style={{color: '#979797'}}>
                  <td>Customer</td>
                  <td>Order No</td>
                  <td>Amount</td>
                  <td>Date</td>
                  <td>Status</td>
                </tr>
                <tr>
                  <th style={{fontWeight: 'normal'}}>
                    John Doe
                  </th>
                  <td>#12345</td>
                  <td>N1,500</td>
                  <td>24th Apr, 2022</td>
                  <td><span className={orderStyles.delivered}>Delivered</span></td>
                  <td ><span>{'>'}</span></td>
                </tr>
                <tr>
                  <th style={{fontWeight: 'normal'}}>John Doe</th>
                  <td>#12345</td>
                  <td>N1,500</td>
                  <td>24th Apr, 2022</td>
                  <td><span className={orderStyles.delivered}>Delivered</span></td>
                  <td>{'>'}</td>
                </tr>
                <tr>
                  <th style={{fontWeight: 'normal'}}>John Doe</th>
                  <td>#12345</td>
                  <td>N1,500</td>
                  <td>24th Apr, 2022</td>
                  <td><span className={orderStyles.delivered}>Delivered</span></td>
                  <td>{'>'}</td>
                </tr>
                <tr>
                  <th style={{fontWeight: 'normal'}}>John Doe</th>
                  <td>#12345</td>
                  <td>N1,500</td>
                  <td>24th Apr, 2022</td>
                  <td><span className={orderStyles.delivered}>Delivered</span></td>
                  <td>{'>'}</td>
                </tr>
                <tr>
                  <th style={{fontWeight: 'normal'}}>John Doe</th>
                  <td>#12345</td>
                  <td>N1,500</td>
                  <td>24th Apr, 2022</td>
                  <td><span className={orderStyles.delivered}>Delivered</span></td>
                  <td>{'>'}</td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </>
    )
}
export default Order;
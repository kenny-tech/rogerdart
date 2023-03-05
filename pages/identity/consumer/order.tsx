import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Navigation, PageInfo } from "@src/component";
import Sidebar from "@src/component/Sidebar";
import { orderStyles } from "@src/styles";
import Orders from "@src/component/Order/orders";
import withAuth from "@src/services/withAuth";

const Order: NextPage = () => {

    return (
        <div>
            <Head>
                <title>{PageInfo.title} | {"Nigeria's No. 1 Food delivery and restaurant hub."}</title>
                <meta name="description" content="Nigeria's No. 1 Food delivery and restaurant hub." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navigation />
             <div className="container-fluid">
                <div className="row flex-nowrap mt-5">
                    <Sidebar />
                    <div className="col py-3">
                        <div className="row">
                            <div className="col-12">
                                <div className={orderStyles.right} style={{ backgroundColor: '#E3E1E1', height: '1700px'}}>
                                    <p style={{paddingLeft: '50px', paddingTop: '50px', fontSize: '22px', fontWeight: 600}}>Orders</p>
                                    <div className={orderStyles.content}>
                                        <div className={orderStyles.heading}>
                                            <div className="row">
                                                {/* <SearchBox /> */}
                                                <div className="mt-4"></div>
                                                {/* <div className={orderStyles.orderHeadings}>
                                                    <p style={{fontSize: '16px', fontWeight: 400}}>Order</p>
                                                    <p style={{position: 'relative', left: '100px', fontSize: '16px', fontWeight: 400}}>Amount</p>
                                                    <p style={{position: 'relative', left: '30px', fontSize: '16px', fontWeight: 400}}>Date</p>
                                                    <p style={{position: 'relative', left: '8px', fontSize: '16px', fontWeight: 400}}>Order status</p>
                                                    <p></p>
                                                </div> */}
                                                <Orders />
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default withAuth(Order);

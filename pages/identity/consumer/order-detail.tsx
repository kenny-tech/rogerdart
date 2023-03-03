import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Navigation, PageInfo } from "@src/component";
import Sidebar from "@src/component/Sidebar";
import { orderStyles } from "@src/styles";
import OrderDetail from "@src/component/Order/orderDetail";
import withAuth from "@src/services/withAuth";

const CustomerOrderDetail: NextPage = () => {

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
                                    <p style={{paddingLeft: '50px', paddingTop: '50px', fontSize: '22px', fontWeight: 600}}>Order Details</p>
                                    <div className={orderStyles.content}>
                                        <div className={orderStyles.heading}>
                                            <div className="row">
                                                <div className="mt-4"></div>
                                                <OrderDetail />
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

export default withAuth(CustomerOrderDetail);

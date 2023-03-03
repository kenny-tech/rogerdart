import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Navigation, PageInfo } from "@src/component";
import Sidebar from "@src/component/Sidebar";
import { notificationStyles } from "@src/styles";
import Notify from "@src/component/Notification";
import withAuth from "@src/services/withAuth";

const Notification: NextPage = () => {

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
                                <div className={notificationStyles.right} style={{ backgroundColor: '#E3E1E1', height: '900px'}}>
                                    <p style={{paddingLeft: '50px', paddingTop: '50px', fontSize: '22px', fontWeight: 600}}>Notification</p>
                                    <div className={notificationStyles.content}>
                                        <div className={notificationStyles.heading}>
                                            <div className="row">
                                                <br/>
                                                <div className={notificationStyles.heading}>
                                                    <p className={notificationStyles.notificationTitle}>Notification Settings</p>
                                                </div>
                                                <Notify />
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

export default withAuth(Notification);
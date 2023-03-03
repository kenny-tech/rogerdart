import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Navigation, PageInfo } from "@src/component";
import Sidebar from "@src/component/Sidebar";
import { privacyStyles } from "@src/styles";
import UserPrivacy from "@src/component/Privacy";
import withAuth from "@src/services/withAuth";

const Privacy: NextPage = () => {

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
                                <div className={privacyStyles.right} style={{ backgroundColor: '#E3E1E1', height: '1000px'}}>
                                    <p style={{paddingLeft: '50px', paddingTop: '50px', fontSize: '22px', fontWeight: 600}}>Privacy</p>
                                    <div className={privacyStyles.content}>
                                        <div className={privacyStyles.heading}>
                                            <div className="row">
                                                <br/>
                                                <UserPrivacy />
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

export default withAuth(Privacy);
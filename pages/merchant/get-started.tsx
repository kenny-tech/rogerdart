import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { PageInfo } from "@src/component";
import InactiveSidebar from "@src/component/Merchant/Sidebar/inactive-sidebar";
import { onboardingStyles } from "@src/styles";
import Order from "@src/component/Merchant/Order";
import MerchantGetStarted from "@src/component/Merchant/Order/get-started";
import { Header } from "@src/component/Merchant/Nav/header";
import withAuthMerchant from "@src/services/withAuthMerchant";

const GetStarted: NextPage = () => {

    return (
        <div>
            <Head>
                <title>{PageInfo.title} | {"Nigeria's No. 1 Food delivery and restaurant hub."}</title>
                <meta name="description" content="Nigeria's No. 1 Food delivery and restaurant hub." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="container-fluid">
                <div className="row flex-nowrap mt-5">
                    <InactiveSidebar />
                    <div className="col py-3">
                        <div className="row">
                            <div className="col-12">
                                <div className={onboardingStyles.right} style={{ backgroundColor: '#E3E1E1'}}>
                                    <div className={onboardingStyles.content}>
                                        <span style={{marginLeft: '30px', fontSize: '24px', fontWeight: 600, position:'relative', top: '20px'}}>Dashboard</span>
                                        <div className={onboardingStyles.heading}>
                                            <div className="row mt-4">
                                                <MerchantGetStarted />
                                            </div>  
                                        </div>
                                        <div>
                                            <div className="row mt-4">
                                                <Order />
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

export default withAuthMerchant(GetStarted);
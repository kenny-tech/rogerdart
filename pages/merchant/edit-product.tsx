import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { PageInfo } from "@src/component";
import Sidebar from "@src/component/Merchant/Sidebar";
import { productStyles } from "@src/styles";
import EditProductForm from "@src/component/Merchant/Products/edit-product";
import { Header } from "@src/component/Merchant/Nav/header";
import withAuthMerchant from "@src/services/withAuthMerchant";

const EditProduct: NextPage = () => {

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
                    <Sidebar />
                    <div className="col py-3">
                        <div className="row">
                            <div className="col-12">
                                <div className={productStyles.right} style={{ backgroundColor: '#E3E1E1'}}>
                                    <div className={productStyles.content}>
                                        <div className={productStyles.heading}>
                                            <div className="row">
                                                <div className="col-md-3 mt-3 mb-3">
                                                    <p style={{color: '#000', fontSize: '18px', whiteSpace: 'nowrap', marginLeft: '30px'}}>Edit Product</p>
                                                </div>
                                            </div>  
                                        </div>
                                        <hr style={{color: '#E0E0E0', marginTop: '1px', marginBottom: '1px'}}/>
                                        <EditProductForm />
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

export default withAuthMerchant(EditProduct);
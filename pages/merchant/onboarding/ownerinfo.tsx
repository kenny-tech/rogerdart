import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import * as Icon from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { PageInfo } from "@src/component";
import InactiveSidebar from "@src/component/Merchant/Sidebar/inactive-sidebar";
import { onboardingStyles } from "@src/styles";
import { Header } from "@src/component/Merchant/Nav/header";
import { PUBLIC_BASE_URL, GET_PROFILE_API_ROUTE, BUSINESS_INFO_MERCHANT_PAGE_ROUTE } from "@src/services/routes";
import OnboardingNav from "@src/component/Merchant/Onboarding/onboardingNav";
import withAuthMerchant from "@src/services/withAuthMerchant";

const OwnerInfo: NextPage = () => {

    const Router = useRouter();

    const firstname:any  = sessionStorage.getItem("firstName");
    const lastname:any  = sessionStorage.getItem("lastName");
    const merchantemail:any  = sessionStorage.getItem("email");

    const [firstName, setFirstName] = useState<string>(firstname);
    const [lastName, setLastName] = useState<string>(lastname);
    const [email, setEmail] = useState<string>(merchantemail);
    const [street1, setStreet1] = useState<string>('');
    const [street2, setStreet2] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const token = sessionStorage.getItem("merchantToken");
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    useEffect(() => {
        getProfile();
    }, []);

    const handleSubmit = () => {
        Router.push({
            pathname: BUSINESS_INFO_MERCHANT_PAGE_ROUTE,
            query: { name: 'Business Info (KYC)' }
        });
    }

    const getProfile = async () => {
        try {
            setLoading(true);
            await axios.get(`${PUBLIC_BASE_URL}${GET_PROFILE_API_ROUTE}`, {
                headers: headers
            })
            .then((response) => {
                // console.log('Profile : ', response.data.data);
                setFirstName(response.data.data.firstName);
                setLastName(response.data.data.lastName);
                setEmail(response.data.data.email);
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
                                        <OnboardingNav/>
                                        <hr style={{color: '#E0E0E0', marginTop: '1px', marginBottom: '1px'}}/>
                                        <div className={onboardingStyles.onboardingContent}>
                                            <div className="row">
                                                <div className="col-11">
                                                    <div className="card border-0">
                                                        <div className="card-body">
                                                            <h5 className="card-title">Owner Information</h5>
                                                            <form>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">First Name</label>
                                                                            <input type="text" className="form-control" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">Last Name</label>
                                                                            <input type="text" className="form-control" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">Email</label>
                                                                            <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">Street 1</label>
                                                                            <input type="text" className="form-control" name="street1" value={street1} onChange={(e) => setStreet1(e.target.value)}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">Street 2</label>
                                                                            <input type="text" className="form-control" name="street2" value={street2} onChange={(e) => setStreet2(e.target.value)}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">City</label>
                                                                            <select className="form-control" name="city" value={city} onChange={(e) => setCity(e.target.value)}></select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">State</label>
                                                                            <select className="form-control" name="state" value={state} onChange={(e) => setState(e.target.value)}></select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>  
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="mb-3 mt-3 ml-3 mr-3">
                                                                <div className={onboardingStyles.next} onClick={handleSubmit}>
                                                                    <p style={{color: '#fff', fontSize: '16px', paddingTop: '10px'}}>Next <Icon.ArrowRightIcon width={20} height={20}/></p>
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
                        </div>
                    </div>
                </div>
            </div>    
    </div>
    )
}

export default withAuthMerchant(OwnerInfo);
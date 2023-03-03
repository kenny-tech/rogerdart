import { NextPage } from "next";
import { useEffect } from "react";
import { onboardingStyles } from "@src/styles";
import { useState } from "react";
import Head from "next/head";
import { Header } from "@src/component/Merchant/Nav/header";
import { PageInfo } from "@src/component";
import { useRouter } from "next/router";
import { FINAL_STEP_MERCHANT_PAGE_ROUTE } from "@src/services/routes";
import axios from "axios";
import Swal from "sweetalert2";
import * as Icon from "@heroicons/react/outline";
import { successAlert, errorAlert } from "@src/services/alert";
import { PUBLIC_BASE_URL, MERCHANT_SUBSCRIPTION_PUBLIC_API_ROUTE, GET_PROFILE_API_ROUTE } from "@src/services/routes";
import InactiveSidebar from "@src/component/Merchant/Sidebar/inactive-sidebar";
import OnboardingNav from "@src/component/Merchant/Onboarding/onboardingNav";
import withAuthMerchant from "@src/services/withAuthMerchant";

const BusinessInfo: NextPage = () => {

    const Router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [plan, setPlan] = useState<string>('');
    const token = sessionStorage.getItem("merchantToken");

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            setLoading(true);
            await axios.get(`${PUBLIC_BASE_URL}${GET_PROFILE_API_ROUTE}`, {
                headers: headers
            })
            .then((response) => {
                console.log('Profile : ', response.data.data);
                setPlan(response.data.data.kyc.package);
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

    const handleSubcribe = (type: string) => {
        Swal.fire({
            title: 'Service Subscription',
            text: `Are you sure you want to subscribe for ${type} plan?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#FCA311',
          }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    package: type
                }

                // console.log(data);
        
                axios.patch(`${PUBLIC_BASE_URL}${MERCHANT_SUBSCRIPTION_PUBLIC_API_ROUTE}`, data,  {
                    headers: headers
                })
                .then(function (response) {
                    if(response.statusText) {
                        // console.log(response)
                        successAlert('Subscription successful.');
                        setLoading(false);
                        Router.push({
                            pathname: FINAL_STEP_MERCHANT_PAGE_ROUTE,
                            query: { name: 'Final Step' }
                        });
                    } else {
                        errorAlert('Subscription failed. Please try again.');
                    }
                })
                .catch(function (error) {
                    errorAlert(error.response.data.message);
                    setLoading(false);                  
                });
            }
          })
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
                                        <OnboardingNav />
                                        <hr style={{color: '#E0E0E0', marginTop: '1px', marginBottom: '1px'}}/>
                                        <div className={onboardingStyles.onboardingContent}>
                                            <div className="row">
                                                <div className="col-11">
                                                    <div className="card border-0">
                                                        <div className="card-body">
                                                            <h5 className="card-title">Service Subscription</h5>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="card bg-white border-0 mb-3">
                                                                <div className="card-body">
                                                                    <h3 className={onboardingStyles.subscriptionTitle}>
                                                                        Basic {plan === 'BASIC' ? <span><Icon.CheckCircleIcon width={25} height={25} color='#F2C94C'/></span> : null}
                                                                    </h3>
                                                                    <p className={onboardingStyles.percent}>10%<span className={onboardingStyles.month}> / month</span></p>
                                                                    <p className={onboardingStyles.description}>A 10% deduction would be taken from your monthly orders</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Free online store</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> 2 staff accounts</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> 2GB storage</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Unlimited Products / Orders</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Sell ebooks, music etc</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Email support</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Help center access</p>
                                                                    <div className={onboardingStyles.getStartedButtonBorder} onClick={() => handleSubcribe('BASIC')}>
                                                                        <p style={{fontSize: '18px', fontWeight: 700}}> Get Started
                                                                        </p>
                                                                    </div>   
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="card bg-white border-0 mb-3">
                                                                <div className="card-body">
                                                                    <h3 className={onboardingStyles.subscriptionTitle}>
                                                                        Premium {plan === 'PREMIUM' ? <span><Icon.CheckCircleIcon width={25} height={25} color='#F2C94C'/></span> : null}
                                                                    </h3>
                                                                    <p className={onboardingStyles.percent}>10%<span className={onboardingStyles.month}> / month</span></p>
                                                                    <p className={onboardingStyles.description}>A 10% deduction would be taken from your monthly orders</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Free online store</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> 2 staff accounts</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> 2GB storage</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Unlimited Products / Orders</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Sell ebooks, music etc</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Email support</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Help center access</p>
                                                                    <div className={onboardingStyles.getStartedButton} onClick={() => handleSubcribe('PREMIUM')}>
                                                                        <p style={{fontSize: '18px', fontWeight: 700}}> Get Started
                                                                        </p>
                                                                    </div>   
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="card bg-white border-0 mb-3">
                                                                <div className="card-body">
                                                                    <h3 className={onboardingStyles.subscriptionTitle}>
                                                                        Diamond {plan === 'DIAMOND' ? <span><Icon.CheckCircleIcon width={25} height={25} color='#F2C94C'/></span> : null}
                                                                    </h3>
                                                                    <p className={onboardingStyles.percent}>10%<span className={onboardingStyles.month}> / month</span></p>
                                                                    <p className={onboardingStyles.description}>A 10% deduction would be taken from your monthly orders</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Free online store</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> 2 staff accounts</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> 2GB storage</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Unlimited Products / Orders</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Sell ebooks, music etc</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Email support</p>
                                                                    <p className={onboardingStyles.subsctiptionText}><Icon.CheckIcon width={20} height={20} color='#F2C94C'/> Help center access</p>
                                                                    <div className={onboardingStyles.getStartedButtonBorder} onClick={() => handleSubcribe('DIAMOND')}>
                                                                        <p style={{fontSize: '18px', fontWeight: 700}}> Get Started
                                                                        </p>
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
        </div>
    )
}

export default withAuthMerchant(BusinessInfo);
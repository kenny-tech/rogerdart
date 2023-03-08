import { NextPage } from "next";
import { useEffect } from "react";
import { onboardingStyles } from "@src/styles";
import { merchantPageStyles } from "@src/styles";
import * as Icon from "@heroicons/react/outline";
import Head from "next/head";
import { PageInfo } from "@src/component";
import { Header } from "@src/component/Merchant/Nav/header";
import { ChangeEvent, useRef, useState } from 'react';
import axios from "axios";
import { useRouter } from "next/router";
import { SUBSCRIPTION_MERCHANT_PAGE_ROUTE } from "@src/services/routes";
import { PUBLIC_BASE_URL, FILE_UPLOAD_PUBLIC_API_ROUTE, MERCHANT_IDENTITY_PUBLIC_API_ROUTE, GET_PROFILE_API_ROUTE } from "@src/services/routes";
import { successAlert, errorAlert } from "@src/services/alert";
import Image from "next/image";
import InactiveSidebar from "@src/component/Merchant/Sidebar/inactive-sidebar";
import OnboardingNav from "@src/component/Merchant/Onboarding/onboardingNav";
import withAuthMerchant from "@src/services/withAuthMerchant";

const FinalStep: NextPage = () => {

    const Router = useRouter();
    const phoneNumber:any  = sessionStorage.getItem("phoneNumber");

    const [phone, setPhone] = useState<any>(phoneNumber || '');
    const [file, setFile] = useState<File>();
    const [fileId, setFileId] = useState<string>('');
    const [ninLink, setNinLink] = useState<any>(sessionStorage.getItem('merchantNin') || '');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const token = sessionStorage.getItem("merchantToken");

    const [phoneError, setPhoneError] = useState<string>('');
    const [ninLinkError, setNinLinkError] = useState<string>('');

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
                console.log(response.data.data);
                setPhone(response.data.data.phone);
                setNinLink(response.data.data.kyc.identityVerification);
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

    const handleUploadClick = () => {
        // Redirect the click event onto the hidden input element
        inputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        const data = new FormData(); 
        
        if (!e.target.files || e.target.files.length === 0) {
            console.error("Select a file");
            return;
        }

        data.append('file', e.target.files[0]);
        
        axios.post(`${PUBLIC_BASE_URL}${FILE_UPLOAD_PUBLIC_API_ROUTE}`, data,  {
            headers: headers
        })
        .then(function (response) {
            console.log(response);
            if(response.statusText) {
                setFileId(response.data.data.fileId);
                setNinLink(response.data.data.uri);
                setLoading(false);
            } else {
                errorAlert('Unable to process file. Please try again.');
            }
        })
        .catch(function (error) {
            errorAlert(error.response.data.message);
            setLoading(false);
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setLoading(false);

        if (phone.length == 0){
            setPhoneError('Phone number is required');
            setLoading(false);
        } else if(ninLink == '') {
            setNinLinkError('Identity is required');
            setLoading(false);
        } else{
            setLoading(true);
            let data = {
                identityVerification: fileId,
                phone: phone
            }

            sessionStorage.setItem('merchantPhone', phone);
            sessionStorage.setItem('merchantNin', ninLink);
            console.log(data);

            axios.patch(`${PUBLIC_BASE_URL}${MERCHANT_IDENTITY_PUBLIC_API_ROUTE}`, data,  {
                headers: headers
            })
            .then(function (response) {
                if(response.statusText) {
                    // console.log(response)
                    successAlert('Business identity successfully updated');
                    setLoading(false);
                } else {
                    errorAlert('Unable to update your business identity. Please try again.');
                }
            })
            .catch(function (error) {
                errorAlert(error.response.data.message);
                setLoading(false);
            });
        }
    }

    const handleLoadPreviousPage = () => {
        Router.push({
            pathname: SUBSCRIPTION_MERCHANT_PAGE_ROUTE,
            query: { name: 'Service Subscription' }
        });
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
                                                            <h5 className="card-title">Final Step</h5>
                                                            <form>
                                                                <div className="row">
                                                                    <div className="col-md-12" onClick={handleUploadClick}>
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">Identity Verification</label>
                                                                            <div className={onboardingStyles.identity}>
                                                                                <div>
                                                                                    <Icon.CameraIcon width={60} height={60} color='#696F79'/>
                                                                                </div>
                                                                                <div>
                                                                                    <p style={{color: '#696F79'}}>Click to take a picture with your NIN</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {ninLink !== ''? <Image src={ninLink} width={400} height={200}/> : null}
                                                                    </div>
                                                                    {ninLink.length === 0 &&  <span className={merchantPageStyles.error}> {ninLinkError} </span>}
                                                                    <input
                                                                        type="file"
                                                                        ref={inputRef}
                                                                        onChange={handleFileChange}
                                                                        style={{ display: 'none' }}
                                                                    />
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">Phone Number</label>
                                                                            <input type="text" className="form-control" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                                                        </div>
                                                                    </div>
                                                                    {phoneError &&  <span className={merchantPageStyles.error}> {phoneError} </span>}
                                                                </div>
                                                            </form> 
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3 mt-3 ml-3 mr-3">
                                                                <div className={onboardingStyles.previousButton} onClick={handleLoadPreviousPage}>
                                                                    <p style={{color: '#FCA311;', fontSize: '16px', paddingTop: '5px', paddingLeft: '10px'}}><Icon.ArrowLeftIcon width={20} height={20}/> Previous</p>
                                                                </div>   
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3 mt-3 ml-3 mr-3">
                                                                <div className={onboardingStyles.nextButton} onClick={handleSubmit}>
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

export default withAuthMerchant(FinalStep);
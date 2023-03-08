import { NextPage } from "next";
import { onboardingStyles } from "@src/styles";
import { merchantPageStyles } from "@src/styles";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import Head from "next/head";
import { Header } from "@src/component/Merchant/Nav/header";
import { useRouter } from "next/router";
import { PageInfo } from "@src/component";
import axios from "axios";
import * as Icon from "@heroicons/react/outline";
import { successAlert, errorAlert } from "@src/services/alert";
import { PUBLIC_BASE_URL, MERCHANT_KYC_PUBLIC_API_ROUTE, FILE_UPLOAD_PUBLIC_API_ROUTE, OWNER_INFO_MERCHANT_PAGE_ROUTE, SUBSCRIPTION_MERCHANT_PAGE_ROUTE, GET_PROFILE_API_ROUTE } from "@src/services/routes";
import Image from "next/image";
import InactiveSidebar from "@src/component/Merchant/Sidebar/inactive-sidebar";
import OnboardingNav from "@src/component/Merchant/Onboarding/onboardingNav";
import withAuthMerchant from "@src/services/withAuthMerchant";

const BusinessInfo: NextPage = () => {

    const Router = useRouter();

    const businessname:any  = sessionStorage.getItem("businessName");
    const businesstype:any  = sessionStorage.getItem("businessType");

    const [businessName, setBusinessName] = useState<string>(businessname || '');
    const [businessRegNo, setBusinessRegNo] = useState<string>('');
    const [businessType, setBusinessType] = useState(businesstype || '');
    const [bvn, setBvn] = useState<string>('');
    const [nin, setNin] = useState<string>('');
    const [utilityBill, setUtilityBill] = useState<File | null>();
    const [utilityBillLink, setUtilityBillLink] = useState<string>('');
    const [voterscardDriverLicence, setVoterscardDriverlicence] = useState<File | null>();
    const [driverLicenseVoterCardLink, setDriverLicenceVoterCardLink] = useState<string>('');
    const [utilityBillFileId, setUtilityBillFileId] = useState<string>('');
    const [voterscardDriverLicenceFileId, setVoterscardDriverLicenceFileId] = useState<string>('');

    const [file, setFile] = useState<File>();
    const inputRefUtilityUtility = useRef<HTMLInputElement | null>(null);
    const inputRefUtilityLicence = useRef<HTMLInputElement | null>(null);

    const [businessNameError, setBusinessNameError] = useState<string>('');
    const [businessRegNoError, setBusinessRegNoError] = useState<string>('');
    const [businessTypeError, setBusinessTypeError] = useState<string>('');
    const [bvnError, setBvnError] = useState<string>('');
    const [utilityBillError, setUtilityBillError] = useState<string>('');
    const [voterscardDriverLicenceError, setVoterscardDriverLicenceError] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const token = sessionStorage.getItem("merchantToken");

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    useEffect(() => {
        getProfile();
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setLoading(false);

        if (businessName.length == 0){
            setBusinessNameError('Business Name is required');
            setLoading(false);
        } else if (businessRegNo.length == 0){
            setBusinessRegNoError('Business Registration Number is required');
            setLoading(false);
        } else if (businessType.length == 0){
            setBusinessTypeError('Business Type is required');
            setLoading(false);
        } else if (bvn.length == 0){
            setBvnError('BVN is required');
            setLoading(false);
        }  else{
            setLoading(true);
            let data = {
                businessName,
                businessNumber: businessRegNo,
                businessType,
                bvn,
                nin,
                utilityBill: utilityBillFileId,
                driverLicense: voterscardDriverLicenceFileId
            }

            // console.log(data);

            axios.patch(`${PUBLIC_BASE_URL}${MERCHANT_KYC_PUBLIC_API_ROUTE}`, data,  {
                headers: headers
            })
            .then(function (response) {
                if(response.statusText) {
                    console.log('Submitted response: ',response.data);

                    successAlert('Profile successfully updated');
                    setLoading(false);
                    Router.push({
                        pathname: SUBSCRIPTION_MERCHANT_PAGE_ROUTE,
                        query: { name: 'Service Subscription' }
                    })
                } else {
                    errorAlert('Unable to update your profile. Please try again.');
                }
            })
            .catch(function (error) {
                errorAlert(error.response.data.message);
                setLoading(false);
                // if( error.response.data.message = 'jwt expired') {
                //     errorAlert('Your session has expired. Please Sign in again.');
                //     merchantSignOut();
                // } else {
                //     errorAlert(error.response.data.message);
                //     setLoading(false);
                // }
            });
        }
    }

    const handleUploadUitilityBillClick = () => {
        // Redirect the click event onto the hidden input element
        inputRefUtilityUtility.current?.click();
        setLoading(false);
    };

    const handleVotersCardDriverLicenceClick = () => {
        // Redirect the click event onto the hidden input element
        inputRefUtilityLicence.current?.click();
        setLoading(false);
    }
    
    const handleUtilityBillFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
          setUtilityBillError('Please upload your utiility bill');
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
            console.log('Utility bill upload response: ', response.data.data);

            if(response.data.statusCode) {
                setUtilityBillLink(response.data.data.uri);
                setUtilityBillFileId(response.data.data.fileId);
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

    const handleVoterCardDriverLicenceChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            setVoterscardDriverLicenceError('Please upload Voters card or Drivers Licence');
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
            console.log('Voter card Driver Licence upload response: ', response.data.data);

            if(response.data.statusCode) {
                setDriverLicenceVoterCardLink(response.data.data.uri);
                setVoterscardDriverLicenceFileId(response.data.data.fileId);
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

    const handleLoadPreviousPage = () => {
        Router.push({
            pathname: OWNER_INFO_MERCHANT_PAGE_ROUTE,
            query: { name: 'Owner Information' }
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
                setBusinessName(response.data.data.kyc.businessName);
                setBusinessRegNo(response.data.data.kyc.businessNumber);
                setBusinessType(response.data.data.kyc.businessType);
                setBusinessType(response.data.data.kyc.businessType);
                setBvn(response.data.data.kyc.bvn);
                setNin(response.data.data.kyc.nin);
                setUtilityBillLink(response.data.data.kyc.utilityBill);
                setDriverLicenceVoterCardLink(response.data.data.kyc.driverLicense);
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
                                        <OnboardingNav />
                                        <hr style={{color: '#E0E0E0', marginTop: '1px', marginBottom: '1px'}}/>
                                        <div className={onboardingStyles.onboardingContent}>
                                            <div className="row">
                                                <div className="col-11">
                                                    <div className="card border-0">
                                                        <div className="card-body">
                                                            <h5 className="card-title">Business Info (KYC)</h5>
                                                            <form>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">Business Name*</label>
                                                                            <input type="text" className="form-control" name="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)}/>
                                                                            {businessNameError &&  <span className={merchantPageStyles.error}> {businessNameError} </span>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">Business registration number*</label>
                                                                            <input type="text" className="form-control" name="businessRegNo" value={businessRegNo} onChange={(e) => setBusinessRegNo(e.target.value)}/>
                                                                            {businessRegNoError &&  <span className={merchantPageStyles.error}> {businessRegNoError} </span>}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">Business type*</label>
                                                                            <input type="text" className="form-control" name="businessType" value={businessType} onChange={(e) => setBusinessType(e.target.value)}/>
                                                                            {businessTypeError &&  <span className={merchantPageStyles.error}> {businessTypeError} </span>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">Bank verification number (BVN)*</label>
                                                                            <input type="text" className="form-control" name="bvn" value={bvn} onChange={(e) => setBvn(e.target.value)}/>
                                                                            {bvnError &&  <span className={merchantPageStyles.error}> {bvnError} </span>}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">National identification number (NIN)</label>
                                                                            <input type="text" className="form-control" name="nin" value={nin} onChange={(e) => setNin(e.target.value)}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">Utility Bill*</label>
                                                                            <div className={onboardingStyles.upload} style={{display: 'pointer'}} onClick={() => handleUploadUitilityBillClick()}>
                                                                                <Icon.UploadIcon width={20} height={20} style={{marginLeft: '10px'}}/><span className={onboardingStyles.uploadText}>Choose document to upload</span>
                                                                            </div>
                                                                        </div>
                                                                        <input
                                                                            type="file"
                                                                            ref={inputRefUtilityUtility}
                                                                            onChange={handleUtilityBillFileChange}
                                                                            style={{ display: 'none' }}
                                                                        />
                                                                        {utilityBillLink !== ''? <Image src={utilityBillLink} width={400} height={200}/> : null}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                                                            <label className="form-label">Voters card / Drivers Licence*</label>
                                                                            <div className={onboardingStyles.upload} style={{display: 'pointer'}} onClick={() => handleVotersCardDriverLicenceClick()}>
                                                                                <Icon.UploadIcon width={20} height={20} style={{marginLeft: '10px'}}/><span className={onboardingStyles.uploadText}>Choose document to upload</span>
                                                                            </div>
                                                                            {voterscardDriverLicenceError &&  <span className={merchantPageStyles.error}> {voterscardDriverLicenceError} </span>}
                                                                        </div>
                                                                        <input
                                                                            type="file"
                                                                            ref={inputRefUtilityLicence}
                                                                            onChange={(e) => handleVoterCardDriverLicenceChange(e)}
                                                                            style={{ display: 'none' }}
                                                                        />
                                                                        {driverLicenseVoterCardLink !== ''? <Image src={driverLicenseVoterCardLink} width={400} height={200}/> : null}
                                                                    </div>
                                                                </div>
                                                            </form>  
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3 mt-3 ml-3 mr-3">
                                                                <div className={onboardingStyles.previousButton} onClick={() => handleLoadPreviousPage()}>
                                                                    <p style={{color: '#FCA311;', fontSize: '16px', paddingTop: '5px', paddingLeft: '10px', cursor: 'pointer'}}><Icon.ArrowLeftIcon width={20} height={20}/> Previous</p>
                                                                </div>   
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3 mt-3 ml-3 mr-3">
                                                                <div className={onboardingStyles.nextButton} onClick={(event) => handleSubmit(event)}>
                                                                    <p style={{color: '#fff', fontSize: '16px', paddingTop: '10px', cursor: 'pointer'}}>Next <Icon.ArrowRightIcon width={20} height={20}/></p>
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
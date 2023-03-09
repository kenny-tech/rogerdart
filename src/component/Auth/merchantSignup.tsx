import { signupStyles } from '@src/styles';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Head from 'next/head';
import { PageInfo } from "@src/component";
import { AuthNavbar } from '../Header';
import { SIGN_IN_MERCHANT_PUBLIC_API_ROUTE } from '@src/services/routes';
import Link from 'next/link';
import AuthContext from '@src/services/authContext';
import { EllipseAnimation } from '@src/component';
import { states, cities } from "@src/constants";

const MerchantSignup = () => {

    const router = useRouter();
    const { merchantSignUp } = useContext(AuthContext);

    const [registrationDetails, setRegistrationDetails] = useState({
        merchantName:'',
        merchantEmail:'',
        merchantAddress1:'',
        merchantAddress2:'',
        merchantStreet:'',
        merchantCity:'',
        merchantState:'',
        merchantPassword:'',
    })

    const [errors, setErrors] = useState({
        merchantNameError:'',
        merchantEmailError:'',
        merchantAddress1Error:'',
        merchantAddress2Error:'',
        merchantStreetError:'',
        merchantCityError:'',
        merchantStateError:'',
        merchantPasswordError:'',
    })

    const [isLoading, setIsloading] = useState(false);
    const [stateCities, setStateCities] = useState<any>([]);

    const handleChange = (e:any) => {
        const { name, value } = e.target;

        setRegistrationDetails({
            ...registrationDetails,
            [name]:value
        })
    }

    function processSignUp(e: any){

        setIsloading(true);
        let emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if(registrationDetails.merchantName.length < 1){
            setErrors({
                ...errors,
                merchantNameError: `Name is required`
            })
            setIsloading(false);
        } 
        else if(registrationDetails.merchantEmail.length === 0){
            setErrors({
                ...errors,
                merchantEmailError: `Email is required`
            })
            setIsloading(false);
        }
        else if(emailValidator.test(registrationDetails.merchantEmail) === false){
            setErrors({
                ...errors,
                merchantEmailError: `${registrationDetails.merchantEmail} is not a valid email address`
            })
            setIsloading(false);
        } else if(registrationDetails.merchantAddress1.length < 1){
            setErrors({
                ...errors,
                merchantAddress1Error: `Address is required`
            })
            setIsloading(false);
        } else if(registrationDetails.merchantCity.length < 1){
            setErrors({
                ...errors,
                merchantCityError: `City is required`
            })
            setIsloading(false);
        } else if(registrationDetails.merchantState.length < 1){
            setErrors({
                ...errors,
                merchantStateError: `State is required`
            })
            setIsloading(false);
        } 
        else if (registrationDetails.merchantPassword.length === 0){
            setErrors({
                ...errors,
                merchantPasswordError: `Password is required`
            })
            setIsloading(false);
        }else if(registrationDetails.merchantPassword.length < 6){
            setErrors({
                ...errors,
                merchantPasswordError: `Your password length should be 6 characters or more`
            })
            setIsloading(false);
        } else {    
            merchantSignUp(e, {merchantName:registrationDetails.merchantName, merchantEmail:registrationDetails.merchantEmail, merchantAddress1:registrationDetails.merchantAddress1, merchantAddress2:registrationDetails.merchantAddress2, merchantStreet:registrationDetails.merchantStreet, merchantCity:registrationDetails.merchantCity, merchantState:registrationDetails.merchantState, merchantPassword: registrationDetails.merchantPassword})
        }
    }

    const handleStateChange = (e:any) =>{
        setRegistrationDetails((prevState) => ({
            ...prevState,
            merchantState: e.target.value
          }));
        const result = cities.filter(city => city.state === e.target.value);
        setStateCities(result);
    }


    return (
        <div>
            <Head>
                <title>{PageInfo.title}</title>
                <meta name="description" content="Nigeria's No. 1 Food delivery and restaurant hub." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AuthNavbar />
            <br />
            <div className={signupStyles.formContainer}>
                <h1>Sign Up</h1>
                <br/>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className={signupStyles.inputTextFullwidth}>
                            <label className="form-label">Business Name</label>
                            <input type="text" className="form-control" name="merchantName" value={registrationDetails.merchantName} onChange={handleChange}/>
                            {errors.merchantNameError &&  <span className={signupStyles.error}> {errors.merchantNameError} </span>}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className={signupStyles.inputTextFullwidth}>
                            <label className="form-label">Email Address</label>
                            <input type="text" className="form-control" name="merchantEmail" onChange={handleChange} value={registrationDetails.merchantEmail}/>
                            {errors.merchantEmailError &&  <span className={signupStyles.error}> {errors.merchantEmailError} </span>}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className={signupStyles.inputTextFullwidth}>
                            <label className="form-label">Business Address (Street 1)</label>
                            <input type="text" className="form-control" name="merchantAddress1" onChange={handleChange} value={registrationDetails.merchantAddress1}/>
                            {errors.merchantAddress1Error &&  <span className={signupStyles.error}> {errors.merchantAddress1Error} </span>}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className={signupStyles.inputTextFullwidth}>
                            <label className="form-label">Street 2</label>
                            <input type="text" className="form-control" name="merchantAddress2" onChange={handleChange} value={registrationDetails.merchantAddress2}/>
                            {errors.merchantStreetError &&  <span className={signupStyles.error}> {errors.merchantStreetError} </span>}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className={signupStyles.inputText}>
                            <label className="form-label">State</label>
                            <select className="form-control" name="merchantState" onChange={(e) => handleStateChange(e)} value={registrationDetails.merchantState}>
                                <option value="">Select State</option>
                                {states && states.map((state:any)=><option value={state.name} key={state.id}>{state.name}</option>)}
                            </select>
                            {errors.merchantStateError &&  <span className={signupStyles.error}> {errors.merchantStateError} </span>}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className={signupStyles.inputText}>
                            <label className="form-label">City</label>
                            <select className="form-control" name="merchantCity" onChange={handleChange} value={registrationDetails.merchantCity}>
                                <option value="">Select City</option>
                                {stateCities && stateCities.map((city:any)=><option value={city.name} key={city.id}>{city.name}</option>)}
                            </select>
                            {errors.merchantCityError &&  <span className={signupStyles.error}> {errors.merchantCityError} </span>}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className={signupStyles.inputTextFullwidth}>
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name="merchantPassword" onChange={handleChange} value={registrationDetails.merchantPassword}/>
                            {errors.merchantPasswordError &&  <span className={signupStyles.error}> {errors.merchantPasswordError} </span>}
                        </div>
                    </div>
                </div>
                {isLoading ? 
                <div className={signupStyles.submitButtonMerchant} style={{display:'flex', alignItems:'center'}}>
                    <p className='mt-3'>Please Wait</p>
                    <EllipseAnimation />
                </div>:
                <button className={signupStyles.submitButtonMerchant} type='submit' onClick={processSignUp}>Sign Up</button>}
                <p className={signupStyles.orText}>Or</p>
                    <span className={signupStyles.googleButtonSignup}>
                        <svg height="24" width="24" viewBox="0 0 24 24" className={signupStyles.fb}>
                            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M7.2 1.53409C7.2 1.00227 7.15227 0.490909 7.06364 -3.19295e-07H0V2.90114H4.03636C3.8625 3.83864 3.33409 4.63295 2.53977 5.16477V7.04659H4.96364C6.38182 5.74091 7.2 3.81818 7.2 1.53409Z" transform="translate(12 10.6367)" fill="#4285F4"></path><path fillRule="evenodd" clipRule="evenodd" d="M6.70227 6.075C8.72727 6.075 10.425 5.40341 11.6659 4.25795L9.24205 2.37614C8.57045 2.82614 7.71136 3.09204 6.70227 3.09204C4.74886 3.09204 3.09545 1.77273 2.50568 3.17891e-08H3.16839e-08V1.94318C1.23409 4.39432 3.77045 6.075 6.70227 6.075Z" transform="translate(5.29785 13.4248)" fill="#34A853"></path><path fillRule="evenodd" clipRule="evenodd" d="M3.30341 4.79318C3.15341 4.34318 3.06818 3.8625 3.06818 3.36818C3.06818 2.87386 3.15341 2.39318 3.30341 1.94318V3.1719e-08H0.797727C0.289773 1.0125 0 2.15795 0 3.36818C0 4.57841 0.289773 5.72386 0.797727 6.73636L3.30341 4.79318Z" transform="translate(4.5 8.63184)" fill="#FBBC05"></path><path fillRule="evenodd" clipRule="evenodd" d="M6.70227 2.98295C7.80341 2.98295 8.79205 3.36136 9.56932 4.10455L11.7205 1.95341C10.4216 0.743182 8.72386 0 6.70227 0C3.77045 0 1.23409 1.68068 3.16839e-08 4.13182L2.50568 6.075C3.09545 4.30227 4.74886 2.98295 6.70227 2.98295Z" transform="translate(5.29785 4.5)" fill="#EA4335"></path>
                        </svg>
                        Signup with Google
                    </span>
                    <br />
                <p>Already have an account? <Link href={SIGN_IN_MERCHANT_PUBLIC_API_ROUTE}><span style={{color: '#FCA311', cursor:'pointer', fontWeight: 'bold'}}>Sign in</span></Link></p>
            </div>
        </div>
    )
}

export {MerchantSignup}
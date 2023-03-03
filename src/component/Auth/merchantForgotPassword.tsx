import * as React from 'react';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { signinStyles } from '@src/styles';
import { PageInfo } from "@src/component";
import { successAlert, errorAlert } from "@src/services/alert";
import { PUBLIC_BASE_URL, FORGOT_PASSWORD_API_ROUTE, VERIFY_OTP_MERCHANT_PAGE_ROUTE } from '@src/services/routes';

const MerchantForgotPasswordForm = () => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if(email.length === 0) {
            setEmailError('Email is required');
        } else {
            setLoading(true);

            let data = {
                email: email,
            }

            axios.post(`${PUBLIC_BASE_URL}${FORGOT_PASSWORD_API_ROUTE}`, data)
            .then(function (response) {
                console.log(response)
                setLoading(true);
                if(response.data.statusCode) {
                    successAlert('A verification code has been sent to your email. Please enter the code to set up a new password.');
                    router.push({
                        pathname:`${VERIFY_OTP_MERCHANT_PAGE_ROUTE}`, 
                        query:{email: email}
                    }, undefined, { shallow:true })
                } else {
                    errorAlert('Invalid email supplied. Please try again.');
                }
            })
            .catch(function (error) {
                errorAlert(error.response.data.message);
                setLoading(false);
            });
       }

    }
  
    return (
        <div>
            <Head>
                <title>{PageInfo.title}</title>
                <meta name="description" content="Nigeria's No. 1 Food delivery and restaurant hub." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <br /><br />
                <form onSubmit={handleSubmit}>
                    <div className={signinStyles.header}>
                        <span className={signinStyles.title}>Forgot Password</span>
                        <hr style={{width:'28%', height:'3px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                    </div>
                    <br />
                    <p className='text-center'>Don't panic as we are here to help you gain access back.</p>
                    <br />
                    <div className={signinStyles.formContainer} style={{display:'flex',}}>
                        <div className={signinStyles.inputContainer}>
                            <p>Email Address*</p>
                            <input placeholder='' name='email' type={'email'} className={signinStyles.emailInput} onChange={event => setEmail(event.target.value)} value={email}/>
                            {email.length === 0 && <span className={signinStyles.error}>{emailError}</span>}
                        </div>
                        <br />                  
                        <hr style={{width:'28%', height:'3px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                        {
                            loading ? (
                                <button className={signinStyles.submitButtonMerchant} type='submit' disabled={true}>
                                    <p className="pt-3">Confirming...</p>
                                </button>) : (
                                <button className={signinStyles.submitButtonMerchant} type='submit'>
                                    <p className="pt-3">Confirm</p>
                                </button>  
                            ) 
                        }
                        <br />
                    </div>
                </form>
            </main>
        </div>
    )
}

export {MerchantForgotPasswordForm};
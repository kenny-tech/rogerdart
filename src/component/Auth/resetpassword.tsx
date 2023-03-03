import * as React from 'react';
import Head from 'next/head';
import { PageInfo } from "@src/component";
import { signinStyles } from '@src/styles';
import { EllipseAnimation } from '@src/component';
import { PAGE_ROUTE_SIGN_IN, PUBLIC_BASE_URL, RESET_PASSWORD_API_ROUTE } from '@src/services/routes';
import axios from 'axios';
import { useRouter } from "next/router";
import { useState } from 'react';
import { successAlert, errorAlert } from "@src/services/alert";

const ResetPasswordForm = () => {

    const Router = useRouter();
    const {email, token} = Router.query;

    const error = false;
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [passwordLenghError, setPasswordLengthError] = useState('');
    const [confirmPasswordLenghError, setConfirmPasswordLengthError] = useState('');

    const handleResetPassword = (e:any) => {

        setLoading(true);

       if (password.length === 0){
            setPasswordError('Password is required');
            setLoading(false);
        }   else if(password.length < 6) {
            setPasswordLengthError('Password length must be 6 characters or more');
            setLoading(false);
        } else if (confirmPassword.length === 0){
            setConfirmPasswordError('Confirm Password is required');
            setLoading(false);
        } else if(confirmPassword.length < 6) {
            setConfirmPasswordLengthError('Confirm Password length must be 6 characters or more');
        } else if (password != confirmPassword) {
            setPasswordMatchError('Password and Confirm Password must match');
            setLoading(false);
        } else {
            setLoading(true);
            const bodyContent = {
                email: email,
                password: password,
                token: token,
            }
    
            const reqOptions = {url: `${PUBLIC_BASE_URL}${RESET_PASSWORD_API_ROUTE}`}

            axios.post(reqOptions.url, bodyContent)
            .then(res=>{
                console.log(res);
                if(res.statusText) {
                    successAlert('Password successfully changed. Please login.');
                    Router.push(`${PAGE_ROUTE_SIGN_IN}`)
                } else {
                    errorAlert('Unable to reset your password. Please try again.');
                }
            })
            .catch(err=>{
                console.log(err);
                errorAlert(err.response.data.message);
                setLoading(false);
            })
            
        }
    }

    const handleKeypress = (e:any) => {
      if (e.keyCode === 13) {
        handleResetPassword(e);
      }
    };
    

    return (
        <div>
            <Head>
                <title>{PageInfo.title}</title>
                <meta name="description" content="Nigeria's No. 1 Food delivery and restaurant hub." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
             <main>
                <br /><br />
                <div className={signinStyles.header}>
                    <span className={signinStyles.title}>New Password</span>
                    <hr style={{width:'28%', height:'3px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                </div>
                <br />
                <p className='text-center'>Create a new password. We strongly advise you to store it safely.</p>
                <br />
                <div className={signinStyles.formContainer} style={{display:'flex',}}>
                    <div className={signinStyles.inputContainer}>
                        <p>Enter password*</p>
                        <input placeholder='' name='password' value={password} type={'password'} className={signinStyles.emailInput} onChange={event => setPassword(event.target.value)}/>
                        {password.length === 0 && <span className={signinStyles.error}>{passwordError}</span>}
                        {passwordLenghError && password.length < 6 && <span className={signinStyles.error}>{passwordLenghError}</span>}
                    </div>
                    <br />
                    <div className={signinStyles.inputContainer}>
                        <p>Confirm password*</p>
                        <input placeholder='' name='confirmPassword' value={confirmPassword} type={'password'} className={signinStyles.emailInput} onChange={event => setConfirmPassword(event.target.value)}/>
                        {confirmPassword.length === 0 && <span className={signinStyles.error}>{confirmPasswordError}</span>}
                        {confirmPasswordLenghError && confirmPassword.length < 6 && <span className={signinStyles.error}>{confirmPasswordLenghError}</span>}
                        {passwordMatchError && password !== confirmPassword && <span className={signinStyles.error}>{passwordMatchError}<br/></span>}
                    </div>
                    <br />                  
                    <hr style={{width:'28%', height:'3px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                    {
                        loading ? (  <button className={signinStyles.submitButton} type='submit'>
                        <p className="pt-3">Resetting Your Password</p>
                        <EllipseAnimation /> 
                    </button>) : (  <button className={signinStyles.submitButton} type='submit' onClick={(e) => handleResetPassword(e)}>
                        <p className="pt-3">Reset Password</p>
                    </button>)
                    }
                  
                    <br />
                </div>
            </main>
        </div>
    )
}

export {ResetPasswordForm};
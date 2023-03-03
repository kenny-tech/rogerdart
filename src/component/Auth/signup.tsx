import { signupStyles } from '@src/styles';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { EllipseAnimation } from '@src/component';
import Head from 'next/head';
import { PageInfo } from "@src/component";
import { SIGN_IN_PUBLIC_API_ROUTE } from '@src/services/routes';
import AuthContext from '@src/services/authContext';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { successAlert, errorAlert } from "@src/services/alert";

const SignupComponent = () => {

    const router = useRouter();
    const { error, signUp } = useContext(AuthContext);

    const [registrationDetails, setRegistrationDetails] = useState({
        firstName:'',
        lastName:'',
        phoneNumber:'',
        email:'',
        password:'',
        passwordConfirmation:'',
    })
    const [errors, setErrors] = useState({
        firstNameError:'',
        lastNameError:'',
        phoneNumberError:'',
        emailError:'',
        passwordError:'',
        serverError:'',
        passwordConfirmationError:''
    })

    const [isLoading, setIsloading] = useState(false);
    const [passVisibility, setPassVisibility] = useState(false);
    const [confirmPassVisibility, setconfirmPassVisibility] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [agree, setAgree] = useState(true);

    const handleChange = (e:any) => {
        const { name, value } = e.target;

        setRegistrationDetails({
            ...registrationDetails,
            [name]:value
        })
    }

    const handlePasswordVisibility = () => {
        setPassVisibility(!passVisibility)
    }

    const handlePasswordConfirmVisibility = () => {
        setconfirmPassVisibility(!confirmPassVisibility)
    }

    function processSignUp(e: any){

        setIsloading(true);
        let emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if(registrationDetails.firstName.length < 1){
            setErrors({
                ...errors,
                firstNameError: `First Name is required`
            })
            setIsloading(false);
        }else if(registrationDetails.lastName.length < 1){
            setErrors({
                ...errors,
                lastNameError: `Last Name is required`
            })
            setIsloading(false);
        } 
        else if(registrationDetails.email.length === 0){
            setErrors({
                ...errors,
                emailError: `Email is required`
            })
            setIsloading(false);
        }
        // }else if(registrationDetails.phoneNumber.length <= 9){
        //     setErrors({
        //         ...errors,
        //         phoneNumberError: `${registrationDetails.phoneNumber} is not a valid phone number`
        //     })
        //     setIsloading(false);
        // }
        else if(emailValidator.test(registrationDetails.email) === false){
            setErrors({
                ...errors,
                emailError: `${registrationDetails.email} is not a valid email address`
            })
            setIsloading(false);
        }
        else if (registrationDetails.password.length === 0){
            setErrors({
                ...errors,
                passwordError: `Password is required`
            })
            setIsloading(false);
        }else if(registrationDetails.password.length < 6){
            setErrors({
                ...errors,
                passwordError: `Your password length should be 6 characters or more`
            })
            setIsloading(false);
        }else if(registrationDetails.passwordConfirmation !== registrationDetails.password){
            setErrors({
                ...errors,
                passwordConfirmationError: `Your passwords did not match`
            })
            setIsloading(false);
        }
        else{
            if(!agree) {
                errorAlert('You must agree to our terms and conditions.');
                setIsloading(false);
            } else {
                signUp(e, {firstName:registrationDetails.firstName, lastName:registrationDetails.lastName, email: registrationDetails.email, phoneNumber: registrationDetails.phoneNumber, password: registrationDetails.password})
            }
        }
    }

    const handleKeypress = (e:any) => {
        if (e.keyCode === 13) {
          processSignUp(e);
        }
      };


    return (
        <div>
              <Head>
                <title>{PageInfo.title}</title>
                <meta name="description" content="Nigeria's No. 1 Food delivery and restaurant hub." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={signupStyles.formContainer}>
                <br/><br/>
                <span className={signupStyles.title}>Register</span>
                <div className={signupStyles.line}></div>
                <div className={signupStyles.nameInput}>
                    {errors.serverError && <p><strong>{errors.serverError}</strong></p>}
                    <div className={signupStyles.nameInputContainer}>
                        <p>First Name*</p>
                        <input placeholder='' name="firstName" value={registrationDetails.firstName} onChange={handleChange} type={'text'} className={signupStyles.emailInput}/>
                        {errors.firstNameError &&  <span className={signupStyles.error}>
                        
                            {errors.firstNameError}
                            </span>}
                    </div>
                    <div className={signupStyles.nameInputContainer}>
                        <p>Last Name*</p>
                        <input placeholder='' name="lastName" value={registrationDetails.lastName} onChange={handleChange} type={'text'} className={signupStyles.emailInput}/>
                        {errors.lastNameError && <span className={signupStyles.error}>
                            {errors.lastNameError}
                            </span>}
                    </div>
                </div>
                <div className={signupStyles.nameInput}>
                    {errors.serverError && <p><strong>{errors.serverError}</strong></p>}
                    <div className={signupStyles.nameInputContainer}>
                        <p>Email address*</p>
                        <input placeholder='' name="email" value={registrationDetails.email} onChange={handleChange} type={'email'} className={signupStyles.emailInput}/>
                        {errors.emailError && <span className={signupStyles.error}>
                            {errors.emailError}
                            </span>}
                    </div>

                    <div className={signupStyles.nameInputContainer}>
                        <p>Phone number (Optional)</p>
                        <input placeholder='' name="phoneNumber" value={registrationDetails.phoneNumber} onChange={handleChange} type={'tel'} className={signupStyles.emailInput}/>
                        {errors.lastNameError && <span className={signupStyles.error}>
                            {errors.phoneNumberError}
                            </span>}
                        {/* <PhoneInput
                            country={'ng'}
                            onlyCountries={['ng', 'us']}
                            value={registrationDetails.phoneNumber}
                            onChange={phone => setPhoneNumber(phone)}
                        />
                            */}
                    </div>
                </div>
                
                <div className={signupStyles.nameInput}>
                    {errors.serverError && <p><strong>{errors.serverError}</strong></p>}
                    <div className={signupStyles.inputContainer}>
                        <p>Password*</p>
                        <div className={signupStyles.input}>
                            <input placeholder='' name="password" value={registrationDetails.password} onChange={handleChange} type={passVisibility ? 'password':'text'} className={signupStyles.password}/>
                            <span onClick={handlePasswordVisibility} className={signupStyles.toggleVisibilityText}>{passVisibility?'Hide':'Show'}</span>
                        </div>
                        {errors.passwordError ? <span className={signupStyles.error}>{errors.passwordError}</span>:null}
                    </div>

                    <div className={signupStyles.nameInputContainer}>
                        <p>Confirm Password*</p>
                        <div className={signupStyles.confirmPassword}>
                            <input placeholder='' name="passwordConfirmation" value={registrationDetails.passwordConfirmation} onChange={handleChange} type={confirmPassVisibility ? 'password':'text'} className={signupStyles.password}/>
                            <span onClick={handlePasswordConfirmVisibility} className={signupStyles.toggleVisibilityText}>{confirmPassVisibility?'Hide':'Show'}</span>
                        </div>
                        {errors.passwordConfirmationError ? <span className={signupStyles.error}>{errors.passwordConfirmationError}</span>:null}
                            
                    </div>
                </div>
                <div className={signupStyles.bottomInfo}>
                    <span><input type="checkbox" checked={agree} onClick={() => setAgree(!agree)} /> By clicking this, you agree to our <a href='#'>Terms and Conditions </a> and <a href='#'>Privacy Statement.</a></span>
                </div>
                <br />
                <div className={signupStyles.line}></div>
                {isLoading ? 
                <div className={signupStyles.disabledButton} style={{display:'flex', alignItems:'center'}}>
                    <p className='mt-3'>Please Wait</p>
                    <EllipseAnimation />
                </div>:
                <button onClick={processSignUp} className={signupStyles.submitButton} type='submit'>Sign Up</button>}
                <br />
                <p className={signupStyles.orText}>Or</p>
                    <span className={signupStyles.googleButtonSignup}>
                        <svg height="24" width="24" viewBox="0 0 24 24" className={signupStyles.fb}>
                            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M7.2 1.53409C7.2 1.00227 7.15227 0.490909 7.06364 -3.19295e-07H0V2.90114H4.03636C3.8625 3.83864 3.33409 4.63295 2.53977 5.16477V7.04659H4.96364C6.38182 5.74091 7.2 3.81818 7.2 1.53409Z" transform="translate(12 10.6367)" fill="#4285F4"></path><path fillRule="evenodd" clipRule="evenodd" d="M6.70227 6.075C8.72727 6.075 10.425 5.40341 11.6659 4.25795L9.24205 2.37614C8.57045 2.82614 7.71136 3.09204 6.70227 3.09204C4.74886 3.09204 3.09545 1.77273 2.50568 3.17891e-08H3.16839e-08V1.94318C1.23409 4.39432 3.77045 6.075 6.70227 6.075Z" transform="translate(5.29785 13.4248)" fill="#34A853"></path><path fillRule="evenodd" clipRule="evenodd" d="M3.30341 4.79318C3.15341 4.34318 3.06818 3.8625 3.06818 3.36818C3.06818 2.87386 3.15341 2.39318 3.30341 1.94318V3.1719e-08H0.797727C0.289773 1.0125 0 2.15795 0 3.36818C0 4.57841 0.289773 5.72386 0.797727 6.73636L3.30341 4.79318Z" transform="translate(4.5 8.63184)" fill="#FBBC05"></path><path fillRule="evenodd" clipRule="evenodd" d="M6.70227 2.98295C7.80341 2.98295 8.79205 3.36136 9.56932 4.10455L11.7205 1.95341C10.4216 0.743182 8.72386 0 6.70227 0C3.77045 0 1.23409 1.68068 3.16839e-08 4.13182L2.50568 6.075C3.09545 4.30227 4.74886 2.98295 6.70227 2.98295Z" transform="translate(5.29785 4.5)" fill="#EA4335"></path>
                        </svg>
                        Signup with Google
                    </span>
                    <br />
                <p>Already have an account? <Link href={SIGN_IN_PUBLIC_API_ROUTE}><span style={{color: '#091D8F', cursor:'pointer', fontWeight: 'bold'}}>Signin</span></Link></p>
            </div>
        </div>
    )
}

export {SignupComponent}
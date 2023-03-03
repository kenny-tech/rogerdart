import * as React from 'react';
import Head from 'next/head';
import { PageInfo } from "@src/component";
import { signinStyles } from '@src/styles';
import { EllipseAnimation } from '@src/component';
import AuthContext from '@src/services/authContext';
import Link from 'next/link';
import { PAGE_ROUTE_FORGOT_PASSWORD, PAGE_ROUTE_SIGN_UP } from '@src/services/routes';

const SignInForm = () => {

    const { signIn } = React.useContext(AuthContext);

    const error = false;
    const [signinDetails, setSigninDetails] = React.useState({
        email:'',
        password:'',
        loading:false
    })

    const [visibility, setVisibility] = React.useState(false)

    const [errors, setErrors] = React.useState({
        emailError:'',
        passError:'',
    })

    const [resetDetails, setResetDetails] = React.useState({
        email:'',
        password:'',
        passwordConfrimation:''
    })

    const handleChange = (e:any) => {

        const {name, value} = e.target;

        setSigninDetails({
            ...signinDetails,  
            [name]:value 
        })
    }

    const toggleVisibility = () => {
        setVisibility(visibility === false ? true : false)
    }

    const handleSignIn = (e:any) => {

        setSigninDetails({
         ...signinDetails,
         loading:true   
        })

        let emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if(signinDetails.email.length === 0){
            setSigninDetails({
             ...signinDetails,
                loading:false   
            })
            setErrors({
                ...errors,
                emailError:'Email is required'
            })
        }else if(emailChecker.test(signinDetails.email) === false){
            setSigninDetails({
                ...signinDetails,
                   loading:false   
               })
               setErrors({
                   ...errors,
                   emailError:'Enter a valid email address!'
               })
        }
        else if (signinDetails.password.length === 0){
            setSigninDetails({
                ...signinDetails,
                   loading:false,   
            })
            setErrors({
                   ...errors,
                   passError:'Password is required',
            })
        }else{
            // console.log(signinDetails.email, signinDetails.password)
            signIn(e, { email:signinDetails.email, password:signinDetails.password })
        }
    }

    const handleKeypress = (e:any) => {
      if (e.keyCode === 13) {
        handleSignIn(e);
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
                <br />
                <div className={signinStyles.header}>
                    <span className={signinStyles.title}>Sign In</span>
                    <hr style={{width:'28%', height:'3px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                </div>
                {/* <hr style={{width:'28%', height:'3px', backgroundColor: '#E0E0E0', border: 'none'}}/> */}
                <div className={signinStyles.formContainer} style={{display:'flex',}}>
                    {error !== undefined && <span className={signinStyles.error}>{error}</span>}
                    <div className={signinStyles.inputContainer}>
                        <p>Email Address*</p>
                        <input placeholder='' name='email' value={signinDetails.email} onKeyDown={handleKeypress} onChange={handleChange} type={'email'} className={signinStyles.emailInput}/>
                        {errors.emailError && errors.emailError.length > 0 && <span className={signinStyles.error}>{errors.emailError}</span>}
                    </div>
                    <br />
                    <div className={signinStyles.inputContainer}>
                        <div className={signinStyles.flex}>
                            <p>Password*</p>
                        </div>
                        <div className={signinDetails.password ? signinStyles.passwordInputBold : signinStyles.passwordInput}>
                            <input className={signinStyles.password} placeholder='' onKeyDown={handleKeypress} name='password' value={signinDetails.password} onChange={handleChange} type={visibility ? 'text': 'password'}/>
                            <span onClick={toggleVisibility} className={signinStyles.toggleVisibilityText}>{visibility ? 'Hide' : 'Show'}</span>
                        </div>
                        {errors.passError && errors.passError.length > 0 && <span className={signinStyles.error}>{errors.passError}</span>}
                    </div>
                    <br />
                    <div className={signinStyles.forgotPasswordContainer}>
                        <div className="form-check" style={{position: 'relative', bottom: '8px'}}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label">
                                Remember me
                            </label>
                        </div>
                        <div className={signinStyles.forgotPassword}>
                            <Link href={PAGE_ROUTE_FORGOT_PASSWORD}>
                                <p style={{color: '#0230B1', cursor: 'pointer'}}>
                                    Forgot Password?
                                </p>
                            </Link>
                        </div>
                    </div>
                    <hr style={{width:'28%', height:'3px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                    {signinDetails.loading ? 
                    <div className={signinStyles.submitButton} style={{display:'flex', alignItems:'center'}}>
                        <p className="pt-3">Signing In</p>
                        <EllipseAnimation />
                    </div>:
                    <button onClick={handleSignIn} className={signinStyles.submitButton} type='submit'>
                        <p className="pt-3">Sign In</p>
                    </button>}
                    <br />
                    <p className={signinStyles.orText}>Or</p>
                    <span className={signinStyles.googleButtonSignin}>
                        <svg height="24" width="24" viewBox="0 0 24 24" className={signinStyles.fb}>
                            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M7.2 1.53409C7.2 1.00227 7.15227 0.490909 7.06364 -3.19295e-07H0V2.90114H4.03636C3.8625 3.83864 3.33409 4.63295 2.53977 5.16477V7.04659H4.96364C6.38182 5.74091 7.2 3.81818 7.2 1.53409Z" transform="translate(12 10.6367)" fill="#4285F4"></path><path fillRule="evenodd" clipRule="evenodd" d="M6.70227 6.075C8.72727 6.075 10.425 5.40341 11.6659 4.25795L9.24205 2.37614C8.57045 2.82614 7.71136 3.09204 6.70227 3.09204C4.74886 3.09204 3.09545 1.77273 2.50568 3.17891e-08H3.16839e-08V1.94318C1.23409 4.39432 3.77045 6.075 6.70227 6.075Z" transform="translate(5.29785 13.4248)" fill="#34A853"></path><path fillRule="evenodd" clipRule="evenodd" d="M3.30341 4.79318C3.15341 4.34318 3.06818 3.8625 3.06818 3.36818C3.06818 2.87386 3.15341 2.39318 3.30341 1.94318V3.1719e-08H0.797727C0.289773 1.0125 0 2.15795 0 3.36818C0 4.57841 0.289773 5.72386 0.797727 6.73636L3.30341 4.79318Z" transform="translate(4.5 8.63184)" fill="#FBBC05"></path><path fillRule="evenodd" clipRule="evenodd" d="M6.70227 2.98295C7.80341 2.98295 8.79205 3.36136 9.56932 4.10455L11.7205 1.95341C10.4216 0.743182 8.72386 0 6.70227 0C3.77045 0 1.23409 1.68068 3.16839e-08 4.13182L2.50568 6.075C3.09545 4.30227 4.74886 2.98295 6.70227 2.98295Z" transform="translate(5.29785 4.5)" fill="#EA4335"></path>
                        </svg>
                            Continue with Google
                        </span>
                        <br/>
                        <p>Don't have an account? <Link href={PAGE_ROUTE_SIGN_UP}><span style={{color: '#091D8F', cursor:'pointer', fontWeight: 'bold'}}>Signup</span></Link></p>
                </div>
            </main>
        </div>
    )
}

export {SignInForm};
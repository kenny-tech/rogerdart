import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { verifyCodeStyles } from '@src/styles';
import { SIGN_IN_MERCHANT_PUBLIC_API_ROUTE, PUBLIC_BASE_URL, VERIFY_ACCOUNT } from '@src/services/routes';
import Image from 'next/image';
import Head from 'next/head';
import { PageInfo } from "@src/component";
import { EllipseAnimation } from '@src/component';
import { successAlert, errorAlert } from "@src/services/alert";

 const SendCodeMerchant = () =>{

    const router = useRouter();
    const {email} = router.query;

    const [digit, setDigit] = React.useState({
        one:'',
        two:'',
        three:'',
        four:'',
        five:'',
        six:''
    });
    
    
    const boxOne = React.useRef();
    const boxTwo = React.useRef();
    const boxThree = React.useRef();
    const boxFour = React.useRef();
    const boxFive = React.useRef();
    const boxSix = React.useRef();


    const tabChange = (val) => {
        // one.current.focus();
        if(digit.one && val ===1){
              boxTwo.current.focus();
          }else if(digit.two && val===2){
            boxThree.current.focus();
          }else if(digit.three && val === 3){
            boxFour.current.focus();
          }else if(digit.four && val ===4){
            boxFive.current.focus();
          }else if(digit.five && val ===5){
            boxSix.current.focus();
          }
       }

       const handleChange = (e) => {
           const {name, value} = e.target;
           setDigit({
               ...digit,
               [name]:value
           })
       }
      const [isLoading, setIsLoading] = React.useState(false)

       function handleCodeSubmission(){
           setIsLoading(true)

        const bodyContent = {
            email: `${email}`,
            otp: `${digit.one.toLocaleUpperCase() +digit.two.toLocaleUpperCase() +digit.three.toLocaleUpperCase() +digit.four.toLocaleUpperCase() +digit.five.toLocaleUpperCase() +digit.six.toLocaleUpperCase()}`,
            token: '',
            userId: ''
        }

        if(bodyContent.otp.length < 6) {
            errorAlert('Please enter your OTP');
            setIsLoading(false);
        }

        const reqOptions = {url: `${PUBLIC_BASE_URL}${VERIFY_ACCOUNT}`}

        if(email){
            axios.post(reqOptions.url, bodyContent)
            .then(res=>{
                setIsLoading(true);
                successAlert(res.data.message);
                router.push(`${SIGN_IN_MERCHANT_PUBLIC_API_ROUTE}`)
            })
            .catch(err=>{
                errorAlert(err.response.data.message);
                setIsLoading(false)
            })
        }
    }

    const handleClearToken = () => {
        setDigit({
            one:'',
            two:'',
            three:'',
            four:'',
            five:'',
            six:''
        })
    }

    return(
        <div>
            <Head>
                <title>{PageInfo.title}</title>
                <meta name="description" content="Nigeria's No. 1 Food delivery and restaurant hub." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={verifyCodeStyles.digitGroup}>
                <div className="card border-0 shadow p-3 mb-5 bg-white rounded">
                    <Image src='/uploads/logo.png' width={150} height={30}/>
                    <br />
                    <div className="card-body text-center">
                        <p className={verifyCodeStyles.textTitle}>Please verify your account</p>
                        <p className={verifyCodeStyles.textSubtitle}>Enter the 6-digit OTP sent to</p>
                        <p className={verifyCodeStyles.textSubtitleColor}>{email}</p>
                    </div>
                    <div>
                    <input ref={boxOne} autoFocus type="default" name="one" value={digit.one} maxLength={1} onChange={handleChange} onKeyUp={tabChange(1)}/>
                    <input ref={boxTwo} type="default" name="two" value={digit.two} maxLength={1} onChange={handleChange} onKeyUp={tabChange(2)}/>
                    <input ref={boxThree} type="default" name="three" value={digit.three} maxLength={1} onChange={handleChange} onKeyUp={tabChange(3)}/>
                    <input ref={boxFour} type="default" name="four" value={digit.four} maxLength={1} onChange={handleChange} onKeyUp={tabChange(4)}/>
                    <input ref={boxFive} type="default" name="five" value={digit.five} maxLength={1} onChange={handleChange} onKeyUp={tabChange(5)}/>
                    <input ref={boxSix} type="default" name="six" value={digit.six} maxLength={1} onChange={handleChange} onKeyUp={tabChange(6)}/>
                    </div>
                    <p className="mt-3 text-danger" style={{cursor: 'pointer'}} onClick={() => handleClearToken()}>Clear</p>
                    {
                        isLoading ? (<button className={verifyCodeStyles.confirmOtpButton} type='submit' disabled={true}> <p className="pt-3">Confirming</p>
                        <EllipseAnimation /></button>) : (<button className={verifyCodeStyles.confirmOtpButton} type='submit' onClick={handleCodeSubmission}>Confirm</button>) 
                    }
                    <p className='mt-3'>Did not receive OTP? <span style={{color: '#091D8F'}}>Resend OTP</span></p>
                </div>
            </div>
        </div>
    )
}

export {SendCodeMerchant};
import * as React from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { verifyCodeStyles } from '@src/styles';
import { PAGE_ROUTE_RESET_PASSWORD, PUBLIC_BASE_URL, VALIDATE_OTP } from '@src/services/routes';
import Head from 'next/head';
import { PageInfo } from "@src/component";
import { EllipseAnimation } from '@src/component';
import { errorAlert } from "@src/services/alert";

 const OtpForm = () =>{

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

    const boxOne = useRef<any>();
    const boxTwo = useRef<any>();
    const boxThree = useRef<any>();
    const boxFour = useRef<any>();
    const boxFive = useRef<any>();
    const boxSix = useRef<any>();


    const tabChange = (val:number) => {
        // one.current.focus();
        if(digit.one && val === 1){
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
            otp: `${digit.one.toLocaleUpperCase() +digit.two.toLocaleUpperCase() +digit.three.toLocaleUpperCase() +digit.four.toLocaleUpperCase() +digit.five.toLocaleUpperCase() +digit.six.toLocaleUpperCase()}`
        }

        if(bodyContent.otp.length < 6) {
            errorAlert('Please enter your OTP');
            setIsLoading(false);
        }

        const reqOptions = {url: `${PUBLIC_BASE_URL}${VALIDATE_OTP}`}
        // if(email && username){
        if(email){
            axios.post(reqOptions.url, bodyContent)
            .then(res=>{
                let token = res.data.data.token;
                router.push({
                    pathname:`${PAGE_ROUTE_RESET_PASSWORD}`, 
                    query:{email: email, token: token}
                }, undefined, { shallow:true })
            })
            .catch(err=>{
                console.log(err.response.data);
                // alert(err.response.data.message)
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
                <div className="card border-0 p-3 mb-5 bg-white rounded">
                    <br />
                    <div className="card-body text-center">
                        <p className={verifyCodeStyles.title}>Pin</p>
                        <hr style={{width:'400px', height:'3px', backgroundColor: '#E0E0E0', border: 'none'}}/>    
                        <br />                  
                        <p className={verifyCodeStyles.textSubtitle}>Enter the 6-digit OTP sent to</p>
                        <p className={verifyCodeStyles.textSubtitleColor}>{email}</p>
                    </div>
                    <br />
                    <div>
                    <input ref={boxOne} autoFocus type="default" name="one" value={digit.one} maxLength={1} onChange={handleChange} onKeyUp={() => tabChange(1)}/>
                    <input ref={boxTwo} type="default" name="two" value={digit.two} maxLength={1} onChange={handleChange} onKeyUp={() => tabChange(2)}/>
                    <input ref={boxThree} type="default" name="three" value={digit.three} maxLength={1} onChange={handleChange} onKeyUp={() => tabChange(3)}/>
                    <input ref={boxFour} type="default" name="four" value={digit.four} maxLength={1} onChange={handleChange} onKeyUp={() => tabChange(4)}/>
                    <input ref={boxFive} type="default" name="five" value={digit.five} maxLength={1} onChange={handleChange} onKeyUp={() => tabChange(5)}/>
                    <input ref={boxSix} type="default" name="six" value={digit.six} maxLength={1} onChange={handleChange} onKeyUp={() => tabChange(6)}/>
                    </div>
                    <p className="mt-3 text-danger" style={{cursor: 'pointer'}} onClick={() => handleClearToken()}>Clear</p>
                    <br />
                    <p className='mt-3'>Did not receive OTP? <span style={{color: '#091D8F'}}>Resend OTP</span></p>
                    <hr style={{width:'400px', height:'3px', backgroundColor: '#E0E0E0', border: 'none'}}/>                        
                    {
                        isLoading ? (<button className={verifyCodeStyles.verifyOtpButton} type='submit' disabled={true}>
                                    <p className="pt-3">Confirming</p>
                                    <EllipseAnimation />                        
                        </button>) : (<button className={verifyCodeStyles.verifyOtpButton} type='submit' onClick={handleCodeSubmission}>Confirm</button>) 
                    }
                </div>
            </div>
        </div>
    )
}

export {OtpForm};
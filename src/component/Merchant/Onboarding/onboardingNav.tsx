import { NextPage } from "next";
import { useRouter } from "next/router";
import { OWNER_INFO_MERCHANT_PAGE_ROUTE, BUSINESS_INFO_MERCHANT_PAGE_ROUTE, SUBSCRIPTION_MERCHANT_PAGE_ROUTE, FINAL_STEP_MERCHANT_PAGE_ROUTE } from "@src/services/routes";
import { onboardingStyles } from "@src/styles";

import Router from "next/router";

const OnboardingNav: NextPage = () => {

    const Router = useRouter();

    const handleClick = (name:string) => {
        if(name === 'Owner Information') {
            Router.push({
                pathname: OWNER_INFO_MERCHANT_PAGE_ROUTE,
                query: { name: 'Owner Information' }
            });
        } else if (name === 'Business Info (KYC)') {
            Router.push({
                pathname: BUSINESS_INFO_MERCHANT_PAGE_ROUTE,
                query: { name: 'Business Info (KYC)' }
            });
        } else if (name === 'Service Subscription') {
            Router.push({
                pathname: SUBSCRIPTION_MERCHANT_PAGE_ROUTE,
                query: { name: 'Service Subscription' }
            });
        } else {
            Router.push({
                pathname: FINAL_STEP_MERCHANT_PAGE_ROUTE,
                query: { name: 'Final Step' }
            });
        }
    }

    return (
        <div className={onboardingStyles.onboardingContent}>
            <div className={onboardingStyles.heading}>
                <div className="row">
                    <div className="col-md-3 mt-3 mb-3">
                        <p onClick={() => handleClick('Owner Information')} style={{color: '#000', fontSize: '18px', cursor: 'pointer', paddingRight: '800px', whiteSpace: 'nowrap', marginLeft: '10px'}}>Owner Information</p>
                        {Router.query.name === 'Owner Information'  ? <div style={{width: '170px', border: 'solid', borderColor: '#FCA311'}}></div> : null}
                    </div>
                    <div className="col-md-3 mt-3">
                        <p onClick={() => handleClick('Business Info (KYC)')} style={{color: '#000', fontSize: '18px', cursor: 'pointer', marginLeft: '10px'}}>Business Info (KYC)</p>
                        {Router.query.name === 'Business Info (KYC)'  ? <div style={{width: '180px', border: 'solid', borderColor: '#FCA311'}}></div> : null}
                    </div>
                    <div className="col-md-3 mt-3">
                        <p onClick={() => handleClick('Service Subscription')} style={{color: '#000', fontSize: '18px', cursor: 'pointer', marginLeft: '10px'}}>Service Subscription</p>
                        {Router.query.name === 'Service Subscription' ? <div style={{width: '180px', border: 'solid', borderColor: '#FCA311'}}></div> : null}
                    </div>
                    <div className="col-md-3 mt-3">
                        <p onClick={() => handleClick('Final Step')} style={{color: '#000', fontSize: '18px', cursor: 'pointer', marginLeft: '10px'}}>Final Step</p>
                        {Router.query.name === 'Final Step' ? <div style={{width: '100px', border: 'solid', borderColor: '#FCA311'}}></div> : null}
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default OnboardingNav;
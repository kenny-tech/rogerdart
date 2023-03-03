import { NextPage } from "next";
import { merchantOrderStyles} from '@src/styles';
import { OWNER_INFO_MERCHANT_PAGE_ROUTE } from "@src/services/routes";
import { useRouter } from "next/router";

const GetStarted: NextPage = () => {

    const Router = useRouter();

    const handleLoadOnboardingPage = () => {
        Router.push({
            pathname: OWNER_INFO_MERCHANT_PAGE_ROUTE,
            query: { name: 'Owner Information' }
        })
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className={merchantOrderStyles.getStartedDiv}>
                    <h3 className="text-white">Welcome Roger!</h3>
                    <p className="text-white" style={{paddingLeft: '15px', paddingRight: '15px'}}>Complete the following steps to begin to use Rogerdart. We are here to serve you better.</p>
                    <div onClick={() => handleLoadOnboardingPage()}>
                        <div className={merchantOrderStyles.getStartedButton}>
                            <p className="size-17 ml-3 text-center" style={{paddingTop: '15px'}}>Click to get started</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    )
}
export default GetStarted;
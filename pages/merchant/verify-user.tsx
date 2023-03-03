import { SendCodeMerchant } from "@src/component/Auth/sendcodeMerchant";
import { NextPage } from "next";
import { withRouter } from "next/router";


const Verify: NextPage = () => {
    return (
        <>
            <SendCodeMerchant />
        </>
    )
}
export default withRouter(Verify)
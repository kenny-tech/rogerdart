import { SendCode } from "@src/component";
// import { BottomLinks, Footer } from "@src/component/Footer";
import { NextPage } from "next";
import { withRouter } from "next/router";


const Verify: NextPage = () => {
    return (
        <>
            <SendCode />
        </>
    )
}
export default withRouter(Verify)
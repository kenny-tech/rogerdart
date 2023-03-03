import { NextPage } from "next";
import { MerchantOtpForm } from "@src/component/Auth/merchantOtpForm";
import Nav from "@src/component/Nav";

const ForgotPassword: NextPage = () => {
    return (
        <>
            <Nav />
            <MerchantOtpForm />
        </>
    )
}
export default ForgotPassword
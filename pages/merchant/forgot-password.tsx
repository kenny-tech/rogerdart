import { NextPage } from "next";
import { MerchantForgotPasswordForm } from "@src/component/Auth/merchantForgotPassword";
import Nav from "@src/component/Nav";

const ForgotPassword: NextPage = () => {
    return (
        <>
            <Nav />
            <MerchantForgotPasswordForm />
        </>
    )
}
export default ForgotPassword
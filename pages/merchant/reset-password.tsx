import { MerchantResetPasswordForm } from "@src/component/Auth/merchantResetPassword";
import { NextPage } from "next";
import Nav from "@src/component/Nav";

const ResetPassword: NextPage = () => {
    return (
        <>
            <Nav />
            <MerchantResetPasswordForm />
        </>
    )
}
export default ResetPassword;
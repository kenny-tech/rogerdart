import { NextPage } from "next";
import { OtpForm } from "@src/component/Auth/otpForm";
import Nav from "@src/component/Nav";

const ForgotPassword: NextPage = () => {
    return (
        <>
            <Nav />
            <OtpForm />
        </>
    )
}
export default ForgotPassword
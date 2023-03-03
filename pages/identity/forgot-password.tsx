import { NextPage } from "next";
import { ForgotPasswordForm } from "@src/component/Auth/forgotPassword";
import Nav from "@src/component/Nav";

const ForgotPassword: NextPage = () => {
    return (
        <>
            <Nav />
            <ForgotPasswordForm />
        </>
    )
}
export default ForgotPassword
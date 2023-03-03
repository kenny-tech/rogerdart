import { ResetPasswordForm } from "@src/component/Auth/resetpassword";
import { NextPage } from "next";
import Nav from "@src/component/Nav";


const ResetPassword: NextPage = () => {
    return (
        <>
            <Nav />
            <ResetPasswordForm />
        </>
    )
}
export default ResetPassword;
import { SignInForm } from "@src/component/Auth/signin";
import { NextPage } from "next";
import AuthNav from "@src/component/Nav/authNav";

const SignIn: NextPage = () => {
    return (
        <>
            <AuthNav />
            <SignInForm />
        </>
    )
}
export default SignIn
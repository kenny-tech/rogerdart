import { SignupComponent } from "@src/component";
import { NextPage } from "next";
import AuthNav from "@src/component/Nav/authNav";

const SignUp: NextPage = () => {
    return (
        <>
            <AuthNav />
            <SignupComponent />
        </>
    )
}
export default SignUp
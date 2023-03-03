import { merchantSignupStyles } from '@src/styles';
import * as React from 'react';

interface SignupProps {
    children:React.ReactNode;
}

const SigupContainer = ({children}:SignupProps) => {
    return (
        <div className={merchantSignupStyles.signupContainer}>
            {children}
        </div>
    )
}

const InputGroup = ({children}:SignupProps) => {
    return (
        <div className={merchantSignupStyles.inputGroup}>
            {children}
        </div>
    )
}

const InputIconGroup = ({children}:SignupProps) => {
    return (
        <div className={merchantSignupStyles.iconInput}>
            {children}
        </div>
    )
}

const SignupBtn = ({children}:SignupProps) => {
    return (
        <button className={merchantSignupStyles.signupBtn}>
            {children}
        </button>
    )
}

export {SigupContainer, InputGroup, InputIconGroup, SignupBtn}
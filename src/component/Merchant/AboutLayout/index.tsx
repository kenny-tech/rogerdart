import { merchantPageStyles} from '@src/styles';
import * as React from 'react';

interface SignupProps {
    children:React.ReactNode;
}

const AboutContainer = ({children}:SignupProps) => {
    return (
        <div className={merchantPageStyles.aboutContainer}>
            {children}
        </div>
    )
}

const FlexContainer = ({children}:SignupProps) => {
    return (
        <div className={merchantPageStyles.flexContainer}>
            {children}
        </div>
    )
}


export {AboutContainer, FlexContainer}
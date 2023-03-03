import { merchantPageStyles} from '@src/styles';
import * as React from 'react';

interface FaqProps {
    children:React.ReactNode;
}

const Faq = ({children}:FaqProps) => {
    return (
        <div className={merchantPageStyles.faqContainer}>
            {children}
        </div>
    )
}
const Content = ({children}:FaqProps) => {
    return (
        <div className={merchantPageStyles.content}>
            {children}
        </div>
    )
}

export {Faq, Content}
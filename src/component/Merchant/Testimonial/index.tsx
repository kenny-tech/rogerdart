import { merchantPageStyles } from '@src/styles';
import * as React from 'react';


interface TestimonialProps {
    children:React.ReactNode;
}

const Testimonial = ({children}:TestimonialProps) => {
    return (
        <div className={merchantPageStyles.testimonialContainer}>
            {children}
        </div>
    )
}

const CustomButton = ({children}:TestimonialProps) => {
    return (
        <button className={merchantPageStyles.customButton}>
            {children}
        </button>
    )
}

export {Testimonial, CustomButton}
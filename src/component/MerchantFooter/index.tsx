import { merchantPageStyles} from '@src/styles';
import * as React from 'react';

interface FooterProps {
    children:React.ReactNode;
}

const MerchantFooterBrand = ({children}:FooterProps) => {
    return (
        <div className={merchantPageStyles.merchantFooterBrand}>
            {children}
        </div>
    )
}

export {MerchantFooterBrand}
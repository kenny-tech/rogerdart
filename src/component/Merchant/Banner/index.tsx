import { merchantBannerStyles } from '@src/styles';
import * as React from 'react';

interface BannerProps {
    children:React.ReactNode;
}

const Banner = ({children}:BannerProps) => {
    return (
        <div className={merchantBannerStyles.merchantBanner}>
            {children}
        </div>
    )
}

const Bannertext = ({children}:BannerProps) => {
    return (
        <div className={merchantBannerStyles.bannerText}>
            {children}
        </div>
    )
}

export {Banner, Bannertext}
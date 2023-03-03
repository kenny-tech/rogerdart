import { LOADERLOGO } from '@src/media/png';
import { ellispseAnimationStyles, loaderStyles, spinnerStyles } from '@src/styles';
import Image from 'next/image';
import * as React from 'react';

const Loader = () =>{
    return (
        <div className={loaderStyles.body}>
            <div className={loaderStyles.container}>
                <span className={loaderStyles.logo}>
                    <Image src={LOADERLOGO} alt='Rogrdart Logo' width={800} height={400}/>
                </span>
                <div className={loaderStyles.line}>
                    <div className={loaderStyles.inner}></div>
                </div>
            </div>
        </div>
    )
}

const EllipseAnimation = () => {
    return (
        <div className={ellispseAnimationStyles.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

const Spinner = () => {
    return (
        <div className={spinnerStyles.ldsDualRing}></div>
    )
}

export { Loader, EllipseAnimation, Spinner };
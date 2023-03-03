import * as React from 'react';
import * as Icon from '@heroicons/react/outline';
import Link from 'next/link';
import { userStyles } from '@src/styles';
import { NOTIFICATION_MERCHANT_PAGE_ROUTE } from "@src/services/routes";
import Image from "next/image";

const  Header = () => {

    return (
        <div className={userStyles.navbar}>
            <div className={userStyles.leftMenu}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                    <Link href={'/'}>
                        <Image  src='/uploads/logo.png' width={130} height={30} alt="Rogerdart"/>
                    </Link>
                </div>
            </div>
            <div className={userStyles.rightMenu}>
                <Link href={NOTIFICATION_MERCHANT_PAGE_ROUTE}>
                    <a style={{display:'flex', alignItems:'center', padding:'.5rem', position: 'relative', top: '-5px'}} href='#'>
                        <Icon.BellIcon color='#000' className={userStyles.iconSize}/>
                    </a>
                </Link>
            </div>
        </div>
    )
}
export { Header }
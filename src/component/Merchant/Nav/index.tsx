import { merchantNavbarStyles } from '@src/styles';
import * as React from 'react';

interface NavbarProps {
    children:React.ReactNode;
}

const Navbar = ({children}:NavbarProps) => {

    return(
        <div className={merchantNavbarStyles.navbar}>
            {children}
        </div>
    )
}

const Logo = ({children}:NavbarProps) => {
    return (
        <div className={merchantNavbarStyles.merchantLogo}>
            {children}
        </div>
    )
}

const Navlist = ({children}:NavbarProps) => {

    return(
        <div className={merchantNavbarStyles.navLinks}>
            {children}
        </div>
    )
}

const Navbtn = ({children}:NavbarProps) => {
    return (
        <button className={merchantNavbarStyles.navBtn}>
            {children}
        </button>
    )
}

export {Navbar, Navlist, Navbtn, Logo}
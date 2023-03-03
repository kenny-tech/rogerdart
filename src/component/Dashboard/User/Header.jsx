import * as React from 'react';
import * as Icon from '@heroicons/react/outline';
import Link from 'next/link';
import { userStyles } from '@src/styles';
import AuthContext from '@src/services/authContext';
import { PROFILE_PAGE_ROUTE } from "@src/services/routes";
import { decryptUsernameMiddleware } from '@helpers/jwt-middleware';
import { storageController } from '@src/utils/storage';
import ProductContext from '@src/services/productContext';
import Image from "next/image";

const  Navigation = () => {

    const {signOut, User} = React.useContext(AuthContext);
    const JWT_USERNAME = window.localStorage.getItem("username")
    const Name = decryptUsernameMiddleware({username:JWT_USERNAME}).result;

    const { cart } = React.useContext(ProductContext);

    const quantity = 0;
    // const placeOrder = () => {
    //     alert('Order Placed!')
    // }
    
    const [menu, setMenu] = React.useState(false);
    const [border, setBorder] = React.useState(false);
    let count = 0;

    function toggleBorder(){
        setBorder(border === false ? true : false)
    }

    function toggleMenu(){
        setMenu(menu === false ? true:false)
    }
    return (
        <div className={userStyles.navbar}>
            <div className={userStyles.leftMenu}>
                {/* <span onClick={toggleMenu}><Icon.MenuAlt2Icon color='#eb332a' className={userStyles.iconSize}/></span> */}
                <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}} href='#'>
                    {/* <p style={{fontSize:12,  color:'grey', width:'50%', textTransform:'uppercase', fontWeight:'normal', marginLeft:'.5rem'}}>{'Delivering to:'}</p>
                    <div onClick={toggleBorder} className={border ? userStyles.searchInputContainerBorder : userStyles.searchInputContainer}>
                        <input type={'search'} placeholder='enter address...' style={{borderLeft:'1px solid grey', marginLeft:'.5rem'}} className={userStyles.searchInput}/>
                        <Icon.LocationMarkerIcon color='#eb332a' width={25} height={25}/>
                    </div> */}
                    <Link href={'/'}>
                        <Image  src='/uploads/logo.png' width={130} height={30} alt="Rogerdart"/>
                    </Link>
                </div>
            </div>
            <div className={userStyles.rightMenu}>
                {/* <Link href={PROFILE_PAGE_ROUTE} passHref>
                    <a style={{display:'flex', alignItems:'center', marginRight:'.5rem'}}>
                        <Icon.UserCircleIcon color='#eb332a' className={userStyles.iconSize}/> 
                        <span style={{color:'#eb332a', textTransform:'capitalize', fontSize:12, fontWeight:300}}>{localStorage.getItem("firstname") ||'Guest..'}</span>
                    </a>
                </Link>
                <a style={{display:'flex', alignItems:'center', backgroundColor:'#eb332a', borderRadius:10, padding:'.5rem'}} href='#'>
                    <Icon.ShoppingCartIcon color='#fff' className={userStyles.iconSize}/>
                    <span style={{color:'#fff', fontWeight:'bold'}}>{cart.length === 0 ? 0 : cart.length}</span>
                </a> */}
                <p style={{marginRight: '30px', fontWeight: 600, fontSize: '16px', marginTop: '5px' }}>SUPPORT</p>
                <a style={{display:'flex', alignItems:'center', backgroundColor:'#E432250A', borderRadius:10, padding:'.5rem', position: 'relative', top: '-5px'}} href='#'>
                    <Icon.BellIcon color='#000' className={userStyles.iconSize}/>
                </a>
                <Link href={PROFILE_PAGE_ROUTE} passHref>
                    <p style={{marginLeft: '30px', cursor: 'pointer', marginTop: '10px'}}>
                        <Image  src='/uploads/face.png' width={30} height={30} alt=""/>
                        <span style={{position: 'relative', bottom: '10px'}}>  My Account</span>
                    </p>
                </Link>
            </div>
            {menu ? 
            <div className={userStyles.sideMenu}>
                <p onClick={toggleMenu}><Icon.XIcon  color='#eb332a' className={userStyles.iconSize}/></p>
                <ul>
                    <Link href={`/`}>
                        <li>
                            <Icon.ArrowLeftIcon className={userStyles.iconSize}/>
                            <div>Website</div>
                        </li>
                    </Link>
                    <Link href={`/consumers`}>
                        <li>
                            <Icon.HomeIcon className={userStyles.iconSize}/>
                            <div>Home</div>
                        </li>
                    </Link>
                    <Link href={`/consumers/orders`}>
                    <li>
                            <Icon.ReceiptTaxIcon className={userStyles.iconSize}/>
                            <div>Orders</div>
                    </li>
                    </Link>
                    <li>
                        <Link href={`/consumers/profile`}>
                            <a>
                                <Icon.UserCircleIcon className={userStyles.iconSize}/>
                                <span>
                                    <div>Account</div>
                                    <p>{Name || null}</p>
                                </span>
                            </a>
                        </Link>
                    </li>
                    <Link href={'/consumers/offers'}>
                    <li>
                        <Icon.GiftIcon className={userStyles.iconSize}/>
                        <div>Offers</div>
                    </li>
                    </Link>
                    <li>
                        <Icon.SupportIcon className={userStyles.iconSize}/>
                        <div>Help</div>
                    </li>
                    <li onClick={signOut}>
                        <Icon.LogoutIcon className={userStyles.iconSize}/>
                        <Link href='#'>
                        <a>Sign Out</a>
                        </Link>
                    </li>
                </ul>
                <div className={userStyles.sideFooter}>
                    <p>About Us</p>
                    <p>Careers</p>
                </div>
            </div>:null}
        </div>
    )
}
export { Navigation }
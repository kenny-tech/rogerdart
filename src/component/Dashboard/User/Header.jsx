import * as React from 'react';
import * as Icon from '@heroicons/react/outline';
import Link from 'next/link';
import { userStyles } from '@src/styles';
import AuthContext from '@src/services/authContext';
import { PROFILE_PAGE_ROUTE } from "@src/services/routes";
import { decryptUsernameMiddleware } from '@helpers/jwt-middleware';
import ProductContext from '@src/services/productContext';
import Image from "next/image";

const Navigation = () => {

    const { signOut, User } = React.useContext(AuthContext);
    const JWT_USERNAME = window.localStorage.getItem("username")
    const Name = decryptUsernameMiddleware({ username: JWT_USERNAME }).result;

    const { cart } = React.useContext(ProductContext);

    const [menu, setMenu] = React.useState(false);
    const [border, setBorder] = React.useState(false);

    function toggleBorder() {
        setBorder(border === false ? true : false)
    }

    function toggleMenu() {
        setMenu(menu === false ? true : false)
    }

    return (
        <div className={userStyles.navbar}>
            <div className={userStyles.leftMenu}>
                {/* <span onClick={toggleMenu}><Icon.MenuIcon color='#282828' width={50} height={25}/></span> */}
                <span><Icon.MenuIcon color='#282828' width={50} height={25} /></span>
                <div className={userStyles.logoDiv} href='#'>
                    <Link href={'/'}>
                        <Image src='/uploads/logo.png' width={130} height={25} alt="Rogerdart" />
                    </Link>
                </div>
                <div className={userStyles.addressDiv}>
                    <select className="form-control" name="address" value={''} style={{width: '250px', borderRadius: '30px'}}>
                        <option value="200 Woji Road, Port Harcourt">200 Woji Road, Port Harcourt</option>
                        <option value="15 Sapele Road, Benin City">15 Sapele Road, Benin City</option>
                        <option value="Pick up">Pick up</option>
                    </select>
                </div>
                <div className={userStyles.searchDiv}>
                    <input type="text" name="search" placeholder="Search store, products, dishes" className={userStyles.searchTextbox} />
                    <div className={userStyles.searchButon}>
                        <p className={userStyles.searchText}>Search</p>
                    </div>
                </div>
            </div>
            <div className={userStyles.rightMenu}>
                {/* <p style={{marginRight: '30px', fontWeight: 600, fontSize: '16px', marginTop: '5px' }}>SUPPORT</p> */}
                <a style={{ display: 'flex', alignItems: 'center', backgroundColor: '#E432250A', borderRadius: 10, padding: '.5rem', position: 'relative', top: '-5px', marginRight: '30px' }} href='#'>
                    <Icon.ShoppingCartIcon color='#000' className={userStyles.iconSize} />
                </a>
                <a style={{ display: 'flex', alignItems: 'center', backgroundColor: '#E432250A', borderRadius: 10, padding: '.5rem', position: 'relative', top: '-5px' }} href='#'>
                    <Icon.BellIcon color='#000' className={userStyles.iconSize} />
                </a>
                <p className={userStyles.circle}><span className={userStyles.circleText}>{2}</span></p>
            </div>
            {menu ?
                <div className={userStyles.sideMenu}>
                    <p onClick={toggleMenu}><Icon.XIcon color='#eb332a' className={userStyles.iconSize} /></p>
                    <ul>
                        <Link href={`/`}>
                            <li>
                                <Icon.ArrowLeftIcon className={userStyles.iconSize} />
                                <div>Website</div>
                            </li>
                        </Link>
                        <Link href={`/consumers`}>
                            <li>
                                <Icon.HomeIcon className={userStyles.iconSize} />
                                <div>Home</div>
                            </li>
                        </Link>
                        <Link href={`/consumers/orders`}>
                            <li>
                                <Icon.ReceiptTaxIcon className={userStyles.iconSize} />
                                <div>Orders</div>
                            </li>
                        </Link>
                        <li>
                            <Link href={`/consumers/profile`}>
                                <a>
                                    <Icon.UserCircleIcon className={userStyles.iconSize} />
                                    <span>
                                        <div>Account</div>
                                        <p>{Name || null}</p>
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <Link href={'/consumers/offers'}>
                            <li>
                                <Icon.GiftIcon className={userStyles.iconSize} />
                                <div>Offers</div>
                            </li>
                        </Link>
                        <li>
                            <Icon.SupportIcon className={userStyles.iconSize} />
                            <div>Help</div>
                        </li>
                        <li onClick={signOut}>
                            <Icon.LogoutIcon className={userStyles.iconSize} />
                            <Link href='#'>
                                <a>Sign Out</a>
                            </Link>
                        </li>
                    </ul>
                    <div className={userStyles.sideFooter}>
                        <p>About Us</p>
                        <p>Careers</p>
                    </div>
                </div> : null}
        </div>
    )
}
export { Navigation }
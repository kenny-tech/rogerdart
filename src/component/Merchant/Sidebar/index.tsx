import { NextPage } from "next";
import React, { useState } from "react";
import { sidebarStyles } from "@src/styles";
import * as Icon from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from 'next/router';
import { PROFILE_PAGE_ROUTE, NOTIFICATION_PAGE_ROUTE, PRIVACY_PAGE_ROUTE, ORDER_PAGE_ROUTE, DASHBOARD_MERCHANT_PAGE_ROUTE, ORDER_MERCHANT_PAGE_ROUTE, PRODUCT_MERCHANT_PAGE_ROUTE, PAYMENT_MERCHANT_PAGE_ROUTE, COUPON_MERCHANT_PAGE_ROUTE, ADMIN_MERCHANT_PAGE_ROUTE, ACCOUNT_MERCHANT_PAGE_ROUTE, NOTIFICATION_MERCHANT_PAGE_ROUTE } from "@src/services/routes";

const Sidebar: NextPage = () => {

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleLogoutModal = () => {
        setIsOpen(true);
    }

    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white">
            <div className="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul className="list-unstyled" id="menu">
                    <div className={router.pathname === DASHBOARD_MERCHANT_PAGE_ROUTE ? sidebarStyles.activeLink : sidebarStyles.inActiveLink}>
                        <Link href={DASHBOARD_MERCHANT_PAGE_ROUTE}>
                            <li className="nav-item mb-3">
                                <a href="#" className="nav-link align-middle text-black">
                                <Icon.ViewGridIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                </a>
                            </li>
                        </Link>
                    </div>
                    <div className={router.pathname === ORDER_MERCHANT_PAGE_ROUTE ? sidebarStyles.activeLink : sidebarStyles.inActiveLink}>
                        <Link href={ORDER_MERCHANT_PAGE_ROUTE}>
                            <li className="nav-item mb-3">
                                <a href="#" className="nav-link align-middle text-black">
                                    <i className="fs-4 bi-table"></i> <Icon.ViewListIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Orders</span></a>
                            </li>
                        </Link>
                    </div>
                    <div className={router.pathname === PRODUCT_MERCHANT_PAGE_ROUTE ? sidebarStyles.activeLink : sidebarStyles.inActiveLink}>
                    <Link href={PRODUCT_MERCHANT_PAGE_ROUTE}>
                            <li className="nav-item mb-3">
                                <a href="#" className="nav-link align-middle text-black">
                                    <i className="fs-4 bi-people"></i> <Icon.ShoppingBagIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Products</span> </a>
                            </li>
                        </Link>
                   </div>
                   <div className={router.pathname === PAYMENT_MERCHANT_PAGE_ROUTE ? sidebarStyles.activeLink : sidebarStyles.inActiveLink}>
                    <Link href={PAYMENT_MERCHANT_PAGE_ROUTE}>
                        <li className="nav-item mb-3">
                            <a href="#" className="nav-link align-middle text-black">
                                    <i className="fs-4 bi-people"></i> <Icon.ChartPieIcon className={sidebarStyles.iconStyle}/> <span className="ms-1 d-none d-sm-inline">Payments</span> </a>
                            </li>
                        </Link>
                   </div>
                    {/* <Link href={"#"}>
                        <li className="nav-item mb-3">
                            <a href="#" className={router.pathname === PROFILE_PAGE_ROUTE ? sidebarStyles.active : sidebarStyles.inActive}>
                            <Icon.ArrowCircleDownIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Customers</span>
                            </a>
                        </li>
                    </Link> */}
                   <div className={router.pathname === COUPON_MERCHANT_PAGE_ROUTE ? sidebarStyles.activeLink : sidebarStyles.inActiveLink}>
                        <Link href={COUPON_MERCHANT_PAGE_ROUTE}>
                            <li className="nav-item mb-3">
                                <a href="#" className="nav-link align-middle text-black">
                                    <i className="fs-4 bi-table"></i> <Icon.GiftIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Coupons</span></a>
                            </li>
                        </Link>
                    </div>
                    {/* <div className={router.pathname === ADMIN_MERCHANT_PAGE_ROUTE ? sidebarStyles.activeLink : sidebarStyles.inActiveLink}>
                        <Link href={ADMIN_MERCHANT_PAGE_ROUTE}>
                            <li className="nav-item mb-3">
                                <a href="#" className="nav-link align-middle text-black">
                                    <i className="fs-4 bi-people"></i> <Icon.UserIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Administrators</span> </a>
                            </li>
                        </Link>
                    </div>                         
                    */}
                        <li className="nav-item mb-3">
                            <a href="#" className="nav-link align-middle text-black">
                                <i className="fs-4 bi-people"></i> <Icon.CogIcon className={sidebarStyles.iconStyle}/> <span className="ms-1 d-none d-sm-inline">Store Settings</span> </a>
                        </li>
                        <div className={router.pathname === ACCOUNT_MERCHANT_PAGE_ROUTE ? sidebarStyles.activeLink : sidebarStyles.inActiveLink}>
                            <Link href={ACCOUNT_MERCHANT_PAGE_ROUTE}>
                                <li className="nav-item mb-3" style={{marginLeft: '10px'}}>
                                    <a href="#" className="nav-link align-middle text-black">
                                        <i className="fs-4 bi-people"></i> <Icon.UserIcon className={sidebarStyles.iconStyle}/> <span className="ms-1 d-none d-sm-inline">My Account</span> </a>
                                </li>
                            </Link>
                        </div>
                        <div className={router.pathname === NOTIFICATION_MERCHANT_PAGE_ROUTE ? sidebarStyles.activeLink : sidebarStyles.inActiveLink}>
                            <Link href={NOTIFICATION_MERCHANT_PAGE_ROUTE}>
                                <li className="nav-item mb-3" style={{marginLeft: '10px'}}>
                                    <a href="#" className="nav-link align-middle text-black">
                                        <i className="fs-4 bi-people"></i> <Icon.BellIcon className={sidebarStyles.iconStyle}/> <span className="ms-1 d-none d-sm-inline">Notifications</span> </a>
                                </li>
                            </Link>
                        </div>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;
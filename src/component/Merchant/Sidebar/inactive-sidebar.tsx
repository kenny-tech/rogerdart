import { NextPage } from "next";
import React, { useState } from "react";
import { sidebarStyles } from "@src/styles";
import * as Icon from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from 'next/router';

const InactiveSidebar: NextPage = () => {

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
                    <div className={sidebarStyles.inActiveLink}>
                        <Link href={'#'}>
                            <li className="nav-item mb-3">
                                <a href="#" className="nav-link align-middle" style={{color: '#D9D9D9'}}>
                                <Icon.ViewGridIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                </a>
                            </li>
                        </Link>
                    </div>
                    <div className={sidebarStyles.inActiveLink}>
                        <Link href={'#'}>
                            <li className="nav-item mb-3">
                            <a href="#" className="nav-link align-middle" style={{color: '#D9D9D9'}}>
                                    <i className="fs-4 bi-table"></i> <Icon.ViewListIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Orders</span></a>
                            </li>
                        </Link>
                    </div>
                    <div className={sidebarStyles.inActiveLink}>
                        <Link href={'#'}>
                            <li className="nav-item mb-3">
                            <a href="#" className="nav-link align-middle" style={{color: '#D9D9D9'}}>
                                    <i className="fs-4 bi-people"></i> <Icon.ShoppingBagIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Products</span> </a>
                            </li>
                        </Link>
                   </div>
                   <div className={sidebarStyles.inActiveLink}>
                        <Link href={'#'}>
                        <li className="nav-item mb-3">
                        <a href="#" className="nav-link align-middle" style={{color: '#D9D9D9'}}>
                                    <i className="fs-4 bi-people"></i> <Icon.ChartPieIcon className={sidebarStyles.iconStyle}/> <span className="ms-1 d-none d-sm-inline">Payments</span> </a>
                            </li>
                        </Link>
                   </div>
                   <div className={sidebarStyles.inActiveLink}>
                        <Link href={'#'}>
                            <li className="nav-item mb-3">
                                <a href="#" className="nav-link align-middle" style={{color: '#D9D9D9'}}>
                                    <i className="fs-4 bi-table"></i> <Icon.GiftIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Coupons</span></a>
                            </li>
                        </Link>
                    </div>
                    {/* <div className={sidebarStyles.inActiveLink}>
                        <Link href={'#'}>
                            <li className="nav-item mb-3">
                                <a href="#" className="nav-link align-middle" style={{color: '#D9D9D9'}}>
                                    <i className="fs-4 bi-people"></i> <Icon.UserIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Administrators</span> </a>
                            </li>
                        </Link>
                    </div>                         */}
                        <li className="nav-item mb-3">
                            <a href="#" className="nav-link align-middle" style={{color: '#D9D9D9'}}>
                                <i className="fs-4 bi-people"></i> <Icon.CogIcon className={sidebarStyles.iconStyle}/> <span className="ms-1 d-none d-sm-inline">Store Settings</span> </a>
                        </li>
                        <div className={sidebarStyles.inActiveLink}>
                            <Link href={'#'}>
                                <li className="nav-item mb-3" style={{marginLeft: '10px'}}>
                                    <a href="#" className="nav-link align-middle" style={{color: '#D9D9D9'}}>
                                        <i className="fs-4 bi-people"></i> <Icon.UserIcon className={sidebarStyles.iconStyle}/> <span className="ms-1 d-none d-sm-inline">My Account</span> </a>
                                </li>
                            </Link>
                        </div>
                        <div className={sidebarStyles.inActiveLink}>
                            <Link href={'#'}>
                                <li className="nav-item mb-3" style={{marginLeft: '10px'}}>
                                    <a href="#" className="nav-link align-middle" style={{color: '#D9D9D9'}}>
                                        <i className="fs-4 bi-people"></i> <Icon.BellIcon className={sidebarStyles.iconStyle}/> <span className="ms-1 d-none d-sm-inline">Notifications</span> </a>
                                </li>
                            </Link>
                        </div>
                </ul>
            </div>
        </div>
    )
}

export default InactiveSidebar;
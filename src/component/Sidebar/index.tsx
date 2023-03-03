import { NextPage } from "next";
import React, { useState } from "react";
import { sidebarStyles } from "@src/styles";
import * as Icon from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from 'next/router';
import { PROFILE_PAGE_ROUTE, NOTIFICATION_PAGE_ROUTE, PRIVACY_PAGE_ROUTE, ORDER_PAGE_ROUTE } from "@src/services/routes";
import LogoutModal from "@src/component/Modal/logout";

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
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start list-unstyled mt-4" id="menu">
                    <div className={router.pathname === PROFILE_PAGE_ROUTE ? sidebarStyles.active : sidebarStyles.inActive}>
                        <Link href={PROFILE_PAGE_ROUTE}>
                            <li className="nav-item mb-3">
                                <a href="#" className="nav-link align-middle text-black">
                                <Icon.UserIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">My Account</span>
                                </a>
                            </li>
                        </Link>
                    </div>
                    <div className={router.pathname === ORDER_PAGE_ROUTE ? sidebarStyles.active : sidebarStyles.inActive}>
                        <Link href={ORDER_PAGE_ROUTE}>
                            <li className="nav-item mb-3">
                                <a href="#" className="nav-link align-middle text-black">
                                    <i className="fs-4 bi-table"></i> <Icon.ViewListIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">My Orders</span></a>
                            </li>
                        </Link>
                    </div>
                    <div className={router.pathname === NOTIFICATION_PAGE_ROUTE ? sidebarStyles.active : sidebarStyles.inActive}>
                        <Link href={NOTIFICATION_PAGE_ROUTE}>
                            <li className="nav-item mb-3">
                                <a href="#" className="nav-link align-middle text-black">
                                    <i className="fs-4 bi-people"></i> <Icon.BellIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Notifications</span> </a>
                            </li>
                        </Link>
                    </div>
                    <div className={router.pathname === PRIVACY_PAGE_ROUTE ? sidebarStyles.active : sidebarStyles.inActive}>
                        <Link href={PRIVACY_PAGE_ROUTE}>
                            <li className="nav-item mb-3">
                                <a href="#" className="nav-link align-middle text-black">
                                    <i className="fs-4 bi-people"></i> <Icon.InformationCircleIcon className={sidebarStyles.iconStyle}/> <span className="ms-1 d-none d-sm-inline">Privacy</span> </a>
                            </li>
                        </Link>
                    </div>
                    <li onClick={() => handleLogoutModal()}>
                        <a href="#" className="nav-link align-middle text-black">
                        <Icon.LogoutIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Log out</span> </a>
                    </li>
                    {isOpen && <LogoutModal setIsOpen={setIsOpen}  />}
                </ul>
                {/* <div className="pb-4">
                    <ul className="list-unstyled">
                        <li onClick={() => handleLogoutModal()}>
                            <a href="#" className="nav-link align-middle text-black">
                            <Icon.LogoutIcon className={sidebarStyles.iconStyle}/><span className="ms-1 d-none d-sm-inline">Log out</span> </a>
                        </li>
                    </ul>
                </div> */}
            </div>
        </div>
    )
}

export default Sidebar;
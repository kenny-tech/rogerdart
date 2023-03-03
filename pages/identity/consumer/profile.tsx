import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Navigation, PageInfo } from "@src/component";
import Sidebar from "@src/component/Sidebar";
import { profileStyles } from "@src/styles";
import ProfileInfo from "@src/component/Profile/profileInfo";
import ChangePassword from "@src/component/Profile/changePassword";
import LoyaltyProgram from "@src/component/Profile/loyaltyProgram";
import withAuth from "@src/services/withAuth";

const Profile: NextPage = () => {

    const [profileInfoSelected, setProfileInfoSelected] = useState<boolean>(true);
    const [changePasswordSelected, setChangePasswordSelected] = useState<boolean>(false)
    const [loyaltyProgramSelected, setLoyaltyProgramSelected] = useState<boolean>(false)
    const [profileInfoColor, setProfileInfoColor] = useState<string>('#000000');
    const [changePasswordColor, setChangePasswordColor] = useState<string>('#C4C4C4');
    const [loyaltyProgramColor, setLoyaltyProgramColor] = useState<string>('#C4C4C4');

    const handleProfileClick = (name:string) => {
        if(name === 'Profile Information') {
            setProfileInfoSelected(true);
            setChangePasswordSelected(false);
            setLoyaltyProgramSelected(false);
            setProfileInfoColor('#000000')
            setChangePasswordColor('#C4C4C4');
            setLoyaltyProgramColor('#C4C4C4');
        } else if (name === 'Change Password') {
            setProfileInfoSelected(false);
            setChangePasswordSelected(true);
            setLoyaltyProgramSelected(false);
            setChangePasswordColor('#000000')
            setProfileInfoColor('#C4C4C4');
            setLoyaltyProgramColor('#C4C4C4');      
        } else {
            setProfileInfoSelected(false);
            setChangePasswordSelected(false);
            setLoyaltyProgramSelected(true);
            setLoyaltyProgramColor('#000000');
            setProfileInfoColor('#C4C4C4');
            setChangePasswordColor('#C4C4C4');
        }
    }

    return (
        <div>
            <Head>
                <title>{PageInfo.title} | {"Nigeria's No. 1 Food delivery and restaurant hub."}</title>
                <meta name="description" content="Nigeria's No. 1 Food delivery and restaurant hub." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navigation />
            <div className="container-fluid">
                <div className="row flex-nowrap mt-5">
                    <Sidebar />
                    <div className="col py-3">
                        <div className="row">
                            <div className="col-12">
                                <div className={profileStyles.right} style={{ backgroundColor: '#E3E1E1', height: profileInfoSelected ?'1450px' : '700px'}}>
                                    <div className={profileInfoSelected ? profileStyles.content : profileStyles.content1}>
                                        <div className={profileStyles.heading}>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <p onClick={() => handleProfileClick('Profile Information')} style={{color: profileInfoColor, fontSize: '22px', cursor: 'pointer', paddingRight: '800px', whiteSpace: 'nowrap'}}>Profile Information</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <p onClick={() => handleProfileClick('Change Password')} style={{color: changePasswordColor, fontSize: '22px', cursor: 'pointer'}}>Change Password</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <p onClick={() => handleProfileClick('Loyalty Programs')} style={{color: loyaltyProgramColor, fontSize: '22px', cursor: 'pointer'}}>Loyalty Programs</p>
                                                </div>
                                            </div>  
                                        </div>
                                        <hr style={{color: '#E0E0E0', marginTop: '1px', marginBottom: '1px'}}/>
                                        { profileInfoSelected ? <ProfileInfo /> : null }
                                        { changePasswordSelected ? <ChangePassword /> : null }
                                        { loyaltyProgramSelected ? <LoyaltyProgram /> : null }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
    </div>
    )
}

export default withAuth(Profile);
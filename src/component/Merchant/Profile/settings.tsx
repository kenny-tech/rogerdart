import { NextPage } from "next";
import React, { useState } from "react";
import { profileStyles } from "@src/styles";
import MerchantProfileInfo from "./profileInfo";
import MerchantBusinessInfo from "./businessInfo";
import MerchantChangePassword from "./changePassword";

const Settings: NextPage = () => {

    const [profileInfoSelected, setProfileInfoSelected] = useState<boolean>(true);
    const [changePasswordSelected, setChangePasswordSelected] = useState<boolean>(false)
    const [businessInfoSelected, setBusinessInfoSelected] = useState<boolean>(false)

    const [profileInfoColor, setProfileInfoColor] = useState<string>('#000000');
    const [changePasswordColor, setChangePasswordColor] = useState<string>('#C4C4C4');
    const [businessInfoColor, setbusinessInfoColor] = useState<string>('#C4C4C4');

    const handleProfileClick = (name:string) => {
        if(name === 'Profile Information') {
            setProfileInfoSelected(true);
            setChangePasswordSelected(false);
            setBusinessInfoSelected(false);
            setProfileInfoColor('#000000')
            setChangePasswordColor('#C4C4C4');
            setbusinessInfoColor('#C4C4C4');
        } else if (name === 'Change Password') {
            setProfileInfoSelected(false);
            setChangePasswordSelected(true);
            setBusinessInfoSelected(false);
            setChangePasswordColor('#000000')
            setProfileInfoColor('#C4C4C4');
            setbusinessInfoColor('#C4C4C4');      
        } else {
            setProfileInfoSelected(false);
            setChangePasswordSelected(false);
            setBusinessInfoSelected(true);
            setbusinessInfoColor('#000000');
            setProfileInfoColor('#C4C4C4');
            setChangePasswordColor('#C4C4C4');
        }
    }

    return (
        <div className={profileStyles.profileContent}>
            <div className="row">
                <div className="col-11">
                    <div className="card">
                        <div className="card-body">
                            <div className={profileStyles.heading}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <p onClick={() => handleProfileClick('Profile Information')} style={{color: profileInfoColor, fontSize: '22px', cursor: 'pointer', paddingRight: '800px', whiteSpace: 'nowrap'}}>Profile Information</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p onClick={() => handleProfileClick('Business Information')} style={{color: businessInfoColor, fontSize: '22px', cursor: 'pointer'}}>Business Information</p>
                                    </div>
                                    <div className="col-md-4">
                                        <p onClick={() => handleProfileClick('Change Password')} style={{color: changePasswordColor, fontSize: '22px', cursor: 'pointer'}}>Change Password</p>
                                    </div>
                                </div>  
                            </div>
                            <hr style={{color: '#E0E0E0', marginTop: '1px', marginBottom: '1px', width: '3px'}}/>
                            { profileInfoSelected ? <MerchantProfileInfo /> : null }
                            { changePasswordSelected ? <MerchantChangePassword /> : null }
                            { businessInfoSelected ? <MerchantBusinessInfo /> : null }
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;
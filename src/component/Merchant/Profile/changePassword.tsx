import { NextPage } from "next";
import { useState } from 'react';
import { profileStyles, signinStyles } from "@src/styles";
import { PUBLIC_BASE_URL, CHANGE_PASSWORD_API_ROUTE } from '@src/services/routes';
import axios from "axios";
import { successAlert, errorAlert } from "@src/services/alert";

const MerchantChangePassword: NextPage = () => {

    const error = false;
    const [loading, setLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [oldPasswordLenghError, setOldPasswordLengthError] = useState('');
    const [confirmNewPasswordLenghError, setConfirmNewPasswordLengthError] = useState('');

    const token = sessionStorage.getItem("merchantToken");

    const handleChangePassword = (event:any) => {
        setLoading(true);

        if (oldPassword.length === 0){
             setOldPasswordError('Old Password is required');
             setLoading(false);
         } else if (newPassword.length === 0){
             setNewPasswordError('New Password is required');
             setLoading(false);
         } else if(newPassword.length < 6) {
             setNewPasswordError('New Password length must be 6 characters or more');
             setLoading(false);
         } else if (newPassword != confirmNewPassword) {
            setPasswordMatchError('New Password and Confirm New Password must match');
            setLoading(false);
        } else {
             setLoading(true);

             const bodyContent = {
                password: oldPassword,
                newPassword: newPassword,
             }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
     
             const reqOptions = {url: `${PUBLIC_BASE_URL}${CHANGE_PASSWORD_API_ROUTE}`}
 
             axios.post(reqOptions.url, bodyContent, {
                headers: headers
            })
             .then(res=>{
                 console.log(res);
                 if(res.statusText) {
                     successAlert('Password successfully changed');
                 } else {
                     errorAlert('Unable to change password. Please try again.');
                 }
             })
             .catch(err=>{
                 console.log(err);
                 errorAlert(err.response.data.message);
                 setLoading(false);
             })
             
         }
    }

    return (
        <div className={profileStyles.profileContent}>
            <div className="row">
                <div className="col-11">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Set Password</h5>
                            <form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                            <label className="form-label">Old Password</label>
                                            <input type="password" className="form-control" name="oldPassword" value={oldPassword} onChange={event => setOldPassword(event.target.value)}/>
                                            {oldPassword.length === 0 && <span className={signinStyles.error}>{oldPasswordError}</span>}
                                            {oldPasswordLenghError && oldPassword.length < 6 && <span className={signinStyles.error}>{oldPasswordLenghError}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                            <label className="form-label">New Password</label>
                                            <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={event => setNewPassword(event.target.value)}/>
                                            {newPasswordError && newPassword.length < 6 && <span className={signinStyles.error}>{newPasswordError}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                            <label className="form-label">Confirm New Password</label>
                                            <input type="password" className="form-control" name="confirmNewPassword" value={confirmNewPassword} onChange={event => setConfirmNewPassword(event.target.value)}/>
                                            {passwordMatchError && <span className={signinStyles.error}>{passwordMatchError}</span>}
                                        </div>
                                    </div>
                                </div>
                            </form>  
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3 mt-3 ml-3 mr-3">
                                <div className={profileStyles.updateButtonMerchant} style={{cursor: 'pointer'}} onClick={(event) => handleChangePassword(event)}>
                                    <p style={{color: '#fff', fontSize: '16px', paddingTop: '10px'}}>Update</p>
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MerchantChangePassword;
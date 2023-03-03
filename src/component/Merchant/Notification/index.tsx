import { NextPage } from "next";
import React, { useState } from "react";
import { profileStyles } from "@src/styles";
import { notificationStyles } from "@src/styles";
import Switch from "react-switch";

const Notify: NextPage = () => {

    const [checked, setChecked] = useState<boolean>(false);

    const handleChange = (checked:boolean) => {
        setChecked(checked)
    }

    return (
        <div className={profileStyles.profileContent}>
            <div className="row">
                <div className="col-11">
                    <div className="card">
                        <div className="card-body">
                            <div className={profileStyles.heading}>
                                <h6>Notification Settings</h6>
                            </div>
                            <hr style={{color: '#E0E0E0', marginTop: '1px', marginBottom: '1px', width: '3px'}}/>
                            <div>
                                    <div className="row">
                                        <div className="col-11">
                                            <div className="card border-0">
                                                <div className="card-body">
                                                <div className="row">
                                                        <div className="col-md-12">
                                                            <p style={{marginLeft: '15px'}}>In Addition To These Alerts, We May Send You Important Information About Our Products and Services. </p>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <div className="row" style={{marginLeft: '15px'}}>
                                                        <div className="col-md-4 mb-3">
                                                            <p className={notificationStyles.notificationHeading}>Notification Type</p>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <p className={notificationStyles.notificationHeading}>SMS Notification</p>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <p className={notificationStyles.notificationHeading}>Email Alert</p>
                                                        </div>
                                                    </div>
                                                    <div className="row" style={{marginLeft: '15px'}}>
                                                        <div className="col-md-4 mb-3">
                                                            <p>Orders</p>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <Switch onChange={(checked) => handleChange(checked)} checked={checked} className={notificationStyles.toggle} onColor='#FCA311' />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <Switch onChange={(checked) => handleChange(checked)} checked={checked} className={notificationStyles.toggle} onColor='#FCA311' />
                                                        </div>
                                                    </div>
                                                    <div className="row" style={{marginLeft: '15px'}}>
                                                        <div className="col-md-4 mb-3">
                                                            <p>Delivery</p>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <Switch onChange={(checked) => handleChange(checked)} checked={checked} className={notificationStyles.toggle} onColor='#FCA311' />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <Switch onChange={(checked) => handleChange(checked)} checked={checked} className={notificationStyles.toggle} onColor='#FCA311' />
                                                        </div>
                                                    </div>
                                                    <div className="row" style={{marginLeft: '15px'}}>
                                                        <div className="col-md-4">
                                                            <p>Newsletter</p>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <Switch onChange={(checked) => handleChange(checked)} checked={checked} className={notificationStyles.toggle} onColor='#FCA311' />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <Switch onChange={(checked) => handleChange(checked)} checked={checked} className={notificationStyles.toggle} onColor='#FCA311' />
                                                        </div>
                                                    </div>                                                   
                                                </div>
                                            </div>
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

export default Notify;
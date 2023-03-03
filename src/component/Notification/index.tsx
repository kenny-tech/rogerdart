import React, { useState } from "react";
import { NextPage } from "next";
import { notificationStyles } from "@src/styles";
import Switch from "react-switch";

const Notify: NextPage = () => {

    const [checked, setChecked] = useState<boolean>(false);

    const handleChange = (checked:boolean) => {
        setChecked(checked)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <p className={notificationStyles.notificationDescription}>In Addition To These Alerts, We May Send You Important Information About Our Products and Services. </p>
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
                    <p>Send Or Receive Funds</p>
                </div>
                <div className="col-md-4">
                    <Switch onChange={(checked) => handleChange(checked)} checked={checked} className={notificationStyles.toggle} onColor='#E43225' />
                </div>
                <div className="col-md-4">
                    <Switch onChange={(checked) => handleChange(checked)} checked={checked} className={notificationStyles.toggle} onColor='#E43225' />
                </div>
            </div>
            <div className="row" style={{marginLeft: '15px'}}>
                <div className="col-md-4 mb-3">
                    <p>Buy Or Sell</p>
                </div>
                <div className="col-md-4">
                    <Switch onChange={(checked) => handleChange(checked)} checked={checked} className={notificationStyles.toggle} onColor='#E43225' />
                </div>
                <div className="col-md-4">
                    <Switch onChange={(checked) => handleChange(checked)} checked={checked} className={notificationStyles.toggle} onColor='#E43225' />
                </div>
            </div>
            <div className="row" style={{marginLeft: '15px'}}>
                <div className="col-md-4 mb-3">
                    <p>Newsletter</p>
                </div>
                <div className="col-md-4">
                    <Switch onChange={(checked) => handleChange(checked)} checked={checked} className={notificationStyles.toggle} onColor='#E43225' />
                </div>
                <div className="col-md-4">
                    <Switch onChange={(checked) => handleChange(checked)} checked={checked} className={notificationStyles.toggle} onColor='#E43225' />
                </div>
            </div>
        </div>
    )
}

export default Notify;
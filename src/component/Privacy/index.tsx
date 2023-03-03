import React from "react";
import { NextPage } from "next";
import { privacyStyles } from "@src/styles";

const UserPrivacy: NextPage = () => {

    return (
        <div>
            <p style={{marginLeft: '30px', marginTop: '20px', fontSize: '24px', fontWeight: '600px'}}>Welcome to Rogerdart</p>
            <div className={privacyStyles.notification}>
                <p className={privacyStyles.notificationHeading}>Introduction</p>
            </div>
            <div className={privacyStyles.notification}>
                <p>
                    Lorem he leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
        </div>
    )
}

export default UserPrivacy;
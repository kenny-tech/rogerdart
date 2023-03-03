import putMiddleware from '@api/middleware/put-handler';
import * as initializeRequest  from '@api/model/users/user.services';
import { transporter } from '@src/config';
import { NextApiRequest, NextApiResponse } from 'next';

const confirmAccountHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
    try {
        const data =  await initializeRequest.confirmAccount(req.body)
        if(data){
            res.status(409).json({
                success:false,
                message:`Your account ${req.body.user_email} has already been activated!.`
            })
        }else{
            let mailOptions = {
                from: process.env.USER,
                to: req.body.user_email,
                subject: process.env.SUBJECT,
                html:`<div marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" bgcolor="#eaeeef"
                leftmargin="0">
                <div style="text-align:center; background-color:#f2f3f8; color:#455056bd; line-height:18px;"><strong> </strong></div>
                <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Raleway:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                  <td>
                    <table style="background-color: #f2f3f8; max-width:670px; margin:4rem auto;" width="100%" border="0" align="center"
                      cellpadding="0" cellspacing="0">
                          <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                            style="max-width:600px; background:#fff; border-radius:3px; text-align:left;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                              <td style="padding:40px;">
                                <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td>
                                    <h1 style="color: #1e1e2d; font-weight: 500; margin: 0; text-transform:capitalize; font-size: 28px;font-family:'Raleway',sans-serif;">Account Verification</h1>
                                    <p style="font-size:15px; color:#455056; line-height:20px; margin:8px 0 30px;">Hi ${req.body.user_email},</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                        <tr
                                          style="border-bottom:1px solid #ebebeb; margin-bottom:26px; padding-bottom:29px; display:block;">
                                          <td width="84">
                                          </td>
                                          <td style="vertical-align:top;">
                                          <p style="font-size:15px; color:#455056; line-height:24px; margin:0 0 30px;">
                                            Welcome to <strong>Rogerdart</strong> your account
                                            <strong>${req.body.user_email} </strong> has been verified successfully.
                                          </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="height:25px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:#455056bd; line-height:18px; margin:0 0 0;">&copy; <strong>Rogerdart &#153;</strong></p>
                        </td>
                      </tr>
                      <tr>
                        <td style="height:80px;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              </div>`
              }
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    res.status(408).json({
                        success:false,
                        mesage:error.message
                    });
                } else {
                    res.status(201).json({
                        success:true,
                        message:"Account Verification Success!"
                    })
                }
            });
        }
    } catch (error) {  
        res.status(500).json({
            success:false,
            message:"Oops! something is missing."
        })
    }
}

export default putMiddleware(confirmAccountHandler)
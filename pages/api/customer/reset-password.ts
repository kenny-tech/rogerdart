import { NextApiRequest, NextApiResponse } from 'next';
import postMiddleware from '@api/middleware/post-handler';
import * as init  from '@api/model/users/user.services';
import { otpHandler } from '@api/middleware/otp-handler';

const passwordResetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const body = req.body;
    const response = await init.requestPasswordReset({...body, resetCode:otpHandler()})
    if(!response){
      res.status(404).json({
        success:false,
        message:`Your account ${body.user_email} is not found!`
      })
    }
 
    else return res.status(200).json({
            success: true,
            message: `Your OTP has been sent to ${body.user_email}!`,
            data:response?``:response
        });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:`Oops! Unknown Error ${error}.`
    })
  }

}

export default postMiddleware(passwordResetHandler)
import { NextApiRequest, NextApiResponse } from 'next';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import * as initializeRequest  from '@api/model/users/user.services';
import postMiddleware from '@api/middleware/post-handler';

const signinHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const authenticateUser = await initializeRequest.signIn(req.body);
    const body = req.body;
    if(!authenticateUser){
      res.status(400).json({
        success:false,
        message:`Email ${body.user_email} is incorrect, please try again.`
      })
    }

    const encryptPass = compareSync(body.user_pass, authenticateUser.user_pass);
    if (encryptPass) {
      authenticateUser.user_pass = "";
        const jsontoken = sign({ data: authenticateUser}, `${process.env.TOKEN_SECRET}`, {
            expiresIn: '12h'
        });
        return res.status(200).json({
            success: true,
            message: `Welcome back ${authenticateUser.user_email}!`,
            data: {...authenticateUser, accessToken: jsontoken}
        });
    }else{
      res.status(400).json({
        success:false,
        message:"Your password is incorrect, please try again."
      })
    }
    
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error + "Oops! something is missing."
    })
  }

}

export default postMiddleware(signinHandler)
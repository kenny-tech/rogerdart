import postMiddleware from "@api/middleware/post-handler";
import { NextApiRequest, NextApiResponse } from "next";
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import * as initializeRequest  from '@api/model/vendor/vendor.services';


const merchantAuthHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        const authenticateUser = await initializeRequest.signIn(req.body);
        const body = req.body;
        if(!authenticateUser){
          res.status(400).json({
            success:false,
            message:`Email ${body.email} is incorrect, please try again.`
          })
        }
    
        const encryptPass = compareSync(body.business_pass, authenticateUser.business_pass);
        if (encryptPass) {
          authenticateUser.business_pass = "";
            const jsontoken = sign({ data: authenticateUser}, `${process.env.TOKEN_SECRET}`, {
                expiresIn: '12h'
            });
            return res.status(200).json({
                success: true,
                message: `Welcome back ${authenticateUser.email}!`,
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
          message:"Oops! something is missing."
        })
      }
}

export default postMiddleware(merchantAuthHandler);
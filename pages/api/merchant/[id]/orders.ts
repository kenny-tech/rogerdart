import { NextApiRequest, NextApiResponse } from 'next';
import * as initializeRequest  from '@api/model/vendor/vendor.services';
import jwt from "jsonwebtoken";
import getMiddleware from '@api/middleware/get-handler';

const getAllOrders = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if(!req.headers[`authorization`]) return res.status(401).json({success:false, message:`Unauthorised: You must be signed in.`});
      const authHeader = req.headers["authorization"];
      const bearerToken = authHeader.split(" ");
      const token = bearerToken[1];
      const isAuth = jwt.verify(token, process.env.TOKEN_SECRET || `98798sy*&Q&^WQUgaguydgs7676L*&^qqw::q`, async (error, _payload) => {
        if (error)
          return res.status(412).json({
            success: false, message: error.message === `jwt expired` ? `Sign In have expired Sign In again!` :
              `There is an issue with your current sign in, an unauthorised account may have tried to access your account, please contact <strong>support@rogerdart.com</strong> if you see this message again in your next sign in attempt.`
          });
        return true;
      })
    try {
      switch (isAuth) {
        case isAuth:
          const data =  await initializeRequest.getOrders(req.query.id);
          res.status(200).json({
            success:true,
            response:data
          })
          break;

        default:
          res.status(404).json({
            success:false,
            message:"Suspicious sign in activity! Vendor Not Found!."
          })
          break;
      }
    } catch (error:any) {
      error === `Vendor Not Found!` ?
        res.status(404).json({
            success:false,
            message:`${error}`
        }):
        res.status(500).json({
            success:false,
            message:`Oops! server unreachable. ${error}`
        })
    }
}

export default getMiddleware(getAllOrders)
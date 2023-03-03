import jwt from "jsonwebtoken";
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import postMiddleware from '@api/middleware/post-handler';
import * as initRequest from "@api/model/order/order.services";

const paymentHandler = async (
    req: Req,
    res: Res
  ) => {
      if(!req.headers["authorization"]) return res.status(412).json({message:"Unauthorised: You must be signed in."});
      const authHeader = await req.headers["authorization"];
      const bearerToken = authHeader.split(" ");
      const token = bearerToken[1];
      const isAuth = await jwt.verify(token, process.env.TOKEN_SECRET || "RandomToken", async(error, payload)=>{
          if(error) return res.status(412).json({success:false, message:error.message === "jwt expired"? "Sign In have expired!":
      "There is an issue with your current sign in, someone may have tried to access your account unauthorised contact support@rogerdart.com if you see this message again."})
          return true;
      })
      try { 
          const data:any = await initRequest.Order(req.body);
          switch (data && isAuth) {
              case data && isAuth:
                  res.status(200).json({
                      success:true,
                      message:"Order placed!"
                  })    
                  break;
              default:
                  res.status(400).json({
                      success:false,
                      message:"Failed!"
                  })
                  break;
            }
      } catch (error) {
          res.status(400).json({
              success:false,
              message:`${error}`
          })  
      }
  }

export default postMiddleware(paymentHandler)

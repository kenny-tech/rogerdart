import getMiddleware from '@api/middleware/get-handler';
import jwt from "jsonwebtoken";
import * as initializeRequest  from '@api/model/users/user.services';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';

const usersHandler = async (
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
          switch (isAuth) {
              case isAuth:
                  const data:any = await initializeRequest.getUsers();
                  res.status(200).json({
                      success:true,
                      data:data,
                      message:"Success"
                  })    
                  break;
              default:
              res.status(404).json({
                  success:false,
                  message:"Oops! There is no user available."
              })
                  break;
          }
      } catch (error) {
          res.status(500).json({
              success:false,
              message:"Oops! something is missing."
          })  
      }
  }

export default getMiddleware(usersHandler)

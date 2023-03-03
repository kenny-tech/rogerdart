import jwt from "jsonwebtoken";
import { NextApiResponse as Res, NextApiRequest as Req } from "next";

export async function tokenMiddleware(
    req: Req,
    res:Res,
    fn:any
  ) {
    if(!req.headers["authorization"]) return res.status(412).json({message:"Unauthorised: You must be signed in."});
    const authHeader = await req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    return new Promise((resolve, reject) => {
        fn(req, res, (result:unknown) => {
            jwt.verify(token, process.env.TOKEN_SECRET || "RandomToken", async (err, payload) => {
                if (result instanceof Error) {
                  return reject(result)
                }
                if (err) return resolve(err);
                return resolve(result)
            })
        })
      })
}

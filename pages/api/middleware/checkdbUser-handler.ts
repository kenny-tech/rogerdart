import { User } from "@api/model/users/user.model";
import { userQueries } from "@api/model/users/user.queries";
import { execute } from "@src/config";
import { NextApiResponse as Res, NextApiRequest as Req } from "next";


export async function checkUserExistMiddleware(handler:Function |any ) {
    return async (req:Req, res:Res) => {
        const findUser = await execute<User>(userQueries.FIND_USER_BY_EMAIL, [req.body.user_email]);
        try {
            if(findUser) return "User Exist!"
            else return handler(req, res)
        } catch (error) {
            throw new Error("Somthing Happened!");
        }
      }
}
import { NextApiRequest, NextApiResponse } from "next";

const deleteMiddleware = (handler:Function) => {
  return async (req:NextApiRequest, res:NextApiResponse) => {
    return new Promise((resolve, reject) =>{   
      switch (req.method){
        case 'DELETE':
          return handler(req, res, (result: unknown) => {
              if(result instanceof Error){
                return reject(result)
              }
              return resolve(result)
            })
          break;
        default:
          return res.status(405).json({message:"METHOD NOT ALLOWED!!!"});
      }
    })
  }
}

export default deleteMiddleware;
import { pool } from '@src/config';
import { jwtMiddleware } from '@helpers/jwt-middleware';
import { NextApiRequest, NextApiResponse } from 'next';


export default jwtMiddleware(async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
){
  pool.query(
    `${process.env.FIND_USER_BY_EMAIL}`,
    [req.body.user_email],
    (error:any, results:any) => {
        if (error) {
            return res.status(404).json({data:error});
        }
        return res.status(200).json({
            success:true,
            data:results
        });
    }
  );
})

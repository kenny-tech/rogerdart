import { pool } from '@src/config';
import getMiddleware from '@api/middleware/get-handler';
import type { NextApiResponse as Res, NextApiRequest as Req } from 'next';
import { models } from '@api/model';
import { tokenMiddleware } from '@api/middleware/token-handler';

const tagsHandler = (
  req: Req,
  res: Res
) =>{
    tokenMiddleware(req, res, pool.query(
    `${models.GET_ALL_TAGS}`,
    [],
    (error:any, results:any, fields:any) => {
      if (error) {
        return res.status(404).json({
          data: '',
          message: "Not Found!."
        });
    }
    return res.status(200).json({
      data: results,
      message: ''
    });
    }
  ))
}

export default  getMiddleware(tagsHandler)
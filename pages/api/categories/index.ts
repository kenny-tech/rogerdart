import { pool } from '@src/config';
import getMiddleware from '@api/middleware/get-handler';
import { models } from '@api/model';
import type { NextApiResponse as Res, NextApiRequest as Req } from 'next';

const handler = (req: Req, res: Res) => {
    pool.query(
    `${models.GET_ALL_CATEGORIES}`,
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
  )
}

export default getMiddleware(handler);
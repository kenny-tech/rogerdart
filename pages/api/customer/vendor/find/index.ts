import getMiddleware from '@api/middleware/get-handler';
import * as initializeRequest  from '@api/model/vendor/vendor.services';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';

const usersHandler = async (
    req: Req,
    res: Res
  ) => {
      try { 
          const data:any = await initializeRequest.searchEverything(req.query);
          switch (data) {
              case data:
                  res.status(200).json({
                      success:true,
                      message:"Success",
                      data:data
                  })    
                  break;
              default:
              res.status(404).json({
                  success:false,
                  message:"searching..."
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

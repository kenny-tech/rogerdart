import putMiddleware from '@api/middleware/put-handler';
import * as initializeRequest  from '@api/model/vendor/vendor.services';
import { NextApiRequest, NextApiResponse } from 'next';

const confirmAccountHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
    try {
        const data =  await initializeRequest.confirmAccount(req.body)
        res.status(201).json({
          success:true,
          message:`Account Verification Success! \n Setup your store in few steps`,
          data:data
      })
    } catch (error) {  
        res.status(500).json({
            success:false,
            message:`Oops! Internal Server Error!.`
        })
    }
}

export default putMiddleware(confirmAccountHandler)
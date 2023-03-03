import postMiddleware from '@api/middleware/post-handler';
import putMiddleware from '@api/middleware/put-handler';
import * as initializeRequest  from '@api/model/users/user.services';
import { NextApiRequest, NextApiResponse } from 'next';

const resetPassHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
    try {
        const body = req.body;
        const data =  await initializeRequest.resetPass(body)
        if(data.match("User Not Found!")){
            res.status(409).json({
                success:false,
                message:`${data}`
            })
        }else if(body.user_pass !== body.confirm_pass){
            res.status(400).json({
                success:false,
                message:`Passwords did not match!`
            })
        } 
        else{
            res.status(200).json({
                success:true,
                message:`Password changed successfully.`,
                data:data
            })
        }
    } catch (error) {  
        res.status(500).json({
            success:false,
            message:`Oops! something is missing. ${error}`
        })
    }
}

export default putMiddleware(resetPassHandler)
// export default postMiddleware(resetPassHandler)
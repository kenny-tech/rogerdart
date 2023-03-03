import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';

const signout = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'POST') {
      // Destroy cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('access_token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          expires: new Date(0),
          sameSite: 'strict',
          path: '/',
        })
      );
  
      res.status(200).json({ message: 'Successfully logged out!' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ message: `Method ${req.method} not allowed!` });
    }
  };
  
  export default signout;
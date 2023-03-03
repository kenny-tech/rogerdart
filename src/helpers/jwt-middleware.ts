import { verify } from "jsonwebtoken";

export interface JWTProps {
  token: string;
}

export interface JWTUNProps {
  username:string;
}

export const jwtMiddleware = (value: any) => {
  const { token } = value;
    // check if token exist or does not
    if(token === undefined){
    return false; 
  } else {
    // check if token was signed and valid and not expired
    const validateToken = verify(token, `${process.env.TOKEN_SECRET}`, function(err:any, decoded:any){
      if(!err && decoded){
        return true;
      } else{
        return false;
      }
    })
    return validateToken; //If valide returns true else false
  }
};

export const decryptUsernameMiddleware = (value: JWTUNProps) => {
  const { username } = value;
    // check if token exist or does not
    if(username === undefined){
    return false; 
  } else {
    // check if token was signed and valid and not expired
    const decryptedUsername = verify(username, `${process.env.TOKEN_SECRET}`, function(err, decoded){
      if(!err && decoded){
        return decoded;
      } else{
        return false;
      }
    })
    return decryptedUsername; //If valide returns true else false
  }
};

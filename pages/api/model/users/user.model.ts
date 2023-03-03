export interface User {
    [x: string]: any;
    user_email: string;
    user_pass: string;
    user_mobile: string;
    user_address:string;
    first_name:string;
    last_name:string;
    username:string;
    isActivated:boolean;
    confirmationCode:string;
    resetCode:string;
    linkedin:string;
    facebook:string;
    created_at:Date;
    getUsers:Function;
  };
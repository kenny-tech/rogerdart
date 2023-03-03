import { otpHandler } from "@api/middleware/otp-handler";
import { createAccount, executeAll, executeAuth, findById, passwordReset, accountConfirmation, requestPassReset} from "@src/config";
import { User } from "./user.model";
import { userQueries } from "./user.queries";
import bcrypt from "bcrypt";


// NODE_ENV=production node server.js
const otp = otpHandler();
export const signIn = async (data:User) => {
    return executeAuth<User>(userQueries.SIGN_IN, [
        data.user_email, 
        data.user_pass
    ])
};

export const signUp = async (data:User) => {
    data.confirmationCode = otp;
    const encryptPwd = await bcrypt.hash(data.user_pass, 10);
    return createAccount<User>(userQueries.FIND_USER_BY_EMAIL, userQueries.CREATE_ACCOUNT,
         data.user_email, [data.first_name, data.last_name, data.user_email, 
            data.user_mobile, encryptPwd, data.confirmationCode])
};

export const requestPasswordReset = async (data:User) => {
    return requestPassReset<User>(userQueries.FIND_USER_BY_EMAIL, [data.user_email], userQueries.UPDATE_RESET_CODE, [data.resetCode, data.user_email])
};
export const resetPass = async (data:User) => {
    const encryptPasswd = await bcrypt.hash(data.user_pass, 10);
    return passwordReset<User>(userQueries.FIND_USER_BY_CODE, userQueries.UPDATE_USER_PASS,
         data.resetCode, [encryptPasswd, data.resetCode])
};

export const confirmAccount = async (data:User) => {
    const nullCode = '' 
    return accountConfirmation<User>(userQueries.FIND_USER_BY_EMAIL, userQueries.UPDATE_USER_CONFIRMATION_CODE,
         data.user_email, data.confirmationCode, [nullCode, data.user_email])
};

export const getUsers = () => {
    return executeAll<any>(userQueries.GET_ALL_USERS)
};

export const userProfile = async (data:any) => {
    return findById<User>(userQueries.GET_USER_BY_ID, [data.id])
};

export const editUser = async (id:any, data:any) => {
    return findById<User>(userQueries.UPDATE_USER, [data.first_name,
        data.last_name, data.username, data.user_email, data.user_mobile, data.user_country, data.user_address, data.linkedin, 
        data.facebook, id])
};




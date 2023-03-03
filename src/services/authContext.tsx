import React from 'react';
import axios from 'axios';
import { createContext, useState } from 'react';
import { useRouter } from 'next/router';
import { PAGE_ROUTE_SIGN_IN, PUBLIC_BASE_URL, SIGN_IN_PUBLIC_API_ROUTE, SIGN_OUT_PUBLIC_API_ROUTE, PAGE_ROUTE_VERIFY, VENDOR_PAGE_ROUTE, VENDORS_PUBLIC_API_ROUTE, SIGN_UP_API_ROUTE, SIGN_IN_API_ROUTE, VERIFY_USER_MERCHANT_PAGE_ROUTE, OWNER_INFO_MERCHANT_PAGE_ROUTE, SIGN_IN_MERCHANT_PUBLIC_API_ROUTE } from './routes';
import { storageController } from '@src/utils/storage';
import { successAlert, errorAlert } from "@src/services/alert";

interface ProviderProps {
  children: React.ReactNode;
}

export interface SignUpProps {
  firstName:string, 
  lastName:string, 
  email:string, 
  phoneNumber:string, 
  password:string,
  userType: string,
}

export interface MerchantSignUpProps {
  merchantName:string, 
  merchantEmail:string, 
  merchantAddress1:string, 
  merchantAddress2:string, 
  merchantStreet:string, 
  merchantCity:string,
  merchantState: string,
  merchantPassword: string,
}


export interface SignInProps {
  email: string;
  password: string;
}

const AuthContext:any = createContext({
  error: undefined as any,
  success: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  signIn: (event:Event, credentials: SignInProps) => {
    return;
  },
  signUp: (event: Event, credentials: SignUpProps) => {
    return;
  },
  signOut: () => {
    return;
  },
  merchantSignOut: () => {
    return;
  },
  merchantSignIn: (event:Event, credentials: SignInProps) => {
    return;
  },
  // merchant
  merchantSignUp: (event: Event, credentials: MerchantSignUpProps) => {
    return;
  },
});

export const AuthProvider = ({ children }: ProviderProps) => {

  const [User, setUser] = useState<any>()
  // Error is unknown to support every form of error this is any
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState('');

  const Router = useRouter();

  const signUp = async (event: Event, credentials: SignUpProps) => {
    event.preventDefault();

    const { firstName, lastName, email, phoneNumber, password } = credentials;
    const userType = 'CUSTOMER';

    try {
      const res = await axios.post(`${PUBLIC_BASE_URL}${SIGN_UP_API_ROUTE}`, 
        { firstName, lastName, email, phoneNumber, password, userType},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if(!res) {
        const error = 'Error from the api';
        setError(error);
        return error;
      }

      successAlert('Registration successful! A token has been sent to your email. Please use this to verify your account.');
      Router.push({
          pathname:`${PAGE_ROUTE_VERIFY}`, 
          query:{email: email}
      }, undefined, { shallow:true })
    }
    catch(error:any) {      
      errorAlert(error.response.data.message);
      setTimeout(() => {
        Router.reload()
      }, 3000)
    }
  };

  // Sign in
  const signIn = async (event: Event, credentials: SignInProps) => {
    event.preventDefault();

    const { email, password } = credentials;
    

    try {
      const res = await axios.post(
        `${PUBLIC_BASE_URL}${SIGN_IN_API_ROUTE}`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if(res.statusText){
        console.log(res.data.data);
        sessionStorage.setItem("usertoken", res.data.data.token);
        sessionStorage.setItem("firstname", res.data.data.firstName);
        sessionStorage.setItem("lastname", res.data.data.lastName);
        sessionStorage.setItem("email", res.data.data.email);
        sessionStorage.setItem("phone", res.data.data.phoneNumber);
        sessionStorage.setItem("userid", res.data.data.id);
        sessionStorage.setItem("isLoggedIn", "true");
        if(res.data.data.userType === 'CUSTOMER') {
          successAlert(res.data.message);
          Router.replace(`${VENDOR_PAGE_ROUTE}`)
        } else {
          errorAlert('Invalid Login')
          Router.reload();
        }
      }
    } catch (error:any) {
      errorAlert(error.response.data.message);
      setTimeout(() => {
        Router.reload()
      }, 3000)
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await axios.post(`${PUBLIC_BASE_URL}${SIGN_OUT_PUBLIC_API_ROUTE}`);
      setError(undefined);
      setUser(undefined)
      storageController.clearAll();
      sessionStorage.clear();
      localStorage.clear();
      Router.replace(`${PAGE_ROUTE_SIGN_IN}`);
    } catch (error) {
      console.error(error);
    }
  };

   // merchant Sign out
   const merchantSignOut = async () => {
    try {
      sessionStorage.clear();
      localStorage.clear();
      Router.replace(`${SIGN_IN_MERCHANT_PUBLIC_API_ROUTE}`);
    } catch (error) {
      console.error(error);
    }
  };

  // merchant
  const merchantSignUp = async (event: Event, credentials: MerchantSignUpProps) => {
    event.preventDefault();

    const { merchantName, merchantEmail, merchantAddress1, merchantAddress2, merchantStreet, merchantCity, merchantState, merchantPassword  } = credentials;
    const userType = 'VENDOR';

    let data = {
      name: merchantName,
      email: merchantEmail,
      address: merchantAddress1,
      address2: merchantAddress2,
      street: merchantStreet,
      city: merchantCity,
      state: merchantState,
      password: merchantPassword,
      userType
    }

    try {
      const res = await axios.post(`${PUBLIC_BASE_URL}${SIGN_UP_API_ROUTE}`, data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if(!res) {
        const error = 'Error from the api';
        setError(error);
        return error;
      }

      successAlert('Registration successful! A token has been sent to your email. Please use this to verify your account.');
      Router.push({
          pathname:`${VERIFY_USER_MERCHANT_PAGE_ROUTE}`, 
          query:{email: merchantEmail}
      }, undefined, { shallow:true })
    }
    catch(error:any) {      
      errorAlert(error.response.data.message);
      setTimeout(() => {
        Router.reload()
      }, 3000)
    }
  };

  // Sign in
  const merchantSignIn = async (event: Event, credentials: SignInProps) => {
    event.preventDefault();

    const { email, password } = credentials;
    

    try {
      const res = await axios.post(
        `${PUBLIC_BASE_URL}${SIGN_IN_API_ROUTE}`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if(res.statusText){
        console.log(res.data.data);
        sessionStorage.setItem("merchantToken", res.data.data.token);
        sessionStorage.setItem("businessName", res.data.data.businessName);
        sessionStorage.setItem("businessType", res.data.data.businessType);
        sessionStorage.setItem("email", res.data.data.email);
        sessionStorage.setItem("firstName", res.data.data.firstName);
        sessionStorage.setItem("lastName", res.data.data.lastName);
        sessionStorage.setItem("phoneNumber", res.data.data.phoneNumber);
        sessionStorage.setItem("profileImg", res.data.data.profileImg);
        sessionStorage.setItem("package", res.data.data.package);        
        sessionStorage.setItem("merchantIsLoggedIn", "true");

        if(res.data.data.userType === 'VENDOR') {
          successAlert(res.data.message);
          Router.push({
            pathname: OWNER_INFO_MERCHANT_PAGE_ROUTE,
            query: { name: 'Owner Information' }
          });
        } else {
          errorAlert('Invalid Login')
          Router.reload();
        }
      }
    } catch (error:any) {
      errorAlert(error.response.data.message);
      setTimeout(() => {
        Router.reload()
      }, 3000)
    }
  };

  return (
    <AuthContext.Provider value={{error, success, signIn, signUp, signOut, merchantSignUp, merchantSignIn, merchantSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
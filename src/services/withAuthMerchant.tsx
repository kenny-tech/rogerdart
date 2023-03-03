import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SIGN_IN_MERCHANT_PUBLIC_API_ROUTE } from "@src/services/routes";

const withAuthMerchant = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const isMerchantAuthenticated = sessionStorage.getItem('merchantIsLoggedIn');

    useEffect(() => {
      if (!isMerchantAuthenticated) {
        router.push(`${SIGN_IN_MERCHANT_PUBLIC_API_ROUTE}`)
      }
    }, [isMerchantAuthenticated]);

    if (isMerchantAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };

  return Wrapper;
};

export default withAuthMerchant;

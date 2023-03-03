import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PAGE_ROUTE_SIGN_IN } from "@src/services/routes";

const withAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const isAuthenticated = sessionStorage.getItem('isLoggedIn');

    useEffect(() => {
      if (!isAuthenticated) {
        router.push(`${PAGE_ROUTE_SIGN_IN}`)
      }
    }, [isAuthenticated]);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };

  return Wrapper;
};

export default withAuth;

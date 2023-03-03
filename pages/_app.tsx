import '../src/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { AuthProvider } from '@src/services/authContext';
import { ProductProvider } from '@src/services/productContext'
import Script from 'next/script';

function RogerdartApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(()=>{setShowChild(true)}, []);
  
  if(!showChild){
    return null
  }
  return (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Nigeria's No. 1 Food delivery and restaurant hub." />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=UA-237146935-1`}>
      </script>
      <script>{
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-237146935-1');`
        }
      </script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        {/* <script
          id="bootstrap-cdn"
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" 
        ></script> */}
    </Head>
    <Script
      id="bootstrap-cdn"
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
    <AuthProvider>
      <ProductProvider>
        <Component {...pageProps} />  
      </ProductProvider>  
    </AuthProvider>
  </>
  )
}

export default RogerdartApp

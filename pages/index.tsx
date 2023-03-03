import { Banner, Features, Loader, PageInfo } from '@src/component'
import { BottomLinks, Footer } from '@src/component/Footer'
import { Navigationbar } from '@src/component/Header'
import { siteStyles } from '@src/styles'
import type { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'

const Home: NextPage = () => {

  const [loading, setLoading] = React.useState(true);
  setTimeout(() => { setLoading(false)}, 2000);  

  return (
    <div className={siteStyles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{PageInfo.title}&nbsp;{'Food Delivery & Takeout From Restaurants In Your Area'}</title>
      </Head>
      {loading ? <Loader />:
          <div>
            <Navigationbar />
            <Banner />
            <Features />
            <Footer />
            <BottomLinks />
          </div>
      }
    </div>
  )
}

export default Home;

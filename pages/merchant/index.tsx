import { LOGOICON } from '@media/png';
import { PageInfo } from '@src/component';
import { BottomLinks, Footer } from '@src/component/Footer';
import { AboutContainer, FlexContainer } from '@src/component/Merchant/AboutLayout';
import { Banner, Bannertext } from '@src/component/Merchant/Banner';
import { Content, Faq } from '@src/component/Merchant/FAQ';
import { Logo, Navbar, Navbtn, Navlist } from '@src/component/Merchant/Nav';
import { InputGroup, InputIconGroup, SignupBtn, SigupContainer } from '@src/component/Merchant/SignupLayout';
import { sitemap } from '@src/component/Merchant/SiteMap';
import { CustomButton, Testimonial } from '@src/component/Merchant/Testimonial';
import { MerchantFooterBrand } from '@src/component/MerchantFooter';
import { merchantNavbarStyles, merchantPageStyles, merchantSignupStyles, siteStyles } from '@src/styles';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import ReactPlayer from 'react-player';

const Merchant: NextPage = () =>{
    return (
        <div>
            <Head>
                <title>{PageInfo.title}&nbsp;{'for Merchants | Get Started'}</title>
                <meta name="description" content="Nigeria's No. 1 Food delivery and restaurant hub." />
                <link rel="icon" href="/favicon.ico" />
                <script async defer src={`https://maps.googleapis.com/maps/api/js?key=${process.env.ROGERDART_GOOGLE_MAP_API}&libraries=places`}></script>
            </Head>
            <Navbar>
                <Logo>
                    <Image src={LOGOICON} alt={`${PageInfo.title}'s logo`} width={44} height={44}/>
                    <p>FOR MERCHANTS</p>
                </Logo>
                <Navlist>
                    {sitemap.map(links => 
                    <Link href={links.url} key={links.id}>
                        <a className={merchantNavbarStyles.mr5}>
                            {links.name}
                        </a>
                    </Link>
                    )}
                </Navlist>
                <div>
                    <Link href={"#"}>
                    <a className={merchantNavbarStyles.mr1bold}>Sign In</a>
                    </Link>
                    <Navbtn>
                        Get Started
                    </Navbtn>
                </div>
            </Navbar>
            <Banner>
                <Bannertext>
                    <h2>Locate new <span className={merchantNavbarStyles.squareText}>customers</span> with Rogerdart</h2>
                </Bannertext>
            </Banner>
            <SigupContainer>
                <h2>0% commissions for 30 days</h2>
                <p>
                    {"Let's recover faster, together. Offer delivery, pickup, and online ordering to your customers today."}
                </p>
                <input  type="text" placeholder='Business Name'/>
                <InputIconGroup>
                    <svg xmlns="http://www.w3.org/2000/svg" className={merchantSignupStyles.locationIcon} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <input type="text" placeholder='Business Address'/>
                </InputIconGroup>
                <InputGroup>
                    <input  type="text" placeholder='Email Address'/>
                    <input  type="text" placeholder='Phone Number'/>
                </InputGroup>
                <select>
                    <option style={{color:"#e4e4e4"}}>select your business type</option>
                    <option>Restaurant</option>
                    <option>Grocery</option>
                    <option>Alcohol</option>
                    <option>Beauty</option>
                </select>
                <InputGroup>
                <div></div>
                    <SignupBtn>
                        Get Started
                    </SignupBtn>
                </InputGroup>
            </SigupContainer>
            <AboutContainer>
                <h2>
                    Not just for restaurants, Rogerdart helps you win business in your <span className={merchantNavbarStyles.circleText}>neighborhood</span>
                </h2>
                <FlexContainer>
                    <div>
                        <Image src={"/uploads/cats/cosmetics.png"} alt={"Cosmetics Stores"} width={100} height={100}/>
                        <h3>Beauty Stores</h3>
                        <p>
                            Grow your sales by partnering with Rogerdart for cosmetics supply delivery and pickup.
                        </p>
                    </div>
                    <div>
                        <Image src={"/uploads/cats/restaurant.png"} alt={"Restaurant"} width={100} height={100}/>
                        <h3>Grocery Stores</h3>
                        <p>
                            Reach new customers in your area looking for groceries to stock up.
                        </p>
                    </div>
                    <div>
                        <Image src={"/uploads/cats/champagne.png"} alt={"Champagne Stores"} width={100} height={100}/>
                        <h3>Drink Stores</h3>
                        <p>
                            Deliver beer, wine, and liquor in compliance with local delivery laws and regulations.
                        </p>
                    </div>
                </FlexContainer>
            </AboutContainer>
            <Testimonial>
                <FlexContainer>
                    <div>
                        <ReactPlayer url={"https://youtu.be/CIG9FbHAbEE"}/>
                    </div>
                    <div>
                        <h3>
                        {`"Rogerdart allowed a lot of new customers to find us that otherwise would reached so far."`}
                        </h3>
                        <p>
                            Chef Naomi, Founder & CEO DTM Confectionaries in Lagos, NG
                        </p>
                        <CustomButton>
                            Success stories
                        </CustomButton>
                    </div>
                </FlexContainer>
            </Testimonial>
            <Faq>
                <h2>
                    Frequently asked questions
                </h2>
                <Content>
                    <h3 style={{display:"flex", alignItems:"center"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{width:"25px", height:"25px"}} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>&nbsp;
                        <span>What is a flat rate?</span>
                    </h3>
                    <p>
                        On-Demand Delivery connects your business with drivers to complete deliveries placed on your ordering platform. That means when customers order from your website, app, or other channels with On-Demand Delivery, we charge a flat per-order fee for you to use Our Agents to deliver orders.
                    </p>
                    <h3 style={{display:"flex", alignItems:"center"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{width:"25px", height:"25px"}} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>&nbsp;
                        <span>What is commission?</span>
                    </h3>
                    <p>
                        {`When you list your business on Rogerdart, you pay a percentage of the order subtotal  — known as a "commission rate" — for each order processed through our platform. `}
                    </p>
                    <h3 style={{display:"flex", alignItems:"center"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{width:"25px", height:"25px"}} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>&nbsp;
                        Can I stop orders if it gets too busy?
                    </h3>
                    <p>
                        Yes, Rogerdart partners can pause orders at any time. You can also indicate that your store is busy, letting customers know to expect longer prep times.
                    </p>
                    <h3 style={{display:"flex", alignItems:"center"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{width:"25px", height:"25px"}} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>&nbsp;What is Rogerdart delivery radius?
                    </h3>
                    <p>
                        There is no standard delivery radius for merchants on Rogerdart. The delivery radius is set by an algorithm based on how many Delivery Agents are in your area and consumer demand. Plus and Premium members do get access to a larger delivery area than Basic, potentially reaching more customers. Self-Delivery merchants with their own delivery teams can set their own delivery area.
                    </p>
                </Content>
            </Faq>
            <MerchantFooterBrand>
                <Logo>
                    {/* <Image src={LOGOICON} alt={`${PageInfo.title}'s logo`} width={44} height={44}/>
                    <p>FOR MERCHANTS</p> */}
                </Logo>
                <Link href={'#'}>
                    <a style={{display:"flex", alignItems:"center", fontWeight:"bold"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{width:"25px", height:"25px"}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span>
                        Become a partner
                    </span>
                    </a>
                </Link>
            </MerchantFooterBrand>
            <footer className={siteStyles.footer}>
            <Footer />
            <BottomLinks />
          </footer>
        </div>
    )
}

export default Merchant;
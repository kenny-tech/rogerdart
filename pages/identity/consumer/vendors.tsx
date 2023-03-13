import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import { categoryStyles, vendorlistStyles } from "@src/styles";
import { PUBLIC_BASE_URL, VENDOR_MENU_PAGE_ROUTE, PAGE_ROUTE_SIGN_IN, VENDORS_PUBLIC_API_ROUTE, BEST_SELLING_VENDORS_PUBLIC_API_ROUTE, POPULAR_VENDORS_PUBLIC_API_ROUTE } from "@src/services/routes";
import { Navigation, PageInfo, Spinner } from "@src/component";
import { CategoryList, VendorList } from "@src/component/Dashboard/User/Vendors";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Icon from "@heroicons/react/outline";
import withAuth from "@src/services/withAuth";
import { category_list } from "@src/constants";
import RatingModal from "@src/component/Modal/rating";

const Vendors: NextPage = () => {

    const [vendors, setVendors] = useState<any>([]);
    const [bestSellingVendors, setBestSellingVendors] = useState<any>([]);
    const [popularVendors, setPopularVendors] = useState<any>([]);
    
    const [star1, setStar1] = useState<boolean>(false);
    const [star2, setStar2] = useState<boolean>(false);
    const [star3, setStar3] = useState<boolean>(false);
    const [star4, setStar4] = useState<boolean>(false);
    const [star5, setStar5] = useState<boolean>(false);
    const [rating, setRating] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [vendorId, setVendorId] = useState<string>('');
    const [vendorName, setVendorName] = useState<string>('');
    const [merchant, setMerchant] = useState<string>('');

    const Router = useRouter();
    const user_token = sessionStorage.getItem("usertoken");
    const user_id = sessionStorage.getItem("userid");

    useEffect(() => {        
        if(!user_token) {
            Router.push(`${PAGE_ROUTE_SIGN_IN}`)
        }
        getVendors();
        getBestSellingVendors();
        getPopularVendors();
    }, []);    

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_token}`
    }

    const getVendors = async () => {
        try {
            setLoading(true);
            await axios.get(`${PUBLIC_BASE_URL}${VENDORS_PUBLIC_API_ROUTE}`, {
                headers: headers
            })
            .then((response) => {
                console.log('vendors : ', response.data.data);
                setVendors(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })  
        } catch (error) {
            console.log(error);
            setLoading(false);
        } 
    }

    const getBestSellingVendors = async () => {
        try {
            setLoading(true);
            await axios.get(`${PUBLIC_BASE_URL}${BEST_SELLING_VENDORS_PUBLIC_API_ROUTE}`, {
                headers: headers
            })
            .then((response) => {
                console.log('Best seller vendors : ', response.data.data);
                setBestSellingVendors(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })  
        } catch (error) {
            console.log(error);
            setLoading(false);
        } 
    }

    const getPopularVendors = async () => {
        try {
            setLoading(true);
            await axios.get(`${PUBLIC_BASE_URL}${POPULAR_VENDORS_PUBLIC_API_ROUTE}`, {
                headers: headers
            })
            .then((response) => {
                console.log('Popular vendors : ', response.data.data);
                setPopularVendors(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })  
        } catch (error) {
            console.log(error);
            setLoading(false);
        } 
    }

    const handleLoadVendorMenus = async (vendor_id: any, business_name: string, vendor_banner: string) => {
        try {
            // console.log('vendor id: ', vendor_id);
            sessionStorage.setItem("vendor_id", vendor_id);
            sessionStorage.setItem("vendor_name", business_name);
            sessionStorage.setItem("vendor_banner", vendor_banner);

            Router.push({
                pathname: `${VENDOR_MENU_PAGE_ROUTE}`,
                // query: { vendor_id, vendor_name, vendor_banner },
            }, `${VENDOR_MENU_PAGE_ROUTE}`);
        } catch (error) {
            console.log(error);
        } 
    }

    const ratingChanged = (newRating:any) => {
        console.log(newRating);
    }

    const handleRatingClicked = (star:number, vendorId:any, businessName:string) => {
        if(star === 1) {
            setStar1(true);
            setStar2(false);
            setStar3(false);
            setStar4(false);
            setStar5(false);
        } else if(star === 2) {
            setStar1(true);
            setStar2(true);
            setStar3(false);
            setStar4(false);
            setStar5(false);
        } else if(star === 3) {
            setStar1(true);
            setStar2(true);
            setStar3(true);
            setStar4(false);
            setStar5(false);
        } else if(star === 4) {
            setStar1(true);
            setStar2(true);
            setStar3(true);
            setStar4(true);
            setStar5(false);
        } else if(star === 5) {
            setStar1(true);
            setStar2(true);
            setStar3(true);
            setStar4(true);
            setStar5(true);
        } else {}
        setRating(star);
        setVendorId(vendorId);
        setVendorName(businessName);
        setMerchant(vendorId);
        setIsOpen(true);
    }

    return (
        <div>
            <Head>
                <title>{PageInfo.title} | {"Nigeria's No. 1 Food delivery and restaurant hub."}</title>
                <meta name="description" content="Nigeria's No. 1 Food delivery and restaurant hub." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Navigation />
                {/* <div className={vendorlistStyles.shopBanner} style={{backgroundImage:`url(/uploads/banner-1650623616133.jpg)`}}></div> */}
                <div className={vendorlistStyles.bannerContainer}>
                    <div className={vendorlistStyles.banner}></div>
                </div>
                <div className={vendorlistStyles.searchInputDiv}>
                    <Icon.SearchIcon className={vendorlistStyles.searchIcon}/>
                    <input placeholder='Type something to search' type={'text'} name='address' className={vendorlistStyles.searchInput} />
                </div>
                <div style={{marginLeft: '30px'}}>
                    {loading && <Spinner />}
                </div>
                <CategoryList>
                    {category_list && category_list.slice(0, 10).map((category:{ id: React.Key | number; 
                        name: string;
                        image: string;
                        }) => <div className={categoryStyles.catList} key={category.id}>
                        <div className={categoryStyles.categoryImage}>
                            <Image src={`/uploads/cats/${category.image}`} alt={`${category.name}'s icon`} width={40} height={40}/>
                        </div>
                        <p>{category.name}</p>
                    </div>)}
                </CategoryList>
                <p className={vendorlistStyles.title} >Best Seller</p>
                <VendorList>
                   {loading && <Spinner />}
                   {bestSellingVendors && bestSellingVendors.map((vendor: {vendorId : React.Key | string, profileImg: string | any, businessName: string}) => <div key={vendor.vendorId}>
                        {/* <Link href={{ pathname:`${PUBLIC_BASE_URL}${VENDOR_MENU_ROUTE}/${encryptId(vendor.id)}`, */}
                        {/* query:{banner:vendor.banner, name:vendor.vendor_name}}} passHref> */}
                            <a target={'_blank'}>
                                <div onClick={() => handleLoadVendorMenus(vendor.vendorId, vendor.businessName, vendor.profileImg)}  className={vendorlistStyles.gridItem} style={{backgroundImage:`url(${vendor.profileImg})`}}>
                                </div>
                            </a>
                        {/* </Link> */}
                        <div className={vendorlistStyles.vendorDetails}>
                            <div style={{marginBottom: '10px'}}></div>
                            <span style={{marginTop: '100px'}} onClick={() => handleLoadVendorMenus(vendor.vendorId, vendor.businessName, vendor.profileImg)}>{vendor.businessName}</span>
                            <div>
                                <div>
                                    <Image src={star1 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(1, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}} />
                                    <Image src={star2 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(2, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}}/>
                                    <Image src={star3 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(3, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}}/>
                                    <Image src={star4 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(4, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}}/>
                                    <Image src={star5 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(5, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}}/>
                                </div>
                                <p style={{fontSize: '12px'}}>
                                    <span><Icon.ClockIcon className={vendorlistStyles.clockIcon}/></span><span style={{position: 'relative', bottom: '-6px'}}>50 - 60 Min</span>
                                </p>
                            </div>
                            
                        </div>
                    </div>)}
                </VendorList>
               
                <p className={vendorlistStyles.title} >Featured Vendors</p>
                <VendorList>
                   {loading && <Spinner />}
                   {vendors && vendors.map((vendor: {vendorId : React.Key | string, profileImg: string | any, businessName: string}) => <div key={vendor.vendorId}>
                        {/* <Link href={{ pathname:`${PUBLIC_BASE_URL}${VENDOR_MENU_ROUTE}/${encryptId(vendor.id)}`, */}
                        {/* query:{banner:vendor.banner, name:vendor.vendor_name}}} passHref> */}
                            <a target={'_blank'}>
                                <div onClick={() => handleLoadVendorMenus(vendor.vendorId, vendor.businessName, vendor.profileImg)} className={vendorlistStyles.gridItem} style={{backgroundImage:`url(${vendor.profileImg})`}}>
                                </div>
                            </a>
                        {/* </Link> */}
                        <div className={vendorlistStyles.vendorDetails}>
                            <div style={{marginBottom: '10px'}}></div>
                            <span style={{marginTop: '100px'}} onClick={() => handleLoadVendorMenus(vendor.vendorId, vendor.businessName, vendor.profileImg)}>{vendor.businessName}</span>
                            <div>
                                <div>
                                    <Image src={star1 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(1, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}} />
                                    <Image src={star2 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(2, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}}/>
                                    <Image src={star3 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(3, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}}/>
                                    <Image src={star4 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(4, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}}/>
                                    <Image src={star5 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(5, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}}/>
                                </div>
                                <p style={{fontSize: '12px'}}>
                                    <span><Icon.ClockIcon className={vendorlistStyles.clockIcon}/></span><span style={{position: 'relative', bottom: '-6px'}}>50 - 60 Min</span>
                                </p>
                            </div>
                            
                        </div>
                    </div>)}
                </VendorList>
               
                <p className={vendorlistStyles.title}>Special Offers</p>
                <div className={vendorlistStyles.specialOffers}>
                    <div className={vendorlistStyles.offer}></div>
                    <div className={vendorlistStyles.offer}></div>
                </div>

                <p className={vendorlistStyles.title}>Popular Vendors</p>
                <VendorList>
                   {loading && <Spinner />}
                   {popularVendors && popularVendors.map((vendor: {vendorId : React.Key | string, profileImg: string | any, businessName: string}) => <div key={vendor.vendorId}>
                        {/* <Link href={{ pathname:`${PUBLIC_BASE_URL}${VENDOR_MENU_ROUTE}/${encryptId(vendor.id)}`, */}
                        {/* query:{banner:vendor.banner, name:vendor.vendor_name}}} passHref> */}
                            <a target={'_blank'}>
                                <div onClick={() => handleLoadVendorMenus(vendor.vendorId, vendor.businessName, vendor.profileImg)} className={vendorlistStyles.gridItem} style={{backgroundImage:`url(${vendor.profileImg})`}}>
                                </div>
                            </a>
                        {/* </Link> */}
                        <div className={vendorlistStyles.vendorDetails}>
                            <div style={{marginBottom: '10px'}}></div>
                            <span style={{marginTop: '100px'}} onClick={() => handleLoadVendorMenus(vendor.vendorId, vendor.businessName, vendor.profileImg)}>{vendor.businessName}</span>
                            <div>
                                <div>
                                    <Image src={star1 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(1, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}} />
                                    <Image src={star2 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(2, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}}/>
                                    <Image src={star3 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(3, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}}/>
                                    <Image src={star4 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(4, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}}/>
                                    <Image src={star5 === true  && merchant === vendor.vendorId ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(5, vendor.vendorId, vendor.businessName)} style={{cursor: 'pointer'}}/>
                                </div>
                                <p style={{fontSize: '12px'}}>
                                    <span><Icon.ClockIcon className={vendorlistStyles.clockIcon}/></span><span style={{position: 'relative', bottom: '-6px'}}>50 - 60 Min</span>
                                </p>
                            </div>
                        </div>
                    </div>)}
                </VendorList>
                {isOpen && <RatingModal setIsOpen={setIsOpen} vendorId={vendorId} vendorName={vendorName} rating={rating} />}      
            </div>
        </div>
    )
}

export default withAuth(Vendors);

import { NextPage } from "next";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { PUBLIC_BASE_URL, VENDOR_MENU_ROUTE, PLACE_ORDER_ROUTE, CHECK_COUPON_ROUTE } from "@src/services/routes";
import Head from "next/head";
import Image from "next/image";
import { Navigation, PageInfo, Spinner } from "@src/component";
import { productStyles } from "@src/styles";
import axios from "axios";
import Link from "next/link";
import * as Icon from "@heroicons/react/outline";
import { Currency } from "@src/hooks/currency";
import ProductContext from '@src/services/productContext';
import { errorAlert } from "@src/services/alert";
import AddToCartModal from "@src/component/Modal/addToCart";
import withAuth from "@src/services/withAuth";
import { states, cities } from "@src/constants";
import CheckoutModal from "@src/component/Modal/checkout";

const VendorMenus: NextPage = () => {

    const Router = useRouter();
   
    const usertoken = sessionStorage.getItem("usertoken");
    const [categories, setCategories] = useState<any>([]);
    const [vendorMenus, setVendorMenus] = useState<any>([]);
    const [tip, setTip] = useState<number>(0);
    const [tax, setTax] = useState<number>(100);
    const [deliverFee, setDeliveryFee] = useState<number>(1000);
    const [selectedTipBg200, setSelectedTipBg200] = useState<string>('');
    const [selectedTipBg500, setSelectedTipBg500] = useState<string>('');
    const [selectedTipBgOther, setSelectedTipBgOther] = useState<string>('');
    const [selectedProduct, setSelectedProduct] = useState<string>("");
    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const [selectedProductPrice, setSelectedProductPrice] = useState<any>("");
    const [voucher, setVoucher] = useState<string>("");
    const [vendorName, setVendorName] = useState<any>(sessionStorage.getItem("vendor_name"));
    const [deliveryTime, setDeliveryTime] = useState<string>('');
    const [itemImage, setItemImage] = useState<string>('');
    const [vat, setVat] = useState<number>(7.5);
    const [discount, setDiscount] = useState(0);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [showCartForm, setShowCartForm] = useState(true);
    const [orderRef, setOrderRef] = useState<any>(null);
    const [coupon, setCoupon] = useState<string>('');

    const [star1, setStar1] = useState<boolean>(false);
    const [star2, setStar2] = useState<boolean>(false);
    const [star3, setStar3] = useState<boolean>(false);
    const [star4, setStar4] = useState<boolean>(false);
    const [star5, setStar5] = useState<boolean>(false);
    const [rating, setRating] = useState<number>();
    const [variants, setVariants] = useState();
    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [landMark, setLandMark] = useState<string>('');
    const [total, setTotal] = useState<any>(null);
    const [stateCities, setStateCities] = useState<any>([]);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [landMarkError, setLandMarkError] = useState('');

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [orderID, setOrderID] = useState<any>(null);
    const [timer, setTimer] = useState<any>(null)

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const { addToCart, cart, calculateSubTotal, removeFromCart, decreaseQuantity, increaseQuantity } = useContext(ProductContext);
    const [subtotal, setSubtotal] = useState<any>(calculateSubTotal());

    const user_id = sessionStorage.getItem("userid");
    const vendor_id = sessionStorage.getItem("vendor_id");
    const vendor_banner = sessionStorage.getItem("vendor_banner");

    let bg200, bg500, bgOther = '';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usertoken}`
    }

    let order_id;

    useEffect(() => {
        getVendorMenus();
        calculateTotal();
    }, []);    

    const getVendorMenus = async () => {
        try {
            setLoading(true);
            await axios.get(`${PUBLIC_BASE_URL}${VENDOR_MENU_ROUTE}/${vendor_id}`, {
                headers: headers
            })
            .then((response) => {
                // console.log('menus: ',response.data.data);
                setVendorMenus(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('error: ',error);
                setLoading(false);
            })  
        } catch (error) {
            console.log('The error: ', error);
            setLoading(false);
        } 
    }

    const handleTipSelected = (selectedTip: number) => {

        if (selectedTip === 200) {
            bg200 = '#FAE1E1';
            bg500 = '';
            bgOther = '';
        } else {
            bg200 = '';
            bg500 = '#FAE1E1';
            bgOther = '';
        }
        setSelectedTipBg200(bg200);
        setSelectedTipBg500(bg500);
        setSelectedTipBgOther(bgOther);
        setTip(selectedTip);
    }

    const handleOtherTip = (tip: any) => {
        bg200 = '';
        bg500 = '';
        bgOther = '#FAE1E1';
        if(tip === '') {
            setTip(0);
        } else {
            setTip(parseInt(tip));
        }
        setSelectedTipBg200(bg200);
        setSelectedTipBg500(bg500);
        setSelectedTipBgOther(bgOther);
    }

    const removeItem = (product_id: number) => {
        removeFromCart(product_id);
    }

    const handleDecreaseQuantity = (product_id:number) => {
        decreaseQuantity(product_id);
    }

    const handleIncreaseQuantity = (product_id:number) => {
        increaseQuantity(product_id);
    }

    const handleAddToCartModal = (product_id:any, product: string, price: number, delivery_time: string, item_image: string, productVariants: any) => {
        setIsOpen(true);
        setSelectedProductId(product_id);
        setSelectedProduct(product);
        setSelectedProductPrice(price);
        setDeliveryTime(delivery_time);
        setItemImage(item_image)
        setShowCheckoutForm(false);
        setShowCartForm(true);
        setVariants(productVariants);
    }

    // const handleCheckoutModal = () => {
    //     setIsCheckoutOpen(true);
    // }

    const calculateTotal = () => {
        let sumTotal:number = calculateSubTotal() + subtotal + tax + deliverFee + tip;
        // setTotal(sumTotal);
    }
    
    let grandTotal:number = calculateSubTotal() + subtotal + tax + deliverFee + tip;

    const config:any = {
        email: sessionStorage.getItem("email"),
        amount: grandTotal * 100,
        metadata: {
            orderId: "order_id"
        },
        publicKey: process.env.PAYSTACK_P_KEY,
    };

    const handleRatingClicked = (star: number) => {
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
    }

    const handleCheckoutForm = () => {
        setShowCheckoutForm(true);
        setShowCartForm(false);
    }

    const handleCloseCheckout = () => {
        setShowCheckoutForm(false);
        setShowCartForm(true);
    }

    const handleCheckout = async (event:any) => {
       if(firstName.length === 0) {
        setFirstNameError('First Name is required')
       } else if(lastName.length === 0) {
        setLastNameError('Last Name is required')
       } else if(address.length === 0) {
        setAddressError('Address is required')
       } else if(state.length === 0) {
        setStateError('State is required')
       } else if(city.length === 0) {
        setCityError('City is required')
       } else if(phone.length === 0) {
        setPhoneError('Phone Number is required')
       } else if(landMark.length === 0) {
        setLandMarkError('Nearest Landmark is required')
       }else {

            cart.forEach((item:any) => { delete item.delivery_time; delete item.price; delete item.product_id; delete item.product_name;delete item.variant;  });

            let delivery = {
                firstName,
                lastName,
                address,
                city,
                state,
                phone,
                landMark
            }

            const order = {
                orderItems: cart,
                delivery,
                coupon,
                riderTip: tip
            }

            try {
                await axios.post(`${PUBLIC_BASE_URL}${PLACE_ORDER_ROUTE}`, 
                order, 
                {
                    headers: headers
                })
                .then((response) => {
        
                    order_id = response.data.data.order._id;
                    setOrderID(response.data.data.order._id);
                    setOrderRef(response.data.data.order.reference);
                    setTotal(response.data.data.order.totalPrice);

                    setIsCheckoutOpen(true);
                })
                .catch((error) => {
                    console.log('error place order response : ',error);
                    errorAlert(error.response.data.message);
                })  
            } catch (error) {
                errorAlert('Something went wrong! '+ error);
            } 
       }
    }

    const handleStateChange = (e:any) =>{
        setState(e.target.value);
        const result = cities.filter(city => city.state === e.target.value);
        setStateCities(result);
    }

    const handleVoucherChange = async (e:any) => {
        let coupon = e.target.value;

        if(coupon.length!== 0) {
            const newTimer = setTimeout(() => {
                checkVoucher(coupon);
            }, 1000);
            setTimer(newTimer);
        } else {
            errorAlert('Enter a coupon code.'); 
        }
    } 

    const checkVoucher = async (coupon:string) => {
        try {
            setCoupon(coupon);
            await axios.get(`${PUBLIC_BASE_URL}${CHECK_COUPON_ROUTE}/${coupon}`, 
            {
                headers: headers
            })
            .then((response) => {
                if(response.statusText === 'OK') {
                    // console.log('Discount: ', response.data.data.value);
                    setDiscount(response.data.data.value);
                }
                console.log('response: ',response);
            })
            .catch((error) => {
                console.log('error: ',error);
                errorAlert(error.response.data.message);
            })  
        } catch (error) {
            errorAlert('Something went wrong! '+ error);
        } 
    }

    return (
        <div>
        <Head>
            <title>{PageInfo.title} | {"Nigeria's No. 1 Food delivery and restaurant hub."}</title>
            <meta name="description" content="Nigeria's No. 1 Food delivery and restaurant hub." />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navigation />
        <main className={productStyles.displayPage}>
            <div style={{width:'75%'}}>
                <div className={productStyles.shopBanner} style={{backgroundImage:`url(${vendor_banner})`}}>
                        <div className={productStyles.vendorDetails}>
                            <div>
                                    <div className={productStyles.vendorText}>
                                        <div style={{position: 'relative', bottom: '5px'}}>
                                            <Image src={star1 === true ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(1)} style={{cursor: 'pointer'}}/>
                                            <Image src={star2 === true ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(2)} style={{cursor: 'pointer'}}/>
                                            <Image src={star3 === true ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(3)} style={{cursor: 'pointer'}}/>
                                            <Image src={star4 === true ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(4)} style={{cursor: 'pointer'}}/>
                                            <Image src={star5 === true ? '/uploads/star.svg' : '/uploads/star-grey.svg'} width={20} height={20} onClick={() => handleRatingClicked(5)} style={{cursor: 'pointer'}}/>
                                        </div>
                                        <div>
                                            <p style={{fontSize: '12px'}}>
                                                <span><Icon.ClockIcon className={productStyles.clockIcon}/></span><span style={{position: 'relative', bottom: '3px'}}>50 - 60 Min</span>
                                            </p>
                                        </div>
                                </div>
                                <h2 style={{position: 'relative', bottom: '20px', color:'#fff'}}>{vendorName.toUpperCase()}</h2>
                                <p style={{position: 'relative', bottom: '25px', color:'#fff'}}>Min Delivery Fee: NGN500</p>
                            </div>
                        </div>
                </div>
                <div className={productStyles.breadcrumb}>
                    <div></div>
                </div>

                <div className={productStyles.searchInputDiv}>
                    <Icon.SearchIcon className={productStyles.searchIcon}/>
                    <input placeholder='Type something to search' type={'text'} name='address' className={productStyles.searchInput} />
                </div>
                <div className={productStyles.sortBy}>
                    <p className={productStyles.sortByText}>Sort By:</p>
                    <div className={productStyles.sortOption}>Main Meals</div>
                    <div className={productStyles.sortOption}>Soups</div>
                    <div className={productStyles.sortOption}>Fish and Meat</div>
                    <div className={productStyles.sortOption}>Drinks</div>
                </div>
                {!vendorMenus && <p style={{color:"crimson"}}>No menu found</p>}
                <h5 style={{marginLeft: '30px', marginTop: '10px'}}>All</h5>
                <div className={productStyles.productList}>
                    {loading && <Spinner />}
                    {vendorMenus && vendorMenus.map((product:{
                        [x: string]: any;id: React.Key | null | undefined;
                        name:string;
                        price:number;
                        productImages: string;
                    })=><div className={productStyles.products} key={product.id}>
                        <Link href={'#'} passHref>
                            <a> 
                                {isOpen && <AddToCartModal setIsOpen={setIsOpen} productId={selectedProductId} productName={selectedProduct} price={selectedProductPrice} deliveryTime={deliveryTime} itemImage={itemImage} productVariants={product.variants}  />}

                                <div className={productStyles.menuDiv} onClick={() => handleAddToCartModal(product.productId, product.name, product.price, product.delivery_time, product.item_image, product.variants)}>
                                    <div className={productStyles.menuImage} style={{backgroundImage:`url(${product.productImages[0]})`}}></div>
                                    <div>
                                        <p className={productStyles.productName}>{product.name}</p>
                                    </div>
                                    <div>
                                        <p className={productStyles.productPrice}>{Currency(product.price)}</p>
                                    </div>
                                    <div>
                                        <p style={{fontSize: 14, color:'#E43225', fontWeight: 700}}>Add to cart</p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </div>
                    )}
                    
                    {!vendorMenus && 
                    <div style={{width:'100%', height:'150px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Spinner />
                        {!vendorMenus && <p style={{color:"crimson"}}>No menu found</p>}
                    </div>}
                </div>
            </div>
            {
                showCartForm ? ( <>
                    {cart.length !== 0 ? (<div className={productStyles.cartContainer}>
                        <div>
                            <p><strong>Shopping Cart <span style={{position: 'relative', bottom: '12px'}}><Icon.ShoppingCartIcon color='#000' className={productStyles.iconSize}/></span></strong></p>
                        </div>
                        <div />
                        <p style={{fontSize: 10, color: '#CCCACA', textAlign: 'left', marginBottom:'-15px'}}>ORDER FROM</p>
                        <p>
                            <strong>{sessionStorage.getItem("vendor_name")}</strong>
                        </p>
                        <br/>
                        <p style={{fontSize: 10, color: '#CCCACA', textAlign: 'left', marginBottom:'-15px', position: 'relative', top: '-12px'}}>ESTIMATED DELIVERY TIME</p>
                        <p>
                            <strong>{'50 - 60 mins'}</strong>
                        </p>
                        <hr/>
                        {cart && cart.map((product:{
                            [x: string]: any;
                            product_id: number;
                            product_name: string;
                            price:number;
                            delivery_time: number;
                            })=><div key={product.product_id}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px'}}>
                                    <p style={{fontSize: '16px', fontWeight: 400}}>{product.product_name} { product.variant!=='' ? product.variant : null }</p>
                                    <p style={{fontSize: '16px', fontWeight: 400}}><strong>N{product.price}</strong></p>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div>
                                        <span className={productStyles.spanRemoveCircle} onClick={() => handleDecreaseQuantity(product.product_id)}><span style={{position: 'relative', bottom: '3px'}}>-</span></span><span style={{marginRight: '18px', position: 'relative', bottom: '5px'}}>{product.quantity}</span><span className={productStyles.spanRemoveCircle} onClick={() => handleIncreaseQuantity(product.product_id)}><span style={{position: 'relative', bottom: '3px'}}>+</span></span>
                                    </div>
                                    <div className={productStyles.closeCircle} onClick={() => removeItem(product.product_id)}>
                                        <span className={productStyles.closeIcon}>x</span>
                                    </div>
                                </div>
                                <hr />

                            </div>)}
               
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <p className={productStyles.shippingInfo}>
                                <span>Want to tip delivery guy?</span>
                                <div className={productStyles.tipContainer}>
    
                                </div>
                            </p>
                            <p style={{paddingTop: '10px'}}>
                                NGN {tip}
                            </p>
                        </div>
                        <p style={{paddingTop: '5px', marginLeft: '200px', fontSize: 12}}>Other</p>
                        <div style={{display:'flex', flexDirection: 'row', marginTop: '10px'}}>
                            <div className={productStyles.tip1} style={{backgroundColor: selectedTipBg200}} onClick={() => handleTipSelected(200)}>
                                <span>NGN 200</span>
                            </div>
                            <div className={productStyles.tip2} style={{backgroundColor: selectedTipBg500}} onClick={() => handleTipSelected(500)}>
                                <span>NGN 500</span>
                            </div>
                            <div className={productStyles.tip3} style={{backgroundColor: selectedTipBgOther}}>
                                <span>NGN</span><span><input type='text' name='other_tip' onChange={(e) => handleOtherTip(e.target.value)} style={{width: '50px', border: 'none'}}/></span>
                            </div>
                        </div>
                        <hr style={{color: '#EBECF3', marginTop: '30px', marginBottom: '10px'}}/>
                        <div style={{width: '350px', height: '300px', backgroundColor: '#E43225', color: '#fff', padding: '10px'}}>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>
                                    Discount
                                </p>
                                <p>
                                    <input placeholder='Enter voucher' type={'text'} name='voucher' onChange={handleVoucherChange} className={productStyles.deliveryDetailsInput} />
                                </p>
                            </div>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>
                                    Subtotal
                                </p>
                                <p>
                                    {`NGN ${calculateSubTotal()}`}
                                </p>
                            </div>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>
                                    Taxes and Fees
                                </p>
                                <p>
                                    NGN {((vat/100) * grandTotal).toLocaleString()}
                                </p>
                            </div>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>
                                    Delivery Fee
                                </p>
                                <p>
                                    NGN {deliverFee} 
                                </p>
                            </div>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>
                                    Total
                                </p>
                                <p style={{paddingTop: '10px'}}>
                                    <strong> NGN {grandTotal - discount} </strong>
                                </p>
                            </div>
                            <div>
                                <button onClick={() => handleCheckoutForm()}>Place Order </button>
                            </div>
                        </div>
                        
                    </div>) : <div className={productStyles.cartContainer}>
                    <div style={{marginLeft:'30px', marginTop: '20px'}}>
                    <div>
                        <p><strong>Shopping Cart <span style={{position: 'relative', bottom: '12px'}}><Icon.ShoppingCartIcon color='#000' className={productStyles.iconSize}/></span></strong></p>
                    </div>
                            <Image src="/uploads/emptycart.jpg" width={250} height={330} />
                        </div>
                        <p style={{textAlign: 'center', fontSize: '22px'}}>Your cart is empty</p>
                        <br/><br/>
    
                        <div style={{width: '350px', height: '300px', backgroundColor: '#E43225', color: '#fff', padding: '10px'}}>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>
                                    Discount
                                </p>
                                <p>
                                    <input placeholder='Enter voucher' type={'text'} name='voucher' className={productStyles.deliveryDetailsInput} />
                                </p>
                            </div>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>
                                    Subtotal
                                </p>
                                <p>
                                    NGN {'0.00'}
                                </p>
                            </div>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>
                                    Taxes and Fees
                                </p>
                                <p>
                                    NGN {'0.00'} 
                                </p>
                            </div>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>
                                    Delivery Fee
                                </p>
                                <p>
                                    NGN {'0.00'} 
                                </p>
                            </div>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p>
                                    Total
                                </p>
                                <p style={{paddingTop: '10px'}}>
                                    <strong> NGN {'0.00'} </strong>
                                </p>
                            </div>
                            <div>
                                <button disabled={true}>Place Order</button>
                            </div>
                        </div>
    
                    </div>
                    }
                </> ) : (<div className={productStyles.cartContainer}>
                    <br/>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <h5>Checkout options</h5>
                        <div style={{width: '25px', height: '25px', borderRadius: '50%'}} className="shadow-sm rounded-full bg-white rounded">
                            <p style={{position: 'relative', bottom: '17px', left: '8px', cursor: 'pointer'}} onClick={() => handleCloseCheckout()}>X</p>
                        </div>
                    </div>
                    <hr style={{width:'100%', height:'2px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                    <div className={productStyles.orderDetailsBox}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <span>
                                Discount
                            </span>
                            <span>
                                NGN {discount.toLocaleString()}
                            </span>
                        </div>
                        <hr style={{width:'100%', height:'2px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <span>
                                Subtotal
                            </span>
                            <span>
                                {`NGN ${(calculateSubTotal())}`}
                            </span>
                        </div>
                        <hr style={{width:'100%', height:'2px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <span>
                                Tip
                            </span>
                            <span>
                                NGN {tip.toLocaleString()}
                            </span>
                        </div>
                        <hr style={{width:'100%', height:'2px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <span>
                                VAT
                            </span>
                            <span>
                                NGN {((vat/100) * grandTotal).toLocaleString()}
                            </span>
                        </div>
                        <hr style={{width:'100%', height:'2px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <span>
                                Total
                            </span>
                            <span style={{color: '#E43225' }}>
                                NGN {grandTotal.toLocaleString()}
                            </span>
                        </div>
                        <br/>
                    </div>  
                    <br/>
                    <div className={productStyles.checkoutBox}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <div>
                                <span>Firstname</span>
                                <input type={'text'} name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} className={productStyles.input} />
                                {firstName.length === 0 && <span className={productStyles.error}>{firstNameError}</span>}
                            </div>
                            <div>
                            <span>Lastname</span>
                                <input type={'text'} name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} className={productStyles.input} />
                                {lastName.length === 0 && <span className={productStyles.error}>{lastNameError}</span>}
                            </div>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                            <div>
                                <p>Address</p>
                                <textarea className={productStyles.textarea} name='address' value={address} onChange={(e) => setAddress(e.target.value)}> </textarea>
                                {address.length === 0 && <span className={productStyles.error}>{addressError}</span>}
                            </div> 
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <div>
                                <p>State</p>
                                <select className={productStyles.select} name='state' value={state} onChange={(e) => handleStateChange(e)}>
                                <option value={''}>Select State</option>
                                {states && states.map((state:any)=><option value={state.name} key={state.id}>{state.name}</option>)}
                                </select>
                                {state.length === 0 && <span className={productStyles.error}>{stateError}</span>}
                            </div>
                            <div>
                                <p>City</p>
                                <select className={productStyles.select} name='city' value={city} onChange={(e) => setCity(e.target.value)}>
                                <option value={''}>Select City</option>
                                {stateCities && stateCities.map((city:any)=><option value={city.name} key={city.id}>{city.name}</option>)}
                                </select>
                                {city.length === 0 && <span className={productStyles.error}>{cityError}</span>}
                            </div>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <div>
                                <p>Phone</p>
                                <input type={'text'} name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} className={productStyles.input2} />
                                {phone.length === 0 && <span className={productStyles.error}>{phoneError}</span>}
                            </div>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <div>
                                <p>Nearest Landmark</p>
                                <input type={'text'} name='landMark' value={landMark} onChange={(e) => setLandMark(e.target.value)} className={productStyles.input2} />
                                {landMark.length === 0 && <span className={productStyles.error}>{landMarkError}</span>}
                            </div>
                        </div>
                    </div>  
                    <br />
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width: '150px', height: '40px', borderRadius: 20, backgroundColor: '#fff', border: 'solid', borderColor: '#E0E0E0', cursor: 'pointer'}} onClick={() => handleCloseCheckout()}>
                            <p style={{color: '#AC2E0E', fontSize: '16px', position: 'relative', bottom: '10px', cursor: 'pointer'}} >Cancel</p>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width: '150px', height: '40px', borderRadius: 20, backgroundColor: '#eb332a', cursor: 'pointer'}} onClick={(event) => handleCheckout(event)}>
                            <p style={{color: '#fff', fontSize: '16px',  position: 'relative', bottom: '10px'}}>Checkout</p>
                        </div>

                        {isCheckoutOpen && <CheckoutModal setIsCheckoutOpen={setIsCheckoutOpen} firstName={firstName} lastName={lastName} address={address} city={city} state={state} phone={phone} landMark={landMark} grandTotal={total} orderId={orderID} orderReference={orderRef} />}      
                    </div>
                </div>)
            }
           
        </main>
    </div>
    )
}

export default withAuth(VendorMenus);
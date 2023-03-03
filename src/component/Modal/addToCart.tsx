import React, { useState, useContext } from "react";
import { modalStyles, productStyles } from "@src/styles";
import * as Icon from "@heroicons/react/outline";
import { successAlert, errorAlert } from "@src/services/alert";

import ProductContext from '@src/services/productContext';

const Modal = ({ setIsOpen, productName, productId, price, deliveryTime, itemImage, productVariants }:any) => {

  // console.log('Variants in modal: ', variants);
  const [quantity, setQuantity] = useState<number>(1)
  const { addToCart, cart, calculateSubTotal, removeFromCart, decreaseQuantity, increaseQuantity } = useContext(ProductContext);
  const [beef, setBeef] = useState('');
  const [drink, setDrink] = useState('');
  const [variantPrices, setVariantPrices] = useState<any>([]);
  const [selectedVariants, setSelectedVariants] = useState<any>([]);
  const [orderedItems, setOrderedItems] = useState<any>([]);

  let variant = beef !== '' || drink !== '' ? `With ${beef} ${drink}` : null;

    const handleDecreaseQuantity = () => {
      let newQuantity = quantity - 1;
      if(newQuantity <= 1)
        setQuantity(1);
      else
        setQuantity(newQuantity);
    }

    const handleIncreaseQuantity = () => {
      let newQuantity = quantity + 1;
        setQuantity(newQuantity);
    }

    const handleBeefChange = (e:any, price: number, variant_id: string) => {
      if(e.target.value !== '') {
        setBeef(e.target.value);
        variantPrices.push(price);
        let selected_variant = {
          variantId: variant_id,
          quantity: 1
        }
        selectedVariants.push(selected_variant);
        // console.log(variantPrices);
      }
    }

    const handleDrinkChange = (e:any, price: number, variant_id: string) => {
      if(e.target.value !== '') {
        setDrink(e.target.value);
        variantPrices.push(price);
        let selected_variant = {
          variantId: variant_id,
          quantity: 1
        }
        selectedVariants.push(selected_variant);
        // console.log(variantPrices);
      }
    }

    const handleAddToCart = (event: any, product_id: number, product_name: string, product_price: number, delivery_time: number, variant: any) => {
      let price = variantPrices.reduce((a:number, b:number) => a + b, 0) + product_price;
      let variants = selectedVariants;
      let productId = product_id;
      addToCart(event, {product_id, product_name, price, quantity, delivery_time, variant, variants, productId});
      successAlert(`${product_name} successfully added to your cart!`);
      setIsOpen(false);
    } 

    return (
        <>
          <div className={modalStyles.darkBGCheckout} onClick={() => setIsOpen(false)} />
          <div className={modalStyles.centered}>
            <div className={modalStyles.modalCart}>
              <div className={modalStyles.modalHeader}>
                <p className={modalStyles.cartHeading}>Fix your plate</p>
              </div>
              <button className={modalStyles.closeBtn} onClick={() => setIsOpen(false)}>
                <Icon.XIcon color={'grey'} width={15} height={15} style={{ marginBottom: "-3px" }}/>
              </button>
              <div className={modalStyles.modalContent}>
                <p style={{fontSize: '20px', fontWeight: 600}}>{productName}</p>
                <p style={{fontSize: '18px', fontWeight: 'normal'}}>Portion</p>
                <div style={{marginTop: '10px', marginBottom: '15px'}}>
                    <span className={productStyles.spanCircle} onClick={() => handleDecreaseQuantity()}><span style={{position: 'relative', bottom: '4px'}}>-</span></span><span style={{marginRight: '18px', fontSize: '18px'}}><span style={{position: 'relative', bottom: '3px'}}>{quantity}</span></span><span className={productStyles.spanCircle} onClick={() => handleIncreaseQuantity()}><span style={{position: 'relative', bottom: '4px'}}>+</span></span>
                </div>
                
                <p style={{fontSize: '15px', fontWeight: 600}}>ADD YOUR FAVOURITE MEAT OR FISH</p>
                <p style={{color: '#eb332a', marginTop: '-3px'}}>Minimum 0 and maximum 1</p>
                {
                  productVariants && productVariants.map
                }
                {productVariants && productVariants.filter((item:any) => item.type === 'PROTEIN').map((variant:{
                      name: string;
                      price: number;
                      type: string;
                      _id: string;
                  })=><div key={variant.name}>
                       <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                          <p>
                            <input type="radio" value={variant.name} name="beef" onChange={(e:any) => handleBeefChange(e, variant.price, variant._id)} checked={beef === variant.name}  /> {variant.name}
                          </p>
                          <p style={{paddingTop: '10px'}}>
                              NGN {variant.price}
                          </p>
                      </div>
                    </div>
                )}
                <p style={{fontSize: '15px', fontWeight: 600}}>WHAT DRINK WOULD YOU LIKE</p>
                <p style={{color: '#eb332a', marginTop: '-3px'}}>Minimum 0 and maximum 1</p>
                {productVariants && productVariants.filter((item:any) => item.type === 'DRINK').map((variant:{
                      name: string;
                      price: number;
                      type: string;
                      _id: string;
                  })=><div key={variant.name}>
                       <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                          <p>
                            <input type="radio" value={variant.name} name="drink" onChange={(e:any) => handleDrinkChange(e, variant.price, variant._id)} checked={drink === variant.name}/> {variant.name}
                          </p>
                          <p style={{paddingTop: '10px'}}>
                            NGN {variant.price}
                          </p>
                      </div>
                    </div>
                )}
                <br/>
                <div style={{display:'flex', marginLeft: '270px', width: '200px', height: '40px', borderRadius: 20, backgroundColor: '#eb332a', alignItems:'center', justifyContent: 'center'}}>
                  <p style={{color: '#fff', fontSize: '16px', cursor: 'pointer'}} onClick={(event) => handleAddToCart(event, productId, productName, price, deliveryTime, variant)}>Add to Cart</p>
                </div>
              </div>
              
              {/* <div className={modalStyles.modalActions}>
                <div className={modalStyles.actionsContainer}>
                  <button className={modalStyles.deleteBtn} onClick={() => setIsOpen(false)}>
                    Delete
                  </button>
                  <button
                    className={modalStyles.cancelBtn}
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </>
      );
};

export default Modal;
import React from 'react';
import { createContext, useState } from 'react';
// import { useRouter } from 'next/router';

interface ProviderProps {
  children: React.ReactNode;
}

export interface addToCartProps {
  product_id: number,
  product_name: string;
  price: number;
  quantity?: number;
  delivery_time: number;
  variant: string,
  variants: any,
  productId: any,
}

const ProductContext = createContext({
  error: undefined,
  cart: [] as any,
  addToCart: (event: Event, product: addToCartProps ) => {
    return;
  },
  removeFromCart: (product_id: number) => {
    return;
  },
  calculateSubTotal: () => {
    return;
  },
  decreaseQuantity: (product_id: number) => {
    return;
  },
  increaseQuantity: (product_id: number) => {
    return;
  },
});


export const ProductProvider = ({ children }: ProviderProps) => {

  const [cart, setCart] = useState<any>([]);
  // Error is unknown to support every form of error this is any
  const [error, setError] = useState<any>();
  const [orderId, setOrderId] = useState<string>('');
  const [orderRef, setOrderRef] = useState<string>('');
  // const Router = useRouter();

  // add product to cart
  const addToCart = (event: Event, product: addToCartProps) => {
    event.preventDefault;
    
    const { product_id } = product;
    // product.quantity = 1;
    
    // check if product already exists in cart
    const check_index = cart.findIndex((product: {product_id: number, quantity: number}) => product.product_id === product_id);

    // if product already exists, increase product quantity 
    if (check_index !== -1) {
      cart[check_index].quantity++;
      // console.log("Quantity updated:", cart);
    } else {
      // else add product to cart
      cart.push(product);
      // console.log('The product has been added to cart:', cart);
    }
    setCart(cart);
    console.log(cart);
  }

  // remove product from cart
  const removeFromCart = (product_id:number) => {
    let newCart = cart.filter((item:any) => item.product_id !== product_id);
    setCart(newCart);
  }

  const decreaseQuantity = (product_id:number) => {
    let tempCart = cart;
    // get the product index in cart
    let itemIndex = tempCart.findIndex((product:any) => product.product_id === product_id)
    // get the product data
    let item = tempCart[itemIndex];
    // decrease the product quantity
    item.quantity = item.quantity - 1;

    // if item quantity is 0, remove item from cart
    if(item.quantity === 0) {
      let newCart = cart.filter((item:any) => item.product_id !== product_id);
      setCart(newCart);
    } else {
      // put the updated product quantity back
      tempCart[itemIndex] = item;
      setCart([...tempCart]);
    }
  }

  const increaseQuantity = (product_id:number) => {
    let tempCart = cart;
    // get the product index in cart
    let itemIndex = tempCart.findIndex((product:any) => product.product_id === product_id)
    // get the product data
    let item = tempCart[itemIndex];
    // increase the product quantity
    item.quantity = item.quantity + 1;
    // put the updated product quantity back
    tempCart[itemIndex] = item;
    setCart([...tempCart]);
  }

  const calculateSubTotal = () => {
    return cart.reduce(
      // reduce go through the array and cartItem is the each item in the array
      (accumulatedTotal: number, cartItem: any) =>
        accumulatedTotal + cartItem.price * cartItem.quantity,
      0 // 0 is the start point of accumulatedTotal
    );
  }


  return (
    <ProductContext.Provider value={{error, cart, addToCart, calculateSubTotal, removeFromCart, decreaseQuantity, increaseQuantity }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

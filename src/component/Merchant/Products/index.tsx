import { NextPage } from "next";
import { useState, useEffect } from "react";
import * as Icon from "@heroicons/react/outline";
import Image from "next/image";
import Search from "../Search";
import Link from "next/link";
import { productStyles } from "@src/styles";
import { ADD_PRODUCT_MERCHANT_PAGE_ROUTE } from "@src/services/routes";
import { EDIT_PRODUCT_MERCHANT_PAGE_ROUTE } from "@src/services/routes";
import axios from "axios";
import { PUBLIC_BASE_URL, MERCHANT_GET_PRODUCTS_PUBLIC_API_ROUTE } from "@src/services/routes";
import { errorAlert } from "@src/services/alert";
import { Spinner } from "@src/component";
import DeleteProductModal from "@src/component/Modal/deleteProduct";

const Products: NextPage = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("merchantToken");

  const handleDeleteProductModal = () => {
    setIsOpen(true);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const getProducts = async () => {
    try {
      setLoading(true);
      await axios.get(`${PUBLIC_BASE_URL}${MERCHANT_GET_PRODUCTS_PUBLIC_API_ROUTE}`, {
        headers: headers
      })
        .then((response) => {
          setProducts(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        })
    } catch (error: any) {
      // console.log(error);
      errorAlert(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <>
      <div style={{ position: 'relative', bottom: '30px', marginRight: '30px', marginLeft: '-30px' }}>
        <Icon.ViewListIcon width={25} height={25} style={{ float: 'right' }} />
        <Icon.ViewGridIcon width={25} height={25} style={{ float: 'right' }} />
      </div>
      <span style={{ marginLeft: '30px', marginBottom: '40px', fontSize: '16px', fontWeight: 600, position: 'relative', top: '20px' }}>Total Products {products.length}</span>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '-70px', position: 'relative', bottom: '60px' }}>
        <div className={productStyles.search}>
          <Search />
        </div>
        <div className={productStyles.filter}>
          <Link href={ADD_PRODUCT_MERCHANT_PAGE_ROUTE}>
            <div className={productStyles.button} style={{ cursor: 'pointer' }}>
              <p className={productStyles.buttonText}><Icon.PlusIcon width={15} height={15} />Add Product </p>
            </div>
          </Link>
        </div>
      </div>
      {/* <div style={{marginLeft: '30px', marginRight: '100px'}}>
            <table className="table">
              <thead>
                <tr>
                <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Delivery time</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th style={{fontWeight: 'normal'}}>
                    Burger
                  </th>
                  <td>N1,400</td>
                  <td>30mins</td>
                  <td>Selling</td>
                  <td><span style={{marginRight: '10px'}}><Icon.EyeIcon width={20} height={20} /></span><span style={{marginRight: '10px'}}><Icon.PencilIcon width={20} height={20}/></span><span><Icon.TrashIcon width={20} height={20}/></span></td>
                </tr>
              </tbody>
            </table>
          </div> */}
      {loading && <Spinner />}
      {products && products.map((product:{
          productId: React.Key | null | undefined;
          name:string;
          price:number;
          productImages: any;
          category: string;
          deliveryTime: string;
          description: string;
        })=> <div className="col-md-3 ml-5 mb-4">
        <div className="card bg-light border-0 w-33" style={{ height: '250px', width: '220px', backgroundColor: '#fff', marginLeft: '30px' }}>
          <div className="card-body d-flex justify-content-md-center align align-items-center">
            <Image src={product.productImages[0]} width={132} height={112} />
          </div>
          <div>
            <p style={{ marginLeft: '10px' }}>{product.name}</p>
          </div>
          <div>
            <p style={{ marginLeft: '10px', color: '#0230B1', float: 'left', marginRight: '40px' }}>N{product.price}</p>
            <p>
              <span style={{ marginRight: '10px' }}><Icon.EyeIcon width={20} height={20} /></span>
              <span style={{ marginRight: '10px', cursor: 'pointer' }}><Link href={{pathname: EDIT_PRODUCT_MERCHANT_PAGE_ROUTE, query:{productId:product.productId, name:product.name, productPrice: product.price, productImage: product.productImages[0], productCategory: product.category, productDeliveryTime: product.deliveryTime, productDescription: product.description}}}><Icon.PencilIcon width={20} height={20} /></Link>
              </span><span style={{ cursor: 'pointer' }}><Icon.TrashIcon width={20} height={20} onClick={() => handleDeleteProductModal()} /></span>
            </p>
          </div>
        </div>
      </div>
      )}
    </>
  )
}
export default Products;
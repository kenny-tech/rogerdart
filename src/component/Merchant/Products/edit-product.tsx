import { NextPage } from "next";
import { ChangeEvent, useRef, useState } from 'react';
import { productStyles } from "@src/styles";
import * as Icon from "@heroicons/react/outline";
import { useRouter } from 'next/router';
import axios from "axios";
import { PUBLIC_BASE_URL, FILE_UPLOAD_PUBLIC_API_ROUTE, MERCHANT_EDIT_PRODUCT_PUBLIC_API_ROUTE, PRODUCT_MERCHANT_PAGE_ROUTE } from "@src/services/routes";
import { successAlert, errorAlert } from "@src/services/alert";
import Image from "next/image";
import Link from "next/link";
import VariantModal from "@src/component/Modal/variant";

const EditProductForm: NextPage = () => {

    const Router = useRouter();
    const {productId, name, productPrice, productImage, productCategory, productDeliveryTime, productDescription} = Router.query;
    let productVariants = JSON.parse(sessionStorage.getItem('productVariants') || '{}');

    const [productName, setProductName] = useState(name || '');
    const [category, setCategory] = useState(productCategory || '');
    const [description, setDescription] = useState(productDescription);
    const [price, setPrice] = useState(productPrice || '');
    const [deliveryTime, setDeliveryTime] = useState(productDeliveryTime || '');
    const [variants, setVariants] = useState<any>(productVariants || []);
    const [prodImage, setProdImage] = useState<any>(productImage || '');
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');

    const [productNameError, setProductNameError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [deliveryTimeError, setDeliveryTimeError] = useState('');
    const [variantError, setVariantError] = useState('');

    const [file, setFile] = useState<File>();
    const [productImageLink, setProductImageLink] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const token = sessionStorage.getItem("merchantToken");

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const handleUploadClick = () => {
        // Redirect the click event onto the hidden input element
        inputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
        return;
        }

        const data = new FormData(); 
        data.append('file', e.target.files[0]);

        axios.post(`${PUBLIC_BASE_URL}${FILE_UPLOAD_PUBLIC_API_ROUTE}`, data,  {
            headers: headers
        })
        .then(function (response) {
            if(response.statusText) {
                setProductImageLink(response.data.data.uri);
                setLoading(false);
            } else {
                errorAlert('Unable to process file. Please try again.');
            }
        })
        .catch(function (error) {
            errorAlert(error.response.data.message);
            setLoading(false);
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setLoading(false);

        if (productName.length == 0){
            setProductNameError('Product Name is required');
            setLoading(false);
        } else if (price.length == 0) {
            setPriceError('Price is required');
            setLoading(false);
        } else if (deliveryTime.length == 0) {
            setDeliveryTimeError('Delivery time is required');
            setLoading(false);
        } else {    
            setLoading(true);
            let data = {
                name: productName,
                category,
                description,
                price,
                deliveryTime,
                productImageLink
            }

            axios.patch(`${PUBLIC_BASE_URL}${MERCHANT_EDIT_PRODUCT_PUBLIC_API_ROUTE}`, data,  {
                headers: headers
            })
            .then(function (response) {
                if(response.statusText) {
                    // console.log(response)
                    successAlert('Product successfully added');
                    setLoading(false);
                } else {
                    errorAlert('Unable to add product. Please try again.');
                }
            })
            .catch(function (error) {
                errorAlert(error.response.data.message);
                setLoading(false);
            });
        }
    }

    const handleAddVariant = (type: string) => {
        setIsOpen(true);
        setType(type);
    }

    const handleDeleteProtein = () => {
        let newVariant = variants.filter((item:any) => item.type !== 'PROTEIN');
        sessionStorage.setItem('productVariants', JSON.stringify(newVariant));
        Router.reload()
    }

    const handleDeleteDrink = () => {
        let newVariant = variants.filter((item:any) => item.type !== 'DRINK');
        sessionStorage.setItem('productVariants', JSON.stringify(newVariant));
        Router.reload()
    }

    return (
        <div className={productStyles.mainContent}>
            <div className="row">
                <div className="col-11">
                    <div className="card border-0">
                        <div className="card-body">
                            <h5 className="card-title">Product Information</h5>
                            <p style={{color: '#696F79', marginTop: '30px'}}>Product Image</p>
                            <div className="d-flex flex-row">
                                {productImageLink !== '' ? <Image src={productImageLink} width={236} height={155}/> : <Image src={prodImage} width={236} height={155}/>}
                                <div className={productStyles.addImage} onClick={handleUploadClick}>
                                    <Icon.PlusCircleIcon width={25} height={25} style={{float: 'right'}}/>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={inputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                            <label className="form-label" style={{color: '#696F79'}}>Product Name</label>
                                            <input type="email" className="form-control" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)}/>
                                        </div>
                                        {productName.length === 0 && <span className={productStyles.error}>{productNameError}</span>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                        <label className="form-label" style={{color: '#696F79'}}>Category</label>
                                            <select className="form-control" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                                <option value="Protein">Protein</option>
                                            </select>
                                        </div>
                                        {category.length === 0 && <span className={productStyles.error}>{categoryError}</span>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                        <label className="form-label" style={{color: '#696F79'}}>Description</label>
                                           <textarea className="form-control" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                            <label className="form-label" style={{color: '#696F79'}}>Product Price</label>
                                            <input type="text" className="form-control" name="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                                        </div>
                                        {price.length === 0 && <span className={productStyles.error}>{priceError}</span>}
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                            <label className="form-label" style={{color: '#696F79'}}>Delivery Time</label>
                                            <input type="text" className="form-control" name="deliveryTime" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)}/>
                                        </div>
                                        {deliveryTime.length === 0 && <span className={productStyles.error}>{deliveryTimeError}</span>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mt-3 ml-3 mr-3">
                                            <label className="form-label" style={{color: '#696F79'}}>Product Variants</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={productStyles.addVariantButton} onClick={() => handleAddVariant('Add Variant')}>
                                    <span className={productStyles.buttonVariantText}>+ Add Variant</span>
                                </div>
                            </form>  
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link href={PRODUCT_MERCHANT_PAGE_ROUTE}>
                                <div className="mb-3 mt-3 ml-3 mr-3">
                                    <div className={productStyles.previousButton}>
                                        <p style={{color: '#AC2E0E', fontSize: '16px', paddingTop: '10px', paddingLeft: '10px'}}>Cancel</p>
                                    </div>   
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 mt-3 ml-3 mr-3">
                                {
                                    loading ? ( 
                                    <div className={productStyles.nextButton}>
                                        <p style={{color: '#fff', fontSize: '16px', paddingTop: '10px'}}>Updating Product...</p>
                                    </div>   
                                    ) : ( 
                                        <div className={productStyles.nextButton} onClick={(event) => handleSubmit(event)}>
                                            <p style={{color: '#fff', fontSize: '16px', paddingTop: '10px', cursor: 'pointer'}}>Save</p>
                                        </div>   
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <VariantModal setIsOpen={setIsOpen} variantType={type}/>}
        </div>
    )
}

export default EditProductForm;
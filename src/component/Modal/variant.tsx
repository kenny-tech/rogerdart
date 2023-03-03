import React, { useState, useEffect } from "react";
import * as Icon from "@heroicons/react/outline";
import { useRouter } from 'next/router';
import { modalStyles } from "@src/styles";
import { merchantPageStyles } from "@src/styles";

const Modal = ({ setIsOpen, variantType }:any) => {

  useEffect(() => {
    let productVariants = JSON.parse(sessionStorage.getItem('productVariants') || '{}');
    if(variantType === 'Edit Variant') {
      setVariants(productVariants);
    }
  }, []);    

  const Router = useRouter();
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [variants, setVariants] = useState<any>([]);
  const [addVariant, setAddVariant] = useState<boolean>(false);
  const [optionDisplay, setOptionDisplay] = useState<boolean>(true);

  const [nameError, setNameError] = useState<string>('');
  const [typeError, setTypeError] = useState<string>('');
  const [priceError, setPriceError] = useState<string>('');
  const token = sessionStorage.getItem("merchantToken");

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const handleAddVariant = (event: any) => {
    event.preventDefault();
    if (type.length == 0){
        setTypeError('Name is required');
    } else if (name.length == 0){
        setNameError('Option is required');
    } else if (price.length == 0){
        setPriceError('Price is required');
    } else{
      let variant = {
        name,
        type,
        price
      }   
      
      variants.push(variant);
      setVariants(variants);
      setAddVariant(true);
      setOptionDisplay(false)
      setName('');
      setPrice('');
    }
  }

  const handleOptionShow = () => {
    setOptionDisplay(true);
  }

  const handleRemoveVariant = (name: string) => {
    let filteredItems = variants.filter((item:any) => item.name !== name);  
    setVariants(filteredItems);
  }

  const handleModalCancel = () => {
    setIsOpen(false);
  }

  const handleSaveVariant = () => {
    sessionStorage.setItem('productVariants', JSON.stringify(variants));
    setIsOpen(false);
    Router.reload()
  }

  const handleAddNewVariant = () => {
    setType('');
    setName('');
    setPrice('');
    setOptionDisplay(true);
  }

    return (
        <>
          <div className={modalStyles.darkBG} onClick={() => setIsOpen(false)} />
          <div className={modalStyles.centered}>
            <div className={modalStyles.modalVariant}>
              <div className={modalStyles.modalHeader}>
                <h5 className={modalStyles.heading}>{'Variants'}</h5>
              </div>
              {
                variants.length !== 0 ? (<span style={{color: '#0230B1', position: 'relative', bottom: '25px', left: '300px', cursor: 'pointer'}} onClick={() => handleAddNewVariant()}>+ Add another variant</span>) : ( <button className={modalStyles.closeBtn} onClick={() => setIsOpen(false)}>
                <Icon.XIcon color={'grey'} width={15} height={15} style={{ marginBottom: "-3px" }}/>
              </button>)
              }
             
              <div className={modalStyles.modalContent}>    
                <div className={modalStyles.inputBox}>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', marginBottom: '15px'}}>
                      <div>
                        <span>Name</span>
                        {/* <input type={'text'} name='type' className={modalStyles.textInput} onChange={(e) => setType(e.target.value)} placeholder={'E.g Protein'} value={type} required={true}/> */}
                        <select className={modalStyles.textInput} onChange={(e) => setType(e.target.value)} value={type}>
                          <option value={''}>Select one</option>
                          <option value={'PROTEIN'}>Protein</option>
                          <option value={'DRINK'}>Drink</option>
                        </select>
                        {type.length == 0 &&  <span className={merchantPageStyles.error}> {typeError} </span>}
                      </div>   
                  </div>
                  {
                    addVariant ? ( <div className="text-center mt-3" style={{color: '#FCA311', cursor: 'pointer'}} onClick={() => handleOptionShow()}>
                    <p>+ Add another option</p>
                    </div>) : null
                  }
                  {
                    optionDisplay ? ( <div className={modalStyles.optionShow}>
                      <div>
                        <span>Option</span>
                        <input type={'text'} name='name' className={modalStyles.textInputVariant} value={name} onChange={(e) => setName(e.target.value)} placeholder={'E.g Beef'} required={true}/>
                        {name.length === 0 && <span className={merchantPageStyles.error}> {nameError} </span>}
                      </div>   
                      <div>
                        <span>Price</span>
                        <input type={'number'} name='price' className={modalStyles.textInputVariant} value={price} onChange={(e) => setPrice(e.target.value)} required={true}/>
                        {price.length === 0 &&  <span className={merchantPageStyles.error}> {priceError} </span>}
                      </div>   
                      <div className={modalStyles.addVariantButton} onClick={(event) => handleAddVariant(event)}>
                          <span className={modalStyles.buttonVariantText}>+ Add </span>
                      </div>
                  </div>) : null
                }
         
                { variants && variants.map((variant:{
                    name: string;
                    type: string;
                    price:number;
                    })=><div key={variant.name}>
                       <div style={{display:'flex', alignItems:'center', justifyContent: 'space-between', width: '400px', position: 'relative', top: '20px'}}>
                        <p>{variant.name.padEnd((50 - variant.name.length), ' ')}</p>
                        <p>N{(variant.price).toLocaleString()}</p>
                        <span style={{cursor: 'pointer'}} onClick={() => handleRemoveVariant(variant.name)}>
                          <Icon.TrashIcon color={'grey'} width={15} height={15} style={{ marginBottom: '20px' }}/>
                        </span>
                      </div>
                      {/* <hr style={{width:'100%', height:'2px', backgroundColor: '#E0E0E0', border: 'none'}}/> */}
                      </div>)}
                </div>  
                <br/><br/><br/><br/><br/>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: '30px', float: 'right', marginRight: '35px', cursor: 'pointer'}}>
                      <div className={modalStyles.cancel} onClick={() => handleModalCancel()}>
                        <p style={{color: '#AC2E0E', fontSize: '16px', marginTop: '10px'}}>Cancel</p>
                      </div>
                      {
                        variants.length === 0 ? ( <div className={modalStyles.save}>
                        <p style={{color: '#fff', fontSize: '16px', marginTop: '10px'}}>Save</p>
                      </div>) : ( <div className={modalStyles.save} onClick={() => handleSaveVariant()}>
                        <p style={{color: '#fff', fontSize: '16px', marginTop: '10px'}}>Save</p>
                      </div>)
                      }
                </div>
              </div>
            </div>
          </div>
        </>
      );
};

export default Modal;
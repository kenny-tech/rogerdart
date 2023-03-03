import React from "react";
import { modalStyles } from "@src/styles";
import * as Icon from "@heroicons/react/outline";

const Modal = ({ setIsOpen }:any) => {

    return (
        <>
          <div className={modalStyles.darkBG} onClick={() => setIsOpen(false)} />
          <div className={modalStyles.centeredDeleteProductModal}>
            <div className={modalStyles.modalDeleteProduct}>
              <div className={modalStyles.modalHeader}>
                <h3 className={modalStyles.headingCenter}>Delete Product</h3>
              </div>
              <button className={modalStyles.closeBtnDeleteProduct} onClick={() => setIsOpen(false)}>
                <Icon.XIcon color={'grey'} width={15} height={15} style={{ marginBottom: "-3px" }}/>
              </button>
                  <br />
                  <p className="text-center text-black">Are you sure you want to delete this product?</p>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems :'center', marginLeft: '60px', marginRight: '65px'}}>
                    <p className={modalStyles.buttonCancel}>
                      <span style={{color: '#6B6F7D'}}>Cancel</span>
                    </p>   
                    <p className={modalStyles.buttonRemove}>
                      <span style={{color: '#FFF'}}>Delete</span>
                    </p>   
                  </div>
            </div>
          </div>
        </>
      );
};

export default Modal;
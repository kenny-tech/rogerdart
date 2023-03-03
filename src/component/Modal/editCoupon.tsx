import React from "react";
import { modalStyles } from "@src/styles";
import * as Icon from "@heroicons/react/outline";

const Modal = ({ setIsOpen }:any) => {

    return (
        <>
          <div className={modalStyles.darkBG} onClick={() => setIsOpen(false)} />
          <div className={modalStyles.centered}>
            <div className={modalStyles.modaCoupon}>
              <div className={modalStyles.modalHeader}>
                <h5 className={modalStyles.heading}>Edit Coupon</h5>
              </div>
              <button className={modalStyles.closeBtn} onClick={() => setIsOpen(false)}>
                <Icon.XIcon color={'grey'} width={15} height={15} style={{ marginBottom: "-3px" }}/>
              </button>
              <div className={modalStyles.modalContent}>    
                <div className={modalStyles.inputBox}>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', marginBottom: '10px'}}>
                      <div>
                        <p>Coupon code</p>
                        <input type={'text'} name='phone' value={'ABC123'} className={modalStyles.textInput} />
                      </div>   
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', marginBottom: '10px'}}>
                      <div>
                        <p>Coupon tag</p>
                        <input type={'text'} name='phone'value={'ABC123'} className={modalStyles.textInput} />
                      </div>   
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', marginBottom: '10px'}}>
                      <div>
                        <p>Coupon value</p>
                        <input type={'text'} name='phone' value={'ABC123'} className={modalStyles.textInput} />
                      </div>   
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', marginBottom: '10px'}}>
                      <div>
                        <span>Start date</span>
                        <input type={'date'} name='address' className={modalStyles.input} />
                      </div>
                      <div>
                      <span>End date</span>
                        <input type={'date'} name='address' className={modalStyles.input} />
                      </div>
                  </div>
                  <br/>
                </div>  
                <br/>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: '30px', float: 'right', marginRight: '35px'}}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width: '150px', height: '40px', borderRadius: 20, backgroundColor: '#FCA311'}}>
                        <p style={{color: '#fff', fontSize: '16px', marginTop: '10px'}}>Save</p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </>
      );
};

export default Modal;
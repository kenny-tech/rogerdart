import React from "react";
import { modalStyles } from "@src/styles";
import * as Icon from "@heroicons/react/outline";

const Modal = ({ setIsCheckoutOpen }:any) => {

    return (
        <>
          <div className={modalStyles.darkBG} onClick={() => setIsCheckoutOpen(false)} />
          <div className={modalStyles.centered}>
            <div className={modalStyles.modal}>
              <div className={modalStyles.modalHeader}>
                <h5 className={modalStyles.heading}>Checkout options</h5>
              </div>
              <button className={modalStyles.closeBtn} onClick={() => setIsCheckoutOpen(false)}>
                <Icon.XIcon color={'grey'} width={15} height={15} style={{ marginBottom: "-3px" }}/>
              </button>
              <div className={modalStyles.modalContent}>    
                <div className={modalStyles.orderDetailsBox}>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                      <p>
                        Discount
                      </p>
                      <p>
                          NGN {'12,000'}
                      </p>
                  </div>
                  <hr style={{width:'100%', height:'1px', backgroundColor: '#E0E0E0', border: 'none'}}/>

                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                      <p>
                        Tip
                      </p>
                      <p>
                          NGN {'1,000'}
                      </p>
                  </div>
                  <hr style={{width:'100%', height:'1px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                      <p>
                        Subtotal
                      </p>
                      <p>
                          NGN {'1,000'}
                      </p>
                  </div>
                  <hr style={{width:'100%', height:'1px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                      <p>
                        VAT
                      </p>
                      <p>
                          NGN {'1,000'}
                      </p>
                  </div>
                  <hr style={{width:'100%', height:'1px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                      <p>
                        Total
                      </p>
                      <p style={{color: '#E43225' }}>
                          NGN {'1,000'}
                      </p>
                  </div>
                  <br/>
                </div>     
                <br />
                <div className={modalStyles.orderInputBox}>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                      <p>
                        <strong>Delivering to:</strong>
                      </p>
                      <p>
                      </p>
                  </div>
                  <hr style={{width:'100%', height:'1px', backgroundColor: '#E0E0E0', border: 'none'}}/>
                  <br/>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                      <div>
                        <span>Firstname</span>
                        <input placeholder='Firstname' type={'text'} name='address' className={modalStyles.input} />
                      </div>
                      <div>
                      <span>Lastname</span>
                        <input placeholder='Firstname' type={'text'} name='address' className={modalStyles.input} />
                      </div>
                  </div>
                  <br/>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                      <div>
                        <p>Address</p>
                        <textarea className={modalStyles.textarea}> </textarea>
                      </div> 
                  </div>
                  <br/>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                      <div>
                        <p>Phone</p>
                        <input placeholder='Phone' type={'text'} name='phone' className={modalStyles.textInput} />
                      </div> 
                  </div>
                  <br/>
                  {/* <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                      <div>
                        <p>Nearest landmark</p>
                        <input placeholder='Nearest landmark' type={'text'} name='phone' className={modalStyles.textInput} />
                      </div> 
                  </div> */}
                </div>  
                <br/>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width: '200px', height: '40px', borderRadius: 20, backgroundColor: '#fff', border: 'solid', borderColor: '#E0E0E0'}}>
                        <p style={{color: '#AC2E0E', fontSize: '16px'}}>Cancel</p>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width: '200px', height: '40px', borderRadius: 20, backgroundColor: '#eb332a'}}>
                        <p style={{color: '#fff', fontSize: '16px'}}>Checkout</p>
                      </div>
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
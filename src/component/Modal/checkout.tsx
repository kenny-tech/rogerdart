import React from "react";
import { modalStyles } from "@src/styles";
import PaystackPayment from "../Payment";

const Modal = ({ setIsCheckoutOpen, firstName, lastName, address, city, state, phone, landMark, grandTotal, orderId, orderReference }:any) => {
    return (
        <>
          <div className={modalStyles.darkBG} onClick={() => setIsCheckoutOpen(false)} />
          <div className={modalStyles.centered}>
            <div className={modalStyles.modalConfirmPayment}>
              <div className={modalStyles.modalHeader}>
                <h5 className={modalStyles.heading}>Payment Confirmation</h5>
              </div>
              {/* <button className={modalStyles.closeBtnCheckout} onClick={() => setIsCheckoutOpen(false)}>
                <Icon.XIcon color={'grey'} width={15} height={15} style={{ marginBottom: "-3px" }}/>
              </button> */}
              <div className={modalStyles.modalContent}>    
                <div className={modalStyles.orderDetailsBox}>
                  <p><strong>Delivering to</strong></p>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingRight: '10px'}}>
                      <p>
                        First Name
                      </p>
                      <p>
                          {firstName}
                      </p>
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingRight: '10px'}}>
                      <p>
                        Last Name
                      </p>
                      <p>
                          {lastName}
                      </p>
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingRight: '10px'}}>
                      <p>
                        Address
                      </p>
                      <p>
                          NGN {address}
                      </p>
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingRight: '10px'}}>
                      <p>
                        City
                      </p>
                      <p>
                          {city}
                      </p>
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingRight: '10px'}}>
                      <p>
                        State
                      </p>
                      <p>
                          {state}
                      </p>
                  </div>
                  {/* <hr style={{width:'100%', height:'1px', backgroundColor: '#E0E0E0', border: 'none'}}/> */}
                  <br/>
                </div>     
                <br />
                <div className={modalStyles.totalBox}>
                  <p><strong>Payment</strong></p>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingRight: '10px'}}>
                      <p>
                        Total Amount
                      </p>
                      <p>
                         <strong>NGN{grandTotal.toLocaleString()}</strong> 
                      </p>
                  </div>
                    <br/>
                </div>     
                <br />
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width: '200px', height: '40px', borderRadius: 20, backgroundColor: '#fff', border: 'solid', borderColor: '#E0E0E0', cursor: 'pointer'}} onClick={() => setIsCheckoutOpen(false)}>
                        <p style={{color: '#AC2E0E', fontSize: '16px', position: 'relative', bottom: '10px'}}>Cancel</p>
                      </div>
                      <PaystackPayment firstName={firstName} lastName={lastName} address={address} city={city} state={state} phone={phone} landMark={landMark} grandTotal={grandTotal} orderId={orderId} orderReference={orderReference} />
                  </div>
              </div>
            </div>
          </div>
        </>
      );
};

export default Modal;
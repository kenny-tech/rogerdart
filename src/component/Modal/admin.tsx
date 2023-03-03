import React from "react";
import { modalStyles } from "@src/styles";
import * as Icon from "@heroicons/react/outline";

const Modal = ({ setIsOpen, type }:any) => {

    return (
        <>
          <div className={modalStyles.darkBG} onClick={() => setIsOpen(false)} />
          <div className={modalStyles.centeredAdminModal}>
            <div className={modalStyles.modalAdmin}>
              <div className={modalStyles.modalHeader}>
                {
                  type === 'Remove Admin' ? (<h3 className={modalStyles.headingCenter}>Remove admin</h3>) : (<h3 className={modalStyles.heading}>Invite admin</h3>)
                }
              </div>
              <button className={modalStyles.closeBtnAdmin} onClick={() => setIsOpen(false)}>
                <Icon.XIcon color={'grey'} width={15} height={15} style={{ marginBottom: "-3px" }}/>
              </button>
              {
                type === 'Remove Admin' ? (<div className={modalStyles.modalContent}> 
                  <p className="text-center">Are you sure you want to remove this admin?</p>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems :'center', marginLeft: '40px', marginRight: '40px'}}>
                    <p className={modalStyles.buttonCancel}>
                      <span style={{color: '#6B6F7D'}}>Cancel</span>
                    </p>   
                    <p className={modalStyles.buttonRemove}>
                      <span style={{color: '#FFF'}}>Remove</span>
                    </p>   
                  </div>
            </div>) : (<div className={modalStyles.modalContent}> 
                  <p>Enter recipient email address</p>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems :'center'}}>
                  <input type={'text'} className='form-control rounded-pill' placeholder="Enter email" style={{width: '300px', position: 'relative', bottom: '8px'}} />
                  <p className={modalStyles.inviteAdmin}>
                    <span style={{color: '#FFF', textAlign: 'center'}}>Invite admin</span>
                  </p>   
                  </div>
            </div>)
              }
            </div>
          </div>
        </>
      );
};

export default Modal;
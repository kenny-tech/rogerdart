import React, { useState } from "react";
import axios from "axios";
import * as Icon from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { modalStyles } from "@src/styles";
import { PUBLIC_BASE_URL, MERCHANT_RATE_PUBLIC_API_ROUTE } from "@src/services/routes";
import { successAlert, errorAlert } from "@src/services/alert";

const Modal = ({ setIsOpen, vendorId, vendorName, rating }:any) => {

  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);  
  const usertoken:any  = sessionStorage.getItem("usertoken");
  const Router = useRouter();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${usertoken}`
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setLoading(true);
    let data = {
        rating,
        comment,
    }

    axios.post(`${PUBLIC_BASE_URL}${MERCHANT_RATE_PUBLIC_API_ROUTE}/${vendorId}`, data,  {
        headers: headers
    })
    .then(function (response) {
        if(response.statusText) {
            successAlert(response.data.message);
            setIsOpen(false);
        } else {
            errorAlert('Unable to rate vendor. Please try again.');
        }
    })
    .catch(function (error) {
        errorAlert(error.response.data.message);
        setLoading(false);
    });
    
  }

  return (
        <>
          <div className={modalStyles.darkBG} onClick={() => setIsOpen(false)} />
          <div className={modalStyles.centered}>
            <div className={modalStyles.modaRating}>
              <div className={modalStyles.modalHeader}>
                <h5 className={modalStyles.heading}>Rate Vendor ({vendorName})</h5>
              </div>
              <button className={modalStyles.closeBtn} onClick={() => setIsOpen(false)}>
                <Icon.XIcon color={'grey'} width={15} height={15} style={{ marginBottom: "-3px" }}/>
              </button>
              <div className={modalStyles.modalContent}>    
                <div className={modalStyles.inputBox}>
                  <div>
                      <div>
                        <p>Comment</p>
                      </div>   
                      <div>
                        <textarea className="form-control" style={{width: '380px'}}></textarea>
                      </div>
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: '30px', float: 'right', marginRight: '35px', cursor: 'pointer'}}>
                      {
                        loading ? ( <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width: '150px', height: '40px', borderRadius: 20, backgroundColor: '#FCA311'}}>
                        <p style={{color: '#fff', fontSize: '16px', marginTop: '10px'}}>Submitting...</p>
                      </div>) : ( <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width: '150px', height: '40px', borderRadius: 20, backgroundColor: '#FCA311'}} onClick={handleSubmit}>
                        <p style={{color: '#fff', fontSize: '16px', marginTop: '10px'}}>Submit</p>
                      </div>)
                      }
                  </div>
                  <br/>
                </div>  

               
              </div>
            </div>
          </div>
        </>
      );
};

export default Modal;
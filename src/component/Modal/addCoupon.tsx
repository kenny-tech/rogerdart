import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import * as Icon from "@heroicons/react/outline";
import { modalStyles } from "@src/styles";
import { merchantPageStyles } from "@src/styles";
import { PUBLIC_BASE_URL, MERCHANT_ADD_COUPON_PUBLIC_API_ROUTE } from "@src/services/routes";
import { successAlert, errorAlert } from "@src/services/alert";

const Modal = ({ setIsOpen, type }:any) => {

  const [name, setName] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [nameError, setNameError] = useState<string>('');
  const [tagError, setTagError] = useState<string>('');
  const [valueError, setValueError] = useState<string>('');
  const [startDateError, setStartDateError] = useState<string>('');
  const [endDateError, setEndDateError] = useState<string>('');
  const token = sessionStorage.getItem("merchantToken");
  const Router = useRouter();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(false);

    if (name.length == 0){
        setNameError('Coupon Name is required');
        setLoading(false);
    } else if (tag.length == 0){
        setTagError('Coupon Tag is required');
        setLoading(false);
    } else if (value.length == 0){
        setValueError('Coupon Value is required');
        setLoading(false);
    } else if (startDate.length == 0){
        setStartDateError('Coupon Start Date is required');
        setLoading(false);
    } else if (endDate.length == 0){
      setEndDateError('Coupon End Date is required');
      setLoading(false);
    } else{
        setLoading(true);
        let data = {
            couponName: name,
            type,
            prefix: tag,
            value,
            startDate,
            expiryDate: endDate
        }

        axios.post(`${PUBLIC_BASE_URL}${MERCHANT_ADD_COUPON_PUBLIC_API_ROUTE}`, data,  {
            headers: headers
        })
        .then(function (response) {
            if(response.statusText) {
                console.log(response)
                successAlert('Coupon successfully created');
                setLoading(false);
                setIsOpen(false);
                Router.reload();
            } else {
                errorAlert('Unable to create coupon. Please try again.');
            }
        })
        .catch(function (error) {
            errorAlert(error.response.data.message);
            setLoading(false);
        });
    }
  }


    return (
        <>
          <div className={modalStyles.darkBG} onClick={() => setIsOpen(false)} />
          <div className={modalStyles.centered}>
            <div className={modalStyles.modaCoupon}>
              <div className={modalStyles.modalHeader}>
                <h5 className={modalStyles.heading}>{type}</h5>
              </div>
              <button className={modalStyles.closeBtn} onClick={() => setIsOpen(false)}>
                <Icon.XIcon color={'grey'} width={15} height={15} style={{ marginBottom: "-3px" }}/>
              </button>
              <div className={modalStyles.modalContent}>    
                <div className={modalStyles.inputBox}>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', marginBottom: '15px'}}>
                      <div>
                        <span>Coupon Name</span>
                        <input type={'text'} name='name' className={modalStyles.textInput} value={name} onChange={(e) => setName(e.target.value)}/>
                        {name.length === 0 &&  <span className={merchantPageStyles.error}> {nameError} </span>}
                      </div>   
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', marginBottom: '15px'}}>
                      <div>
                        <span>Coupon tag</span>
                        <input type={'text'} name='tag' className={modalStyles.textInput} value={tag} onChange={(e) => setTag(e.target.value)}/>
                        {tag.length === 0 &&  <span className={merchantPageStyles.error}> {tagError} </span>}
                      </div>   
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', marginBottom: '15px'}}>
                      <div>
                        <span>Coupon value</span>
                        <input type={'number'} name='value' className={modalStyles.textInput} value={value} onChange={(e) => setValue(e.target.value)}/>
                        {value.length === 0 &&  <span className={merchantPageStyles.error}> {valueError} </span>}
                      </div>   
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', marginBottom: '15px', width: '600px'}}>
                      <div>
                        <span>Start date</span>
                        <input type={'date'} name='startDate' className={modalStyles.dateInput} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        {startDate.length === 0 &&  <span className={merchantPageStyles.error}> {startDateError} </span>}
                      </div>
                      <div>
                        <span></span>
                        <span style={{marginRight: '8px', position: 'relative', top: '10px', right: '5px'}}>to</span>
                      </div>
                      <div>
                      <span>End date</span>
                        <input type={'date'} name='endDate' className={modalStyles.dateInput} value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                        {endDate.length === 0 &&  <span className={merchantPageStyles.error}> {endDateError} </span>}
                      </div>
                  </div>
                  <br/>
                </div>  
                <br/>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: '30px', float: 'right', marginRight: '35px', cursor: 'pointer'}}>
                      {
                        loading ? ( <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width: '170px', height: '40px', borderRadius: 20, backgroundColor: '#FCA311'}}>
                        <p style={{color: '#fff', fontSize: '16px', marginTop: '10px'}}>Save</p>
                      </div>) : ( <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width: '170px', height: '40px', borderRadius: 20, backgroundColor: '#FCA311'}} onClick={handleSubmit}>
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
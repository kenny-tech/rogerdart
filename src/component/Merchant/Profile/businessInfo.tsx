import { NextPage } from "next";
import { useEffect, useState } from "react";
import * as Icon from "@heroicons/react/outline";
import axios from "axios";
import { profileStyles } from "@src/styles";
import Image from "next/image";
import { merchantPageStyles } from "@src/styles";
import { PUBLIC_BASE_URL, GET_PROFILE_API_ROUTE } from '@src/services/routes';
import { EllipseAnimation } from '@src/component';
import { successAlert, errorAlert } from "@src/services/alert";
import { states, countries } from "@src/constants";

const MerchantBusinessInfo: NextPage = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [prepTime, setPrepTime] = useState<string>('');
    const [openingHours, setOpeningHours] = useState<string>('');
    const [closingHours, setClosingHours] = useState<string>('');
    const [address, setAddress] = useState('');
    const [nearestLandmark, setNearestLandmark] = useState<string>('');

    const [nameError, setNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [stateError, setStateError] = useState<string>('');
    const [countryError, setCountryError] = useState<string>('');
    const [prepTimeError, setPrepTimeError] = useState<string>('');
    const [openingHoursError, setOpeningHoursError] = useState<string>('');
    const [closingHoursError, setClosingHoursError] = useState<string>('');
    const [addressError, setAddressError] = useState<string>('');
    const [nearestLandmarkError, setNearestLandmarkError] = useState<string>('');


    const [loading, setLoading] = useState<boolean>(false);
    const token = sessionStorage.getItem("merchantToken");

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    useEffect(() => {
        getProfile();
    }, [])

    const getProfile = async () => {
        try {
            await axios.get(`${PUBLIC_BASE_URL}${GET_PROFILE_API_ROUTE}`, {
                headers: headers
            })
                .then((response) => {
                    setName(response.data.data.kyc.businessName);
                    setName(response.data.data.kyc.businessName);
                    setEmail(response.data.data.email);
                    setState(response.data.data.state);
                    setCountry(response.data.data.country);
                    setAddress(response.data.data.address);
                    setNearestLandmark(response.data.data.landMark);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setLoading(false);
        let emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (name.length == 0) {
            setNameError('Business Name is required');
            setLoading(false);
        }
        else if (email.length == 0) {
            setEmailError('Email is required');
            setLoading(false);
        } else if (emailValidator.test(email) === false) {
            setEmailError(`${email} is not a valid email address`);
            setLoading(false);
        } else if (state.length == 0) {
            setStateError('State is required');
            setLoading(false);
        } else if (country.length == 0) {
            setCountryError('Country is required');
            setLoading(false);
        } else if (prepTime.length == 0) {
            setPrepTimeError('Preparation time is required');
            setLoading(false);
        } else if (openingHours.length == 0) {
            setOpeningHoursError('Opening Hours is required');
            setLoading(false);
        } else if (closingHours.length == 0) {
            setClosingHoursError('Closing Hours is required');
            setLoading(false);
        } else if (address.length == 0) {
            setAddressError('Address is required');
            setLoading(false);
        } else if (nearestLandmark.length == 0) {
            setNearestLandmarkError('Nearest Landmark is required');
            setLoading(false);
        } else {
            setLoading(true);
            let data = {
                name,
                email,
                state,
                country,
                prepTime,
                openingHours,
                closingHours,
                address,
                nearestLandmark
            }

            axios.patch(`${PUBLIC_BASE_URL}`, data, {
                headers: headers
            })
                .then(function (response) {
                    if (response.statusText) {
                        // console.log(response)
                        successAlert('Business Information successfully updated');
                        setLoading(false);
                    } else {
                        errorAlert('Unable to update your business information. Please try again.');
                        setLoading(false);
                    }
                })
                .catch(function (error) {
                    errorAlert(error.response.data.message);
                    setLoading(false);
                });
        }
    }

    return (
        <div className={profileStyles.profileContent}>
            <div className="row">
                <div className="col-11">
                    <p> Business Logo</p>
                    <Image src='/uploads/pic.png' width={100} height={100} />
                    <div className={profileStyles.circle}><span><Icon.PencilIcon className={profileStyles.editIcon} /></span></div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Business Information</h5>
                            <p>Store Banner</p>
                            <div className="d-flex flex-row">
                                <div className={merchantPageStyles.addImage}>
                                    <Icon.PlusCircleIcon width={25} height={25} style={{ float: 'right' }} />
                                </div>
                            </div>
                            <form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Business Name</label>
                                            <input type="text" className="form-control" name="firstName" value={name} onChange={event => setName(event.target.value)} />
                                            {name.length === 0 && <span className={profileStyles.error}>{nameError}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Business Email</label>
                                            <input type="email" className="form-control" name="email" value={email} onChange={event => setEmail(event.target.value)} />
                                            {email.length === 0 && <span className={profileStyles.error}>{emailError}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">State</label>
                                            <select className="form-control" name="state" value={state} onChange={event => setState(event.target.value)}>
                                                <option value={state || ''}>{state || 'Select State'}</option>
                                                {states && states.map((state: any) => <option value={state.name} key={state.id}>{state.name}</option>
                                                )}
                                            </select>
                                            {state && state.length === 0 && <span className={profileStyles.error}>{stateError}</span>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Country</label>
                                            <select className="form-control" name="country" value={country} onChange={event => setCountry(event.target.value)}>
                                            <option value={country || ''}>{country || 'Select Country'}</option>
                                                { countries && countries.map((country:any)=><option value={country} key={country}>{country}</option>
                                            )}         
                                            </select>
                                            {country && country.length === 0 && <span className={profileStyles.error}>{countryError}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Preparation Time</label>
                                            <select className="form-control" name="prepTime" value={prepTime} onChange={event => setPrepTime(event.target.value)}>
                                                <option value=''></option>
                                            </select>
                                        </div>
                                        {prepTime.length === 0 && <span className={profileStyles.error}>{prepTimeError}</span>}
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Opening Hours</label>
                                            <select className="form-control" name="openingHours" value={openingHours} onChange={event => setOpeningHours(event.target.value)}>
                                                <option value=''></option>
                                            </select>
                                            {openingHours.length === 0 && <span className={profileStyles.error}>{openingHoursError}</span>}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Closing Hours</label>
                                            <select className="form-control" name="closingHours" value={closingHours} onChange={event => setClosingHours(event.target.value)}>
                                                <option value=''></option>
                                            </select>
                                            {closingHours.length === 0 && <span className={profileStyles.error}>{closingHoursError}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Address</label>
                                            <textarea className="form-control" name="address" value={address} onChange={event => setAddress(event.target.value)}></textarea>
                                            {address && address.length === 0 && <span className={profileStyles.error}>{addressError}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Nearest Landmark</label>
                                            <input type="text" className="form-control" name="nearestLandmark" value={nearestLandmark} onChange={event => setNearestLandmark(event.target.value)} />
                                            {nearestLandmark && nearestLandmark.length === 0 && <span className={profileStyles.error}>{nearestLandmarkError}</span>}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3 mt-3 ml-3 mr-3">
                                {
                                    loading ? (<div className={profileStyles.updateButtonMerchant}>
                                        <p style={{ color: '#fff', fontSize: '16px', paddingTop: '10px' }}>Updating</p>
                                        <EllipseAnimation />
                                    </div>) : (<div className={profileStyles.updateButtonMerchant} onClick={(event) => handleSubmit(event)}>
                                        <p style={{ color: '#fff', fontSize: '16px', paddingTop: '10px', cursor: 'pointer' }}>Update</p>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MerchantBusinessInfo;
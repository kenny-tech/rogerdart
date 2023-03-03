import { NextPage } from "next";
import { useEffect, useState } from "react";
import { profileStyles } from "@src/styles";
import Image from "next/image";
import * as Icon from "@heroicons/react/outline";
import { PUBLIC_BASE_URL, UPDATE_PROFILE, GET_PROFILE_API_ROUTE } from '@src/services/routes';
import axios from "axios";
import { EllipseAnimation } from '@src/component';
import { successAlert, errorAlert } from "@src/services/alert";
import { states, countries } from "@src/constants";

const MerchantProfileInfo: NextPage = () => {

    const firstname:any  = sessionStorage.getItem("firstName");
    const lastname:any  = sessionStorage.getItem("lastName");
    const useremail:any  = sessionStorage.getItem("email");
    const phone:any  = sessionStorage.getItem("phoneNumber");
    const token = sessionStorage.getItem("merchantToken");

    const [firstName, setFirstName] = useState<string>(firstname);
    const [lastName, setLastName] = useState<string>(lastname);
    const [email, setEmail] = useState<string>(useremail);
    const [phoneNumber, setPhoneNumber] = useState<string>(phone);
    const [state, setState] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [address, setAddress] = useState('');
    const [nearestLandmark, setNearestLandmark] = useState<string>('');
    const [facebookLink, setFacebookLink] = useState<string>('');

    const [emailError, setEmailError] = useState<string>('');
    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    useEffect(() => {
        getProfile();
    }, [])

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setLoading(false);
        let emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if(email.length == 0){
            setEmailError('Email is required');
            setLoading(false);
        }  else if(emailValidator.test(email) === false){
            setEmailError(`${email} is not a valid email address`);
            setLoading(false);
        } else if (firstName.length == 0){
            setFirstNameError('First Name is required');
            setLoading(false);
        }  else if (lastName.length == 0){
            setLastNameError('Last Name is required');
            setLoading(false);
        }else{
            setLoading(true);
            let data = {
                firstName,
                lastName,
                email,
                phone: phoneNumber,
                state,
                country,
                address,
                landMark: nearestLandmark,
                facebookLink
            }

            axios.patch(`${PUBLIC_BASE_URL}${UPDATE_PROFILE}`, data,  {
                headers: headers
            })
            .then(function (response) {
                if(response.statusText) {
                    // console.log(response)
                    successAlert('Profile successfully updated');
                    setLoading(false);
                } else {
                    errorAlert('Unable to update your profile. Please try again.');
                }
            })
            .catch(function (error) {
                errorAlert(error.response.data.message);
                setLoading(false);
            });
        }
    }

    const getProfile = async () => {
        try {
            setLoading(true);
            await axios.get(`${PUBLIC_BASE_URL}${GET_PROFILE_API_ROUTE}`, {
                headers: headers
            })
            .then((response) => {
                console.log('Profile : ', response.data.data);
                setFirstName(response.data.data.firstName);
                setLastName(response.data.data.lastName);
                setEmail(response.data.data.email);
                setPhoneNumber(response.data.data.phone);
                setState(response.data.data.state);
                setCountry(response.data.data.country);
                setAddress(response.data.data.address);
                setNearestLandmark(response.data.data.landMark);
                setFacebookLink(response.data.data.facebookLink);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })  
        } catch (error) {
            console.log(error);
            setLoading(false);
        } 
    }


    return (
        <div className={profileStyles.profileContent}>
            <div className="row">
                <div className="col-11">
                <p> Profile Pic</p>
            <Image src='/uploads/pic.png' width={100} height={100} />
            <div className={profileStyles.circle}><span><Icon.PencilIcon className={profileStyles.editIcon}/></span></div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Basic Information</h5>
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-1 mt-3 ml-3 mr-3">
                                            <label className="form-label">First Name</label>
                                            <input type="text" className="form-control" name="firstName" value={firstName} onChange={event => setFirstName(event.target.value)}/>
                                        </div>
                                        {firstName.length === 0 && <span className={profileStyles.error}>{firstNameError}</span>}
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Last Name</label>
                                            <input type="text" className="form-control"  name="lastName"value={lastName} onChange={event => setLastName(event.target.value)}/>
                                        </div>
                                        {lastName.length === 0 && <span className={profileStyles.error}>{lastNameError}</span>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" name="email" value={email} onChange={event => setEmail(event.target.value)}/>
                                        </div>
                                        {emailError && <span className={profileStyles.error}>{emailError}</span>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Phone Number</label>
                                            <input type="text" className="form-control" name="phoneNumber" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">State</label>
                                            <select className="form-control" name="state" value={state} onChange={event => setState(event.target.value)}>
                                                <option value={state || ''}>{state || 'Select State'}</option>
                                                {states && states.map((state:any)=><option value={state.name} key={state.id}>{state.name}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Country</label>
                                            <select className="form-control"name="country" value={country} onChange={event => setCountry(event.target.value)}>
                                                <option value={country || ''}>{country || 'Select Country'}</option>
                                                { countries && countries.map((country:any)=><option value={country} key={country}>{country}</option>
                                            )}                                            
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Address</label>
                                            <textarea className="form-control" name="address" value={address} onChange={event => setAddress(event.target.value)}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Nearest Landmark</label>
                                            <input type="text" className="form-control" name="nearestLandmark" value={nearestLandmark} onChange={event => setNearestLandmark(event.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-1 mt-1 ml-3 mr-3">
                                            <label className="form-label">Facebook Link</label>
                                            <input type="text" className="form-control" name="facebookLink" value={facebookLink} onChange={event => setFacebookLink(event.target.value)}/>
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
                                    loading ? ( <div className={profileStyles.updateButtonMerchant}>
                                    <p style={{color: '#fff', fontSize: '16px', paddingTop: '10px'}}>Updating</p>
                                    <EllipseAnimation />
                                </div>   ) : ( <div className={profileStyles.updateButtonMerchant} onClick={(event) => handleSubmit(event)}>
                                    <p style={{color: '#fff', fontSize: '16px', paddingTop: '10px', cursor: 'pointer'}}>Update</p>
                                </div>   )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MerchantProfileInfo;
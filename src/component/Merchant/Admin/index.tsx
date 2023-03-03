import { NextPage } from "next";
import { useState } from "react";
import { merchantAdminStyles } from "@src/styles";
import RemoveAdminModal from "@src/component/Modal/admin";

const Administrator: NextPage = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('');

  const handleRemoveAdminModal = (type: string) => {
    setIsOpen(true);
    setType(type);
  }

    return (
        <>
          <div className={merchantAdminStyles.dottedBox}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '30px'}}>
                <div>
                  <p>japa@gmail.com</p>
                  <p style={{color: '#43495C'}}>Japa Japa</p>
                </div>
                <div>
                  <span className={merchantAdminStyles.label}>OWNER</span>
                </div>
            </div>
            <hr style={{width:'100%', height:'3px', backgroundColor: '#E0E0E0', border: 'none'}}/>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '30px'}}>
                <div>
                  <h5>Other administrators</h5>
                  <p>Invite admins to your store and manage them in one place</p>
                </div>
                <div className={merchantAdminStyles.button} onClick={() => handleRemoveAdminModal('Invite Admin')}>
                    <p className={merchantAdminStyles.buttonText}> + Invite admins </p>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '30px'}}>
                <div>
                  <p>japa@gmail.com</p>
                  <span className={merchantAdminStyles.label}>ONLINE</span>
                </div>
                <div className={merchantAdminStyles.buttonRemove}>
                    <p className={merchantAdminStyles.buttonTextRemove} onClick={() => handleRemoveAdminModal('Remove Admin')}> Remove admin </p>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '30px'}}>
                <div>
                  <p>japa@gmail.com</p>
                  <span className={merchantAdminStyles.label}>ONLINE</span>
                </div>
                <div className={merchantAdminStyles.buttonRemove}>
                    <p className={merchantAdminStyles.buttonTextRemove}> Remove admin </p>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '30px'}}>
                <div>
                  <p>japa@gmail.com</p>
                  <span className={merchantAdminStyles.label}>ONLINE</span>
                </div>
                <div className={merchantAdminStyles.buttonRemove}>
                    <p className={merchantAdminStyles.buttonTextRemove}> Remove admin </p>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '30px'}}>
                <div>
                  <p>japa@gmail.com</p>
                  <span className={merchantAdminStyles.label}>ONLINE</span>
                </div>
                <div className={merchantAdminStyles.buttonRemove}>
                    <p className={merchantAdminStyles.buttonTextRemove}> Remove admin </p>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '30px'}}>
                <div>
                  <p>japa@gmail.com</p>
                  <span className={merchantAdminStyles.label}>ONLINE</span>
                </div>
                <div className={merchantAdminStyles.buttonRemove}>
                    <p className={merchantAdminStyles.buttonTextRemove}> Remove admin </p>
                </div>
            </div>
          </div>
          {isOpen && <RemoveAdminModal setIsOpen={setIsOpen} type={type} />}

        </>
    )
}
export default Administrator;
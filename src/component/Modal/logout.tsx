import React from "react";
import { modalStyles } from "@src/styles";
import { useContext } from "react";
import AuthContext from "@src/services/authContext";

const Modal = ({ setIsOpen }:any) => {

  const { signOut  } = useContext(AuthContext);

    const handleSignout = () => {
      signOut();
    }

    return (
        <>
          <div className={modalStyles.darkBG} onClick={() => setIsOpen(false)} />
          <div className={modalStyles.center}>
            <div className={modalStyles.modalLogout}>
              <div className={modalStyles.modalHeader}>
                <h3 className={modalStyles.headingText}> Are you sure you want to Log Out?</h3>
              </div>
              {/* <button className={modalStyles.closeBtn} onClick={() => setIsOpen(false)}>
                <Icon.XIcon color={'grey'} width={15} height={15} style={{ marginBottom: "-3px" }}/>
              </button> */}
              <div className={modalStyles.modalContent}> 
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems :'center', marginLeft: '40px', marginRight: '40px'}}>
                      <p className={modalStyles.button}>
                        <span style={{color: '#E43225'}} onClick={() => setIsOpen(false)}>No, Cancel</span>
                      </p>   
                      <p className={modalStyles.button} onClick={() => handleSignout()}>
                        Yes, Log Out
                      </p>   
                    </div>
              </div>
            </div>
          </div>
        </>
      );
};

export default Modal;
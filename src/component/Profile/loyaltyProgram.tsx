import { NextPage } from "next";
import { profileStyles } from "@src/styles";

const LoyaltyProgram: NextPage = () => {

    return (
        <div className={profileStyles.profileContent}>
            <div className="row">
                <div className="col-11">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Enter Loyalty Code</h5>
                            <form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                            <label className="form-label">Partner Loyalty Program</label>
                                            <input type="text" className="form-control" name="email"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3 mt-3 ml-3 mr-3">
                                            <label className="form-label">Loyalty Code</label>
                                            <input type="text" className="form-control" name="email"/>
                                        </div>
                                    </div>
                                </div>
                            </form>  
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3 mt-3 ml-3 mr-3">
                                <div className={profileStyles.updateButton}>
                                    <p style={{color: '#fff', fontSize: '16px', paddingTop: '10px'}}>Update</p>
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoyaltyProgram;
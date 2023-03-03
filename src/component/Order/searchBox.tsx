import React from "react";
import { NextPage } from "next";
import * as Icon from "@heroicons/react/outline";
import { orderStyles } from "@src/styles";
import { orderStatus } from "@src/constants";

const SearchBox: NextPage = () => {

    return (
        <div className="row mt-3 mr-2 ml-2">
            <div className="col-md-4">
                <div className={orderStyles.searchInputDiv}>
                    <Icon.SearchIcon className={orderStyles.searchIcon}/>
                    <input placeholder='Search by food name or restaurant' type={'text'} name='address' className={orderStyles.searchInput} />
                </div>
            </div>
            <div className="col-md-4 mb-2">
                <select className="form-control">
                    {orderStatus && orderStatus.map((status:{
                            id: React.Key | number ;
                            name: string;
                        })=><option value={status.name} key={status.id}>{status.name}</option>
                    )}
                </select>
            </div>
            <div className="col-md-4">
                <select className="form-control">
                    <input placeholder='Sort by Date' type={'date'} name='date' className={orderStyles.searchInput} />
                </select>
            </div>
        </div>
    )
}

export default SearchBox;
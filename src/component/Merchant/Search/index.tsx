import { NextPage } from "next";
import { orderStyles } from "@src/styles";

const Search: NextPage = () => {
    return (
        <>
            <div className={orderStyles.searchDiv}>
                <input type="text" name="search" className={orderStyles.searchTextbox}/>
                <div className={orderStyles.searchButon}>
                    <p className={orderStyles.searchText}>Search</p>
                </div>
            </div>
        </>
    )
}
export default Search;
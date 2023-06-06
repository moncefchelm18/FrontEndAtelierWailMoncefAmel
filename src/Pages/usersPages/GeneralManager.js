import './CSS/page.css'
import {Link, Outlet} from "react-router-dom";
import VerticalMenu from "../../components/VerticalMenu";
import Header from "../../components/Header";
import Content from "../../components/Content";
import React, {useState} from "react";
import {SearchValueContext} from "./Admin";
const GeneralManager = (props) => {
    const [searchValue, setSearchValue] = useState('');
    return(
        <div className="app-container">
            <VerticalMenu displayGeneralManagerMenu={true} />
            <div className="main-container">
                <Header notificationMessages={[]} searchValue={(value) => setSearchValue(value)}/>
                <div className="content">
                    <SearchValueContext.Provider value={searchValue}>
                        <Outlet/>
                    </SearchValueContext.Provider>
                </div>
            </div>
        </div>
    );
}
export default GeneralManager;
import './CSS/page.css';
import VerticalMenu from "../../components/VerticalMenu";
import Header from "../../components/Header";
import {Outlet, useNavigate} from "react-router-dom";
import React, {createContext, useState} from "react";
import DashboardAdmin from "../../components/AdminComponents/DashboardAdmin";

export const SearchValueContext = createContext('');

const Admin = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [menuAppear, setMenuAppear] = useState(true);
    const handleMenuAppear = () => {
        setMenuAppear(!menuAppear)
    }

    return (
        <div className="app-container">
            {menuAppear &&
                <VerticalMenu displayAdminMenu={true} />
            }
            <div className="main-container">
                <Header
                    notificationMessages={[]}
                    searchValue={(value) => setSearchValue(value)}
                    menuAppear={handleMenuAppear}
                />
                {/*{searchValue}*/}
                <div className="content">
                    <SearchValueContext.Provider value={searchValue}>
                        <Outlet/>
                    </SearchValueContext.Provider>
                </div>
            </div>
        </div>
    );
};
export default Admin;
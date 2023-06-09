import './CSS/page.css'
import {Link, Outlet} from "react-router-dom";
import VerticalMenu from "../../components/VerticalMenu";
import Header from "../../components/Header";
import Content from "../../components/Content";
import React, {useEffect, useState} from "react";
import {SearchValueContext} from "./Admin";
const GeneralManager = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [menuAppear, setMenuAppear] = useState(true);

    const handleMenuToggle = () => {
        setMenuAppear(!menuAppear);
    };
    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth < 1024) {
                setMenuAppear(false);
            } else {
                setMenuAppear(true);
            }
        };

        window.addEventListener("resize", handleWindowResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);
    return(
        <div className="app-container">
            {menuAppear &&
                <VerticalMenu displayGeneralManagerMenu={true} />
            }
            <div className="main-container">
                <Header
                    notificationMessages={[]}
                    searchValue={(value) => setSearchValue(value)}
                    menuAppear={handleMenuToggle}
                />
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
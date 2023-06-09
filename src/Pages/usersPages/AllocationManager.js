import './CSS/page.css'
import {Link, Outlet} from "react-router-dom";
import VerticalMenu from "../../components/VerticalMenu";
import Header from "../../components/Header";
import Content from "../../components/Content";
import React, {useEffect, useState} from "react";
import {SearchValueContext} from "./Admin";
import axios from "axios";
const AllocationManager = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [notificationMessages, setNotificationMessages] = useState([]);
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

    useEffect(() => {
        // Fetch notification messages from the API endpoint
        axios.get('http://172.20.10.4:8000/notificationstd')
            .then((response) => {
                setNotificationMessages(response.data);
                console.log(response.data)
                console.log(notificationMessages)
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }, []);
    return(
        <div className="app-container">
            {menuAppear &&
                <VerticalMenu displayAllocationManagerMenu={true} />
            }
            <div className="main-container">
                <Header
                    notificationMessages={notificationMessages.reverse()}
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
export default AllocationManager;
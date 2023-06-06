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

    useEffect(() => {
        // Fetch notification messages from the API endpoint
        axios.get('http://127.0.0.1:8000/notificationstd')
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
            <VerticalMenu displayAllocationManagerMenu={true} />
            <div className="main-container">
                <Header notificationMessages={notificationMessages} searchValue={(value) => setSearchValue(value)}/>
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
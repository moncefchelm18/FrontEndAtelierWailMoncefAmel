import './CSS/page.css'
import {Link, Outlet} from "react-router-dom";
import VerticalMenu from "../../components/VerticalMenu";
import Header from "../../components/Header";
import Content from "../../components/Content";
import React, {useEffect, useState} from "react";
import {SearchValueContext} from "./Admin";
import axios from "axios";
import {useCookies} from "react-cookie";
const Researcher = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [notificationMessages, setNotificationMessages] = useState([]);
    const [connectedUserEmail, setConnectedUserEmail] = useState(null);
    const [cookies] = useCookies(['token']);
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
        axios.get('http://172.20.10.4:8000/notificationmng')
            .then((response) => {
                const filteredNotificationMessages = response.data.filter()
                setNotificationMessages(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }, []);
    // to get connected user email
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://172.20.10.4:8000/connecteduser/', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${cookies.token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log(userData);
                    setConnectedUserEmail(userData.email);
                } else {
                    console.error('Failed to fetch user info:', response.statusText);
                }
            } catch (error) {
                console.error('Error occurred while fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [cookies.token]);

    useEffect(() => {
        const fetchNotificationMessages = async () => {
            try {
                const response = await axios.get('http://172.20.10.4:8000/notificationmng');
                console.log(response.data);
                console.log(connectedUserEmail);
                const filteredMessages = response.data.filter(
                    (message) => message.reciever === connectedUserEmail
                );
                setNotificationMessages(filteredMessages);
                console.log(filteredMessages);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        if (connectedUserEmail) {
            fetchNotificationMessages();
        }
    }, [connectedUserEmail]);

    return(
        <div className="app-container">
            {menuAppear &&
                <VerticalMenu displayResearcherMenu={true} />
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
export default Researcher;
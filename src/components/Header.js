import './CSS/header.css';
import './CSS/equipmentTable.css';
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import InfosTable from "./Tables/InfosTable";
import EquipmentTableHeader from "./EquipmentTableHeader";
import EquipmentTableFooter from "./EquipmentTableFooter";
import axios from "axios";
import {Link} from "react-router-dom";

const Header = (props) => {
    const [cookies] = useCookies(['token']);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [showNotificationBar, setShowNotificationBar] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [notificationMessages, setNotificationMessages] = useState([]);
    const [notificationCount, setNotificationCount] = useState(notificationMessages.length);
    const [userImage, setUserImage] = useState(null);
    const [menuAppear, setMenuAppear] = useState(false);
    const [userDatas, setUserDatas] = useState(false);



    const columnMappings = {
        // "ID": "id",
        "Message": "message",
        // "By": "reciever",
    };
    const columnTitles = Object.keys(columnMappings);
    // console.log(notificationMessages)
    useEffect(() => {
        setNotificationMessages(props.notificationMessages);
    }, [props.notificationMessages]);

    console.log(notificationMessages)
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://172.20.10.4:8000/connecteduser/', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${cookies.token}` // Assuming you have access to cookies containing the token
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log(userData);
                    setFirstName(userData.name);
                    setLastName(userData.lastname);
                    setUserImage(userData.image)
                } else {
                    console.error('Failed to fetch user info:', response.statusText);
                }
            } catch (error) {
                console.error('Error occurred while fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [cookies.token, ]);

    const handleAction = (notification) => {
        return(
            <>
                <button className="action-button" onClick={() => handleDelete(notification)}>
                    <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.96872 2.3C6.96872 1.69 7.22364 1.10499 7.67741 0.673654C8.13118 0.242321 8.74661 0 9.38834 0H16.6472C17.2889 0 17.9043 0.242321 18.3581 0.673654C18.8119 1.10499 19.0668 1.69 19.0668 2.3V4.6H23.906C24.2269 4.6 24.5346 4.72116 24.7615 4.93683C24.9884 5.15249 25.1158 5.445 25.1158 5.75C25.1158 6.055 24.9884 6.34751 24.7615 6.56317C24.5346 6.77884 24.2269 6.9 23.906 6.9H22.6128L21.5638 20.8633C21.5204 21.4436 21.2472 21.9866 20.7994 22.3831C20.3515 22.7796 19.7623 23 19.1503 23H6.88403C6.27204 23 5.68277 22.7796 5.23493 22.3831C4.78708 21.9866 4.51392 21.4436 4.47047 20.8633L3.42398 6.9H2.12949C1.80863 6.9 1.50091 6.77884 1.27402 6.56317C1.04714 6.34751 0.919678 6.055 0.919678 5.75C0.919678 5.445 1.04714 5.15249 1.27402 4.93683C1.50091 4.72116 1.80863 4.6 2.12949 4.6H6.96872V2.3ZM9.38834 4.6H16.6472V2.3H9.38834V4.6ZM5.84844 6.9L6.88524 20.7H19.1515L20.1883 6.9H5.84844ZM10.5981 9.2C10.919 9.2 11.2267 9.32116 11.4536 9.53683C11.6805 9.75249 11.808 10.045 11.808 10.35V17.25C11.808 17.555 11.6805 17.8475 11.4536 18.0632C11.2267 18.2788 10.919 18.4 10.5981 18.4C10.2773 18.4 9.96957 18.2788 9.74268 18.0632C9.5158 17.8475 9.38834 17.555 9.38834 17.25V10.35C9.38834 10.045 9.5158 9.75249 9.74268 9.53683C9.96957 9.32116 10.2773 9.2 10.5981 9.2ZM15.4374 9.2C15.7582 9.2 16.066 9.32116 16.2928 9.53683C16.5197 9.75249 16.6472 10.045 16.6472 10.35V17.25C16.6472 17.555 16.5197 17.8475 16.2928 18.0632C16.066 18.2788 15.7582 18.4 15.4374 18.4C15.1165 18.4 14.8088 18.2788 14.5819 18.0632C14.355 17.8475 14.2276 17.555 14.2276 17.25V10.35C14.2276 10.045 14.355 9.75249 14.5819 9.53683C14.8088 9.32116 15.1165 9.2 15.4374 9.2Z"
                            fill="#E01515"/>
                    </svg>
                </button>
            </>
        )
    }
    const handleDelete = async (notification) => {
        try {
            await axios.delete(`http://172.20.10.4:8000/notificationstd/${notification.id}`);
            setNotificationMessages(prevMessages => prevMessages.filter(msg => msg.id !== notification.id));
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };
    // forSearching
    const handleSearchInputChange = (event) => {
        const searchValue = event.target.value;
        setSearchValue(searchValue);
        props.searchValue(searchValue)
    };
    const handleSearchIconClick = () => {
        setSearchVisible(!searchVisible);
        setSearchValue('');
    };

    // notificationCount
    useEffect(() => {
        setNotificationCount(notificationMessages.length);
    }, [notificationMessages]);


    // for footer table
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const totalPages = Math.ceil(props.notificationMessages.length / 10);
    const handleMenuAppear = () => {
        setMenuAppear(!menuAppear)
        props.menuAppear(menuAppear)
    }


    return (
        <header className="header">
            <div className="header-infos">
                <div style={{cursor: 'pointer'}} onClick={handleMenuAppear}>
                    <svg width="40" height="40" viewBox="0 0 459 322" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 23H229.426H435.852M23 160.617H435.852M23 298.235H435.852" stroke="black" stroke-width="45.8724" stroke-linecap="round"/>
                    </svg>

                </div>
                <h1 className="title">Welcome, {firstName} {lastName}</h1>
            </div>
            <div className="header-items">
                <div style={{cursor: 'pointer'}} className="action-button" onClick={handleSearchIconClick}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.4064 2.60026C8.33643 2.60026 6.35125 3.42259 4.88757 4.88636C3.42389 6.35013 2.6016 8.33542 2.6016 10.4055C2.6016 12.4756 3.42389 14.4609 4.88757 15.9246C6.35125 17.3884 8.33643 18.2107 10.4064 18.2107C12.4764 18.2107 14.4615 17.3884 15.9252 15.9246C17.3889 14.4609 18.2112 12.4756 18.2112 10.4055C18.2112 8.33542 17.3889 6.35013 15.9252 4.88636C14.4615 3.42259 12.4764 2.60026 10.4064 2.60026ZM6.42806e-08 10.4055C0.00023717 8.74931 0.395727 7.11708 1.1536 5.64449C1.91147 4.17189 3.00984 2.90145 4.35742 1.93874C5.705 0.976041 7.26288 0.34888 8.90157 0.109386C10.5403 -0.130109 12.2124 0.0249779 13.7792 0.561758C15.3459 1.09854 16.7618 2.00151 17.9094 3.19563C19.057 4.38974 19.903 5.84052 20.3771 7.42738C20.8513 9.01424 20.9399 10.6914 20.6356 12.3194C20.3313 13.9473 19.6428 15.4792 18.6274 16.7876L25.6348 23.7954C25.8718 24.0407 26.0029 24.3693 26 24.7104C25.997 25.0515 25.8602 25.3778 25.619 25.619C25.3778 25.8602 25.0516 25.997 24.7105 26C24.3694 26.0029 24.0409 25.8718 23.7955 25.6348L16.7881 18.627C15.2499 19.8213 13.4074 20.5601 11.4701 20.7591C9.53292 20.9582 7.5787 20.6097 5.82972 19.7532C4.08074 18.8966 2.60718 17.5665 1.5766 15.914C0.546022 14.2616 -0.00021635 12.353 6.42806e-08 10.4055Z"
                            fill="#0D0D0D"/>
                    </svg>
                </div>
                {searchVisible && (
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchInputChange}
                        className={'add-form-input-input'}
                        placeholder="Enter your search query"
                        // onMouseOut={() => setSearchVisible(false)}
                    />
                )}

                <div className="action-button" onClick={() => setShowNotificationBar(!showNotificationBar)}>
                    <svg style={{position: 'relative', display: 'inline-block'}} width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.322 1.68716C10.5379 1.18867 10.9081 0.761772 11.3852 0.46118C11.8623 0.160588 12.4246 0 13 0C13.5754 0 14.1377 0.160588 14.6148 0.46118C15.0919 0.761772 15.4621 1.18867 15.678 1.68716C17.8139 2.23612 19.6979 3.42518 21.0407 5.0717C22.3836 6.71823 23.1108 8.73118 23.1109 10.8014V17.1417L25.7571 20.8511C25.9023 21.0544 25.9856 21.2907 25.9983 21.5348C26.011 21.7789 25.9525 22.0216 25.8292 22.2371C25.7058 22.4526 25.5221 22.6327 25.2978 22.7583C25.0735 22.8839 24.8169 22.9502 24.5554 22.9501H18.0049C17.831 24.0747 17.2294 25.1031 16.3102 25.8468C15.391 26.5906 14.2159 27 13 27C11.7841 27 10.609 26.5906 9.68982 25.8468C8.77065 25.1031 8.169 24.0747 7.99508 22.9501H1.44464C1.18313 22.9502 0.926528 22.8839 0.702192 22.7583C0.477856 22.6327 0.294207 22.4526 0.17084 22.2371C0.0474723 22.0216 -0.0109859 21.7789 0.00170131 21.5348C0.0143885 21.2907 0.0977453 21.0544 0.242879 20.8511L2.88906 17.1417V10.8014C2.88906 6.44946 6.03789 2.78324 10.322 1.68716ZM10.9576 22.9501C11.1068 23.3452 11.3834 23.6872 11.7493 23.9292C12.1152 24.1711 12.5525 24.3011 13.0007 24.3011C13.449 24.3011 13.8862 24.1711 14.2521 23.9292C14.6181 23.6872 14.8947 23.3452 15.0439 22.9501H10.9561H10.9576ZM13 4.05211C11.0846 4.05211 9.24761 4.76319 7.8932 6.02893C6.5388 7.29467 5.7779 9.01138 5.7779 10.8014V17.5507C5.77796 17.8173 5.69352 18.078 5.53523 18.2999L4.14426 20.2504H21.8543L20.4633 18.2999C20.3055 18.0779 20.2216 17.8172 20.2221 17.5507V10.8014C20.2221 9.01138 19.4612 7.29467 18.1068 6.02893C16.7524 4.76319 14.9154 4.05211 13 4.05211Z"
                            fill="#0D0D0D"
                        />

                    </svg>
                    {notificationCount > 0 && (
                        <div className="notification-count" style={{ zIndex: '999' }}>
                            {notificationCount > 99 ? '99+' : notificationCount < 10 ? `0${notificationCount}` : notificationCount}
                        </div>
                    )}
                </div>
                {showNotificationBar && (
                    <>
                        <div className="overlay" onClick={() => setShowNotificationBar(!showNotificationBar)}/>
                        <div className="notification" >
                            {/*{props.notificationMessages.map(not => not.message)}*/}
                            <InfosTable
                                columnTitles={columnTitles}
                                columnMappings={columnMappings}
                                data={notificationMessages}
                                currentPage={currentPage}
                                actionRenderer={(notification) => handleAction(notification)}
                                // isInventoryAdmin={true}
                                searchValue={''}
                            />
                            <EquipmentTableFooter
                                currentPage={currentPage}
                                handleNextPage={handleNextPage}
                                handlePrevPage={handlePrevPage}
                                totalPages={totalPages}
                            />
                        </div>
                    </>
                )}
                <Link to="myaccount">
                    <div className="header-user-icon">
                        {userImage ? (
                            <img src={`http://172.20.10.4:8000${userImage}`} alt="User" style={{borderRadius: '100%'}} />
                        ) : (
                            <img src="https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png" alt="User" />
                        )}
                    </div>
                </Link>
            </div>
        </header>
    );
}
export default Header;
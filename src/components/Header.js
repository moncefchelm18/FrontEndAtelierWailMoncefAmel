import './CSS/header.css';
import './CSS/equipmentTable.css';
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";

const Header = (props) => {
    const [cookies] = useCookies(['token']);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/connecteduser/', {
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
                } else {
                    console.error('Failed to fetch user info:', response.statusText);
                }
            } catch (error) {
                console.error('Error occurred while fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [cookies.token]);

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
    return (
        <header className="header">
            <h1 className="title">Welcome, {firstName} {lastName}</h1>
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

                <div className="action-button">
                    <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.322 1.68716C10.5379 1.18867 10.9081 0.761772 11.3852 0.46118C11.8623 0.160588 12.4246 0 13 0C13.5754 0 14.1377 0.160588 14.6148 0.46118C15.0919 0.761772 15.4621 1.18867 15.678 1.68716C17.8139 2.23612 19.6979 3.42518 21.0407 5.0717C22.3836 6.71823 23.1108 8.73118 23.1109 10.8014V17.1417L25.7571 20.8511C25.9023 21.0544 25.9856 21.2907 25.9983 21.5348C26.011 21.7789 25.9525 22.0216 25.8292 22.2371C25.7058 22.4526 25.5221 22.6327 25.2978 22.7583C25.0735 22.8839 24.8169 22.9502 24.5554 22.9501H18.0049C17.831 24.0747 17.2294 25.1031 16.3102 25.8468C15.391 26.5906 14.2159 27 13 27C11.7841 27 10.609 26.5906 9.68982 25.8468C8.77065 25.1031 8.169 24.0747 7.99508 22.9501H1.44464C1.18313 22.9502 0.926528 22.8839 0.702192 22.7583C0.477856 22.6327 0.294207 22.4526 0.17084 22.2371C0.0474723 22.0216 -0.0109859 21.7789 0.00170131 21.5348C0.0143885 21.2907 0.0977453 21.0544 0.242879 20.8511L2.88906 17.1417V10.8014C2.88906 6.44946 6.03789 2.78324 10.322 1.68716ZM10.9576 22.9501C11.1068 23.3452 11.3834 23.6872 11.7493 23.9292C12.1152 24.1711 12.5525 24.3011 13.0007 24.3011C13.449 24.3011 13.8862 24.1711 14.2521 23.9292C14.6181 23.6872 14.8947 23.3452 15.0439 22.9501H10.9561H10.9576ZM13 4.05211C11.0846 4.05211 9.24761 4.76319 7.8932 6.02893C6.5388 7.29467 5.7779 9.01138 5.7779 10.8014V17.5507C5.77796 17.8173 5.69352 18.078 5.53523 18.2999L4.14426 20.2504H21.8543L20.4633 18.2999C20.3055 18.0779 20.2216 17.8172 20.2221 17.5507V10.8014C20.2221 9.01138 19.4612 7.29467 18.1068 6.02893C16.7524 4.76319 14.9154 4.05211 13 4.05211Z"
                            fill="#0D0D0D"/>
                    </svg>
                </div>
                <div className="header-user-icon">
                    <img
                        src="https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png"/>
                </div>
            </div>
        </header>
    );
}
export default Header;
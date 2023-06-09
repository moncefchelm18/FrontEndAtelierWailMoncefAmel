import Path from "../Path";
import EquipmentTableHeader from "../EquipmentTableHeader";
import React, {Fragment, useEffect, useState} from "react";
import UsersForm from "./Forms/UsersForm";
import EquipmentTableFooter from "../EquipmentTableFooter";
import InfosTable from "../Tables/InfosTable";
import {useCookies} from "react-cookie";
import {SearchValueContext} from "../../Pages/usersPages/Admin";
import DeleteConfirmation from "../AdminComponents/Forms/DeleteConfirmation";
import ManagersForm from "../AdminComponents/Forms/ManagersForm";

const UsersAllocationManager = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null)
    const [updateMessage, setUpdateMessage] = useState(null);
    const [cookies] = useCookies(['token']);
    const [searchValueState, setSearchValueState] = useState('');

    const columnMappings = {
        "ID": "id",
        "IMG": "image",
        "Firstname":"name",
        "Lastname":"lastname",
        "Email":"email",
        // "Password":"password",
        "Role":"role",
        "Phone":"phonenumber",
        "National ID":"national_card_number",
        "Address":"address"
    };
    const columnTitles = Object.keys(columnMappings);
    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await fetch('http://172.20.10.4:8000/profiles/users/', {
                    headers: {
                        Authorization: `Token ${cookies.token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const filteredUsers = data.filter(
                        (user) =>
                            user.role === 'RESEARCHER' || user.role === 'STUDENT'
                    );
                    setUsersData(filteredUsers);
                } else {
                    // Handle error response
                    console.log('Error:', response.status);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchUsersData();
    }, [cookies.token, usersData]);
    const handleAction = (user) => {
        return(
            <>
                <button onClick={() => {
                    setUserToDelete(user.id);
                    setShowDeleteConfirmation(true);
                }} className="action-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.15778 2.71025C6.15778 2.08315 6.40237 1.48173 6.83774 1.03831C7.27312 0.594879 7.86361 0.345764 8.47932 0.345764H15.4439C16.0596 0.345764 16.6501 0.594879 17.0855 1.03831C17.5209 1.48173 17.7655 2.08315 17.7655 2.71025V5.07474H22.4085C22.7164 5.07474 23.0116 5.19929 23.2293 5.42101C23.447 5.64272 23.5693 5.94343 23.5693 6.25698C23.5693 6.57053 23.447 6.87124 23.2293 7.09295C23.0116 7.31466 22.7164 7.43922 22.4085 7.43922H21.1677L20.1613 21.794C20.1196 22.3906 19.8575 22.9488 19.4278 23.3564C18.9981 23.764 18.4327 23.9906 17.8456 23.9906H6.07653C5.48934 23.9906 4.92396 23.764 4.49427 23.3564C4.06457 22.9488 3.80249 22.3906 3.7608 21.794L2.75673 7.43922H1.51471C1.20686 7.43922 0.91161 7.31466 0.693924 7.09295C0.476238 6.87124 0.353943 6.57053 0.353943 6.25698C0.353943 5.94343 0.476238 5.64272 0.693924 5.42101C0.91161 5.19929 1.20686 5.07474 1.51471 5.07474H6.15778V2.71025ZM8.47932 5.07474H15.4439V2.71025H8.47932V5.07474ZM5.08291 7.43922L6.07769 21.6261H17.8467L18.8415 7.43922H5.08291ZM9.64009 9.80371C9.94794 9.80371 10.2432 9.92827 10.4609 10.15C10.6786 10.3717 10.8009 10.6724 10.8009 10.986V18.0794C10.8009 18.393 10.6786 18.6937 10.4609 18.9154C10.2432 19.1371 9.94794 19.2617 9.64009 19.2617C9.33223 19.2617 9.03698 19.1371 8.8193 18.9154C8.60161 18.6937 8.47932 18.393 8.47932 18.0794V10.986C8.47932 10.6724 8.60161 10.3717 8.8193 10.15C9.03698 9.92827 9.33223 9.80371 9.64009 9.80371ZM14.2832 9.80371C14.591 9.80371 14.8863 9.92827 15.1039 10.15C15.3216 10.3717 15.4439 10.6724 15.4439 10.986V18.0794C15.4439 18.393 15.3216 18.6937 15.1039 18.9154C14.8863 19.1371 14.591 19.2617 14.2832 19.2617C13.9753 19.2617 13.6801 19.1371 13.4624 18.9154C13.2447 18.6937 13.1224 18.393 13.1224 18.0794V10.986C13.1224 10.6724 13.2447 10.3717 13.4624 10.15C13.6801 9.92827 13.9753 9.80371 14.2832 9.80371Z" fill="#E01515"/>
                    </svg>
                </button>
            </>

        )
    };
    const handleDelete = (id) => {
        fetch(`http://172.20.10.4:8000/profiles/users/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${cookies.token}` // Assuming you have access to cookies containing the token
            },
        })
            .then(response => {
                if (response.ok) {
                    console.log(response)
                    console.log('User deleted successfully');
                } else {
                    console.error('Error deleting user:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Request failed:', error);
            });
    }

    const handleAddClick = () => {
        setShowForm(true); // show form when Add button is clicked
    }
    const handleCancelForm = () =>{
        setShowDeleteConfirmation(false);
        setShowForm(false)
    }
    // for-bottom-table-handle-pages
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const totalPages = Math.ceil(usersData.length / 10);
    return(
        <>
            <Path pathName={'Users'}/>
            <SearchValueContext.Consumer>
                {(searchValue) => {
                    setSearchValueState(searchValue);
                    return ;
                }}
            </SearchValueContext.Consumer>
            <div className="inventory-table">
                <EquipmentTableHeader
                    title={'List of users'}
                    // buttonName2={'Add user'}
                    className3={'add-button'}
                    buttonName2={'Add user'}
                    isAddButton={true}
                    onClicks={handleAddClick}
                />
                {showForm &&
                    <Fragment>
                        <div onClick={handleCancelForm} className="overlay" />
                        <UsersForm handleCancelForm={handleCancelForm}/>
                    </Fragment>
                }
                {showDeleteConfirmation &&
                    <>
                        <div onClick={handleCancelForm} className="overlay" />
                        <DeleteConfirmation
                            onCancel={handleCancelForm}
                            onDelete={() => {
                                handleDelete(userToDelete);
                                setUpdateMessage(
                                    <p style={{color: "red", paddingLeft: "20px", paddingTop: "10px"}}>
                                        Manager deleted successfully!
                                    </p>
                                );
                                setShowDeleteConfirmation(false);
                            }}
                        />
                    </>
                }
                <InfosTable
                    currentPage={currentPage}
                    columnTitles={columnTitles}
                    columnMappings={columnMappings}
                    data={usersData}
                    actionRenderer={(users) => handleAction(users)}
                    searchValue={searchValueState}
                />
                <EquipmentTableFooter
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    totalPages={totalPages}
                />
            </div>

        </>
    )
}
export default UsersAllocationManager;
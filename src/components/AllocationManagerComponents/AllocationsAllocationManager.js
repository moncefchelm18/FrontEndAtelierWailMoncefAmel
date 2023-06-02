import React, {useEffect} from 'react';
import Path  from "../Path";
import '../AdminComponents/CSS/dashboardAdmin.css';
import EquipmentTableFooter from "../EquipmentTableFooter";
import InfosTable from "../Tables/InfosTable";
import { useState } from "react";
import EquipmentTableHeader from "../EquipmentTableHeader";
import {SearchValueContext} from "../../Pages/usersPages/Admin";
import axios from "axios";
import {useCookies} from "react-cookie";


const AllocationsHeader = (props) => {
    return (
        <div className="allocations-header" onClick={props.onClick}>
            {props.children}
        </div>
    )
}
const AllocationsAllocationManager = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValueState, setSearchValueState] = useState('');
    const [showAllocationsTable, setShowAllocationsTable] = useState(false);
    const [hideCurrentAllocationsTable, setHideCurrentAllocationsTable] = useState(true);
    const [activeEquipmentData, setActiveEquipmentData] = useState([]);
    const [pendingEquipmentData, setPendingEquipmentData] = useState([]);
    const [cookies] = useCookies(['token']);

    const columnMappings = {
        "ID": "id",
        "Reserved by": "Reserved_by",
        "Name": "reference_details.name",
        "Brand": "reference_details.brand",
        "Model": "reference_details.model",
        "Reference": "reference",
        /*"First Name": "firstname",
        "Last Name": "lastname",
        "Role": "role",*/
        "Start Date": "start_date",
        "Finish Date": "finish_date",
        "Status": "status",
        "Purpose": "purpose"
    };
    const columnTitles = Object.keys(columnMappings);

    // to get users data
    useEffect(() => {
        const fetchAllocationsData = async () => {
            try {
                // Fetch the users' data
                const usersResponse = await fetch('http://127.0.0.1:8000/profiles/users/', {
                    headers: {
                        Authorization: `Token ${cookies.token}`,
                    },
                });

                if (usersResponse.ok) {
                    const usersData = await usersResponse.json();
                    const filteredUsers = usersData.filter(
                        (user) => user.role === 'RESEARCHER' || user.role === 'STUDENT'
                    );

                    // Fetch the equipment data from the API
                    const allocationsResponse = await axios.get('http://127.0.0.1:8000/allocate/');
                    const allocationsData = allocationsResponse.data;
                    console.log(allocationsData)
                    // Filter and map the data to include only "Active" allocations and user details
                    const activeAllocations = allocationsData.filter((allocation) => allocation.status === 'Active');
                    const activeEquipmentData = activeAllocations.map((allocation) => {
                        const reservedByUser = filteredUsers.find((user) => user.id === allocation.Reserved_by);
                        return {
                            ...allocation,
                            Reserved_by: `${reservedByUser.name} ${reservedByUser.lastname} (${reservedByUser.role})`,
                        };
                    });

                    setActiveEquipmentData(activeEquipmentData);

                    // Filter and map the data to include only "Pending" allocations and user details
                    const pendingAllocations = allocationsData.filter((allocation) => allocation.status === 'panding');
                    console.log(pendingAllocations)
                    const pendingEquipmentData = pendingAllocations.map((allocation) => {
                        const reservedByUser = filteredUsers.find((user) => user.id === allocation.Reserved_by);
                        return {
                            ...allocation,
                            Reserved_by: `${reservedByUser.name} ${reservedByUser.lastname} (${reservedByUser.role})`,
                        };
                    });

                    setPendingEquipmentData(pendingEquipmentData);
                } else {
                    // Handle error response for fetching users' data
                    console.log('Error:', usersResponse.status);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchAllocationsData();
    }, [cookies.token]);

    const handleAction = (allocation) => {
        return (
            <>
                <button className="action-button" onDoubleClick={() => handleAccept(allocation)}>
                    <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M28.87 0.39707C29.1828 0.67394 29.3723 1.063 29.3969 1.47877C29.4215 1.89454 29.2791 2.30301 29.0011 2.61445L12.1487 21.4724C12.0005 21.6383 11.8186 21.7711 11.615 21.862C11.4115 21.953 11.1908 22 10.9677 22C10.7445 22 10.5239 21.953 10.3203 21.862C10.1167 21.7711 9.93485 21.6383 9.78662 21.4724L1.36043 12.0434C1.09834 11.7298 0.969058 11.3272 0.999903 10.9206C1.03075 10.514 1.2193 10.1352 1.52573 9.86426C1.83216 9.59335 2.23248 9.45151 2.6421 9.46872C3.05173 9.48592 3.43859 9.66083 3.72096 9.95648L10.9669 18.0638L26.6406 0.525933C26.9192 0.215021 27.3104 0.0268115 27.7285 0.00264944C28.1465 -0.0215126 28.557 0.120348 28.87 0.39707Z"
                            fill="#10A760"/>
                    </svg>
                </button>
                <button className="action-button" onDoubleClick={() => handleRefuse(allocation)}>
                    <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.96872 2.3C6.96872 1.69 7.22364 1.10499 7.67741 0.673654C8.13118 0.242321 8.74661 0 9.38834 0H16.6472C17.2889 0 17.9043 0.242321 18.3581 0.673654C18.8119 1.10499 19.0668 1.69 19.0668 2.3V4.6H23.906C24.2269 4.6 24.5346 4.72116 24.7615 4.93683C24.9884 5.15249 25.1158 5.445 25.1158 5.75C25.1158 6.055 24.9884 6.34751 24.7615 6.56317C24.5346 6.77884 24.2269 6.9 23.906 6.9H22.6128L21.5638 20.8633C21.5204 21.4436 21.2472 21.9866 20.7994 22.3831C20.3515 22.7796 19.7623 23 19.1503 23H6.88403C6.27204 23 5.68277 22.7796 5.23493 22.3831C4.78708 21.9866 4.51392 21.4436 4.47047 20.8633L3.42398 6.9H2.12949C1.80863 6.9 1.50091 6.77884 1.27402 6.56317C1.04714 6.34751 0.919678 6.055 0.919678 5.75C0.919678 5.445 1.04714 5.15249 1.27402 4.93683C1.50091 4.72116 1.80863 4.6 2.12949 4.6H6.96872V2.3ZM9.38834 4.6H16.6472V2.3H9.38834V4.6ZM5.84844 6.9L6.88524 20.7H19.1515L20.1883 6.9H5.84844ZM10.5981 9.2C10.919 9.2 11.2267 9.32116 11.4536 9.53683C11.6805 9.75249 11.808 10.045 11.808 10.35V17.25C11.808 17.555 11.6805 17.8475 11.4536 18.0632C11.2267 18.2788 10.919 18.4 10.5981 18.4C10.2773 18.4 9.96957 18.2788 9.74268 18.0632C9.5158 17.8475 9.38834 17.555 9.38834 17.25V10.35C9.38834 10.045 9.5158 9.75249 9.74268 9.53683C9.96957 9.32116 10.2773 9.2 10.5981 9.2ZM15.4374 9.2C15.7582 9.2 16.066 9.32116 16.2928 9.53683C16.5197 9.75249 16.6472 10.045 16.6472 10.35V17.25C16.6472 17.555 16.5197 17.8475 16.2928 18.0632C16.066 18.2788 15.7582 18.4 15.4374 18.4C15.1165 18.4 14.8088 18.2788 14.5819 18.0632C14.355 17.8475 14.2276 17.555 14.2276 17.25V10.35C14.2276 10.045 14.355 9.75249 14.5819 9.53683C14.8088 9.32116 15.1165 9.2 15.4374 9.2Z"
                            fill="#E01515"/>
                    </svg>
                </button>
            </>
        );
    };
    const handleAccept = (allocation) => {
        const data = {
            id: null,
            request: allocation.id,
            accept: true
        };
        const config = {
            headers: {
                Authorization: `Token ${cookies.token}`
            }
        };

        axios
            .post('http://127.0.0.1:8000/acceptrequest/', data, config)
            .then((response) => {
                console.log('Success:', response.data);
            })
            .catch((error) => {
                console.log('Error:', error.response);
            });
    };
    const handleRefuse = (allocation) => {
        // console.log(allocation)
        const data = {
            id: null,
            request: allocation.id,
            accept: false
        }
        const config = {
            headers: {
                Authorization: `Token ${cookies.token}`
            }
        };
        console.log(data)
        axios
            .post('http://127.0.0.1:8000/acceptrequest/', data, config)
            .then((response) => {
                console.log('Success:', response.data);
            })
            .catch((error) => {
                console.log('Error:', error.response);
            });
    };


    const handleAllocationsHeaderClick = () => {
        setShowAllocationsTable(!showAllocationsTable);
    };

    const handleCurrentAllocationsHeaderClick = () => {
        setHideCurrentAllocationsTable(!hideCurrentAllocationsTable);
    };

    return (
        <>
            <Path pathName={'Allocations'}/>
            <SearchValueContext.Consumer>
                {(searchValue) => {
                    setSearchValueState(searchValue);
                    return ;
                }}
            </SearchValueContext.Consumer>
            <AllocationsHeader onClick={handleAllocationsHeaderClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-calendar-plus" viewBox="0 0 16 16">
                    <path
                        d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"
                        fill="white"></path>
                    <path
                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
                        fill="white"></path>
                </svg>
                New allocations
                {` ( ${pendingEquipmentData.length} )`}
            </AllocationsHeader>
            {showAllocationsTable &&
                <div className="inventory-table">
                    <EquipmentTableHeader title={'New allocations list'}/>
                    <InfosTable
                        columnTitles={columnTitles}
                        columnMappings={columnMappings}
                        data={pendingEquipmentData}
                        currentPage={currentPage}
                        actionRenderer={(allocation) => handleAction(allocation)}
                        searchValue={searchValueState}
                    />
                    <EquipmentTableFooter/>
                </div>}

            <AllocationsHeader onClick={handleCurrentAllocationsHeaderClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-calendar2-check" viewBox="0 0 16 16">
                    <path
                        d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                        fill="white"></path>
                    <path
                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"
                        fill="white"></path>
                    <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"
                          fill="white"></path>
                </svg>
                Current allocations
                {` ( ${activeEquipmentData.length} )`}
            </AllocationsHeader>
            {hideCurrentAllocationsTable &&
            <div className="inventory-table">
                <EquipmentTableHeader title={'Current allocations list'}/>
                <InfosTable
                    columnTitles={columnTitles}
                    columnMappings={columnMappings}
                    data={activeEquipmentData}
                    currentPage={currentPage}
                    isInventoryAdmin={true}
                    searchValue={searchValueState}
                />
                <EquipmentTableFooter/>
            </div>}

        </>
    )
}
export default AllocationsAllocationManager;
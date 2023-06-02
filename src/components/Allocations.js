import Path from "./Path";
import {SearchValueContext} from "../Pages/usersPages/Admin";
import EquipmentTableHeader from "./EquipmentTableHeader";
import InfosTable from "./Tables/InfosTable";
import AllocationForm from "./ResearcherComponents/Forms/AllocationForm";
import EquipmentTableFooter from "./EquipmentTableFooter";
import ActiveAllocationsTable from "./Tables/ActiveAllocationsTable";
import PendingAllocationsTable from "./Tables/PendingAllocationsTable";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

const EquipmentsHeader = (props) => {
    return (
        <div
            className={`allocations-header ${props.className}`}
            onClick={props.onClick}
            style={props.style}
        >
            {props.children}
        </div>
    )
}
const Allocations = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValueState, setSearchValueState] = useState('');
    const [showAvaliableEquipmentsTable, setShowAvaliableEquipmentsTable] = useState(false);
    const [showActiveAllocationsTable, setShowActiveAllocationsTable] = useState(false);
    const [showPendingAllocationsTable, setShowPendingAllocationsTable] = useState(false);
    const [equipmentData, setEquipmentData] = useState([]);
    const [allocationForm, setAllocationForm] = useState(null);
    const [activeAllocationData, setActiveAllocationData] = useState([]);
    const [pendingAllocationData, setPendingAllocationData] = useState([]);
    const [connectedUserId, setConnectedUserId] = useState(null);
    const [reference, setReference] = useState(null);
    const [cookies] = useCookies(['token']);

    // to get connected user id so that we use it in allocate table
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
                    setConnectedUserId(userData.id);
                    console.log(userData.id)
                    // setLastName(userData.lastname);
                } else {
                    console.error('Failed to fetch user info:', response.statusText);
                }
            } catch (error) {
                console.error('Error occurred while fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [cookies.token]);
    // for showing data
    useEffect(() => {
        fetch('http://127.0.0.1:8000/allocation/', {
            headers: {
                'Authorization': `Token ${cookies.token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const avaliableEquipment = data.filter(item => !item.is_requested);
                setEquipmentData(avaliableEquipment);
            });
    }, []);

    useEffect(() => {
        if (connectedUserId) {
            fetch('http://127.0.0.1:8000/allocate/', {
                headers: {
                    'Authorization': `Token ${cookies.token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const activeAllocations = data.filter(allocation => allocation.status === 'Active' && allocation.Reserved_by === connectedUserId);
                    setActiveAllocationData(activeAllocations);
                });
        }
    }, [connectedUserId, cookies.token]);

    useEffect(() => {
        if (connectedUserId) {
            fetch('http://127.0.0.1:8000/allocate/', {
                headers: {
                    'Authorization': `Token ${cookies.token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const pendingAllocations = data.filter(allocation => allocation.status === 'panding' && allocation.Reserved_by === connectedUserId);
                    setPendingAllocationData(pendingAllocations);
                });
        }
    }, [connectedUserId, cookies.token, pendingAllocationData]);


    // for columns and titles
    const columnMappings = {
        "IMG": "img",
        "Name": "name",
        "Reference": "reference",
        "Categories": "categorie",
        "Brand": "brand",
        "Model": "model",
        "Condition": "condition",
        "Description": "discription",
    };
    const columnTitles = Object.keys(columnMappings);
    const activePendingColumnMappings = {
        "Name": "reference_details.name",
        "Brand": "reference_details.brand",
        "Model": "reference_details.model",
        "Reference": "reference",
        "Start-Date": "start_date",
        "Finish-Date": "finish_date",
        "Status": "status",
        "Purpose": "purpose",
    };
    const activePendingColumnTitles = Object.keys(activePendingColumnMappings);

    const handleAction = (equipment) => {
        return (
            <>
                <button
                    className="equipment-table-button"
                    onClick={() => {
                        setAllocationForm(true);
                        setReference(equipment.reference);
                    }}
                >
                    Allocate
                </button>
            </>
        );
    };
    const handleActiveAction = () => {
        return (
            <>
                <button>
                    <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.96872 2.3C6.96872 1.69 7.22364 1.10499 7.67741 0.673654C8.13118 0.242321 8.74661 0 9.38834 0H16.6472C17.2889 0 17.9043 0.242321 18.3581 0.673654C18.8119 1.10499 19.0668 1.69 19.0668 2.3V4.6H23.906C24.2269 4.6 24.5346 4.72116 24.7615 4.93683C24.9884 5.15249 25.1158 5.445 25.1158 5.75C25.1158 6.055 24.9884 6.34751 24.7615 6.56317C24.5346 6.77884 24.2269 6.9 23.906 6.9H22.6128L21.5638 20.8633C21.5204 21.4436 21.2472 21.9866 20.7994 22.3831C20.3515 22.7796 19.7623 23 19.1503 23H6.88403C6.27204 23 5.68277 22.7796 5.23493 22.3831C4.78708 21.9866 4.51392 21.4436 4.47047 20.8633L3.42398 6.9H2.12949C1.80863 6.9 1.50091 6.77884 1.27402 6.56317C1.04714 6.34751 0.919678 6.055 0.919678 5.75C0.919678 5.445 1.04714 5.15249 1.27402 4.93683C1.50091 4.72116 1.80863 4.6 2.12949 4.6H6.96872V2.3ZM9.38834 4.6H16.6472V2.3H9.38834V4.6ZM5.84844 6.9L6.88524 20.7H19.1515L20.1883 6.9H5.84844ZM10.5981 9.2C10.919 9.2 11.2267 9.32116 11.4536 9.53683C11.6805 9.75249 11.808 10.045 11.808 10.35V17.25C11.808 17.555 11.6805 17.8475 11.4536 18.0632C11.2267 18.2788 10.919 18.4 10.5981 18.4C10.2773 18.4 9.96957 18.2788 9.74268 18.0632C9.5158 17.8475 9.38834 17.555 9.38834 17.25V10.35C9.38834 10.045 9.5158 9.75249 9.74268 9.53683C9.96957 9.32116 10.2773 9.2 10.5981 9.2ZM15.4374 9.2C15.7582 9.2 16.066 9.32116 16.2928 9.53683C16.5197 9.75249 16.6472 10.045 16.6472 10.35V17.25C16.6472 17.555 16.5197 17.8475 16.2928 18.0632C16.066 18.2788 15.7582 18.4 15.4374 18.4C15.1165 18.4 14.8088 18.2788 14.5819 18.0632C14.355 17.8475 14.2276 17.555 14.2276 17.25V10.35C14.2276 10.045 14.355 9.75249 14.5819 9.53683C14.8088 9.32116 15.1165 9.2 15.4374 9.2Z"
                            fill="#E01515"/>
                    </svg>
                </button>
            </>
        );
    };
    const handleCancelForm = () => {
        setAllocationForm(false)
    }
    return (
        <>
            <Path pathName={'Allocations'}/>
            <SearchValueContext.Consumer>
                {(searchValue) => {
                    setSearchValueState(searchValue);
                    return;
                }}
            </SearchValueContext.Consumer>
            <EquipmentsHeader onClick={() => setShowAvaliableEquipmentsTable(!showAvaliableEquipmentsTable)}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABUUlEQVR4nO2YQW7CMBBFfQa6oYuuex2OAhyrrdQbsGjOEnYglQu8KjRBKcKOx3bI0MzbIZyZefnBInbOMAwxwAvwAZzQwwn4BF4lEgf0cmxmjBFpkmh4A5ZOCcASeO9mi7mge5zUSHQAz+1s326ILr/e5x3TU/nmk4iowJUScROBibRYIoUh9cZaIiPB7BPRBrGJACtgT1nqpu69RerCEheZe4ucKdF0jJpc1fLW7n9R4A9ipUUkG1UiLrNhSZFoNImQtoP+7pDKRGqhxEVGm8iZpGu0ijC8g1aPIjLIQ4m42HUmMrdEiMREWuw3co3kEeUGkhrcWicZIMSsRVxiDWaXSA6lRUKERCry+MpJFtksf3vFNgWegA2wEA4URegGEOidIrJtl24mENn6eqeILIC1NBEJ+EW8vfsiag7oyHzVXY0gk3RkStosxY5nDeM/8wMcnUSaHO958gAAAABJRU5ErkJggg=="/>
                Avaliable equipments ({equipmentData.length})
            </EquipmentsHeader>
            {showAvaliableEquipmentsTable &&
                <div className={'inventory-table'}>
                    <EquipmentTableHeader
                        title={'Equipments that can be reserved'}
                    />
                    <InfosTable
                        columnTitles={columnTitles}
                        columnMappings={columnMappings}
                        data={equipmentData}
                        currentPage={currentPage}
                        actionRenderer={(equipment) => handleAction(equipment)}
                        searchValue={searchValueState}
                    />
                    {allocationForm &&
                        <>
                            <div onClick={handleCancelForm} className="overlay"/>
                            <AllocationForm
                                handleCancelForm={handleCancelForm}
                                reference={reference}
                            />
                        </>
                    }
                    <EquipmentTableFooter/>
                </div>
            }
            <EquipmentsHeader
                onClick={() => setShowActiveAllocationsTable(!showActiveAllocationsTable)}
                className={'active'}
            >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABq0lEQVR4nO2WTS8DQRzGVyLekooqlx4IFyK+BOLexMvX4KT1Ddr4CCLiY3BA2ng5c2kaLwfRBhcJDj39ZOpfxpjuzq5aB55kst3Z55n5bf+TnfG8f0UQ0AUUgCpwC+RVnxeXeJvQVD5OgKoFoBYnwIMF4D5OgA0LQCFOgE5ZhO/1V32xATTVnN37LREHAHBEdJXaAfAttQ3Aiyn3ewBEq/WnGgN9wCpwrHnU7xWg14k4rLT8NFDxsZaBqR8BAMaBOwd7DRhzBagDa0BaWlb6THUAxRC5A5VxAchaPGowU/MOuZzhmXUBSFs86o1M7UTIbbcT4CJCrhK1BDmL78Uht25mXADqUvOgRfgckMtZck9BAGUgAyS05/3AEnBjeCtGORaApJZLAovApT6+H0AZGPhi+PClDIgtuV4BgwG5a/Fu+gFkWg2ieZc1/5xc1Tkx5ZMZ0s6SM34ACQcAVY6G5P5Qbndt33zZI/bEs99q0IaCJrf5gVF1KpauM1kHw9JU/c/lmfpcj/gOGFZaftJhM5rwe6NS6NmhaIzRI1vvKfAo7UT6ul3/Xe9P6RWjsjPezdp0VgAAAABJRU5ErkJggg=="/>
                My active allocations ({activeAllocationData.length})
            </EquipmentsHeader>
            {showActiveAllocationsTable &&
                <>
                    <ActiveAllocationsTable
                        activePendingColumnTitles={activePendingColumnTitles}
                        activePendingColumnMappings={activePendingColumnMappings}
                        activeAllocationData={activeAllocationData}
                        currentPage={currentPage}
                        handleAction={handleAction}
                        searchValueState={searchValueState}
                    />
                </>
            }
            <EquipmentsHeader
                className={'pending'}
                onClick={() => setShowPendingAllocationsTable(!showPendingAllocationsTable)}
            >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5UlEQVR4nO2WzQ2CQBBGuYs340lrkBNqB9qNsROwFy3BeKYDtAg4PTNmSAgBXJIB4s+XbCCz3+zLDOxmPe+vnxOwA+7YKZU1XcBitFbqAn7JqIHu6zE2+I0WJf8SB3lG4LPAFXoZEtxZ3qeCMyAC1sBEh7zHOtcL+AGsWvIC9ZiCsyoUuAHXGnhmCY6afDXxkyU47ADeWIL9imfeAp72AgZmQKLxpG9wWJo/FlCpvO9Wx5WKD/JsyDf9uTLZKg65sp1ySzB6OARDHyCFcm2lfEdfx1ZjtZV2Ad8Z6eqzH+Wy99fX6QnpLbuS+F/tNAAAAABJRU5ErkJggg=="/>
                My pending allocations ({pendingAllocationData.length})
            </EquipmentsHeader>
            {showPendingAllocationsTable &&
                <>
                    <PendingAllocationsTable
                        activePendingColumnTitles={activePendingColumnTitles}
                        activePendingColumnMappings={activePendingColumnMappings}
                        pendingAllocationData={pendingAllocationData}
                        currentPage={currentPage}
                        handleActiveAction={handleActiveAction}
                        searchValueState={searchValueState}
                    />
                </>
            }
        </>
    )
}
export default Allocations;
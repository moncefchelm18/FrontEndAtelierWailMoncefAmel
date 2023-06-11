import Path from "../../../Path";
import React, {useEffect, useState} from "react";
import EquipmentTableHeader from "../../../EquipmentTableHeader";
import InfosTable from "../../../Tables/InfosTable";
import InventoryTable from "../../../Tables/InventoryTable";
import EquipmentTableFooter from "../../../EquipmentTableFooter";
import StockForm from "../../Forms/StockForm";
import AssignementForm from "./Forms/AssignementForm";
import {useParams} from "react-router-dom";
import {SearchValueContext} from "../../../../Pages/usersPages/Admin";
import ConditionForm from "../../Forms/ConditionForm";

const AdministrationContent = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inventoryData, setInventoryData] = useState([]);
    const [filteredInventoryData, setFilteredInventoryData] = useState([]);
    const [searchValueState, setSearchValueState] = useState('');
    const [assignedEquipment, setAssignedEquipment] = useState(null);
    const [conditionForm, setConditionForm] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const { id } = useParams();

    const columnMappings = {
        // "ID": "id",
        "IMG": "image",
        "Name": "name",
        "Reference": "reference",
        "Categories": "categorie",
        "Brand": "brand",
        "Model": "model",
        "Condition": "condition",
        "Serial N*": "num_serie",
        "Facture N*": "facture_number",
        "Location": "Location",
        "Assignment-Date": "date_assignment",
        "Description": "discription",
    };
    const columnTitles = Object.keys(columnMappings);
    useEffect(() => {
        fetch("http://172.20.10.4:8000/inventory/")
            .then((response) => response.json())
            .then((data) => {
                setInventoryData(data);
                const filteredData = data.filter((item) => item.Location === id);
                setFilteredInventoryData(filteredData);
            })
            .catch((error) => console.error(error));
    }, [id, assignedEquipment]); // Add assignedEquipment as a dependency

    console.log(filteredInventoryData);

    const handleAction = (equipment) => {
        return(
            <>
                <button
                    className="action-button"
                    onClick={() => {
                        setConditionForm(true);
                        setSelectedEquipment(equipment);
                    }}
                >
                    <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.1897 0.685637C17.4315 0.450078 17.7595 0.317749 18.1015 0.317749C18.4435 0.317749 18.7715 0.450078 19.0134 0.685637L22.8827 4.45515C23.1244 4.69078 23.2603 5.01032 23.2603 5.3435C23.2603 5.67668 23.1244 5.99622 22.8827 6.23185L11.2748 17.5404C11.033 17.7761 10.705 17.9085 10.363 17.9086H6.49371C6.15164 17.9086 5.82359 17.7762 5.58171 17.5405C5.33984 17.3049 5.20395 16.9853 5.20395 16.652V12.8825C5.20402 12.5493 5.33996 12.2298 5.58185 11.9942L17.1897 0.685637ZM7.78347 13.4027V15.3955H9.82902L20.1471 5.3435L18.1015 3.35068L7.78347 13.4027ZM0.0449219 5.3435C0.0449219 4.67701 0.316691 4.03781 0.800444 3.56653C1.2842 3.09525 1.94031 2.83049 2.62444 2.83049H9.07322C9.41529 2.83049 9.74334 2.96287 9.98522 3.19851C10.2271 3.43415 10.363 3.75375 10.363 4.087C10.363 4.42024 10.2271 4.73984 9.98522 4.97548C9.74334 5.21112 9.41529 5.3435 9.07322 5.3435H2.62444V20.4216H18.1015V14.139C18.1015 13.8058 18.2374 13.4862 18.4793 13.2506C18.7212 13.0149 19.0492 12.8825 19.3913 12.8825C19.7333 12.8825 20.0614 13.0149 20.3033 13.2506C20.5452 13.4862 20.681 13.8058 20.681 14.139V20.4216C20.681 21.0881 20.4093 21.7272 19.9255 22.1985C19.4418 22.6698 18.7857 22.9346 18.1015 22.9346H2.62444C1.94031 22.9346 1.2842 22.6698 0.800444 22.1985C0.316691 21.7272 0.0449219 21.0881 0.0449219 20.4216V5.3435Z" fill="#04537D"/>
                    </svg>
                </button>
                <button
                    className="action-button"
                    onClick={() => handleDelete(equipment.id)}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.15778 2.71025C6.15778 2.08315 6.40237 1.48173 6.83774 1.03831C7.27312 0.594879 7.86361 0.345764 8.47932 0.345764H15.4439C16.0596 0.345764 16.6501 0.594879 17.0855 1.03831C17.5209 1.48173 17.7655 2.08315 17.7655 2.71025V5.07474H22.4085C22.7164 5.07474 23.0116 5.19929 23.2293 5.42101C23.447 5.64272 23.5693 5.94343 23.5693 6.25698C23.5693 6.57053 23.447 6.87124 23.2293 7.09295C23.0116 7.31466 22.7164 7.43922 22.4085 7.43922H21.1677L20.1613 21.794C20.1196 22.3906 19.8575 22.9488 19.4278 23.3564C18.9981 23.764 18.4327 23.9906 17.8456 23.9906H6.07653C5.48934 23.9906 4.92396 23.764 4.49427 23.3564C4.06457 22.9488 3.80249 22.3906 3.7608 21.794L2.75673 7.43922H1.51471C1.20686 7.43922 0.91161 7.31466 0.693924 7.09295C0.476238 6.87124 0.353943 6.57053 0.353943 6.25698C0.353943 5.94343 0.476238 5.64272 0.693924 5.42101C0.91161 5.19929 1.20686 5.07474 1.51471 5.07474H6.15778V2.71025ZM8.47932 5.07474H15.4439V2.71025H8.47932V5.07474ZM5.08291 7.43922L6.07769 21.6261H17.8467L18.8415 7.43922H5.08291ZM9.64009 9.80371C9.94794 9.80371 10.2432 9.92827 10.4609 10.15C10.6786 10.3717 10.8009 10.6724 10.8009 10.986V18.0794C10.8009 18.393 10.6786 18.6937 10.4609 18.9154C10.2432 19.1371 9.94794 19.2617 9.64009 19.2617C9.33223 19.2617 9.03698 19.1371 8.8193 18.9154C8.60161 18.6937 8.47932 18.393 8.47932 18.0794V10.986C8.47932 10.6724 8.60161 10.3717 8.8193 10.15C9.03698 9.92827 9.33223 9.80371 9.64009 9.80371ZM14.2832 9.80371C14.591 9.80371 14.8863 9.92827 15.1039 10.15C15.3216 10.3717 15.4439 10.6724 15.4439 10.986V18.0794C15.4439 18.393 15.3216 18.6937 15.1039 18.9154C14.8863 19.1371 14.591 19.2617 14.2832 19.2617C13.9753 19.2617 13.6801 19.1371 13.4624 18.9154C13.2447 18.6937 13.1224 18.393 13.1224 18.0794V10.986C13.1224 10.6724 13.2447 10.3717 13.4624 10.15C13.6801 9.92827 13.9753 9.80371 14.2832 9.80371Z" fill="#E01515"/>
                    </svg>
                </button>
            </>
        )
    };
    const handleUpdateCondition = (updatedEquipment) => {
        if (updatedEquipment.Location !== selectedEquipment.Location) {
            setFilteredInventoryData(filteredInventoryData.filter(equipment => equipment.id !== updatedEquipment.id));
        } else {
            const updatedData = filteredInventoryData.map(equipment =>
                equipment.id === updatedEquipment.id ? updatedEquipment : equipment
            );
            setFilteredInventoryData(updatedData);
        }
        // setConditionForm(false);
    };
    const handleDelete = (id) => {
        console.log(id)
        fetch(`http://172.20.10.4:8000/inventory/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete equipment');
                }
                setFilteredInventoryData(filteredInventoryData.filter(equipment => equipment.id !== id));
                console.log('success')
            })
            .catch(error => console.error(error));
    };
    const handleAssignedEquipmentChange = (data) => {
        setAssignedEquipment(data);
    };
    // to show form
    const [showForm, setShowForm] = useState(false);
    const handleAddClick = () => {
        setShowForm(true); // show form when Add button is clicked
    }
    const handleCancelForm = () =>{
        setShowForm(false);
        setConditionForm(false);
    }

    // tableFooter
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const totalPages = Math.ceil(filteredInventoryData.length / 10);
    return(
        <>
            <Path
                paths={[
                    {
                        link: "/GeneralManager/assignement",
                        linkText: "Assignement",

                    },
                    {
                        link: "/GeneralManager/assignement/Administration",
                        linkText: "Administration",
                        pathName: id,
                    },

                ]}
            />
            <SearchValueContext.Consumer>
                {(searchValue) => {
                    setSearchValueState(searchValue);
                    return ;
                }}
            </SearchValueContext.Consumer>
            <div className="inventory-table">
                <EquipmentTableHeader title={'List of equipments'}
                                      buttonName="Assign new equipments"
                                      className="add-button"
                                      onClick={handleAddClick}
                />
                {/*<InfosTable />*/}
                <br/>
                {showForm &&
                    <>
                        <div onClick={handleCancelForm} className="overlay" />
                        <AssignementForm
                            location={id}
                            handleCancelForm={handleCancelForm}
                            onAssignedEquipmentChange={handleAssignedEquipmentChange}
                        />
                    </>
                }
                {filteredInventoryData.length === 0 ? <p style={{padding:'10px 20px'}}>No items avaliable in this location </p>
                    : (
                        <InfosTable
                            columnTitles={columnTitles}
                            currentPage={currentPage}
                            columnMappings={columnMappings}
                            data={filteredInventoryData}
                            actionRenderer={(equipment) => handleAction(equipment)}
                            searchValue={searchValueState}
                        />
                    )
                }
                {conditionForm &&
                    <>
                        <div onClick={handleCancelForm} className="overlay" />
                        <ConditionForm
                            selectedEquipment={selectedEquipment}
                            setConditionForm={setConditionForm}
                            handleUpdateCondition={handleUpdateCondition}
                        />
                    </>
                }
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
export default AdministrationContent;
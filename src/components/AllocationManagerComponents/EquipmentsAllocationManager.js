import Path from "../Path";
import EquipmentTableHeader from "../EquipmentTableHeader";
import EquipmentTableFooter from "../EquipmentTableFooter";
import InfosTable from "../Tables/InfosTable";
import React, {useEffect, useState} from "react";
import {SearchValueContext} from "../../Pages/usersPages/Admin";

const EquipmentAllocationManager = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [equipmentData, setEquipmentData] = useState([]);
    const [searchValueState, setSearchValueState] = useState('');
    const headerTitle= 'Avaliable equipment list';
    const headerButtonName = 'Filter';
    console.log(searchValueState);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/allocation/')
            .then(response => response.json())
            .then(data => {
                setEquipmentData(data);
            })
    }, []);


    const columnMappings = {
        // "ID": "id",
        "IMG": "image",
        "Name": "name",
        "Reference": "reference",
        "Categories": "categorie",
        "Brand": "brand",
        "Model": "model",
        "Condition": "condition",
        "Reserved" : "is_reserved",
        "Requested" : "is_requested",
        "Serial N*": "num_serie",
        "Facture N*": "facture_number",
        "Location": "Location",
        "Assignment-Date": "date_assignment",
        "Description": "discription",
    };
    const columnTitles = Object.keys(columnMappings);
    // console.log(equipmentData)
    const handleAction = () => {
        return(
            <></>
        )
    };
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const totalPages = Math.ceil(equipmentData.length / 10);

    console.log(equipmentData)
    return(
        <>
            <Path pathName={'Equipments'}/>
            <SearchValueContext.Consumer>
                {(searchValue) => {
                    setSearchValueState(searchValue);
                    return ;
                }}
            </SearchValueContext.Consumer>
            <div className="inventory-table">
                <EquipmentTableHeader
                    title={headerTitle}
                    /*buttonName={headerButtonName}
                    className={'filter_button'}
                    isFilterButton={true}*/
                />
                <InfosTable
                    columnTitles={columnTitles}
                    columnMappings={columnMappings}
                    data={equipmentData}
                    currentPage={currentPage}
                    actionRenderer={handleAction}
                    isInventoryAdmin={true}
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
export default EquipmentAllocationManager;
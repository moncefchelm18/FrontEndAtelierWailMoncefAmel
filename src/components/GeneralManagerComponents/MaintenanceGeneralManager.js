import Path from "../Path";
import EquipmentTableHeader from "../EquipmentTableHeader";
import EquipmentTableFooter from "../EquipmentTableFooter";
import InfosTable from "../Tables/InfosTable";
import React, {useEffect, useState} from "react";

const MaintenanceGeneralManager = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [equipmentData, setEquipmentData] = useState([]);
    const poorEquipmentData = equipmentData.filter((item) => item.condition === "poor");
    const columnMappings = {
        // "ID": "id",
        "IMG": "img",
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
    // displayInventoryData
    useEffect(() => {
        fetch('http://127.0.0.1:8000/inventory/')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setEquipmentData(data)
            })
    }, [])
    const headerTitle = 'Equipements that needs maintenance'
    const headerButtonName = 'Filter';

    // tableFooter
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const totalPages = Math.ceil(poorEquipmentData.length / 10);




    return(
        <>
            <Path pathName={'Maintenance'}/>
            <div className="inventory-table">
                <EquipmentTableHeader
                    title={headerTitle}
                    buttonName={headerButtonName}
                    className={'filter_button'}
                    isFilterButton={true}
                />

                {poorEquipmentData.length === 0 ? <div style={{padding: '20px'}}>No equipments to be repaired</div> :
                    (
                        <InfosTable
                            currentPage={currentPage}
                            columnTitles={columnTitles}
                            columnMappings={columnMappings}
                            data={poorEquipmentData}
                            isInventoryAdmin={true}
                        />
                    )
                }
                <EquipmentTableFooter
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    totalPages={totalPages}
                />
            </div>
            <div className="report-button-container">
                <div className="report-button">Print</div>
            </div>
        </>
    );
}
export default MaintenanceGeneralManager;
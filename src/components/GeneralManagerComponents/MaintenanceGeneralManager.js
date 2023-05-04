import Path from "../Path";
import EquipmentTableHeader from "../EquipmentTableHeader";
import EquipmentTableFooter from "../EquipmentTableFooter";
import InfosTable from "../Tables/InfosTable";
import React, {useState} from "react";

const MaintenanceGeneralManager = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const columnMappings = {
        "ID": "id",
        "IMG": "img",
        "Name": "name",
        "Reference": "reference",
        "Categories": "categories",
        "Brand": "brand",
        "Model": "model",
        "Serial N*": "serialnumber",
        "Facture N*": "invoiceNumber",
        "Location": "location",
        "Purchase-Date": "purchaseDate",
        "Description": "description",
        "Condition": "condition",
    };
    const columnTitles = Object.keys(columnMappings);
    const equipmentData = [{
        id: 1,
        img: "equipment1.jpg",
        name: "Equipment 1",
        reference: "REF-001",
        categories: ["Category A"],
        brand: "Brand A",
        model: "Model 1",
        serialnumber: "SN-001",
        invoiceNumber: "INV-001",
        location: "Warehouse A",
        purchaseDate: "2022-01-01",
        description: "This is equipment 1.",
        condition: "Poor",
    }];
    const headerTitle = 'Equipements that needs maintenance'
    const headerButtonName = 'Filter';

    // tableFooter
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const totalPages = Math.ceil(equipmentData.length / 10);
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
                <InfosTable
                    currentPage={currentPage}
                    columnTitles={columnTitles}
                    columnMappings={columnMappings}
                    data={equipmentData}
                    isInventoryAdmin={true}
                />
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
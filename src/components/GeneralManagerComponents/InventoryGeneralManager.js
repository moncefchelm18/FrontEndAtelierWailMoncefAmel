import React, {useState} from "react";
import "../AdminComponents/CSS/inventoryAdmin.css";
import Path from "../Path";
import InfosTable from "../Tables/InfosTable";
import EquipmentTableFooter from "../EquipmentTableFooter";
import EquipmentTableHeader from "../EquipmentTableHeader";

const InventoryGeneralManager = () => {
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
        condition: "Good",
    }];
    const handleAction = () => {
        return(
            <button className="equipment-table-button">Edit</button>
        )
    };
    const headerTitle= 'Equipments';
    const headerButtonName = 'Filter';


    // tableFooter
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const totalPages = Math.ceil(equipmentData.length / 10);
    return (
        <>
            <Path pathName={'Inventory'}/>
            <div className="inventory-overall-container">
                <h2>Total Overview</h2>
                <div className="overview-grid">
                    <div className="overview-item">
                        <p>{equipmentData.length}</p>
                        <p>Total Equipment</p>
                    </div>
                    <div className="overview-item">
                        <p>{equipmentData.filter(e => e.condition === "Good").length}</p>
                        <p>Good Condition</p>
                    </div>
                    <div className="overview-item">
                        <p>{equipmentData.filter(e => e.condition === "Fair").length}</p>
                        <p>Fair Condition</p>
                    </div>
                    <div className="overview-item">
                        <p>{equipmentData.filter(e => e.condition === "Poor").length}</p>
                        <p>Poor Condition</p>
                    </div>
                    <div className="overview-item">
                        <p>{equipmentData.reduce((total, e) => total + e.categories.length, 0)}</p>
                        <p>Total Categories</p>
                    </div>
                </div>
            </div>
            <div className="inventory-table">
                <EquipmentTableHeader title={headerTitle}
                                      buttonName={headerButtonName}
                                      className={'filter_button'}
                                      isFilterButton={true}
                />
                <InfosTable
                    columnTitles={columnTitles}
                    currentPage={currentPage}
                    columnMappings={columnMappings}
                    data={equipmentData}
                    actionRenderer={handleAction}
                />
                <EquipmentTableFooter
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    totalPages={totalPages}
                />
            </div>
            <div className="report-button-container">
                <div className="report-button">Make a report</div>
            </div>
        </>
        /*const [currentPage, setCurrentPage] = useState(1);

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
        condition: "Good",
    }];
    const handleAction = () => {
        return(
            <button className="equipment-table-button">Edit</button>
        )
    };
    const headerTitle= 'Equipments';
    const headerButtonName = 'Filter';



    return (
        <>
            <Path pathName={'Inventory'}/>
            <div className="inventory-overall-container">
                <h2>Total Overview</h2>
                <div className="overview-grid">
                    <div className="overview-item">
                        <p>{equipmentData.length}</p>
                        <p>Total Equipment</p>
                    </div>
                    <div className="overview-item">
                        <p>{equipmentData.filter(e => e.condition === "Good").length}</p>
                        <p>Good Condition</p>
                    </div>
                    <div className="overview-item">
                        <p>{equipmentData.filter(e => e.condition === "Fair").length}</p>
                        <p>Fair Condition</p>
                    </div>
                    <div className="overview-item">
                        <p>{equipmentData.filter(e => e.condition === "Poor").length}</p>
                        <p>Poor Condition</p>
                    </div>
                    <div className="overview-item">
                        <p>{equipmentData.reduce((total, e) => total + e.categories.length, 0)}</p>
                        <p>Total Categories</p>
                    </div>
                </div>
            </div>
            <div className="inventory-table">
                <EquipmentTableHeader title={headerTitle}
                                      buttonName={headerButtonName}
                                      className={'filter_button'}
                                      isFilterButton={true}
                />


            </div>
            <div className="report-button-container">
                <div className="report-button">Make a report</div>
            </div>

        </>
    );
};*/
    );
};
export default InventoryGeneralManager;

import React, {useEffect, useState} from "react";
import "../AdminComponents/CSS/inventoryAdmin.css";
import Path from "../Path";
import InfosTable from "../Tables/InfosTable";
import EquipmentTableFooter from "../EquipmentTableFooter";
import EquipmentTableHeader from "../EquipmentTableHeader";
import ConditionForm from "./Forms/ConditionForm";
import {SearchValueContext} from "../../Pages/usersPages/Admin";
import Loading from "../Loading";
import InventoryTotalOverview from "../InventoryTotalOverview";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import InfosTablePDF from "../InfosTablePDF";
const InventoryGeneralManager = () => {
    const headerTitle= 'Equipments';
    const headerButtonName = 'Filter';
    const [currentPage, setCurrentPage] = useState(1);
    const [equipmentData, setEquipmentData] = useState([]);
    const [conditionForm, setConditionForm] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [selectedYear, setSelectedYear] = useState()
    const [searchValueState, setSearchValueState] = useState('');
    const [loading, setLoading] = useState(null);
    const [pdfContent, setPdfContent] = useState(null);
    const [reportTitle, setReportTitle] = useState('Print');



    const columnMappings = {
        // "ID": "id",
        "IMG": "image",
        "Name": "name",
        "Reference": "reference",
        "Categories": "categorie",
        "Brand": "brand",
        "Model": "model",
        "Condition": "condition",
        "Location": "Location",
        "Reserved" : "is_reserved",
        "Serial N*": "num_serie",
        "Facture N*": "facture_number",
        "Assignment-Date": "date_assignment",
        "Description": "discription",
    };
    const columnTitles = Object.keys(columnMappings);
    // displayInventoryData
    useEffect(() => {
        setLoading(true);
        fetch('http://127.0.0.1:8000/inventory/')
            .then(response => response.json())
            .then(data => {
                const filteredData = selectedYear ? data.filter(equipment => {
                    const equipmentYear = new Date(equipment.date_assignment).getFullYear();
                    return equipmentYear <= selectedYear;
                }) : data;
                setEquipmentData(filteredData);
                setLoading(false);
            })

    }, [selectedYear]);

    const handleAction = (equipment) => {
        return(
            <button className="equipment-table-button"
                    onClick={() => {
                        setConditionForm(true);
                        setSelectedEquipment(equipment);
                    }}
            >
                Edit
            </button>
        )
    };
    const handleUpdateCondition = (updatedEquipment) => {
        const updatedData = equipmentData.map((equipment) =>
            equipment.id === updatedEquipment.id ? updatedEquipment : equipment
        );
        setEquipmentData(updatedData);
        // setConditionForm(false);
    };
    const handleCancelForm = () =>{
        setConditionForm(false);
    }
    const handleYearSelect = (year) => {
        setSelectedYear(year);
        console.log(selectedYear)
    };
    // for pdf download
    const handlePrintPDF = () => {
        if (reportTitle === 'Cancel'){
            setLoading(true);
            setPdfContent(null);
            setLoading(false);
            setReportTitle('Print')
        }else{
            setLoading(true);
            setPdfContent(
                <InfosTablePDF
                    columnTitles={columnTitles}
                    data={equipmentData}
                    columnMappings={columnMappings}
                    searchValue={searchValueState}
                />
            );
            setLoading(false);
            setReportTitle('Cancel')}

    };

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
            {loading ? <Loading/> : (
                <>
                    <Path pathName={'Inventory'}/>
                    <SearchValueContext.Consumer>
                        {(searchValue) => {
                            setSearchValueState(searchValue);
                            return ;
                        }}
                    </SearchValueContext.Consumer>
                    <InventoryTotalOverview equipmentData={equipmentData}/>
                    <div className="inventory-table">
                        <EquipmentTableHeader
                            title={headerTitle}
                            buttonName={headerButtonName}
                            className={'filter_button'}
                            isFilterButton={true}
                            forInventory={true}
                            onYearSelect={handleYearSelect}
                        />
                        <InfosTable
                            columnTitles={columnTitles}
                            currentPage={currentPage}
                            columnMappings={columnMappings}
                            data={equipmentData}
                            actionRenderer={(equipment) => handleAction(equipment)}
                            searchValue={searchValueState}
                        />
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
                    <div className="report-button-container">
                        <div style={{cursor: 'pointer', marginRight: '10px'}} className="report-button" onClick={handlePrintPDF}>
                            {reportTitle}
                        </div>
                        {pdfContent && (
                            <PDFDownloadLink document={pdfContent} fileName="inventory_report.pdf">
                                {({ loading }) => (loading ? 'Loading...'
                                        : (
                                            <button className="add-button">Download PDF</button>
                                        )
                                )}
                            </PDFDownloadLink>
                        )}
                    </div>
                </>
            )}
        </>
    );
};
export default InventoryGeneralManager;

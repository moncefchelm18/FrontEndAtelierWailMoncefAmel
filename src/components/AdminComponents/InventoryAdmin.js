import React, {useEffect, useState} from "react";
import "./CSS/inventoryAdmin.css";
import Path from "../Path";
import InfosTable from "../Tables/InfosTable";
import EquipmentTableFooter from "../EquipmentTableFooter";
import EquipmentTableHeader from "../EquipmentTableHeader";
import {useCookies} from "react-cookie";
import Loading from "../Loading";
import {SearchValueContext} from "../../Pages/usersPages/Admin";
import InventoryTotalOverview from "../InventoryTotalOverview";
import {PDFDownloadLink} from "@react-pdf/renderer";
import InfosTablePDF from "../InfosTablePDF";

const InventoryAdmin = () => {
    const headerButtonName = 'Filter';
    const [currentPage, setCurrentPage] = useState(1);
    const [equipmentData, setEquipmentData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [cookies] = useCookies(['token']);
    const [loading, setLoading] = useState(null);
    const [searchValueState, setSearchValueState] = useState('');
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
        "Reserved": "is_reserved",
        "Serial N*": "num_serie",
        "Facture N*": "facture_number",
        "Assignment-Date": "date_assignment",
        "Description": "discription",
    };
    const columnTitles = Object.keys(columnMappings);

    // displayInventoryData
    useEffect(() => {
        const fetchEquipmentData = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://127.0.0.1:8000/inventory/', {
                    headers: {
                        Authorization: `Token ${cookies.token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const filteredData = selectedYear
                        ? data.filter((equipment) => {
                            const equipmentYear = new Date(equipment.date_assignment).getFullYear();
                            return equipmentYear <= selectedYear;
                        })
                        : data;
                    setEquipmentData(filteredData);
                } else {
                    // Handle error response
                    console.log('Error:', response.status);
                }
            } catch (error) {
                console.log('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEquipmentData();
    }, [selectedYear, cookies.token]);
    const handleAction = () => {
        return (
            <button className="equipment-table-button">Edit</button>
        )
    };
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
            <SearchValueContext.Consumer>
                {(searchValue) => {
                    setSearchValueState(searchValue);
                    return;
                }}
            </SearchValueContext.Consumer>
            <InventoryTotalOverview equipmentData={equipmentData}/>
            <div className="inventory-table">
                <EquipmentTableHeader
                    title={`Equipments (${equipmentData.length})`}
                    /*buttonName={headerButtonName}
                    className={'filter_button'}
                    isFilterButton={true}*/
                    forInventory={true}
                    onYearSelect={handleYearSelect}
                />
                {loading ? <Loading/> : (
                    <>
                        <InfosTable
                            columnTitles={columnTitles}
                            currentPage={currentPage}
                            columnMappings={columnMappings}
                            data={equipmentData}
                            actionRenderer={handleAction}
                            isInventoryAdmin={true}
                            searchValue={searchValueState}
                        />
                    </>
                )}
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
    );
};
export default InventoryAdmin;

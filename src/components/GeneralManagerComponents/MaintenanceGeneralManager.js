import Path from "../Path";
import EquipmentTableHeader from "../EquipmentTableHeader";
import EquipmentTableFooter from "../EquipmentTableFooter";
import InfosTable from "../Tables/InfosTable";
import React, {useEffect, useState} from "react";
import {SearchValueContext} from "../../Pages/usersPages/Admin";
import {PDFDownloadLink} from "@react-pdf/renderer";
import InfosTablePDF from "../InfosTablePDF";

const MaintenanceGeneralManager = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [equipmentData, setEquipmentData] = useState([]);
    const [searchValueState, setSearchValueState] = useState('');
    const poorEquipmentData = equipmentData.filter((item) => item.condition === "poor");
    const [reportTitle, setReportTitle] = useState('Print');
    const [loading, setLoading] = useState(null);
    const [pdfContent, setPdfContent] = useState(null);

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
                    data={poorEquipmentData}
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
    const totalPages = Math.ceil(poorEquipmentData.length / 10);

    return(
        <>
            <Path pathName={'Maintenance'}/>
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

                {poorEquipmentData.length === 0 ? <div style={{padding: '20px'}}>No equipments to be repaired</div> :
                    (
                        <InfosTable
                            currentPage={currentPage}
                            columnTitles={columnTitles}
                            columnMappings={columnMappings}
                            data={poorEquipmentData}
                            isInventoryAdmin={true}
                            searchValue={searchValueState}
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
}
export default MaintenanceGeneralManager;
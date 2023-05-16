import Path from "../Path";
import EquipmentTableHeader from "../EquipmentTableHeader";
import EquipmentTableFooter from "../EquipmentTableFooter";
import InfosTable from "../Tables/InfosTable";
import {useEffect, useState} from "react";

const EquipmentAllocationManager = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [locations, setLocations] = useState([]);
    const reservationRoom = locations.filter(location => location.type === "reservation_room");
    const reservationRoomNames = reservationRoom.map(item => item.name).join('');
    const [equipmentData, setEquipmentData] = useState([]);
    const headerTitle= 'Reservable equipment list';
    const headerButtonName = 'Filter';
    useEffect(() => {
        fetch('http://127.0.0.1:8000/location/')
            .then(response => response.json())
            .then(data => {
                setLocations(data);
            })
    }, []);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/inventory/')
            .then(response => response.json())
            .then(data => {
                setEquipmentData(data);
            })
    }, []);
    console.log(reservationRoomNames)
    const filtredEquipmentData = equipmentData.filter(equipment => {
        return equipment.Location === reservationRoomNames;
    });
    console.log(filtredEquipmentData)



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
    // console.log(equipmentData)
    const handleAction = () => {
        return(
            <></>
        )
    };
    return(
        <>
            <Path pathName={'Equipments'}/>
            <div className="inventory-table">
                <EquipmentTableHeader title={headerTitle}
                                      buttonName={headerButtonName}
                                      className={'filter_button'}
                                      isFilterButton={true}
                />
                <InfosTable columnTitles={columnTitles}
                            columnMappings={columnMappings}
                            data={filtredEquipmentData}
                            currentPage={currentPage}
                            actionRenderer={handleAction}
                            isInventoryAdmin={true}
                />
                <EquipmentTableFooter/>
            </div>

        </>
    )
}
export default EquipmentAllocationManager;
import Path from "../Path";
import EquipmentTableHeader from "../EquipmentTableHeader";
import EquipmentTableFooter from "../EquipmentTableFooter";
import InfosTable from "../Tables/InfosTable";

const EquipmentAllocationManager = (props) => {
    const headerTitle= 'Reservable equipment list';
    const headerButtonName = 'Filter';


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
        location: "Reservation room",
        purchaseDate: "2022-01-01",
        description: "This is equipment 1.",
        condition: "Good",
    }];
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
                            data={equipmentData}
                            actionRenderer={handleAction}
                            isInventoryAdmin={true}
                />
                <EquipmentTableFooter/>
            </div>

        </>
    )
}
export default EquipmentAllocationManager;
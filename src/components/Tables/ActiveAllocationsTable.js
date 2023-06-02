import EquipmentTableHeader from "../EquipmentTableHeader";
import InfosTable from "./InfosTable";

const ActiveAllocationsTable = (props) => {
    return(
        <>
            <div className={'inventory-table'}>
                <EquipmentTableHeader
                    title={'Active allocations'}
                />
                <InfosTable
                    columnTitles={props.activePendingColumnTitles}
                    columnMappings={props.activePendingColumnMappings}
                    data={props.activeAllocationData}
                    currentPage={props.currentPage}
                    actionRenderer={props.handleAction}
                    isInventoryAdmin={true}
                    searchValue={props.searchValueState}
                />
            </div>
        </>
    )
}
export default ActiveAllocationsTable;
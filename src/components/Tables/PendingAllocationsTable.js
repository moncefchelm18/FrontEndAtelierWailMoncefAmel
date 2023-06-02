import EquipmentTableHeader from "../EquipmentTableHeader";
import InfosTable from "./InfosTable";

const PendingAllocationsTable = (props) => {
    return(
        <>
            <div className={'inventory-table'}>
                <EquipmentTableHeader
                    title={'Pending allocations'}
                />
                <InfosTable
                    columnTitles={props.activePendingColumnTitles}
                    columnMappings={props.activePendingColumnMappings}
                    data={props.pendingAllocationData}
                    currentPage={props.currentPage}
                    actionRenderer={props.handleActiveAction}
                    isInventoryAdmin={false}
                    searchValue={props.searchValueState}
                />
            </div>
        </>
    )
}
export default PendingAllocationsTable;
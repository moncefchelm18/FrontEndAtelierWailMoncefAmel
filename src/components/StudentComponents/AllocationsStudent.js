import Path from "../Path";
import EquipmentTableHeader from "../EquipmentTableHeader";
import InfosTable from "../Tables/InfosTable";
import EquipmentTableFooter from "../EquipmentTableFooter";
import React, {useEffect, useState} from "react";
import {SearchValueContext} from "../../Pages/usersPages/Admin";
import AllocationForm from "../ResearcherComponents/Forms/AllocationForm";
import ActiveAllocationsTable from "../Tables/ActiveAllocationsTable";
import PendingAllocationsTable from "../Tables/PendingAllocationsTable";
import {useCookies} from "react-cookie";
import Allocations from "../Allocations";


const AllocationsStudent = (props) => {
    return (
        <>
            <Allocations/>
        </>
    )
}
export default AllocationsStudent;
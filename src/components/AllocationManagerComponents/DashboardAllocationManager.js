import Path from "../Path";
import DoughnutEquipmentsCondition from "../DashboardComponents/DoughnutEquipmentsCondition";
import PieChartStudentsResearchers from "../DashboardComponents/PieChartStudentsResearchers";
import BarEquipmentsAffectation from "../DashboardComponents/BarEquipmentsAffectation";
import axios from "axios";
import {useState} from "react";

const OverviewItem = (props) => {
    return (
        <div className="overview-item">
            <div>{props.icon}</div>
            <p className="number">{props.totalNumber}</p>
            <p style={{whiteSpace: 'nowrap'}}>{props.totalTitle}</p>
        </div>
    )
};

const DashboardAllocationManager = () => {
    const [totalEquipments, setTotalEquipments] = useState(null);
    const [totalStockEquipments, setTotalStockEquipments] = useState(null);
    const [totalLocations, setTotalLocations] = useState(null);
    const [totalStock, setTotalStock] = useState(null);
    const [totalStudents, setTotalStudents] = useState(null);
    const [totalResearchers, setTotalResearchers] = useState(null);
    // const [equipmentData, setEquipmentData] = useState(null);
    // totalEquipment
    axios.get('http://172.20.10.4:8000/inventory/')
        .then(response => {
            const inventoryEquipments = response.data
            const requestedEquipments = inventoryEquipments.filter(e => e.is_reserved === true).length
            setTotalEquipments(requestedEquipments);

        })

    axios.get('http://172.20.10.4:8000/profiles/Student/')
        .then(response => {
            setTotalStudents(response.data.length);
        })

    axios.get('http://172.20.10.4:8000/profiles/Researcher/')
        .then(response => {
            setTotalResearchers(response.data.length);
        })

    return(
        <>
            <Path pathName={'Dashboard'}/>
            <div className="dashboard-overall-container">
                <h2>Total Overview</h2>
                <div className="overview-grid">
                    <OverviewItem
                        icon={<img width={30} height={30} src="https://img.uxwing.com/wp-content/themes/uxwing/download/festival-culture-religion/booking-reservation-icon.png"/>}
                        totalNumber={totalEquipments}
                        totalTitle={'Total equipments reserved'}
                    />
                    <OverviewItem
                        icon={<img width={30} height={30} src="https://cdn-icons-png.flaticon.com/512/8257/8257814.png"/>}
                        totalNumber={totalStudents}
                        totalTitle={'Total students'}
                    />
                    <OverviewItem
                        icon={<img width={30} height={30} src="https://cdn-icons-png.flaticon.com/512/8257/8257963.png"/>}
                        totalNumber={totalResearchers}
                        totalTitle={'Total researchers'}
                    />
                </div>
            </div>

            <div className="dashboard-equipment-container" >
                <div className="dashboard-equipment-container-2">
                    <h2>Equipments condition via percentage</h2>
                    <div className="dashboard-equipment-charts">
                        <DoughnutEquipmentsCondition/>
                    </div>
                </div>
                <div className="dashboard-equipment-container-2">
                    <h2>Users allocations</h2>
                    <div className="dashboard-equipment-charts">
                        <PieChartStudentsResearchers/>
                    </div>
                </div>
            </div>
            <div className="dashboard-overall-container">
                <div className="dashboard-equipment-charts">
                    <h2>Equipments affectation</h2>
                    <BarEquipmentsAffectation/>
                </div>
            </div>
            <div className="dashboard-overall-container">
                <h2>HPC usage</h2>
            </div>
        </>
    )
}
export default DashboardAllocationManager;
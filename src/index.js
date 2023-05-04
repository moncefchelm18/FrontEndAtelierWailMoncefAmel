import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './style.css';
import Home from './Pages/home.js';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Admin from "./Pages/usersPages/Admin";
import GeneralManager from "./Pages/usersPages/GeneralManager";
import AllocationManager from "./Pages/usersPages/AllocationManager";
import Student from "./Pages/usersPages/Student";
import Researcher from "./Pages/usersPages/Researcher";
import Try from "./try";
import DashboardAdmin from "./components/AdminComponents/DashboardAdmin";
import InventoryAdmin from "./components/AdminComponents/InventoryAdmin";
import CategoriesAdmin from "./components/AdminComponents/CategoriesAdmin";
import LocationsAdmin from "./components/AdminComponents/LocationsAdmin";
import ManagersAdmin from "./components/AdminComponents/ManagersAdmin";
import MyAccountAdmin from "./components/AdminComponents/MyAccountAdmin";
import DashboardGeneralManager from "./components/GeneralManagerComponents/DashboardGeneralManager";
import StockGeneralManager from "./components/GeneralManagerComponents/StockGeneralManager";
import InventoryGeneralManager from "./components/GeneralManagerComponents/InventoryGeneralManager";
import Assignement from "./components/GeneralManagerComponents/Assignement";
import MyAccountGeneralAdmin from "./components/GeneralManagerComponents/MyAccountGeneralAdmin";
import MaintenanceGeneralManager from "./components/GeneralManagerComponents/MaintenanceGeneralManager";
import EquipmentsAllocationManager from "./components/AllocationManagerComponents/EquipmentsAllocationManager";
import AllocationsAllocationManager from "./components/AllocationManagerComponents/AllocationsAllocationManager";
import HPCScheduleAllocationManager from "./components/AllocationManagerComponents/HPCScheduleAllocationManager";
import UsersAllocationManager from "./components/AllocationManagerComponents/UsersAllocationManager";
import MyAccountAllocationManager from "./components/AllocationManagerComponents/MyAccountAllocationManager";
import MyAccountResearcher from "./components/ResearcherComponents/MyAccountResearcher";
import HPCScheduleResearcher from "./components/ResearcherComponents/HPCScheduleResearcher";
import AllocationsResearcher from "./components/ResearcherComponents/AllocationsResearcher";
import AllocationsStudent from "./components/StudentComponents/AllocationsStudent";
import MyAccountStudent from "./components/StudentComponents/MyAccountStudent";
import LectureHalls from "./components/GeneralManagerComponents/AssignementComponents/LectureHalls";
import PracticeRooms from "./components/GeneralManagerComponents/AssignementComponents/PracticeRooms";
import LabRooms from "./components/GeneralManagerComponents/AssignementComponents/LabRooms";
import Administration from "./components/GeneralManagerComponents/AssignementComponents/Administration";
import ReservationRoom from "./components/GeneralManagerComponents/AssignementComponents/ReservationRoom";
import ItRoom from "./components/GeneralManagerComponents/AssignementComponents/ItRoom";
import Corridors from "./components/GeneralManagerComponents/AssignementComponents/Corridors";
import LectureHallsContent
    from "./components/GeneralManagerComponents/AssignementComponents/AssignementContentComponents/LectureHallsContent";
import PracticeRoomsContent
    from "./components/GeneralManagerComponents/AssignementComponents/AssignementContentComponents/PracticeRoomsContent";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login/>} />
                <Route path="/SignUp" element={<SignUp/>} />
                <Route path="/Admin" element={<Admin/>}>
                    <Route path="" element={<DashboardAdmin/>} />
                    <Route path="inventory" element={<InventoryAdmin/>} />
                    <Route path="categories" element={<CategoriesAdmin/>} />
                    <Route path="locations" element={<LocationsAdmin/>} />
                    <Route path="managers" element={<ManagersAdmin/>} />
                    <Route path="myaccount" element={<MyAccountAdmin/>} />
                </Route>
                <Route path="/GeneralManager" element={<GeneralManager/>}>
                    <Route path="" element={<DashboardGeneralManager/>}/>
                    <Route path="stock" element={<StockGeneralManager/>}/>
                    <Route path="inventory" element={<InventoryGeneralManager/>}/>
                    <Route path="assignement" element={<Assignement/>}>
                        <Route path="LectureHalls" element={<LectureHalls/>}>
                            <Route path=':id' element={<LectureHallsContent/>} />
                        </Route>
                        <Route path="PracticeRooms" element={<PracticeRooms/>}>
                            <Route path=':id' element={<PracticeRoomsContent/>} />
                        </Route>
                        <Route path="LabRooms" element={<LabRooms/>}>
                            <Route path=':id' element={''} />
                        </Route>
                        <Route path="Administration" element={<Administration/>}>
                            <Route path=':id' element={''} />
                        </Route>
                        <Route path="ReservationRoom" element={<ReservationRoom/>}>
                            <Route path=':id' element={''} />
                        </Route>
                        <Route path="ItRoom" element={<ItRoom/>}>
                            <Route path=':id' element={''} />
                        </Route>
                        <Route path="Corridors" element={<Corridors/>}>
                            <Route path=':id' element={''} />
                        </Route>
                    </Route>
                    <Route path="maintenance" element={<MaintenanceGeneralManager/>}/>
                    <Route path="myaccount" element={<MyAccountGeneralAdmin/>}/>
                </Route>
                <Route path="/AllocationManager" element={<AllocationManager/>}>
                    <Route path="" element={<EquipmentsAllocationManager/>}/>
                    <Route path="allocations" element={<AllocationsAllocationManager/>}/>
                    <Route path="hpcschedule" element={<HPCScheduleAllocationManager/>}/>
                    <Route path="users" element={<UsersAllocationManager/>}/>
                    <Route path="myaccount" element={<MyAccountAllocationManager/>}/>
                </Route>
                <Route path="/Student" element={<Student/>}>
                    <Route path="" element={<AllocationsStudent/>}/>
                    <Route path="myaccount" element={<MyAccountStudent/>}/>
                </Route>
                <Route path="/Researcher" element={<Researcher/>}>
                    <Route path="" element={<AllocationsResearcher/>}/>
                    <Route path="hpcschedule" element={<HPCScheduleResearcher/>}/>
                    <Route path="myaccount" element={<MyAccountResearcher/>}/>
                </Route>
                <Route path="/try" element={<Try/>}/>
            </Routes>
        </Router>
    );
};

ReactDOM.render(<App/>, document.getElementById('app'));

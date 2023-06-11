import React, {useEffect, useState} from 'react';
// import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes, Navigate, Outlet} from 'react-router-dom';

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
import {createRoot} from "react-dom/client";
import LabRoomsContent
    from "./components/GeneralManagerComponents/AssignementComponents/AssignementContentComponents/LabRoomsContent";
import AdministrationContent
    from "./components/GeneralManagerComponents/AssignementComponents/AssignementContentComponents/AdministrationContent";
import ReservationRoomContent
    from "./components/GeneralManagerComponents/AssignementComponents/AssignementContentComponents/ReservationRoomContent";
import ItRoomContent
    from "./components/GeneralManagerComponents/AssignementComponents/AssignementContentComponents/ItRoomContent";
import CorridorsContent
    from "./components/GeneralManagerComponents/AssignementComponents/AssignementContentComponents/CorridorsContent";
import {useCookies} from "react-cookie";
import Loading from "./components/Loading";
import DashboardAllocationManager from "./components/AllocationManagerComponents/DashboardAllocationManager";


const App = () => {
    const [cookies] = useCookies(['token', 'role']);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch("http://172.20.10.4:8000/connecteduser/", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${cookies.token}` // Assuming you have access to cookies containing the token
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log(userData);
                    setIsActive(userData.is_active === true); // Update the isValid state based on userData.is_active value
                } else {
                    console.error("Failed to fetch user info:", response.statusText);
                }
            } catch (error) {
                console.error("Error occurred while fetching user info:", error);
            }
        };
        fetchUserInfo();
    }, [cookies.token]);

    // Route guard for '/Admin' route
    const ProfileGuard = () => {
        const [cookies] = useCookies();
        const [isValid, setIsValid] = useState(false);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            // Simulating a validation process
            setTimeout(() => {
                // Check if token and role are valid
                if (cookies.token && cookies.role && isActive) {
                    setIsValid(true);
                }
                setIsLoading(false);
            }, 1000); // Adjust the timeout duration as needed
        }, [cookies]);

        if (isLoading) {
            // Show loading state
            return <div><Loading/></div>;
        }

        if (isValid) {
            // Redirect to the corresponding page based on role
            if (cookies.role === 'ADMIN') {
                return <Admin/>;
            } else if (cookies.role === 'PRINCIPALMANAGER') {
                return <GeneralManager/>;
            } else if (cookies.role === 'ALLOCATIONMANAGER') {
                return <AllocationManager/>;
            } else if (cookies.role === 'STUDENT') {
                return <Student/>;
            } else if (cookies.role === 'RESEARCHER') {
                return <Researcher/>;
            }
        }
        return <Navigate to="/Login"/>;
    };
    const RoleGuard = ({expectedRole}) => {
        const [cookies] = useCookies();
        const [isValid, setIsValid] = useState(false);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            // Simulating a validation process
            setTimeout(() => {
                // Check if token and role are valid
                if (cookies.token && cookies.role && isActive) {
                    setIsValid(cookies.role === expectedRole);
                }
                setIsLoading(false);
            }, 1000); // Adjust the timeout duration as needed
        }, [cookies, expectedRole]);

        if (isLoading) {
            // Show loading state
            return <div><Loading/></div>;
        }

        if (isValid) {
            // Render the child components
            return <Outlet/>;
        }

        // Redirect to the previous path
        return <Navigate to="/Login"/>;
    };
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/Admin" element={<ProfileGuard/>}>
                    <Route element={<RoleGuard expectedRole="ADMIN"/>}>
                        <Route path="" element={<DashboardAdmin/>}/>
                        <Route path="inventory" element={<InventoryAdmin/>}/>
                        <Route path="categories" element={<CategoriesAdmin/>}/>
                        <Route path="locations" element={<LocationsAdmin/>}/>
                        <Route path="managers" element={<ManagersAdmin/>}/>
                        <Route path="myaccount" element={<MyAccountAdmin/>}/>
                    </Route>
                </Route>
                <Route path="/GeneralManager" element={<ProfileGuard/>}>
                    <Route element={<RoleGuard expectedRole="PRINCIPALMANAGER"/>}>
                        <Route path="" element={<DashboardGeneralManager/>}/>
                        <Route path="stock" element={<StockGeneralManager/>}/>
                        <Route path="inventory" element={<InventoryGeneralManager/>}/>
                        <Route path="assignement" element={<Assignement/>}>
                            <Route path="LectureHalls" element={<LectureHalls/>}>
                                <Route path=':id' element={<LectureHallsContent/>}/>
                            </Route>
                            <Route path="PracticeRooms" element={<PracticeRooms/>}>
                                <Route path=':id' element={<PracticeRoomsContent/>}/>
                            </Route>
                            <Route path="LabRooms" element={<LabRooms/>}>
                                <Route path=':id' element={<LabRoomsContent/>}/>
                            </Route>
                            <Route path="Administration" element={<Administration/>}>
                                <Route path=':id' element={<AdministrationContent/>}/>
                            </Route>
                            <Route path="ReservationRoom" element={<ReservationRoom/>}>
                                <Route path=':id' element={<ReservationRoomContent/>}/>
                            </Route>
                            <Route path="ItRoom" element={<ItRoom/>}>
                                <Route path=':id' element={<ItRoomContent/>}/>
                            </Route>
                            <Route path="Corridors" element={<Corridors/>}>
                                <Route path=':id' element={<CorridorsContent/>}/>
                            </Route>
                        </Route>
                        <Route path="maintenance" element={<MaintenanceGeneralManager/>}/>
                        <Route path="myaccount" element={<MyAccountGeneralAdmin/>}/>
                    </Route>
                </Route>
                <Route path="/AllocationManager" element={<ProfileGuard/>}>
                    <Route element={<RoleGuard expectedRole="ALLOCATIONMANAGER"/>}>
                        <Route path="" element={<DashboardAllocationManager/>}/>
                        <Route path="equipment" element={<EquipmentsAllocationManager/>}/>
                        <Route path="allocations" element={<AllocationsAllocationManager/>}/>
                        <Route path="hpcschedule" element={<HPCScheduleAllocationManager/>}/>
                        <Route path="users" element={<UsersAllocationManager/>}/>
                        <Route path="myaccount" element={<MyAccountAllocationManager/>}/>
                    </Route>
                </Route>
                <Route path="/Student" element={<ProfileGuard/>}>
                    <Route element={<RoleGuard expectedRole="STUDENT"/>}>
                        <Route path="" element={<AllocationsStudent/>}/>
                        <Route path="myaccount" element={<MyAccountStudent/>}/>
                    </Route>
                </Route>
                <Route path="/Researcher" element={<ProfileGuard/>}>
                    <Route element={<RoleGuard expectedRole="RESEARCHER"/>}>
                        <Route path="" element={<AllocationsResearcher/>}/>
                        <Route path="hpcschedule" element={<HPCScheduleResearcher/>}/>
                        <Route path="myaccount" element={<MyAccountResearcher/>}/>
                    </Route>
                </Route>
                {/*<Route path="/try" element={<Try/>}/>*/}
            </Routes>
        </Router>
    );
};

createRoot(document.getElementById('app')).render(<App/>);

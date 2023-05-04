import './CSS/verticalMenu.css';
import AdminVerticalMenu from "./verticalMenuUsers/AdminVerticalMenu";
import GeneralManagerVerticalMenu from "./verticalMenuUsers/GeneralManagerVerticalMenu";
import AllocationManagerVerticalMenu from "./verticalMenuUsers/AllocationManagerVerticalMenu";
import StudentVerticalMenu from "./verticalMenuUsers/StudentVerticalMenu";
import ResearcherVerticalMenu from "./verticalMenuUsers/ResearcherVerticalMenu";
import {Link} from "react-router-dom";


const VerticalMenu = (props) => {
    return(
        <div className="menu-container">
            <div className="logo-container">
                <img src="/playground_assets/menuVertical/menu-logo.png" alt="Logo" className="logo" />
            </div>
            <div className="menu-items">
                <ul>
                    {props.displayAdminMenu && <AdminVerticalMenu showInventory={props.showInventory}/> }
                    {props.displayGeneralManagerMenu && <GeneralManagerVerticalMenu/> }
                    {props.displayAllocationManagerMenu && <AllocationManagerVerticalMenu/> }
                    {props.displayStudentMenu && <StudentVerticalMenu/> }
                    {props.displayResearcherMenu && <ResearcherVerticalMenu/> }
                </ul>
                <Link  to="/" className="menu-item">
                    <svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 2.625C0 1.92881 0.283202 1.26113 0.787305 0.768845C1.29141 0.276562 1.97512 0 2.68803 0H14.7842C15.4971 0 16.1808 0.276562 16.6849 0.768845C17.189 1.26113 17.4722 1.92881 17.4722 2.625V5.25C17.4722 5.5981 17.3306 5.93194 17.0785 6.17808C16.8265 6.42422 16.4846 6.5625 16.1282 6.5625C15.7717 6.5625 15.4299 6.42422 15.1778 6.17808C14.9258 5.93194 14.7842 5.5981 14.7842 5.25V2.625H2.68803V18.375H14.7842V15.75C14.7842 15.4019 14.9258 15.0681 15.1778 14.8219C15.4299 14.5758 15.7717 14.4375 16.1282 14.4375C16.4846 14.4375 16.8265 14.5758 17.0785 14.8219C17.3306 15.0681 17.4722 15.4019 17.4722 15.75V18.375C17.4722 19.0712 17.189 19.7389 16.6849 20.2312C16.1808 20.7234 15.4971 21 14.7842 21H2.68803C1.97512 21 1.29141 20.7234 0.787305 20.2312C0.283202 19.7389 0 19.0712 0 18.375V2.625ZM20.554 5.63456C20.806 5.38851 21.1478 5.25028 21.5042 5.25028C21.8606 5.25028 22.2024 5.38851 22.4544 5.63456L26.4865 9.57206C26.7385 9.81819 26.88 10.152 26.88 10.5C26.88 10.848 26.7385 11.1818 26.4865 11.4279L22.4544 15.3654C22.201 15.6045 21.8615 15.7368 21.5091 15.7338C21.1567 15.7308 20.8196 15.5928 20.5704 15.3494C20.3212 15.1061 20.1798 14.7769 20.1768 14.4328C20.1737 14.0886 20.3092 13.7571 20.554 13.5096L22.2918 11.8125H9.4081C9.05165 11.8125 8.70979 11.6742 8.45774 11.4281C8.20569 11.1819 8.06409 10.8481 8.06409 10.5C8.06409 10.1519 8.20569 9.81806 8.45774 9.57192C8.70979 9.32578 9.05165 9.1875 9.4081 9.1875H22.2918L20.554 7.49044C20.302 7.24431 20.1605 6.91053 20.1605 6.5625C20.1605 6.21447 20.302 5.88069 20.554 5.63456Z" fill="white"/>
                    </svg>
                    Log Out
                </Link>
            </div>
        </div>
    );
}
export default VerticalMenu;
import {Link, Outlet, useOutlet} from "react-router-dom";
import React, {useState} from "react";
import Path from "../../Path";
import EquipmentTableHeader from "../../EquipmentTableHeader";

const LabRooms = () => {
    const outlet = useOutlet();
    const OverviewItem = ({title, count, index}) => {
        const [updatedTitle, setUpdatedTitle] = useState(title);

        return (
            <div className="overview-item">
                <svg width="64px" height="64px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g clip-path="url(#clip0_901_2869)">
                            <path
                                d="M31 3V21C31 21.55 30.55 22 30 22H16H2C1.45 22 1 21.55 1 21V3C1 2.45 1.45 2 2 2H16H30C30.55 2 31 2.45 31 3Z"
                                fill="#85baff"
                            ></path>
                            <path
                                d="M10 31L16 25M16 25L22 31M16 25V22H2C1.447 22 1 21.553 1 21V3C1 2.447 1.447 2 2 2H30C30.553 2 31 2.447 31 3V21C31 21.553 30.553 22 30 22H19M16 1V2M10 10H22M10 14H15"
                                stroke="#000000"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_901_2869">
                                <rect width="32" height="32" fill="white"></rect>
                            </clipPath>
                        </defs>
                    </g>
                </svg>
                <h2>{updatedTitle}</h2>
                <p>{count} item</p>
            </div>
        );
    };
    const overviewItems = [
        {title: "Salle01", count: 50},
        {title: "Salle02", count: 70},
        {title: "Salle03", count: 100},
        {title: "Salle01", count: 50},
        {title: "Salle02", count: 70},
        {title: "Salle03", count: 100},
        {title: "Salle01", count: 50},
        {title: "Salle02", count: 70},
        {title: "Salle03", count: 100},
        {title: "Salle01", count: 50},
        {title: "Salle02", count: 70},
        {title: "Salle03", count: 100},
        {title: "Salle01", count: 50},
        {title: "Salle02", count: 70},
        {title: "Salle03", count: 100},
    ];
    return(
        <>
            {outlet ? <Outlet /> : <><Path link="/GeneralManager/assignement" linkText="Assignement" pathName="Lab rooms" />
                <div className="inventory-table">
                    <EquipmentTableHeader title={'List of locations'}/>
                    <div className="overview-grid" style={{padding:'20px'}}>
                        {overviewItems.map((item, index) => (
                            <Link to={item.title}>
                                <OverviewItem
                                    key={index}
                                    title={item.title}
                                    count={item.count}
                                    index={index}
                                />
                            </Link>

                        ))}
                    </div>
                </div></>}
        </>
    )
}
export default LabRooms;
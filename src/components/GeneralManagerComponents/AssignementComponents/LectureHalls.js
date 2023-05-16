import Path from "../../Path";
import React, {useEffect, useState} from "react";
import EquipmentTableHeader from "../../EquipmentTableHeader";
import {Link, Outlet, useOutlet} from "react-router-dom";

const LectureHalls = (props) => {
    const outlet = useOutlet();
    const [locations, setLocations] = useState([]);
    const lectureHalls = locations.filter(location => location.type === "lecture_halls");
    const lectureHallNames = lectureHalls.map(item => item.name);


    const overviewItems = [];

    for (let i = 0; i < lectureHallNames.length; i++) {
        overviewItems.push({title: lectureHallNames[i], count: 0});
    }
    const OverviewItem = ({title, count, index}) => {

        const handleClick = () => {
            console.log(title);
        };
        return (
            <div key={index} className="overview-item" onClick={handleClick}>
                <svg width="64px" height="64px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g clipPath="url(#clip0_901_2869)">
                            <path
                                d="M31 3V21C31 21.55 30.55 22 30 22H16H2C1.45 22 1 21.55 1 21V3C1 2.45 1.45 2 2 2H16H30C30.55 2 31 2.45 31 3Z"
                                fill="#85baff"
                            ></path>
                            <path
                                d="M10 31L16 25M16 25L22 31M16 25V22H2C1.447 22 1 21.553 1 21V3C1 2.447 1.447 2 2 2H30C30.553 2 31 2.447 31 3V21C31 21.553 30.553 22 30 22H19M16 1V2M10 10H22M10 14H15"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_901_2869">
                                <rect width="32" height="32" fill="white"></rect>
                            </clipPath>
                        </defs>
                    </g>
                </svg>
                <h2>{title}</h2>
                <p>{count} item</p>
            </div>
        );
    };


    useEffect(() => {
        fetch('http://127.0.0.1:8000/location/')
            .then(response => response.json())
            .then(data => {
                setLocations(data);
            })
    }, []);

    console.log(lectureHallNames);



    return (
        <>
            {outlet ? <Outlet/> :
                <>
                    <Path
                        paths={[
                            {
                                link: "/GeneralManager/assignement",
                                linkText: "Assignement",

                            },
                            {
                                pathName:'Lecture halls'
                            },

                        ]}
                    />
                    <div className="inventory-table">
                        <EquipmentTableHeader title={'List of locations'}/>
                        {lectureHallNames.length === 0 ? <div style={{padding:'20px'}}>No locations avaliable in this type</div> : <div className="overview-grid" style={{padding:'20px'}}>
                            {overviewItems.map((item, index) => (
                                <Link to={item.title} key={index}>
                                    <OverviewItem
                                        key={index}
                                        title={item.title}
                                        count={item.count}
                                        index={index}
                                    />
                                </Link>

                            ))}
                        </div>}
                    </div>
                </>}


        </>
    )
}
export default LectureHalls;
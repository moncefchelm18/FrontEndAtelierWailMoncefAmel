import Path from "../Path";
import EquipmentTableHeader from "../EquipmentTableHeader";
import React, {useState} from "react";
import {Link, Outlet, useOutlet} from "react-router-dom";

const Assignement = (props) => {


    const headerTitle = "List of locations types";
    const headerButtonName = "Filter";


    const TypesItem = (props) => {
        const colors = [/*"#314985",*/ /*"#1274a9",*/ "#1BB5F5", "#E0F5FE"];
        const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
        let randomColor2 = colors[Math.floor(Math.random() * colors.length)];
        while (randomColor1 === randomColor2) {
            randomColor2 = colors[Math.floor(Math.random() * colors.length)];
        }
        const gradient = `linear-gradient(to bottom right, ${randomColor1}, ${randomColor2})`;

        return (
            <Link to={props.title.replace(/\s+/g, '')} className="overview-grid-types-item"
                  style={{background: gradient}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="32" height="32">
                    <rect width="256" height="256" fill="none"/>
                    <path
                        d="M224,177.3V78.7a8.1,8.1,0,0,0-4.1-7l-88-49.5a7.8,7.8,0,0,0-7.8,0l-88,49.5a8.1,8.1,0,0,0-4.1,7v98.6a8.1,8.1,0,0,0,4.1,7l88,49.5a7.8,7.8,0,0,0,7.8,0l88-49.5A8.1,8.1,0,0,0,224,177.3Z"
                        fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/>
                    <polyline points="80 209 80 153.9 32 126.9" fill="none" stroke="#fff" stroke-linecap="round"
                              stroke-linejoin="round" stroke-width="8"/>
                </svg>

                <h1>{props.title}</h1>
            </Link>
        );
    };


    const outlet = useOutlet();
    return (
        <>

            {/*<div className="inventory-table">
                <EquipmentTableHeader
                    title={headerTitle}
                    buttonName={headerButtonName}
                    className={"filter_button"}
                    isFilterButton={true}
                />
                <br/>
            </div>
            <div className="overview-grid-types">
                <TypesItem title={'Lecture Halls'} />
                <TypesItem title={'Practice Rooms'}/>
                <TypesItem title={'Lab Rooms'}/>
                <TypesItem title={'Administration'}/>
                <TypesItem title={'Reservation Room'}/>
                <TypesItem title={'IT rooms'}/>
                <TypesItem title={'Corridors'}/>
            </div>
*/}
            {outlet ? <Outlet/> :
                <>
                    <Path pathName={"Assignement"}/>
                    <div className="inventory-table">
                        <EquipmentTableHeader
                            title={headerTitle}
                            buttonName={headerButtonName}
                            className={"filter_button"}
                            isFilterButton={true}
                        />
                        <br/>
                    </div>
                    <div className="overview-grid-types">
                        <TypesItem title={'Lecture Halls'}/>
                        <TypesItem title={'Practice Rooms'}/>
                        <TypesItem title={'Lab Rooms'}/>
                        <TypesItem title={'Administration'}/>
                        <TypesItem title={'Reservation Room'}/>
                        <TypesItem title={'IT Room'}/>
                        <TypesItem title={'Corridors'}/>
                    </div>
                </>
            }

        </>
    );
};

export default Assignement;

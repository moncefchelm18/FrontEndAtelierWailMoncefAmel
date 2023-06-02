import Path from "../Path";
import EquipmentTableHeader from "../EquipmentTableHeader";
import React, { useState } from "react";
import { Link, Outlet, useOutlet } from "react-router-dom";

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
            <Link
                to={props.title.replace(/\s+/g, "")}
                className="overview-grid-types-item"
                style={{ background: gradient }}
            >
                <img
                    src={props.iconPath}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                />
                <h1>{props.title}</h1>
            </Link>
        );
    };

    const outlet = useOutlet();
    return (
        <>
            {outlet ? (
                <Outlet />
            ) : (
                <>
                    <Path pathName={"Assignement"} />
                    <div className="inventory-table">
                        <EquipmentTableHeader
                            title={headerTitle}
                            /*buttonName={headerButtonName}
                            className={"filter_button"}
                            isFilterButton={true}*/
                        />
                        <br />
                    </div>
                    <div className="overview-grid-types">
                        <TypesItem
                            title={"Lecture Halls"}
                            iconPath={"../playground_assets/images/favpng_speaker-icon-business-management-icon-lecture-icon.png"}
                        />
                        <TypesItem
                            title={"Practice Rooms"}
                            iconPath={"../playground_assets/images/PikPng.com_teaching-png_2497419.png"}
                        />
                        <TypesItem
                            title={"Lab Rooms"}
                            iconPath={"../playground_assets/images/computer-lab-room-icon.png"}
                        />
                        <TypesItem
                            title={"Administration"}
                            iconPath={"../playground_assets/images/administration-icon.png"}
                        />
                        <TypesItem
                            title={"Reservation Room"}
                            iconPath={"../playground_assets/images/reservation-room-icon.png"}
                        />
                        <TypesItem
                            title={"IT Room"}
                            iconPath={"../playground_assets/images/it-room-icon.png"}
                        />
                        <TypesItem
                            title={"Corridors"}
                            iconPath={"../playground_assets/images/corridor-icon.png"}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default Assignement;

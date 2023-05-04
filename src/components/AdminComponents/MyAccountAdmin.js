import React, {useState} from "react";
import Path from "../Path";
import './CSS/myAccount.css'
import MyInfos from "../MyInfos";

const MyAccountAdmin = () => {
    return (
        <>
            <Path pathName={'My account'}/>
            <MyInfos/>
        </>
    )
        ;
}
export default MyAccountAdmin;
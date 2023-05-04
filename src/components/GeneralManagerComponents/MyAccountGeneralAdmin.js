import React, {useState} from "react";
import Path from "../Path";
import '../AdminComponents/CSS/myAccount.css'
import MyInfos from "../MyInfos";

const MyAccountGeneralAdmin = () => {
    return (
        <>
            <Path pathName={'My account'}/>
            <MyInfos/>
        </>
    )
        ;
}
export default MyAccountGeneralAdmin;
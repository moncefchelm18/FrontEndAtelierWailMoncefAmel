import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import "./AdminComponents/CSS/dashboardAdmin.css";

const Path = (props) => {
    return (
        <div className="path">
            {props.pathName? <p>{props.pathName}</p> : props.paths.map((path, index) => (
                <React.Fragment key={index}>
                    {path.link && (
                        <>
                            <Link to={path.link}><p>{path.linkText}</p></Link>
                            <FaChevronRight />
                        </>
                    )}
                    <p>{path.pathName}</p>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Path;

import './AdminComponents/CSS/inventoryAdmin.css'
import React, {Fragment} from "react";

const EquipmentTableHeader = (props) => {
    const { title, className,className3, buttonName,buttonName2, isFilterButton,isAddButton , onClick, onClicks } = props;

    return (
        <div className="equipments-table-header">
            <h2>{title}</h2>
            <div className="equipments-table-header-actions">
                {isAddButton &&
                    <Fragment>
                        <div className={className3} onClick={onClicks}>
                            <button >{buttonName2}</button>
                        </div>
                    </Fragment>
                }
                <div className={className} onClick={onClick}>
                    {isFilterButton && (
                        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H14M1.5 1H16.5M6.5 11H11.5" stroke="#5D6679" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    )}
                    <button>{buttonName}</button>
                </div>
            </div>

        </div>
    );
}

export default EquipmentTableHeader;

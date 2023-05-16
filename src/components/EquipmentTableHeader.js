import './AdminComponents/CSS/inventoryAdmin.css'
import React, {Fragment, useEffect, useState} from "react";

const EquipmentTableHeader = (props) => {
    const { title, className,className3, buttonName,buttonName2, isFilterButton,isAddButton , onClick, onClicks } = props;
    const YearSelect = () => {
        const [years, setYears] = useState([new Date().getFullYear()]); // initialize with current year
        const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

        const currentYear = new Date().getFullYear();
        useEffect(() => {
            // add new year to the options on January 1st of each year
            const intervalId = setInterval(() => {
                const newYear = new Date().getFullYear();
                if (newYear !== currentYear && !years.includes(newYear)) {
                    setYears([...years, newYear]);
                }
            }, 1000 * 60 * 60 * 24); // check once per day

            return () => clearInterval(intervalId);
        }, [years, currentYear]);
        const handleChange = (event) => {
            setSelectedYear(event.target.value);
            props.onYearSelect(selectedYear);
            console.log("Selected year:", selectedYear);
        };
        return (
            <select
                style={{
                    padding: '10px',
                    border: '2px solid #D0D3D9',
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333',
                    width: '200px',
                }}
                value={selectedYear}
                onChange={handleChange}
            >
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

        );
    }


    return (
        <div className="equipments-table-header">
            <h2>{title}</h2>
            <div className="equipments-table-header-actions">
                {props.forInventory &&
                    <>
                        <div className="inventory-table-year">
                            <p>inventory of : </p>
                            <YearSelect/>
                        </div>
                    </>
                }
                {props.forStock &&
                    <>
                        <div className="add-button-history" onClick={props.showHistorique}>
                            <svg style={{color: 'white'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                 fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
                                <path
                                    d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"
                                    fill="white"></path>
                                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"
                                      fill="white"></path>
                                <path
                                    d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
                                    fill="white"></path>
                            </svg>
                            <button >
                                Stock archive
                            </button>
                        </div>
                    </>
                }
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
                            <path d="M4 6H14M1.5 1H16.5M6.5 11H11.5" stroke="#5D6679" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                    <button>{buttonName}</button>
                </div>
            </div>

        </div>
    );
}

export default EquipmentTableHeader;

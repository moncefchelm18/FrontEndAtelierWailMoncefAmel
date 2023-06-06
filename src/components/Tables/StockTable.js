import React/*, { useState, useEffect }*/ from "react";
// import axios from "axios";
import '../CSS/equipmentTable.css';
// import EquipmentTableFooter from '../EquipmentTableFooter';

const StockTable = (props) => {
    const {equipmentData, columnTitles, columnMappings, currentPage} = props;

    return (
        <div className="equipments-table">
            <div className="equipment-table-wrapper">
                <div className="equipment-table-table">
                    <table className="equipment-table">
                        <thead className="equipment-table-head">
                        <tr>
                            {columnTitles.map((title, index) => (
                                <th key={index} className="equipment-table-header">
                                    {title}
                                </th>
                            ))}
                            <th className="equipment-table-header">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="equipment-table-body">
                        {equipmentData.slice((currentPage - 1) * 10, currentPage * 10).map((equipment, index) => (
                            <tr key={index}>
                                {Object.values(columnMappings).map((column, index) => (
                                    <td key={index} className="equipment-table-cell">
                                        {column === 'image' ? (
                                            <img src={equipment[column]} alt="Equipment" />
                                        ) : (
                                            equipment[column]
                                        )}
                                    </td>
                                ))}
                                <td className="equipment-table-cell">
                                    {props.actionRenderer(equipment)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default StockTable;

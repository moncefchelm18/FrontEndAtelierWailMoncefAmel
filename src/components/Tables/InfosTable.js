import React, { useState } from "react";
import "../CSS/equipmentTable.css";

const InfosTable = (props) => {
    const [sortColumn, setSortColumn] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSort = (columnTitle) => {
        // Toggle the sort order if the same column is clicked again
        if (sortColumn === columnTitle) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(columnTitle);
            setSortOrder("asc");
        }
    };

    const sortedData = props.data.sort((a, b) => {
        const columnMapping = props.columnMappings[sortColumn];
        const valueA = a[columnMapping];
        const valueB = b[columnMapping];

        if (valueA < valueB) {
            return sortOrder === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
            return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className="equipments-table">
            <div className="equipment-table-wrapper">
                <div className="equipment-table-table">
                    <table className="equipment-table">
                        <thead className="equipment-table-head">
                        <tr>
                            {props.columnTitles.map((title, index) => (
                                <th
                                    key={index}
                                    className="equipment-table-header"
                                    onClick={() =>
                                        title !== "Action" ? handleSort(title) : null
                                    }
                                >
                                    {title}
                                    {sortColumn === title && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}
                                </th>
                            ))}
                            {props.isInventoryAdmin ? (
                                <></>
                            ) : (
                                <th className="equipment-table-header">Action</th>
                            )}
                        </tr>
                        </thead>
                        <tbody className="equipment-table-body">
                        {sortedData
                            .slice((props.currentPage - 1) * 10, props.currentPage * 10)
                            .map((datas) => (
                                <tr key={datas.id}>
                                    {props.columnTitles.map((title, index) => (
                                        <td key={index} className={`equipment-table-cell ${title === "Condition" ? datas[props.columnMappings[title]].toLowerCase() : ''}`}>
                                            {title === "IMG" ? (
                                                <img
                                                    src={datas[props.columnMappings[title.toLowerCase()]]}
                                                    alt="Equipment"
                                                />
                                            ) : (
                                                    datas[props.columnMappings[title]]
                                            )}
                                        </td>

                                    ))}
                                    {props.isInventoryAdmin ? (
                                        <></>
                                    ) : (
                                        <td className="equipment-table-cell">
                                            {props.actionRenderer(datas)}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InfosTable;

import React, {useState} from "react";
import "../CSS/equipmentTable.css";
import {get} from "lodash";

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

    const filteredData = props.data.filter((item) =>
        Object.values(item).some((value) =>
            typeof value === "string" && value.toLowerCase().includes(props.searchValue.toLowerCase().trim())
        )
    );

    const sortedData = filteredData.sort((a, b) => {
        const columnMapping = props.columnMappings[sortColumn];
        const valueA = get(a, columnMapping);
        const valueB = get(b, columnMapping);

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
                                        <td
                                            key={index}
                                            className={`equipment-table-cell ${
                                                title === "Condition" || title === "Status"
                                                    ? datas[props.columnMappings[title]].toLowerCase()
                                                    : title === "Reference"
                                                        ? "bold-text"
                                                        : ""
                                            }`}
                                            style={title === "IMG" ? { padding: "0px" } : null}
                                            title={title === "Description" ? datas[props.columnMappings[title]] : null}
                                        >
                                            {title === "IMG" ? (
                                                console.log(datas[props.columnMappings[title]]),
                                                    <img
                                                        width={50}
                                                        height={50}
                                                        src={`http://127.0.0.1:8000${datas[props.columnMappings[title]]}`}
                                                        alt="Equipment"
                                                    />
                                            ) : title === "Reserved" ? (
                                                datas[props.columnMappings[title]] ? "YES" : "NO"
                                            ) : title === "Requested" ? (
                                                datas[props.columnMappings[title]] ? "YES" : "NO"
                                            ) : title === "Description" ? (
                                                datas[props.columnMappings[title]].length > 20
                                                    ? `${datas[props.columnMappings[title]].substring(0, 20)}...`
                                                    : datas[props.columnMappings[title]]
                                            ) : (
                                                get(datas, props.columnMappings[title])
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
                        {sortedData.length === 0 && (
                            <tr>
                                <td
                                    colSpan={props.columnTitles.length + 1}
                                    className="no-results"
                                >
                                    No results found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InfosTable;

/*import React, { useState } from "react";
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
    const filteredData = props.data.filter((item) =>
        Object.values(item).some((value) =>
            typeof value === "string" && value.toLowerCase().includes(props.searchValue.toLowerCase())
        )
    );

    const sortedData = filteredData.sort((a, b) => {
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
                                                title === "Reserved" ? (
                                                    datas[props.columnMappings[title]] ? "YES" : "NO"
                                                ) : (
                                                    datas[props.columnMappings[title]]
                                                )
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
                        {sortedData.length === 0 && (
                            <tr>
                                <td colSpan={props.columnTitles.length + 1} className="no-results">
                                    No results found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InfosTable;
*/
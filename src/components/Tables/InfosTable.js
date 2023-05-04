import '../CSS/equipmentTable.css'
import React from "react";
const InfosTable = (props) => {

    return(
        <div className="equipments-table">
            <div className="equipment-table-wrapper">
                <div className="equipment-table-table">
                    <table className="equipment-table">
                        <thead className="equipment-table-head">
                        <tr>
                            {props.columnTitles.map((title, index) => (
                                <th key={index} className="equipment-table-header">
                                    {title}
                                </th>
                            ))}
                            {props.isInventoryAdmin ? (<></>) : (
                                <th className="equipment-table-header">
                                    Action
                                </th>)
                            }

                        </tr>
                        </thead>
                        <tbody className="equipment-table-body">
                        {props.data.slice((props.currentPage - 1) * 10, props.currentPage * 10).map((datas) => (
                            <tr key={datas.id}>
                                {props.columnTitles.map((title,{/* index*/}) => (
                                    /* console.log(equipment)console.log(title),
                                        console.log(equipment),
                                    console.log(equipment[title.toLowerCase()]),*/
                                    <td /*key={index}*/ className="equipment-table-cell">
                                        {
                                            title === 'IMG' ? (
                                            <img src={datas[props.columnMappings[title.toLowerCase()]]} alt="Equipment" />
                                        ) : (

                                                datas[props.columnMappings[title]]
                                        )}
                                    </td>
                                ))}
                                {props.isInventoryAdmin ? (<></>) : (
                                    <td className="equipment-table-cell">
                                        {props.actionRenderer(datas)}
                                    </td>)
                                }
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default InfosTable
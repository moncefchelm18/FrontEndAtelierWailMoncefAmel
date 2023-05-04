import React, {Fragment, useState} from "react";
import Path from "../Path";
import './CSS/inventoryAdmin.css';
import '../CSS/equipmentTable.css';
import './Forms/categoriesForm.css';
import EquipmentTableFooter from "../EquipmentTableFooter";
import EquipmentTableHeader from "../EquipmentTableHeader";
import ManagersForm from "./Forms/ManagersForm";

const ManagersAdmin = () => {
    const managerData = [
        {
            id: 1,
            img: "https://example.com/image1.jpg",
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            password: "password123",
            role: "Manager",
            phone: "+1-555-555-5555",
            nationalId: "1234567890",
            address: "123 Main St, Anytown, USA"
        },
        {
            id: 2,
            img: "https://example.com/image2.jpg",
            firstName: "Jane",
            lastName: "Doe",
            email: "janedoe@example.com",
            password: "password456",
            role: "Manager",
            phone: "+1-555-555-5555",
            nationalId: "0987654321",
            address: "456 Main St, Anytown, USA"
        },
        // more manager data objects can be added here...
    ];
    const [showForm, setShowForm] = useState(false);
    const handleAddClick = () => {
        setShowForm(true); // show form when Add button is clicked
    }
    const handleCancelForm = () =>{
        setShowForm(false);
    }


    return (
        <>
            <Path pathName={'Managers'} />
            <div className="inventory-table">
                <EquipmentTableHeader
                    title={'List of managers'}
                    buttonName={'Filter'}
                    buttonName2={'Add manager'}
                    className={'filter_button'}
                    className3={'add-button'}
                    isAddButton={true}
                    isFilterButton={true}
                    onClicks={handleAddClick}
                />
                {showForm &&
                    <Fragment>
                        <div onClick={handleCancelForm} className="overlay" />
                        <ManagersForm handleCancelForm={handleCancelForm}/>
                    </Fragment>
                }
                <div className="equipments-table">
                    <div className="equipment-table-wrapper">
                        <div className="equipment-table-table">
                            <table className="equipment-table">
                                <thead className="equipment-table-head">
                                <tr>
                                    <th className="equipment-table-header">ID</th>
                                    <th className="equipment-table-header">IMG</th>
                                    <th className="equipment-table-header">First Name</th>
                                    <th className="equipment-table-header">Last Name</th>
                                    <th className="equipment-table-header">Email</th>
                                    <th className="equipment-table-header">Password</th>
                                    <th className="equipment-table-header">Role</th>
                                    <th className="equipment-table-header">Phone</th>
                                    <th className="equipment-table-header">National ID</th>
                                    <th className="equipment-table-header">Address</th>
                                    <th className="equipment-table-header">Action</th>
                                </tr>
                                </thead>
                                <tbody className="equipment-table-body">
                                {managerData.map((manager) => (
                                    <tr key={manager.id}>
                                        <td className="equipment-table-cell">{manager.id}</td>
                                        <td className="equipment-table-cell">
                                            <img src={manager.img} alt={manager.firstName} />
                                        </td>
                                        <td className="equipment-table-cell">{manager.firstName}</td>
                                        <td className="equipment-table-cell">{manager.lastName}</td>
                                        <td className="equipment-table-cell">{manager.email}</td>
                                        <td className="equipment-table-cell">{manager.password}</td>
                                        <td className="equipment-table-cell">{manager.role}</td>
                                        <td className="equipment-table-cell">{manager.phone}</td>
                                        <td className="equipment-table-cell">{manager.nationalId}</td>
                                        <td className="equipment-table-cell">{manager.address}</td>
                                        <td className="equipment-table-cell">
                                            <button className="equipment-table-button">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <EquipmentTableFooter/>
            </div>
        </>
    );
}
export default ManagersAdmin;
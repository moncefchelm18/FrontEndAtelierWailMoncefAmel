import Path from "../Path";
import EquipmentTableHeader from "../EquipmentTableHeader";
import {Fragment, useState} from "react";
import UsersForm from "./Forms/UsersForm";

const UsersAllocationManager = (props) => {
    const managerData = [
        {
            id: 1,
            img: "https://example.com/image1.jpg",
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            password: "password123",
            role: "Researcher",
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
            role: "Student",
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
    return(
        <>
            <Path pathName={'Users'}/>
            <div className="inventory-table">
                <EquipmentTableHeader
                    title={'List of users'}
                    buttonName={'Filter'}
                    buttonName2={'Add user'}
                    className={'filter_button'}
                    className3={'add-button'}
                    isAddButton={true}
                    isFilterButton={true}
                    onClicks={handleAddClick}
                />
                {showForm &&
                    <Fragment>
                        <div onClick={handleCancelForm} className="overlay" />
                        <UsersForm handleCancelForm={handleCancelForm}/>
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
                                            <button>
                                                <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M6.96872 2.3C6.96872 1.69 7.22364 1.10499 7.67741 0.673654C8.13118 0.242321 8.74661 0 9.38834 0H16.6472C17.2889 0 17.9043 0.242321 18.3581 0.673654C18.8119 1.10499 19.0668 1.69 19.0668 2.3V4.6H23.906C24.2269 4.6 24.5346 4.72116 24.7615 4.93683C24.9884 5.15249 25.1158 5.445 25.1158 5.75C25.1158 6.055 24.9884 6.34751 24.7615 6.56317C24.5346 6.77884 24.2269 6.9 23.906 6.9H22.6128L21.5638 20.8633C21.5204 21.4436 21.2472 21.9866 20.7994 22.3831C20.3515 22.7796 19.7623 23 19.1503 23H6.88403C6.27204 23 5.68277 22.7796 5.23493 22.3831C4.78708 21.9866 4.51392 21.4436 4.47047 20.8633L3.42398 6.9H2.12949C1.80863 6.9 1.50091 6.77884 1.27402 6.56317C1.04714 6.34751 0.919678 6.055 0.919678 5.75C0.919678 5.445 1.04714 5.15249 1.27402 4.93683C1.50091 4.72116 1.80863 4.6 2.12949 4.6H6.96872V2.3ZM9.38834 4.6H16.6472V2.3H9.38834V4.6ZM5.84844 6.9L6.88524 20.7H19.1515L20.1883 6.9H5.84844ZM10.5981 9.2C10.919 9.2 11.2267 9.32116 11.4536 9.53683C11.6805 9.75249 11.808 10.045 11.808 10.35V17.25C11.808 17.555 11.6805 17.8475 11.4536 18.0632C11.2267 18.2788 10.919 18.4 10.5981 18.4C10.2773 18.4 9.96957 18.2788 9.74268 18.0632C9.5158 17.8475 9.38834 17.555 9.38834 17.25V10.35C9.38834 10.045 9.5158 9.75249 9.74268 9.53683C9.96957 9.32116 10.2773 9.2 10.5981 9.2ZM15.4374 9.2C15.7582 9.2 16.066 9.32116 16.2928 9.53683C16.5197 9.75249 16.6472 10.045 16.6472 10.35V17.25C16.6472 17.555 16.5197 17.8475 16.2928 18.0632C16.066 18.2788 15.7582 18.4 15.4374 18.4C15.1165 18.4 14.8088 18.2788 14.5819 18.0632C14.355 17.8475 14.2276 17.555 14.2276 17.25V10.35C14.2276 10.045 14.355 9.75249 14.5819 9.53683C14.8088 9.32116 15.1165 9.2 15.4374 9.2Z"
                                                        fill="#E01515"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default UsersAllocationManager;
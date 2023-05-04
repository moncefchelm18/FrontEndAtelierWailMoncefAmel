import '../CSS/equipmentTable.css'
import React from "react";

const InventoryTable = (props) => {

    // Example data
    const equipmentData = [{
        id: 1,
        name: 'Laptop',
        category: 'Computers',
        brand: 'Dell',
        model: 'Latitude E6420',
        reference: '123456',
        serialNumber: 'ABC123',
        invoiceNumber: 'FA123',
        condition: 'Good',
        purchaseDate: '2022-01-01',
        location: 'Salle01',
        description: 'Professional laptop',
        img: 'laptop_image.jpg'
    }, {
        id: 2,
        name: 'Printer',
        category: 'Computers',
        brand: 'HP',
        model: 'LaserJet Pro M203dw',
        reference: '789012',
        serialNumber: 'DEF456',
        invoiceNumber: 'FA456',
        condition: 'Good',
        purchaseDate: '2022-02-01',
        location: 'Salle02',
        description: 'Professional laser printer',
        img: 'printer_image.jpg'
    }, {
        id: 3,
        name: 'Phone',
        category: 'Telephony',
        brand: 'Apple',
        model: 'iPhone 13',
        reference: '345678',
        serialNumber: 'GHI789',
        invoiceNumber: 'FA789',
        condition: 'Low',
        purchaseDate: '2022-03-01',
        location: 'Amphi01',
        description: 'Professional phone',
        img: 'phone_image.jpg'
    }];

    const columnMappings = {
        'ID': 'id',
        'IMG': 'img',
        'Name': 'name',
        'Category': 'category',
        'Brand': 'brand',
        'Model': 'model',
        'Reference': 'reference',
        'Serial Number': 'serialNumber',
        'Invoice Number': 'invoiceNumber',
        'Condition': 'condition',
        'Purchase Date': 'purchaseDate',
        'Location': 'location',
        'Description': 'description',
    };

// Map column titles to column mappings
    const columnTitles = Object.keys(columnMappings);

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
                        {equipmentData.map((equipment, index) => (
                            <tr key={index}>
                                {Object.values(columnMappings).map((column, index) => (
                                    <td key={index} className="equipment-table-cell">
                                        {column === 'img' ? (
                                            <img src={'s'} alt="Equipment" />
                                        ) : (
                                            equipment[column]
                                        )}
                                    </td>
                                ))}
                                <td className="equipment-table-cell">
                                    {props.actionRenderer()}
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

export default InventoryTable;
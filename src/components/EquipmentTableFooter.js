import React from "react";
import './CSS/equipmentTableFooter.css'

const EquipmentTableFooter = (props) => {
    const { currentPage, totalPages, handlePrevPage, handleNextPage } = props;

    return (
        <div className="equipment-table-footer">
            <div className="buttonss">
                <button disabled={currentPage === 1} onClick={handlePrevPage}>
                    Previous
                </button>
            </div>
            <p>Page {currentPage} of {totalPages}</p>
            <div className="buttonss">
                <button disabled={currentPage === totalPages || totalPages === 0} onClick={handleNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default EquipmentTableFooter;

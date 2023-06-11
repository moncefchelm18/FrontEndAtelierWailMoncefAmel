import React from "react";

const DeleteConfirmation = (props) => {
    return (
        <div className="add-form">
            <p>Are you sure you want to delete?</p>
            <div className="add-form-actions">
                <button className="add-form-actions-submit" style={{backgroundColor:'red'}} onClick={props.onDelete}>
                    Delete
                </button>
                <button className="add-form-actions-discard" onClick={props.onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
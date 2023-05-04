import {useState} from "react";

const AssignementForm = (props) => {
    const [categories, setCategories] = useState([]);

    const handleCategoriesChange = (event) => {
        const options = event.target.options;
        const selectedCategories = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedCategories.push(options[i].value);
            }
        }
        setCategories(selectedCategories);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return(
        <div className="add-form">
            <h2>Assign new equipments</h2>
            <form onSubmit={handleSubmit}>
                <div className="add-form-input">
                    <label htmlFor="categories">
                        Categories
                    </label>
                    <select id="type" className="add-form-input-select" onChange={handleCategoriesChange}>
                        <option value="" disabled selected hidden>Select a categorie</option>
                        <option value="Categorie1">Categorie 1</option>
                        <option value="Categorie2">Categorie 2</option>
                    </select>
                </div>
                <div className="add-form-input">
                    <label htmlFor="name">
                        Name
                    </label>
                    <select id="type" className="add-form-input-select">
                        <option value="" disabled selected hidden>Select name of the equipment</option>
                        <option value="name1">name 1</option>
                        <option value="name2">name 2</option>
                    </select>
                </div>
                <div className="add-form-input">
                    <label htmlFor="brand">
                        Brand
                    </label>
                    <select id="type" className="add-form-input-select">
                        <option value="" disabled selected hidden>Select brand of the equipment</option>
                        <option value="brand1">brand 1</option>
                        <option value="brand2">brand 2</option>
                    </select>
                </div>
                <div className="add-form-input">
                    <label htmlFor="model">
                        Model
                    </label>
                    <select id="type" className="add-form-input-select">
                        <option value="" disabled selected hidden>Select model of the equipment</option>
                        <option value="model1">model 1</option>
                        <option value="model2">model 2</option>
                    </select>
                </div>
                <div className="add-form-input">
                    <label htmlFor="quantity">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        className="add-form-input-input"
                        placeholder="Enter quantity"
                    />
                </div>
                <div className="add-form-actions">
                    <button type="submit" className="add-form-actions-submit">Add</button>
                    <button className="add-form-actions-discard" onClick={props.handleCancelForm} >Discard</button>
                </div>
            </form>
        </div>
    );
}

export default AssignementForm;
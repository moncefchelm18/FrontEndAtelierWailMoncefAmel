import {useState} from "react";

const StockForm = (props) => {
    const [categories, setCategories] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);

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
        console.log("Categories:", categories);
    }

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setPreviewImage(imageUrl);
    }

    return(
        <div className="add-form">
            <h2>New Equipment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-container-form-infos-input-img">
                    <label htmlFor="image">
                        {previewImage ? (
                            <img className="preview-image" src={previewImage} alt="Preview"/>
                        ) : (
                            <svg width="83" height="83" viewBox="0 0 83 83" fill="none"
                                 >
                                <rect x="0.5" y="0.5" width="82" height="82" rx="41" stroke="#9D9D9D"
                                      stroke-linecap="round" stroke-linejoin="round"
                                      stroke-dasharray="5 5"/>
                            </svg>
                        )}
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        style={{opacity: 0, position: 'absolute', zIndex: -1}}
                        onChange={handleImageChange}
                    />
                    <div className="input-image-text">
                        <p className="input-label">Drag image here</p>
                        <p className="input-or">or</p>
                        <label htmlFor="image" className="input-browse">Browse image</label>
                    </div>
                </div>
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
                    <input
                        type="text"
                        id="name"
                        className="add-form-input-input"
                        placeholder="Enter equipment name"
                    />
                </div>
                <div className="add-form-input">
                    <label htmlFor="brand">
                        Brand
                    </label>
                    <input
                        type="text"
                        id="brand"
                        className="add-form-input-input"
                        placeholder="Enter brand"
                    />
                </div>
                <div className="add-form-input">
                    <label htmlFor="model">
                        Model
                    </label>
                    <input
                        type="text"
                        id="model"
                        className="add-form-input-input"
                        placeholder="Enter model"
                    />
                </div>
                <div className="add-form-input">
                    <label htmlFor="serialnumber">
                        Serial Number
                    </label>
                    <input
                        type="number"
                        id="serialnumber"
                        className="add-form-input-input"
                        placeholder="Enter serial number"
                    />
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
                <div className="add-form-input">
                    <label htmlFor="invoicenumber">
                        Invoice Number
                    </label>
                    <input
                        type="number"
                        id="invoicenumber"
                        className="add-form-input-input"
                        placeholder="Enter invoice number"
                    />
                </div>
                <div className="add-form-input">
                    <label htmlFor="purchasedate">
                        Purchase Date
                    </label>
                    <input
                        type="date"
                        id="purchasedate"
                        className="add-form-input-input"
                    />
                </div>
                <div className="add-form-input">
                    <label htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="add-form-input-textarea"
                        placeholder="Write a description about these items"
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

export default StockForm;
import {useEffect, useRef, useState} from "react";

const StockForm = (props) => {
    const [categories, setCategories] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [factureNumber, setFactureNumber] = useState('');
    const [datePurchase, setDatePurchase] = useState('');
    // const [location, setLocation] = useState([]);
    const [quantite, setQuantite] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const formRef = useRef(null);

    const handleCategoriesChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !brand || !model || !selectedCategory || !factureNumber || !datePurchase || !quantite/*|| !event.target.image.files[0]*/){
            setMessage(<p style={{color: 'red'}}>Please fill all columns!</p>)
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }else{
            const formData = new FormData();
            formData.append('created_by', 1);
            formData.append('name', name);
            formData.append('brand', brand);
            formData.append('model', model);
            formData.append('categorie', selectedCategory);
            formData.append('facture_number', factureNumber);
            formData.append('date_purchase', datePurchase);
            formData.append('quantite', quantite);
            formData.append('discription', description);
            formData.append('image', event.target.image.files[0] || '');

            console.log(event.target.image.files[0])
            fetch('http://127.0.0.1:8000/stock/', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                        console.log(data);
                        props.getUpdatedData(data);
                        setMessage(<p style={{color:'green'}}>Added to stock succefully!</p>)
                    }
                )
                .catch(
                    error => console.error(error)
                );
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setPreviewImage(imageUrl);
    };

    // forCategorieOptionList
    useEffect(() => {
        fetch('http://127.0.0.1:8000/categories/')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            });
    }, [])
    const categoriesList = categories.map((category) => {
        return category.name;
    });
    const options = categoriesList.map((category) => {
        return <option key={category} value={category}>{category}</option>
    });

    // forLocation
    /*useEffect(() => {
        fetch('http://172.20.10.4:8000/location/')
            .then(response => response.json())
            .then(data => {
                setLocation(data);
            });
    }, []);*/
    // console.log(location);
    // console.log(location);
    /*const locations = location.map((location) => {
        return (location.name);
    });*/
    return(
        <div className="add-form">
            <h2 ref={formRef}>New Equipment</h2>
            {message && message}
            <form
                onSubmit={handleSubmit}
                onClick={() => setMessage(null)}
            >
                <div className="form-container-form-infos-input-img">
                    <label htmlFor="image">
                        {previewImage ? (
                            <img className="preview-image" src={previewImage} alt="Preview"/>
                        ) : (
                            <svg width="83" height="83" viewBox="0 0 83 83" fill="none"
                                 >
                                <rect x="0.5" y="0.5" width="82" height="82" rx="41" stroke="#9D9D9D"
                                      strokeLinecap="round" strokeLinejoin="round"
                                      strokeDasharray="5 5"/>
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
                    <select id="type" className="add-form-input-select" value={selectedCategory || ""} onChange={handleCategoriesChange}>
                    <option value="" disabled hidden>Select a category</option>
                        {options}
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
                        value={name}
                        onChange={(event) => setName(event.target.value)}
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
                        value={brand}
                        onChange={(event) => setBrand(event.target.value)}
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
                        value={model}
                        onChange={(event) => setModel(event.target.value)}
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
                        value={quantite}
                        onChange={(event) => setQuantite(event.target.value)}
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
                        value={factureNumber}
                        onChange={(event) => setFactureNumber(event.target.value)}
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
                        value={datePurchase}
                        onChange={(event) => setDatePurchase(event.target.value)}
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
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
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
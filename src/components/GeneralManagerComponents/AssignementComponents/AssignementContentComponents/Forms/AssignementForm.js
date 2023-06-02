import {useEffect, useState} from "react";
import axios from "axios";

const AssignementForm = (props) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [stockData, setStockData] = useState([]);
    const [filteredStockData, setFilteredStockData] = useState([]);
    const [selectedEquipmentName, setSelectedEquipmentName] = useState("");
    const [equipmentNames, setEquipmentNames] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [equipmentBrands, setEquipmentBrands] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [equipmentModels, setEquipmentModels] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState(null);


    // getting-stock-data
    useEffect(() => {
        fetch("http://127.0.0.1:8000/equipement/")
            .then((response) => response.json())
            .then((data) => {
                setStockData(data);
                setFilteredStockData(data); // set initial value for filtered data
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedCategory || !selectedEquipmentName || !selectedBrand || !selectedModel || !quantity) {
            setMessage(<p style={{ color: 'red' }}>Please fill all columns!</p>);
            return;
        }
        if (quantity > filteredStockData.length) {
            alert("Quantity is greater than available stock");
            return;
        }else{
            let updatedFilteredStockData = [...filteredStockData]; // Create a local copy to store the filtered data

            for (let i = 0; i < quantity; i++) {
                const randomIndex = Math.floor(Math.random() * updatedFilteredStockData.length);
                const reference = updatedFilteredStockData[randomIndex].reference;
                const data = { reference: reference, Location: props.location };
                fetch("http://127.0.0.1:8000/affectation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log(responseData);
                        props.onAssignedEquipmentChange(responseData);
                        setMessage(<p style={{ color: 'green' }}>{responseData.messge}</p>);
                    })
                    .catch((error) => {
                        console.error(error);
                        setMessage(<p style={{ color: 'red' }}>{error}</p>);
                    });

                // Remove the assigned equipment from the local filtered data
                updatedFilteredStockData = updatedFilteredStockData.filter(
                    (item, index) => index !== randomIndex
                );
            }
            // Update the state with the final filtered data after the loop finishes
            setFilteredStockData(updatedFilteredStockData);
        }
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
    const handleCategoriesChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    // console.log(selectedCategory)


    // filterStockData
    useEffect(() => {
        if (selectedCategory) {
            const filteredData = stockData.filter(
                (item) => item.categorie === selectedCategory
            );
            setFilteredStockData(filteredData);
        } else {
            setFilteredStockData(stockData); // if no category selected, reset filtered data to all equipment data
        }
    }, [selectedCategory, stockData]);

    // console.log(filteredStockData);

    useEffect(() => {
        if (selectedCategory) {
            const filteredData = stockData.filter(item => item.categorie === selectedCategory);
            const uniqueEquipmentName = [
                ...new Set(filteredData.map((item) => item.name)),
            ];
            setEquipmentNames(uniqueEquipmentName);
        }
    }, [selectedCategory, setSelectedCategory, stockData]);


    const nameOptions = equipmentNames.map((name, index) => (
        <option key={`${name}-${index}`} value={name}>
            {name}
        </option>
    ));
    const handleNameChange = (event) => {
        setSelectedEquipmentName(event.target.value);
    };
    // console.log(filteredStockData.map(item => item.brand))



    useEffect(() => {
        if (selectedCategory && selectedEquipmentName) {
            const filteredData = stockData.filter(
                (item) =>
                    item.categorie === selectedCategory &&
                    item.name === selectedEquipmentName
            );
            const uniqueBrands = [
                ...new Set(filteredData.map((item) => item.brand)),
            ];
            setEquipmentBrands(uniqueBrands);
        } else {
            setEquipmentBrands([]);
        }
    }, [selectedCategory, selectedEquipmentName, setEquipmentNames, stockData]);

    const brandOptions = equipmentBrands.map((brand, index) => (
        <option key={`${brand}-${index}`} value={brand}>
            {brand}
        </option>
    ));
    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };
    useEffect(() => {
        if (selectedCategory && selectedEquipmentName && selectedBrand) {
            const filteredData = stockData.filter(
                (item) =>
                    item.categorie === selectedCategory &&
                    item.name === selectedEquipmentName &&
                    item.brand === selectedBrand
            );
            const uniqueModels = [
                ...new Set(filteredData.map((item) => item.model)),
            ];
            setEquipmentModels(uniqueModels);
        } else {
            setEquipmentModels([]);
        }
    }, [selectedCategory, selectedEquipmentName, selectedBrand, setEquipmentNames, setSelectedBrand, stockData]);
    const modelOptions = equipmentModels.map((model, index) => (
        <option key={`${model}-${index}`} value={model}>
            {model}
        </option>
    ));
    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };
    useEffect(() => {
        if (selectedCategory && selectedEquipmentName && selectedBrand && selectedModel) {
            const filteredData = stockData.filter(
                (item) =>
                    item.categorie === selectedCategory &&
                    item.name === selectedEquipmentName &&
                    item.brand === selectedBrand &&
                    item.model === selectedModel
            );
            setFilteredStockData(filteredData);
            console.log(filteredStockData)
        }
        else if (selectedCategory && selectedEquipmentName && selectedBrand) {
            const filteredData = stockData.filter(
                (item) =>
                    item.categorie === selectedCategory &&
                    item.name === selectedEquipmentName &&
                    item.brand === selectedBrand
            );
            setFilteredStockData(filteredData);

        }
        else if (selectedCategory && selectedEquipmentName) {
            const filteredData = stockData.filter(
                (item) =>
                    item.categorie === selectedCategory &&
                    item.name === selectedEquipmentName
            );
            setFilteredStockData(filteredData);
        } else if (selectedCategory) {
            const filteredData = stockData.filter(
                (item) => item.categorie === selectedCategory
            );
            setFilteredStockData(filteredData);
        } else {
            setFilteredStockData(stockData);
        }
    }, [selectedCategory, selectedEquipmentName, selectedBrand, selectedModel, stockData]);
    // console.log(filteredStockData);

    return (
        <div className="add-form" onClick={() => setMessage(null)}>
            <h2>Assign new equipments</h2>
            {message && message}
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="name">Name</label>
                    <select id="name" className="add-form-input-select" value={selectedEquipmentName} onChange={handleNameChange}>
                        <option value="" disabled hidden>
                            Select name of the equipment
                        </option>
                        {nameOptions}
                    </select>
                </div>
                <div className="add-form-input">
                    <label htmlFor="brand">Brand</label>
                    <select
                        id="brand"
                        className="add-form-input-select"
                        value={selectedBrand}
                        onChange={handleBrandChange}
                    >
                        <option value="" disabled hidden>
                            Select brand of the equipment
                        </option>
                        {brandOptions}
                    </select>

                </div>
                <div className="add-form-input">
                    <label htmlFor="brand">Model</label>
                    <select
                        id="model"
                        className="add-form-input-select"
                        value={selectedModel}
                        onChange={handleModelChange}
                    >
                        <option value="" disabled hidden>
                            Select model of the equipment
                        </option>
                        {modelOptions}
                    </select>
                </div>
                <div className="add-form-input">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        className="add-form-input-input"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className="add-form-actions">
                    <button type="submit" className="add-form-actions-submit">
                        Add
                    </button>
                    <button
                        className="add-form-actions-discard"
                        onClick={props.handleCancelForm}
                    >
                        Discard
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AssignementForm;

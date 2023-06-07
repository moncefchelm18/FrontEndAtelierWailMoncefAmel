import React, {Fragment, useEffect, useState} from "react";
import '../CSS/equipmentTable.css';
import '../../Pages/usersPages/CSS/page.css';
import './Forms/categoriesForm.css';
import Path from "../Path";
import EquipmentTableFooter from "../EquipmentTableFooter";
import EquipmentTableHeader from "../EquipmentTableHeader";
import CategoriesForm from "./Forms/CategoriesForm";
import InfosTable from "../Tables/InfosTable";
// import axios from "axios";
import DeleteConfirmation from "./Forms/DeleteConfirmation";
import Loading from "../Loading";
import {useCookies} from "react-cookie";
import {SearchValueContext} from "../../Pages/usersPages/Admin";
import axios from "../../axios";

const CategoriesAdmin = () => {
    // const title = 'Equipments categories';
    const buttonName = 'Add';
    const [showForm, setShowForm] = useState(false); // add state variable to show/hide form
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showUpdatingForm, setShowUpdatingForm] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updateMessage, setUpdateMessage] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [loading, setLoading] = useState(null);
    const [searchValueState, setSearchValueState] = useState('');
    const [cookies] = useCookies(['token']);

    const columnMappings = {
        "Categorie name": "name",
        "Description": "discription",
    };
    const columnTitles = Object.keys(columnMappings);
    // displayData
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/categories/', {
                    headers: {
                        Authorization: `Token ${cookies.token}`
                    }
                });

                if (response.status === 200) {
                    const data = response.data;
                    setCategories(data);
                } else {
                    // Handle error response
                    console.log('Error:', response.status);
                }
            } catch (error) {
                console.log('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [cookies.token]);
    // to get data from form and render them with categories list
    const getUpdatedData = (data) => {
        // console.log(categories, data);
        setCategories([...categories, data['the new categorie']])
    }

    const handleAction = (category) => {
        return (
            <>
                <button onClick={() => handleUpdate(category)}>
                    <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg"
                         className="action-button">
                        <path
                            d="M17.1897 0.685637C17.4315 0.450078 17.7595 0.317749 18.1015 0.317749C18.4435 0.317749 18.7715 0.450078 19.0134 0.685637L22.8827 4.45515C23.1244 4.69078 23.2603 5.01032 23.2603 5.3435C23.2603 5.67668 23.1244 5.99622 22.8827 6.23185L11.2748 17.5404C11.033 17.7761 10.705 17.9085 10.363 17.9086H6.49371C6.15164 17.9086 5.82359 17.7762 5.58171 17.5405C5.33984 17.3049 5.20395 16.9853 5.20395 16.652V12.8825C5.20402 12.5493 5.33996 12.2298 5.58185 11.9942L17.1897 0.685637ZM7.78347 13.4027V15.3955H9.82902L20.1471 5.3435L18.1015 3.35068L7.78347 13.4027ZM0.0449219 5.3435C0.0449219 4.67701 0.316691 4.03781 0.800444 3.56653C1.2842 3.09525 1.94031 2.83049 2.62444 2.83049H9.07322C9.41529 2.83049 9.74334 2.96287 9.98522 3.19851C10.2271 3.43415 10.363 3.75375 10.363 4.087C10.363 4.42024 10.2271 4.73984 9.98522 4.97548C9.74334 5.21112 9.41529 5.3435 9.07322 5.3435H2.62444V20.4216H18.1015V14.139C18.1015 13.8058 18.2374 13.4862 18.4793 13.2506C18.7212 13.0149 19.0492 12.8825 19.3913 12.8825C19.7333 12.8825 20.0614 13.0149 20.3033 13.2506C20.5452 13.4862 20.681 13.8058 20.681 14.139V20.4216C20.681 21.0881 20.4093 21.7272 19.9255 22.1985C19.4418 22.6698 18.7857 22.9346 18.1015 22.9346H2.62444C1.94031 22.9346 1.2842 22.6698 0.800444 22.1985C0.316691 21.7272 0.0449219 21.0881 0.0449219 20.4216V5.3435Z"
                            fill="#04537D"/>
                    </svg>
                </button>
                <button onClick={() => {
                    setCategoryToDelete(category.id);
                    setShowDeleteConfirmation(true);
                }} className="action-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.15778 2.71025C6.15778 2.08315 6.40237 1.48173 6.83774 1.03831C7.27312 0.594879 7.86361 0.345764 8.47932 0.345764H15.4439C16.0596 0.345764 16.6501 0.594879 17.0855 1.03831C17.5209 1.48173 17.7655 2.08315 17.7655 2.71025V5.07474H22.4085C22.7164 5.07474 23.0116 5.19929 23.2293 5.42101C23.447 5.64272 23.5693 5.94343 23.5693 6.25698C23.5693 6.57053 23.447 6.87124 23.2293 7.09295C23.0116 7.31466 22.7164 7.43922 22.4085 7.43922H21.1677L20.1613 21.794C20.1196 22.3906 19.8575 22.9488 19.4278 23.3564C18.9981 23.764 18.4327 23.9906 17.8456 23.9906H6.07653C5.48934 23.9906 4.92396 23.764 4.49427 23.3564C4.06457 22.9488 3.80249 22.3906 3.7608 21.794L2.75673 7.43922H1.51471C1.20686 7.43922 0.91161 7.31466 0.693924 7.09295C0.476238 6.87124 0.353943 6.57053 0.353943 6.25698C0.353943 5.94343 0.476238 5.64272 0.693924 5.42101C0.91161 5.19929 1.20686 5.07474 1.51471 5.07474H6.15778V2.71025ZM8.47932 5.07474H15.4439V2.71025H8.47932V5.07474ZM5.08291 7.43922L6.07769 21.6261H17.8467L18.8415 7.43922H5.08291ZM9.64009 9.80371C9.94794 9.80371 10.2432 9.92827 10.4609 10.15C10.6786 10.3717 10.8009 10.6724 10.8009 10.986V18.0794C10.8009 18.393 10.6786 18.6937 10.4609 18.9154C10.2432 19.1371 9.94794 19.2617 9.64009 19.2617C9.33223 19.2617 9.03698 19.1371 8.8193 18.9154C8.60161 18.6937 8.47932 18.393 8.47932 18.0794V10.986C8.47932 10.6724 8.60161 10.3717 8.8193 10.15C9.03698 9.92827 9.33223 9.80371 9.64009 9.80371ZM14.2832 9.80371C14.591 9.80371 14.8863 9.92827 15.1039 10.15C15.3216 10.3717 15.4439 10.6724 15.4439 10.986V18.0794C15.4439 18.393 15.3216 18.6937 15.1039 18.9154C14.8863 19.1371 14.591 19.2617 14.2832 19.2617C13.9753 19.2617 13.6801 19.1371 13.4624 18.9154C13.2447 18.6937 13.1224 18.393 13.1224 18.0794V10.986C13.1224 10.6724 13.2447 10.3717 13.4624 10.15C13.6801 9.92827 13.9753 9.80371 14.2832 9.80371Z"
                            fill="#E01515"/>
                    </svg>
                </button>
            </>

        )
    };

    // updatingForm
    const CategoriesUpdatingForm = (props) => {
        const [name, setName] = useState(props.category.name);
        const [description, setDescription] = useState(props.category.discription);

        console.log(props.category.name)
        const handleNameChange = (event) => {
            setName(event.target.value);
        };

        const handleDescriptionChange = (event) => {
            setDescription(event.target.value);
        };

        const handleSubmit = (event) => {
            event.preventDefault();

            const updatedCategory = {
                id: props.category.id,
                Id_admin: 1,
                name: name,
                discription: description,
                created_on: props.category.created_on,
            };

            setLoading(true);
            axios.put(`/categories/${props.category.id}/`, updatedCategory, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${cookies.token}`,
                },
            })
                .then((response) => response.data)
                .then((data) => {
                    setCategories((categories) => categories.map((category) => {
                        if (category.id === props.category.id) {
                            return data.data;
                        }
                        return category;
                    }));
                    setUpdateMessage(<p style={{ color: 'green', paddingLeft: '20px', paddingTop: '10px' }}>Category updated successfully!</p>);
                    setShowUpdatingForm(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setUpdateMessage(<p style={{ color: 'red', padding: '0px 20px' }}>Cannot update category</p>);
                })
                .finally(() => {
                    setLoading(false);
                });

            console.log(updatedCategory);
        };

        const handleCancel = () => {
            setShowUpdatingForm(false);
            setUpdateMessage(null);
        };

        return (
            <div className="add-form">
                <h2>Update equipment category</h2>
                {/*{updateMessage && updateMessage}*/}
                <form onSubmit={handleSubmit}>
                    <div className="add-form-input">
                        <label htmlFor="name">Category</label>
                        <input
                            type="text"
                            id="name"
                            className="add-form-input-input"
                            value={name}
                            onChange={handleNameChange}
                            // onFocus={() => setUpdateMessage(false)}
                        />
                    </div>
                    <div className="add-form-input">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            className="add-form-input-input"
                            value={description}
                            onChange={handleDescriptionChange}
                            // onFocus={() => setUpdateMessage(false)}
                        />
                    </div>
                    <div className="add-form-actions">
                        <button type="submit" className="add-form-actions-submit">
                            Update category
                        </button>
                        <button
                            className="add-form-actions-discard"
                            onClick={handleCancel}
                        >
                            Discard
                        </button>
                    </div>
                </form>
            </div>
        );
    };
    // update categories
    const handleUpdate = (category) => {
        setSelectedCategory(category);
        setShowUpdatingForm(true);
    };


    // delete categories button action
    const handleDelete = (id) => {
        setLoading(true);
        axios.delete(`/categories/${id}/`, {
            headers: {
                Authorization: `Token ${cookies.token}`
            }
        })
            .then(response => {
                /*// if (!response.ok) {
                //     throw new Error('Failed to delete category');
                // }*/
                console.log('hii')
                setCategories(categories.filter(category => category.id !== id));
                setUpdateMessage(<p style={{color: 'red'}}>Deleted successfully!</p>)
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    };

    const handleAddClick = () => {
        setShowForm(true); // show form when Add button is clicked
    }
    const handleCancelForm = () => {
        setShowForm(false);
        setShowUpdatingForm(false);
        setUpdateMessage(false);
        setShowDeleteConfirmation(false)
    }

    // tableFooter
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const totalPages = Math.ceil(categories.length / 10);

    return (
        <>

            {loading ? <Loading/> :
                (<>
                    <Path pathName={'Categories'}/>
                    <SearchValueContext.Consumer>
                        {(searchValue) => {
                            setSearchValueState(searchValue);
                            return ;
                        }}
                    </SearchValueContext.Consumer>
                    <div className="inventory-table" onClick={() => setUpdateMessage(null)}>

                        <EquipmentTableHeader
                            title={`Categories (${categories.length})`}
                            buttonName={buttonName}
                            className={'add-button'}
                            onClick={handleAddClick} // pass the click handler to EquipmentTableHeader
                        />
                        {updateMessage && updateMessage}
                        {showForm &&
                            <Fragment>
                                <div onClick={handleCancelForm} className="overlay"/>
                                <CategoriesForm handleCancelForm={handleCancelForm} getUpdatedData={getUpdatedData}/>
                            </Fragment>
                        }
                        {showUpdatingForm &&
                            <>
                                <div onClick={handleCancelForm} className="overlay"/>
                                <CategoriesUpdatingForm category={selectedCategory}/>
                            </>
                        }
                        {showDeleteConfirmation &&
                            <>
                                <div onClick={handleCancelForm} className="overlay"/>
                                <DeleteConfirmation
                                    onDelete={() => {
                                        handleDelete(categoryToDelete);
                                        setUpdateMessage(
                                            <p style={{color: "red", paddingLeft: "20px", paddingTop: "10px"}}>
                                                Category deleted successfully!
                                            </p>
                                        );
                                        setShowDeleteConfirmation(false);
                                    }}
                                    onCancel={handleCancelForm}
                                />
                            </>
                        }
                        <InfosTable
                            currentPage={currentPage}
                            columnTitles={columnTitles}
                            columnMappings={columnMappings}
                            data={categories}
                            actionRenderer={(category) => handleAction(category)}
                            searchValue={searchValueState}
                        />

                        <EquipmentTableFooter
                            currentPage={currentPage}
                            handleNextPage={handleNextPage}
                            handlePrevPage={handlePrevPage}
                            totalPages={totalPages}
                        />
                    </div>
                </>)}

        </>
    );
}
export default CategoriesAdmin;

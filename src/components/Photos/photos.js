import React, {useEffect, useState} from "react";
import photos from "./photos.json";
import PhotoAlbum from "react-photo-album";
import BellaInfo from "./bella";

function PhotoGallery() {
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [modalIsOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        if (document.location.hash === "#dog") {
            setCategoryFilter("dog");
        }
    }, []);
    const columns = document.querySelectorAll('.react-photo-album--column');

    for (let i = 0; i < columns.length; i++) {
        columns[i].style.zIndex = i + 1;
    }
    const setDog = () => {
        setCategoryFilter("dog");
        closeModal();
    }
    const handleCategoryChange = event => {
        setCategoryFilter(event.target.value);
    };

    const filteredPhotos = photos.filter(photo => {
        if (categoryFilter === "all") {
            return true;
        }
        return photo.category.includes(categoryFilter)
    });

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div className="gallery-container">
            <div className="gallery-filter">
                <div>
                    <h3>My Gallery</h3>
                    <span className="photo-description">Some of the photos that i've taken since <b
                        className="blue">2021</b> </span>
                </div>

                <div className="filter-categories">
                    <input onChange={handleCategoryChange} type="radio" id="radioAll" name="radioPhoto" value="all"/>
                    <label htmlFor="radioAll">All</label>
                    <input onChange={handleCategoryChange} type="radio" id="radioDog" name="radioPhoto" value="dog"/>
                    <label htmlFor="radioDog">Dogs</label>
                    <input onChange={handleCategoryChange} type="radio" id="radioAssorted" name="radioPhoto"
                           value="assorted"/>
                    <label htmlFor="radioAssorted">Assorted</label>
                    <input onChange={handleCategoryChange} type="radio" id="radioNature" name="radioPhoto"
                           value="nature"/>
                    <label htmlFor="radioNature">Nature</label>

                    <button className="modal-controller" onMouseEnter={openModal}>
                        <span className="modal-controller-text">Info About My Dog</span>
                        <BellaInfo
                            show={modalIsOpen}
                            onHide={closeModal}
                            set_dog={setDog}

                            />
                    </button>
                </div>
            </div>
            <PhotoAlbum layout="masonry" photos={filteredPhotos}/></div>

    );
}

export default PhotoGallery;

import React, {useState} from "react";
import Gallery from "react-photo-gallery";
import photos from "./photos.json";
import CustomPhoto from "./utils.js";

function PhotoGallery() {
    const [categoryFilter, setCategoryFilter] = useState('all');
    const handleCategoryChange = event => {
        setCategoryFilter(event.target.value);
    };

    const filteredPhotos = photos.filter(photo => {
        console.log(categoryFilter);
        if (categoryFilter === "all") {
            return true;
        }
        return photo.category.includes(categoryFilter)
    });

    return (
        <div className="gallery-container">
            <div className="gallery-filter">
                <h3>My Gallery</h3>
                <span>Some of the photos that i've taken since <b className="blue">2021</b> </span>
                <div className="filter-categories">
                <input onChange={handleCategoryChange} type="radio" id="radioAll" name="radioPhoto" value="all" />
                <label htmlFor="radioAll">All</label>
                <input onChange={handleCategoryChange} type="radio" id="radioDog" name="radioPhoto" value="dog"/>
                <label htmlFor="radioDog">Dogs</label>
                <input onChange={handleCategoryChange} type="radio" id="radioAssorted" name="radioPhoto"
                       value="assorted"/>
                <
                    label htmlFor="radioAssorted">Assorted</label>
                <input onChange={handleCategoryChange} type="radio" id="radioNature" name="radioPhoto" value="nature"/>
                <label htmlFor="radioNature">Nature</label>
                </div>
            </div>
            <Gallery renderImage={CustomPhoto} photos={filteredPhotos}/>
        </div>
    );
}

export default PhotoGallery;

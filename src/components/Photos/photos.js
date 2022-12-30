import React, {useCallback, useState} from "react";
import Gallery from "react-photo-gallery";
import photos from "./photos.json";
import CustomPhoto from "./utils.js";
import Carousel, {Modal, ModalGateway} from 'react-images';

function PhotoGallery() {
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, {photo, index}) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };
    const handleCategoryChange = event => {
        setCategoryFilter(event.target.value);
    };

    const filteredPhotos = photos.filter(photo => {
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
                    <input onChange={handleCategoryChange} type="radio" id="radioAll" name="radioPhoto" value="all"/>
                    <label htmlFor="radioAll">All</label>
                    <input onChange={handleCategoryChange} type="radio" id="radioDog" name="radioPhoto" value="dog"/>
                    <label htmlFor="radioDog">Dogs</label>
                    <input onChange={handleCategoryChange} type="radio" id="radioAssorted" name="radioPhoto"
                           value="assorted"/>
                    <
                        label htmlFor="radioAssorted">Assorted</label>
                    <input onChange={handleCategoryChange} type="radio" id="radioNature" name="radioPhoto"
                           value="nature"/>
                    <label htmlFor="radioNature">Nature</label>
                </div>
            </div>
            <Gallery renderImage={CustomPhoto} onClick={openLightbox} photos={filteredPhotos}/>
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={photos.map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title,
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
}

export default PhotoGallery;

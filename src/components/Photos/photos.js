import React, {useState} from "react";
import Gallery from "react-photo-gallery";
import photos from "./photos.json";
import CustomPhoto from "./utils.js";

function PhotoGallery() {
/*    const [images, setImages] = useState(photos.slice(0, 6));
    const [pageNum, setPageNum] = useState(1);
    const [loadedAll, setLoadedAll] = useState(false);*/
    const [categoryFilter, setCategoryFilter] = useState('all');
    // const TOTAL_PAGES = 0;

  /*  const loadMorePhotos = debounce(() => {
        if (pageNum > TOTAL_PAGES) {
            setLoadedAll(true);
            return;
        }

        setImages(images.concat(photos.slice(images.length, images.length + 6)));
        setPageNum(pageNum + 1);
    }, 200);
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    });*/
    /*const handleScroll = () => {
        let scrollY =
            window.scrollY ||
            window.pageYOffset ||
            document.documentElement.scrollTop;
        if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
            loadMorePhotos();
        }

    };*/
    const handleCategoryChange = event => {
        setCategoryFilter(event.target.value);
    };

    const filteredPhotos = photos.filter(photo => {
        console.log(categoryFilter);
        if (categoryFilter === "all") {
            return true;
        }
        return photo.category === categoryFilter;
    });

    return (
        <div className="gallery-container">
            <div className="gallery-filter">
            <label>
                Category:
                <select onChange={handleCategoryChange}>
                    <option value="all">All</option>
                    <option value="dog">Bella</option>
                    <option value="assorted">assorted</option>
                    <option value="nature">Nature</option>
                </select>
            </label>
            </div>
            <Gallery renderImage={CustomPhoto} photos={filteredPhotos}/>
            {/*{!loadedAll && (
                <div className="loading-msg" id="msg-loading-more">
                    Loading
                </div>
            )}*/}
        </div>
    );
}

export default PhotoGallery;

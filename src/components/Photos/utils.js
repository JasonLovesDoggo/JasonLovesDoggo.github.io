export const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const imgWithClick = {cursor: 'pointer'};

const CustomPhoto = ({index, onClick, photo, margin, direction, top, left, key}) => {
    const imgStyle = {display: 'block'};
    if (direction === 'column') {
        imgStyle.position = 'absolute';
        imgStyle.left = left;
        imgStyle.top = top;
    }

    const handleClick = event => {
        onClick(event, {photo, index});
    };

    return (
        <img
            className="gallery-image"
            key={key}
            style={onClick ? {...imgStyle, ...imgWithClick} : imgStyle}
            {...photo}
            onClick={onClick ? handleClick : null}
            alt="A depiction of either my dog Bella or a variety of scenes featuring nature and other subjects."
        />
    );
};

export default CustomPhoto;

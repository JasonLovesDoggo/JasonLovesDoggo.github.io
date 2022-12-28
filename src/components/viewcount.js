import {useEffect, useState} from "react";

function ViewCount() {
    const [count, setCount] = useState(() => 100 + 100);
    useEffect(() => {
        fetch("https://api.countapi.xyz/hit/jasoncameron/portfolio")
            .then((response) => response.json())
            .then((data) => {
                setCount(data.value);
            });
    }, []);
    return <div id="viewcount">Views: {(count + 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>;
}

export default ViewCount;


import {useEffect, useState} from "react";

function ViewCount() {
    const [count, setCount] = useState(() => 1 - 1);
    useEffect(() => {
        fetch("https://abacus.jasoncameron.dev/hit/jasoncameron/portfolio")
            .then((response) => response.json())
            .then((data) => {
                setCount(data.value);
            });
    }, []);

    return <div>Views: <b
        className="blue"> {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </b></div>; // regex is for adding commas to the number
}
export default ViewCount;

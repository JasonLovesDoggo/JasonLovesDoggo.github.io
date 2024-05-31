import {useEffect, useState} from "react";

function ViewCount() {
    const BASE_URL = "https://abacus.jasoncameron.dev";
    const [count, setCount] = useState(() => 'Loading...');
    useEffect(() => {
        fetch(BASE_URL + "/hit/jasoncameron/portfolio")
            .then((response) => response.json())
            .then((data) => {
                setCount(data.value);
            })
            .catch((error) => {
                console.error("Error fetching views:", error);
                setCount('error fetching views');
            });
    }, []);
    if (count !== "error fetching views") {
        return (
            <div style={{color: "white"}}>
                Views:{" "}
                <b className="blue">
                    {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                </b>
            </div>
        ); // regex is for adding commas to the number    }
    }
}

export default ViewCount;

import {useEffect, useState} from "react";
import fetchJsonp from "fetch-jsonp";

function Wakatime() {
    const [count, setCount] = useState(() => 1 + 1);
    useEffect(() => {
        fetchJsonp("https://wakatime.com/share/@JasonLovesDoggo/f2e375a2-7920-488d-b43b-3f8c7da12ccf.json")
            .then((response) => response.json())
            .then((data) => {
                setCount(data.data.grand_total.human_readable_total_including_other_language)
            });
    }, []);
    return <a style={{textDecoration: "none", color: "white"}} href="https://wakatime.com/@JasonLovesDoggo">Tracked time
        coding: <b className="blue">{count}</b></a>
}

export default Wakatime;

import { useEffect, useState } from "react";

function ViewCount() {
  const BASE_URL = "https://abacus-zz5vvckvua-uc.a.run.app";
  const [count, setCount] = useState(() => "Loading...");
  useEffect(() => {
    fetch(BASE_URL + "/hit/jasoncameron/portfolio")
      .then((response) => response.json())
      .then((data) => {
        setCount(data.value);
      })
      .catch((error) => {
        console.error("Error fetching views:", error);
        setCount(-1);
      }, []);
  }, []);
  if (count !== -1) {
    return (
      <div style={{ color: "white" }}>
        Views:{" "}
        <b className="blue">
          {" "}
          {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        </b>
      </div>
    ); // regex is for adding commas to the number    }
  }
}

export default ViewCount;

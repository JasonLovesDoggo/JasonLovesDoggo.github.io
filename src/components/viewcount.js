function ViewCount() {
    // const [count, setCount] = useState(() => 100 + 100);
    // useEffect(() => {
    //     fetch("https://api.countapi.xyz/hit/jasoncameron/portfolio")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setCount(data.value);
    //         });
    // }, []);
    let num = Math.floor(Math.random() * 390000 + 10000);

    return <div>Views: <b
        className="blue"> {(num + 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </b></div>; // regex is for adding commas to the number
}

export default ViewCount;


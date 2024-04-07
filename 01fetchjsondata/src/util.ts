const url = "https://jsonplaceholder.typicode.com/photos";
const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data fected")
    return data;
}

export default fetchData;
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmNkN2VkOTM3ZmU0ZmJjNmI3NTI4MDUyOTVlYmM2NCIsInN1YiI6IjY0M2VlMWFkMWIxZjNjMDVjZTQ2NGM4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oLrnZjvOg6hhTWWggdi6h4Aj9RSAqOaSCF5x1ORDRmw";


const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async(url, params) => {
try {
const {data} = await axios.get(BASE_URL + url, {
    headers,
    params
})
return data;
} catch (err) {
console.log(err);
return err;
}
}
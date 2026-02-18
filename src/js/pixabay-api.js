import axios from 'axios';
import "izitoast/dist/css/iziToast.min.css";

export function getImagesByQuery(query) {
    if (!query) {
        return;
    }
    return axios.get("https://pixabay.com/api/", {
        params: {
            key: "14797936-c0ac273b2bc1360021fe4ee91",
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: false
        }
    })
        .then(response => {
            return response.data.hits;
        })
        .catch(response => {
            console.log(response);
        })
}
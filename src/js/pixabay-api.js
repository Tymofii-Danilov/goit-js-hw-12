import axios from 'axios';
import "izitoast/dist/css/iziToast.min.css";

export async function getImagesByQuery(query, page = 1) {
    if (!query) {
        return;
    }
    try {
        const response = await axios.get("https://pixabay.com/api/", {
        params: {
            key: "14797936-c0ac273b2bc1360021fe4ee91",
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: false,
            page: page,
            per_page: 15
            }
        })
        return response.data;
    } catch (error) {
        iziToast.show({ color: "red", position: "topRight", message: error.message });
    }
}
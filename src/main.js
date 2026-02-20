import { getImagesByQuery } from './js/pixabay-api.js';
import { clearGallery, createGallery, hideLoader, hideLoadMoreButton, showLoader, showLoadMoreButton } from './js/render-functions.js';
import iziToast from "izitoast";

const form = document.querySelector(".form");
let page = 1;
const more = document.querySelector(".loadmore");
let input;
let totalImages;
let cardHeight;


form.addEventListener("submit", (event) => {
    event.preventDefault();
    input = event.target.elements['search-text'];
    if (input.value === "") {
        iziToast.show({ color: "red", position: "topRight", message: "Please type in something" });
        return;
    };
    page = 1;
    clearGallery();
    showLoader();
    hideLoadMoreButton();

    getImagesByQuery(input.value, page)
        .then(data => {
            if (data.length === 0) {
                iziToast.show({ color: "red", position: "topRight", message: "Sorry, there are no images matching your search query. Please try again!" });
            } else {
                totalImages = data.totalHits;
                createGallery(data.hits);
                cardHeight = document.querySelector(".gallery-item").getBoundingClientRect().height;
            }
        }).finally((data) => {
            hideLoader();
            if (!(page > totalImages / 15)) {
                showLoadMoreButton();
            }
        });
});

more.addEventListener("click", (event) => {
    page++;
    showLoader();
    getImagesByQuery(input.value, page)
        .then(data => {
            if (page > data.totalHits / 15) {
                hideLoadMoreButton();
                iziToast.show({ color: "red", position: "topRight", message: "We're sorry, but you've reached the end of search results." });
            }
            createGallery(data.hits);
            window.scrollBy({
                top: cardHeight*2,
                left: 0,
                behavior: "smooth",
            });
        }).finally(() => {
            hideLoader();
        });
});

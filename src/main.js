import { getImagesByQuery } from './js/pixabay-api.js';
import { clearGallery, createGallery, hideLoader, hideLoadMoreButton, showLoader, showLoadMoreButton } from './js/render-functions.js';
import iziToast from "izitoast";

const form = document.querySelector(".form");
let page = 1;
const more = document.querySelector(".loadmore");
let input;
let totalImages;
let cardHeight;


form.addEventListener("submit", async (event) => {
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

    try {
        const result = await getImagesByQuery(input.value, page);
        if (result.hits.length === 0) {
            iziToast.show({ color: "red", position: "topRight", message: "Sorry, there are no images matching your search query. Please try again!" });
        } else {
            totalImages = result.totalHits;
            createGallery(result.hits);
            cardHeight = document.querySelector(".gallery-item").getBoundingClientRect().height;
        }
        hideLoader();
        if (totalImages > 15) {
            console.log(totalImages);
            
            showLoadMoreButton();
        }
    } catch (error) {
        iziToast.show({ color: "red", position: "topRight", message: error.message });
    } finally {
        hideLoader();
    }
});

more.addEventListener("click", async (event) => {
    page++;
    showLoader();
    hideLoadMoreButton();
    
    try {
        const result = await getImagesByQuery(input.value, page);
        createGallery(result.hits);
        window.scrollBy({
            top: cardHeight*2,
            left: 0,
            behavior: "smooth",
        });
        
        if (page >= Math.ceil(totalImages / 15)) {
            hideLoadMoreButton();
            iziToast.show({ color: "red", position: "topRight", message: "We're sorry, but you've reached the end of search results." });
        } else {
            showLoadMoreButton();
        }
    } catch (error) {
        iziToast.show({ color: "red", position: "topRight", message: error.message });
    } finally {
        hideLoader();
    }
});

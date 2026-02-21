import { getImagesByQuery } from './js/pixabay-api.js';
import { clearGallery, createGallery, hideLoader, hideLoadMoreButton, showLoader, showLoadMoreButton } from './js/render-functions.js';
import iziToast from "izitoast";

const form = document.querySelector(".form");
const more = document.querySelector(".loadmore");
let page = 1;
let currentQuery = "";
let totalImages = 0;
let cardHeight = 0;


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = event.target.elements['search-text'].value.trim();
    if (!input) {
        iziToast.show({ color: "red", position: "topRight", message: "Please type in something" });
        return;
    };

    page = 1;
    totalImages = 0;
    currentQuery = input;
    clearGallery();
    showLoader();
    hideLoadMoreButton();

    try {
        const result = await getImagesByQuery(currentQuery, page);
        if (result.hits.length === 0) {
            iziToast.show({ color: "red", position: "topRight", message: "Sorry, there are no images matching your search query. Please try again!" });
            return;
        }

        totalImages = result.totalHits;
        createGallery(result.hits);

        if (totalImages > 15) {
            showLoadMoreButton();
        } else {
            iziToast.show({ color: "red", position: "topRight", message: "We're sorry, but you've reached the end of search results." });
        }
    } catch (error) {
        iziToast.show({ color: "red", position: "topRight", message: error.message });
    } finally {
        hideLoader();
    }
});

more.addEventListener("click", async (event) => {
    if (!currentQuery) return;
    
    page++;
    showLoader();
    hideLoadMoreButton();
    
    try {
        const result = await getImagesByQuery(currentQuery, page);
        createGallery(result.hits);
        const firstCard = document.querySelector(".gallery-item");
        cardHeight = firstCard ? firstCard.getBoundingClientRect().height : 0;
        window.scrollBy({
            top: cardHeight*2,
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

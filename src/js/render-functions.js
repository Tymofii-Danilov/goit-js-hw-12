import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export let bigImg = new SimpleLightbox(".gallery a", { captionsData: "alt", captionDelay: 250, captionPosition: 'outside' });
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

export function createGallery(images) {
    const markUp = images.map((pic) => {
        return `<li class="gallery-item">
        <a class="gallery-link" href="${pic.largeImageURL}">
        <img class="gallery-img" src="${pic.webformatURL}" alt="${pic.tags}" width="360">
        </a>
        <div class="gallery-stats">
        <div class="gallery-count-wrap"><p class="gallery-counter">Likes</p>
        <p class="gallery-count">${pic.likes}</p></div>
        <div class="gallery-count-wrap"><p class="gallery-counter">Views</p>
        <p class="gallery-count">${pic.views}</p></div>
        <div class="gallery-count-wrap"><p class="gallery-counter">Comments</p>
        <p class="gallery-count">${pic.comments}</p></div>
        <div class="gallery-count-wrap"><p class="gallery-counter">Downloads</p>
        <p class="gallery-count">${pic.downloads}</p></div>
        </div>
        </li>`;
    }).join('');
    gallery.innerHTML = markUp;
    bigImg.refresh();
};

export function clearGallery() {
    gallery.innerHTML = "";
}

export function showLoader() {
    loader.classList.remove("hidden");
}

export function hideLoader() {
    loader.classList.add("hidden");
}
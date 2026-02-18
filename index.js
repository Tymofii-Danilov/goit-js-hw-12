import{a as u,S as d,i as l}from"./assets/vendor-I-4NK6U0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();function g(o){if(o)return u.get("https://pixabay.com/api/",{params:{key:"14797936-c0ac273b2bc1360021fe4ee91",q:o,image_type:"photo",orientation:"horizontal",safesearch:!1}}).then(r=>r.data.hits).catch(r=>{console.log(r)})}let p=new d(".gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"outside"});const n=document.querySelector(".gallery"),c=document.querySelector(".loader");function m(o){const r=o.map(t=>`<li class="gallery-item">
        <a class="gallery-link" href="${t.largeImageURL}">
        <img class="gallery-img" src="${t.webformatURL}" alt="${t.tags}" width="360">
        </a>
        <div class="gallery-stats">
        <div class="gallery-count-wrap"><p class="gallery-counter">Likes</p>
        <p class="gallery-count">${t.likes}</p></div>
        <div class="gallery-count-wrap"><p class="gallery-counter">Views</p>
        <p class="gallery-count">${t.views}</p></div>
        <div class="gallery-count-wrap"><p class="gallery-counter">Comments</p>
        <p class="gallery-count">${t.comments}</p></div>
        <div class="gallery-count-wrap"><p class="gallery-counter">Downloads</p>
        <p class="gallery-count">${t.downloads}</p></div>
        </div>
        </li>`).join("");n.innerHTML=r,p.refresh()}function y(){n.innerHTML=""}function f(){c.classList.remove("hidden")}function h(){c.classList.add("hidden")}const v=document.querySelector(".form");v.addEventListener("submit",o=>{o.preventDefault();const r=o.target.elements["search-text"];if(r.value===""){l.show({color:"red",position:"topRight",message:"Please type in something"});return}y(),f(),g(r.value).then(t=>{t.length===0?l.show({color:"red",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}):m(t)}).catch(t=>{l.show({color:"red",position:"topRight",message:t.message})}).finally(()=>{h()})});
//# sourceMappingURL=index.js.map

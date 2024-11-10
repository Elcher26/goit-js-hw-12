import{a as w,s as b,i as p}from"./assets/vendor-7edee35e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function d(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();async function A(e,o){const s={key:"44327397-ede54b0a70b202831c7c411c5",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e};return(await w.get("https://pixabay.com/api/",{params:s})).data}const m=document.querySelector(".img-list");function S(e){return`<li class="list-item">
          <div class="img-box">
            <a
              class="gallery-link"
              href="${e.largeImageURL}"
            >
              <img
                src="${e.previewURL}"
                alt="${e.tags}"
                title="${e.tags}"
              />
            </a>
          </div>
          <ul class="description-list">
            <li class="description-item">
              <p>Likes</p>
              <p>${e.likes}</p>
            </li>
            <li class="description-item">
              <p>Views</p>
              <p>${e.views}</p>
            </li>
            <li class="description-item">
              <p>Comments</p>
              <p>${e.comments}</p>
            </li>
            <li class="description-item">
              <p>Downloads</p>
              <p>${e.downloads}</p>
            </li>
          </ul>
        </li>`}function y(e){return e.map(S).join("")}const g="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEaSURBVHgBrZZhDoIwDIUL0fjXo3gUb7R5Er0BHsXD7A+bASlhYeC6V4WXGCHr3reNtkAkqG2D9T70mh/HSj4HybyqyPQ9PeuaXlRQ19GFY4c5dDodLSHNK3/fSam29Q+0k7/N1ZAt5hCyh7kIKZl77y/IMBezgEwXTW4ienBxcc65DCQ0PDYCQghGMDASJJpzTG4ue0KABEHmKeBAQEPx3LiIhmKy/M+aitDyGJoPAWsI32vNWTXpVQnXRal2kPQmO7pPx6XpPRCQmsdjSZ8JhIA0FbOllMKsRZqCQoMpXCy0GJRrFc7hVpGLSVqFWaxk52ZnVgPbIaL5HhBovgVSMv+qg7kt9JznZ+VL//pL+5hWFXei+mwRj+UDSHQ9vnHBEYAAAAAASUVORK5CYII=",f=new b(".img-list a",{captionDelay:500,captionPosition:"bottom"}),P={iconUrl:g,backgroundColor:"#ef4040",position:"topRight",message:"Sorry, there are no images matching your search query. Please, try again!"},L={iconUrl:g,backgroundColor:"#8fe5d9b3",position:"topRight",message:"We're sorry, but you've reached the end of search results."},a=document.querySelector(".search-form"),n=document.querySelector(".loader"),l=document.querySelector(".loader-more-photos"),c=document.querySelector(".js-next-page-btn");let v,r=1,h;a.addEventListener("submit",R);c.addEventListener("click",E);async function E(){l.classList.remove("visually-hidden");try{const e=await A(r+1,v);m.insertAdjacentHTML("beforeend",y(e.hits)),f.refresh();let s=document.querySelector(".list-item").getBoundingClientRect();window.scrollBy({top:-s.y*5,behavior:"smooth"})}catch(e){throw new Error(e)}if(l.classList.add("visually-hidden"),r+=1,r===Math.ceil(h/15)){p.show(L),c.classList.add("visually-hidden"),l.classList.add("visually-hidden");return}}async function R(e){if(e.preventDefault(),r=1,r===Math.ceil(h/15)){p.show(L),c.classList.add("visually-hidden"),l.classList.add("visually-hidden");return}m.innerHTML="",n.classList.remove("visually-hidden");const o=a.elements.searchText.value.trim();if(o===""){n.classList.add("visually-hidden");return}v=o;try{const s=await A(r,o);if(s.hits.length===0){p.show(P),n.classList.add("visually-hidden"),a.reset();return}h=s.totalHits,n.classList.add("visually-hidden"),m.innerHTML=y(s.hits),f.refresh(),c.classList.remove("visually-hidden")}catch(s){throw new Error(s)}a.reset()}
//# sourceMappingURL=commonHelpers.js.map

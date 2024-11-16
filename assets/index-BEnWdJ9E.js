(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();let i="";document.addEventListener("DOMContentLoaded",()=>{document.getElementById("input-search").addEventListener("input",p),setTimeout(()=>{m()},500),setTimeout(()=>{y()},1500);const t=document.querySelectorAll(".types__item");t.forEach(s=>{s.addEventListener("click",()=>{if(s.classList.contains("active"))s.classList.remove("active"),document.querySelectorAll(".card").forEach(c=>{c.classList.remove("oculto")}),i="";else{t.forEach(e=>{e.classList.remove("active")}),s.classList.add("active");const r=s.dataset.rel;i=s.dataset.rel,document.querySelectorAll(".card").forEach(e=>{e.classList.contains(r)?e.classList.remove("oculto"):e.classList.add("oculto")})}})})});async function m(){try{const s=await(await fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0")).json();for(let r=0;r<s.results.length;r++){const c=s.results[r];console.log(`#${r+1} - ${c.name}`);const o=await(await fetch(c.url)).json();f(o)}}catch(t){console.error("Error:",t)}}function f(t){const s=document.getElementById("cards"),r=t.sprites.other["official-artwork"].front_default,c=t.sprites.other["official-artwork"].front_shiny,e=t.types.map(u=>u.type.name).join(", "),o=t.types[0].type.name,n=t.height*10,a=t.weight/10;let l="";i&&(l="oculto",i==o&&(l=""));const d=`
    <div class="card ${o} ${l}" data-name="${t.name}">
      <figure class="card__img">
        <img src="${r}" class="card__img1"/>
        <img src="${c}" class="card__img2"/>
      </figure>
      <h3 class="card__title">${t.name}</h3>
      <h3 class="card__subtitle">#${t.id}</h3>
      <div class="card__body">
        <ul>
          <li>Altura: ${n} cm</li>
          <li>Peso: ${a} kg</li>
          <li>Tipos: ${e}</li>
        </ul>
      </div>
    </div>
  `;s.insertAdjacentHTML("beforeend",d)}function p(){const s=document.getElementById("input-search").value.toLowerCase();document.querySelectorAll(".card").forEach(c=>{c.getAttribute("data-name").toLowerCase().includes(s)?c.style.display="":c.style.display="none"})}function y(t){document.querySelector(".loading").classList.add("oculto")}

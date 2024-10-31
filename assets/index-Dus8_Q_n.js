(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{document.getElementById("input-buscador").addEventListener("input",u),l()});async function l(){try{const s=await(await fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0")).json();for(let n=0;n<s.results.length;n++){const r=s.results[n];console.log(`#${n+1} - ${r.name}`);const t=await(await fetch(r.url)).json();d(t)}}catch(o){console.error("Error:",o)}}function d(o){const s=document.getElementById("cards"),n=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${o.id}.png`,r=o.types.map(a=>a.type.name).join(", "),e=o.types[0].type.name,t=o.height*10,i=o.weight/10,c=`
    <div class="card ${e}" data-name="${o.name}">
      <figure class="card__img">
        <img src="${n}" />
      </figure>
      <h3 class="card__title">${o.name}</h3>
      <h3 class="card__subtitle">#${o.id}</h3>
      <div class="card__body">
        <ul>
          <li>Altura: ${t} cm</li>
          <li>Peso: ${i} kg</li>
          <li>Tipos: ${r}</li>
        </ul>
      </div>
    </div>
  `;s.insertAdjacentHTML("beforeend",c)}function u(){const s=document.getElementById("input-buscador").value.toLowerCase();document.querySelectorAll(".card").forEach(r=>{r.getAttribute("data-name").toLowerCase().includes(s)?r.style.display="":r.style.display="none"})}

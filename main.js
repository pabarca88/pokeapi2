import './style.scss'

let typeSelect = '';

//START APP
document.addEventListener('DOMContentLoaded',()=>{
  //LISTENER FILTER
  document.getElementById('input-search').addEventListener('input', filterCards);

  //call Poke API
  setTimeout(()=>{
    callAPI();
  },500);

  setTimeout(()=>{
    loading(false);
  },1500);

  //LISTENER FILTER TYPES
  const filtrosTipo = document.querySelectorAll('.types__item');
  filtrosTipo.forEach(f =>{
    f.addEventListener('click',()=>{
      if(f.classList.contains('active')) {
        f.classList.remove('active');
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
          card.classList.remove('oculto');
        });
        typeSelect = "";
      } else {
        filtrosTipo.forEach(filtro =>{
          filtro.classList.remove('active');
        })
        f.classList.add('active');
        const type = f.dataset.rel;
        typeSelect = f.dataset.rel;
        const cards = document.querySelectorAll('.card');
  
        cards.forEach(card => {
          if (card.classList.contains(type)) {
            card.classList.remove('oculto');
          } else {
            card.classList.add('oculto');
          }
        });
      }
    });
  });
});

async function callAPI() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0");
    const data = await response.json();

    for (let index = 0; index < data.results.length; index++) {
      const pokemon = data.results[index];
      console.log(`#${index + 1} - ${pokemon.name}`);
      
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      
      createCard(pokemonData);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function createCard(data) {
  const cards = document.getElementById('cards');
  const PokeImg = data.sprites.other["official-artwork"].front_default;
  const PokeImg2 = data.sprites.other["official-artwork"].front_shiny;
  const types = data.types.map(type => type.type.name).join(', ');
  const firstType = data.types[0].type.name;
  
  const altura = data.height * 10;
  const peso = data.weight/10;

  let clase = "";
  if(typeSelect) {
    clase = "oculto";
    if(typeSelect == firstType) {
      clase = "";
    }
  }

  const card = `
    <div class="card ${firstType} ${clase}" data-name="${data.name}">
      <figure class="card__img">
        <img src="${PokeImg}" class="card__img1"/>
        <img src="${PokeImg2}" class="card__img2"/>
      </figure>
      <h3 class="card__title">${data.name}</h3>
      <h3 class="card__subtitle">#${data.id}</h3>
      <div class="card__body">
        <ul>
          <li>Altura: ${altura} cm</li>
          <li>Peso: ${peso} kg</li>
          <li>Tipos: ${types}</li>
        </ul>
      </div>
    </div>
  `;
  cards.insertAdjacentHTML('beforeend',card);
}

// Function to filter the cards
function filterCards() {
  const inputSearch = document.getElementById('input-search');
  const filter = inputSearch.value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const name = card.getAttribute('data-name').toLowerCase();
    if (name.includes(filter)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function loading(t) {
  const loading = document.querySelector('.loading');
  if(t) {
    loading.classList.remove('oculto');
  } else {
    loading.classList.add('oculto');
  }
}
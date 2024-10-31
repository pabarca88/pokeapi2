import './style.scss'

document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('input-buscador').addEventListener('input', filtrarCards);
  llamarAPI();
});

async function llamarAPI() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0");
    const data = await response.json();

    for (let index = 0; index < data.results.length; index++) {
      const pokemon = data.results[index];
      console.log(`#${index + 1} - ${pokemon.name}`);
      
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      
      crearCard(pokemonData);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function crearCard(data) {
  const cards = document.getElementById('cards');
  const highQualityImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
  const types = data.types.map(type => type.type.name).join(', ');
  const firstType = data.types[0].type.name;

  const altura = data.height * 10;
  const peso = data.weight/10;

  const card = `
    <div class="card ${firstType}" data-name="${data.name}">
      <figure class="card__img">
        <img src="${highQualityImageUrl}" />
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

// Función para filtrar las tarjetas
function filtrarCards() {
  const inputBuscador = document.getElementById('input-buscador');
  const filter = inputBuscador.value.toLowerCase();
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